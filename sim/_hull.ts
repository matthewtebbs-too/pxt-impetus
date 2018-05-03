/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC

    OSS: Portions derived from convex geometries & quickhull https://github.com/mrdoob/three.js
*/

namespace pxsim {
    export class QuickHull3d extends THREEX.QuickHull {
        public setFromShape3d(shape3d: Shape3d) {
            this.setFromPoints(shape3d.getArrayAttribute<THREE.Vector3>('position', THREE.Vector3));
        }
    }
}
