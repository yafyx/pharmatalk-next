import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user';
import { seedArticles } from './artikel';
import { seedObat } from './obat';

const prisma = new PrismaClient();

async function main() {
    try {
        // await prisma.artikel.deleteMany();
        // await prisma.user.deleteMany();
        // await prisma.obat.deleteMany();

        // await seedUsers();
        // await seedArticles();
        await seedObat();

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

//npx tsx prisma/seeders/index.ts
main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
