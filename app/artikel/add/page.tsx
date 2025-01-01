import { ArtikelForm } from "@/components/artikel-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Tambah Artikel Baru",
  description: "Buat artikel baru di PharmatTalk",
};

export default function AddArtikelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 mb-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/artikel"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-6 hover:bg-white/60"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Kembali ke Artikel
        </Link>

        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Tambah Artikel Baru
          </h1>
          <p className="text-muted-foreground">
            Bagikan pengetahuan Anda dengan PharmaTalk
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <ArtikelForm />
        </div>
      </div>
    </div>
  );
}
