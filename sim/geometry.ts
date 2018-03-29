/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export abstract class Geometry<T extends THREE.Geometry> extends rt.WrappedObjectWithId<T> {
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
            btshape.setMargin(Geometry.collisionMargin);

            Helper.safeAmmoDestroy(bthalfextents);

            return btshape;
        }
    }

    export type GenericGeometry = Geometry<THREE.Geometry>;

    export class PlaneGeometry extends Geometry<THREE.PlaneGeometry> {
        constructor(width?: number, height?: number, id?: rt.ObjId) {
            const w = width || 100;
            const h = height || 100;

            super(new THREE.PlaneGeometry(w, h).rotateX(-Math.PI / 2) as THREE.PlaneGeometry, id);

            this._setCtorCollisionShape(() => this._createCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents)));
        }
    }

    export class BoxGeometry extends Geometry<THREE.BoxGeometry> {
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

    export class CylinderGeometry extends Geometry<THREE.CylinderGeometry> {
        constructor(
            radius?: number,
            height?: number,
            openEnded?: boolean,
            id?: rt.ObjId,
        ) {
            radius = radius || .5;
            height = height || 1;

            super(new THREE.CylinderGeometry(radius, radius, height, Geometry.radialSegments, 1, openEnded || false), id);

            this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height);
            this._setCtorCollisionShape(() => this._createCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btCylinderShape(bthalfextents)));
        }
    }

    export class SphereGeometry extends Geometry<THREE.SphereGeometry> {
        constructor(radius?: number, id?: rt.ObjId) {
            radius = radius || .5;

            super(new THREE.SphereGeometry(radius, Geometry.radialSegments, Geometry.radialSegments), id);

            this._setShapeVolume(4 / 3 * Math.PI * Math.pow(radius, 3));
            this._setCtorCollisionShape(() => new Ammo.btSphereShape(radius!));
        }
    }

    export class ConeGeometry extends Geometry<THREE.ConeGeometry> {
        constructor(radius?: number, height?: number, id?: rt.ObjId) {
            radius = radius || .5;
            height = height || 1;

            super(new THREE.ConeGeometry(radius, height, Geometry.radialSegments), id);

            this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height / 3);
            this._setCtorCollisionShape(() => new Ammo.btConeShape(radius!, height!));

        }
    }
}

namespace pxsim.geometry {
    export function planeGeometry(width?: number, height?: number): PlaneGeometry  {
        return new PlaneGeometry(width, height);
    }

    export function boxGeometry(width?: number, height?: number, depth?: number): BoxGeometry  {
        return new BoxGeometry(width, height, depth);
    }

    export function cylinderGeometry(radius?: number, height?: number): CylinderGeometry  {
        return new CylinderGeometry(radius, height);
    }

    export function sphereGeometry(radius?: number): SphereGeometry  {
        return new SphereGeometry(radius);
    }

    export function coneGeometry(radius?: number, height?: number): ConeGeometry  {
        return new ConeGeometry(radius, height);
    }
}
