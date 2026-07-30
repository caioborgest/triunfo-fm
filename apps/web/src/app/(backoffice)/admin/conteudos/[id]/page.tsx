import { notFound } from "next/navigation";
import { can } from "@triunfo/auth";
import { ArticleEditorForm } from "@/components/admin/article-editor-form";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { WorkflowActions } from "@/components/admin/workflow-actions";
import { requireActor } from "@/lib/auth";
import { EditorialTimeline } from "@/components/admin/editorial-timeline";
import { getAdminArticleById, getEditorialFormOptions } from "@/modules/editorial";
import {
  approveArticleAction,
  endorseArticleAction,
  publishArticleAction,
  requestChangesAction,
  saveArticleAction,
  submitArticleAction,
} from "../../actions";

const notices: Record<string, string> = {
  created: "Matéria criada e rascunho salvo.",
  saved: "Rascunho salvo.",
  submitted: "Revisão imutável criada e enviada para a fila editorial.",
  endorsed: "Revisão endossada.",
  approved: "Revisão aprovada.",
  published: "Matéria publicada e portal revalidado.",
  "changes-requested": "Alterações solicitadas ao autor.",
};

export default async function EditArticlePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ id }, query, actor, options] = await Promise.all([params, searchParams, requireActor(), getEditorialFormOptions()]);
  const record = await getAdminArticleById(id);
  if (!record) notFound();
  const { article, workingCopy, currentRevision, revisions } = record;
  const context = { ownerId: article.createdById, assignedUserIds: [article.assignedReviewerId, article.assignedEditorId].filter((value): value is string => Boolean(value)) };
  const notice = Object.keys(notices).find((key) => query[key] !== undefined);
  const primarySource = workingCopy.sources[0];

  return (
    <>
      <PageHeader description="A working copy pode mudar sem alterar a revisão já publicada." eyebrow="CMS" title={workingCopy.title || "Rascunho sem título"} />
      {notice ? <p className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-900" role="status">{notices[notice]}</p> : null}
      <div className="mb-6 flex flex-wrap gap-2"><StatusBadge status={article.editorialStatus} /><StatusBadge publication status={article.publicationStatus} /></div>
      {can(actor, "article.edit", context) ? (
        <ArticleEditorForm
          action={saveArticleAction}
          articleId={article.id}
          articleVersion={article.lockVersion}
          authors={options.authors}
          categories={options.categories}
          submitLabel="Salvar alterações"
          values={{
            title: workingCopy.title,
            subtitle: workingCopy.subtitle ?? undefined,
            summary: workingCopy.summary,
            proposedSlug: workingCopy.proposedSlug,
            bodyJson: JSON.stringify(workingCopy.bodyJson),
            authorProfileId: workingCopy.authorProfileId ?? undefined,
            categoryId: workingCopy.categoryId ?? undefined,
            contentKind: workingCopy.contentKind,
            location: workingCopy.location ?? undefined,
            sponsorDisclosure: workingCopy.sponsorDisclosure ?? undefined,
            isExclusive: workingCopy.isExclusive,
            isSensitive: workingCopy.isSensitive,
            sourceName: primarySource?.name ?? undefined,
            sourceUrl: primarySource?.url ?? undefined,
          }}
          workingCopyVersion={workingCopy.lockVersion}
        />
      ) : <p className="rounded-lg border border-amber-200 bg-amber-50 p-4">Você pode consultar esta matéria, mas não editar a working copy.</p>}
      <div className="mt-7">
        <WorkflowActions
          actions={{
            submit: can(actor, "article.submit", context) ? submitArticleAction : undefined,
            endorse: can(actor, "article.review", context) ? endorseArticleAction : undefined,
            requestChanges: can(actor, "article.request_changes", context) ? requestChangesAction : undefined,
            approve: can(actor, "article.approve", context) ? approveArticleAction : undefined,
            publish: can(actor, "article.publish", context) ? publishArticleAction : undefined,
          }}
          articleId={article.id}
          articleVersion={article.lockVersion}
          editorialStatus={article.editorialStatus}
          publicationStatus={article.publicationStatus}
          revisionId={currentRevision?.id}
          workingCopyVersion={workingCopy.lockVersion}
        />
      </div>
      <div className="mt-7">
        <EditorialTimeline
          currentRevisionId={article.currentRevisionId}
          publishedRevisionId={article.publishedRevisionId}
          revisions={revisions}
        />
      </div>
    </>
  );
}
