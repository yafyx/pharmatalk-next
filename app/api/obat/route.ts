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

        if (!body.name || !body.category || !body.price) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name, category, and price are required"
                },
                { status: 400 }
            );
        }

        const price = Number(body.price);
        if (isNaN(price)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Price must be a valid number"
                },
                { status: 400 }
            );
        }

        const medicine = await prisma.obat.create({
            data: {
                name: body.name,
                category: body.category,
                price: price,
                desc: body.desc || null,
                dosage: body.dosage || null,
                indication: body.indication || null,
                sideEffects: body.sideEffects || null,
                warning: body.warning || null,
                composition: body.composition || null,
                manufacturer: body.manufacturer || null,
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

export async function PATCH(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { id, ...updateData } = body;

        const medicine = await prisma.obat.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(
            { success: true, data: medicine },
            { status: 200 }
        );
    } catch (error) {
        console.error("[OBAT_PATCH]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Medicine ID is required" },
                { status: 400 }
            );
        }

        await prisma.obat.delete({
            where: { id },
        });

        return NextResponse.json(
            { success: true, message: "Medicine deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("[OBAT_DELETE]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
