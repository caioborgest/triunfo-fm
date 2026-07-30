"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Share2,
  ArrowRight,
  Radio,
  Clock,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@triunfo/ui";

import type { PublishedArticleSummary } from "@/modules/editorial/types";

export interface NewsAndLivePlayerSectionProps {
  articles?: PublishedArticleSummary[];
}

export function NewsAndLivePlayerSection({ articles }: NewsAndLivePlayerSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const mainArticle = articles && articles.length > 0 ? articles[0] : null;

  return (
    <section className="py-14" id="player-ao-vivo">
      <Container className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left Column: Últimas Notícias Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <h2 className="text-xl font-black uppercase tracking-tight text-[var(--brand-purple-950)] sm:text-2xl flex items-center gap-2.5">
              <span className="size-3 rounded-full bg-[var(--brand-gold-500)]" />
              ÚLTIMAS NOTÍCIAS
            </h2>
            <Link
              href="/#ultimas-noticias"
              className="text-xs font-black tracking-wider text-[var(--brand-purple-800)] hover:text-[var(--brand-purple-600)] flex items-center gap-1"
            >
              VER TODAS
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            {/* Main Featured Article */}
            {mainArticle ? (
              <Link href={`/noticias/${mainArticle.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={mainArticle.heroImage?.url || "https://images.unsplash.com/photo-1548625361-18a666497298?auto=format&fit=crop&w=800&q=80"}
                    alt={mainArticle.heroImage?.altText || mainArticle.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute top-4 left-4 rounded-md bg-[var(--brand-purple-800)] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                    {mainArticle.category.name}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-black leading-snug tracking-tight text-[var(--brand-purple-950)] group-hover:text-[var(--brand-purple-600)] transition-colors">
                    {mainArticle.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {mainArticle.summary}
                  </p>
                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {new Date(mainArticle.publishedAt).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="text-[var(--brand-purple-800)] group-hover:underline">Ler matéria →</span>
                  </div>
                </div>
              </Link>
            ) : (
              <article className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1548625361-18a666497298?auto=format&fit=crop&w=800&q=80"
                    alt="Igreja Matriz de Triunfo"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute top-4 left-4 rounded-md bg-[var(--brand-purple-800)] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                    CIDADE
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-black leading-snug tracking-tight text-[var(--brand-purple-950)] group-hover:text-[var(--brand-purple-600)] transition-colors">
                    Triunfo investe em infraestrutura e mobilidade urbana
                  </h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    Obras contemplam pavimentação, iluminação em LED e restauração de vias centrais históricas.
                  </p>
                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      Demonstração
                    </span>
                    <span className="text-[var(--brand-purple-800)] group-hover:underline">Ler matéria →</span>
                  </div>
                </div>
              </article>
            )}

            {/* List of 3 Secondary Articles */}
            <div className="flex flex-col justify-between gap-4">
              {/* Item 1 */}
              <article className="group flex items-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-xs transition-all duration-300 hover:border-[var(--brand-purple-600)] hover:shadow-md">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80"
                    alt="Teleférico"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="w-max rounded-md bg-[var(--brand-purple-100)] px-2.5 py-0.5 text-[10px] font-black text-[var(--brand-purple-800)]">
                    TURISMO
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold leading-snug text-[var(--text-primary)] group-hover:text-[var(--brand-purple-600)] transition-colors">
                    Teleférico de Triunfo atrai turistas de todo o Brasil
                  </h4>
                  <span className="mt-1 text-[11px] text-[var(--text-secondary)]">
                    Há 1 hora
                  </span>
                </div>
              </article>

              {/* Item 2 */}
              <article className="group flex items-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-xs transition-all duration-300 hover:border-[var(--brand-purple-600)] hover:shadow-md">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80"
                    alt="Festival"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="w-max rounded-md bg-[var(--brand-purple-100)] px-2.5 py-0.5 text-[10px] font-black text-[var(--brand-purple-800)]">
                    EVENTOS
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold leading-snug text-[var(--text-primary)] group-hover:text-[var(--brand-purple-600)] transition-colors">
                    Festival de Inverno movimenta a cidade neste fim de semana
                  </h4>
                  <span className="mt-1 text-[11px] text-[var(--text-secondary)]">
                    Há 3 horas
                  </span>
                </div>
              </article>

              {/* Item 3 */}
              <article className="group flex items-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-xs transition-all duration-300 hover:border-[var(--brand-purple-600)] hover:shadow-md">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=200&q=80"
                    alt="Esportes"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="w-max rounded-md bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800">
                    ESPORTES
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold leading-snug text-[var(--text-primary)] group-hover:text-[var(--brand-purple-600)] transition-colors">
                    Triunfo Sports vence e garante vaga na próxima fase
                  </h4>
                  <span className="mt-1 text-[11px] text-[var(--text-secondary)]">
                    Há 5 horas
                  </span>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Right Column: OUÇA AGORA (Live Radio Player Widget) */}
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <h2 className="text-xl font-black uppercase tracking-tight text-[var(--brand-purple-950)] sm:text-2xl flex items-center gap-2">
              <Radio className="size-5 text-[var(--brand-purple-600)]" />
              OUÇA AGORA
            </h2>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              TRANSMISSÃO HD
            </span>
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-[#210440] via-[var(--brand-purple-950)] to-[#15022e] p-7 text-white shadow-2xl border border-white/10">
            {/* Header Share Icon */}
            <button className="absolute right-6 top-6 text-white/60 hover:text-white transition" title="Compartilhar">
              <Share2 className="size-5" />
            </button>

            {/* Host Avatar & Show Info */}
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Locutor João Almeida"
                  className="size-22 rounded-full border-3 border-[var(--brand-gold-500)] object-cover shadow-lg"
                />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--brand-gold-500)] px-2.5 py-0.5 text-[9px] font-black uppercase text-black shadow-md">
                  ● NO AR
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black tracking-tight text-white">
                  Manhã Triunfo
                </h3>
                <p className="mt-1 text-xs font-extrabold text-[var(--brand-gold-300)]">
                  06h às 09h · Segunda a Sexta
                </p>
              </div>
            </div>

            {/* Dynamic Equalizer Visualizer */}
            <div className="mt-7 flex h-10 items-end justify-between gap-1 rounded-xl bg-black/30 p-2.5 backdrop-blur-md">
              {[...Array(24)].map((_, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? `bg-[var(--brand-gold-500)] eq-bar-${(i % 5) + 1}`
                      : "h-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            {/* Host and Track Details */}
            <div className="mt-6 space-y-1.5 border-t border-white/10 pt-5 text-xs font-medium text-white/80">
              <p><strong className="text-white font-extrabold">Apresentador:</strong> João Almeida</p>
              <p className="truncate"><strong className="text-white font-extrabold">Tocando agora:</strong> Alceu Valença - Anunciação</p>
            </div>

            {/* Player Controls */}
            <div className="mt-7 flex items-center justify-center gap-6">
              <button className="text-white/60 transition hover:text-white" title="Anterior">
                <SkipBack className="size-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="gold-glow-box flex size-16 items-center justify-center rounded-full bg-[var(--brand-gold-500)] text-black shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
                title={isPlaying ? "Pausar rádio" : "Ouvir rádio ao vivo"}
              >
                {isPlaying ? (
                  <Pause className="size-7 fill-current" />
                ) : (
                  <Play className="size-7 fill-current ml-0.5" />
                )}
              </button>

              <button className="text-white/60 transition hover:text-white" title="Próxima">
                <SkipForward className="size-5" />
              </button>
              
              <button className="text-white/60 transition hover:text-white" title="Volume">
                <Volume2 className="size-5" />
              </button>
            </div>

            {/* WhatsApp Music Request & Schedule CTAs */}
            <div className="mt-7 space-y-2 pt-2">
              <a
                href="https://wa.me/5587999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600/90 py-3 text-xs font-black tracking-wider text-white transition-all hover:bg-emerald-500 shadow-md"
              >
                <MessageCircle className="size-4" />
                PEDIR MÚSICA NO WHATSAPP
              </a>

              <Link
                href="#programacao"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-xs font-extrabold tracking-wider text-white transition-all hover:bg-white/20"
              >
                VER PROGRAMAÇÃO COMPLETA
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
