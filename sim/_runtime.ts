/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

type _Map<K, V> = Map<K, V>;

namespace rt {
    export type ObjId = number | string | null;

    export interface IObjectWithId {
        readonly id: ObjId;
    }

    export interface IObjectWithUserData {
        readonly userData: any;
    }

    export interface INameableObject {
        name: string;
    }

    export interface IDisposableObject {
        dispose(): void;
    }

    export interface ICloneableObject {
        clone(recursive?: boolean): this;
        copy(source: this, recursive?: boolean): this;
    }

    export abstract class DisposableObject implements IDisposableObject {
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

    export interface INameableObjectWithId extends IObjectWithId, INameableObject {
    }

    export abstract class ProxyObjectWithId<T extends IObjectWithId> extends ProxyObject<T> {
        public get id() {
            return this.reference.id;
        }
    }

    export abstract class ProxyNameableObjectWithId<T extends INameableObjectWithId> extends ProxyObjectWithId<T> {
        public get name() {
            return this.reference.name;
        }

        public set name(name: string) {
            this.reference.name = name;
        }
    }

    export type ObjectCreator<T> = (parameters?: any) => T;

    export class ObjectFactory<T extends DisposableObject> {
        public static forgetAllInstances() {
            ObjectFactory._factories.forEach(factory => factory.forgetAllInstances());
        }

        private static _factories = new Array<ObjectFactory<DisposableObject>>();

        private _creator: ObjectCreator<T>;
        private _objectcache = new Map<ObjId, T>();

        constructor(creator: ObjectCreator<T>) {
            this._creator = creator;
            ObjectFactory._factories.push(this);
        }

        public instantiate(parameters?: any) {
            return this._creator(parameters);
        }

        public instantiateWithCache(parameters?: any) {
            const hash = objectHash(parameters || {}, { algorithm: 'md5', encoding: 'hex', respectType: false } as any);

            let instance = this._objectcache.get(hash);
            if (!instance) {
                this._objectcache.set(hash, instance = this.instantiate(parameters));
            }

            return instance;
        }

        public forgetAllInstances() {
            this._objectcache.clear();
        }
    }
}
