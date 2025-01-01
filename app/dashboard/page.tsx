"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, ArrowRight } from "lucide-react";
import { SunIcon, MoonIcon } from "lucide-react";
import { User, Check, LineChart, MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// import "leaflet/dist/leaflet.css";

interface Article {
  id: string; // Changed to string to match MongoDB ID
  title: string;
  slug: string;
  image: string | null;
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

const getImageUrl = (imageUrl: string | null | undefined) => {
  if (!imageUrl)
    return "https://placehold.co/600x400/e2e8f0/94a3b8?text=No+Image";

  if (imageUrl.includes("cloudinary.com")) {
    const splitUrl = imageUrl.split("/");
    const publicId = splitUrl[splitUrl.length - 1].split(".")[0];
    return publicId;
  }

  return imageUrl;
};

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted mt-10 mx-auto max-w-3xl mb-20">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-sm bg-background/30 p-4 sm:p-6 rounded-2xl border">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center">
              {getTimeIcon()}
              Halo, {user.firstName}!
            </h1>
            <p className="text-muted-foreground">
              Kami sangat senang untuk membantu Anda!
            </p>
          </div>
        </div>
        <Card className="border shadow-sm bg-gradient-to-tr from-blue-500/10 via-blue-400/5 to-green-500/10">
          <CardHeader>
            <CardTitle>Lengkapi Profil Anda</CardTitle>
            <p className="text-sm text-muted-foreground">
              Memastikan informasi kesehatan Anda lengkap untuk memudahkan ahli
              medis dalam memberikan pelayanan:
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  icon: ArrowRight,
                  text: "Selesaikan Onboarding",
                  completed: false,
                },
                {
                  icon: User,
                  text: "Data Pribadi",
                  description: "Nama, tanggal lahir, dan kontak darurat",
                  completed: true,
                },
                {
                  icon: Check,
                  text: "Riwayat Medis",
                  description: "Penyakit, alergi, dan obat rutin",
                  completed: true,
                },
                {
                  icon: LineChart,
                  text: "Pemeriksaan Terakhir",
                  description: "Tekanan darah, gula darah, kolesterol",
                  completed: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {item.completed ? (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300" />
                  )}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground">{item.text}</span>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
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

        <Card className="border shadow-sm bg-gradient-to-tr from-blue-500/5 via-transparent to-green-500/5">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                Topik Terkini
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Artikel kesehatan terbaru untuk meningkatkan wawasan Anda
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/artikel")}
              className="group transition-all hover:bg-primary"
            >
              Lihat selengkapnya
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {isLoading
                ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <Card
                        key={`skeleton-${index}`}
                        className="overflow-hidden border-0 shadow-md"
                      >
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
                      className="group cursor-pointer overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      onClick={() => router.push(`/artikel/${article.slug}`)}
                    >
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden">
                          {article.image?.includes("cloudinary.com") ? (
                            <CldImage
                              src={getImageUrl(article.image)}
                              alt={article.title}
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                            />
                          ) : (
                            <Image
                              alt={article.title}
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              src={getImageUrl(article.image)}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
                          <div className="absolute bottom-0 p-4 w-full">
                            <div className="flex gap-2 mb-2">
                              <Badge
                                variant="secondary"
                                className="bg-white/90 text-black backdrop-blur-sm"
                              >
                                Kesehatan
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="bg-white/90 text-black backdrop-blur-sm"
                              >
                                {new Date(article.createdAt).toLocaleDateString(
                                  "id-ID",
                                  { month: "short", year: "numeric" }
                                )}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2 group-hover:text-primary-foreground">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-2 text-white/90 text-sm">
                              <Avatar className="h-6 w-6 border-2 border-white/50">
                                <AvatarImage src={article.author.image} />
                                <AvatarFallback className="bg-primary text-white">
                                  {article.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {article.author.name}
                              </span>
                            </div>
                          </div>
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
