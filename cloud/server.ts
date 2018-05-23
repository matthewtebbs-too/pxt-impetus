/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as FS from 'fs';
import * as Http from 'http';
import * as Path from 'path';

const debug = require('debug')('impetus:server');

export class Server {
    public static defaultConfig = {
        hostname: process.env.IMPETUS_HOSTNAME || 'localhost',
        port: process.env.IMPETUS_PORT ? parseInt(process.env.IMPETUS_PORT, 10) : 3000,
    };

    public static defaultUri = `http://${Server.defaultConfig.hostname}:${Server.defaultConfig.port}`;

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

    public get httpserver(): Http.Server {
        return this._server;
    }

    constructor(port: number = Server.defaultConfig.port, hostname: string = Server.defaultConfig.hostname) {
        this._server.listen(port, hostname, () => debug(`server listening on ${hostname} at port ${port}`));
    }

    protected _onDispose() {
        this._server.close();
    }
}
