import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ChevronLeft, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getArticle(slug: string) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/api/artikel/${slug}`
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt || article.content.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.excerpt || article.content.substring(0, 160),
      images: [{ url: article.image || "/placeholder.svg" }],
    },
  };
}

export default async function ArtikelPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
        <Link
          href="/artikel"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-6 bg-white/90 backdrop-blur-sm hover:bg-white/70"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Kembali ke Artikel
        </Link>

        <article className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-10">
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Kesehatan</Badge>
              <Badge variant="outline">5 menit baca</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <time className="text-sm">
                  {format(new Date(article.createdAt), "d MMMM yyyy", {
                    locale: id,
                  })}
                </time>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">{article.content}</p>
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center gap-4">
              <Image
                src={article.author.image || "/placeholder-avatar.svg"}
                alt={article.author.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">Penulis</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
