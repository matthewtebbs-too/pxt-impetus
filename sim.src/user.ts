/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as PxtCloudAPI from 'pxt-cloud-api';

import { cloudAPI, worldBoard } from './_board';
import {
    CloudEvent_Internal,
    ScopeId,
} from './_events';

export class User implements PxtCloudAPI.UserData {
    private static _singleton = new User(true /* is self */);

    public name: string = 'Anonymous';

    public static get singleton(): User {
        return this._singleton;
    }

    constructor(protected _isSelf = false) { }

    public async setName(name: string) {
        if (!this._isSelf) {
            return;
        }

        const cldapi = cloudAPI();

        if (cldapi) {
            await cldapi.users.addSelf({ name });
            this.name = name;
        }
    }
}

namespace pxsimImpetus.user {
    export function currentUser(): User {
        return User.singleton;
    }

    export async function messageEveryone(message: string) {
        const cldapi = cloudAPI();

        if (cldapi) {
            await cldapi.chat.newMessage(message);
        }
    }

    export function onNewMessage(handler: pxsim.RefAction) {
        worldBoard().events!.listen(ScopeId.CloudObject, CloudEvent_Internal.NewMessage, handler);
    }
}
