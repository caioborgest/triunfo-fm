import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { requireActor } from "@/lib/auth";
import { editorialDependencies, toEditorialActor } from "@/lib/editorial";
import { listAdminArticles } from "@/modules/editorial";

export default async function EditorialQueuePage() {
  const actor = await requireActor();
  const articles = await listAdminArticles(editorialDependencies, toEditorialActor(actor), { editorialStatus: "IN_REVIEW" });

  return (
    <>
      <PageHeader description="Ações sempre apontam para a revisão editorial atual; revisões obsoletas são recusadas no servidor." eyebrow="Revisão" title="Fila editorial" />
      <div className="grid gap-4">
        {articles.map((article) => <article className="flex flex-col gap-4 rounded-xl border border-[var(--border-subtle)] bg-white p-5 sm:flex-row sm:items-center" key={article.id}><div className="min-w-0 flex-1"><StatusBadge status={article.editorialStatus} /><h2 className="mt-3 truncate text-lg font-extrabold text-[var(--brand-purple-950)]">{article.title}</h2><p className="mt-1 text-sm text-[var(--text-secondary)]">{article.categoryName ?? "Sem editoria"} · {article.authorName ?? "Sem autor"}</p></div><Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-4 font-bold text-white" href={`/admin/conteudos/${article.id}`}>Revisar <ArrowRight aria-hidden size={18} /></Link></article>)}
        {articles.length === 0 ? <p className="rounded-xl border border-dashed border-[var(--border-control)] p-8 text-center text-[var(--text-secondary)]">Não há matérias aguardando revisão.</p> : null}
      </div>
    </>
  );
}
