/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export abstract class Geometry<T extends THREE.Geometry> extends rt.WrappedObjectWithId<T> {
        public static radialSegments = 32;
        public static collisionMargin = 0.05;

        protected _btshape: Ammo.btCollisionShape | null = null;
        protected _volume: number = 1;

        public get btCollisionShape(): Ammo.btCollisionShape | null {
            return this._btshape;
        }

        public get volumeOfShape(): number {
            return this._volume;
        }

        protected _onDispose() {
            Helper.safeAmmoDestroy(this._btshape);
        }

        protected get _halfExtents(): THREE.Vector3 {
            this.reference.computeBoundingBox();

            const size: THREE.Vector3 = new THREE.Vector3();

            return this.reference.boundingBox.getSize(size).divideScalar(2);
        }

        protected get _radius(): number {
            this.reference.computeBoundingSphere();

            return this.reference.boundingSphere.radius;
        }

        protected _initFrom(
            btshape: Ammo.btCollisionShape,
            volume: number,
        ): Ammo.btCollisionShape {
            btshape.setMargin(Geometry.collisionMargin);

            this._volume = volume;
            return this._btshape = btshape;
        }

        protected _initFromRadius(
            btshapeCtor: (r: number) => Ammo.btCollisionShape,
            volumeCalc: (r: number) => number,
        ): Ammo.btCollisionShape {
            return this._initFrom(btshapeCtor(this._radius), volumeCalc(this._radius));
        }

        protected _initFromHalfExtents(
            btshapeCtor: (h: Ammo.btVector3) => Ammo.btCollisionShape,
            volumeCalc: (h: THREE.Vector3) => number,
        ): Ammo.btCollisionShape {
            let btvecHalfExtents;

            const btshape = btshapeCtor(btvecHalfExtents = Helper.btVector3FromThree(this._halfExtents));

            Helper.safeAmmoDestroy(btvecHalfExtents);

            return this._initFrom(btshape, volumeCalc(this._halfExtents));
        }
    }

    export type GenericGeometry = Geometry<THREE.Geometry>;

    export class PlaneGeometry extends Geometry<THREE.PlaneGeometry> {
        constructor(width?: number, height?: number, id?: rt.ObjId) {
            const w = width || 100;
            const h = height || 100;

            super(new THREE.PlaneGeometry(w, h).rotateX(-Math.PI / 2) as THREE.PlaneGeometry, id);

            this._initFromHalfExtents(xts => new Ammo.btBoxShape(xts) /* btshape */, xts => 0 /* volume */);
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
            const w = width || 1;
            const h = height || 1;
            const d = depth || 1;

            super(new THREE.BoxGeometry(w, h, d), id);

            this._initFromHalfExtents(xts => new Ammo.btBoxShape(xts) /* btshape */, xts => xts.x * xts.y * xts.z /* volume */);
        }
    }

    export class CylinderGeometry extends Geometry<THREE.CylinderGeometry> {
        constructor(
            radius?: number,
            height?: number,
            openEnded?: boolean,
            id?: rt.ObjId,
        ) {
            const r = radius || .5;
            const h = height || 1;

            super(new THREE.CylinderGeometry(r, r, h, Geometry.radialSegments, 1, openEnded || false), id);

            this._initFromHalfExtents(xts => new Ammo.btCylinderShape(xts) /* btshape */, xts => Math.PI * Math.pow(r, 2) * xts.y /* volume */);
        }
    }

    export class SphereGeometry extends Geometry<THREE.SphereGeometry> {
        constructor(radius?: number, id?: rt.ObjId) {
            const r = radius || .5;

            super(new THREE.SphereGeometry(r, Geometry.radialSegments, Geometry.radialSegments), id);

            this._initFromRadius(_r => new Ammo.btSphereShape(r) /* btshape */, _r => 4 / 3 * Math.PI * Math.pow(r, 3) /* volume */);
        }
    }

    export class ConeGeometry extends Geometry<THREE.ConeGeometry> {
        constructor(radius?: number, height?: number, id?: rt.ObjId) {
            const r = radius || .5;
            const h = height || 1;

            super(new THREE.ConeGeometry(r, h, Geometry.radialSegments), id);

            this._initFrom(new Ammo.btConeShape(r, h) /* btshape */, Math.PI * Math.pow(r, 2) * h / 3 /* volume */);
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
