/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

export class User {
    private static _singleton = new User();

    public static get singleton(): User {
        return this._singleton;
    }

    public get name(): string {
        return 'Bobby';
    }

    public set name(name: string) {
        /* foo */
    }
}

namespace pxsimImpetus.user {
    export function currentUser(): User {
        return User.singleton;
    }

    export function messageUser(message: string, name: string) {
        /* foo */
    }

    export function onUserMessage(cb: (message: string, from: string) => void) {
        /* foo */
    }
}
