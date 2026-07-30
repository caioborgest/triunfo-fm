import { createHash } from "node:crypto";

import { EditorialError } from "./errors";
import { assertGrantAuthorization } from "./permissions";
import type {
  AdminArticleQuery,
  ArticleAndRevision,
  ArticleAndWorkingCopy,
  EditorialRepository,
} from "./repository";
import { sanitizeArticleHtml } from "./sanitize";
import { transitionArticle } from "./state-machine";
import type {
  AdminArticleListItem,
  AuthorizationHook,
  EditableArticleContent,
  EditorialActor,
  JsonValue,
} from "./types";
import { assertNonEmptyReason, validateWorkingCopyForSubmission } from "./validation";

export interface EditorialDependencies {
  readonly repository: EditorialRepository;
  readonly authorize?: AuthorizationHook;
  readonly now?: () => Date;
}

export interface CreateArticleInput {
  readonly primaryAuthorProfileId?: string | null;
  readonly assignedReviewerId?: string | null;
  readonly assignedEditorId?: string | null;
}

export interface SaveWorkingCopyInput {
  readonly articleId: string;
  readonly expectedArticleVersion: number;
  readonly expectedWorkingCopyVersion: number;
  readonly content: EditableArticleContent;
}

export interface SubmitArticleInput {
  readonly articleId: string;
  readonly expectedArticleVersion: number;
  readonly expectedWorkingCopyVersion: number;
  readonly changeSummary?: string | null;
}

export interface ReviewArticleInput {
  readonly articleId: string;
  readonly revisionId: string;
  readonly expectedArticleVersion: number;
  readonly comment?: string | null;
}

function authorization(dependencies: EditorialDependencies): AuthorizationHook {
  return dependencies.authorize ?? assertGrantAuthorization;
}

function now(dependencies: EditorialDependencies): Date {
  return dependencies.now?.() ?? new Date();
}

function emptyBody(): JsonValue {
  return { type: "doc", content: [] };
}

function blankContent(authorProfileId: string | null): EditableArticleContent {
  return {
    title: "",
    subtitle: null,
    proposedSlug: "",
    summary: "",
    bodyJson: emptyBody(),
    bodyHtml: "",
    authorProfileId,
    categoryId: null,
    heroMediaAssetId: null,
    heroAltText: null,
    heroCaption: null,
    heroCredit: null,
    location: null,
    occurredAt: null,
    contentKind: "NEWS",
    isExclusive: false,
    isSponsored: false,
    sponsorDisclosure: null,
    isSensitive: false,
    allowComments: false,
    tagIds: [],
    sources: [],
    mediaUsages: [],
    seoDraft: null,
    geoDraft: null,
  };
}

function assignedUsers(article: {
  readonly assignedReviewerId: string | null;
  readonly assignedEditorId: string | null;
}): readonly string[] {
  return [article.assignedReviewerId, article.assignedEditorId].filter(
    (value): value is string => value !== null,
  );
}

function sanitizedContent(content: EditableArticleContent): EditableArticleContent {
  return { ...content, bodyHtml: sanitizeArticleHtml(content.bodyHtml) };
}

function contentHash(content: EditableArticleContent): string {
  return createHash("sha256")
    .update(JSON.stringify({ ...content, occurredAt: content.occurredAt?.toISOString() ?? null }))
    .digest("hex");
}

function assertArticleExists<T>(record: T | null, entity: string): T {
  if (!record) throw new EditorialError("NOT_FOUND", `${entity} não encontrado.`);
  return record;
}

export async function listAdminArticles(
  dependencies: EditorialDependencies,
  actor: EditorialActor,
  query: AdminArticleQuery = {},
): Promise<readonly AdminArticleListItem[]> {
  await authorization(dependencies)(actor, { resource: "article", action: "view" });
  return dependencies.repository.listAdminArticles(query);
}

export async function createArticle(
  dependencies: EditorialDependencies,
  actor: EditorialActor,
  input: CreateArticleInput = {},
): Promise<ArticleAndWorkingCopy> {
  await authorization(dependencies)(actor, { resource: "article", action: "create" });
  const authorProfileId = input.primaryAuthorProfileId ?? null;
  return dependencies.repository.createDraft({
    actorId: actor.id,
    primaryAuthorProfileId: authorProfileId,
    assignedReviewerId: input.assignedReviewerId ?? null,
    assignedEditorId: input.assignedEditorId ?? null,
    initialContent: blankContent(authorProfileId),
    occurredAt: now(dependencies),
  });
}

export async function saveWorkingCopy(
  dependencies: EditorialDependencies,
  actor: EditorialActor,
  input: SaveWorkingCopyInput,
): Promise<ArticleAndWorkingCopy> {
  const article = assertArticleExists(
    await dependencies.repository.getArticle(input.articleId),
    "Artigo",
  );
  await authorization(dependencies)(actor, {
    resource: "article",
    action: "edit",
    ownerId: article.createdById,
    assignedUserIds: assignedUsers(article),
  });
  transitionArticle(article, "SAVE");
  return dependencies.repository.saveWorkingCopy({
    articleId: input.articleId,
    actorId: actor.id,
    expectedArticleVersion: input.expectedArticleVersion,
    expectedWorkingCopyVersion: input.expectedWorkingCopyVersion,
    content: sanitizedContent(input.content),
    occurredAt: now(dependencies),
  });
}

