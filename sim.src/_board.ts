/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='pxt-core/built/pxtsim'/>

import * as THREE from 'three';

import * as PxtCloudAPI from 'pxt-cloud-api';
import * as PxtCloudClient from 'pxt-cloud-client';

import {
    CloudEvent_Internal,
    ScopeId,
    WorldEventBus,
} from './_events';
import * as Helper from './_helper';
import * as RT from './_runtime';
import { World3d } from './world';

export class WorldBoard extends pxsim.BaseBoard implements RT.IDisposableObject {
    private static _cloudLoopFrequency = 1000 / 30; /* 30 loops per sec */

    private static _singleton = new WorldBoard();

    private static _clonerGlobals(value: any, deepclone: any): any {
        if (value === pxsim.runtime.globals) {
            const globalsCloned = new value.constructor();

            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    const valueCloned = deepclone(value[key], WorldBoard._clonerGlobals);

                    if (undefined !== valueCloned) {
                        globalsCloned[key] = valueCloned;
                    }
                }
            }

            return globalsCloned;
        }

        if (!RT.isCloneable(value)) {
            return;
        }

        if (value instanceof THREE.Vector3) {
            return value.clone();
        }
    }

    private _callbackRequestId: NodeJS.Timer | null = null;

    public static get singleton(): WorldBoard {
        return this._singleton;
    }

    public get world(): World3d | null {
        return this._world3d;
    }

    public get events(): WorldEventBus | null {
        return this._events;
    }

    public get cloudAPI(): PxtCloudAPI.PublicAPI | null {
        return this._cldapi;
    }

    private _world3d: World3d | null = null;
    private _events: WorldEventBus | null = null;
    private _cldapi: PxtCloudAPI.PublicAPI | null = null;

    public async initAsync(msg: pxsim.SimulatorRunMessage) {
        this._world3d = new World3d();
        this._events = new WorldEventBus(pxsim.runtime);

        const cldapi = this._cldapi = await PxtCloudClient.makeAPIConnection();

        cldapi.world.addDataSource('globals', {
            cloner: WorldBoard._clonerGlobals,
            data: pxsim.runtime.globals,
        });

        cldapi.chat.on('new message', this._onCloudNewMessage);

        this._runCloudLoop();
    }

    public kill() {
        this._stopCloudLoop();

        if (this._world3d && this._world3d.renderer) {
            this._world3d.renderer.pause = true;
        }

        if (this._cldapi) {
            PxtCloudClient.disposeAPIConnection(this._cldapi);
            this._cldapi = null;
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

    protected _onCloudNewMessage(msg: PxtCloudAPI.MessageData) {
        worldBoard().events!.queue(ScopeId.CloudObject, CloudEvent_Internal.NewMessage, [msg.text, msg.name || '']);
    }

    protected _runCloudLoop() {
        this._callbackRequestId = setInterval(async () => {
            await this._cldapi!.world.syncDataSource('globals');
        }, WorldBoard._cloudLoopFrequency);
    }

    protected _stopCloudLoop() {
        if (this._callbackRequestId) {
            clearInterval(this._callbackRequestId);
            this._callbackRequestId = null;
        }
    }
}

pxsim.initCurrentRuntime = (msg: pxsim.SimulatorMessage) => {
    worldBoard().dispose();                     /* dispose now */

    return pxsim.runtime.board = worldBoard();   /* will be initialized by runtime */
};

export function worldBoard(): WorldBoard {
    return WorldBoard.singleton;
}

export function cloudAPI(): PxtCloudAPI.PublicAPI | null {
    return worldBoard().cloudAPI;
}
