/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC

    OSS: Derived from https://github.com/Microsoft/pxt-common-packages.
*/

// const dbg = require('debug')('pxt-impetus');
const dbg = console.log;

namespace pxsim.debug {
    export function log(args: any) {
        dbg(args);
    }

    export function renderStatistics(shown: boolean) {
        singletonWorldBoard().world!.renderer.stats.hidden = !shown;
    }
}
