import React from "react";
import { CheckCircle2, Clock, Send, Globe, RefreshCw, FileText } from "lucide-react";

export interface TimelineRevisionItem {
  id: string;
  version: number;
  checkpoint: "SUBMITTED" | "APPROVED" | "PUBLISHED" | "RESTORED";
  title: string;
  summary: string;
  slug: string;
  createdAt: string | Date;
}

export interface EditorialTimelineProps {
  revisions: TimelineRevisionItem[];
  currentRevisionId?: string | null;
  publishedRevisionId?: string | null;
}

const checkpointIcons = {
  SUBMITTED: <Send className="size-4 text-blue-600" />,
  APPROVED: <CheckCircle2 className="size-4 text-emerald-600" />,
  PUBLISHED: <Globe className="size-4 text-purple-600" />,
  RESTORED: <RefreshCw className="size-4 text-amber-600" />,
};

const checkpointLabels = {
  SUBMITTED: "Enviada para revisão",
  APPROVED: "Aprovada",
  PUBLISHED: "Publicada no portal",
  RESTORED: "Restaurada de versão anterior",
};

export function EditorialTimeline({
  revisions,
  currentRevisionId,
  publishedRevisionId,
}: EditorialTimelineProps) {
  if (!revisions || revisions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--border-subtle)] p-6 text-center text-sm text-[var(--text-secondary)]">
        Nenhuma revisão imutável registrada ainda. Submeta o rascunho para criar a primeira revisão.
      </div>
    );
  }

  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Recife",
  });

  return (
    <section className="rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="size-5 text-[var(--brand-purple-800)]" />
        <h3 className="text-base font-bold text-[var(--brand-purple-950)]">
          Histórico e Timeline Editorial
        </h3>
      </div>
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
        {revisions.map((rev) => {
          const isCurrent = rev.id === currentRevisionId;
          const isPublished = rev.id === publishedRevisionId;
          const dateStr =
            typeof rev.createdAt === "string"
              ? dateFormatter.format(new Date(rev.createdAt))
              : dateFormatter.format(rev.createdAt);

          return (
            <div key={rev.id} className="relative group">
              {/* Timeline marker */}
              <div
                className={`absolute -left-6 top-1 flex size-5 items-center justify-center rounded-full border bg-white ${
                  isPublished
                    ? "border-purple-600 bg-purple-50"
                    : isCurrent
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                {checkpointIcons[rev.checkpoint] || (
                  <FileText className="size-3 text-gray-500" />
                )}
              </div>

              {/* Card content */}
              <div className="rounded-lg border border-[var(--border-subtle)] bg-gray-50/50 p-4 transition-colors hover:bg-gray-50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[var(--brand-purple-950)]">
                      Revisão #{rev.version}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600">
                      {checkpointLabels[rev.checkpoint] ?? rev.checkpoint}
                    </span>
                    {isPublished && (
                      <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-800">
                        No Ar
                      </span>
                    )}
                    {isCurrent && !isPublished && (
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                        Atual em Análise
                      </span>
                    )}
                  </div>
                  <time className="text-xs text-gray-500 font-mono">{dateStr}</time>
                </div>

                <h4 className="mt-2 text-sm font-semibold text-gray-900">{rev.title}</h4>
                {rev.summary && (
                  <p className="mt-1 text-xs text-gray-600 line-clamp-2">{rev.summary}</p>
                )}
                <div className="mt-2 text-[11px] text-gray-400 font-mono">
                  Slug: /noticias/{rev.slug}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
