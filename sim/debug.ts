/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC

    OSS: Derived from https://github.com/Microsoft/pxt-common-packages.
*/

namespace pxsim.debug {
    export function renderStatistics(shown: boolean) {
        singletonWorldBoard().world!.renderer.stats.hidden = !shown;
    }
}
