/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object3d.ts'/>

namespace pxsim {
    export abstract class Camera<T extends THREE.Camera> extends Object3D<T> {
    }

    export type GenericCamera = Camera<THREE.Camera>;

    export class PerspectiveCamera extends Camera<THREE.PerspectiveCamera> {
        constructor(id: rt.ObjId) {
            super(new THREE.PerspectiveCamera(), id);

            this.reference.fov = 60;
            this.reference.near = 0.2;
            this.reference.far = 2000;
            this.reference.position.set(-40, 20, 15);
        }

        public resize(width: number, height: number) {
            super.resize(width, height);

            this.reference.aspect = width / height;
            this.reference.updateProjectionMatrix();
        }
    }
}
