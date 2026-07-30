export type EditorialErrorCode =
  | "NOT_FOUND"
  | "FORBIDDEN"
  | "INVALID_STATE"
  | "VALIDATION_FAILED"
  | "CONFLICT"
  | "STALE_REVISION"
  | "REVIEW_REQUIRED"
  | "SLUG_CONFLICT";

export class EditorialError extends Error {
  readonly code: EditorialErrorCode;
  readonly details: Readonly<Record<string, unknown>>;

  constructor(
    code: EditorialErrorCode,
    message: string,
    details: Readonly<Record<string, unknown>> = {},
  ) {
    super(message);
    this.name = "EditorialError";
    this.code = code;
    this.details = details;
  }
}
