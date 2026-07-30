"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronUp } from "lucide-react";
import { BrandMark } from "./brand-mark";

export function StickyAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <aside
      aria-label="Player de áudio ao vivo"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/20 bg-[#160233]/98 px-4 py-2.5 text-white shadow-[0_-12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left: Brand logo (dark mode) & High contrast AO VIVO badge */}
        <div className="flex items-center gap-3.5">
          <div className="hidden sm:block">
            <BrandMark dark />
          </div>

          {/* AO VIVO Badge with pure white text and vibrant gold dot */}
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-black tracking-wider text-white border border-white/20 shadow-md">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-gold-500)] opacity-80" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[var(--brand-gold-500)]" />
            </span>
            <span>AO VIVO 87,9</span>
          </div>
        </div>

        {/* Center: Current show & music track with Animated Equalizer */}
        <div className="flex items-center gap-3.5 truncate">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="João Almeida"
            className="size-10 shrink-0 rounded-full border-2 border-[var(--brand-gold-500)] object-cover hidden xs:block shadow-md"
          />
          <div className="truncate text-left text-xs">
            <p className="font-black text-white flex items-center gap-2">
              <span>Manhã Triunfo</span>
              <span className="font-medium text-white/70">· Com João Almeida</span>
            </p>
            <p className="truncate text-white/90 font-medium">
              Alceu Valença - Anunciação <span className="hidden md:inline font-normal text-white/60">· Ao Vivo na Triunfo FM</span>
            </p>
          </div>

          {/* Animated Equalizer */}
          {isPlaying && (
            <div className="hidden lg:flex items-end gap-1 h-4 px-2">
              <span className="w-1 bg-[var(--brand-gold-500)] eq-bar-1 rounded-full" />
              <span className="w-1 bg-[var(--brand-gold-500)] eq-bar-2 rounded-full" />
              <span className="w-1 bg-[var(--brand-gold-500)] eq-bar-3 rounded-full" />
              <span className="w-1 bg-[var(--brand-gold-500)] eq-bar-4 rounded-full" />
            </div>
          )}
        </div>

        {/* Right: Polished Play Controls & Volume */}
        <div className="flex items-center gap-3.5 shrink-0">
          <button className="hidden sm:flex size-8 items-center justify-center text-white/80 hover:text-white transition" title="Anterior">
            <SkipBack className="size-4" />
          </button>

          {/* Polished Vibrant Play Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="gold-glow-box flex size-12 items-center justify-center rounded-full bg-[var(--brand-gold-500)] text-black shadow-2xl transition-all duration-300 hover:bg-[var(--brand-gold-300)] hover:scale-110 active:scale-95 border-2 border-amber-300"
            title={isPlaying ? "Pausar rádio" : "Ouvir rádio ao vivo"}
          >
            {isPlaying ? (
              <Pause className="size-6 fill-current" />
            ) : (
              <Play className="size-6 fill-current ml-0.5" />
            )}
          </button>

          <button className="hidden sm:flex size-8 items-center justify-center text-white/80 hover:text-white transition" title="Próxima">
            <SkipForward className="size-4" />
          </button>

          <button className="hidden md:flex size-8 items-center justify-center text-white/80 hover:text-white transition" title="Volume">
            <Volume2 className="size-5" />
          </button>

          <button className="flex size-8 items-center justify-center text-white/80 hover:text-white transition" title="Expandir player">
            <ChevronUp className="size-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
