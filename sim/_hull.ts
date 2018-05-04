/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC

    OSS: Portions derived from convex geometries & quickhull https://github.com/mrdoob/three.js
*/

namespace pxsim {
    export class QuickHull3dVectors {
        public vertices: THREE.Vector3[] = [];
        public normals: THREE.Vector3[] = [];
    }

    export class QuickHull3d extends THREEX.QuickHull {
        public setFromShape3d(shape3d: Shape3d) {
            this.setFromPoints(Helper.arrayFromBufferAttribute<THREE.Vector3>(
                shape3d.getAttribute('position') as THREE.BufferAttribute, THREE.Vector3));
        }

        public getVectors() {
            const vectors = new QuickHull3dVectors();

            this.faces.forEach(face => {
                let edge = face.edge;

                do {
                    const point = edge.head().point;

                    vectors.vertices.push(point);
                    vectors.normals.push(face.normal);

                    edge = edge.next;
                } while (edge !== face.edge);
            });

            return vectors;
        }
    }
}
