import { SiteFrame } from "@/components/site/site-frame";
import { Container } from "@triunfo/ui";
import { MapPin, Clock, Compass, Camera } from "lucide-react";
import type { Metadata } from "next";
import { getTouristSpots } from "@/modules/turismo/queries";

export const metadata: Metadata = {
  title: "Guia Turístico de Triunfo | Triunfo FM 87,9",
  description: "Descubra os encantos da cidade mais bonita do Sertão de Pernambuco: Teleférico, Pico do Papagaio, Teatro Cinema Guarany e muito mais.",
  alternates: { canonical: "/turismo" },
};

interface TouristSpot {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  hours: string;
  imageUrl: string;
  highlights: string[];
}

const defaultTouristSpots: TouristSpot[] = [
  {
    id: "teleferico",
    name: "Teleférico de Triunfo",
    category: "Aventura & Vista Panorâmica",
    description: "Um dos principais atrativos da cidade, conectando o centro ao Camping Triunfo sobrevoando o Açude João Barbosa com visão deslumbrante.",
    location: "Centro / Lago João Barbosa, Triunfo - PE",
    hours: "Quarta a Domingo, das 09h às 17h",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Percurso de 560 metros", "Visão panorâmica do lago", "Ideal para fotos"],
  },
  {
    id: "pico-do-papagaio",
    name: "Pico do Papagaio",
    category: "Natureza & Ecoturismo",
    description: "O ponto mais alto do estado de Pernambuco, com 1.260 metros de altitude. Proporciona um clima frio agradável e vista inesquecível do Sertão.",
    location: "Zona Rural (12 km do centro), Triunfo - PE",
    hours: "Acesso livre todos os dias",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    highlights: ["Ponto mais alto de PE (1.260m)", "Pôr do sol cinematográfico", "Trilhas ecológicas"],
  },
  {
    id: "teatro-guarany",
    name: "Teatro Cinema Guarany",
    category: "Patrimônio Histórico & Cultura",
    description: "Inaugurado em 1922, é um ícone da arquitetura neoclássica no Sertão. Sede do prestigiado Festival de Cinema de Triunfo.",
    location: "Praça Carolino Campos, Centro",
    hours: "Terça a Domingo, das 08h às 17h",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    highlights: ["Arquitetura de 1922", "Palco do Festival de Cinema", "Visitas guiadas"],
  },
  {
    id: "acude-joao-barbosa",
    name: "Açude João Barbosa (Lago de Triunfo)",
    category: "Lazer & Cartão Postal",
    description: "Localizado no coração da cidade, cercado por casario histórico, restaurantes e pedalinhos para passeios em família.",
    location: "Centro Histórico",
    hours: "Aberto 24 horas",
    imageUrl: "https://images.unsplash.com/photo-1548625361-18a666497298?auto=format&fit=crop&w=800&q=80",
    highlights: ["Passeios de pedalinho", "Gastronomia regional ao redor", "Caminhadas ao pôr do sol"],
  },
  {
    id: "engenho-sao-pedro",
    name: "Engenho São Pedro",
    category: "Gastronomia & Tradição",
    description: "Famoso pela produção artesanal de cachaça, rapadura e licores típicos da região serrana do Pajeú.",
    location: "Sítio Jerimum, Triunfo - PE",
    hours: "Segunda a Sábado, das 08h às 16h",
    imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    highlights: ["Degustação de licores", "Processo artesanal de rapadura", "Loja de produtos locais"],
  },
];

export default async function TurismoPage() {
  const dbSpots = await getTouristSpots().catch(() => []);

  const displaySpots: TouristSpot[] =
    dbSpots.length > 0
      ? dbSpots.map((s) => ({
          id: s.id,
          name: s.name,
          category: s.category,
          description: s.description,
          location: s.location,
          hours: s.hours || "Consulte o local",
          imageUrl: s.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
          highlights: s.highlights,
        }))
      : defaultTouristSpots;

  return (
    <SiteFrame>
      <section className="bg-gradient-to-b from-[var(--brand-purple-950)] to-[var(--brand-purple-900)] py-16 text-white">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--brand-gold-500)] backdrop-blur-md">
              <Compass size={16} />
              Descubra Triunfo - PE
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              A cidade mais bonita do Sertão
            </h1>
            <p className="text-base text-gray-300 sm:text-lg">
              Clima ameno, arquitetura histórica, rica gastronomia sertaneja e atrativos naturais a 1.010 metros de altitude.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-gray-50/50">
        <Container>
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-black text-[var(--brand-purple-950)] sm:text-2xl flex items-center gap-2">
              <Camera className="size-6 text-[var(--brand-purple-800)]" />
              Pontos Turísticos Imperdíveis
            </h2>
            <span className="text-xs font-extrabold text-[var(--brand-purple-800)] uppercase tracking-wider">
              {displaySpots.length} Destinos em Destaque
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displaySpots.map((spot) => (
              <div
                key={spot.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={spot.imageUrl}
                    alt={spot.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-md bg-[var(--brand-purple-800)] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                    {spot.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-black text-[var(--brand-purple-950)] group-hover:text-[var(--brand-purple-600)] transition-colors">
                    {spot.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {spot.description}
                  </p>

                  {spot.highlights.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-600">
                      {spot.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-[var(--brand-gold-500)]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-5 space-y-2 text-xs font-semibold text-[var(--text-secondary)] border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[var(--brand-purple-800)] shrink-0" />
                      <span className="truncate">{spot.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[var(--brand-purple-800)] shrink-0" />
                      <span>{spot.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </SiteFrame>
  );
}
