import { NextRequest } from 'next/server';
import { createServer, IncomingMessage } from 'http';
import { parse } from 'url';
import { initWebSocket } from '@/lib/websocket';
import { Duplex } from 'stream';

const server = createServer();
const wss = initWebSocket(server);

export async function GET(req: NextRequest) {
    const upgrade = req.headers.get('upgrade');
    const socket = Reflect.get(req, 'socket');

    if (!upgrade || upgrade.toLowerCase() !== 'websocket') {
        return new Response('Expected Upgrade: WebSocket', { status: 426 });
    }

    if (!socket) {
        return new Response('Expected WebSocket connection', { status: 400 });
    }

    try {
        const { pathname } = parse(req.url || '');
        if (pathname === '/api/ws') {
            wss.handleUpgrade(req as unknown as IncomingMessage, socket as Duplex, Buffer.alloc(0), (ws) => {
                wss.emit('connection', ws, req);
            });
        }
    } catch (e) {
        console.error('WebSocket upgrade error:', e);
        return new Response('Internal Server Error', { status: 500 });
    }

    return new Response(null);
}

export const config = {
    api: {
        bodyParser: false,
    },
};
