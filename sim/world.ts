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

        private _container: HTMLElement | null;

        private _scene3d: Scene3d | null = new Scene3d();
        private _renderer: Renderer;

        public get scene(): Scene3d | null {
            return this._scene3d;
        }

        public get renderer(): Renderer {
            return this._renderer;
        }

        constructor(id?: rt.ObjId) {
            super();

            let strid;
            if (id) {
                strid = id.toString();
            }

            this._container = strid && strid.length > 0 ? document.getElementById(strid) : document.body;

            this._renderer = new Renderer(id);
            this._renderer.scene = this._scene3d;

            if (this._container) {
                this._container.innerHTML = '';

                if (Detector.webgl) {
                    this._container.appendChild(this._renderer.domElement);
                } else {
                    Detector.addGetWebGLMessage({ parent: this._container });
                }
            }

            document.addEventListener('focus', this._onDocumentFocus, false);

            document.addEventListener('mouseenter', this._onDocumentMouseEnter, false);
            document.addEventListener('mousemove', this._onDocumentMouseMove, false);
            document.addEventListener('mouseleave', this._onDocumentMouseLeave, false);
            document.addEventListener('click', this._onDocumentMouseClick, false);

            document.addEventListener('keydown', this._onDocumentKeyDown, false);
            document.addEventListener('keypress', this._onDocumentKeyPress, false);
            document.addEventListener('keyup', this._onDocumentKeyUp, false);
        }

        protected _onDispose() {
            document.removeEventListener('click', this._onDocumentMouseClick, false);
            document.removeEventListener('mouseleave', this._onDocumentMouseLeave, false);
            document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
            document.removeEventListener('mouseenter', this._onDocumentMouseEnter, false);

            document.removeEventListener('keyup', this._onDocumentKeyUp, false);
            document.removeEventListener('keypress', this._onDocumentKeyPress, false);
            document.removeEventListener('keydown', this._onDocumentKeyDown, false);

            document.removeEventListener('focus', this._onDocumentFocus, false);

            if (this._container) {
                this._container.innerHTML = '';
            }

            Helper.safeObjectDispose(this._renderer);
            Helper.safeObjectDispose(this._scene3d);
        }

        protected _onDocumentMouseEnter = (event: Event) => this._onDocumentEvent(ScopeId.MouseDevice, EventId.Enter, event);
        protected _onDocumentMouseMove = (event: MouseEvent) => this._onDocumentMouseEvent(ScopeId.MouseDevice, EventId.Move, event);
        protected _onDocumentMouseLeave = (event: Event) => this._onDocumentEvent(ScopeId.MouseDevice, EventId.Leave, event);
        protected _onDocumentMouseClick = (event: MouseEvent) => this._onDocumentMouseEvent(World3d._sidFromMouseButtonEvent(event), EventId.Click, event);

        protected _onDocumentKeyDown = (event: KeyboardEvent) => this._onDocumentKeyEvent(ScopeId.KeyboardDevice, EventId.Down, event);
        protected _onDocumentKeyPress = (event: KeyboardEvent) => this._onDocumentKeyEvent(ScopeId.KeyboardDevice, EventId.Press, event);
        protected _onDocumentKeyUp = (event: KeyboardEvent) => this._onDocumentKeyEvent(ScopeId.KeyboardDevice, EventId.Up, event);

        protected _onDocumentFocus = (event: FocusEvent) => {
            event.preventDefault();
        }

        protected _onDocumentEvent = (sid: ScopeId | undefined, evid: EventId, event: Event, value?: EventValue) => {
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

        protected _onDocumentKeyEvent = (sid: ScopeId | undefined, evid: EventId, event: KeyboardEvent) => {
            this._onDocumentEvent(sid, evid, event, new EventKeyValue(KeyboardKey.F1Key));
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
