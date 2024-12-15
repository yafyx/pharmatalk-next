import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const article = await prisma.artikel.findUnique({
            where: {
                slug: params.slug,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error('Failed to fetch article:', error);
        return NextResponse.json(
            { error: 'Failed to fetch article' },
            { status: 500 }
        );
    }
}
