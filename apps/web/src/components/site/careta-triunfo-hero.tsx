"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Play, Volume2, Award, Flame, ArrowRight } from "lucide-react";
import { Container } from "@triunfo/ui";

export type CaretaTriunfoHeroProps = {
  className?: string;
  title?: string;
  subtitle?: string;
};

export default function CaretaTriunfoHero({
  className = "",
  title = "Caretas de Triunfo: A Alma e as Cores do Nosso Carnaval",
  subtitle = "Com seus chapéus ornamentados de fitas, máscaras marcantes e o estalo inconfundível do relho, os Caretas são a máxima expressão da cultura triunfense. A Triunfo FM 87,9 celebra e preserva essa tradição secular que orgulha o Sertão do Pajeú.",
}: CaretaTriunfoHeroProps) {
  return (
    <section
      className={`relative isolate overflow-hidden bg-gradient-to-br from-[#12002b] via-[#220054] to-[#38007e] text-white border-y border-white/10 ${className}`}
      aria-labelledby="careta-triunfo-title"
    >
      {/* Dynamic Background Light Orbs */}
      <div className="absolute -top-24 -left-20 size-[500px] rounded-full bg-[#ffb000]/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 size-[600px] -translate-y-1/2 rounded-full bg-[#8b5cf6]/20 blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 size-[400px] rounded-full bg-[#e02475]/15 blur-[130px] pointer-events-none" />

      {/* Background Stylized Vector Overlay (Ribbon Rays & Architectural Arches) */}
      <svg
        className="absolute inset-0 size-full pointer-events-none opacity-25 mix-blend-screen"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gold-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB000" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFD84F" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="purple-pink-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E02475" stopOpacity="0.6" />
          </linearGradient>
          <pattern id="hatch-pattern" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="3" />
          </pattern>
        </defs>

        <rect width="1600" height="900" fill="url(#hatch-pattern)" />

        {/* Ambient Decorative Waves & Whip Line Art */}
        <g fill="none" strokeLinecap="round">
          <path d="M -100,250 C 350,100 500,400 950,80" stroke="url(#gold-glow-grad)" strokeWidth="3" />
          <path d="M -50,310 C 300,160 550,440 1020,130" stroke="url(#purple-pink-grad)" strokeWidth="2" strokeDasharray="8 6" />
          <path d="M 700,820 C 1050,650 1250,850 1680,620" stroke="url(#gold-glow-grad)" strokeWidth="3.5" />
          <path d="M 620,870 C 1000,700 1300,900 1720,670" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="2" />
        </g>

        {/* Cine Teatro Guarany Architectural Silhouette Arches */}
        <g stroke="#FFB000" strokeOpacity="0.3" strokeWidth="2" fill="none">
          <path d="M 1200,150 Q 1280,70 1360,150 L 1360,400 L 1200,400 Z" />
          <path d="M 1390,180 Q 1450,110 1510,180 L 1510,400 L 1390,400 Z" stroke="#FFFFFF" strokeOpacity="0.25" />
          <path d="M 1010,200 Q 1070,130 1130,200 L 1130,400 L 1010,400 Z" stroke="#A855F7" strokeOpacity="0.3" />
        </g>
      </svg>

      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Cultural Narrative & Hero Copy */}
          <div className="space-y-6 z-10">
            {/* Cultural Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd84f]/40 bg-[#ffb000]/15 px-4 py-2 backdrop-blur-md">
              <Sparkles className="size-4 text-[#ffd84f] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd84f]">
                Patrimônio Vivo de Pernambuco
              </span>
            </div>

            {/* Title */}
            <h2
              id="careta-triunfo-title"
              className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl text-white"
            >
              {title}
            </h2>

            {/* Subtitle / Narrative */}
            <p className="text-base text-white/85 leading-relaxed font-normal sm:text-lg max-w-2xl">
              {subtitle}
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:bg-white/10">
                <div className="flex items-center gap-2 text-[#ffd84f] font-bold text-sm mb-1">
                  <Flame className="size-4 text-[#ffb000]" />
                  <span>O Relho & O Estalo</span>
                </div>
                <p className="text-xs text-white/70 leading-normal">
                  Chicote de couro trançado que ecoa pelas ladeiras históricas.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:bg-white/10">
                <div className="flex items-center gap-2 text-[#ffd84f] font-bold text-sm mb-1">
                  <Award className="size-4 text-[#ffb000]" />
                  <span>Chapéu de Fitas</span>
                </div>
                <p className="text-xs text-white/70 leading-normal">
                  Explosão de cores, fitas de cetim e espelhos refletores.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:bg-white/10">
                <div className="flex items-center gap-2 text-[#ffd84f] font-bold text-sm mb-1">
                  <Volume2 className="size-4 text-[#ffb000]" />
                  <span>Voz do Pajeú</span>
                </div>
                <p className="text-xs text-white/70 leading-normal">
                  Identidade e cultura transmitidas pela Triunfo FM 87,9.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#ao-vivo"
                className="group inline-flex items-center gap-3 rounded-full bg-[#ffb000] px-7 py-3.5 text-sm font-extrabold text-[#19003f] shadow-lg shadow-[#ffb000]/25 transition hover:bg-[#ffd84f] hover:scale-105"
              >
                <Play className="size-4 fill-current transition-transform group-hover:scale-110" />
                Ouça a Triunfo FM Ao Vivo
              </a>
              <a
                href="#programacao"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/50"
              >
                <span>Ver Programação</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Special Visual Showcase with Careta Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Outer Decorative Neon Glow Frame */}
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-[#ffb000] via-[#a855f7] to-[#e02475] opacity-60 blur-xl transition-all duration-700 group-hover:opacity-80" />

              {/* Main Card Container */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-white/20 bg-slate-950/90 shadow-[0_25px_70px_rgba(0,0,0,0.7)] group">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                {/* Image Wrapper */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/careta-triunfo-fm.png"
                    alt="Careta de Triunfo - Figura Carnavalesca Tradicional"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-105"
                    priority
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12002b] via-transparent to-black/30" />

                  {/* Top Floating Mini Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-[#ffd84f] backdrop-blur-md border border-white/15">
                      <Sparkles className="size-3.5 text-[#ffb000]" />
                      TRADIÇÃO TRIUNFENSE
                    </span>
                    <span className="rounded-full bg-purple-950/70 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md border border-white/15">
                      TRIUNFO - PE
                    </span>
                  </div>

                  {/* Bottom Image Caption Badge */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-[#170038]/85 p-4 backdrop-blur-md shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-black text-white">
                          Careta de Triunfo
                        </h3>
                        <p className="text-xs text-white/75 font-medium">
                          Figura Carnavalesca & Símbolo do Sertão
                        </p>
                      </div>
                      <span className="rounded-xl bg-[#ffb000] px-3 py-1.5 text-xs font-black text-[#19003f] shadow-md">
                        87,9 FM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Accent Elements */}
              <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-2 rounded-2xl border border-white/20 bg-[#220054]/90 px-4 py-2.5 shadow-xl backdrop-blur-md text-xs font-bold text-[#ffd84f]">
                <Flame className="size-4 text-[#ffb000]" />
                <span>O Chicote que ecoa no Pajeú</span>
              </div>

              <div className="absolute -top-5 -right-5 hidden sm:flex items-center gap-2 rounded-2xl border border-white/20 bg-[#220054]/90 px-4 py-2.5 shadow-xl backdrop-blur-md text-xs font-bold text-white">
                <Sparkles className="size-4 text-[#a855f7]" />
                <span>Carnaval dos Caretas</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
