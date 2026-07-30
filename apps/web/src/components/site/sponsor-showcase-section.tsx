import { Container } from "@triunfo/ui";
import { ExternalLink, Award, Sparkles, Star, Store } from "lucide-react";
import type { SponsorItem } from "@/modules/sponsors/queries";

const DEFAULT_SPONSORS: SponsorItem[] = [
  {
    id: "s1",
    name: "Pousada Baixa Verde",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    linkUrl: "https://triunfo.pe.gov.br",
    placement: "HOME_PATROCINADORES",
    isActive: true,
    position: 1,
  },
  {
    id: "s2",
    name: "Engenho São Pedro — Cachaça & Licores",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
    linkUrl: "https://triunfo.pe.gov.br",
    placement: "HOME_PATROCINADORES",
    isActive: true,
    position: 2,
  },
  {
    id: "s3",
    name: "Hotel Ouro Preto Triunfo",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    linkUrl: "https://triunfo.pe.gov.br",
    placement: "HOME_PATROCINADORES",
    isActive: true,
    position: 3,
  },
  {
    id: "s4",
    name: "Restaurante O Lavourão",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    linkUrl: "https://triunfo.pe.gov.br",
    placement: "HOME_PATROCINADORES",
    isActive: true,
    position: 4,
  },
  {
    id: "s5",
    name: "Café Serrano Triunfo",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
    linkUrl: "https://triunfo.pe.gov.br",
    placement: "HOME_PATROCINADORES",
    isActive: true,
    position: 5,
  },
  {
    id: "s6",
    name: "Supermercado Avistão",
    imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
    linkUrl: "https://triunfo.pe.gov.br",
    placement: "HOME_PATROCINADORES",
    isActive: true,
    position: 6,
  },
  {
    id: "s7",
    name: "Farmácia Santa Luíza",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    linkUrl: "https://triunfo.pe.gov.br",
    placement: "HOME_PATROCINADORES",
    isActive: true,
    position: 7,
  },
  {
    id: "s8",
    name: "Posto Triunfo Combustíveis",
    imageUrl: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=600&q=80",
    linkUrl: "https://triunfo.pe.gov.br",
    placement: "HOME_PATROCINADORES",
    isActive: true,
    position: 8,
  },
  {
    id: "s9",
    name: "Cachaçaria Guacheta",
    imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    linkUrl: "https://triunfo.pe.gov.br",
    placement: "HOME_PATROCINADORES",
    isActive: true,
    position: 9,
  },
];

interface SponsorShowcaseSectionProps {
  sponsors?: SponsorItem[];
}

export function SponsorShowcaseSection({ sponsors }: SponsorShowcaseSectionProps) {
  const displaySponsors = sponsors && sponsors.length > 0 ? sponsors : DEFAULT_SPONSORS;

  const masterSponsor = displaySponsors[0];
  const officialSponsors = displaySponsors.slice(1, 5);
  const localSponsors = displaySponsors.slice(5);

  return (
    <section className="py-16 bg-gradient-to-b from-[#12002b] via-[#220054] to-[#12002b] text-white relative isolate overflow-hidden border-y border-white/10">
      {/* Ambient Orbs */}
      <div className="absolute top-0 right-1/4 size-[550px] rounded-full bg-[var(--brand-gold-500)]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 size-[550px] rounded-full bg-[var(--brand-purple-600)]/15 blur-[140px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[var(--brand-gold-500)] font-black text-xs uppercase tracking-widest mb-2">
              <Award className="size-5" />
              MARCAS E EMPRESAS PARCEIRAS
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-4xl">
              PATROCINADORES DA TRIUNFO FM
            </h2>
          </div>
          <p className="text-xs text-white/70 max-w-sm font-medium">
            Apoio institucional e comercial que viabiliza a transmissão ao vivo, o jornalismo ético e a cultura de Triunfo.
          </p>
        </div>

        {/* 1. Main Bento Grid (4 Columns) */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Slot 1: Patrocinador Master (Takes 2 Columns and 2 Rows height) */}
          {masterSponsor && (
            <a
              href={masterSponsor.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative lg:col-span-2 lg:row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--brand-gold-500)]/50 bg-gradient-to-br from-white/10 via-white/5 to-black/80 p-7 shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--brand-gold-500)] hover:shadow-[0_0_35px_rgba(242,169,0,0.25)] min-h-[22rem]"
            >
              {/* Background Photography Overlay */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <img
                  src={masterSponsor.imageUrl}
                  alt={masterSponsor.name}
                  className="h-full w-full object-cover object-center opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12002b] via-[#12002b]/75 to-transparent" />
              </div>

              {/* Master Badge Header */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-gold-500)] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-md">
                  <Star className="size-3.5 fill-current" />
                  PATROCINADOR MASTER
                </span>
                <span className="text-[11px] font-bold text-white/70 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                  TURISMO & HOSPITALIDADE
                </span>
              </div>

              {/* Master Content */}
              <div className="mt-16">
                <h3 className="text-2xl font-black text-white sm:text-3xl group-hover:text-[var(--brand-gold-300)] transition-colors">
                  {masterSponsor.name}
                </h3>
                <p className="mt-2 text-sm text-white/80 font-medium leading-relaxed">
                  Referência em hospedagem e aconchego em Triunfo PE. Apoio oficial às transmissões ao vivo da Triunfo FM 87,9.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-black tracking-wider text-[var(--brand-gold-400)] group-hover:text-white transition-colors">
                  CONHEÇA O ANUNCIANTE
                  <ExternalLink className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          )}

          {/* Slots 2 to 5: Official Sponsors (4 Cards completing the 4x2 Grid) */}
          {officialSponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--brand-gold-500)]/60 hover:bg-white/10"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-black/40 mb-3 border border-white/10">
                <img
                  src={sponsor.imageUrl}
                  alt={sponsor.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-[var(--brand-gold-400)]">
                  <Sparkles className="size-3" /> PARCEIRO OFICIAL
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-[var(--brand-gold-300)] transition-colors leading-snug">
                  {sponsor.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-white/50 group-hover:text-white transition-colors">
                <span>Visitar site</span>
                <ExternalLink className="size-3.5 shrink-0" />
              </div>
            </a>
          ))}

        </div>

        {/* 2. Bottom Strip: Local Trade & Cultural Support (Full 4-Column Grid) */}
        {localSponsors.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/60 mb-5">
              <Store className="size-4 text-[var(--brand-gold-400)]" />
              COMÉRCIO LOCAL & APOIO CULTURAL
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {localSponsors.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-gold-500)]/50 hover:bg-white/10"
                >
                  <div className="size-14 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                    <img
                      src={sponsor.imageUrl}
                      alt={sponsor.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-extrabold uppercase tracking-widest text-white/50">
                      PARCEIRO LOCAL
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-[var(--brand-gold-300)] transition-colors truncate">
                      {sponsor.name}
                    </h4>
                  </div>
                  <ExternalLink className="size-4 text-white/40 group-hover:text-[var(--brand-gold-400)] shrink-0 mr-1" />
                </a>
              ))}
            </div>
          </div>
        )}

      </Container>
    </section>
  );
}
