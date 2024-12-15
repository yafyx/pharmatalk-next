import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArticleNavigation } from "./navigation";
import { ShareButton } from "./share-button";
import { notFound } from "next/navigation";

async function getArticle(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = new URL(`/api/artikel/${encodeURIComponent(slug)}`, baseUrl);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      notFound();
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching article:", error);
    notFound();
  }
}

export default async function ArticleDetail({
  params,
}: {
  params: { slug: string };
}) {
  if (!params.slug) notFound();

  const article = await getArticle(params.slug);

  return (
    <div className="min-h-screen bg-white mt-20">
      <ArticleNavigation>
        <ShareButton />
      </ArticleNavigation>

      <header className="relative h-[50vh] bg-gradient-to-b from-emerald-500 to-teal-500">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-white">
            <Badge className="mb-4 bg-emerald-600 hover:bg-emerald-700">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {/* <span>{article.readingTime}</span> */}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <Image
            src={article.author.image || "/placeholder.svg"}
            alt={article.author.name}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold">{article.author.name}</h3>
            <p className="text-sm text-muted-foreground">
              {/* {article.author.credentials} */}
            </p>
          </div>
        </div>

        <article className="prose prose-emerald lg:prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* {relatedArticles.map((article) => (
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
            ))} */}
          </div>
        </section>
      </main>
    </div>
  );
}
