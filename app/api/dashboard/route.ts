import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [articles, latestChats] = await Promise.all([
            prisma.artikel.findMany({
                take: 5,
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    image: true,
                    createdAt: true,
                    author: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                }
            }),
            prisma.chatMessage.findMany({
                where: {
                    OR: [
                        { senderId: userId },
                        { receiverId: userId }
                    ]
                },
                take: 5,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    sender: {
                        select: {
                            name: true,
                            image: true,
                            role: true
                        }
                    },
                    receiver: {
                        select: {
                            name: true,
                            image: true,
                            role: true
                        }
                    }
                }
            })
        ]);

        if (!articles || !latestChats) {
            throw new Error('Failed to fetch data');
        }

        return NextResponse.json({
            articles: articles || [],
            latestChats: latestChats || []
        });

    } catch (error) {
        console.error('Data fetch error:', error);
        return NextResponse.json({
            articles: [],
            latestChats: [],
            error: 'Failed to fetch data'
        }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";
