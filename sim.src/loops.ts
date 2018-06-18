/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='pxt-core/built/pxtsim'/>

export namespace pxsimImpetus.loops {
    export function forever(body: pxsim.RefAction): void {
        pxsim.thread.forever(body);
    }

    export function pauseAsync(ms: number) {
        return Promise.delay(ms);
    }
}
