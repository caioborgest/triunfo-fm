import { clsx } from "clsx";

const labels: Record<string, string> = {
  DRAFT: "Rascunho",
  IN_REVIEW: "Em revisão",
  CHANGES_REQUESTED: "Alterações solicitadas",
  APPROVED: "Aprovada",
  NEVER_PUBLISHED: "Nunca publicada",
  SCHEDULED: "Agendada",
  PUBLISHED: "No ar",
  UNPUBLISHED: "Retirada",
  ARCHIVED: "Arquivada",
};

export function StatusBadge({
  status,
  publication = false,
}: {
  status: string;
  publication?: boolean;
}) {
  return (
    <span
      className={clsx(
        "inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-bold",
        publication
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-violet-200 bg-violet-50 text-violet-900",
      )}
    >
      {labels[status] ?? status}
    </span>
  );
}
