/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as SocketIO from 'socket.io';

import { Server } from './server';

const debug = require('debug')('impetus:endpoint');

export abstract class Endpoint {
    private _io: SocketIO.Namespace | null = null;

    protected get io(): SocketIO.Namespace | null {
        return this._io;
    }

    constructor(server: any, nsp?: string) {
        if (server instanceof Server) {
            server = server.httpserver;
        }

        this._attach(SocketIO(server).of(`/${nsp || ''}`));
    }

    protected _attach(io: SocketIO.Namespace) {
        this._io = io;

        io.on('connection', (socket: SocketIO.Socket) => {
            debug(`${io.name} client connected from ${socket.handshake.address}`);

            this._onConnection(socket);

            socket.on('disconnect', (reason) => {
                debug(`${io.name} client disconnected from ${socket.handshake.address}`);

                this._onDisconnection(socket);
            });
        });
    }

    protected abstract _onConnection(socket: SocketIO.Socket): void;
    protected abstract _onDisconnection(socket: SocketIO.Socket): void;
}
