/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as PxtCloudClient from 'pxt-cloud-client';

import { singletonWorldBoard } from './_board';
import {
    CloudEvent_Internal,
    ScopeId,
} from './_events';

export class User implements PxtCloudClient.UserData {
    private static _singleton = new User();

    public static get singleton(): User {
        return this._singleton;
    }

    public get name(): string {
        return '';
    }

    public set name(name: string) {
        /* foo */
    }
}

namespace pxsimImpetus.user {
    export function currentUser(): User {
        return User.singleton;
    }

    export function messageEveryone(message: string): PromiseLike<void> {
        return singletonWorldBoard().cloudAPI!.chat.newMessage(message);
    }

    export function onNewMessage(handler: pxsim.RefAction) {
        singletonWorldBoard().events!.listen(ScopeId.CloudObject, CloudEvent_Internal.NewMessage, handler);
    }
}
