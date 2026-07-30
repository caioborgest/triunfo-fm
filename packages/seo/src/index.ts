import type { Metadata } from "next";

export const DEFAULT_SITE_NAME = "Triunfo FM 87,9";
export const DEFAULT_DESCRIPTION =
  "Informação, cultura e turismo em um só lugar.";

export type SeoImage = {
  url: string;
  alt?: string | null;
  caption?: string | null;
  credit?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ArticleSeoInput = {
  title: string;
  slug: string;
  canonicalUrl?: string | null;
  description?: string | null;
  publishedAt: Date | string;
  updatedAt?: Date | string | null;
  category?: string | null;
  author?: { name: string; url?: string | null } | null;
  image?: SeoImage | null;
  tags?: string[];
};

export type SeoSiteOptions = {
  siteUrl: string;
  siteName?: string;
  publisherLogoUrl?: string | null;
};

function iso(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

export function absoluteUrl(value: string, siteUrl: string): string {
  return new URL(value, siteUrl).toString();
}

export function createArticleMetadata(
  article: ArticleSeoInput,
  options: SeoSiteOptions,
): Metadata {
  const siteName = options.siteName ?? DEFAULT_SITE_NAME;
  const canonical = absoluteUrl(
    article.canonicalUrl || `/noticias/${article.slug}`,
    options.siteUrl,
  );
  const description = article.description?.trim() || DEFAULT_DESCRIPTION;
  const image = article.image
    ? {
        url: absoluteUrl(article.image.url, options.siteUrl),
        alt: article.image.alt?.trim() || article.title,
        ...(article.image.width ? { width: article.image.width } : {}),
        ...(article.image.height ? { height: article.image.height } : {}),
      }
    : null;

  return {
    title: article.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName,
      url: canonical,
      title: article.title,
      description,
      publishedTime: iso(article.publishedAt),
      ...(article.updatedAt ? { modifiedTime: iso(article.updatedAt) } : {}),
      ...(article.category ? { section: article.category } : {}),
      ...(article.author ? { authors: [article.author.name] } : {}),
      ...(article.tags?.length ? { tags: article.tags } : {}),
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: article.title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function createNewsArticleJsonLd(
  article: ArticleSeoInput,
  options: SeoSiteOptions,
): Record<string, unknown> {
  const siteName = options.siteName ?? DEFAULT_SITE_NAME;
  const canonical = absoluteUrl(
    article.canonicalUrl || `/noticias/${article.slug}`,
    options.siteUrl,
  );
  const publisherId = absoluteUrl("/#publisher", options.siteUrl);
  const publisher: Record<string, unknown> = {
    "@type": "Organization",
    "@id": publisherId,
    name: siteName,
    url: absoluteUrl("/", options.siteUrl),
  };

  if (options.publisherLogoUrl) {
    publisher.logo = {
      "@type": "ImageObject",
      url: absoluteUrl(options.publisherLogoUrl, options.siteUrl),
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${canonical}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    headline: article.title,
    ...(article.description?.trim()
      ? { description: article.description.trim() }
      : {}),
    datePublished: iso(article.publishedAt),
    dateModified: iso(article.updatedAt ?? article.publishedAt),
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    publisher,
    ...(article.author
      ? {
          author: {
            "@type": "Person",
            name: article.author.name,
            ...(article.author.url
              ? { url: absoluteUrl(article.author.url, options.siteUrl) }
              : {}),
          },
        }
      : {}),
    ...(article.category ? { articleSection: article.category } : {}),
    ...(article.tags?.length ? { keywords: article.tags.join(", ") } : {}),
    ...(article.image
      ? {
          image: {
            "@type": "ImageObject",
            url: absoluteUrl(article.image.url, options.siteUrl),
            ...(article.image.caption
              ? { caption: article.image.caption }
              : {}),
            ...(article.image.credit
              ? { creditText: article.image.credit }
              : {}),
          },
        }
      : {}),
  };
}

export function createWebSiteJsonLd(
  options: SeoSiteOptions,
): Record<string, unknown> {
  const siteName = options.siteName ?? DEFAULT_SITE_NAME;
  const home = absoluteUrl("/", options.siteUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${home}#website`,
        url: home,
        name: siteName,
        inLanguage: "pt-BR",
        publisher: { "@id": `${home}#publisher` },
      },
      {
        "@type": "Organization",
        "@id": `${home}#publisher`,
        name: siteName,
        url: home,
        ...(options.publisherLogoUrl
          ? {
              logo: {
                "@type": "ImageObject",
                url: absoluteUrl(options.publisherLogoUrl, options.siteUrl),
              },
            }
          : {}),
      },
    ],
  };
}

export function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export interface FeedItemInput {
  title: string;
  slug: string;
  summary: string;
  publishedAt: Date | string;
  categoryName?: string | null;
  authorName?: string | null;
  imageUrl?: string | null;
}

export function createRssFeed(items: FeedItemInput[], options: SeoSiteOptions): string {
  const siteName = options.siteName ?? DEFAULT_SITE_NAME;
  const siteUrl = options.siteUrl;

  const rssItemsXml = items
    .map((item) => {
      const link = absoluteUrl(`/noticias/${item.slug}`, siteUrl);
      const pubDate = new Date(item.publishedAt).toUTCString();
      const imageXml = item.imageUrl
        ? `<enclosure url="${absoluteUrl(item.imageUrl, siteUrl)}" type="image/jpeg" />`
        : "";
      const categoryXml = item.categoryName
        ? `<category><![CDATA[${item.categoryName}]]></category>`
        : "";
      const authorXml = item.authorName
        ? `<author><![CDATA[${item.authorName}]]></author>`
        : "";

      return `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${item.summary}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${categoryXml}
      ${authorXml}
      ${imageXml}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteName}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${DEFAULT_DESCRIPTION}]]></description>
    <language>pt-BR</language>
    <atom:link href="${absoluteUrl("/feed.xml", siteUrl)}" rel="self" type="application/rss+xml"/>
${rssItemsXml}
  </channel>
</rss>`;
}

export function createJsonFeed(items: FeedItemInput[], options: SeoSiteOptions): string {
  const siteName = options.siteName ?? DEFAULT_SITE_NAME;
  const siteUrl = options.siteUrl;

  const jsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: siteName,
    home_page_url: siteUrl,
    feed_url: absoluteUrl("/feed.json", siteUrl),
    description: DEFAULT_DESCRIPTION,
    user_comment: "Feed oficial de notícias da Rádio Triunfo FM 87,9",
    items: items.map((item) => ({
      id: absoluteUrl(`/noticias/${item.slug}`, siteUrl),
      url: absoluteUrl(`/noticias/${item.slug}`, siteUrl),
      title: item.title,
      summary: item.summary,
      date_published: new Date(item.publishedAt).toISOString(),
      ...(item.categoryName ? { tags: [item.categoryName] } : {}),
      ...(item.authorName ? { authors: [{ name: item.authorName }] } : {}),
      ...(item.imageUrl ? { image: absoluteUrl(item.imageUrl, siteUrl) } : {}),
    })),
  };

  return JSON.stringify(jsonFeed, null, 2);
}
