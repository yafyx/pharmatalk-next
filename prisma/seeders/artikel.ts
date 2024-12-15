import { PrismaClient } from '@prisma/client';
import { users } from './user.js';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

const articles = [
    {
        title: "Pentingnya Kepatuhan Minum Obat pada Pasien Hipertensi",
        slug: generateSlug("Pentingnya Kepatuhan Minum Obat pada Pasien Hipertensi"),
        content: `Kepatuhan minum obat merupakan faktor kunci dalam pengelolaan hipertensi yang efektif. 
    Banyak pasien hipertensi yang menghentikan pengobatan ketika merasa tekanan darahnya sudah normal, 
    padahal hal ini dapat berbahaya.

    Beberapa tips untuk meningkatkan kepatuhan minum obat:
    1. Atur alarm pengingat
    2. Gunakan pill organizer
    3. Catat jadwal minum obat
    4. Konsultasi rutin dengan dokter
    
    Ingat, hipertensi adalah kondisi kronis yang membutuhkan pengobatan berkelanjutan.`,
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831",
        authorId: users[0].id,
        category: "Kesehatan"
    },
    {
        title: "Mengenal Interaksi Obat dalam Pengobatan Multiple",
        slug: generateSlug("Mengenal Interaksi Obat dalam Pengobatan Multiple"),
        content: `Interaksi obat terjadi ketika efek suatu obat berubah karena adanya obat lain, makanan, 
    atau minuman. Beberapa interaksi bisa berbahaya, sementara yang lain bisa mengurangi efektivitas obat.

    Jenis interaksi obat:
    1. Interaksi farmakokinetik
    2. Interaksi farmakodinamik
    3. Interaksi fisiko-kimia

    Selalu konsultasikan dengan apoteker atau dokter sebelum mengkombinasikan obat-obatan.`,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
        authorId: users[1].id,
        category: "Farmasi"
    }
];

export async function seedArticles() {
    for (const article of articles) {
        await prisma.artikel.create({
            data: article
        });
    }
    console.log('Articles seeded successfully');
}
