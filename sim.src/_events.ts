/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='pxt-core/built/pxtsim'/>

/// <reference types='../shared/impetus.enums'/>

/* !! enum keys if non-Unicode must match KeyboardEvent.key !! */
/* !! enum values are based on Windows KeyboardEvent.keycodes but just need to be unique !! */
export enum KeyboardKey {
    //% block="delete"
    Delete = 8,

    //% block="tab"
    Tab = 9,

    //% block="enter"
    Enter = 13,

    //% block="escape"
    Escape = 27,

    // %block="space bar"
    Spacebar = 32,

    /* 0-9, 48-57 */
    /* a-z, 65-90 */

    //% block="f1"
    F1 = 112,
    //% block="f2"
    F2,
    //% block="f3"
    F3,
    //% block="f4"
    F4,
    //% block="f5"
    F5,
    //% block="f6"
    F6,
    //% block="f7"
    F7,
    //% block="f8"
    F8,
    //% block="f9"
    F9,
    //% block="f10"
    F10,
    //% block="f11"
    F11,
    //% block="f12"
    F12,
}

export const enum ScopeId {
    Objects = 0,
    CloudObject = Objects + 0,
    WorldObject = Objects + 1,
    SceneObject = Objects + 2,

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

export const enum CloudEvent_Internal {
    NewMessage,
}

export const enum WorldEvent_Internal {
}

export const enum SceneEvent_Internal {
    Animate,
}

export const enum MouseEvent_Internal {
    Enter,
    Move,
    Leave,
}

export interface IEventValue {
    toActionArgs(): any[];
}

export class WorldEventBus extends pxsim.EventBusGeneric<IEventValue | Array<string | number> | string | number> {
    private static _toActionArgs(value: any) {
        if (value) {
            if  (typeof value === 'object') {
                if ('toActionArgs' in value) {
                    value = value.toActionArgs();
                } else  if (!('length' in value)) {
                    value = [value];
                }
            }
        }

        return value || [];
    }

    constructor(runtime: pxsim.Runtime) {
        super(runtime, WorldEventBus._toActionArgs);
    }
}
