/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class Shape3dImpl<T extends THREE.Geometry | THREE.BufferGeometry> extends rt.ProxyObjectWithId<T> implements Shape3d {
        public static instantiate(reference: THREE.Geometry | THREE.BufferGeometry) {
            return new Shape3dImpl(reference);
        }

        protected static _radialSegments = 32;
        protected static _collisionMargin = 0.05;

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
            btshape.setMargin(Shape3dImpl._collisionMargin);

            Helper.safeAmmoObjectDestroy(bthalfextents);

            return btshape;
        }
    }

    export class PlaneShape3d extends Shape3dImpl<THREE.PlaneBufferGeometry> {
        constructor(width?: number, height?: number) {
            width = width || 100;
            height = height || 100;

            super(new THREE.PlaneBufferGeometry(width, height).rotateX(-Math.PI / 2) as THREE.PlaneBufferGeometry);

            this._setCtorCollisionShape(() => this._createCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents)));
        }
    }

    export class BoxShape3d extends Shape3dImpl<THREE.BoxBufferGeometry> {
        constructor(
            width?: number,
            height?: number,
            depth?: number,
            openEnded?: boolean,
        ) {
            width = width || 1;
            height = height || 1;
            depth = depth || 1;

            super(new THREE.BoxBufferGeometry(width, height, depth));

            this._setShapeVolume(width * height * depth);
            this._setCtorCollisionShape(() => this._createCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents)));
        }
    }

    export class CylinderShape3d extends Shape3dImpl<THREE.CylinderBufferGeometry> {
        constructor(
            radius?: number,
            height?: number,
            openEnded?: boolean,
        ) {
            radius = radius || .5;
            height = height || 1;

            super(new THREE.CylinderBufferGeometry(radius, radius, height, Shape3dImpl._radialSegments, 1, openEnded || false));

            this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height);
            this._setCtorCollisionShape(() => this._createCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btCylinderShape(bthalfextents)));
        }
    }

    export class SphereShape3d extends Shape3dImpl<THREE.SphereBufferGeometry> {
        constructor(radius?: number) {
            radius = radius || .5;

            super(new THREE.SphereBufferGeometry(radius, Shape3dImpl._radialSegments, Shape3dImpl._radialSegments));

            this._setShapeVolume(4 / 3 * Math.PI * Math.pow(radius, 3));
            this._setCtorCollisionShape(() => new Ammo.btSphereShape(radius!));
        }
    }

    export class ConeShape3d extends Shape3dImpl<THREE.ConeBufferGeometry> {
        constructor(radius?: number, height?: number) {
            radius = radius || .5;
            height = height || 1;

            super(new THREE.ConeBufferGeometry(radius, height, Shape3dImpl._radialSegments));

            this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height / 3);
            this._setCtorCollisionShape(() => new Ammo.btConeShape(radius!, height!));

        }
    }
}

namespace pxsim.shape3d {
    export function planeShape(width?: number, height?: number): PlaneShape3d {
        return new PlaneShape3d(width, height);
    }

    export function boxShape(width?: number, height?: number, depth?: number): BoxShape3d {
        return new BoxShape3d(width, height, depth);
    }

    export function cylinderShape(radius?: number, height?: number): CylinderShape3d  {
        return new CylinderShape3d(radius, height);
    }

    export function sphereShape(radius?: number): SphereShape3d  {
        return new SphereShape3d(radius);
    }

    export function coneShape(radius?: number, height?: number): ConeShape3d  {
        return new ConeShape3d(radius, height);
    }
}
