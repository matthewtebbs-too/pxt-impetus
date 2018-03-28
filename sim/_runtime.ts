/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

type _Map<K, V> = Map<K, V>;

namespace rt {
    export type ObjId = number | string | null;

    export interface IObjectWithId {
        id: ObjId;
    }

    export interface IObjectDisposable {
        dispose(): void;
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

    export abstract class WrappedObjectWithId<T> extends ObjectWithId {
        private _reference: T;

        public get reference(): T { return this._reference; }

        constructor(reference: T, id?: ObjId) {
            super(id);

            this._reference = reference;
        }
    }

    export class ObjectWithIdCache<T extends IObjectWithId> {
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
}
