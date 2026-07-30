import { SiteFrame } from "@/components/site/site-frame";
import { Container } from "@triunfo/ui";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { getEvents } from "@/modules/eventos/queries";

export const metadata: Metadata = {
  title: "Agenda de Eventos | Triunfo FM 87,9",
  description: "Confira os festivais, eventos culturais, festas tradicionais e shows que movimentam a cidade de Triunfo - PE.",
  alternates: { canonical: "/eventos" },
};

interface CityEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  isFeatured?: boolean;
}

const defaultCityEvents: CityEvent[] = [
  {
    id: "festival-cinema",
    title: "16º Festival de Cinema de Triunfo",
    category: "Cinema & Cultura",
    date: "10 a 15 de Agosto",
    time: "Das 18h às 23h",
    location: "Teatro Cinema Guarany",
    description: "Mostra competitiva de curtas e longas-metragens nacionais, debates com cineastas e oficinas gratuitas.",
    isFeatured: true,
  },
  {
    id: "festa-caretas",
    title: "Encontro dos Caretas de Triunfo",
    category: "Tradição & Folclore",
    date: "Todo o período carnavalesco",
    time: "A partir das 14h",
    location: "Ruas do Centro Histórico",
    description: "Desfile dos tradicionais Caretas com chicotes, relhos e máscaras artesanais coloridas encantando moradores e visitantes.",
    isFeatured: true,
  },
  {
    id: "festa-estudante",
    title: "Festa do Estudante de Triunfo",
    category: "Shows & Música",
    date: "20 a 23 de Setembro",
    time: "A partir das 21h",
    location: "Pátio de Eventos Maestro Madureira",
    description: "Grandes atrações de forró, MPB e artistas pernambucanos celebrando a juventude e a cultura sertaneja.",
    isFeatured: false,
  },
  {
    id: "natal-luz",
    title: "Natal de Luz nas Alturas",
    category: "Festividade Religiosa",
    date: "01 a 25 de Dezembro",
    time: "Das 18h às 22h",
    location: "Lago João Barbosa e Igreja Matriz",
    description: "Iluminação natalina especial no lago, cantatas nas sacadas históricas e apresentações de reisado.",
    isFeatured: false,
  },
];

export default async function EventosPage() {
  const dbEvents = await getEvents().catch(() => []);

  const displayEvents: CityEvent[] =
    dbEvents.length > 0
      ? dbEvents.map((e) => ({
          id: e.id,
          title: e.title,
          category: e.category,
          date: new Date(e.startDate).toLocaleDateString("pt-BR"),
          time: e.timeText || "A definir",
          location: e.location,
          description: e.description,
          isFeatured: e.isFeatured,
        }))
      : defaultCityEvents;

  return (
    <SiteFrame>
      <section className="bg-gradient-to-b from-[var(--brand-purple-950)] to-[var(--brand-purple-900)] py-16 text-white">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--brand-gold-500)] backdrop-blur-md">
              <Calendar size={16} />
              Agenda da Cidade
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              Cultura e entretenimento o ano todo
            </h1>
            <p className="text-base text-gray-300 sm:text-lg">
              Fique por dentro de todos os festivais, shows, encontros folclóricos e eventos de Triunfo - Pernambuco.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-gray-50/50">
        <Container>
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-black text-[var(--brand-purple-950)] sm:text-2xl flex items-center gap-2">
              <Sparkles className="size-6 text-[var(--brand-gold-500)]" />
              Próximos Eventos & Destaques
            </h2>
            <span className="text-xs font-bold text-[var(--text-secondary)]">Programação sujeita a alterações oficiais</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {displayEvents.map((evt) => (
              <div
                key={evt.id}
                className={`group flex flex-col justify-between rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  evt.isFeatured
                    ? "border-[var(--brand-purple-800)] ring-1 ring-[var(--brand-purple-800)]/20"
                    : "border-[var(--border-subtle)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-[var(--brand-purple-100)] px-3 py-1 text-[11px] font-black text-[var(--brand-purple-800)] uppercase tracking-wider">
                      {evt.category}
                    </span>
                    {evt.isFeatured && (
                      <span className="rounded bg-[var(--brand-gold-500)]/20 px-2.5 py-0.5 text-xs font-black text-[var(--brand-purple-950)]">
                        ★ Destaque
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-2xl font-black text-[var(--brand-purple-950)] group-hover:text-[var(--brand-purple-600)] transition-colors">
                    {evt.title}
                  </h3>

                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 grid gap-2 text-xs font-bold text-[var(--text-primary)]">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-[var(--brand-purple-800)] shrink-0" />
                    <span>Data: {evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-[var(--brand-purple-800)] shrink-0" />
                    <span>Horário: {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-[var(--brand-purple-800)] shrink-0" />
                    <span>Local: {evt.location}</span>
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
