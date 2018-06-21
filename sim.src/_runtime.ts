/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as ObjectHash from 'object-hash';
import * as RT from './_runtime';

export type ObjId = number | string;

export interface IObjectWithId {
    readonly id: ObjId;
}

export interface IObjectWithUserData {
    readonly userData: any;
}

export interface INameableObject {
    name: string;
}

export function isNameable(object: any): object is INameableObject {
    return undefined !== (object as INameableObject).name;
}

export interface IDisposableObject {
    dispose(): void;
}

export function isDisposable(object: any): object is IDisposableObject {
    return undefined !== (object as IDisposableObject).dispose;
}

export interface ICloneableObject {
    clone(recursive?: boolean): this;
    copy(source: this, recursive?: boolean): this;
}

export function isCloneable(object: any): object is ICloneableObject {
    return undefined !== (object as ICloneableObject).clone &&
           undefined !== (object as ICloneableObject).copy;
}

export interface INameableObjectWithId extends IObjectWithId, INameableObject {
}

export function getUserData<T>(object: RT.IObjectWithUserData, key: string): T | undefined {
    // tslint:disable-next-line:no-string-literal
    return object.userData[key] as T;
}

export function setUserData<T>(object: RT.IObjectWithUserData, key: string, data?: T) {
    // tslint:disable-next-line:no-string-literal
    object.userData[key] = data;
}

export type ObjectConstructor<T = {}> = new (...args: any[]) => T;

export abstract class DisposableObject {
    private _isDisposed = false;

    public dispose() {
        if (!this._isDisposed) {
            this._onDispose();
            this._isDisposed = true;
        }
    }

    protected abstract _onDispose(): void;
}

export abstract class ProxyObject<T> extends DisposableObject {
    private _reference: T;

    public get reference(): T { return this._reference; }

    constructor(reference: T) {
        super();

        this._reference = reference;
    }
}

export class ObjectFactory<T> {
    public static forgetAllInstances() {
        ObjectFactory._factories.forEach(factory => factory.forgetAllInstances());
    }

    private static _factories = new Array<ObjectFactory<any>>();

    private _ctor: ObjectConstructor<T>;
    private _objectcache = new Map<ObjId, T>();

    constructor(ctor: ObjectConstructor<T>) {
        this._ctor = ctor;
        ObjectFactory._factories.push(this);
    }

    public instantiate(...args: any[]): T {
        return new this._ctor(...args);
    }

    public instantiateWithCache(...args: any[]): T {
        const hash = ObjectHash(args || {}, { algorithm: 'md5', encoding: 'hex', respectType: false } as any);

        let instance = this._objectcache.get(hash);
        if (!instance) {
            this._objectcache.set(hash, instance = this.instantiate(...args));
        }

        return instance;
    }

    public forgetAllInstances() {
        this._objectcache.clear();
    }
}
