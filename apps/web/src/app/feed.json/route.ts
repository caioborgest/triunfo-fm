import { NextResponse } from "next/server";
import { createJsonFeed } from "@triunfo/seo";
import { getPublishedArticles } from "@/modules/editorial/queries";

export const revalidate = 1800; // 30 minutos

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function GET() {
  try {
    const articles = await getPublishedArticles({ limit: 50 });

    const feedItems = articles.map((art) => ({
      title: art.title,
      slug: art.slug,
      summary: art.summary,
      publishedAt: art.publishedAt,
      categoryName: art.category.name,
      authorName: art.author?.displayName ?? null,
      imageUrl: art.heroImage?.url ?? null,
    }));

    const json = createJsonFeed(feedItems, { siteUrl });

    return new NextResponse(json, {
      headers: {
        "Content-Type": "application/feed+json; charset=utf-8",
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Erro ao gerar JSON Feed:", error);
    return new NextResponse("Erro ao gerar JSON Feed", { status: 500 });
  }
}
