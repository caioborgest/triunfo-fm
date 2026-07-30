import { prisma as db } from "@triunfo/database";

export interface YouTubeVideoItem {
  id: string;
  youtubeUrl: string;
  youtubeId: string;
  title: string;
  description?: string | null;
  duration?: string | null;
  viewCount?: string | null;
  thumbnailUrl?: string | null;
  isFeatured: boolean;
  position: number;
}

export function extractYouTubeId(url: string): string {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2] && match[2].length === 11 ? match[2] : url.trim();
}

export async function getYouTubeVideos(): Promise<YouTubeVideoItem[]> {
  try {
    const videos = await db.youTubeVideo.findMany({
      orderBy: { position: "asc" },
    });
    return videos;
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    return [];
  }
}
