/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export abstract class Shape3d<T extends THREE.Geometry> extends rt.WrappedObjectWithId<T> {
        public static radialSegments = 32;
        public static collisionMargin = 0.05;

        private _volume = 0;
        private _ctorCollisionShape: (() => Ammo.btCollisionShape) | null = null;

        public get volume(): number {
            return this._volume;
        }

        public createCollisionShape(): Ammo.btCollisionShape | null {
            return this._ctorCollisionShape ? this._ctorCollisionShape() : null;
        }

        public _onDispose() {
            /* do nothing */
        }

        protected _setShapeVolume(volume: number) {
            this._volume = volume;
        }

        protected _setCtorCollisionShape(ctor: () => Ammo.btCollisionShape) {
            this._ctorCollisionShape = ctor;
        }

        protected _getBounds(target: THREE.Vector3): THREE.Vector3 {
            this.reference.computeBoundingBox();

            return this.reference.boundingBox.getSize(target);
        }

        protected _createCollisionShapeFromHalfExtents(ctor: (bthalfextents: Ammo.btVector3) => Ammo.btCollisionShape): Ammo.btCollisionShape {
            const bthalfextents = Helper.btVector3FromThree(this._getBounds(new THREE.Vector3()).divideScalar(2));

            const btshape = ctor(bthalfextents);
            btshape.setMargin(Shape3d.collisionMargin);

            Helper.safeAmmoObjectDestroy(bthalfextents);

            return btshape;
        }
    }

    export type GenericShape3d = Shape3d<THREE.Geometry>;

    export class PlaneShape3d extends Shape3d<THREE.PlaneGeometry> {
        constructor(width?: number, height?: number, id?: rt.ObjId) {
            const w = width || 100;
            const h = height || 100;

            super(new THREE.PlaneGeometry(w, h).rotateX(-Math.PI / 2) as THREE.PlaneGeometry, id);

            this._setCtorCollisionShape(() => this._createCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents)));
        }
    }

    export class BoxShape3d extends Shape3d<THREE.BoxGeometry> {
        constructor(
            width?: number,
            height?: number,
            depth?: number,
            openEnded?: boolean,
            id?: rt.ObjId,
        ) {
            width = width || 1;
            height = height || 1;
            depth = depth || 1;

            super(new THREE.BoxGeometry(width, height, depth), id);

            this._setShapeVolume(width * height * depth);
            this._setCtorCollisionShape(() => this._createCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents)));
        }
    }

    export class CylinderShape3d extends Shape3d<THREE.CylinderGeometry> {
        constructor(
            radius?: number,
            height?: number,
            openEnded?: boolean,
            id?: rt.ObjId,
        ) {
            radius = radius || .5;
            height = height || 1;

            super(new THREE.CylinderGeometry(radius, radius, height, Shape3d.radialSegments, 1, openEnded || false), id);

            this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height);
            this._setCtorCollisionShape(() => this._createCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btCylinderShape(bthalfextents)));
        }
    }

    export class SphereShape3d extends Shape3d<THREE.SphereGeometry> {
        constructor(radius?: number, id?: rt.ObjId) {
            radius = radius || .5;

            super(new THREE.SphereGeometry(radius, Shape3d.radialSegments, Shape3d.radialSegments), id);

            this._setShapeVolume(4 / 3 * Math.PI * Math.pow(radius, 3));
            this._setCtorCollisionShape(() => new Ammo.btSphereShape(radius!));
        }
    }

    export class ConeShape3d extends Shape3d<THREE.ConeGeometry> {
        constructor(radius?: number, height?: number, id?: rt.ObjId) {
            radius = radius || .5;
            height = height || 1;

            super(new THREE.ConeGeometry(radius, height, Shape3d.radialSegments), id);

            this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height / 3);
            this._setCtorCollisionShape(() => new Ammo.btConeShape(radius!, height!));

        }
    }
}

namespace pxsim.shape3d {
    export function plane(width?: number, height?: number): PlaneShape3d {
        return new PlaneShape3d(width, height);
    }

    export function box(width?: number, height?: number, depth?: number): BoxShape3d {
        return new BoxShape3d(width, height, depth);
    }

    export function cylinder(radius?: number, height?: number): CylinderShape3d  {
        return new CylinderShape3d(radius, height);
    }

    export function sphere(radius?: number): SphereShape3d  {
        return new SphereShape3d(radius);
    }

    export function cone(radius?: number, height?: number): ConeShape3d  {
        return new ConeShape3d(radius, height);
    }
}
