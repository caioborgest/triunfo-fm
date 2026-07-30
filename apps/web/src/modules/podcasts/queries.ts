import { prisma as db } from "@triunfo/database";

export interface PodcastEpisodeItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  audioUrl?: string | null;
  duration?: string | null;
  publishedAt: Date;
}

export interface PodcastItem {
  id: string;
  title: string;
  slug: string;
  host: string;
  description: string;
  imageUrl?: string | null;
  category?: string | null;
  episodes: PodcastEpisodeItem[];
}

export async function getPodcasts(): Promise<PodcastItem[]> {
  try {
    const podcasts = await db.podcast.findMany({
      include: {
        episodes: {
          orderBy: { publishedAt: "desc" },
        },
      },
      orderBy: { title: "asc" },
    });
    return podcasts;
  } catch (error) {
    console.error("Erro ao buscar podcasts:", error);
    return [];
  }
}
