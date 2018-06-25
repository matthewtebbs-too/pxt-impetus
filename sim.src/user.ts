/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as PxtCloudClient from 'pxt-cloud-client';

import { cloudAPI, worldBoard } from './_board';
import {
    CloudEvent_Internal,
    ScopeId,
} from './_events';

export class User implements PxtCloudClient.UserData {
    public get name(): string {
        return this.name;
    }
}

export class CurrentUser extends User {
    private static _singleton = new User();

    protected _isClean = true;

    public static get singleton(): User {
        return this._singleton;
    }

    public set name(name: string) {
        this.name = name;
        this._isClean = false;
    }

    public clean() {
        if (!this._isClean) {
            const cldapi = cloudAPI();

            if (cldapi) {
                cldapi.users.addSelf(this).then(success => this._isClean = success);
            }
        }
    }
}

namespace pxsimImpetus.user {
    export function currentUser(): User {
        return CurrentUser.singleton;
    }

    export function messageEveryone(message: string): PromiseLike<void> {
        const cldapi = cloudAPI();

        return cldapi ? cldapi.chat.newMessage(message) : Promise.resolve();
    }

    export function onNewMessage(handler: pxsim.RefAction) {
        worldBoard().events!.listen(ScopeId.CloudObject, CloudEvent_Internal.NewMessage, handler);
    }
}
