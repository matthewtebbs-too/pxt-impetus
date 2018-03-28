/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxsim {
    export class WorldBoard extends BaseBoard {
        public static get singleton(): WorldBoard {
            return this._board;
        }

        public static get events(): EventBus {
            return this._events;
        }

        public static set events(bus: EventBus) {
            this._events = bus;
        }

        private static _board: WorldBoard = new WorldBoard();
        private static _events: EventBus;

        private _world: World3D | null = null;

        public get world(): World3D | null {
            return this._world;
        }

        public initAsync(msg: SimulatorRunMessage): Promise<void> {
            this.init();
            return Promise.resolve();
        }

        public init() {
            this.postkill();
            this._world = new World3D();
        }

        public kill() {
            if (this._world) {
                this._world.renderer.pause = true;
            }
        }

        public postkill() {
            if (this._world) {
                this._world.dispose();

                this._world = null;
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
        WorldBoard.events = new EventBus(runtime);
        return runtime.board = singletonWorldBoard();   /* will be initialized by runtime */
    };

    export function singletonWorldBoard(): WorldBoard       { return WorldBoard.singleton; }
    export function currentWorld(): World3D | null          { return singletonWorldBoard().world; }
    export function currentScene(): Scene | null            { return currentWorld() ? currentWorld()!.currentScene : null; }
    export function activeCamera(): GenericCamera | null    { return currentWorld() ? currentWorld()!.activeCamera : null; }
}
