import { EditorialError } from "./errors";
import type { ArticleState, EditorialStatus, PublicationStatus } from "./types";

export type EditorialAction =
  | "SAVE"
  | "SUBMIT"
  | "REQUEST_CHANGES"
  | "ENDORSE"
  | "APPROVE"
  | "PUBLISH";

export interface TransitionResult {
  readonly editorialStatus: EditorialStatus;
  readonly publicationStatus: PublicationStatus;
}

export function transitionArticle(
  state: ArticleState,
  action: EditorialAction,
): TransitionResult {
  if (state.publicationStatus === "ARCHIVED") {
    throw new EditorialError(
      "INVALID_STATE",
      "Conteúdo arquivado deve ser restaurado antes de qualquer ação editorial.",
      { action },
    );
  }

  switch (action) {
    case "SAVE":
      if (state.editorialStatus === "DRAFT" || state.editorialStatus === "CHANGES_REQUESTED") {
        return state;
      }
      break;
    case "SUBMIT":
      if (state.editorialStatus === "DRAFT" || state.editorialStatus === "CHANGES_REQUESTED") {
        return { ...state, editorialStatus: "IN_REVIEW" };
      }
      break;
    case "REQUEST_CHANGES":
      if (state.editorialStatus === "IN_REVIEW") {
        return { ...state, editorialStatus: "CHANGES_REQUESTED" };
      }
      break;
    case "ENDORSE":
      if (state.editorialStatus === "IN_REVIEW") return state;
      break;
    case "APPROVE":
      if (state.editorialStatus === "IN_REVIEW") {
        return { ...state, editorialStatus: "APPROVED" };
      }
      break;
    case "PUBLISH":
      if (state.editorialStatus === "APPROVED") {
        return { ...state, publicationStatus: "PUBLISHED" };
      }
      break;
  }

  throw new EditorialError("INVALID_STATE", "Transição editorial inválida.", {
    action,
    editorialStatus: state.editorialStatus,
    publicationStatus: state.publicationStatus,
  });
}
