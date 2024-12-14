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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto py-12 px-4 mt-20">
        <div className="space-y-10">
          <div className="flex justify-between items-center backdrop-blur-sm bg-background/30 p-6 rounded-2xl border">
            <h1 className="text-4xl font-bold">Halo, {user.firstName}!</h1>
            <Button
              className="font-bold"
              variant="secondary"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Live Chat
            </Button>
          </div>

          {isChatOpen && (
            <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom">
              {/* <Chat /> */}
            </div>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Topik Terkini</CardTitle>
              <Button variant="ghost" onClick={() => router.push("/artikel")}>
                Lihat selengkapnya
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        className="group hover:shadow-lg transition-all duration-300"
                      >
                        <CardContent className="p-4">
                          <div className="relative overflow-hidden rounded-lg">
                            <Image
                              alt={article.title}
                              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                              height={200}
                              src={article.image || "/placeholder.svg"}
                              width={400}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Badge variant="secondary">Kesehatan</Badge>
                            <Badge>{article.author.name}</Badge>
                          </div>
                          <h3 className="text-lg font-semibold mt-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2">
                            {article.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Cari Obat</CardTitle>
              <Button variant="ghost" onClick={() => router.push("/cari-obat")}>
                Lihat selengkapnya
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Cari obat..." />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
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
                          <h4 className="font-semibold mt-2">
                            {medicine.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {medicine.category}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Apotek Terdekat</CardTitle>
              <Button
                variant="ghost"
                onClick={() => router.push("/cari-apotek")}
              >
                Lihat selengkapnya
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
                  {/* <Map /> */}
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Cari apotek terdekat..."
                    />
                  </div>
                  <div className="space-y-4 max-h-[340px] overflow-y-auto scrollbar-thin">
                    {[1, 2, 3].map((index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">Apotek Rahman</h4>
                          <div className="flex items-center text-muted-foreground mt-2">
                            <MapPin className="mr-2 h-4 w-4" />
                            <p>Jl. Simatupang No.1, Menteng</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center text-muted-foreground">
                              <Navigation className="mr-2 h-4 w-4" />
                              <span>2.5 km</span>
                            </div>
                            <Button
                              variant="link"
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
        </div>
      </div>
    </div>
  );
}
