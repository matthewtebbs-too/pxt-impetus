/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../shared/enums.ts"/>

namespace pxsim {
    export const enum ScopeId {
        WorldObject = 0x000,

        SceneObject = 0x100,

        KeyboardDevice = 0x200,

        MouseDevice = 0x300,
        MouseDevice_MainButton = MouseDevice + MouseButton.Main,
        MouseDevice_AuxiliaryButton = MouseDevice + MouseButton.Auxiliary,
        MouseDevice_SecondaryButton = MouseDevice + MouseButton.Secondary,
        MouseDevice_FourthButton = MouseDevice + MouseButton.Fourth,
        MouseDevice_FifthButton = MouseDevice + MouseButton.Fifth,
    }

    export type EventId = number;

    export const enum SceneEvent_Internal {
        Animate,
    }

    export const enum MouseEvent_Internal {
        Enter,
        Move,
        Leave,
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
