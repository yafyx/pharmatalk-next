"use client";

import { useEffect, useState } from "react";
import type { Artikel } from "@/types/artikel";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Semua" },
  { id: "kesehatan", label: "Kesehatan Umum" },
  { id: "farmasi", label: "Obat-obatan" },
  { id: "gaya-hidup", label: "Gaya Hidup" },
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-gradient-to-r from-blue-500/90 to-cyan-500/90 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
          >
            Artikel Kesehatan
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-white/90 text-base md:text-xl font-light px-4"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Temukan informasi kesehatan terpercaya untuk hidup lebih sehat dan
            bahagia
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto -mt-8 py-6 md:py-12 px-4 relative z-20">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-8 md:mb-12 space-y-4 md:space-y-6 px-2"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-500" />
            <Input
              className="h-12 md:h-14 pl-10 bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-md transition-all duration-300 border-gray-200 focus:border-emerald-500"
              placeholder="Cari artikel kesehatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full px-1">
            <TabsList className="bg-white/50 backdrop-blur-sm p-1.5 rounded-xl w-full flex justify-start gap-1 overflow-x-auto no-scrollbar">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "rounded-lg transition-all duration-300 flex-shrink-0 px-4",
                    activeCategory === category.id &&
                      "bg-emerald-50 text-emerald-900"
                  )}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-2"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.6 }}
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
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/artikel/${article.slug}`}>
                    <Card className="group hover:scale-[1.02] transition-all duration-500 hover:shadow-xl h-[400px] md:h-[450px] lg:h-[500px] bg-white/80 backdrop-blur-sm border-transparent hover:border-emerald-500/20">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="relative h-[200px] md:h-[250px] overflow-hidden rounded-t-xl">
                          <Image
                            alt={article.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            height={300}
                            src={article.image || "/placeholder.svg"}
                            width={400}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col">
                          <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-xs md:text-sm">
                              Kesehatan
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs md:text-sm">
                              {article.author.name}
                            </Badge>
                          </div>
                          <h3 className="text-lg md:text-xl font-semibold group-hover:text-emerald-600 transition-colors mb-2 md:mb-3 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-3 text-xs md:text-sm flex-1">
                            {article.content}
                          </p>
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
