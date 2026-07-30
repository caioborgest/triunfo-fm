"use client";

import { useState } from "react";
import { Play, Radio, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@triunfo/ui";

const FEATURED_ARTICLES = [
  {
    badge: "URGENTE",
    badgeColor: "bg-amber-500 text-black",
    time: "AGORA HÁ POUCO",
    title: "Chuvas intensas causam alagamentos em Triunfo",
    summary: "Defesa Civil monitora áreas de risco e encosta do açude. População deve seguir recomendações oficiais.",
    slug: "chuvas-intensas-causam-alagamentos-em-triunfo",
    category: "CIDADE",
    readTime: "2 min",
  },
  {
    badge: "DESTAQUE",
    badgeColor: "bg-[var(--brand-gold-500)] text-black",
    time: "HÁ 2 HORAS",
    title: "Prefeitura anuncia atrações do Festival de Inverno 2026",
    summary: "Edição deste ano contará com grandes nomes da MPB, forró tradicional e polo de artesanato regional.",
    slug: "prefeitura-anuncia-atracoes-do-festival-de-inverno-2026",
    category: "EVENTOS",
    readTime: "3 min",
  },
  {
    badge: "DESTAQUE",
    badgeColor: "bg-[var(--brand-purple-600)] text-white",
    time: "HÁ 4 HORAS",
    title: "Teleférico atinge recorde de passageiros no final de semana",
    summary: "Principal equipamento turístico da cidade recebeu mais de 5 mil visitantes durante o feriado.",
    slug: "teleferico-atinge-recorde-de-passageiros",
    category: "TURISMO",
    readTime: "2 min",
  },
] as const;

export function SiteHero() {
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);

  const featuredArticle = FEATURED_ARTICLES[activeArticleIndex] ?? FEATURED_ARTICLES[0];

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {/* Imagem de Fundo Dedicada: careta-triunfo-pe.jpg */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/careta-triunfo-pe.jpg"
          alt="Caretas de Triunfo — Tradição e Cultura Pernambucana"
          className="h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/75" />
      </div>

      {/* Decorative Subtle Ambient Orbs */}
      <div className="absolute -top-32 -left-32 size-96 rounded-full bg-[var(--brand-purple-600)]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-[var(--brand-gold-500)]/15 blur-3xl pointer-events-none" />

      <Container className="relative grid min-h-[36rem] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        {/* Left Side: Radio Brand Hero */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-black/40 px-4 py-2 backdrop-blur-md border border-white/10 shadow-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-gold-500)] opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[var(--brand-gold-500)]" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-gold-300)]">
              ESTAÇÃO AO VIVO · TRIUNFO, PE
            </span>
          </div>

          <div className="mt-5 space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-md">
              TRIUNFO FM
            </h1>
            <div className="gold-glow-text text-8xl font-black leading-none tracking-tight text-[var(--brand-gold-500)] sm:text-9xl">
              87,9
            </div>
          </div>

          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg max-w-lg font-medium">
            Informação independente, turismo, cultura sertaneja e rádio ao vivo para todo o Brasil.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#player-ao-vivo"
              className="gold-glow-box inline-flex items-center gap-3.5 rounded-full bg-[var(--brand-gold-500)] px-8 py-4 text-base font-black text-black shadow-xl transition-all hover:bg-[var(--brand-gold-300)] hover:scale-105 active:scale-95"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-black text-[var(--brand-gold-500)]">
                <Play className="size-4 fill-current ml-0.5" />
              </span>
              OUVIR AGORA
            </a>

            <a
              href="#programacao"
              className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-6 py-4 text-sm font-extrabold text-white backdrop-blur-md border border-white/15 transition-all hover:bg-white/20 hover:border-white/30"
            >
              <Radio className="size-4 text-[var(--brand-gold-300)]" />
              GRADE DE PROGRAMAS
            </a>
          </div>
        </div>

        {/* Right Side: 3 Featured Articles Selector Card */}
        <div className="w-full">
          <div className="glass-dark relative overflow-hidden rounded-3xl p-8 shadow-2xl transition-all border border-white/15 hover:border-[var(--brand-gold-500)]/40">
            
            {/* 3 Featured Articles Selector Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[var(--brand-gold-300)] tracking-wider">
                <FileText className="size-4" />
                MATÉRIAS EM DESTAQUE NA CAPA (1 de 3)
              </div>

              {/* Tabs for the 3 featured articles */}
              <div className="flex items-center gap-1.5">
                {FEATURED_ARTICLES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveArticleIndex(idx)}
                    className={`flex size-7 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      idx === activeArticleIndex
                        ? "bg-[var(--brand-gold-500)] text-black"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                    title={`Ver matéria em destaque ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Featured Article Data */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`rounded-md px-3 py-1 text-xs font-black uppercase tracking-wider shadow-sm ${featuredArticle.badgeColor}`}>
                  {featuredArticle.badge}
                </span>
                <span className="text-xs font-bold text-white/70">
                  {featuredArticle.time}
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-gold-300)]">
                {featuredArticle.category}
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-black leading-snug tracking-tight text-white sm:text-3xl">
              {featuredArticle.title}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base font-normal">
              {featuredArticle.summary}
            </p>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href={`/noticias/${featuredArticle.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-black tracking-wider text-[var(--brand-gold-300)] hover:text-white transition-colors"
              >
                LEIA A MATÉRIA COMPLETA
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-xs text-white/50">Tempo de leitura: {featuredArticle.readTime}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
