/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='pxt-core/built/pxtsim'/>

/// <reference types='pxt-cloud-client/lib/pxtcloud' />

namespace pxsim {
    export class WorldBoard extends BaseBoard implements rt.IDisposableObject {
        private static _singleton = new WorldBoard();

        public static get singleton(): WorldBoard {
            return this._singleton;
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
            return new Promise((resolve) => {
                this._world3d = new World3d();
                this._events = new WorldEventBus(runtime);

                // this._cloud = new PxtCloud.WorldClient();

                resolve();
            });
        }

        public kill() {
            if (this._world3d) {
                this._world3d.renderer.pause = true;
            }

            Helper.safeObjectDispose(this._cloud);

            this._cloud = null;
        }

        public dispose() {
            Helper.safeObjectDispose(this._world3d);

            this._events = null;
            this._world3d = null;

            rt.ObjectFactory.forgetAllInstances();
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
