/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='pxt-core/built/pxtsim'/>

/// <reference types='pxt-cloud-client/lib/pxtcloud.client' />

namespace pxsim {
    export class WorldBoard extends BaseBoard implements rt.IDisposableObject {
        private static _singleton = new WorldBoard();

        public static get singleton(): WorldBoard {
            return this._singleton;
        }

        public get world(): World3d| null {
            return this._world3d;
        }

        public get events(): WorldEventBus | null {
            return this._events;
        }

        public get cloudAPI(): PxtCloudClient.PublicAPI | null {
            return this._cloudAPI;
        }

        private _world3d: World3d | null = null;
        private _events: WorldEventBus | null = null;
        private _cloudAPI: PxtCloudClient.PublicAPI | null = null;

        public initAsync(msg: SimulatorRunMessage): Promise<void> {
            return new Promise((resolve, reject) => {
                this._world3d = new World3d();
                this._events = new WorldEventBus(runtime);

                PxtCloudClient.makeAPIConnection()
                    .then(api => this._cloudAPI = api)
                    .catch(reject);

                resolve();
            });
        }

        public kill() {
            if (this._world3d && this._world3d.renderer) {
                this._world3d.renderer.pause = true;
            }

            if (this._cloudAPI) {
                PxtCloudClient.disposeAPIConnection(this._cloudAPI);
                this._cloudAPI = null;
            }
        }

        public dispose() {
            Helper.safeObjectDispose(this._world3d);
            this._world3d = null;

            this._events = null;

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
