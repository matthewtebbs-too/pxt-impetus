/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import { WorldClient } from './client.world';
import { WorldEndpoint } from './endpoint.world';
import { Server } from './server';

const endpointWorld = new WorldEndpoint(new Server());
const clientWorld = new WorldClient();
