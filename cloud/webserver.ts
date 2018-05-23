/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as FS from 'fs';
import * as Http from 'http';
import * as Path from 'path';

const debug = require('debug')('impetus:webserver');

export class WebServer {
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

    private _server: Http.Server = Http.createServer(WebServer._handler);

    public get httpserver(): Http.Server {
        return this._server;
    }

    constructor(port?: string | number) {
        this._server.listen(port, () => debug(`server listening at port ${port}`));
    }

    protected _onDispose() {
        this._server.close();
    }
}
