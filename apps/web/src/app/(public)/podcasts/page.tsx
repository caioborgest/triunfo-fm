import { SiteFrame } from "@/components/site/site-frame";
import { Container } from "@triunfo/ui";
import { Headphones, Play, Clock, Radio, Share2 } from "lucide-react";
import type { Metadata } from "next";
import { getPodcasts } from "@/modules/podcasts/queries";

export const metadata: Metadata = {
  title: "Podcasts & Áudio Sob Demanda | Triunfo FM 87,9",
  description: "Ouça os programas gravados, entrevistas exclusivas e podcasts originais da Triunfo FM 87,9 a qualquer hora.",
  alternates: { canonical: "/podcasts" },
};

interface PodcastEpisode {
  id: string;
  title: string;
  showName: string;
  duration: string;
  publishedAt: string;
  description: string;
  audioUrl?: string | null;
}

const defaultPodcastEpisodes: PodcastEpisode[] = [
  {
    id: "ep-1",
    title: "Especial História dos Caretas e o Carnaval de Triunfo",
    showName: "Cultura no Pajeú",
    duration: "42 min",
    publishedAt: "28 de Julho, 2026",
    description: "Entrevista com artesãos e relhoiros antigos sobre a tradição centenária dos Caretas e a confecção de máscaras.",
  },
  {
    id: "ep-2",
    title: "Potencial do Ecoturismo no Pico do Papagaio",
    showName: "Triunfo em Foco",
    duration: "35 min",
    publishedAt: "25 de Julho, 2026",
    description: "Guias turísticos e biólogos discutem a preservação ambiental e a infraestrutura de acolhimento ao visitante.",
  },
  {
    id: "ep-3",
    title: "Patrimônio Arquitetônico do Teatro Guarany",
    showName: "Memórias Sertanejas",
    duration: "50 min",
    publishedAt: "18 de Julho, 2026",
    description: "Um mergulho na história da construção do Teatro Cinema Guarany em 1922 e seu papel na cultura pernambucana.",
  },
  {
    id: "ep-4",
    title: "Produção Artesanal de Cachaça e Licor em Triunfo",
    showName: "Sabores da Terra",
    duration: "28 min",
    publishedAt: "10 de Julho, 2026",
    description: "Conversa com mestres alambiqueiros sobre as receitas de licores e a tradição dos engenhos serranos.",
  },
];

export default async function PodcastsPage() {
  const dbPodcasts = await getPodcasts().catch(() => []);

  const dbEpisodes: PodcastEpisode[] = dbPodcasts.flatMap((pod) =>
    pod.episodes.map((ep) => ({
      id: ep.id,
      title: ep.title,
      showName: pod.title,
      duration: ep.duration || "Áudio",
      publishedAt: new Date(ep.publishedAt).toLocaleDateString("pt-BR"),
      description: ep.description,
      audioUrl: ep.audioUrl || null,
    }))
  );

  const displayEpisodes = dbEpisodes.length > 0 ? dbEpisodes : defaultPodcastEpisodes;

  return (
    <SiteFrame>
      <section className="bg-gradient-to-b from-[var(--brand-purple-950)] to-[var(--brand-purple-900)] py-16 text-white">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--brand-gold-500)] backdrop-blur-md">
              <Headphones size={16} />
              Podcasts & Áudios Gravados
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              Sua rádio preferida no seu tempo
            </h1>
            <p className="text-base text-gray-300 sm:text-lg">
              Ouça os melhores momentos da programação, entrevistas marcantes e conteúdos exclusivos quando e onde quiser.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-gray-50/50">
        <Container>
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-black text-[var(--brand-purple-950)] sm:text-2xl flex items-center gap-2">
              <Radio className="size-6 text-[var(--brand-purple-800)]" />
              Episódios Recentes
            </h2>
            <span className="text-xs font-bold text-[var(--text-secondary)]">Disponível em áudio MP3 alta qualidade</span>
          </div>

          <div className="grid gap-6">
            {displayEpisodes.map((ep) => (
              <div
                key={ep.id}
                className="group flex flex-col gap-6 rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[var(--brand-purple-600)] hover:shadow-md md:flex-row md:items-center"
              >
                <button
                  type="button"
                  aria-label={`Ouvir episódio ${ep.title}`}
                  className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-purple-800)] text-white shadow-md transition-transform group-hover:scale-105 group-hover:bg-[var(--brand-purple-600)]"
                >
                  <Play className="size-6 fill-current translate-x-0.5" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[var(--brand-purple-800)]">
                    <span>{ep.showName}</span>
                    <span>•</span>
                    <span className="text-gray-500 font-normal">{ep.publishedAt}</span>
                  </div>

                  <h3 className="mt-1 text-lg font-black text-[var(--brand-purple-950)] group-hover:text-[var(--brand-purple-600)] transition-colors">
                    {ep.title}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {ep.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4 text-xs font-bold text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">
                    <Clock size={14} />
                    {ep.duration}
                  </span>
                  <button type="button" aria-label="Compartilhar episódio" className="p-2 text-gray-400 hover:text-[var(--brand-purple-800)] transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </SiteFrame>
  );
}
