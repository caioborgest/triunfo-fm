import { Play, ArrowRight, Mic } from "lucide-react";
import Link from "next/link";
import { Container } from "@triunfo/ui";

const PODCASTS = [
  {
    title: "Bom Dia Triunfo",
    host: "João Almeida",
    category: "Notícias & Entrevistas",
    episodes: "24 episódios",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    title: "Papo Sertanejo",
    host: "Martinha Souza",
    category: "Música & Cultura",
    episodes: "18 episódios",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    title: "Histórias de Triunfo",
    host: "Rafael Diniz",
    category: "Memória & Tradição",
    episodes: "12 episódios",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    title: "Conexão Cultura",
    host: "Lívia Nogueira",
    category: "Arte & Eventos",
    episodes: "30 episódios",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  },
];

export function FeaturedPodcastsSection() {
  return (
    <section className="py-16 bg-[var(--surface-subtle)]/50 border-t border-[var(--border-subtle)]" id="podcasts">
      <Container>
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-[var(--brand-purple-100)] text-[var(--brand-purple-800)]">
              <Mic className="size-4" />
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-[var(--brand-purple-950)] sm:text-2xl">
              PODCASTS EM DESTAQUE
            </h2>
          </div>
          <Link
            href="#podcasts"
            className="group flex items-center gap-1 text-xs font-black tracking-wider text-[var(--brand-purple-800)] hover:text-[var(--brand-purple-600)]"
          >
            OUVIR TODOS
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PODCASTS.map((pod, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#210440] via-[var(--brand-purple-950)] to-[#15022e] p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border border-white/10 hover:border-[var(--brand-gold-500)]/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-[var(--brand-gold-300)] border border-white/10">
                    {pod.category}
                  </span>
                  <span className="text-[10px] text-white/50">{pod.episodes}</span>
                </div>

                <h3 className="mt-4 text-xl font-black leading-snug tracking-tight text-white group-hover:text-[var(--brand-gold-300)] transition-colors">
                  {pod.title}
                </h3>

                <div className="mt-3 flex items-center gap-2.5">
                  <img
                    src={pod.avatar}
                    alt={pod.host}
                    className="size-7 rounded-full object-cover border border-[var(--brand-gold-500)]"
                  />
                  <p className="text-xs font-medium text-white/70">
                    Com {pod.host}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[11px] font-bold text-white/60 group-hover:text-white transition-colors">
                  Ouvir episódios
                </span>
                <button
                  className="flex size-11 items-center justify-center rounded-full bg-[var(--brand-gold-500)] text-black shadow-md transition-all duration-300 hover:scale-110 group-hover:bg-[var(--brand-gold-300)]"
                  aria-label={`Ouvir ${pod.title}`}
                >
                  <Play className="size-5 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
