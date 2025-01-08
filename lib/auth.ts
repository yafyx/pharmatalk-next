import { prisma } from "@/lib/prisma";
import { auth } from '@clerk/nextjs/server';

export type UserRole = "ADMIN" | "USER" | "APOTEKER" | "DOKTER";

export async function getCurrentUser() {
    const { userId }: { userId: string | null } = await auth()

    if (!userId) return null;

    const user = await prisma.user.findUnique({
        where: { clerkId: userId }
    });

    return user;
}

export async function hasRole(roles: UserRole | UserRole[]) {
    const user = await getCurrentUser();
    if (!user) return false;

    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    return rolesToCheck.includes(user.role);
}

export async function requireRole(roles: UserRole | UserRole[]) {
    const hasRequiredRole = await hasRole(roles);
    if (!hasRequiredRole) {
        throw new Error("Unauthorized");
    }
}
