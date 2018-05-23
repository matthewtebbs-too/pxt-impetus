/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as SocketIO from 'socket.io-client';

import { Server } from './server';

const debug = require('debug')('impetus:client');

export abstract class Client {
    private _io: SocketIOClient.Socket | null = null;

    public get isConnected(): boolean {
        return !!this._io && this._io.connected;
    }

    public get connectedId(): string | null {
        return this.isConnected ? `${this._io!.id}` : null;
    }

    protected get io(): SocketIOClient.Socket | null {
        return this._io;
    }

    constructor(uri?: string, nsp?: string) {
        this.attach(SocketIO(`${uri || Server.defaultUri || ''}/${nsp || ''}`));
    }

    public attach(io: SocketIOClient.Socket) {
        this.detach();

        this._io = io;

        io.on('connect', () => {
            debug(`client connected`);

            this._onConnection();
        });

        io.on('disconnect', () => {
            debug(`client disconnected`);

            this._onDisconnection();
        });
    }

    public detach() {
        if (this.io) {
            this.io.off('disconnect');
        }

        this._io = null;
    }

    protected abstract _onConnection(): void;
    protected abstract _onDisconnection(): void;
}
