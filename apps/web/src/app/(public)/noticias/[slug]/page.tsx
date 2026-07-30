/* Native images are intentional until the deployment media hostname is configured. */
/* eslint-disable @next/next/no-img-element */
import { SiteFrame } from "@/components/site/site-frame";
import { getPublishedArticleBySlug } from "@/modules/editorial/queries";
import type {
  JsonValue,
  PublishedArticleDetail,
} from "@/modules/editorial/types";
import {
  createArticleMetadata,
  createNewsArticleJsonLd,
  serializeJsonLd,
} from "@triunfo/seo";
import { Badge, Container } from "@triunfo/ui";
import { AlertTriangle, ArrowLeft, ExternalLink, Info, Quote } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

type LoadResult =
  | { status: "found"; article: PublishedArticleDetail }
  | { status: "not-found" }
  | { status: "unavailable" };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "America/Recife",
});

const loadArticle = cache(async (slug: string): Promise<LoadResult> => {
  try {
    const article = await getPublishedArticleBySlug(slug);
    return article ? { status: "found", article } : { status: "not-found" };
  } catch {
    console.error("Não foi possível consultar a matéria publicada.");
    return { status: "unavailable" };
  }
});

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadArticle(slug);

  if (result.status !== "found") {
    return {
      title:
        result.status === "unavailable"
          ? "Conteúdo temporariamente indisponível"
          : "Notícia não encontrada",
      robots: { index: false, follow: false },
    };
  }

  const article = result.article;
  const socialImage = article.seo.ogImageUrl ?? article.heroImage?.url;
  const metadata = createArticleMetadata(
    {
      title: article.seo.title,
      slug: article.slug,
      canonicalUrl: article.seo.canonicalUrlOverride,
      description: article.seo.description,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      category: article.category.name,
      author: article.author ? { name: article.author.displayName } : null,
      image: socialImage
        ? {
            url: socialImage,
            alt: article.heroImage?.altText ?? article.title,
          }
        : null,
      tags: article.tags.map((tag) => tag.name),
    },
    { siteUrl },
  );

  return article.contentKind === "DEMONSTRATION"
    ? { ...metadata, robots: { index: false, follow: false } }
    : metadata;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const result = await loadArticle(slug);

  if (result.status === "not-found") notFound();

  if (result.status === "unavailable") {
    return (
      <SiteFrame>
        <Container className="grid min-h-[32rem] place-items-center py-20 text-center">
          <div className="max-w-xl">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--brand-purple-100)] text-[var(--brand-purple-800)]">
              <Info aria-hidden="true" size={26} />
            </span>
            <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-[var(--brand-purple-950)] sm:text-4xl">
              Conteúdo temporariamente indisponível
            </h1>
            <p className="mt-4 leading-7 text-[var(--text-secondary)]">
              Não foi possível consultar a publicação agora. Tente novamente em
              alguns instantes.
            </p>
            <Link
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl font-bold text-[var(--brand-purple-800)]"
              href="/"
            >
              <ArrowLeft aria-hidden="true" size={18} />
              Voltar para a página inicial
            </Link>
          </div>
        </Container>
      </SiteFrame>
    );
  }

  const article = result.article;
  const geo = article.geo;
  const keyFacts = extractKeyFacts(geo?.keyFacts ?? null);
  const showUpdated =
    article.updatedAt.getTime() > article.publishedAt.getTime() + 60_000;
  const jsonLd = createNewsArticleJsonLd(
    {
      title: article.title,
      slug: article.slug,
      canonicalUrl: article.seo.canonicalUrlOverride,
      description: article.seo.description,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      category: article.category.name,
      author: article.author ? { name: article.author.displayName } : null,
      image: article.heroImage
        ? {
            url: article.heroImage.url,
            alt: article.heroImage.altText,
            caption: article.heroImage.caption,
            credit: article.heroImage.credit,
          }
        : null,
      tags: article.tags.map((tag) => tag.name),
    },
    {
      siteUrl,
      publisherLogoUrl: "/brand/triunfo-fm-logo.png",
    },
  );

  return (
    <SiteFrame>
      {article.contentKind === "NEWS" ? (
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
          type="application/ld+json"
        />
      ) : null}

      <article>
        <header className="bg-[var(--surface-subtle)]">
          <Container className="max-w-[68rem] py-10 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm font-semibold text-[var(--text-secondary)]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link className="rounded-sm hover:text-[var(--brand-purple-800)]" href="/">
                    Início
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>{article.category.name}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">{article.category.name}</Badge>
              {article.isUrgent ? <Badge tone="gold">Urgente</Badge> : null}
              {article.isSponsored ? (
                <Badge tone="gold">Conteúdo patrocinado</Badge>
              ) : null}
              {article.contentKind === "DEMONSTRATION" ? (
                <Badge tone="neutral">Conteúdo de demonstração</Badge>
              ) : null}
            </div>

            <h1 className="mt-6 max-w-[18ch] text-[clamp(2.25rem,7vw,4.75rem)] font-black leading-[1.02] tracking-[-0.06em] text-balance text-[var(--brand-purple-950)]">
              {article.title}
            </h1>
            {article.subtitle ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
                {article.subtitle}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-6 text-sm leading-6 text-[var(--text-secondary)] sm:flex-row sm:flex-wrap sm:gap-x-5">
              {article.author ? (
                <span>
                  Por <strong className="text-[var(--text-primary)]">{article.author.displayName}</strong>
                </span>
              ) : null}
              <span>
                Publicado em{" "}
                <time dateTime={article.publishedAt.toISOString()}>
                  {dateFormatter.format(article.publishedAt)}
                </time>
              </span>
              {showUpdated ? (
                <span>
                  Atualizado em{" "}
                  <time dateTime={article.updatedAt.toISOString()}>
                    {dateFormatter.format(article.updatedAt)}
                  </time>
                </span>
              ) : null}
            </div>
          </Container>
        </header>

        <Container className="max-w-[68rem] py-10 sm:py-14">
          {article.isSensitive ? (
            <aside className="mb-8 flex gap-3 rounded-2xl border border-[var(--feedback-warning)]/40 bg-[var(--brand-gold-100)] p-4 text-sm leading-6 text-[var(--brand-gold-900)]">
              <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
              <div>
                <strong>Aviso de conteúdo sensível.</strong> Esta matéria pode
                conter descrições ou imagens que exigem atenção do leitor.
              </div>
            </aside>
          ) : null}

          {article.heroImage ? (
            <figure className="overflow-hidden rounded-3xl bg-[var(--surface-subtle)]">
              <img
                alt={article.heroImage.altText}
                className="aspect-[16/9] w-full object-cover"
                decoding="async"
                fetchPriority="high"
                height={675}
                src={article.heroImage.url}
                width={1200}
              />
              {article.heroImage.caption || article.heroImage.credit ? (
                <figcaption className="flex flex-col gap-1 border-t border-[var(--border-subtle)] px-5 py-4 text-xs leading-5 text-[var(--text-secondary)] sm:flex-row sm:justify-between">
                  {article.heroImage.caption ? <span>{article.heroImage.caption}</span> : null}
                  {article.heroImage.credit ? <span>Crédito: {article.heroImage.credit}</span> : null}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="mx-auto mt-10 max-w-[46rem]">
            {geo?.shortAnswer || geo?.executiveSummary || keyFacts.length ? (
              <aside
                aria-labelledby="resumo-pontos-title"
                className="mb-10 rounded-3xl border border-[var(--brand-purple-100)] bg-[var(--brand-purple-50)] p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 text-[var(--brand-purple-800)]">
                  <Quote aria-hidden="true" size={22} />
                  <h2 className="text-xl font-extrabold" id="resumo-pontos-title">
                    Resumo em pontos
                  </h2>
                </div>
                {geo?.shortAnswer ?? geo?.executiveSummary ? (
                  <p className="mt-4 leading-7 text-[var(--text-primary)]">
                    {geo?.shortAnswer ?? geo?.executiveSummary}
                  </p>
                ) : null}
                {keyFacts.length ? (
                  <ul className="mt-5 grid gap-3 pl-5 text-sm leading-6 marker:text-[var(--brand-gold-900)] sm:text-base">
                    {keyFacts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                ) : null}
              </aside>
            ) : null}

            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
            />

            {article.sources.length ? (
              <section className="mt-12 border-t border-[var(--border-subtle)] pt-8" aria-labelledby="fontes-title">
                <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-[var(--brand-purple-950)]" id="fontes-title">
                  Fontes da informação
                </h2>
                <ul className="mt-5 grid gap-3">
                  {article.sources.map((source, index) => {
                    const label =
                      source.title ??
                      source.name ??
                      source.publisher ??
                      `Fonte ${index + 1}`;
                    return (
                      <li className="rounded-2xl bg-[var(--surface-subtle)] p-4 text-sm leading-6" key={`${label}-${index}`}>
                        <div className="flex flex-wrap items-center gap-2">
                          {source.url ? (
                            <a
                              className="inline-flex items-center gap-1.5 font-bold text-[var(--brand-purple-800)] underline decoration-[var(--brand-purple-100)] decoration-2 underline-offset-4 hover:decoration-[var(--brand-purple-600)]"
                              href={source.url}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {label}
                              <ExternalLink aria-hidden="true" size={15} />
                              <span className="sr-only">(abre em nova aba)</span>
                            </a>
                          ) : (
                            <span className="font-bold">{label}</span>
                          )}
                          {source.isOfficial ? <Badge tone="success">Oficial</Badge> : null}
                        </div>
                        {source.publisher && source.publisher !== label ? (
                          <p className="mt-1 text-[var(--text-secondary)]">{source.publisher}</p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}
          </div>
        </Container>
      </article>
    </SiteFrame>
  );
}

function extractKeyFacts(value: JsonValue | null): string[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) return [item.trim()];
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];

    for (const key of ["text", "fact", "value"]) {
      const candidate = item[key];
      if (typeof candidate === "string" && candidate.trim()) {
        return [candidate.trim()];
      }
    }
    return [];
  });
}
