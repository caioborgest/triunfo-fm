import {
  Newspaper,
  Camera,
  Calendar,
  Trophy,
  Building2,
  Palette,
  Mic,
} from "lucide-react";
import Link from "next/link";

export const CATEGORIES = [
  { label: "NOTÍCIAS", href: "/#ultimas-noticias", icon: Newspaper },
  { label: "TURISMO", href: "#descubra-triunfo", icon: Camera },
  { label: "EVENTOS", href: "#agenda", icon: Calendar },
  { label: "ESPORTES", href: "/#ultimas-noticias", icon: Trophy },
  { label: "POLÍTICA", href: "/#ultimas-noticias", icon: Building2 },
  { label: "CULTURA", href: "/#ultimas-noticias", icon: Palette },
  { label: "PODCASTS", href: "#podcasts", icon: Mic },
] as const;

export function CategoryPillBar() {
  return (
    <div className="relative z-20 -mt-10 mb-14 sm:-mt-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass-light flex flex-wrap items-center justify-around gap-2 rounded-2xl p-3 shadow-2xl sm:rounded-full sm:p-3.5 border border-white/80">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="group relative flex flex-1 min-w-[100px] flex-col items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-center transition-all duration-300 hover:bg-[var(--brand-purple-950)] hover:text-white sm:flex-initial sm:flex-row sm:gap-2.5 sm:rounded-full sm:px-5 sm:py-2.5"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-[var(--brand-purple-100)] text-[var(--brand-purple-800)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--brand-gold-500)] group-hover:text-black">
                  <Icon className="size-4" />
                </span>
                <span className="text-xs font-black tracking-wider text-[var(--brand-purple-950)] group-hover:text-white">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
