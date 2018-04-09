/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

type _Map<K, V> = Map<K, V>;

namespace rt {
    export type ObjId = number | string | null;

    export interface IObjectDisposable {
        dispose(): void;
    }

    export interface IObjectWithId {
        id: ObjId;
    }

    export abstract class ObjectDisposable implements IObjectDisposable {
        private _isDisposed = false;

        public dispose() {
            if (!this._isDisposed) {
                this._onDispose();
                this._isDisposed = true;
            }
        }

        protected abstract _onDispose(): void;
    }

    export abstract class ObjectWithId extends ObjectDisposable implements IObjectWithId {
        private _id: ObjId;

        public get id(): ObjId { return this._id; }

        constructor(id?: ObjId) {
            super();

            this._id = id || '';
        }
    }

    export class ObjectWithIdDictionary<T extends ObjectWithId> {
        private _objs: Map<ObjId, T> = new Map<ObjId, T>();

        public set(obj: T): Map<ObjId, T> {
            return this._objs.set(obj.id, obj);
        }

        public retrieve(id: ObjId): T | null {
            return this._objs.get(id) || null;
        }

        public delete(obj: T): boolean {
            return this._objs.delete(obj.id);
        }
    }

    export abstract class WrappedObjectWithId<T> extends ObjectWithId {
        private _reference: T;

        public get reference(): T { return this._reference; }

        constructor(reference: T, id?: ObjId) {
            super(id);

            this._reference = reference;
        }
    }

    export interface IObjectWithIdConstructor<T> {
        new (parameters?: any, id?: ObjId): T;
    }

    export class ObjectWithIdFactory<T extends ObjectWithId> {
        public static forgetAllInstances() {
            ObjectWithIdFactory._factories.forEach(factory => factory.forgetAllInstances());
        }

        private static _factories = new Array<ObjectWithIdFactory<ObjectWithId>>();

        private _ctor: IObjectWithIdConstructor<T>;
        private _objectcache = new Map<string, T>();

        constructor(ctor: IObjectWithIdConstructor<T>) {
            this._ctor = ctor;
            ObjectWithIdFactory._factories.push(this);
        }

        public getInstance(
            parameters?: any,
            id?: ObjId,
        ) {
            const hash = objectHash([ parameters, id ], { algorithm: 'md5', encoding: 'hex', respectType: false } as any);

            let instance = this._objectcache.get(hash);
            if (!instance) {
                this._objectcache.set(hash, instance = this.getInstanceNoCache(parameters, id));
            }

            return instance;
        }

        public getInstanceNoCache(
            parameters?: any,
            id?: ObjId,
        ) {
            return new (this._ctor)(parameters, id);
        }

        public forgetAllInstances() {
            this._objectcache.clear();
        }
    }
}
