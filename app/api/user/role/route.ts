import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get("clerkId");

    if (!clerkId) {
        return NextResponse.json({ error: "Clerk ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { clerkId },
        select: { role: true }
    });

    return NextResponse.json({ role: user?.role });
}
