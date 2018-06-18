/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='stats' />

import * as THREEX from 'other_modules/three.extra';
import * as THREE from 'three';

import * as RT from './_runtime';
import { Scene3d } from './scene';

export type Clock = THREE.Clock;

// tslint:disable-next-line:variable-name
export const ClockConstructor = THREE.Clock;

export class Renderer extends RT.ProxyObject<THREE.WebGLRenderer> {
    private static _renderers = new Map<RT.ObjId, THREE.WebGLRenderer>();

    private static _instantiateReference(id: RT.ObjId): THREE.WebGLRenderer {
        let webglrenderer = Renderer._renderers.get(id);
        if (!webglrenderer) {
            Renderer._renderers.set(id, webglrenderer = new THREE.WebGLRenderer({ antialias: true }));

            webglrenderer.shadowMap.enabled = true;
            webglrenderer.shadowMap.type = THREE.PCFSoftShadowMap;
            webglrenderer.setClearColor(Palette.LightGray);
        }

        return webglrenderer;
    }

    private _id: RT.ObjId;

    private _container: HTMLElement | null;

    private _scene3d: Scene3d | null = null;
    private _stats: Stats = new Stats();
    private _clock: Clock = new ClockConstructor();
    private _paused: boolean = false;

    private _callbackRequestId: number = 0;

    public get id(): RT.ObjId {
        return this._id;
    }

    public get container(): HTMLElement | null {
        return this._container;
    }

    public get stats(): HTMLDivElement {
        return this._stats.dom;
    }

    public get canvas(): HTMLCanvasElement | null {
        return this.reference.domElement;
    }

    public get scene(): Scene3d | null {
        return this._scene3d;
    }

    public set scene(scene3d: Scene3d | null) {
        this._scene3d = scene3d;
    }

    public get isPaused(): boolean {
        return this._paused;
    }

    public set pause(value: boolean) {
        this._paused = value;
    }

    constructor(id: RT.ObjId = 'maincanvas') {
        super(Renderer._instantiateReference(id));

        this._id = id;

        this._container = document.getElementById(id.toString());
        if (!this._container) {
            throw new Error(`Canvas container element ${id} not found.`);
        }

        if (!THREEX.Detector.webgl) {
            THREEX.Detector.addGetWebGLMessage({ parent: this._container });
            return;
        }

        this._stats.dom.hidden = true;

        this._container.innerHTML = '';
        this._container.appendChild(this.reference.domElement);
        this._container.appendChild(this._stats.dom);

        window.addEventListener('resize', this._onWindowResize);
        this._onWindowResize();

        this.runRenderLoop();
    }

    public runRenderLoop() {
        this._callbackRequestId = requestAnimationFrame((time: number) => {
            if (!this._paused) {
                this._stats.begin();

                let wasRendered = false;

                const scene3d = this._scene3d;
                if (scene3d) {
                    scene3d.animate(this._clock.getDelta());

                    const camera = scene3d.camera;
                    if (camera) {
                        const size = this.reference.getSize();
                        camera.setSize(size.width, size.height);

                        this.reference.render(scene3d, camera);

                        wasRendered = true;
                    }
                }

                if (!wasRendered) {
                        this.reference.clear();
                }

                this._stats.end();
            }

            this.runRenderLoop();
        });
    }

    public stopRenderLoop() {
        if (0 !== this._callbackRequestId) {
            cancelAnimationFrame(this._callbackRequestId);
            this._callbackRequestId = 0;
        }
    }

    protected _onWindowResize = () => {
        if (this._container) {
            this.reference.setPixelRatio(window.devicePixelRatio);
            this.reference.setSize(this._container.clientWidth, this._container.clientHeight);
        }
    }

    protected _onDispose() {
        this.stopRenderLoop();

        if (this._container) {
            window.removeEventListener('resize', this._onWindowResize);

            this._container.innerHTML = '';
        }
    }
}
