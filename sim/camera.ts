/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object.ts"/>

namespace pxsim {
    export class CameraImpl<T extends THREE.Camera> extends Object3dImpl<T> implements Camera {
        public setSize(width: number, height: number) {
            /* do nothing */
        }
    }

    export class PerspectiveCamera extends CameraImpl<THREE.PerspectiveCamera> {
        constructor(
            fov?: number,
            near?: number,
            far?: number,
        ) {
            fov = fov || 60;
            near = near || .2;
            far = far || 2000;

            super(new THREE.PerspectiveCamera(fov, 1, near, far));
        }

        public setSize(width: number, height: number) {
            super.setSize(width, height);

            this.reference.aspect = width / height;
            this.reference.updateProjectionMatrix();
        }
    }
}

namespace pxsim.camera {
    export function perspective() {
        return new PerspectiveCamera();
    }
}
