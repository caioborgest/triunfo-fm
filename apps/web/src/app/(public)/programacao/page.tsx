import { SiteFrame } from "@/components/site/site-frame";
import { Container } from "@triunfo/ui";
import { Radio, Clock, Mic, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { getPrograms } from "@/modules/radio/queries";

export const metadata: Metadata = {
  title: "Programação | Triunfo FM 87,9",
  description: "Confira a grade semanal de programas, apresentadores e horários da Rádio Triunfo FM 87,9.",
  alternates: { canonical: "/programacao" },
};

interface ShowSchedule {
  time: string;
  title: string;
  host: string;
  description: string;
  genre: string;
  badge?: string;
}

const defaultWeekdaySchedule: ShowSchedule[] = [
  {
    time: "06:00 - 08:00",
    title: "Amanhecer no Sertão",
    host: "Zé de Lima",
    description: "Música sertaneja de raiz, avisos da comunidade e notícias das primeiras horas.",
    genre: "Regional",
  },
  {
    time: "08:00 - 10:00",
    title: "Manhã Informativa Triunfo FM",
    host: "Equipe de Jornalismo",
    description: "As principais notícias de Triunfo e do Pajeú, entrevistas ao vivo e prestação de serviço.",
    genre: "Jornalismo",
    badge: "AO VIVO",
  },
  {
    time: "10:00 - 12:00",
    title: "Ritmos da Cidade",
    host: "Mariana Silva",
    description: "Música popular, pedidos dos ouvintes e participação ao vivo pelo WhatsApp da rádio.",
    genre: "Variedades",
  },
  {
    time: "12:00 - 13:00",
    title: "Jornal do Meio-Dia",
    host: "Carlos Andrade",
    description: "Resumo dos acontecimentos da manhã, esportes e política regional.",
    genre: "Jornalismo",
    badge: "DESTAQUE",
  },
  {
    time: "13:00 - 16:00",
    title: "Tarde Especial & Cultura",
    host: "Pedro Ramos",
    description: "Valorização da cultura pernambucana, poesia sertaneja, forró e história de Triunfo.",
    genre: "Cultura",
  },
  {
    time: "16:00 - 19:00",
    title: "Encontro Sertanejo",
    host: "Chico Neto",
    description: "O melhor do forró tradicional e das bandas da região no fim de tarde.",
    genre: "Musical",
  },
];

export default async function ProgramacaoPage() {
  const dbPrograms = await getPrograms().catch(() => []);

  const displaySchedule: ShowSchedule[] =
    dbPrograms.length > 0
      ? dbPrograms.map((p) => ({
          time: p.scheduleText || "Horário a definir",
          title: p.title,
          host: p.presenter?.name || "Equipe Triunfo FM",
          description: p.description || "Transmissão ao vivo pela Triunfo FM 87,9.",
          genre: "Programa",
        }))
      : defaultWeekdaySchedule;

  return (
    <SiteFrame>
      <section className="bg-gradient-to-b from-[var(--brand-purple-950)] to-[var(--brand-purple-900)] py-16 text-white">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--brand-gold-500)] backdrop-blur-md">
              <Radio size={16} />
              Grade de Programação
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              Sintonize no ritmo de Triunfo
            </h1>
            <p className="text-base text-gray-300 sm:text-lg">
              Conheça os programas, horários e locutores que fazem a Triunfo FM 87,9 ser a rádio mais ouvida do Sertão.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-gray-50/50">
        <Container>
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-extrabold text-[var(--brand-purple-950)] flex items-center gap-2">
              <Calendar className="size-5 text-[var(--brand-purple-800)]" />
              Programação Semanal (Segunda a Sexta)
            </h2>
            <span className="text-xs font-bold text-[var(--text-secondary)]">Fuso horário: America/Recife</span>
          </div>

          <div className="grid gap-4">
            {displaySchedule.map((show, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-xs transition-all hover:border-[var(--brand-purple-600)] hover:shadow-md sm:flex-row sm:items-center"
              >
                <div className="flex shrink-0 items-center gap-3 sm:w-48">
                  <Clock className="size-5 text-[var(--brand-purple-800)]" />
                  <span className="font-mono text-sm font-extrabold text-[var(--brand-purple-950)]">
                    {show.time}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black text-[var(--brand-purple-950)]">
                      {show.title}
                    </h3>
                    {show.badge && (
                      <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-extrabold text-purple-800">
                        {show.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {show.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:text-right">
                  <Mic className="size-4 text-gray-400" />
                  <span className="text-xs font-bold text-gray-700">{show.host}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </SiteFrame>
  );
}
