"use client";

import { useState } from "react";
import { Youtube, Play, ExternalLink, X, Eye } from "lucide-react";
import { Container } from "@triunfo/ui";

export interface YouTubeVideoData {
  id: string;
  youtubeId: string;
  title: string;
  duration?: string | null;
  views?: string | null;
  thumbnail?: string | null;
}

const DEFAULT_YOUTUBE_VIDEOS: YouTubeVideoData[] = [
  {
    id: "1",
    youtubeId: "dQw4w9WgXcQ",
    title: "AO VIVO | Manhã Triunfo com João Almeida - Edição Especial",
    duration: "1:45:20",
    views: "1.2k visualizações",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    youtubeId: "dQw4w9WgXcQ",
    title: "Bastidores do Festival de Inverno de Triunfo",
    duration: "14:35",
    views: "3.4k visualizações",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    youtubeId: "dQw4w9WgXcQ",
    title: "Entrevista Exclusiva: Turismo e o Teleférico de Triunfo",
    duration: "28:10",
    views: "2.1k visualizações",
    thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "4",
    youtubeId: "dQw4w9WgXcQ",
    title: "Sertão em Foco: História, Cachaçarias e Gastronomia",
    duration: "42:15",
    views: "4.8k visualizações",
    thumbnail: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
  },
];

interface YouTubeVideosSectionProps {
  videos?: YouTubeVideoData[];
}

export function YouTubeVideosSection({ videos }: YouTubeVideosSectionProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const displayVideos = videos && videos.length > 0 ? videos : DEFAULT_YOUTUBE_VIDEOS;

  return (
    <section className="py-16 bg-gradient-to-br from-[#12002b] via-[#220054] to-[#38007e] text-white relative isolate overflow-hidden border-t border-white/10" id="youtube">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />

      <Container>
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-extrabold text-xs uppercase tracking-widest mb-2">
              <Youtube className="size-5 fill-current" />
              CANAL OFICIAL NO YOUTUBE
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
              ÚLTIMOS VÍDEOS E TRANSMISSÕES
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Assista às lives da rádio, entrevistas completas e cobertura dos eventos de Triunfo.
            </p>
          </div>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs font-black tracking-wider text-white transition hover:bg-red-700 hover:scale-105 shadow-lg shadow-red-600/30 shrink-0"
          >
            INSCREVER-SE NO CANAL
            <ExternalLink className="size-4" />
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayVideos.slice(0, 4).map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid.youtubeId)}
              className="group cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/50 hover:bg-white/10"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <img
                  src={vid.thumbnail || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:opacity-10" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <Play className="size-6 fill-current ml-0.5" />
                  </span>
                </div>

                {vid.duration && (
                  <span className="absolute bottom-2.5 right-2.5 rounded bg-black/80 px-2 py-0.5 text-[10px] font-black text-white backdrop-blur-md">
                    {vid.duration}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-black leading-snug text-white group-hover:text-red-400 transition-colors line-clamp-2">
                  {vid.title}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-white/60 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="size-3" />
                    {vid.views || "Disponível no canal"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 shadow-2xl border border-white/20">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-600 transition"
            >
              <X className="size-6" />
            </button>
            <div className="relative aspect-[16/9]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
