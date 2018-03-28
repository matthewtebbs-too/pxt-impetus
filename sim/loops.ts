/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

namespace pxsim.loops {
    export function forever(body: RefAction): void {
        thread.forever(body);
    }

    export function pauseAsync(ms: number) {
        return Promise.delay(ms);
    }
}
