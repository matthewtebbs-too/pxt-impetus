/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as fs from 'fs';
import * as http from 'http';

import * as socketio from 'socket.io';

const server = http.createServer(handler);
server.listen(3000);

const io = socketio(server);

io.on('connection', (socket: socketio.Socket) => {
    /* blah */
});

function handler(request: http.IncomingMessage, response: http.ServerResponse) {
    fs.readFile(__dirname + '/index.html', (error: NodeJS.ErrnoException, data: Buffer) => {
        if (error) {
            response.writeHead(500);
        } else {
            response.writeHead(200);
            response.end(data);
        }
    });
}
