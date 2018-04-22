/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object.ts"/>

namespace pxsim {
    export type OrbitControls = THREE.OrbitControls;

    // tslint:disable-next-line:variable-name
    export const OrbitControlsConstructor = THREE.OrbitControls;
}

namespace pxsim {
    export function CameraMixin<T extends rt.ObjectConstructor<THREE.Camera>>(base: T) {
        return class extends base {
            private _controls: OrbitControls;

            constructor(...args: any[]) {
                super(args);

                this._controls = new OrbitControlsConstructor(this);
                this._controls.target.set(0, 0, 0);
                this._controls.update();
            }

            public setSize(width: number, height: number) {
                /* do nothing */
            }
        };
    }

    // tslint:disable-next-line:variable-name
    export class Camera extends CameraMixin(Object3dMixin(THREE.Camera)) { }

    export class PerspectiveCamera extends CameraMixin(Object3dMixin(THREE.PerspectiveCamera)) {
        constructor(fov?: number, near?: number, far?: number) {
            super(fov || 60, 1, near || .2, far || 2000);
        }

        public setSize(width: number, height: number) {
            super.setSize(width, height);

            this.aspect = width / height;
            this.updateProjectionMatrix();
        }
    }
}

namespace pxsim.camera {
    export function perspectiveCamera() {
        return new PerspectiveCamera();
    }
}
