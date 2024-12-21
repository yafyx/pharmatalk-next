import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    const { userId: currentUserId } = await auth();
    if (!currentUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const messages = await prisma.chatMessage.findMany({
            where: {
                OR: [
                    {
                        senderId: currentUserId,
                        receiverId: params.userId,
                    },
                    {
                        senderId: params.userId,
                        receiverId: currentUserId,
                    },
                ],
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        const formattedMessages = messages.map(msg => ({
            id: msg.id,
            content: msg.content,
            sender: msg.senderId === currentUserId ? "user" : "other",
            timestamp: msg.createdAt.toLocaleTimeString(),
        }));

        return NextResponse.json(formattedMessages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}
