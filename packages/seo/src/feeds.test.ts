import { describe, expect, it } from "vitest";
import { createRssFeed, createJsonFeed, type FeedItemInput } from "./index";

describe("Feeds SEO & RSS", () => {
  const sampleItems: FeedItemInput[] = [
    {
      title: "Matéria de teste em Triunfo",
      slug: "materia-de-teste-em-triunfo",
      summary: "Resumo da matéria de teste para verificação do feed RSS e JSON.",
      publishedAt: new Date("2026-07-30T12:00:00.000Z"),
      categoryName: "Cidade",
      authorName: "Redator Oficial",
      imageUrl: "/images/hero-test.jpg",
    },
  ];

  const options = { siteUrl: "http://localhost:3000" };

  it("deve gerar XML RSS 2.0 válido contendo o item", () => {
    const xml = createRssFeed(sampleItems, options);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("Matéria de teste em Triunfo");
    expect(xml).toContain("http://localhost:3000/noticias/materia-de-teste-em-triunfo");
    expect(xml).toContain("<category><![CDATA[Cidade]]></category>");
  });

  it("deve gerar JSON Feed 1.1 válido com estrutura correta", () => {
    const jsonStr = createJsonFeed(sampleItems, options);
    const feed = JSON.parse(jsonStr);
    expect(feed.version).toBe("https://jsonfeed.org/version/1.1");
    expect(feed.items).toHaveLength(1);
    expect(feed.items[0].title).toBe("Matéria de teste em Triunfo");
    expect(feed.items[0].url).toBe("http://localhost:3000/noticias/materia-de-teste-em-triunfo");
  });
});
