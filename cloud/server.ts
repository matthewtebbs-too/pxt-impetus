/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as FS from 'fs';
import * as Http from 'http';
import * as Path from 'path';

import * as SocketIO from 'socket.io';

const debug = require('debug')('impetus:server');

export class Server {
    private static _handler(request: Http.IncomingMessage, response: Http.ServerResponse) {
        FS.readFile(Path.join(__dirname, 'public') + '/index.html', (error: NodeJS.ErrnoException, data: Buffer) => {
            if (error) {
                response.writeHead(500);
            } else {
                response.writeHead(200);
                response.end(data);
            }
        });
    }

    private _server: Http.Server = Http.createServer(Server._handler);
    private _io: SocketIO.Server | null = null;

    constructor(port?: string | number) {
        this._io = SocketIO(this._server);

        this._io.on('connection', (socket: SocketIO.Socket) => {
            debug(`client connecting from ${socket.handshake.address}`);

            socket.emit('login');

            socket.on('disconnect', (reason) => {
                /* blah */
            });
        });

        this._server.listen(port, () => debug(`server listening at port ${port}`));
    }

    protected _onDispose() {
        this._server.close();
    }
}
