/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export function ShapeMixin<T extends rt.ObjectConstructor<THREE.BufferGeometry>>(base: T) {
        return class extends base implements rt.ICloneableObject {
            protected static _radialSegments = 32;
            protected static _patchSegments = 10;
            protected static _collisionMargin = 0.05;

            private _volume = 0;
            private _ctorCollisionShape: (() => Ammo.btCollisionShape) | null = null;

            public get volume(): number {
                return this._volume;
            }

            public createCollisionShape(): Ammo.btCollisionShape | null {
                return this._ctorCollisionShape ? this._ctorCollisionShape() : null;
            }

            public copy(source: this): this {
                super.copy(source);

                throw new Error();
            }

            protected _setShapeVolume(volume: number) {
                this._volume = volume;
            }

            protected _setCtorCollisionShape(ctor: () => Ammo.btCollisionShape) {
                this._ctorCollisionShape = ctor;
            }

            protected _getBounds(): THREE.Vector3 {
                return this._getBoundingBox().getSize(new THREE.Vector3());
            }

            protected _getBoundingBox(): THREE.Box3 {
                this.computeBoundingBox();

                return this.boundingBox;
            }

            protected _getBoundingSphere(): THREE.Sphere {
                this.computeBoundingSphere();

                return this.boundingSphere;
            }

            protected _btCollisionShapeFromHalfExtents(ctor: (bthalfextents: Ammo.btVector3) => Ammo.btCollisionShape): Ammo.btCollisionShape {
                const bthalfextents = Helper.btVector3FromThree(this._getBounds().divideScalar(2));

                const btshape = ctor(bthalfextents);
                btshape.setMargin(Shape3d._collisionMargin);

                Helper.safeAmmoObjectDestroy(bthalfextents);

                return btshape;
            }
        };
    }

    export class Shape3d extends ShapeMixin(THREE.BufferGeometry) { }

    export class PlaneShape3d extends ShapeMixin(THREE.PlaneBufferGeometry) {
        constructor(width?: number, height?: number) {
            width = width || 100;
            height = height || 100;

            super(width, height);

            this.rotateX(-Math.PI / 2);
            this._setCtorCollisionShape(() => this._btCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents)));
        }
    }

    export class BoxShape3d extends ShapeMixin(THREE.BoxBufferGeometry) {
        constructor(
            width?: number,
            height?: number,
            depth?: number,
            openEnded?: boolean,
        ) {
            width = width || 1;
            height = height || 1;
            depth = depth || 1;

            super(width, height, depth);

            this._setShapeVolume(width * height * depth);
            this._setCtorCollisionShape(() => this._btCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents)));
        }
    }

    export class CylinderShape3d extends ShapeMixin(THREE.CylinderBufferGeometry) {
        constructor(
            radius?: number,
            height?: number,
            openEnded?: boolean,
        ) {
            radius = radius || .5;
            height = height || 1;

            super(radius, radius, height, Shape3d._radialSegments, 1, openEnded || false);

            this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height);
            this._setCtorCollisionShape(() => this._btCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btCylinderShape(bthalfextents)));
        }
    }

    export class SphereShape3d extends ShapeMixin(THREE.SphereBufferGeometry) {
        constructor(radius?: number) {
            radius = radius || .5;

            super(radius, Shape3d._radialSegments, Shape3d._radialSegments);

            this._setShapeVolume(4 / 3 * Math.PI * Math.pow(radius, 3));
            this._setCtorCollisionShape(() => new Ammo.btSphereShape(radius!));
        }
    }

    export class ConeShape3d extends ShapeMixin(THREE.ConeBufferGeometry) {
        constructor(radius?: number, height?: number) {
            radius = radius || .5;
            height = height || 1;

            super(radius, height, Shape3d._radialSegments);

            this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height / 3);
            this._setCtorCollisionShape(() => new Ammo.btConeShape(radius!, height!));
        }
    }

    export class TeapotShape3d extends ShapeMixin(THREEX.TeapotBufferGeometry) {
        constructor(size?: number) {
            size = size || 1;

            super(size, Shape3d._patchSegments);

            this._setShapeVolume(1);
            this._setCtorCollisionShape(() => btCollisionShapeFromQuickHull3dResult(new QuickHull3d().calculateFromShape3d(new THREEX.TeapotBufferGeometry(size, 2 /* less segments */))));
        }
    }
}

namespace pxsim.shape {
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

    export function teapotShape(size?: number): TeapotShape3d  {
        return new TeapotShape3d(size);
    }
}
