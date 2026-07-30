import { describe, expect, it } from "vitest";

import {
  createArticleMetadata,
  createNewsArticleJsonLd,
  serializeJsonLd,
} from "./index";

const article = {
  title: "Conteúdo de demonstração",
  slug: "conteudo-de-demonstracao",
  description: "Resumo editorial demonstrativo.",
  publishedAt: "2026-07-29T12:00:00-03:00",
  category: "Notícias",
};

describe("SEO editorial", () => {
  it("gera canonical e Open Graph a partir do mesmo artigo", () => {
    const metadata = createArticleMetadata(article, {
      siteUrl: "https://example.test",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://example.test/noticias/conteudo-de-demonstracao",
    );
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: article.title,
    });
  });

  it("gera NewsArticle sem inventar autor ou imagem", () => {
    const jsonLd = createNewsArticleJsonLd(article, {
      siteUrl: "https://example.test",
    });

    expect(jsonLd).toMatchObject({
      "@type": "NewsArticle",
      headline: article.title,
      articleSection: "Notícias",
    });
    expect(jsonLd).not.toHaveProperty("author");
    expect(jsonLd).not.toHaveProperty("image");
  });

  it("neutraliza tags HTML no JSON serializado", () => {
    expect(serializeJsonLd({ headline: "</script>" })).not.toContain("<");
  });
});
