/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import { WorldClient } from './client.world';
import { WorldEndpoint } from './endpoint.world';
import { WebServer } from './webserver';

const serverWeb = new WebServer(process.env.IMPETUS_PORT || 3000);

const endpointWorld = new WorldEndpoint(serverWeb.httpserver);

const clientWorld = new WorldClient(process.env.IMPETUS_URI || 'http://localhost:3000');
