/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class World3D extends rt.ObjectDisposable {
        private _renderer: Renderer;
        private _controls: THREE.OrbitControls | null = null;

        public get renderer(): Renderer {
            return this._renderer;
        }

        public get currentScene(): Scene | null {
            return this._renderer.currentScene;
        }

        public get activeCamera(): GenericCamera | null {
            return this._renderer.activeCamera;
        }

        constructor(id: rt.ObjId = 'container') {
            super();

            this._renderer = new Renderer(id);

            this._renderer.currentScene = new Scene('default');
            this._renderer.activeCamera = new PerspectiveCamera('main');

            const container = document.getElementById(this._renderer.id as string);
            if (container) {
                container.innerHTML = '';
                container.appendChild(this._renderer.domElement);
            }

            this._onWindowResize();

            window.addEventListener('resize', this._onWindowResize, false);
            document.addEventListener('mousemove', this._onDocumentMouseMove, false);

            this._controls = new THREE.OrbitControls(this._renderer.activeCamera.reference);
            this._controls.target.set(0, 2, 0);
            this._controls.update();
        }

        protected _onDispose() {
            document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
            window.removeEventListener('resize', this._onWindowResize, false);

            const container = document.getElementById(this._renderer.id as string);
            if (container) {
                container.innerHTML = '';
            }

            this._renderer.currentScene!.dispose();
            this._renderer.activeCamera!.dispose();
            this._renderer.dispose();
        }

        protected _onWindowResize = () => {
            this._renderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
        }

        protected _onDocumentMouseMove = (event: MouseEvent) => {
            event.preventDefault();

            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = - (event.clientY / window.innerHeight) * 2 + 1;

            pxsim.console.log(`(${x}, ${y})`);
        }
    }
}

namespace pxsim.world {
    export function origin(): Vector  {
        return pxsim.math3d.vector();
    }

    export function currentScene(): Scene {
        return pxsim.currentScene()!;
    }

    export function activeCamera(): GenericCamera {
        return pxsim.activeCamera()!;
    }
}
