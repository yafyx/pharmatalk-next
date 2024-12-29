import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArticleContent } from "./content";

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 mb-24">
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

        <ArticleContent article={article} />
      </div>
    </div>
  );
}
