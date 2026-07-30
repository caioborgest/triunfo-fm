import { PageHeader } from "@/components/admin/page-header";
import { getYouTubeVideos } from "@/modules/youtube/queries";
import { addYouTubeVideoAction, deleteYouTubeVideoAction } from "@/modules/youtube/actions";
import { requireActor } from "@/lib/auth";
import { Youtube, Plus, Trash2 } from "lucide-react";

export default async function AdminYouTubePage() {
  await requireActor();
  const videos = await getYouTubeVideos();

  return (
    <div className="space-y-8">
      <PageHeader
        description="Adicione URLs de vídeos do YouTube para exibição automática no portal."
        eyebrow="Multimídia"
        title="Canal do YouTube"
      />

      <section className="rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--brand-purple-950)] mb-4 flex items-center gap-2">
          <Plus className="size-5 text-[var(--brand-purple-800)]" /> Adicionar Novo Vídeo
        </h2>
        <form action={addYouTubeVideoAction} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="youtubeUrl">
              URL do Vídeo no YouTube *
            </label>
            <input
              id="youtubeUrl"
              name="youtubeUrl"
              placeholder="https://www.youtube.com/watch?v=..."
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="url"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="title">
              Título do Vídeo *
            </label>
            <input
              id="title"
              name="title"
              placeholder="Ex: Cobertura Especial - Festa dos Caretas"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="description">
              Descrição (Opcional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Breve resumo sobre o vídeo..."
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isFeatured"
              name="isFeatured"
              value="true"
              className="size-4 rounded text-[var(--brand-purple-800)]"
              type="checkbox"
            />
            <label className="text-sm font-medium text-gray-700" htmlFor="isFeatured">
              Marcar como destaque principal
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--brand-purple-900)]"
          >
            <Youtube size={18} /> Salvar Vídeo
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-[var(--brand-purple-950)]">
          Vídeos Cadastrados ({videos.length})
        </h2>

        {videos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            Nenhum vídeo cadastrado no momento. Insira o primeiro link acima.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div key={video.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between">
                <div className="relative aspect-video bg-black">
                  <img
                    src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="size-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2 flex-1">
                  <h3 className="font-bold text-[var(--brand-purple-950)] line-clamp-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-xs text-gray-600 line-clamp-2">{video.description}</p>
                  )}
                </div>
                <div className="border-t border-gray-100 p-3 bg-gray-50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">ID: {video.youtubeId}</span>
                  <form action={async () => {
                    "use server";
                    await deleteYouTubeVideoAction(video.id);
                  }}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={14} /> Excluir
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
