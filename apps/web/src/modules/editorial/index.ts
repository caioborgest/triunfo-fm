export { EditorialError, type EditorialErrorCode } from "./errors";
export { getAdminArticleById, getEditorialFormOptions } from "./admin-queries";
export { assertGrantAuthorization } from "./permissions";
export { createPrismaEditorialRepository } from "./prisma-repository";
export {
  getPublishedArticleBySlug,
  getPublishedArticles,
  type PublishedArticlesQuery,
} from "./queries";
export type {
  AdminArticleQuery,
  ArticleAndRevision,
  ArticleAndWorkingCopy,
  EditorialRepository,
} from "./repository";
export {
  approveArticleRevision,
  createArticle,
  endorseArticleRevision,
  listAdminArticles,
  publishArticle,
  requestArticleChanges,
  saveWorkingCopy,
  submitArticle,
  type CreateArticleInput,
  type EditorialDependencies,
  type ReviewArticleInput,
  type SaveWorkingCopyInput,
  type SubmitArticleInput,
} from "./service";
export { transitionArticle, type EditorialAction } from "./state-machine";
export type {
  AdminArticleListItem,
  AuthorizationHook,
  ContentKind,
  EditableArticleContent,
  EditorialActor,
  EditorialArticleRecord,
  EditorialStatus,
  JsonValue,
  PermissionGrant,
  PermissionRequest,
  PermissionScope,
  PublicationStatus,
  PublishedArticleDetail,
  PublishedArticleSummary,
  SourceDraft,
  WorkingCopyRecord,
} from "./types";
