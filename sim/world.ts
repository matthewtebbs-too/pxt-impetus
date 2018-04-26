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

        private _maincanvas: HTMLElement | null;

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

            this._renderer = new Renderer(id);
            this._renderer.scene = this._scene3d;

            this._maincanvas = this._renderer.container;

            this._maincanvas!.onblur = () => this._onContainerFocused(false);
            this._maincanvas!.onfocus = () => this._onContainerFocused(true);

            this._onContainerFocused(false);

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

            // tslint:disable-next-line:no-string-literal
            (this._maincanvas!['onfocus'] as any) = (this._maincanvas!['onblur'] as any) = null;

            Helper.safeObjectDispose(this._renderer);
            Helper.safeObjectDispose(this._scene3d);
        }

        protected _onDocumentMouseEnter = (event: Event) => this._onDocumentEvent(ScopeId.MouseDevice, EventId.Enter, event);
        protected _onDocumentMouseMove = (event: MouseEvent) => this._onDocumentMouseEvent(ScopeId.MouseDevice, EventId.Move, event);
        protected _onDocumentMouseLeave = (event: Event) => this._onDocumentEvent(ScopeId.MouseDevice, EventId.Leave, event);
        protected _onDocumentMouseClick = (event: MouseEvent) => {
            const sid = World3d._sidFromMouseButtonEvent(event);

            if (!sid) {
                return;
            }

            if (ScopeId.MouseLeftButton) {
                if (this._maincanvas) {
                    this._maincanvas!.focus();
                }
            }

            this._onDocumentMouseEvent(sid, EventId.Click, event);
        }

        protected _onDocumentKeyDown = (event: KeyboardEvent) => this._onDocumentKeyEvent(ScopeId.KeyboardDevice, EventId.Down, event);
        protected _onDocumentKeyPress = (event: KeyboardEvent) => this._onDocumentKeyEvent(ScopeId.KeyboardDevice, EventId.Press, event);
        protected _onDocumentKeyUp = (event: KeyboardEvent) => this._onDocumentKeyEvent(ScopeId.KeyboardDevice, EventId.Up, event);

        protected _onDocumentEvent = (sid: ScopeId, evid: EventId, event: Event, value?: EventValue) => {
            singletonWorldBoard().events!.queue(sid, evid, value);
        }

        protected _onDocumentMouseEvent = (sid: ScopeId, evid: EventId, event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = - (event.clientY / window.innerHeight) * 2 + 1;

            this._onDocumentEvent(sid, evid, event, new EventCoordValue(x, y));
        }

        protected _onDocumentKeyEvent = (sid: ScopeId, evid: EventId, event: KeyboardEvent) => {
            this._onDocumentEvent(sid, evid, event, new EventKeyValue(KeyboardKey.F1Key));
        }

        protected _onContainerFocused(focused: boolean) {
            if (this._maincanvas) {
                this._maincanvas.classList.toggle('blur', !focused);
                this._maincanvas.classList.toggle('focus', focused);
            }
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
