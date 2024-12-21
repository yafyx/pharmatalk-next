import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const usersWithChats = await prisma.user.findMany({
            where: {
                OR: [
                    { receivedMessages: { some: { senderId: userId } } },
                    { sentMessages: { some: { receiverId: userId } } }
                ],
                NOT: { clerkId: userId }
            },
            select: {
                id: true,
                name: true,
                image: true,
                role: true,
                clerkId: true,
                receivedMessages: {
                    where: { senderId: userId },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
                sentMessages: {
                    where: { receiverId: userId },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                }
            }
        });

        const formattedContacts = usersWithChats.map(contact => {
            const receivedMessage = contact.receivedMessages[0];
            const sentMessage = contact.sentMessages[0];

            const lastMessage = [receivedMessage, sentMessage]
                .filter(Boolean)
                .sort((a, b) => b!.createdAt.getTime() - a!.createdAt.getTime())[0];

            return {
                id: contact.clerkId,
                name: contact.name,
                avatar: contact.image || "/placeholder.svg",
                role: contact.role,
                lastMessage: lastMessage ? {
                    content: lastMessage.content,
                    timestamp: lastMessage.createdAt.toISOString(),
                    isOutgoing: lastMessage.senderId === userId
                } : null
            };
        });

        formattedContacts.sort((a, b) => {
            if (!a.lastMessage) return 1;
            if (!b.lastMessage) return -1;
            return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
        });

        return NextResponse.json(formattedContacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }
}
