import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const obatData = [
    {
        name: 'Cetirizine',
        category: 'Antihistamin',
        price: 8000,
        desc: 'Obat antihistamin untuk mengatasi alergi',
        dosage: 'Dewasa dan anak >12 tahun: 1 tablet (10mg) sekali sehari',
        indication: 'Mengatasi gejala alergi seperti bersin, hidung tersumbat, dan gatal-gatal',
        sideEffects: 'Mengantuk, mulut kering, sakit kepala ringan',
        warning: 'Hindari mengoperasikan kendaraan setelah mengonsumsi obat ini',
        composition: 'Setiap tablet mengandung Cetirizine HCl 10mg',
        manufacturer: 'Kimia Farma'
    },
    {
        name: 'Metformin',
        category: 'Antidiabetes',
        price: 20000,
        desc: 'Obat untuk mengendalikan kadar gula darah',
        dosage: '500-1000mg dua kali sehari dengan makanan',
        indication: 'Pengobatan diabetes tipe 2',
        sideEffects: 'Mual, diare, kehilangan nafsu makan',
        warning: 'Konsumsi bersama makanan untuk mengurangi efek samping pencernaan',
        composition: 'Metformin HCl 500mg',
        manufacturer: 'Sanbe Farma'
    },
    {
        name: 'Amlodipine',
        category: 'Antihipertensi',
        price: 25000,
        desc: 'Obat untuk menurunkan tekanan darah tinggi',
        dosage: '5-10mg sekali sehari',
        indication: 'Pengobatan hipertensi dan angina',
        sideEffects: 'Pusing, pembengkakan kaki, jantung berdebar',
        warning: 'Jangan menghentikan penggunaan secara mendadak',
        composition: 'Amlodipine besylate setara dengan Amlodipine 5mg',
        manufacturer: 'Dexa Medica'
    },
    {
        name: 'Lansoprazole',
        category: 'Antasida',
        price: 18000,
        desc: 'Obat untuk mengurangi produksi asam lambung',
        dosage: '30mg sekali sehari sebelum makan',
        indication: 'Pengobatan GERD dan tukak lambung',
        sideEffects: 'Sakit kepala, mual, diare',
        warning: 'Hindari penggunaan jangka panjang tanpa pengawasan dokter',
        composition: 'Lansoprazole 30mg',
        manufacturer: 'Kalbe Farma'
    },
    {
        name: 'Meloxicam',
        category: 'Antiinflamasi',
        price: 22000,
        desc: 'Obat antiinflamasi non-steroid (NSAID)',
        dosage: '7.5-15mg sekali sehari',
        indication: 'Mengatasi nyeri dan peradangan pada osteoarthritis',
        sideEffects: 'Nyeri perut, mual, pusing',
        warning: 'Konsumsi setelah makan untuk mengurangi iritasi lambung',
        composition: 'Meloxicam 15mg',
        manufacturer: 'Novell Pharmaceutical'
    }
];

export async function seedObat() {
    try {
        const obats = await Promise.all(
            obatData.map(async (obat) => {
                return await prisma.obat.create({
                    data: obat
                });
            })
        );
        console.log(`Created ${obats.length} obat records`);
    } catch (error) {
        console.error('Error seeding obat:', error);
        throw error;
    }
}
