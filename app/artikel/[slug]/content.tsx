"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Edit2, X } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { ArticleEditForm } from "@/components/artikel-edit";

interface Article {
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  author: {
    name: string;
    image?: string;
  };
}

interface ArticleContentProps {
  article: Article;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const readingTime = calculateReadingTime(article.content);

  return (
    <article className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-10">
      <div className="mb-6">
        <Button
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2 transition-all hover:scale-105"
        >
          {isEditing ? (
            <>
              <X className="h-4 w-4" />
              <span>Batal Edit</span>
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              <span>Edit Artikel</span>
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <ArticleEditForm
          article={article}
          onCancel={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            window.location.reload();
          }}
        />
      ) : (
        <>
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Kesehatan</Badge>
              <Badge variant="outline">{readingTime} menit baca</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground border-b pb-6">
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

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center gap-4 bg-muted/50 p-6 rounded-xl">
              <Image
                src={article.author.image || "/placeholder-avatar.svg"}
                alt={article.author.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-background"
              />
              <div>
                <p className="font-bold text-lg">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">Penulis</p>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
