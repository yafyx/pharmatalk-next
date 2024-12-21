import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ChatMessage } from "@prisma/client";
import { connections } from "@/lib/chat-connections";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId: currentUserId } = await auth();
    if (!currentUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await params;

    const stream = new ReadableStream({
        start(controller) {
            const encoder = new TextEncoder();
            const send = (msg: ChatMessage) => {
                if (msg.senderId === currentUserId && msg.receiverId === userId ||
                    msg.senderId === userId && msg.receiverId === currentUserId) {
                    const formattedMessage = {
                        id: msg.id,
                        content: msg.content,
                        sender: msg.senderId === currentUserId ? "user" : "other",
                        timestamp: msg.createdAt.toLocaleTimeString(),
                    };
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(formattedMessage)}\n\n`));
                }
            };

            if (!connections.has(currentUserId)) {
                connections.set(currentUserId, new Set());
            }
            connections.get(currentUserId)?.add(send);

            const interval = setInterval(() => {
                controller.enqueue(encoder.encode(":\n\n"));
            }, 15000);

            return () => {
                clearInterval(interval);
                connections.get(currentUserId)?.delete(send);
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
