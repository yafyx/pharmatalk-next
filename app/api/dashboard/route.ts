import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [articles] = await Promise.all([
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
        ]);

        return NextResponse.json({
            articles,
        }, { status: 200 });

    } catch (error) {
        console.error('Data fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}
