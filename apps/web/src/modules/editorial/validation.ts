import sanitizeHtml from "sanitize-html";

import { EditorialError } from "./errors";
import type { EditableArticleContent, SourceDraft } from "./types";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function hasIdentifiableSource(source: SourceDraft): boolean {
  const hasIdentity = Boolean(source.name?.trim() || source.url?.trim());
  const needsUrl = ["OFFICIAL", "DOCUMENT", "AGENCY", "RESEARCH", "WEBSITE"].includes(source.kind);
  return hasIdentity && (!needsUrl || Boolean(source.url?.trim()));
}

export function validateWorkingCopyForSubmission(content: EditableArticleContent): void {
  const fields: Record<string, string> = {};
  const plainBody = sanitizeHtml(content.bodyHtml, { allowedTags: [] }).trim();

  if (content.title.trim().length < 5) fields.title = "Informe um título válido.";
  if (content.summary.trim().length < 20) fields.summary = "Informe um resumo editorial.";
  if (!SLUG_PATTERN.test(content.proposedSlug)) fields.proposedSlug = "Use slug minúsculo com hífens.";
  if (plainBody.length < 40) fields.bodyHtml = "O corpo da matéria está vazio ou muito curto.";
  if (!content.authorProfileId) fields.authorProfileId = "Selecione o autor.";
  if (!content.categoryId) fields.categoryId = "Selecione a categoria.";
  if (!content.sources.some(hasIdentifiableSource)) fields.sources = "Informe ao menos uma fonte identificável.";
  if (content.heroMediaAssetId && !content.heroAltText?.trim()) {
    fields.heroAltText = "A imagem principal exige texto alternativo contextual.";
  }
  if ((content.isSponsored || content.contentKind === "SPONSORED") && !content.sponsorDisclosure?.trim()) {
    fields.sponsorDisclosure = "Conteúdo patrocinado exige identificação explícita.";
  }
  if (content.isSponsored !== (content.contentKind === "SPONSORED")) {
    fields.contentKind = "A natureza patrocinada e o disclosure devem ser consistentes.";
  }

  if (Object.keys(fields).length > 0) {
    throw new EditorialError(
      "VALIDATION_FAILED",
      "A matéria ainda não pode ser enviada para revisão.",
      { fields },
    );
  }
}

export function assertNonEmptyReason(reason: string, action: string): void {
  if (reason.trim().length < 5) {
    throw new EditorialError("VALIDATION_FAILED", "Informe uma justificativa clara.", {
      action,
      field: "reason",
    });
  }
}
