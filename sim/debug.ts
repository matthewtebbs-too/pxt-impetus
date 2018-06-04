/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC

    OSS: Derived from https://github.com/Microsoft/pxt-common-packages.
*/

// const debug = require('debug')('pxt-impetus');

namespace pxsim.debug {
    export function renderStatistics(shown: boolean) {
        singletonWorldBoard().world!.renderer.stats.hidden = !shown;
    }

    export function log(args: any) {
        // debug.log(args);
    }
}
