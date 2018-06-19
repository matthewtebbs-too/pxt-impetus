/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as PxtCloudClient from 'pxt-cloud-client';

import { singletonWorldBoard } from './_board';

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

    export function messageEveryone(message: string): Promise<void> {
        return singletonWorldBoard().cloudAPI!.chat.newMessage(message);
    }

    export function onUserMessage(cb: (message: string, from: string) => void) {
        /* foo */
    }
}