export async function submitArticle(
  dependencies: EditorialDependencies,
  actor: EditorialActor,
  input: SubmitArticleInput,
): Promise<ArticleAndRevision> {
  const article = assertArticleExists(
    await dependencies.repository.getArticle(input.articleId),
    "Artigo",
  );
  const workingCopy = assertArticleExists(
    await dependencies.repository.getWorkingCopy(input.articleId),
    "Working copy",
  );
  await authorization(dependencies)(actor, {
    resource: "article",
    action: "submit",
    ownerId: article.createdById,
    assignedUserIds: assignedUsers(article),
  });
  transitionArticle(article, "SUBMIT");
  const content = sanitizedContent(workingCopy);
  validateWorkingCopyForSubmission(content);
  return dependencies.repository.submitRevision({
    articleId: input.articleId,
    actorId: actor.id,
    expectedArticleVersion: input.expectedArticleVersion,
    expectedWorkingCopyVersion: input.expectedWorkingCopyVersion,
    content,
    contentHash: contentHash(content),
    changeSummary: input.changeSummary?.trim() || null,
    occurredAt: now(dependencies),
  });
}

async function loadReviewTarget(
  dependencies: EditorialDependencies,
  actor: EditorialActor,
  input: ReviewArticleInput,
  action: "request_changes" | "review" | "approve",
) {
  const article = assertArticleExists(
    await dependencies.repository.getArticle(input.articleId),
    "Artigo",
  );
  const revision = assertArticleExists(
    await dependencies.repository.getRevision(input.revisionId),
    "Revisão",
  );
  if (revision.articleId !== article.id || article.currentRevisionId !== revision.id) {
    throw new EditorialError("STALE_REVISION", "A revisão não é mais a versão editorial atual.");
  }
  await authorization(dependencies)(actor, {
    resource: "article",
    action,
    ownerId: article.createdById,
    assignedUserIds: assignedUsers(article),
  });
  return { article, revision };
}

export async function requestArticleChanges(
  dependencies: EditorialDependencies,
  actor: EditorialActor,
  input: ReviewArticleInput & { readonly comment: string },
) {
  const { article } = await loadReviewTarget(dependencies, actor, input, "request_changes");
  transitionArticle(article, "REQUEST_CHANGES");
  assertNonEmptyReason(input.comment, "request_changes");
  return dependencies.repository.recordReview({
    articleId: input.articleId,
    revisionId: input.revisionId,
    actorId: actor.id,
    expectedArticleVersion: input.expectedArticleVersion,
    decision: "CHANGES_REQUESTED",
    comment: input.comment.trim(),
    occurredAt: now(dependencies),
  });
}

export async function endorseArticleRevision(
  dependencies: EditorialDependencies,
  actor: EditorialActor,
  input: ReviewArticleInput,
) {
  const { article } = await loadReviewTarget(dependencies, actor, input, "review");
  transitionArticle(article, "ENDORSE");
  return dependencies.repository.recordReview({
    articleId: input.articleId,
    revisionId: input.revisionId,
    actorId: actor.id,
    expectedArticleVersion: input.expectedArticleVersion,
    decision: "ENDORSED",
    comment: input.comment?.trim() || null,
    occurredAt: now(dependencies),
  });
}

export async function approveArticleRevision(
  dependencies: EditorialDependencies,
  actor: EditorialActor,
  input: ReviewArticleInput,
): Promise<ArticleAndRevision> {
  const { article } = await loadReviewTarget(dependencies, actor, input, "approve");
  transitionArticle(article, "APPROVE");
  if (!(await dependencies.repository.hasEndorsement(input.revisionId))) {
    throw new EditorialError("REVIEW_REQUIRED", "A revisão precisa de endosso antes da aprovação.");
  }
  return dependencies.repository.approveRevision({
    articleId: input.articleId,
    revisionId: input.revisionId,
    actorId: actor.id,
    expectedArticleVersion: input.expectedArticleVersion,
    note: input.comment?.trim() || null,
    occurredAt: now(dependencies),
  });
}

export async function publishArticle(
  dependencies: EditorialDependencies,
  actor: EditorialActor,
  input: Omit<ReviewArticleInput, "comment">,
): Promise<ArticleAndRevision> {
  const article = assertArticleExists(
    await dependencies.repository.getArticle(input.articleId),
    "Artigo",
  );
  const revision = assertArticleExists(
    await dependencies.repository.getRevision(input.revisionId),
    "Revisão",
  );
  if (
    revision.articleId !== article.id ||
    article.currentRevisionId !== revision.id ||
    article.approvedRevisionId !== revision.id
  ) {
    throw new EditorialError("STALE_REVISION", "Somente a revisão atual e aprovada pode ser publicada.");
  }
  await authorization(dependencies)(actor, {
    resource: "article",
    action: "publish",
    ownerId: article.createdById,
    assignedUserIds: assignedUsers(article),
  });
  transitionArticle(article, "PUBLISH");
  return dependencies.repository.publishRevision({
    articleId: input.articleId,
    revisionId: input.revisionId,
    actorId: actor.id,
    expectedArticleVersion: input.expectedArticleVersion,
    occurredAt: now(dependencies),
  });
}
