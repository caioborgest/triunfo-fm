import { SiteFrame } from "@/components/site/site-frame";
import { ArticleCard } from "@/components/site/article-card";
import { getPublishedArticles } from "@/modules/editorial/queries";
import { Container } from "@triunfo/ui";
import { Search, Newspaper } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notícias | Triunfo FM 87,9",
  description: "Acompanhe as últimas notícias, reportagens e destaques de Triunfo, Sertão de Pernambuco e região.",
  alternates: { canonical: "/noticias" },
};

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}) {
  const { q, categoria } = await searchParams;

  const articles = await getPublishedArticles({
    limit: 30,
    ...(categoria ? { categorySlug: categoria } : {}),
  }).catch(() => []);

  const filteredArticles = q
    ? articles.filter(
        (art) =>
          art.title.toLowerCase().includes(q.toLowerCase()) ||
          art.summary.toLowerCase().includes(q.toLowerCase()),
      )
    : articles;

  return (
    <SiteFrame>
      <section className="bg-gradient-to-b from-[var(--brand-purple-950)] to-[var(--brand-purple-900)] py-16 text-white">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--brand-gold-500)] backdrop-blur-md">
              <Newspaper size={16} />
              Central de Notícias
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              Jornalismo independente e verificado
            </h1>
            <p className="text-base text-gray-300 sm:text-lg">
              Cobertura completa dos fatos de Triunfo, Pernambuco, cultura, turismo e prestação de serviços.
            </p>

            {/* Barra de Pesquisa */}
            <form action="/noticias" method="GET" className="mt-8 flex gap-2">
              <div className="relative flex-1">
                <Search
                  aria-hidden
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="search"
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder="Pesquisar notícias por palavra-chave..."
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-12 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold-500)]"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[var(--brand-gold-500)] px-6 py-3 text-sm font-bold text-[var(--brand-purple-950)] transition-transform hover:scale-105"
              >
                Buscar
              </button>
            </form>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-gray-50/50">
        <Container>
          {filteredArticles.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-xs">
              <Newspaper className="mx-auto size-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-bold text-[var(--brand-purple-950)]">
                Nenhuma notícia encontrada
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {q
                  ? `Nenhum resultado encontrado para "${q}". Tente buscar por outros termos.`
                  : "Nenhuma matéria publicada disponível no momento."}
              </p>
            </div>
          )}
        </Container>
      </section>
    </SiteFrame>
  );
}
