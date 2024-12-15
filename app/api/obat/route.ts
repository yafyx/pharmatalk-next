import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query");

        let medicines;
        if (query) {
            medicines = await prisma.obat.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: "insensitive" } },
                        { category: { contains: query, mode: "insensitive" } },
                    ],
                },
                orderBy: { createdAt: "desc" },
            });
        } else {
            medicines = await prisma.obat.findMany({
                orderBy: { createdAt: "desc" },
            });
        }

        return NextResponse.json({ success: true, data: medicines });
    } catch (error) {
        console.error("[OBAT_GET]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const medicine = await prisma.obat.create({
            data: {
                name: body.name,
                category: body.category,
                price: body.price,
                desc: body.desc,
                dosage: body.dosage,
                indication: body.indication,
                sideEffects: body.sideEffects,
                warning: body.warning,
                composition: body.composition,
                manufacturer: body.manufacturer,
            },
        });

        return NextResponse.json(
            { success: true, data: medicine },
            { status: 201 }
        );
    } catch (error) {
        console.error("[OBAT_POST]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
