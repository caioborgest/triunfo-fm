import { ArrowRight, Calendar as CalendarIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { Container } from "@triunfo/ui";

const EVENTS = [
  {
    day: "24",
    month: "MAI",
    title: "Festival de Inverno de Triunfo",
    location: "Praça Carolino Campos",
    category: "EVENTO",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
  },
  {
    day: "31",
    month: "MAI",
    title: "Feira de Artesanato e Cultura",
    location: "Centro de Triunfo",
    category: "FEIRA",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80",
  },
  {
    day: "07",
    month: "JUN",
    title: "Show de Alceu Valença",
    location: "Cine Teatro Guarany",
    category: "SHOW",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
  },
  {
    day: "12",
    month: "JUN",
    title: "Caminhada Ecológica",
    location: "Parque da Cachoeira",
    category: "TURISMO",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80",
  },
];

export function CityAgendaSection() {
  return (
    <section className="py-14 bg-[var(--surface-subtle)]/70 border-y border-[var(--border-subtle)]" id="agenda">
      <Container>
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-[var(--brand-purple-100)] text-[var(--brand-purple-800)]">
              <CalendarIcon className="size-4" />
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-[var(--brand-purple-950)] sm:text-2xl">
              AGENDA DA CIDADE
            </h2>
          </div>
          <Link
            href="#agenda"
            className="group flex items-center gap-1 text-xs font-black tracking-wider text-[var(--brand-purple-800)] hover:text-[var(--brand-purple-600)]"
          >
            VER AGENDA COMPLETA
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS.map((evt, idx) => (
            <div
              key={idx}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[var(--brand-purple-600)]/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Date Badge Overlay */}
                <div className="absolute top-3 left-3 flex flex-col items-center justify-center rounded-xl bg-white/95 p-2 shadow-md backdrop-blur-md min-w-[50px]">
                  <span className="text-lg font-black leading-none text-[var(--brand-purple-950)]">
                    {evt.day}
                  </span>
                  <span className="text-[10px] font-black uppercase text-[var(--brand-gold-900)]">
                    {evt.month}
                  </span>
                </div>

                <span className="absolute bottom-3 right-3 rounded-md bg-[var(--brand-purple-950)]/90 px-2.5 py-1 text-[10px] font-black uppercase text-white backdrop-blur-sm">
                  {evt.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-black leading-snug text-[var(--brand-purple-950)] group-hover:text-[var(--brand-purple-600)] transition-colors">
                  {evt.title}
                </h3>

                <p className="mt-2.5 flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium">
                  <MapPin className="size-3.5 text-[var(--brand-purple-600)] shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </p>

                <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]/60 text-right">
                  <span className="text-[11px] font-bold text-[var(--brand-purple-800)] group-hover:underline">
                    Ver detalhes →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
