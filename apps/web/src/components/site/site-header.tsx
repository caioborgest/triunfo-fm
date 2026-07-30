import { Search, Menu, CloudSun, Radio, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Container } from "@triunfo/ui";
import { BrandMark } from "./brand-mark";

const NAV_LINKS = [
  { href: "/noticias", label: "NOTÍCIAS" },
  { href: "/turismo", label: "TURISMO" },
  { href: "/eventos", label: "EVENTOS" },
  { href: "/podcasts", label: "PODCASTS" },
  { href: "/programacao", label: "PROGRAMAÇÃO" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-white/98 backdrop-blur-md shadow-xs">
      {/* Top Utility Bar with Weather & Station Status */}
      <div className="bg-[var(--brand-purple-950)] text-white text-[11px] font-bold py-1.5 border-b border-white/10 hidden sm:block">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[var(--brand-gold-300)]">
              <CloudSun className="size-3.5 text-[var(--brand-gold-500)]" />
              Triunfo, PE · 22°C Ensolarado
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">Sertão do Pajeú · Pernambuco</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-white/80">
              <Radio className="size-3 text-[var(--brand-gold-500)]" />
              Frequência 87,9 FM
            </span>
            <span className="text-white/40">|</span>
            <a
              href="https://wa.me/5587999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[var(--brand-gold-300)] hover:text-white transition"
            >
              <MessageCircle className="size-3" />
              WhatsApp da Rádio: (87) 9 9999-9999
            </a>
          </div>
        </Container>
      </div>

      {/* Main Header Container */}
      <Container className="flex min-h-20 items-center justify-between gap-4">
        {/* Brand Logo */}
        <BrandMark />

        {/* Desktop Main Navigation */}
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-black tracking-wider text-[var(--brand-purple-950)] uppercase hover:text-[var(--brand-purple-600)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Search & High Contrast AO VIVO button with white text */}
        <div className="flex items-center gap-3">
          <button
            className="flex size-10 items-center justify-center rounded-full text-[var(--brand-purple-950)] hover:bg-[var(--brand-purple-50)] transition-colors"
            aria-label="Buscar"
          >
            <Search className="size-5" />
          </button>

          <a
            href="#player-ao-vivo"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[var(--brand-purple-950)] px-5 py-2.5 text-xs font-black text-white tracking-wider transition hover:bg-[var(--brand-purple-800)] shadow-md border border-white/10"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-gold-500)] opacity-80" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[var(--brand-gold-500)]" />
            </span>
            <span className="text-white font-extrabold uppercase">AO VIVO</span>
          </a>

          {/* Mobile menu trigger */}
          <details className="site-mobile-menu relative lg:hidden">
            <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-xl border border-[var(--border-control)] text-[var(--brand-purple-950)] [&::-webkit-details-marker]:hidden">
              <Menu size={22} strokeWidth={2.25} />
              <span className="sr-only">Abrir menu principal</span>
            </summary>
            <nav
              aria-label="Navegação principal no celular"
              className="absolute right-0 top-12 flex w-64 flex-col gap-1 rounded-2xl border border-[var(--border-subtle)] bg-white p-3 shadow-2xl"
            >
              <a
                href="#player-ao-vivo"
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-purple-950)] py-2.5 text-xs font-extrabold text-white uppercase shadow-md mb-1"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-gold-500)] opacity-80" />
                  <span className="relative inline-flex size-2 rounded-full bg-[var(--brand-gold-500)]" />
                </span>
                <span className="text-white font-extrabold">OUÇIR AO VIVO</span>
              </a>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-4 py-2.5 text-xs font-black tracking-wider text-[var(--brand-purple-950)] hover:bg-[var(--brand-purple-50)]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="mt-2 text-center rounded-xl bg-[var(--brand-purple-100)] py-2 text-xs font-bold text-[var(--brand-purple-800)]"
              >
                Área da equipe
              </Link>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
