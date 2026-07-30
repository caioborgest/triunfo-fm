import { ArrowRight, Camera, Compass } from "lucide-react";
import Link from "next/link";
import { Container } from "@triunfo/ui";

const ATTRACTIONS = [
  {
    title: "Teleférico",
    desc: "Vista panorâmica da serra",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Lago João Barbosa",
    desc: "O cartão postal da cidade",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Cine Teatro Guarany",
    desc: "Arquitetura e história",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Cachaçarias",
    desc: "Tradição artesanal",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Museus",
    desc: "Acervo e patrimônio",
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Gastronomia",
    desc: "Sabores do Sertão",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Hotéis",
    desc: "Hospedagem aconchegante",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Cachoeiras",
    desc: "Ecoturismo e natureza",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=400&q=80",
  },
];

export function DiscoverTriunfoSection() {
  return (
    <section className="py-16" id="descubra-triunfo">
      <Container>
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-[var(--brand-purple-100)] text-[var(--brand-purple-800)]">
              <Camera className="size-4" />
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-[var(--brand-purple-950)] sm:text-2xl">
              DESCUBRA TRIUNFO
            </h2>
          </div>
          <Link
            href="#descubra-triunfo"
            className="group flex items-center gap-1 text-xs font-black tracking-wider text-[var(--brand-purple-800)] hover:text-[var(--brand-purple-600)]"
          >
            GUIA DE TURISMO
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 8 Items Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {ATTRACTIONS.map((attr, idx) => (
            <div
              key={idx}
              className="group relative aspect-[16/11] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-slate-950 shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:border-[var(--brand-gold-500)]/50"
            >
              <img
                src={attr.image}
                alt={attr.title}
                className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--brand-gold-300)] uppercase tracking-wider mb-0.5">
                  <Compass className="size-3" />
                  Ponto Turístico
                </div>
                <h3 className="text-base font-black text-white group-hover:text-[var(--brand-gold-300)] transition-colors">
                  {attr.title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-1 font-normal">
                  {attr.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
