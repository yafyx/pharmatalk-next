"use client";

import { useEffect, useState, useMemo } from "react";
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

export default function CariObatPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/obat");
        const data = await response.json();
        if (data.success) {
          setMedicines(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [medicines, searchQuery]);

  const handleCardClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const getMedicineImageUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=e2e8f0&color=1e293b&size=200&font-size=0.1&length=20&bold=true`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 mt-20">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-muted rounded-lg w-48" />
          <div className="relative">
            <div className="h-12 bg-muted rounded-lg" />
            <div className="absolute left-3 top-2.5 h-5 w-5 bg-muted-foreground rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 8].map((i) => (
              <div key={i} className="bg-muted rounded-lg p-4 space-y-4">
                <div className="bg-gray-300 h-40 rounded-lg" />
                <div className="h-6 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 mt-20">
      <h1 className="text-4xl font-bold mb-8 text-primary">Cari Obat</h1>
      <div className="mb-8 relative w-full max-w-2xl mx-auto">
        <Input
          placeholder="Masukkan nama obat yang ingin dicari..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-lg rounded-xl shadow-sm"
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedicines.map((medicine) => (
          <Card
            key={medicine.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={() => handleCardClick(medicine)}
          >
            <CardContent className="p-4">
              <div className="relative w-full aspect-square">
                <Image
                  alt={medicine.name}
                  className="w-full aspect-square object-cover rounded-lg hover:opacity-90 transition-opacity"
                  height={200}
                  src={getMedicineImageUrl(medicine.name)}
                  width={200}
                />
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-lg font-semibold line-clamp-2">
                  {medicine.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {medicine.category}
                </p>
                <p className="text-primary font-bold">
                  {formatPrice(medicine.price)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              {selectedMedicine?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedMedicine && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full aspect-square">
                  <Image
                    alt={selectedMedicine.name}
                    className="w-full aspect-square object-cover rounded-lg shadow-md"
                    height={300}
                    src={getMedicineImageUrl(selectedMedicine.name)}
                    width={300}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">
                      Informasi Umum
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Kategori:</span>{" "}
                        {selectedMedicine.category}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Harga:</span>{" "}
                        <span className="text-primary font-bold">
                          {formatPrice(selectedMedicine.price)}
                        </span>
                      </p>
                      {selectedMedicine.manufacturer && (
                        <p className="text-sm">
                          <span className="font-medium">Produsen:</span>{" "}
                          {selectedMedicine.manufacturer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
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
                <div className="bg-yellow-50 p-4 rounded-lg mt-6">
                  <p className="text-sm text-yellow-800 font-medium">
                    Catatan: Informasi ini hanya sebagai referensi. Selalu
                    konsultasikan dengan dokter atau apoteker untuk informasi
                    lebih detail dan penggunaan yang tepat.
                  </p>
                </div>
              </div>
            </>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
