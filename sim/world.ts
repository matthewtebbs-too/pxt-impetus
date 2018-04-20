/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class World3d extends rt.DisposableObject {
        protected static _sidFromMouseButtonEvent(event: MouseEvent): ScopeId | undefined {
            let sid;

            if (0 === event.button) {
                sid = ScopeId.MouseLeftButton;
            } else if (1 === event.button) {
                sid = ScopeId.MouseMiddleButton;
            } else if (2 === event.button) {
                sid = ScopeId.MouseRightButton;
            }

            return sid;
        }

        private _renderer: Renderer;

        private _scene: Scene3d;

        public get renderer(): Renderer {
            return this._renderer;
        }

        public get scene(): Scene3d {
            return this._scene;
        }

        public set scene(scene: Scene3d) {
            this._scene = scene;
        }

        constructor(id: rt.ObjId = 'container') {
            super();

            this._renderer = new Renderer(id);

            this._scene = new Scene3d();
            this._updateRendererScene();

            const container = document.getElementById(this._renderer.id as string);
            if (container) {
                container.innerHTML = '';

                if (Detector.webgl) {
                    container.appendChild(this._renderer.domElement);
                } else {
                    Detector.addGetWebGLMessage({ parent: container });
                }
            }

            this._onWindowResize();

            window.addEventListener('resize', this._onWindowResize, false);
            document.addEventListener('mouseenter', this._onDocumentMouseEnter, false);
            document.addEventListener('mousemove', this._onDocumentMouseMove, false);
            document.addEventListener('mouseleave', this._onDocumentMouseLeave, false);
            document.addEventListener('click', this._onDocumentMouseClick, false);
        }

        protected _onDispose() {
            document.removeEventListener('click', this._onDocumentMouseClick, false);
            document.removeEventListener('mouseleave', this._onDocumentMouseLeave, false);
            document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
            document.removeEventListener('mouseenter', this._onDocumentMouseEnter, false);
            window.removeEventListener('resize', this._onWindowResize, false);

            const container = document.getElementById(this._renderer.id as string);
            if (container) {
                container.innerHTML = '';
            }

            /* TODO$: put somewhere else */
            Helper.safeObjectDispose(this._renderer.scene);
            Helper.safeObjectDispose(this._renderer);
        }

        protected _updateRendererScene() {
            this._renderer.scene = this._scene;
        }

        protected _onWindowResize = () => {
            this._renderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
        }

        protected _onDocumentMouseEnter = (event: Event) => this._onDocumentEvent(ScopeId.MouseDevice, EventId.Enter, event);
        protected _onDocumentMouseMove = (event: MouseEvent) => this._onDocumentMouseEvent(ScopeId.MouseDevice, EventId.Move, event);
        protected _onDocumentMouseLeave = (event: Event) => this._onDocumentEvent(ScopeId.MouseDevice, EventId.Leave, event);
        protected _onDocumentMouseClick = (event: MouseEvent) => this._onDocumentMouseEvent(World3d._sidFromMouseButtonEvent(event), EventId.Click, event);

        protected _onDocumentEvent = (sid: ScopeId | undefined, evid: EventId, event: Event, value?: EventValue) => {
            event.preventDefault();

            if (!sid) {
                return;
            }

            singletonWorldBoard().events!.queue(sid, evid, value);
        }

        protected _onDocumentMouseEvent = (sid: ScopeId | undefined, evid: EventId, event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = - (event.clientY / window.innerHeight) * 2 + 1;

            this._onDocumentEvent(sid, evid, event, new EventCoordValue(x, y));
        }
    }
}

namespace pxsim.world {
    export function world(): World3d | null {
        return singletonWorldBoard().world;
    }

    export function scene(): Scene3d | null {
        const world3d = pxsim.world.world();
        return world3d ? world3d.scene : null;
    }
}
