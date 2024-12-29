"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, ArrowRight } from "lucide-react";
import { SunIcon, MoonIcon } from "lucide-react";
import {
  User,
  Check,
  LineChart,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// import "leaflet/dist/leaflet.css";

interface Article {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
}

interface Medicine {
  id: number;
  name: string;
  category: string;
  price: number;
  manufacturer: string;
}

interface DashboardData {
  articles: Article[];
  medicines: Medicine[];
}

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    articles: [],
    medicines: [],
  });

  const getTimeIcon = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      return (
        <SunIcon className="h-8 w-8 text-yellow-500 mr-3 fill-yellow-500" />
      );
    }
    return (
      <MoonIcon className="h-8 w-8 text-purple-500 mr-3 fill-purple-500" />
    );
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/auth/login");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted mt-10 mx-auto max-w-3xl">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-sm bg-background/30 p-4 sm:p-6 rounded-2xl border">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center">
              {getTimeIcon()}
              Halo, {user.firstName}!
            </h1>
            <p className="text-muted-foreground">
              Selamat datang kembali! Temukan informasi kesehatan terbaru dan
              layanan apotek di sekitar Anda.
            </p>
          </div>
        </div>
        <Card className="border shadow-sm bg-gradient-to-tr from-blue-500/10 via-blue-400/5 to-green-500/10">
          <CardHeader>
            <CardTitle>Lengkapi Profil Anda</CardTitle>
            <p className="text-sm text-muted-foreground">
              Selesaikan langkah-langkah berikut untuk mengakses layanan lengkap
              PhamaTalk:
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  icon: User,
                  text: "Verifikasi Identitas",
                  completed: false,
                },
                { icon: Check, text: "Lengkapi Data Diri", completed: false },
                { icon: Check, text: "Riwayat Kesehatan", completed: true },
                {
                  icon: LineChart,
                  text: "Data Vital Signs",
                  completed: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center">
                      {item.completed && (
                        <Check className="w-3 h-3 text-primary" />
                      )}
                    </div>
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span
                      className={item.completed ? "text-muted-foreground" : ""}
                    >
                      {item.text}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-gray-100">
          <CardHeader>
            <CardTitle>Tim Dokter Anda</CardTitle>
            <p className="text-sm text-muted-foreground">
              Konsultasikan masalah kesehatan Anda dengan tim dokter kami
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "dr. Rahmad Santoso", role: "Dokter Umum" },
              { name: "dr. Siti Aminah", role: "Dokter Spesialis" },
              { name: "dr. Budi Prakoso", role: "Dokter Umum" },
              { name: "dr. Linda Wijaya", role: "Dokter Spesialis" },
            ].map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-lg p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg`} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

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
                : data.articles.map((article) => (
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
                            src={article.author.image || "/placeholder.svg"}
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
                          <p className="text-muted-foreground text-sm">
                            {new Date(article.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
