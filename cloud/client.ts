/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as SocketIO from 'socket.io-client';

const debug = require('debug')('impetus:client');

export class Client {
    private _socket: SocketIOClient.Socket | null = null;

    public get isConnected(): boolean {
        return !!this._socket && this._socket.connected;
    }

    public get connectedId(): string | null {
        return this.isConnected ? `${this._socket!.id}` : null;
    }

    constructor(uri?: string) {
        this._socket = SocketIO(uri || (null /* use window location */ as any));

        this._socket.on('login', () => {
            debug(`client logged in as ${this.connectedId || 'unknown'}`);
        });

        this._socket.on('disconnect', () => {
            debug(`client disconnected`);
        });

    }
}
