import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

export const users = [
    {
        id: 'user_2VKwLX8dv3UY0x1UsKnH',
        clerkId: 'user_2VKwLX8dv3UY0x1UsKnH',
        name: 'Dr. Aditya Pratama',
        email: 'dr.aditya@pharmatalk.com',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: UserRole.DOKTER,
    },
    {
        id: 'user_2NKwLX8dv3UY0x1UsKnM',
        clerkId: 'user_2NKwLX8dv3UY0x1UsKnM',
        name: 'Apt. Sarah Wijaya',
        email: 'apt.sarah@pharmatalk.com',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        role: UserRole.APOTEKER,
    },
    {
        id: 'user_2MKwLX8dv3UY0x1UsKnP',
        clerkId: 'user_2MKwLX8dv3UY0x1UsKnP',
        name: 'Admin Pharmatalk',
        email: 'admin@pharmatalk.com',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        role: UserRole.ADMIN,
    }
];

export async function seedUsers() {
    for (const user of users) {
        const { id, ...updateData } = user;
        await prisma.user.upsert({
            where: { clerkId: user.clerkId },
            update: updateData,
            create: user,
        });
    }
    console.log('Users seeded successfully');
}
