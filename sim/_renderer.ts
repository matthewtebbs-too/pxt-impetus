/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export type Clock = THREE.Clock;

    // tslint:disable-next-line:variable-name
    export const ClockConstructor = THREE.Clock;
}

namespace pxsim {
    export class Renderer extends rt.ProxyObject<THREE.WebGLRenderer> {
        private static _renderers: _Map<rt.ObjId, THREE.WebGLRenderer> = new Map<rt.ObjId, THREE.WebGLRenderer>();

        private static _instantiateReference(id: rt.ObjId): THREE.WebGLRenderer {
            let webglrenderer = Renderer._renderers.get(id);
            if (!webglrenderer) {
                Renderer._renderers.set(id, webglrenderer = new THREE.WebGLRenderer({ antialias: true }));

                webglrenderer.shadowMap.enabled = true;
                webglrenderer.shadowMap.type = THREE.PCFSoftShadowMap;
            }

            return webglrenderer;
        }

        private _id: rt.ObjId;

        private _domElement: HTMLElement = document.createElement('div');

        private _scene3d: Scene3d | null = null;
        private _stats: Stats = new Stats();
        private _clock: Clock = new ClockConstructor();
        private _paused: boolean = false;

        private _callbackRequestId: number = 0;

        public get id(): rt.ObjId {
            return this._id;
        }

        public get domElement(): HTMLElement {
            return this._domElement;
        }

        public get scene(): Scene3d | null {
            return this._scene3d;
        }

        public set scene(scene3d: Scene3d | null) {
            this._scene3d = scene3d;
        }

        public get isPaused(): boolean {
            return this._paused;
        }

        public set pause(value: boolean) {
            this._paused = value;
        }

        constructor(id: rt.ObjId = 'container') {
            super(Renderer._instantiateReference(id));

            this._id = id;

            this._domElement.appendChild(this.reference.domElement);
            this._domElement.appendChild(this._stats.dom);

            this.reference.shadowMap.enabled = true;
            this.reference.shadowMap.type = THREE.PCFSoftShadowMap;
            this.reference.setClearColor(Palette.LightGray);

            this.runRenderLoop();
        }

        public runRenderLoop() {
            this._callbackRequestId = requestAnimationFrame((time: number) => {
                if (!this._paused) {
                    this._stats.begin();

                    let wasRendered = false;

                    const scene3d = this._scene3d;
                    if (scene3d) {
                        scene3d.animate(this._clock.getDelta());

                        const camera = scene3d.camera;
                        if (camera) {
                            const size = this.reference.getSize();
                            camera.setSize(size.width, size.height);

                            this.reference.render(scene3d, camera);

                            wasRendered = true;
                        }
                    }

                    if (!wasRendered) {
                         this.reference.clear();
                    }

                    this._stats.end();
                }

                this.runRenderLoop();
            });
        }

        public stopRenderLoop() {
            if (0 !== this._callbackRequestId) {
                cancelAnimationFrame(this._callbackRequestId);
                this._callbackRequestId = 0;
            }
        }

        public resize(width: number, height: number, devicePixelRatio: number) {
            this.reference.setPixelRatio(devicePixelRatio);
            this.reference.setSize(width, height);
        }

        protected _onDispose() {
            this.stopRenderLoop();
        }
    }
}
