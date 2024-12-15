import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const articles = await prisma.artikel.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(articles);
    } catch (error) {
        console.error('Failed to fetch articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}
