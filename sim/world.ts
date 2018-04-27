/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../shared/enums.ts"/>

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class World3d extends rt.DisposableObject {
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

            this._renderer.container!.addEventListener('blur', this._onElementBlur, true);
            this._renderer.container!.addEventListener('focus', this._onElementFocus, true);

            this._renderer.container!.addEventListener('mouseenter', this._onElementMouseEnter);
            this._renderer.container!.addEventListener('mousemove', this._onElementMouseMove);
            this._renderer.container!.addEventListener('mousedown', this._onElementMouseDown);
            this._renderer.container!.addEventListener('mouseleave', this._onElementMouseLeave);
            this._renderer.container!.addEventListener('click', this._onElementMouseClick);

            this._renderer.container!.addEventListener('keydown', this._onElementKeyDown);
            this._renderer.container!.addEventListener('keypress', this._onElementKeyPress);
            this._renderer.container!.addEventListener('keyup', this._onElementKeyUp);

            this._onElementFocused(this._renderer.container!, false);
        }

        protected _onDispose() {
            this._renderer.container!.removeEventListener('click', this._onElementMouseClick);
            this._renderer.container!.removeEventListener('mouseleave', this._onElementMouseLeave);
            this._renderer.container!.removeEventListener('mousemove', this._onElementMouseMove);
            this._renderer.container!.removeEventListener('mouseenter', this._onElementMouseEnter);

            this._renderer.container!.removeEventListener('keyup', this._onElementKeyUp);
            this._renderer.container!.removeEventListener('keypress', this._onElementKeyPress);
            this._renderer.container!.removeEventListener('keydown', this._onElementKeyDown);

            this._renderer.container!.removeEventListener('focus', this._onElementFocus, true);
            this._renderer.container!.removeEventListener('blur', this._onElementBlur, true);

            Helper.safeObjectDispose(this._renderer);
            Helper.safeObjectDispose(this._scene3d);
        }

        protected _onElementEvent = (sid: ScopeId, evid: EventId, event: Event, value?: EventValue) => {
            singletonWorldBoard().events!.queue(sid, evid, value);
        }

        protected _onElementFocused = (target: HTMLElement, focused: boolean) => {
            target.classList.toggle('blur', !focused);
            target.classList.toggle('focus', focused);
        }

        protected _onElementMouseEvent = (sid: ScopeId, evid: EventId, event: MouseEvent) => {
            const client = this._renderer.canvas!.getBoundingClientRect();

            const x = ((event.clientX - client.left) / client.width) * 2 - 1;
            const y = - ((event.clientY - client.top) / client.height) * 2 + 1;

            this._onElementEvent(sid, evid, event, new EventCoordValue(x, y));
        }

        protected _onElementKeyEvent = (sid: ScopeId, evid: EventId, event: KeyboardEvent) => {
            this._onElementEvent(sid, evid, event, new EventKeyValue(KeyboardKey[event.key]));
        }

        protected _onElementMouseEnter = (event: Event) => this._onElementEvent(ScopeId.MouseDevice, EventId.Enter, event);
        protected _onElementMouseMove = (event: MouseEvent) => this._onElementMouseEvent(ScopeId.MouseDevice, EventId.Move, event);
        protected _onElementMouseDown = (event: MouseEvent) => {
            const sid = sidFromMouseButtonEvent(event);
            if (sid && sid === ScopeId.MouseLeftButton) {
                this._renderer.container!.focus();
            }
        }
        protected _onElementMouseLeave = (event: Event) => this._onElementEvent(ScopeId.MouseDevice, EventId.Leave, event);
        protected _onElementMouseClick = (event: MouseEvent) => {
            const sid = sidFromMouseButtonEvent(event);
            if (sid) {
                this._onElementMouseEvent(sid, EventId.Click, event);
            }
        }

        protected _onElementKeyDown = (event: KeyboardEvent) => this._onElementKeyEvent(ScopeId.KeyboardDevice, EventId.Down, event);
        protected _onElementKeyPress = (event: KeyboardEvent) => this._onElementKeyEvent(ScopeId.KeyboardDevice, EventId.Press, event);
        protected _onElementKeyUp = (event: KeyboardEvent) => this._onElementKeyEvent(ScopeId.KeyboardDevice, EventId.Up, event);

        protected _onElementBlur = (event: FocusEvent) => this._onElementFocused(event.target as HTMLElement, false);
        protected _onElementFocus = (event: FocusEvent) => this._onElementFocused(event.target as HTMLElement, true);
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
