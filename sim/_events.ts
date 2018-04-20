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
    }

    export const enum EventId {
        Animate,

        Enter,
        Move,
        Leave,

        Click,
        DoubleClick,
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

    export class WorldEventBus extends EventBusGeneric<EventValue | string | number> {
        constructor(runtime: Runtime) {
            super(runtime, value => value ? (typeof value === 'object' ? value.toActionArgs() : [value]) : []);
        }
    }
}
