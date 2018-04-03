/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

/// <reference path="_runtime.ts" />

namespace pxsim {
    export class WorldBoard extends BaseBoard {
        public static get singleton(): WorldBoard {
            return this._board;
        }

        public static get events(): WorldEventBus {
            return this._events;
        }

        public static set events(bus: WorldEventBus) {
            this._events = bus;
        }

        private static _board: WorldBoard = new WorldBoard();
        private static _events: WorldEventBus;

        private _world3d: World3d | null = null;

        public get world3d(): World3d | null {
            return this._world3d;
        }

        public initAsync(msg: SimulatorRunMessage): Promise<void> {
            this.init();

            return Promise.resolve();
        }

        public init() {
            this.postkill();

            this._world3d = new World3d();
        }

        public kill() {
            if (this._world3d) {
                this._world3d.renderer.pause = true;
            }
        }

        public postkill() {
            rt.ObjectWithIdFactory.forgetAllInstances();

            if (this._world3d) {
                this._world3d.dispose();

                this._world3d = null;
            }
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
        WorldBoard.events = new WorldEventBus(runtime);
        return runtime.board = singletonWorldBoard();   /* will be initialized by runtime */
    };

    export function singletonWorldBoard(): WorldBoard       { return WorldBoard.singleton; }

    export function ourWorld3d(): World3d | null            { return singletonWorldBoard().world3d; }
    export function currentScene(): GenericScene | null     { return ourWorld3d() ? ourWorld3d()!.scene : null; }
    export function activeCamera(): GenericCamera | null    { return ourWorld3d() ? ourWorld3d()!.camera : null; }
}
