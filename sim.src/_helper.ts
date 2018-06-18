/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Ammo from 'other_modules/ammo';

import * as RT from './_runtime';

export interface IFromBufferAttribute<T> {
    fromBufferAttribute(attribute: THREE.BufferAttribute, index: number, offset?: number): T;
}

export function btVector3FromThree(vec: THREE.Vector3, btvec = new Ammo.btVector3()): Ammo.btVector3 {
    btvec.setValue(vec.x, vec.y, vec.z);
    return btvec;
}

export function btQuaternionFromThree(qtr: THREE.Quaternion, btqtr = new Ammo.btQuaternion()): Ammo.btQuaternion {
    btqtr.setValue(qtr.x, qtr.y, qtr.z, qtr.w);
    return btqtr;
}

export function arrayFromBufferAttribute<AT extends IFromBufferAttribute<AT>>(
    attribute: THREE.BufferAttribute,
    ctor: RT.ObjectConstructor<AT>,
): AT[] {
    const array = new Array<AT>(attribute.count);

    for (let index = 0; index < attribute.count; index++) {
        array[index] = new ctor();
        array[index].fromBufferAttribute(attribute, index);
    }

    return array;
}

export function applyFn<T, R>(input: T | T[], fn: (t: T) => R): R | R[] {
    return Array.isArray(input) ? input.map(fn) : fn(input);
}

export function safeObjectDispose(object: RT.IDisposableObject | null) {
    if (object) {
        object.dispose();
    }
}

export function safeAmmoObjectDestroy(object: any | null) {
    if (object) {
        Ammo.destroy(object);
    }
}

export class SimpleEventListenerHelper {
    private _listeners = new Map<string, (this: HTMLElement, ev: Event) => any>();

    constructor(public readonly target: EventTarget) {
    }

    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void {
        this.target.addEventListener(type, listener);
        this._listeners.set(type, listener);
    }

    public removeEventListener<K extends keyof HTMLElementEventMap>(type: K): void {
        const listener = this._listeners.get(type);
        if (listener) {
            this.target.removeEventListener(type, listener);
            this._listeners.delete(type);
        }
    }

    public removeAllEventListeners() {
        this._listeners.forEach((listener, type) => {
            this.target.removeEventListener(type, listener);
        });
        this._listeners.clear();
    }
}
