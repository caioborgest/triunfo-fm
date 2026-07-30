import { PageHeader } from "@/components/admin/page-header";
import { getSponsors } from "@/modules/sponsors/queries";
import { createSponsorAction, deleteSponsorAction } from "@/modules/sponsors/actions";
import { requireActor } from "@/lib/auth";
import { Megaphone, Plus, Trash2, ExternalLink } from "lucide-react";

export default async function AdminAnunciantesPage() {
  await requireActor();
  const sponsors = await getSponsors();

  return (
    <div className="space-y-8">
      <PageHeader
        description="Cadastre banners e marcas patrocinadoras da Rádio Triunfo FM para inserção estratégica no portal."
        eyebrow="Monetização & Mídia"
        title="Patrocinadores e Anunciantes"
      />

      <section className="rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--brand-purple-950)] mb-4 flex items-center gap-2">
          <Plus className="size-5 text-[var(--brand-purple-800)]" /> Cadastrar Novo Patrocinador
        </h2>
        <form action={createSponsorAction} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">
              Nome do Anunciante / Marca *
            </label>
            <input
              id="name"
              name="name"
              placeholder="Ex: Pousada Baixa Verde"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="imageUrl">
              URL da Imagem do Banner / Anexo *
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              placeholder="https://... (URL da imagem ou anexo do banner)"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="url"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="linkUrl">
              Link de Destino / Website *
            </label>
            <input
              id="linkUrl"
              name="linkUrl"
              placeholder="https://... (Link para onde o usuário será redirecionado)"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
              type="url"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="placement">
              Espaço Estratégico de Exibição (Placement) *
            </label>
            <select
              id="placement"
              name="placement"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[var(--brand-purple-800)] focus:outline-none"
            >
              <option value="HOME_PATROCINADORES">Carrossel de Patrocinadores da Capa (Homepage)</option>
              <option value="NOTICIA_SIDEBAR">Barra Lateral de Notícias (Sidebar)</option>
              <option value="HEADER_BANNER">Topo do Site (Oferecimento Rádio)</option>
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--brand-purple-900)]"
          >
            <Megaphone size={18} /> Salvar Patrocinador
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-[var(--brand-purple-950)]">
          Patrocinadores Ativos ({sponsors.length})
        </h2>

        {sponsors.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            Nenhum patrocinador cadastrado no momento. Cadastre a primeira marca acima.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between p-5 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-md bg-[var(--brand-gold-500)]/20 px-2 py-0.5 text-xs font-bold text-[var(--brand-purple-950)]">
                      {sponsor.placement}
                    </span>
                  </div>
                  <div className="aspect-[3/1] bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-100 overflow-hidden">
                    <img src={sponsor.imageUrl} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <h3 className="font-bold text-[var(--brand-purple-950)]">{sponsor.name}</h3>
                  <a
                    href={sponsor.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[var(--brand-purple-800)] hover:underline flex items-center gap-1 truncate"
                  >
                    <ExternalLink size={12} /> {sponsor.linkUrl}
                  </a>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-end">
                  <form action={async () => {
                    "use server";
                    await deleteSponsorAction(sponsor.id);
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
