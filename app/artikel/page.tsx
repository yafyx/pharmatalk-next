"use client";

import { useEffect, useState } from "react";
import { Protect } from "@clerk/nextjs";
import type { Artikel } from "@/types/artikel";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "Semua" },
  { id: "obat", label: "Info Obat" },
  { id: "farmasi", label: "Kefarmasian" },
  { id: "kesehatan", label: "Kesehatan" },
];

export default function Articles() {
  const [articles, setArticles] = useState<Artikel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/artikel");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/50 mb-20">
      <div className="relative h-[45vh] flex items-center justify-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-700 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Info Obat & Farmasi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-lg md:text-2xl font-light"
          >
            Informasi terpercaya seputar obat-obatan dan dunia kefarmasian
          </motion.p>
        </div>

        <Protect
          condition={(has) =>
            has({ role: "org:admin" }) ||
            has({ role: "org:apoteker" }) ||
            has({ role: "org:dokter" })
          }
          fallback={null}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 right-4 transform translate-y-1/2"
          >
            <Link href="/artikel/add">
              <Button size="lg" className="shadow-lg gap-2">
                <Plus className="h-5 w-5" />
                Tulis Artikel
              </Button>
            </Link>
          </motion.div>
        </Protect>
      </div>

      <div className="max-w-7xl mx-auto -mt-10 py-6 md:py-12 px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-12 px-2"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                className="h-12 pl-12 bg-white/80 rounded-xl transition-all duration-300 border-slate-200 focus:border-indigo-500 focus:ring-indigo-200"
                placeholder="Cari informasi obat atau artikel farmasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-slate-100/50 p-1 rounded-xl w-full flex justify-start gap-1 overflow-x-auto">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "rounded-lg transition-all duration-300 px-6 py-2 text-sm font-medium",
                      activeCategory === category.id
                        ? "bg-indigo-600 text-white shadow-md"
                        : "hover:bg-white/60 text-slate-600"
                    )}
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-2"
        >
          {isLoading
            ? Array(3)
                .fill(null)
                .map((_, index) => (
                  <Card key={index} className="w-full h-[500px]">
                    <CardContent className="p-0">
                      <Skeleton className="h-[250px] w-full" />
                      <div className="p-4">
                        <div className="flex gap-2 mb-3">
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                        <Skeleton className="h-6 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))
            : filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/artikel/${article.slug}`}>
                    <Card className="group hover:scale-[1.02] transition-all duration-500 hover:shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm border-transparent hover:border-indigo-500/20">
                      <CardContent className="p-0">
                        <div className="relative h-[240px] overflow-hidden">
                          <Image
                            alt={article.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            height={400}
                            src={article.image || "/placeholder.svg"}
                            width={600}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100 transition-all duration-500" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                              {article.category || "Farmasi"}
                            </Badge>
                            <span className="text-sm text-slate-500">
                              {Math.ceil(article.title.length / 100)} min read
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors mb-4 line-clamp-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-slate-100 overflow-hidden">
                                <Image
                                  src={
                                    article.author.image ||
                                    "/placeholder-avatar.svg"
                                  }
                                  alt={article.author.name}
                                  width={32}
                                  height={32}
                                />
                              </div>
                              <span className="text-sm text-slate-600 font-medium">
                                {article.author.name}
                              </span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-slate-300" />
                            <span className="text-sm text-slate-500">
                              {new Date(article.createdAt).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </div>
  );
}
