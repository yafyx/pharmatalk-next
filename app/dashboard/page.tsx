"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import {
  Search,
  MessageSquare,
  ArrowRight,
  Navigation,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Chat } from "@/components/chat";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// import "leaflet/dist/leaflet.css";

const articles = [
  {
    id: 1,
    title: "Article 1",
    content: "Content of article 1",
    image: "/placeholder.svg",
    author: { name: "Author 1" },
  },
  {
    id: 2,
    title: "Article 2",
    content: "Content of article 2",
    image: "/placeholder.svg",
    author: { name: "Author 2" },
  },
];

const medicines = [
  {
    id: 1,
    name: "Medicine 1",
    category: "Category 1",
  },
  {
    id: 2,
    name: "Medicine 2",
    category: "Category 2",
  },
  {
    id: 3,
    name: "Medicine 3",
    category: "Category 3",
  },
];

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/auth/login");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted mt-20">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-sm bg-background/30 p-4 sm:p-6 rounded-2xl border">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Halo, {user.firstName}!
            </h1>
            <p className="text-muted-foreground">
              Selamat datang kembali di PharmaTalk
            </p>
          </div>
          <Button
            className="w-full sm:w-auto font-medium"
            variant="secondary"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Live Chat
          </Button>
        </div>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="space-y-1">
              <CardTitle>Topik Terkini</CardTitle>
              <p className="text-sm text-muted-foreground">
                Artikel kesehatan terbaru untuk Anda
              </p>
            </div>
            <Button variant="ghost" onClick={() => router.push("/artikel")}>
              Lihat selengkapnya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {isLoading
                ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <Card key={`skeleton-${index}`}>
                        <CardContent className="p-4">
                          <Skeleton className="h-48 w-full rounded-lg" />
                          <div className="flex gap-2 mt-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-6 w-3/4 mt-4" />
                          <Skeleton className="h-4 w-full mt-2" />
                        </CardContent>
                      </Card>
                    ))
                : articles.map((article) => (
                    <Card
                      key={article.id}
                      className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <Image
                            alt={article.title}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                            height={200}
                            src={article.image || "/placeholder.svg"}
                            width={400}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Kesehatan</Badge>
                            <Badge>{article.author.name}</Badge>
                          </div>
                          <h3 className="text-lg font-semibold line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {article.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="space-y-1">
              <CardTitle>Cari Obat</CardTitle>
              <p className="text-sm text-muted-foreground">
                Temukan informasi obat yang Anda butuhkan
              </p>
            </div>
            <Button variant="ghost" onClick={() => router.push("/cari-obat")}>
              Lihat selengkapnya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Cari obat..." />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Card key={`skeleton-medicine-${index}`}>
                        <CardContent className="p-4">
                          <Skeleton className="aspect-square rounded-lg" />
                          <Skeleton className="h-4 w-3/4 mt-4" />
                          <Skeleton className="h-3 w-1/2 mt-2" />
                        </CardContent>
                      </Card>
                    ))
                : medicines.map((medicine) => (
                    <Card
                      key={medicine.id}
                      className="hover:shadow-lg cursor-pointer transition-shadow"
                    >
                      <CardContent className="p-4">
                        <Image
                          alt={medicine.name}
                          className="w-full aspect-square object-cover rounded-lg"
                          height={200}
                          src="/placeholder.svg"
                          width={200}
                        />
                        <h4 className="font-semibold mt-2">{medicine.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {medicine.category}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="space-y-1">
              <CardTitle>Apotek Terdekat</CardTitle>
              <p className="text-sm text-muted-foreground">
                Temukan apotek di sekitar Anda
              </p>
            </div>
            <Button variant="ghost" onClick={() => router.push("/cari-apotek")}>
              Lihat selengkapnya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-md">
                {/* <Map /> */}
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    placeholder="Cari apotek terdekat..."
                  />
                </div>
                <div className="space-y-3 max-h-[250px] sm:max-h-[340px] overflow-y-auto scrollbar-thin">
                  {[1, 2, 3].map((index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <h4 className="font-semibold">Apotek Rahman</h4>
                        <div className="flex items-start text-muted-foreground mt-2">
                          <MapPin className="mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                          <p className="text-sm">
                            Jl. Simatupang No.1, Menteng
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
                          <div className="flex items-center text-muted-foreground">
                            <Navigation className="mr-2 h-4 w-4" />
                            <span className="text-sm">2.5 km</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => {
                              window.open(
                                `https://maps.goo.gl/xyz${index}`,
                                "_blank"
                              );
                            }}
                          >
                            Petunjuk Arah →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <Chat />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
