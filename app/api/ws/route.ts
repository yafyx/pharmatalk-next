import { NextApiRequest } from 'next';
import { createServer } from 'http';
import { parse } from 'url';
import { initWebSocket } from '@/lib/websocket';

const server = createServer();
const wss = initWebSocket(server);

export default function handler(req: NextApiRequest) {
    const { socket: ws } = req;

    if (!ws) {
        return new Response('Expected Upgrade header', { status: 426 });
    }

    try {
        const { pathname } = parse(req.url || '');
        if (pathname === '/api/ws') {
            wss.handleUpgrade(req, ws, Buffer.alloc(0), (ws) => {
                wss.emit('connection', ws, req);
            });
        }
    } catch (e) {
        console.error('WebSocket upgrade error:', e);
        ws.end('HTTP/1.1 500 Internal Server Error\r\n\r\n');
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
