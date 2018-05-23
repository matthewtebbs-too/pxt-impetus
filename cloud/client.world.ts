/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import { Client } from './client.base';

const debug = require('debug')('impetus:client.world');

export class WorldClient extends Client {
    constructor(uri?: string) {
        super(uri, 'impetus.world');
    }

    public attach(io: SocketIOClient.Socket) {
        super.attach(io);

        io.on('login', () => {
            debug(`client logged in as ${this.connectedId || 'unknown'}`);
        });
    }

    public detach() {
        if (this.io) {
            this.io.off('login');
        }

        super.detach();
    }

    protected _onConnection() {
        /* do nothing */
    }

    protected _onDisconnection() {
        /* do nothing */
    }
}
