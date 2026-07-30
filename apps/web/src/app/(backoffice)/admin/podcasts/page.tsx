import { PageHeader } from "@/components/admin/page-header";
import { getPodcasts } from "@/modules/podcasts/queries";
import { createPodcastAction, deletePodcastAction } from "@/modules/podcasts/actions";
import { requireActor } from "@/lib/auth";
import { Mic, Plus, Trash2, User, Music } from "lucide-react";

export default async function AdminPodcastsPage() {
  await requireActor();
  const podcasts = await getPodcasts();

  return (
    <div className="space-y-8">
      <PageHeader
        description="Gerencie os podcasts originais da rádio e episódios gravados."
        eyebrow="Conteúdo em Áudio"
        title="Podcasts & Episódios"
      />

      <section className="rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--brand-purple-950)] mb-4 flex items-center gap-2">
          <Plus className="size-5 text-[var(--brand-purple-800)]" /> Cadastrar Novo Podcast
        </h2>
        <form action={createPodcastAction} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="title">
              Nome do Podcast *
            </label>
            <input
              id="title"
              name="title"
              placeholder="Ex: Histórias do Pajeú"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="host">
              Apresentador(a) / Host *
            </label>
            <input
              id="host"
              name="host"
              placeholder="Ex: Maria Clara & João Pedro"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="category">
              Categoria
            </label>
            <input
              id="category"
              name="category"
              placeholder="Ex: Cultura & Entrevistas"
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="imageUrl">
              URL da Imagem de Capa
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="url"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="description">
              Descrição do Podcast *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              placeholder="Sobre o que fala este podcast..."
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--brand-purple-900)]"
          >
            <Mic size={18} /> Cadastrar Podcast
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-[var(--brand-purple-950)]">
          Podcasts Cadastrados ({podcasts.length})
        </h2>

        {podcasts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            Nenhum podcast cadastrado no momento. Cadastre o primeiro acima.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between p-5 space-y-3">
                <div className="flex gap-3">
                  {podcast.imageUrl && (
                    <img src={podcast.imageUrl} alt={podcast.title} className="size-16 rounded-lg object-cover flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="font-bold text-[var(--brand-purple-950)]">{podcast.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <User size={12} /> {podcast.host}
                    </p>
                    <span className="mt-1 inline-block text-[11px] font-semibold text-[var(--brand-purple-800)]">
                      {podcast.episodes.length} episódios
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{podcast.description}</p>
                <div className="border-t border-gray-100 pt-3 flex justify-end">
                  <form action={async () => {
                    "use server";
                    await deletePodcastAction(podcast.id);
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
