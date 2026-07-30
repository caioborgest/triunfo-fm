import { prisma } from "@triunfo/database";

import type {
  JsonValue,
  PublishedArticleDetail,
  PublishedArticleHeroImage,
  PublishedArticleSummary,
} from "./types";

export interface PublishedArticlesQuery {
  readonly limit?: number;
  readonly categorySlug?: string;
  readonly featured?: boolean;
  readonly urgent?: boolean;
}

const publicRevisionSelect = {
  title: true,
  subtitle: true,
  summary: true,
  createdAt: true,
  category: { select: { name: true, slug: true } },
  authorProfile: { select: { displayName: true, slug: true } },
  media: {
    where: {
      role: "HERO" as const,
      mediaAsset: { status: "READY" as const, deletedAt: null },
    },
    orderBy: { position: "asc" as const },
    take: 1,
    select: {
      altText: true,
      caption: true,
      credit: true,
      mediaAsset: { select: { publicUrl: true } },
    },
  },
};

type PublicSummaryRow = Awaited<ReturnType<typeof selectPublishedSummaryRows>>[number];

async function selectPublishedSummaryRows(query: PublishedArticlesQuery, currentTime: Date) {
  return prisma.article.findMany({
    where: {
      publicationStatus: "PUBLISHED",
      publishedRevisionId: { not: null },
      publishedAt: { lte: currentTime },
      unpublishedAt: null,
      deletedAt: null,
      ...(query.featured === undefined ? {} : { isFeatured: query.featured }),
      ...(query.urgent === undefined ? {} : { isUrgent: query.urgent }),
      ...(query.categorySlug
        ? { publishedRevision: { is: { category: { slug: query.categorySlug } } } }
        : {}),
    },
    select: {
      id: true,
      publicSlug: true,
      publishedAt: true,
      isUrgent: true,
      isFeatured: true,
      publishedRevision: { select: publicRevisionSelect },
    },
    orderBy: [{ priority: "desc" }, { publishedAt: "desc" }],
    take: Math.min(Math.max(query.limit ?? 12, 1), 50),
  });
}

function heroImage(
  media: PublicSummaryRow["publishedRevision"] extends null
    ? never
    : NonNullable<PublicSummaryRow["publishedRevision"]>["media"],
): PublishedArticleHeroImage | null {
  const hero = media[0];
  if (!hero?.mediaAsset.publicUrl || !hero.altText) return null;
  return {
    url: hero.mediaAsset.publicUrl,
    altText: hero.altText,
    caption: hero.caption,
    credit: hero.credit,
  };
}

function mapSummary(row: PublicSummaryRow): PublishedArticleSummary | null {
  const revision = row.publishedRevision;
  if (!row.publicSlug || !row.publishedAt || !revision) return null;
  return {
    id: row.id,
    slug: row.publicSlug,
    title: revision.title,
    subtitle: revision.subtitle,
    summary: revision.summary,
    publishedAt: row.publishedAt,
    updatedAt: revision.createdAt,
    isUrgent: row.isUrgent,
    isFeatured: row.isFeatured,
    category: revision.category,
    author: revision.authorProfile,
    heroImage: heroImage(revision.media),
  };
}

export async function getPublishedArticles(
  query: PublishedArticlesQuery = {},
): Promise<PublishedArticleSummary[]> {
  const rows = await selectPublishedSummaryRows(query, new Date());
  return rows
    .map(mapSummary)
    .filter((article): article is PublishedArticleSummary => article !== null);
}

export async function getPublishedArticleBySlug(
  slug: string,
): Promise<PublishedArticleDetail | null> {
  const currentTime = new Date();
  const row = await prisma.article.findFirst({
    where: {
      publicSlug: slug,
      publicationStatus: "PUBLISHED",
      publishedRevisionId: { not: null },
      publishedAt: { lte: currentTime },
      unpublishedAt: null,
      deletedAt: null,
    },
    select: {
      id: true,
      publicSlug: true,
      publishedAt: true,
      isUrgent: true,
      isFeatured: true,
      publishedRevision: {
        select: {
          ...publicRevisionSelect,
          bodyHtml: true,
          contentKind: true,
          isSponsored: true,
          isSensitive: true,
          tags: { select: { tag: { select: { name: true, slug: true } } } },
          sources: {
            orderBy: { position: "asc" },
            select: {
              name: true,
              publisher: true,
              title: true,
              url: true,
              isOfficial: true,
            },
          },
          seoMetadata: {
            select: {
              seoTitle: true,
              metaDescription: true,
              canonicalUrlOverride: true,
              ogImageAsset: { select: { publicUrl: true } },
            },
          },
          geoMetadata: {
            select: {
              shortAnswer: true,
              executiveSummary: true,
              keyFacts: true,
            },
          },
        },
      },
    },
  });
  if (!row) return null;

  const summary = mapSummary(row);
  const revision = row.publishedRevision;
  if (!summary || !revision) return null;
  return {
    ...summary,
    bodyHtml: revision.bodyHtml,
    contentKind: revision.contentKind,
    isSponsored: revision.isSponsored,
    isSensitive: revision.isSensitive,
    tags: revision.tags.map(({ tag }) => tag),
    sources: revision.sources,
    seo: {
      title: revision.seoMetadata?.seoTitle ?? revision.title,
      description: revision.seoMetadata?.metaDescription ?? revision.summary,
      canonicalUrlOverride: revision.seoMetadata?.canonicalUrlOverride ?? null,
      ogImageUrl: revision.seoMetadata?.ogImageAsset?.publicUrl ?? null,
    },
    geo: revision.geoMetadata
      ? {
          shortAnswer: revision.geoMetadata.shortAnswer,
          executiveSummary: revision.geoMetadata.executiveSummary,
          keyFacts: revision.geoMetadata.keyFacts as JsonValue | null,
        }
      : null,
  };
}
