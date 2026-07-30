import { BadgeCheck, CheckCircle2, Send, Undo2, Upload } from "lucide-react";

interface WorkflowActionsProps {
  articleId: string;
  editorialStatus: string;
  publicationStatus: string;
  revisionId?: string | null | undefined;
  articleVersion: number;
  workingCopyVersion: number;
  actions: {
    submit?: ((formData: FormData) => void | Promise<void>) | undefined;
    endorse?: ((formData: FormData) => void | Promise<void>) | undefined;
    requestChanges?: ((formData: FormData) => void | Promise<void>) | undefined;
    approve?: ((formData: FormData) => void | Promise<void>) | undefined;
    publish?: ((formData: FormData) => void | Promise<void>) | undefined;
  };
}

function ActionForm({
  articleId,
  revisionId,
  articleVersion,
  workingCopyVersion,
  action,
  label,
  icon: Icon,
  primary = false,
  requiresReason = false,
}: {
  articleId: string;
  revisionId?: string | null | undefined;
  articleVersion: number;
  workingCopyVersion: number;
  action: (formData: FormData) => void | Promise<void>;
  label: string;
  icon: typeof Send;
  primary?: boolean;
  requiresReason?: boolean;
}) {
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <input name="articleId" type="hidden" value={articleId} />
      <input name="articleVersion" type="hidden" value={articleVersion} />
      <input name="workingCopyVersion" type="hidden" value={workingCopyVersion} />
      {revisionId ? <input name="revisionId" type="hidden" value={revisionId} /> : null}
      {requiresReason ? (
        <label className="min-w-60 flex-1 text-sm font-bold">
          Motivo
          <input
            className="mt-2 min-h-11 w-full rounded-lg border border-[var(--border-control)] px-3 font-normal"
            name="reason"
            required
          />
        </label>
      ) : null}
      <button
        className={
          primary
            ? "inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--brand-purple-800)] px-4 font-bold text-white"
            : "inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border-control)] bg-white px-4 font-bold text-[var(--brand-purple-950)]"
        }
        type="submit"
      >
        <Icon aria-hidden size={18} />
        {label}
      </button>
    </form>
  );
}

export function WorkflowActions({
  articleId,
  revisionId,
  articleVersion,
  workingCopyVersion,
  editorialStatus,
  publicationStatus,
  actions,
}: WorkflowActionsProps) {
  return (
    <section
      aria-labelledby="workflow-title"
      className="rounded-xl border border-[var(--border-subtle)] bg-white p-5"
    >
      <h2
        className="text-lg font-extrabold text-[var(--brand-purple-950)]"
        id="workflow-title"
      >
        Próxima ação editorial
      </h2>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Estado editorial: {editorialStatus}. Publicação: {publicationStatus}.
      </p>
      <div className="mt-5 grid gap-4">
        {actions.submit && editorialStatus !== "IN_REVIEW" ? (
          <ActionForm
            action={actions.submit}
            articleId={articleId}
            articleVersion={articleVersion}
            icon={Send}
            label="Enviar para revisão"
            primary
            revisionId={revisionId}
            workingCopyVersion={workingCopyVersion}
          />
        ) : null}
        {actions.endorse && editorialStatus === "IN_REVIEW" ? (
          <ActionForm
            action={actions.endorse}
            articleId={articleId}
            articleVersion={articleVersion}
            icon={BadgeCheck}
            label="Endossar revisão"
            revisionId={revisionId}
            workingCopyVersion={workingCopyVersion}
          />
        ) : null}
        {actions.requestChanges && editorialStatus === "IN_REVIEW" ? (
          <ActionForm
            action={actions.requestChanges}
            articleId={articleId}
            articleVersion={articleVersion}
            icon={Undo2}
            label="Solicitar alterações"
            requiresReason
            revisionId={revisionId}
            workingCopyVersion={workingCopyVersion}
          />
        ) : null}
        {actions.approve && editorialStatus === "IN_REVIEW" ? (
          <ActionForm
            action={actions.approve}
            articleId={articleId}
            articleVersion={articleVersion}
            icon={CheckCircle2}
            label="Aprovar revisão"
            primary
            revisionId={revisionId}
            workingCopyVersion={workingCopyVersion}
          />
        ) : null}
        {actions.publish && editorialStatus === "APPROVED" ? (
          <ActionForm
            action={actions.publish}
            articleId={articleId}
            articleVersion={articleVersion}
            icon={Upload}
            label="Publicar matéria"
            primary
            revisionId={revisionId}
            workingCopyVersion={workingCopyVersion}
          />
        ) : null}
      </div>
    </section>
  );
}
