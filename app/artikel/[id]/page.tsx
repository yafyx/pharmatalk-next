"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const mockArticle = {
  id: "1",
  title: "Pentingnya Vaksinasi COVID-19 dalam Mencegah Penyebaran Virus",
  content: `
    <p>Vaksinasi COVID-19 telah menjadi salah satu langkah paling efektif dalam upaya global untuk mengendalikan pandemi. Artikel ini akan membahas secara mendalam mengapa vaksinasi sangat penting dan bagaimana cara kerjanya dalam melindungi tubuh kita.</p>

    <h2>Mengapa Vaksinasi Penting?</h2>
    <p>Vaksinasi tidak hanya melindungi individu yang menerima vaksin, tetapi juga membantu menciptakan kekebalan kelompok yang melindungi mereka yang tidak dapat divaksinasi karena alasan medis.</p>

    <h2>Cara Kerja Vaksin</h2>
    <p>Vaksin bekerja dengan merangsang sistem kekebalan tubuh untuk mengenali dan melawan virus. Ketika tubuh terpapar virus yang sebenarnya, sistem kekebalan sudah siap untuk melawannya.</p>

    <h2>Efektivitas Vaksin</h2>
    <p>Penelitian menunjukkan bahwa vaksin COVID-19 sangat efektif dalam mencegah kasus serius dan menurunkan tingkat rawat inap. Meskipun masih mungkin terinfeksi setelah vaksinasi, gejala yang dialami umumnya lebih ringan.</p>
  `,
  image:
    "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&auto=format&fit=crop&q=60",
  author: {
    name: "Dr. Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=60",
    credentials: "MD, Epidemiologist",
  },
  publishedAt: "2024-01-15",
  readingTime: "5 min read",
  category: "Kesehatan Umum",
};

const relatedArticles = [
  {
    id: "2",
    title: "Efek Samping Vaksin: Apa yang Perlu Diketahui",
    image:
      "https://images.unsplash.com/photo-1593076819614-275370ed0090?w=800&auto=format&fit=crop&q=60",
    author: { name: "Dr. Michael Chen" },
  },
  {
    id: "3",
    title: "Perkembangan Terbaru Vaksin COVID-19",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=60",
    author: { name: "Dr. Emily White" },
  },
];

export default function ArticleDetail({}: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white mt-20">
      <nav className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/artikel">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Kembali
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <header className="relative h-[50vh] bg-gradient-to-b from-emerald-500 to-teal-500">
        <Image
          src={mockArticle.image}
          alt={mockArticle.title}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-white">
            <Badge className="mb-4 bg-emerald-600 hover:bg-emerald-700">
              {mockArticle.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {mockArticle.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{mockArticle.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{mockArticle.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <Image
            src={mockArticle.author.image}
            alt={mockArticle.author.name}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold">{mockArticle.author.name}</h3>
            <p className="text-sm text-muted-foreground">
              {mockArticle.author.credentials}
            </p>
          </div>
        </div>

        <article className="prose prose-emerald lg:prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: mockArticle.content }} />
        </article>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((article) => (
              <Link key={article.id} href={`/artikel/${article.id}`}>
                <Card className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {article.author.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
