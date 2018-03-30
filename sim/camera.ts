/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object3d.ts'/>

namespace pxsim {
    export abstract class Camera<T extends THREE.Camera> extends Object3d<T> {
    }

    export type GenericCamera = Camera<THREE.Camera>;

    export class PerspectiveCamera extends Camera<THREE.PerspectiveCamera> {
        constructor(
            fov?: number,
            near?: number,
            far?: number,
            id?: rt.ObjId,
        ) {
            fov = fov || 60;
            near = near || .2;
            far = far || 2000;

            super(new THREE.PerspectiveCamera(fov, 1, near, far), id);
        }

        public resize(width: number, height: number) {
            super.resize(width, height);

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
