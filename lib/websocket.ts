import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';

interface WebSocketConnection {
    userId: string;
    ws: WebSocket;
}

interface WebSocketMessage {
    type: string;
    [key: string]: unknown;
}

const connections = new Map<string, WebSocketConnection>();

export function initWebSocket(server: Server) {
    const wss = new WebSocketServer({ noServer: true });

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

    wss.on('connection', (ws: WebSocket) => {
        let userId: string;

        ws.on('message', (message: string) => {
            const data = JSON.parse(message.toString());

            if (data.type === 'auth') {
                userId = data.userId;
                connections.set(userId, { userId, ws });
            }
        });

        ws.on('close', () => {
            if (userId) {
                connections.delete(userId);
            }
        });
    });

    return wss;
}

export function sendMessage(userId: string, message: WebSocketMessage) {
    const connection = connections.get(userId);
    if (connection) {
        connection.ws.send(JSON.stringify(message));
    }
}
