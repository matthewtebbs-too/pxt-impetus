/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object.ts"/>

namespace pxsim {
    export type OrbitControls = THREE.OrbitControls;
    export type TrackballControls = THREE.TrackballControls;

    // tslint:disable-next-line:variable-name
    export const OrbitControlsConstructor = THREE.OrbitControls;

    // tslint:disable-next-line:variable-name
    export const TrackballControlsConstructor = THREE.TrackballControls;
}

namespace pxsim {
    export function CameraMixin<T extends rt.ObjectConstructor<THREE.Camera>>(base: T) {
        return class extends base {
            private _controls: OrbitControls | TrackballControls | null = null;

            constructor(...args: any[]) {
                super(...args);
            }

            public attachController(type: CameraController) {
                if (this._controls) {
                    this._controls.dispose();
                    this._controls = null;
                }

                switch (type) {
                    case CameraController.None:
                        break;

                    case CameraController.Orbit:
                        this._controls = new OrbitControlsConstructor(this);
                        break;

                    case CameraController.Trackball:
                        this._controls = new TrackballControlsConstructor(this);
                        break;
                }

                if (this._controls) {
                    this._controls.target.set(0, 0, 0);
                }
            }

            public setSize(width: number, height: number) {
                if (this._controls) {
                    if (this._controls instanceof TrackballControlsConstructor) {
                        this._controls.handleResize();
                    }
                }
            }

            public update() {
                if (this._controls) {
                    this._controls.update();
                }
            }
        };
    }

    // tslint:disable-next-line:variable-name
    export class Camera extends CameraMixin(Object3dMixin(THREE.Camera)) { }

    export class PerspectiveCamera extends CameraMixin(Object3dMixin(THREE.PerspectiveCamera)) {
        private _oldaspect: number = 0.;

        constructor(fov?: number, near?: number, far?: number) {
            super(fov || 60, 1, near || .2, far || 2000);
        }

        public setSize(width: number, height: number) {
            super.setSize(width, height);

            const newaspect = this.aspect = width / height;
            if (this._oldaspect !== newaspect) {
                this._oldaspect = newaspect;
                this.updateProjectionMatrix();
            }
        }
    }
}

namespace pxsim.camera {
    export function perspectiveCamera() {
        return new PerspectiveCamera();
    }
}
