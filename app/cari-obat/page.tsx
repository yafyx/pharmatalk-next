"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  desc?: string;
  dosage?: string;
  indication?: string;
  sideEffects?: string;
  warning?: string;
  composition?: string;
  manufacturer?: string;
}

const MOCK_MEDICINES: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol",
    category: "Analgesik",
    price: 15000,
    desc: "Obat untuk meredakan nyeri dan menurunkan demam",
    dosage: "500-1000mg setiap 4-6 jam",
    indication: "Demam, sakit kepala, nyeri ringan",
    sideEffects: "Mual, gangguan liver jika overdosis",
    warning: "Jangan melebihi dosis yang dianjurkan",
  },
  {
    id: "2",
    name: "Ibuprofen",
    category: "Anti-inflamasi",
    price: 20000,
    desc: "Obat untuk mengurangi peradangan dan nyeri",
    dosage: "200-400mg setiap 4-6 jam",
    indication: "Nyeri otot, nyeri sendi, demam",
    sideEffects: "Mual, gangguan pencernaan",
    warning: "Hindari penggunaan jangka panjang",
  },
];

export default function CariObatPage() {
  const [medicines] = useState<Medicine[]>(MOCK_MEDICINES);
  const [loading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-12 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-muted h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 mt-20">
      <h1 className="text-3xl font-bold mb-8">Cari Obat</h1>
      <div className="mb-8 relative">
        <Input
          placeholder="Masukkan nama obat yang ingin dicari..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedicines.map((medicine) => (
          <Card
            key={medicine.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(medicine)}
          >
            <CardContent className="p-4">
              <Image
                alt={medicine.name}
                className="w-full aspect-square object-cover rounded-lg bg-muted flex items-center justify-center"
                height={200}
                src={`https://placehold.co/200x200/e2e8f0/1e293b?text=${encodeURIComponent(
                  medicine.name
                )}`}
                width={200}
              />
              <div className="mt-4 space-y-2">
                <h4 className="text-lg font-semibold">{medicine.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Kategori: {medicine.category}
                </p>
                <p className="text-primary font-semibold">{medicine.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedMedicine?.name}</DialogTitle>
          </DialogHeader>

          {selectedMedicine && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Image
                    alt={selectedMedicine.name}
                    className="w-full aspect-square object-cover rounded-lg bg-muted flex items-center justify-center"
                    height={300}
                    src={`https://placehold.co/300x300/e2e8f0/1e293b?text=${encodeURIComponent(
                      selectedMedicine.name
                    )}`}
                    width={300}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Kategori</h3>
                    <p className="text-gray-600">{selectedMedicine.category}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Harga</h3>
                    <p className="text-green-600 font-semibold">
                      {selectedMedicine.price}
                    </p>
                  </div>
                  {selectedMedicine.manufacturer && (
                    <div>
                      <h3 className="font-semibold text-gray-700">Produsen</h3>
                      <p className="text-gray-600">
                        {selectedMedicine.manufacturer}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {selectedMedicine.desc && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Deskripsi</h3>
                    <p className="text-gray-600">{selectedMedicine.desc}</p>
                  </div>
                )}
                {selectedMedicine.dosage && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Dosis</h3>
                    <p className="text-gray-600">{selectedMedicine.dosage}</p>
                  </div>
                )}
                {selectedMedicine.indication && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Indikasi</h3>
                    <p className="text-gray-600">
                      {selectedMedicine.indication}
                    </p>
                  </div>
                )}
                {selectedMedicine.sideEffects && (
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Efek Samping
                    </h3>
                    <p className="text-gray-600">
                      {selectedMedicine.sideEffects}
                    </p>
                  </div>
                )}
                {selectedMedicine.warning && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Peringatan</h3>
                    <p className="text-red-600">{selectedMedicine.warning}</p>
                  </div>
                )}
                {selectedMedicine.composition && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Komposisi</h3>
                    <p className="text-gray-600">
                      {selectedMedicine.composition}
                    </p>
                  </div>
                )}
                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-yellow-800">
                    Catatan: Informasi ini hanya sebagai referensi. Selalu
                    konsultasikan dengan dokter atau apoteker untuk informasi
                    lebih detail dan penggunaan yang tepat.
                  </p>
                </div>
              </div>
            </>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
