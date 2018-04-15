/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

/// <reference path="_runtime.ts" />

namespace pxsim {
    export class WorldBoard extends BaseBoard {
        private static _board: WorldBoard = new WorldBoard();

        public static get singleton(): WorldBoard {
            return this._board;
        }

        public get world(): World3d | null {
            return this._world3d;
        }

        public get events(): WorldEventBus | null {
            return this._events;
        }

        private _world3d: World3d | null = null;
        private _events: WorldEventBus | null = null;

        public initAsync(msg: SimulatorRunMessage): Promise<void> {
            this.init();

            return Promise.resolve();
        }

        public init() {
            this.postkill();

            this._world3d = new World3d();
            this._events = new WorldEventBus(runtime);
        }

        public kill() {
            if (this._world3d) {
                this._world3d.renderer.pause = true;
            }
        }

        public postkill() {
            rt.ObjectFactory.forgetAllInstances();

            Helper.safeObjectDispose(this._world3d);
            this._world3d = null;
        }

        public receiveMessage(msg: SimulatorMessage) {
            /* do nothing */
        }

        public updateView() {
            /* do nothing */
        }
    }

    initCurrentRuntime = (msg: SimulatorMessage) => {
        singletonWorldBoard().postkill();               /* post-kill now */

        return runtime.board = singletonWorldBoard();   /* will be initialized by runtime */
    };

    export function singletonWorldBoard(): WorldBoard   { return WorldBoard.singleton; }
}
