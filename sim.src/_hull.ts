/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC

    OSS: Portions derived from convex geometries & quickhull https://github.com/mrdoob/three.js
*/

import * as Ammo from 'ammo';
import * as THREE from 'three';
import * as THREEX from 'three.extra';

import * as Helper from './_helper';

export const collisionMargin = 0.05;

export function btCollisionShapeFromQuickHull3dResult(result: QuickHull3dResult) {
    const btshape = new Ammo.btConvexHullShape();
    btshape.setMargin(collisionMargin);

    result.hullindexes.forEach(index => btshape.addPoint(Helper.btVector3FromThree(result.vertices[index]) /* btConvexHullShape owns alloc */));

    return btshape;
}

// tslint:disable-next-line:interface-name
export class QuickHull3dResult {
    public area: number = 0;
    public volume: number = 0;

    public hullindexes: number[] = [];

    public vertices: THREE.Vector3[] = [];
    public normals: THREE.Vector3[] = [];
}

// tslint:disable-next-line:interface-name
export interface QuickHull3dOptions {
    includeAreaAndVolume?: boolean;
    excludeGeometry?: boolean;
}

export class QuickHull3d extends THREEX.QuickHull {
    public calculateFromShape3d(geometry: THREE.Geometry | THREE.BufferGeometry, options?: QuickHull3dOptions): QuickHull3dResult {
        let points: THREE.Vector3[];

        if (geometry instanceof THREE.Geometry) {
            points = geometry.vertices;
        } else if (geometry instanceof THREE.BufferGeometry) {
            points = Helper.arrayFromBufferAttribute<THREE.Vector3>(
                geometry.getAttribute('position') as THREE.BufferAttribute, THREE.Vector3);
        } else {
            throw new Error();
        }

        return this.setFromPoints(points)._getResult(options);
    }

    protected _getResult(options?: QuickHull3dOptions) {
        const result = new QuickHull3dResult();

        const origin = new THREE.Vector3();

        this.faces.forEach(face => {
            let edge = face.edge;

            if (options && options.includeAreaAndVolume) {
                result.area += face.area;
                result.volume += Math.abs(face.distanceToPoint(origin)) * face.area;
            }

            if (!(options && options.excludeGeometry)) {
                do {
                    const vertexnode = edge.head();
                    const point = vertexnode.point;

                    const seen = !!vertexnode.userData;
                    vertexnode.userData = true;

                    if (!seen) { result.hullindexes.push(result.vertices.length); }

                    result.vertices.push(point);
                    result.normals.push(face.normal);

                    edge = edge.next;
                } while (edge !== face.edge);
            }
        });

        result.volume /= 3;

        return result;
    }
}
