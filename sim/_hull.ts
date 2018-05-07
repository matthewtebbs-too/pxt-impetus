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
        public calculateFromShape3d(shape3d: Shape3d): QuickHull3dResult {
            this.setFromPoints(Helper.arrayFromBufferAttribute<THREE.Vector3>(
                shape3d.getAttribute('position') as THREE.BufferAttribute, THREE.Vector3));

            return this._getResult();
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
