/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='pxt-core/built/pxtsim'/>

import * as PxtCloudClient from 'pxt-cloud-client';

import { WorldEventBus } from './_events';
import * as Helper from './_helper';
import * as RT from './_runtime';
import { World3d } from './world';

export class WorldBoard extends pxsim.BaseBoard implements RT.IDisposableObject {
    private static _singleton = new WorldBoard();

    public static get singleton(): WorldBoard {
        return this._singleton;
    }

    public get world(): World3d | null {
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

    public initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
        return new Promise((resolve, reject) => {
            this._world3d = new World3d();
            this._events = new WorldEventBus(pxsim.runtime);

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

        RT.ObjectFactory.forgetAllInstances();
    }

    public receiveMessage(msg: pxsim.SimulatorMessage) {
        /* do nothing */
    }

    public updateView() {
        /* do nothing */
    }
}

pxsim.initCurrentRuntime = (msg: pxsim.SimulatorMessage) => {
    singletonWorldBoard().dispose();                /* dispose now */

    return pxsim.runtime.board = singletonWorldBoard();   /* will be initialized by runtime */
    };

export function singletonWorldBoard(): WorldBoard {
    return WorldBoard.singleton;
}
