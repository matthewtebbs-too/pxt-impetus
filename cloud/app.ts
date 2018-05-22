/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import { Client } from './client';
import { Server } from './server';

const server = new Server(process.env.IMPETUS_PORT || 3000);

const client = new Client(process.env.IMPETUS_URI || 'http://localhost:3000');
