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

            protected _volumeFn: (() => number) | null = null;
            protected _btCollisionShapeFn: (() => Ammo.btCollisionShape) | null = null;

            public get volume(): number {
                return this._volumeFn ? this._volumeFn() : 0;
            }

            public btCollisionShape(): Ammo.btCollisionShape {
                return this._btCollisionShapeFn!();
            }

            public copy(source: this): this {
                super.copy(source);

                throw new Error();
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

            protected _setVolumeAndCollisionShapeFromGeometry(geometry?: THREE.Geometry | THREE.BufferGeometry) {
                const result = new QuickHull3d().calculateFromShape3d(geometry || this, { includeAreaAndVolume: true });

                this._volumeFn = () => result.volume;
                this._btCollisionShapeFn = () => btCollisionShapeFromQuickHull3dResult(result);
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
            this._btCollisionShapeFn = () => this._btCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents));
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

            this._volumeFn = () => width! * height! * depth!;
            this._btCollisionShapeFn = () => this._btCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents));
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

            this._volumeFn = () => Math.PI * Math.pow(radius!, 2) * height!;
            this._btCollisionShapeFn = () => this._btCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btCylinderShape(bthalfextents));
        }
    }

    export class SphereShape3d extends ShapeMixin(THREE.SphereBufferGeometry) {
        constructor(radius?: number) {
            radius = radius || .5;

            super(radius, Shape3d._radialSegments, Shape3d._radialSegments);

            this._volumeFn = () => 4 / 3 * Math.PI * Math.pow(radius!, 3);
            this._btCollisionShapeFn = () => new Ammo.btSphereShape(radius!);
        }
    }

    export class ConeShape3d extends ShapeMixin(THREE.ConeBufferGeometry) {
        constructor(radius?: number, height?: number) {
            radius = radius || .5;
            height = height || 1;

            super(radius, height, Shape3d._radialSegments);

            this._volumeFn = () => Math.PI * Math.pow(radius!, 2) * height! / 3;
            this._btCollisionShapeFn = () => new Ammo.btConeShape(radius!, height!);
        }
    }

    export function PolyhedronMixin<T extends rt.ObjectConstructor<THREE.PolyhedronBufferGeometry>>(base: T) {
        return class extends base implements rt.ICloneableObject {
        };
    }

    export class TetrahedronShape3d extends PolyhedronMixin(ShapeMixin(THREE.TetrahedronBufferGeometry)) {
        constructor(radius?: number) {
            radius = radius || .5;

            super(radius);

            this._setVolumeAndCollisionShapeFromGeometry();
        }
    }

    export class OctahedronShape3d extends PolyhedronMixin(ShapeMixin(THREE.OctahedronBufferGeometry)) {
        constructor(radius?: number) {
            radius = radius || .5;

            super(radius);

            this._setVolumeAndCollisionShapeFromGeometry();
        }
    }

    export class IcosahedronShape3d extends PolyhedronMixin(ShapeMixin(THREE.IcosahedronBufferGeometry)) {
        constructor(radius?: number) {
            radius = radius || .5;

            super(radius);

            this._setVolumeAndCollisionShapeFromGeometry();
        }
    }

    export class DodecahedronShape3d extends PolyhedronMixin(ShapeMixin(THREE.DodecahedronBufferGeometry)) {
        constructor(radius?: number) {
            radius = radius || .5;

            super(radius);

            this._setVolumeAndCollisionShapeFromGeometry();
        }
    }

    export class TeapotShape3d extends ShapeMixin(THREEX.TeapotBufferGeometry) {
        constructor(size?: number) {
            size = size || 1;

            super(size, Shape3d._patchSegments);

            this._setVolumeAndCollisionShapeFromGeometry(Shape3d._patchSegments > 2 ? new THREEX.TeapotBufferGeometry(size, 2 /* less segments */) : undefined);
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

    export function polyhedronShape(polyhedron: Polyhedron, radius?: number): PolyhedronShape3d {
        switch (polyhedron) {
            case Polyhedron.Tetrahedron:
                return new TetrahedronShape3d(radius);

            case Polyhedron.Octahedron:
                return new OctahedronShape3d(radius);

            case Polyhedron.Icosahedron:
                return new IcosahedronShape3d(radius);

            case Polyhedron.Dodecahedron:
                return new DodecahedronShape3d(radius);
        }
    }

    export function teapotShape(size?: number): TeapotShape3d  {
        return new TeapotShape3d(size);
    }
}
