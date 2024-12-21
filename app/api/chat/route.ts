import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { connections } from "./stream/[userId]/route";
import { ChatMessage } from "@prisma/client";
import { sendMessage } from "@/lib/websocket";

export async function GET(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    try {
        if (searchParams.has("users")) {
            const users = await prisma.user.findMany({
                where: {
                    role: {
                        in: ['DOKTER', 'APOTEKER']
                    },
                    NOT: {
                        clerkId: userId
                    }
                },
                select: {
                    clerkId: true,
                    name: true,
                    image: true,
                    role: true
                }
            });

            const formattedUsers = users.map(user => ({
                id: user.clerkId,
                name: user.name,
                image: user.image,
                role: user.role
            }));

            return NextResponse.json(formattedUsers);
        }

        if (searchParams.has("stream")) {
            const stream = new ReadableStream({
                start(controller) {
                    const encoder = new TextEncoder();
                    const send = (msg: ChatMessage) => {
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify(msg)}\n\n`));
                    };

                    if (!connections.has(userId)) {
                        connections.set(userId, new Set());
                    }
                    connections.get(userId)?.add(send);

                    const interval = setInterval(() => {
                        controller.enqueue(encoder.encode(":\n\n"));
                    }, 15000);

                    return () => {
                        clearInterval(interval);
                        connections.get(userId)?.delete(send);
                    };
                },
            });
            return new Response(stream, {
                headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    Connection: "keep-alive",
                },
            });
        }

        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { receiverId, content } = await request.json();
    const newMsg = await prisma.chatMessage.create({
        data: {
            senderId: userId,
            receiverId,
            content
        },
    });

    // Send message through WebSocket
    sendMessage(receiverId, {
        type: 'message',
        ...newMsg
    });

    return NextResponse.json(newMsg);
}

export const dynamic = "force-dynamic";
