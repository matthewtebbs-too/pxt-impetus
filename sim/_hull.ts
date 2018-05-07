/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC

    OSS: Portions derived from convex geometries & quickhull https://github.com/mrdoob/three.js
*/

namespace pxsim {
    export class QuickHull3dResult {
        public points: THREE.Vector3[] = [];
        public vertices: THREE.Vector3[] = [];
        public normals: THREE.Vector3[] = [];
    }

    export class QuickHull3d extends THREEX.QuickHull {
        public calculateFromShape3d(geometry: THREE.Geometry | THREE.BufferGeometry): QuickHull3dResult {
            let points: THREE.Vector3[];

            if (geometry instanceof THREE.Geometry) {
                points = geometry.vertices;
            } else if (geometry instanceof THREE.BufferGeometry) {
                points = Helper.arrayFromBufferAttribute<THREE.Vector3>(
                    geometry.getAttribute('position') as THREE.BufferAttribute, THREE.Vector3);
            } else {
                throw new Error();
            }

            return this.setFromPoints(points)._getResult();
        }

        protected _getResult() {
            const result = new QuickHull3dResult();

            this.faces.forEach(face => {
                let edge = face.edge;

                do {
                    const vertexnode = edge.head();
                    const point = vertexnode.point;

                    const seen = !!vertexnode.userData;
                    vertexnode.userData = true;

                    if (!seen) { result.points.push(point); }
                    result.vertices.push(point);
                    result.normals.push(face.normal);

                    edge = edge.next;
                } while (edge !== face.edge);
            });

            return result;
        }
    }
}
