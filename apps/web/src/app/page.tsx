import { SiteFrame } from "@/components/site/site-frame";
import { SiteHero } from "@/components/site/site-hero";
import { CategoryPillBar } from "@/components/site/category-pill-bar";
import { NewsAndLivePlayerSection } from "@/components/site/news-and-live-player";
import { CityAgendaSection } from "@/components/site/city-agenda-section";
import { DiscoverTriunfoSection } from "@/components/site/discover-triunfo-section";
import { FeaturedPodcastsSection } from "@/components/site/featured-podcasts-section";
import { NewsletterSection } from "@/components/site/newsletter-section";
import { YouTubeVideosSection } from "@/components/site/youtube-videos-section";
import { TeamSection } from "@/components/site/team-section";
import { SponsorShowcaseSection } from "@/components/site/sponsor-showcase-section";
import { AdSenseBanner } from "@/components/ads/adsense-banner";
import { Container } from "@triunfo/ui";
import { createWebSiteJsonLd, serializeJsonLd } from "@triunfo/seo";
import type { Metadata } from "next";

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: { absolute: "Triunfo FM 87,9 | Notícias, Rádio Ao Vivo, Equipe, Cultura e App" },
  description: "A voz da cidade mais bonita do Sertão. Informação, transmissão ao vivo, equipe de comunicadores, cultura, turismo, vídeos e aplicativo móvel.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Triunfo FM 87,9",
    description: "A voz da cidade mais bonita do Sertão.",
    url: "/",
  },
};

import { getPublishedArticles } from "@/modules/editorial/queries";
import { getYouTubeVideos } from "@/modules/youtube/queries";
import { getSponsors } from "@/modules/sponsors/queries";

export default async function HomePage() {
  const [publishedArticles, youtubeVideos, sponsors] = await Promise.all([
    getPublishedArticles({ limit: 4 }).catch(() => []),
    getYouTubeVideos().catch(() => []),
    getSponsors("HOME_PATROCINADORES").catch(() => []),
  ]);

  const mappedVideos = youtubeVideos.map((v) => ({
    id: v.id,
    youtubeId: v.youtubeId,
    title: v.title,
    duration: v.duration ?? null,
    views: v.viewCount ?? null,
    thumbnail: v.thumbnailUrl ?? null,
  }));

  const jsonLd = createWebSiteJsonLd({
    siteUrl,
    publisherLogoUrl: "/brand/triunfo-fm-logo.png",
  });

  return (
    <SiteFrame>
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        type="application/ld+json"
      />

      {/* 1. Hero Section com Imagem de fundo careta-triunfo-pe.jpg e Seletor de Destaques */}
      <SiteHero />

      {/* 2. Barra de Categorias Flutuante com Ícones */}
      <CategoryPillBar />

      {/* 3. Seção Últimas Notícias & Player Rádio Ao Vivo (Ouça Agora) */}
      <NewsAndLivePlayerSection articles={publishedArticles} />

      {/* Bloco AdSense Intercalado na Capa */}
      <Container>
        <AdSenseBanner slotId="home-middle-banner" format="horizontal" />
      </Container>

      {/* 4. Seção de Patrocinadores da Triunfo FM (Sponsor Showcase Bento Grid) */}
      <SponsorShowcaseSection sponsors={sponsors} />

      {/* 5. Seção Agenda da Cidade (Eventos) */}
      <CityAgendaSection />

      {/* 6. Seção Descubra Triunfo (Guia Turístico) */}
      <DiscoverTriunfoSection />

      {/* 7. Seção Podcasts em Destaque */}
      <FeaturedPodcastsSection />

      {/* 8. Seção Boletim de Notícias / Newsletter */}
      <NewsletterSection />

      {/* 9. Seção de Vídeos do YouTube */}
      <YouTubeVideosSection videos={mappedVideos} />

      {/* 10. Seção da Equipe da Triunfo FM */}
      <TeamSection />
    </SiteFrame>
  );
}
