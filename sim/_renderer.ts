/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class Renderer extends rt.WrappedObjectWithId<THREE.WebGLRenderer> {
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

        private _domElement: HTMLElement = document.createElement('div');

        private _scene3d: GenericScene3d | null = null;
        private _camera: GenericCamera | null = null;
        private _stats: Stats = new Stats();

        private _clock: THREE.Clock = new THREE.Clock();

        private _paused: boolean = false;

        private _callbackRequestId: number = 0;

        public get domElement(): HTMLElement {
            return this._domElement;
        }

        public get scene(): GenericScene3d | null {
            return this._scene3d;
        }

        public set scene(value: GenericScene3d | null) {
            this._scene3d = value;
            this._updateSceneCameraSize();
        }

        public get isPaused(): boolean {
            return this._paused;
        }

        public set pause(value: boolean) {
            this._paused = value;
        }

        constructor(id: rt.ObjId = 'container') {
            super(Renderer._instantiateReference(id), id);

            this._domElement.appendChild(this.reference.domElement);
            this._domElement.appendChild(this._stats.dom);

            this.reference.shadowMap.enabled = true;
            this.reference.shadowMap.type = THREE.PCFSoftShadowMap;
            this.reference.setClearColor(Palette.LightCyan);

            this._runRenderLoop();
        }

        public animate() {
            if (!this._scene3d) {
                return;
            }

            this._scene3d.animate(this._clock.getDelta());
        }

        public render() {
            if (!this._scene3d) {
                return;
            }

            const camera = this._scene3d.camera();
            if (camera) {
                this.reference.render(this._scene3d.reference, camera. reference);
            }
        }

        public resize(width: number, height: number, devicePixelRatio: number) {
            this.reference.setPixelRatio(devicePixelRatio);
            this.reference.setSize(width, height);

            this._updateSceneCameraSize();
        }

        protected _onDispose() {
            this._stopRenderLoop();
        }

        protected _updateSceneCameraSize() {
            if (!this._scene3d) {
                return;
            }

            const camera = this._scene3d.camera();
            if (camera) {
                const size = this.reference.getSize();
                camera.setSize(size.width, size.height);
            }
        }

        private _runRenderLoop() {
            this._callbackRequestId = requestAnimationFrame((time: number) => {
                if (!this._paused) {
                    if (this._stats) {
                        this._stats.begin();
                    }

                    this.animate();
                    this.render();

                    if (this._stats) {
                        this._stats.end();
                    }
                }

                this._runRenderLoop();
            });
        }

        private _stopRenderLoop() {
            if (0 !== this._callbackRequestId) {
                cancelAnimationFrame(this._callbackRequestId);
                this._callbackRequestId = 0;
            }
        }
    }
}
