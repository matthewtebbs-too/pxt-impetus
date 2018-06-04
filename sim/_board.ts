/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='../node_modules/pxt-core/built/pxtsim.d.ts'/>

/// <reference types='pxt-cloud-client' />

namespace pxsim {
    export class WorldBoard extends BaseBoard implements rt.IDisposableObject {
        private static _board: WorldBoard = new WorldBoard();

        public static get singleton(): WorldBoard {
            return this._board;
        }

        public get cloud(): PxtCloud.WorldClient | null {
            return this._cloud;
        }

        public get world(): World3d| null {
            return this._world3d;
        }

        public get events(): WorldEventBus | null {
            return this._events;
        }

        private _cloud: PxtCloud.WorldClient | null = null;
        private _world3d: World3d | null = null;
        private _events: WorldEventBus | null = null;

        public initAsync(msg: SimulatorRunMessage): Promise<void> {
            this.dispose();

            return new Promise((resolve) => {
                this._cloud = new PxtCloud.WorldClient();
                this._world3d = new World3d();
                this._events = new WorldEventBus(runtime);

                resolve();
            });
        }

        public kill() {
            if (this._world3d) {
                this._world3d.renderer.pause = true;
            }
        }

        public dispose() {
            rt.ObjectFactory.forgetAllInstances();

            Helper.safeObjectDispose(this._cloud);
            this._cloud = null;

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
        singletonWorldBoard().dispose();                /* dispose now */

        return runtime.board = singletonWorldBoard();   /* will be initialized by runtime */
    };

    export function singletonWorldBoard(): WorldBoard   { return WorldBoard.singleton; }
}
