/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object.ts'/>

namespace pxsim {
    export abstract class Camera<T extends THREE.Camera> extends Object3d<T> {
        public setSize(width: number, height: number) {
            /* do nothing */
        }
    }

    export type GenericCamera = Camera<THREE.Camera>;

    export class PerspectiveCamera extends Camera<THREE.PerspectiveCamera> {
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
