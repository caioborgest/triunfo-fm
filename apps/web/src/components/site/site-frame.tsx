import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { StickyAudioPlayer } from "./sticky-audio-player";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white relative pb-16">
      <a
        className="fixed left-4 top-3 z-50 -translate-y-24 rounded-lg bg-[var(--brand-gold-500)] px-4 py-3 font-bold text-[var(--text-primary)] transition-transform focus:translate-y-0 motion-reduce:transition-none"
        href="#conteudo-principal"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo-principal">{children}</main>
      <SiteFooter />
      <StickyAudioPlayer />
    </div>
  );
}
