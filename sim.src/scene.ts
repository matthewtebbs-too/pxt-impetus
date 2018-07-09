/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as THREE from 'three';

/// <reference types='../shared/impetus.enums'/>

import { worldBoard } from './_board';
import {
    SceneEvent_Internal,
    ScopeId,
} from './_events';
import { PhysicsWorld } from './_physics';
import { Camera } from './camera';
import { Color, ColorConstructor } from './color';
import { AmbientLight, Light } from './light';
import { SphericalConstructor, Vector, VectorConstructor } from './math';
import { Object3d, Object3dMixin } from './object';

export type Raycaster = THREE.Raycaster;

// tslint:disable-next-line:variable-name
export const RaycasterConstructor = THREE.Raycaster;

export class Scene3d extends Object3dMixin(THREE.Scene) {
    private _physicsworld: PhysicsWorld = new PhysicsWorld();

    private _camera: Camera | null = null;
    private _ambientlight: AmbientLight = new AmbientLight();
    private _raycaster: Raycaster = new RaycasterConstructor();

    public get physicsWorld(): PhysicsWorld {
        return this._physicsworld;
    }

    constructor() {
        super();

        this.background = new ColorConstructor(Palette.SkyBlue);
        this._ambientlight.color.setScalar(.5);

        this.addAt(this._ambientlight, new VectorConstructor(0, 0, 0));
    }

    public get camera(): Camera | null {
        return this._camera;
    }

    public set camera(camera: Camera | null) {
        this._camera = camera;
    }

    public get backgroundColor(): Color {
        return this.background;
    }

    public set backgroundColor(color: Color) {
        this.background = color;
    }

    public get ambientColor(): Color {
        return this._ambientlight.color;
    }

    public set ambientColor(color: Color) {
        this._ambientlight.color = color;
    }

    public addAt(object3d: Object3d, position: Vector) {
        if (!object3d) {
            return;
        }

        object3d.position.copy(position);
        this.add(object3d);
    }

    public add(...objects3d: Object3d[]) {
        if (objects3d) {
            super.add(...objects3d);
            objects3d.forEach(object3d => object3d.onAdded(this));
        }
    }

    public remove(object3d: Object3d) {
        if (object3d) {
            object3d.onRemoved(this);
            super.remove(object3d);
        }
    }

    public animate(timeStep: number) {
        this._physicsworld.animate(timeStep);

        if (this._camera) {
            this._camera.update();
        }

        super.animate(timeStep);

        worldBoard().events!.queue(ScopeId.SceneObject, SceneEvent_Internal.Animate, timeStep);
    }

    public intersectedObjects(x: number, y: number): Object3d[] | null {
        if (!this._camera) {
            return null;
        }

        this._raycaster.setFromCamera({ x, y }, this._camera);
        const intersections = this._raycaster.intersectObjects(this.children);

        return intersections ? intersections.map(intersection => intersection.object as any) : null;
    }

    public copy(source: this, recursive?: boolean): this {
        super.copy(source, recursive);

        throw Error();
    }

    protected _onDispose() {
        super._onDispose();

        this._physicsworld.dispose();
    }
}

namespace pxsimImpetus.scene {
    export function randomPositionOnPlane(size: number): Vector {
        return new VectorConstructor(
            (Math.random() - .5) * size,
            0,
            (Math.random() - .5) * size);
    }

    export function randomPositionInSphere(diameter: number): Vector {
        const spherical = new SphericalConstructor(
            Math.random() * diameter * .5,
            Math.random() * Math.PI * 2.,
            Math.random() * Math.PI * 2.);
        return new VectorConstructor().setFromSpherical(spherical);
    }

    export function randomPositionInCube(size: number): Vector {
        return new VectorConstructor(
            (Math.random() - .5) * size,
            (Math.random() - .5) * size,
            (Math.random() - .5) * size);
    }

    export function intersectedObjectAt(x: number, y: number): Object3d | null {
        const world = worldBoard().world;
        const scene3d = world ? world.scene : null;
        const objects = scene3d ? scene3d.intersectedObjects(x, y) : null;

        return objects && objects.length > 0 ? objects[0] : null;
    }

    export function onAnimate(handler: pxsim.RefAction) {
        worldBoard().events!.listen(ScopeId.SceneObject, SceneEvent_Internal.Animate, handler);
    }
}
