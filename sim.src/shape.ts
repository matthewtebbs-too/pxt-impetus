/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Ammo from 'ammo';
import * as THREE from 'three';
import * as THREEX from 'three.extra';

import * as Helper from './_helper';
import { btCollisionShapeFromQuickHull3dResult, collisionMargin, QuickHull3d } from './_hull';
import * as RT from './_runtime';

export function ShapeMixin<T extends RT.ObjectConstructor<THREE.BufferGeometry>>(base: T) {
    return class extends base implements RT.ICloneableObject, RT.IDisposableObject {
        protected static _radialSegments = 32;
        protected static _radialSegmentsHull = 12;

        protected static _tubulaSegments = 24;
        protected static _tubulaSegmentsHull = 8;

        protected static _patchSegments = 10;
        protected static _patchSegmentsHull = 2;

        protected _volumeFn: (() => number) | null = null;
        protected _btCollisionShapeFn: (() => Ammo.btCollisionShape) | null = null;

        private _volumeCached: number | undefined;
        private _btshapeCached: Ammo.btCollisionShape | undefined;

        constructor(...args: any[]) {
            super(...args);
        }

        public dispose() {
            super.dispose();

            Helper.safeAmmoObjectDestroy(this._btshapeCached);
        }

        public get volume(): number {
            return this._volumeFn ? (this._volumeCached || (this._volumeCached = this._volumeFn())) : 0;
        }

        public btCollisionShape(): Ammo.btCollisionShape | null {
           return this._btCollisionShapeFn ? (undefined !== this._btshapeCached ? this._btshapeCached : (this._btshapeCached = this._btCollisionShapeFn!())) : null;
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
            btshape.setMargin(collisionMargin);

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
    constructor(width: number, height: number) {
        super(width, height);

        this.rotateX(-Math.PI / 2);
        this._btCollisionShapeFn = () => this._btCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents));
    }
}

export class BoxShape3d extends ShapeMixin(THREE.BoxBufferGeometry) {
    constructor(width: number, height: number, depth: number) {
        super(width, height, depth);

        this._volumeFn = () => width! * height! * depth!;
        this._btCollisionShapeFn = () => this._btCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btBoxShape(bthalfextents));
    }
}

export class CylinderShape3d extends ShapeMixin(THREE.CylinderBufferGeometry) {
    constructor(radius: number, height: number) {
        super(radius, radius, height, Shape3d._radialSegments, 1, false);

        this._volumeFn = () => Math.PI * Math.pow(radius!, 2) * height!;
        this._btCollisionShapeFn = () => this._btCollisionShapeFromHalfExtents(bthalfextents => new Ammo.btCylinderShape(bthalfextents));
    }
}

export class SphereShape3d extends ShapeMixin(THREE.SphereBufferGeometry) {
    constructor(radius: number) {
        super(radius, Shape3d._radialSegments, Shape3d._radialSegments);

        this._volumeFn = () => 4 / 3 * Math.PI * Math.pow(radius!, 3);
        this._btCollisionShapeFn = () => new Ammo.btSphereShape(radius!);
    }
}

export class ConeShape3d extends ShapeMixin(THREE.ConeBufferGeometry) {
    constructor(radius: number, height: number) {
        super(radius, height, Shape3d._radialSegments);

        this._volumeFn = () => Math.PI * Math.pow(radius!, 2) * height! / 3;
        this._btCollisionShapeFn = () => new Ammo.btConeShape(radius!, height!);
    }
}

export function PolyhedronMixin<T extends RT.ObjectConstructor<THREE.PolyhedronBufferGeometry>>(base: T) {
    return class extends base implements RT.ICloneableObject {
    };
}

export class TetrahedronShape3d extends PolyhedronMixin(ShapeMixin(THREE.TetrahedronBufferGeometry)) {
    constructor(radius: number) {
        super(radius);

        this._setVolumeAndCollisionShapeFromGeometry();
    }
}

export class OctahedronShape3d extends PolyhedronMixin(ShapeMixin(THREE.OctahedronBufferGeometry)) {
    constructor(radius: number) {
        super(radius);

        this._setVolumeAndCollisionShapeFromGeometry();
    }
}

export class IcosahedronShape3d extends PolyhedronMixin(ShapeMixin(THREE.IcosahedronBufferGeometry)) {
    constructor(radius: number) {
        super(radius);

        this._setVolumeAndCollisionShapeFromGeometry();
    }
}

export class DodecahedronShape3d extends PolyhedronMixin(ShapeMixin(THREE.DodecahedronBufferGeometry)) {
    constructor(radius: number) {
        super(radius);

        this._setVolumeAndCollisionShapeFromGeometry();
    }
}

export class TorusShape3d extends ShapeMixin(THREE.TorusBufferGeometry) {
    constructor(radius: number, tube: number) {
        super(radius, tube, Shape3d._radialSegments, Shape3d._tubulaSegments);

        this._setVolumeAndCollisionShapeFromGeometry(
            new THREE.TorusBufferGeometry(radius, tube, Shape3d._radialSegmentsHull, Shape3d._tubulaSegmentsHull),
        );
    }
}

export class TorusKnotShape3d extends ShapeMixin(THREE.TorusKnotBufferGeometry) {
    constructor(radius: number, tube: number) {
        super(radius, tube, Shape3d._radialSegments, Shape3d._tubulaSegments * 2);

        this._setVolumeAndCollisionShapeFromGeometry(
            new THREE.TorusKnotBufferGeometry(radius, tube, Shape3d._radialSegmentsHull, Shape3d._tubulaSegmentsHull * 2),
        );
    }
}

export class TeapotShape3d extends ShapeMixin(THREEX.TeapotBufferGeometry) {
    constructor(size: number) {
        super(size, Shape3d._patchSegments);

        this._setVolumeAndCollisionShapeFromGeometry(
            new THREEX.TeapotBufferGeometry(size, Shape3d._patchSegmentsHull),
        );
    }
}

namespace pxsimImpetus.shape {
    export function planeShape(width?: number, height?: number): PlaneShape3d {
        width = width || 100;
        height = height || 100;

        return new PlaneShape3d(width, height);
    }

    export function boxShape(width?: number, height?: number, depth?: number): BoxShape3d {
        width = width || 1;
        height = height || 1;
        depth = depth || 1;

        return new BoxShape3d(width, height, depth);
    }

    export function cylinderShape(radius?: number, height?: number): CylinderShape3d  {
        radius = radius || .5;
        height = height || 1;

        return new CylinderShape3d(radius, height);
    }

    export function sphereShape(radius?: number): SphereShape3d  {
        radius = radius || .5;

        return new SphereShape3d(radius);
    }

    export function coneShape(radius?: number, height?: number): ConeShape3d  {
        radius = radius || .5;
        height = height || 1;

        return new ConeShape3d(radius, height);
    }

    export function polyhedronShape(polyhedron: Polyhedron, radius?: number): TetrahedronShape3d | OctahedronShape3d | IcosahedronShape3d | DodecahedronShape3d {
        radius = radius || .5;

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

    export function torusShape(torus: Torus, radius?: number, tube?: number): TorusShape3d | TorusKnotShape3d {
        radius = radius || .5;
        tube = tube || .2;

        switch (torus) {
            case Torus.Circle:
                return new TorusShape3d(radius, tube);

            case Torus.Knot:
                return new TorusKnotShape3d(radius, tube);
        }
    }

    export function teapotShape(size?: number): TeapotShape3d  {
        size = size || 1;

        return new TeapotShape3d(size);
    }
}
