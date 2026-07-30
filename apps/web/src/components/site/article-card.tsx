/* Native images are intentional until the deployment media hostname is configured. */
/* eslint-disable @next/next/no-img-element */
import type { PublishedArticleSummary } from "@/modules/editorial/types";
import { Badge, cn } from "@triunfo/ui";
import { ArrowUpRight, Clock3 } from "lucide-react";
import Link from "next/link";

type ArticleCardProps = {
  article: PublishedArticleSummary;
  featured?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
  timeZone: "America/Recife",
});

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const publishedIso = article.publishedAt.toISOString();

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(43,7,87,0.12)] motion-reduce:transition-none",
        featured ? "grid min-h-full md:grid-cols-[1.18fr_1fr]" : "flex h-full flex-col",
      )}
    >
      <ArticleMedia article={article} featured={featured} />
      <div className={cn("flex flex-1 flex-col", featured ? "p-6 sm:p-8" : "p-5")}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{article.category.name}</Badge>
          {article.isUrgent ? <Badge tone="gold">Urgente</Badge> : null}
        </div>
        <h3
          className={cn(
            "mt-4 font-extrabold leading-[1.14] tracking-[-0.035em] text-[var(--brand-purple-950)]",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          <Link
            className="rounded-sm no-underline after:absolute after:inset-0"
            href={`/noticias/${article.slug}`}
          >
            {article.title}
          </Link>
        </h3>
        <p
          className={cn(
            "mt-3 text-[var(--text-secondary)]",
            featured ? "line-clamp-4 text-base leading-7" : "line-clamp-3 text-sm leading-6",
          )}
        >
          {article.summary}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs font-semibold text-[var(--text-secondary)]">
          <time className="inline-flex items-center gap-1.5" dateTime={publishedIso}>
            <Clock3 aria-hidden="true" size={15} />
            {dateFormatter.format(article.publishedAt)}
          </time>
          <ArrowUpRight
            aria-hidden="true"
            className="text-[var(--brand-purple-800)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            size={18}
          />
        </div>
      </div>
    </article>
  );
}

function ArticleMedia({
  article,
  featured,
}: {
  article: PublishedArticleSummary;
  featured: boolean;
}) {
  const image = article.heroImage;
  const mediaClasses = cn(
    "relative overflow-hidden bg-[linear-gradient(145deg,var(--brand-purple-950),var(--brand-purple-600))]",
    featured ? "min-h-64 md:min-h-full" : "aspect-[16/10]",
  );

  if (!image) {
    return (
      <div aria-hidden="true" className={mediaClasses}>
        <div className="absolute -right-12 -top-12 size-48 rounded-full border-[32px] border-white/10" />
        <div className="absolute -bottom-14 left-10 size-44 rotate-12 rounded-[2.5rem] bg-[var(--brand-gold-500)]/90" />
        <span className="absolute bottom-5 right-6 text-6xl font-black tracking-[-0.08em] text-white/20">
          87,9
        </span>
      </div>
    );
  }

  return (
    <div className={mediaClasses}>
      {/* A origem é administrável; dimensões fixas evitam deslocamento de layout. */}
      <img
        alt={image.altText}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
        decoding="async"
        height={675}
        loading={featured ? "eager" : "lazy"}
        src={image.url}
        width={1200}
      />
    </div>
  );
}
