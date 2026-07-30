import { PageHeader } from "@/components/admin/page-header";
import { getTouristSpots } from "@/modules/turismo/queries";
import { createTouristSpotAction, deleteTouristSpotAction } from "@/modules/turismo/actions";
import { requireActor } from "@/lib/auth";
import { Compass, Plus, Trash2, MapPin } from "lucide-react";

export default async function AdminTurismoPage() {
  await requireActor();
  const spots = await getTouristSpots();

  return (
    <div className="space-y-8">
      <PageHeader
        description="Gerencie os pontos turísticos, atrativos naturais, ecoturismo e estabelecimentos de Triunfo."
        eyebrow="Turismo & Guia"
        title="Pontos Turísticos"
      />

      <section className="rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--brand-purple-950)] mb-4 flex items-center gap-2">
          <Plus className="size-5 text-[var(--brand-purple-800)]" /> Cadastrar Novo Ponto Turístico
        </h2>
        <form action={createTouristSpotAction} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">
              Nome do Ponto / Estabelecimento *
            </label>
            <input
              id="name"
              name="name"
              placeholder="Ex: Pico do Papagaio"
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
              <option value="Aventura & Vista Panorâmica">Aventura & Vista Panorâmica</option>
              <option value="Natureza & Ecoturismo">Natureza & Ecoturismo</option>
              <option value="Patrimônio Histórico & Cultura">Patrimônio Histórico & Cultura</option>
              <option value="Lazer & Cartão Postal">Lazer & Cartão Postal</option>
              <option value="Gastronomia & Tradição">Gastronomia & Tradição</option>
              <option value="Hospedagem">Hospedagem</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="location">
              Localização / Endereço *
            </label>
            <input
              id="location"
              name="location"
              placeholder="Ex: Zona Rural (12 km do centro), Triunfo - PE"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="hours">
              Horário de Funcionamento
            </label>
            <input
              id="hours"
              name="hours"
              placeholder="Ex: Terça a Domingo, das 08h às 17h"
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
              Descrição *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              placeholder="Descreva a atração e sua importância..."
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="highlights">
              Destaques (Separados por vírgula)
            </label>
            <input
              id="highlights"
              name="highlights"
              placeholder="Ex: Ponto mais alto de PE, Pôr do sol, Trilhas ecológicas"
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--brand-purple-900)]"
          >
            <Compass size={18} /> Salvar Ponto Turístico
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-[var(--brand-purple-950)]">
          Pontos Turísticos Cadastrados ({spots.length})
        </h2>

        {spots.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            Nenhum ponto turístico cadastrado no momento. Insira o primeiro acima.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot) => (
              <div key={spot.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between">
                {spot.imageUrl && (
                  <div className="relative aspect-video bg-gray-100">
                    <img src={spot.imageUrl} alt={spot.name} className="size-full object-cover" />
                  </div>
                )}
                <div className="p-4 space-y-2 flex-1">
                  <span className="inline-block rounded-md bg-[var(--brand-purple-100)] px-2 py-0.5 text-xs font-bold text-[var(--brand-purple-800)]">
                    {spot.category}
                  </span>
                  <h3 className="font-bold text-[var(--brand-purple-950)]">{spot.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} /> {spot.location}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">{spot.description}</p>
                </div>
                <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-end">
                  <form action={async () => {
                    "use server";
                    await deleteTouristSpotAction(spot.id);
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
