/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../shared/enums.ts"/>

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class World3d extends rt.DisposableObject {
        private _listenerhelper: SimpleEventListenerHelper;

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

            this._listenerhelper = new SimpleEventListenerHelper(this._renderer.container!);

            this._listenerhelper.addEventListener('blur', (event: FocusEvent) => this._onElementFocused(event.target as HTMLElement, false));
            this._listenerhelper.addEventListener('focus', (event: FocusEvent) => this._onElementFocused(event.target as HTMLElement, true));

            this._listenerhelper.addEventListener('mouseenter', (event: Event) => this._onElementEvent(ScopeId.MouseDevice, MouseEvent_Internal.Enter, event));
            this._listenerhelper.addEventListener('mousemove', (event: MouseEvent) => this._onElementMouseEvent(ScopeId.MouseDevice, MouseEvent_Internal.Move, event));
            this._listenerhelper.addEventListener('mouseleave', (event: Event) => this._onElementEvent(ScopeId.MouseDevice, MouseEvent_Internal.Leave, event));

            this._listenerhelper.addEventListener('mousedown', (event: MouseEvent) => this._onElementMouseEvent(mouseScopeIdFromButton(event.button), MouseButtonEvent.Down, event));
            this._listenerhelper.addEventListener('click', (event: MouseEvent) => this._onElementMouseEvent(mouseScopeIdFromButton(event.button), MouseButtonEvent.Click, event));
            this._listenerhelper.addEventListener('dblclick', (event: MouseEvent) => this._onElementMouseEvent(mouseScopeIdFromButton(event.button), MouseButtonEvent.DoubleClick, event));
            this._listenerhelper.addEventListener('mouseup', (event: MouseEvent) => this._onElementMouseEvent(mouseScopeIdFromButton(event.button), MouseButtonEvent.Up, event));

            // tslint:disable-next-line
            this._listenerhelper.addEventListener('keydown', (event: KeyboardEvent) => this._onElementEvent(keyboardScopeIdFromKey(event.key), KeyEvent.Down, event));
            this._listenerhelper.addEventListener('keypress', (event: KeyboardEvent) => this._onElementEvent(keyboardScopeIdFromKey(event.key), KeyEvent.Press, event));
            this._listenerhelper.addEventListener('keyup', (event: KeyboardEvent) => this._onElementEvent(keyboardScopeIdFromKey(event.key), KeyEvent.Up, event));

            this._onElementFocused(this._renderer.container!, false);
        }

        protected _onDispose() {
            this._listenerhelper.removeAllEventListeners();

            Helper.safeObjectDispose(this._renderer);
            Helper.safeObjectDispose(this._scene3d);
        }

        protected _onElementEvent(sid: ScopeId, evid: EventId, event: Event, value?: EventValue) {
            singletonWorldBoard().events!.queue(sid, evid, value);
        }

        protected _onElementFocused(target: HTMLElement, focused: boolean) {
            target.classList.toggle('blur', !focused);
            target.classList.toggle('focus', focused);
        }

        protected _onElementMouseEvent(sid: ScopeId | undefined, evid: EventId, event: MouseEvent) {
            if (!sid) {
                return;
            }

            if (sid === ScopeId.MouseDeviceButton_Main && evid === MouseButtonEvent.Down) {
                this._renderer.container!.focus();
            }

            const client = this._renderer.canvas!.getBoundingClientRect();

            const x = ((event.clientX - client.left) / client.width) * 2 - 1;
            const y = - ((event.clientY - client.top) / client.height) * 2 + 1;

            this._onElementEvent(sid, evid, event, new EventCoordValue(x, y));
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
