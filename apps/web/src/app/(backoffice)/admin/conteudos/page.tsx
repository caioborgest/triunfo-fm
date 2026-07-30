import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { requireActor } from "@/lib/auth";
import { editorialDependencies, toEditorialActor } from "@/lib/editorial";
import { listAdminArticles } from "@/modules/editorial";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Recife",
});

export default async function ContentsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const actor = await requireActor();
  const { q } = await searchParams;
  const search = q?.trim();
  const articles = await listAdminArticles(
    editorialDependencies,
    toEditorialActor(actor),
    search ? { search } : {},
  );

  return (
    <>
      <PageHeader action={{ href: "/admin/conteudos/novo", label: "Nova matéria" }} description="Rascunhos, revisões e publicações usam estados independentes e histórico auditável." eyebrow="CMS" title="Conteúdos" />
      <form className="mb-5 flex gap-2" role="search">
        <label className="sr-only" htmlFor="q">Buscar conteúdo</label>
        <input className="min-h-11 min-w-0 flex-1 rounded-lg border border-[var(--border-control)] bg-white px-4" defaultValue={q} id="q" name="q" placeholder="Buscar por título ou resumo" />
        <button className="rounded-lg bg-[var(--brand-purple-800)] px-5 font-bold text-white" type="submit">Buscar</button>
      </form>
      <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-white">
        <table className="w-full min-w-[780px] border-collapse text-left">
          <thead className="bg-[var(--surface-subtle)] text-sm"><tr><th className="p-4">Matéria</th><th className="p-4">Editorial</th><th className="p-4">Publicação</th><th className="p-4">Atualizada</th><th className="p-4"><span className="sr-only">Ações</span></th></tr></thead>
          <tbody>
            {articles.map((article) => (
              <tr className="border-t border-[var(--border-subtle)]" key={article.id}>
                <td className="p-4"><strong className="block text-[var(--brand-purple-950)]">{article.title || "Rascunho sem título"}</strong><small className="mt-1 block text-[var(--text-secondary)]">{article.categoryName ?? "Sem editoria"} · {article.authorName ?? "Sem autor"}</small></td>
                <td className="p-4"><StatusBadge status={article.editorialStatus} /></td>
                <td className="p-4"><StatusBadge publication status={article.publicationStatus} /></td>
                <td className="p-4 text-sm">{formatter.format(article.updatedAt)}</td>
                <td className="p-4"><div className="flex justify-end gap-2"><Link aria-label={`Editar ${article.title || "matéria"}`} className="grid size-11 place-items-center rounded-lg border border-[var(--border-control)]" href={`/admin/conteudos/${article.id}`}><Pencil aria-hidden size={18} /></Link>{article.publicSlug ? <Link aria-label="Abrir matéria publicada" className="grid size-11 place-items-center rounded-lg border border-[var(--border-control)]" href={`/noticias/${article.publicSlug}`} target="_blank"><ExternalLink aria-hidden size={18} /></Link> : null}</div></td>
              </tr>
            ))}
            {articles.length === 0 ? <tr><td className="p-8 text-center text-[var(--text-secondary)]" colSpan={5}>Nenhuma matéria encontrada.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
