/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

namespace pxsim {
    export const enum ScopeId {
        World,

        Scene,

        MouseDevice,
        MouseLeftButton,
        MouseMiddleButton,
        MouseRightButton,

        KeyboardDevice,
    }

    export function sidFromMouseButtonEvent(event: MouseEvent): ScopeId | undefined {
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

    export const enum EventId {
        Animate,

        Enter,
        Move,
        Leave,

        Click,
        DoubleClick,

        Up,
        Press,
        Down,
    }

    export abstract class EventValue {
        public abstract toActionArgs(): any[];
    }

    export class EventCoordValue extends EventValue {
        constructor(public x: number, public y: number) {
            super();
        }

        public toActionArgs(): any[] {
            return [this.x, this.y];
        }
    }

    export class EventKeyValue extends EventValue {
        constructor(public key: KeyboardKey) {
            super();
        }

        public toActionArgs(): any[] {
            return [this.key];
        }
    }

    export class WorldEventBus extends EventBusGeneric<EventValue | string | number> {
        constructor(runtime: Runtime) {
            super(runtime, value => value ? (typeof value === 'object' ? value.toActionArgs() : [value]) : []);
        }
    }
}
