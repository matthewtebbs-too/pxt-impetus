/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC

    OSS: Derived from https://github.com/Microsoft/pxt-common-packages.
*/

const dbg = require('debug')('pxt-impetus');

import { singletonWorldBoard } from './_board';

namespace pxsimImpetus.debug {
    export function log(args: any) {
        dbg(args);
    }

    export function renderStatistics(shown: boolean) {
        const world = singletonWorldBoard().world;

        if (world) {
            const renderer = world.renderer;

            if (renderer) {
                renderer.stats.hidden = !shown;
            }
        }
    }
}
