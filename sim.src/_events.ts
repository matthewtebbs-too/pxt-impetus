/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='pxt-core/built/pxtsim'/>

export const enum ScopeId {
    Objects = 0,
    WorldObject = Objects + 0,
    SceneObject = Objects + 1,

    Devices = 100,
    KeyboardDevice = Devices + 0,
    MouseDevice = Devices + 100,

    KeyboardDeviceKey = Devices + 1,

    MouseDeviceButton = MouseDevice + 1,
    MouseDeviceButton_Main = MouseDeviceButton + MouseButton.Main,
    MouseDeviceButton_Auxiliary= MouseDeviceButton + MouseButton.Auxiliary,
    MouseDeviceButton_Secondary = MouseDeviceButton + MouseButton.Secondary,
    MouseDeviceButton_Fourth = MouseDeviceButton + MouseButton.Fourth,
    MouseDeviceButton_Fifth = MouseDeviceButton + MouseButton.Fifth,
}

export function keyboardScopeIdFromKey(key: string | number): number {
    let index: number;

    if (typeof key === 'string') {
        if (key === ' ') {
            key = 'Spacebar';
        }
        index = KeyboardKey[key];
    } else {
        index = key;
    }

    return ScopeId.KeyboardDeviceKey + index;
}

export function mouseScopeIdFromButton(button: number): number {
    return ScopeId.MouseDeviceButton + button;
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

export class WorldEventBus extends pxsim.EventBusGeneric<EventValue | string | number> {
    constructor(runtime: pxsim.Runtime) {
        super(runtime, value => value ? (typeof value === 'object' ? value.toActionArgs() : [value]) : []);
    }
}
