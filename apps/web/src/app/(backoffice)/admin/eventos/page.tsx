import { PageHeader } from "@/components/admin/page-header";
import { getEvents } from "@/modules/eventos/queries";
import { createEventAction, deleteEventAction } from "@/modules/eventos/actions";
import { requireActor } from "@/lib/auth";
import { Calendar, Plus, Trash2, MapPin, Clock } from "lucide-react";

export default async function AdminEventosPage() {
  await requireActor();
  const events = await getEvents();

  return (
    <div className="space-y-8">
      <PageHeader
        description="Gerencie a agenda cultural, festividades e eventos da cidade de Triunfo."
        eyebrow="Agenda Cultural"
        title="Eventos da Cidade"
      />

      <section className="rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--brand-purple-950)] mb-4 flex items-center gap-2">
          <Plus className="size-5 text-[var(--brand-purple-800)]" /> Cadastrar Novo Evento
        </h2>
        <form action={createEventAction} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="title">
              Nome do Evento *
            </label>
            <input
              id="title"
              name="title"
              placeholder="Ex: Festa do Estudante de Triunfo"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="category">
              Categoria *
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
            >
              <option value="Música & Festival">Música & Festival</option>
              <option value="Cultura & Tradição">Cultura & Tradição</option>
              <option value="Cinema & Arte">Cinema & Arte</option>
              <option value="Religioso & Padroeira">Religioso & Padroeira</option>
              <option value="Esporte & Lazer">Esporte & Lazer</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="startDate">
                Data de Início *
              </label>
              <input
                id="startDate"
                name="startDate"
                required
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
                type="date"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="timeText">
                Horários / Período
              </label>
              <input
                id="timeText"
                name="timeText"
                placeholder="Ex: A partir das 19h00"
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
                type="text"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="location">
              Local do Evento *
            </label>
            <input
              id="location"
              name="location"
              placeholder="Ex: Pátio de Eventos Maestro Madureira, Centro"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="imageUrl">
              URL da Imagem / Banner
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
              Descrição do Evento *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              placeholder="Detalhes sobre a programação, atrações e informações do evento..."
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
              Destaque na capa do portal
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--brand-purple-900)]"
          >
            <Calendar size={18} /> Cadastrar Evento
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-[var(--brand-purple-950)]">
          Eventos Cadastrados ({events.length})
        </h2>

        {events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            Nenhum evento cadastrado no momento. Insira o primeiro acima.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between">
                {event.imageUrl && (
                  <div className="relative aspect-video bg-gray-100">
                    <img src={event.imageUrl} alt={event.title} className="size-full object-cover" />
                  </div>
                )}
                <div className="p-4 space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-md bg-[var(--brand-purple-100)] px-2 py-0.5 text-xs font-bold text-[var(--brand-purple-800)]">
                      {event.category}
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <Clock size={12} /> {new Date(event.startDate).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <h3 className="font-bold text-[var(--brand-purple-950)]">{event.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} /> {event.location}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">{event.description}</p>
                </div>
                <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-end">
                  <form action={async () => {
                    "use server";
                    await deleteEventAction(event.id);
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
