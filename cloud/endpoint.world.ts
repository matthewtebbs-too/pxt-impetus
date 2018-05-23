
/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import { Endpoint } from './endpoint.base';

const debug = require('debug')('impetus:endpoint.world');

export class WorldEndpoint extends Endpoint {
    constructor(server: any) {
        super(server, 'impetus.world');
    }

    protected _onConnection(socket: SocketIO.Socket) {
        socket.emit('login');
    }

    protected _onDisconnection(socket: SocketIO.Socket) {
        /* do nothing */
    }
}
