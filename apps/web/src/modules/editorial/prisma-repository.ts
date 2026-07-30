import {
  Prisma,
  type PrismaClient,
  prisma as defaultPrisma,
} from "@triunfo/database";

import { EditorialError } from "./errors";
import type {
  AdminArticleQuery,
  ApproveRevisionCommand,
  ArticleAndRevision,
  ArticleAndWorkingCopy,
  CreateDraftCommand,
  EditorialRepository,
  PublishRevisionCommand,
  RecordReviewCommand,
  SaveWorkingCopyCommand,
  SubmitRevisionCommand,
} from "./repository";
import type {
  AdminArticleListItem,
  ArticleRevisionRecord,
  EditableArticleContent,
  EditorialArticleRecord,
  JsonValue,
  MediaUsageDraft,
  SourceDraft,
  WorkingCopyRecord,
} from "./types";

const articleSelect = {
  id: true,
  editorialStatus: true,
  publicationStatus: true,
  publicSlug: true,
  currentRevisionId: true,
  approvedRevisionId: true,
  publishedRevisionId: true,
  assignedReviewerId: true,
  assignedEditorId: true,
  createdById: true,
  lockVersion: true,
  deletedAt: true,
} satisfies Prisma.ArticleSelect;

const workingCopySelect = {
  articleId: true,
  basedOnRevisionId: true,
  title: true,
  subtitle: true,
  proposedSlug: true,
  summary: true,
  bodyJson: true,
  bodyHtml: true,
  authorProfileId: true,
  categoryId: true,
  heroMediaAssetId: true,
  heroAltText: true,
  heroCaption: true,
  heroCredit: true,
  location: true,
  occurredAt: true,
  contentKind: true,
  isExclusive: true,
  isSponsored: true,
  sponsorDisclosure: true,
  isSensitive: true,
  allowComments: true,
  tagIds: true,
  sources: true,
  mediaUsages: true,
  seoDraft: true,
  geoDraft: true,
  lockVersion: true,
  updatedAt: true,
} satisfies Prisma.ArticleWorkingCopySelect;

const revisionSelect = {
  id: true,
  articleId: true,
  version: true,
  slug: true,
  title: true,
  summary: true,
  bodyHtml: true,
  createdAt: true,
} satisfies Prisma.ArticleRevisionSelect;

type ArticleRow = Prisma.ArticleGetPayload<{ select: typeof articleSelect }>;
type WorkingCopyRow = Prisma.ArticleWorkingCopyGetPayload<{
  select: typeof workingCopySelect;
}>;
type RevisionRow = Prisma.ArticleRevisionGetPayload<{ select: typeof revisionSelect }>;

function toArticle(row: ArticleRow): EditorialArticleRecord {
  return row;
}

function toJsonValue(value: Prisma.JsonValue): JsonValue {
  return value as JsonValue;
}

function toInputJson(value: JsonValue): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

function toSources(value: Prisma.JsonValue): readonly SourceDraft[] {
  return value as unknown as readonly SourceDraft[];
}

function toMediaUsages(value: Prisma.JsonValue): readonly MediaUsageDraft[] {
  return value as unknown as readonly MediaUsageDraft[];
}

function toStringIds(value: Prisma.JsonValue): readonly string[] {
  return value as unknown as readonly string[];
}

function toWorkingCopy(row: WorkingCopyRow): WorkingCopyRecord {
  return {
    ...row,
    bodyJson: toJsonValue(row.bodyJson),
    tagIds: toStringIds(row.tagIds),
    sources: toSources(row.sources),
    mediaUsages: toMediaUsages(row.mediaUsages),
    seoDraft: row.seoDraft === null ? null : toJsonValue(row.seoDraft),
    geoDraft: row.geoDraft === null ? null : toJsonValue(row.geoDraft),
  };
}

function toRevision(row: RevisionRow): ArticleRevisionRecord {
  return row;
}

function isObject(value: JsonValue | null): value is { readonly [key: string]: JsonValue } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function optionalString(
  object: { readonly [key: string]: JsonValue },
  key: string,
): string | null {
  const value = object[key];
  return typeof value === "string" && value.trim() ? value : null;
}

function optionalJson(
  object: { readonly [key: string]: JsonValue },
  key: string,
): Prisma.InputJsonValue | undefined {
  const value = object[key];
  return value === undefined || value === null ? undefined : toInputJson(value);
}

function seoCreate(content: EditableArticleContent): Prisma.SeoMetadataCreateWithoutRevisionInput | undefined {
  if (!isObject(content.seoDraft)) return undefined;
  return {
    seoTitle: optionalString(content.seoDraft, "seoTitle"),
    metaDescription: optionalString(content.seoDraft, "metaDescription"),
    canonicalUrlOverride: optionalString(content.seoDraft, "canonicalUrlOverride"),
    ogTitle: optionalString(content.seoDraft, "ogTitle"),
    ogDescription: optionalString(content.seoDraft, "ogDescription"),
    twitterCard: optionalString(content.seoDraft, "twitterCard"),
  };
}

function geoCreate(content: EditableArticleContent): Prisma.GeoMetadataCreateWithoutRevisionInput | undefined {
  if (!isObject(content.geoDraft)) return undefined;
  return {
    shortAnswer: optionalString(content.geoDraft, "shortAnswer"),
    executiveSummary: optionalString(content.geoDraft, "executiveSummary"),
    context: optionalString(content.geoDraft, "context"),
    whatHappened: optionalString(content.geoDraft, "whatHappened"),
    whereHappened: optionalString(content.geoDraft, "whereHappened"),
    whenHappened: optionalString(content.geoDraft, "whenHappened"),
    whoIsInvolved: optionalString(content.geoDraft, "whoIsInvolved"),
    whyRelevant: optionalString(content.geoDraft, "whyRelevant"),
    whatHappensNext: optionalString(content.geoDraft, "whatHappensNext"),
    keyFacts: optionalJson(content.geoDraft, "keyFacts") ?? Prisma.DbNull,
    entities: optionalJson(content.geoDraft, "entities") ?? Prisma.DbNull,
    relevantDates: optionalJson(content.geoDraft, "relevantDates") ?? Prisma.DbNull,
    numbers: optionalJson(content.geoDraft, "numbers") ?? Prisma.DbNull,
    faqs: optionalJson(content.geoDraft, "faqs") ?? Prisma.DbNull,
  };
}

function editableData(content: EditableArticleContent, actorId: string) {
  return {
    title: content.title,
    subtitle: content.subtitle,
    proposedSlug: content.proposedSlug,
    summary: content.summary,
    bodyJson: toInputJson(content.bodyJson),
    bodyHtml: content.bodyHtml,
    authorProfileId: content.authorProfileId,
    categoryId: content.categoryId,
    heroMediaAssetId: content.heroMediaAssetId,
    heroAltText: content.heroAltText,
    heroCaption: content.heroCaption,
    heroCredit: content.heroCredit,
    location: content.location,
    occurredAt: content.occurredAt,
    contentKind: content.contentKind,
    isExclusive: content.isExclusive,
    isSponsored: content.isSponsored,
    sponsorDisclosure: content.sponsorDisclosure,
    isSensitive: content.isSensitive,
    allowComments: content.allowComments,
    tagIds: toInputJson(content.tagIds as JsonValue),
    sources: toInputJson(content.sources as unknown as JsonValue),
    mediaUsages: toInputJson(content.mediaUsages as unknown as JsonValue),
    seoDraft: content.seoDraft === null ? Prisma.DbNull : toInputJson(content.seoDraft),
    geoDraft: content.geoDraft === null ? Prisma.DbNull : toInputJson(content.geoDraft),
    updatedById: actorId,
  } satisfies Prisma.ArticleWorkingCopyUncheckedUpdateInput;
}

function dateOrNull(value: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : date;
}

function sourceCreates(sources: readonly SourceDraft[]) {
  return sources.map((source, position) => ({
    sourceClass: source.sourceClass,
    kind: source.kind,
    name: source.name,
    publisher: source.publisher,
    title: source.title,
    url: source.url,
    publishedAt: dateOrNull(source.publishedAt),
    accessedAt: dateOrNull(source.accessedAt),
    publicNote: source.publicNote,
    isOfficial: source.isOfficial,
    position,
  }));
}

function mediaCreates(content: EditableArticleContent) {
  const media: Prisma.ArticleRevisionMediaCreateWithoutRevisionInput[] = [];
  if (content.heroMediaAssetId) {
    media.push({
      mediaAsset: { connect: { id: content.heroMediaAssetId } },
      role: "HERO",
      position: 0,
      altText: content.heroAltText,
      caption: content.heroCaption,
      credit: content.heroCredit,
    });
  }
  for (const usage of content.mediaUsages) {
    media.push({
      mediaAsset: { connect: { id: usage.mediaAssetId } },
      role: usage.role,
      position: usage.position,
      altText: usage.altText,
      caption: usage.caption,
      credit: usage.credit,
    });
  }
  return media;
}

function errorCode(error: unknown): string | null {
  if (typeof error !== "object" || error === null || !("code" in error)) return null;
  return typeof error.code === "string" ? error.code : null;
}

function translateDatabaseError(error: unknown): never {
  const code = errorCode(error);
  if (code === "P2002") {
    throw new EditorialError("SLUG_CONFLICT", "O slug já pertence a outro conteúdo.");
  }
  if (code === "P2025" || code === "P2034") {
    throw new EditorialError("CONFLICT", "O conteúdo mudou durante a operação. Recarregue e tente novamente.");
  }
  throw error;
}

async function fetchPair(
  tx: Prisma.TransactionClient,
  articleId: string,
): Promise<ArticleAndWorkingCopy> {
  const [article, workingCopy] = await Promise.all([
    tx.article.findUnique({ where: { id: articleId }, select: articleSelect }),
    tx.articleWorkingCopy.findUnique({ where: { articleId }, select: workingCopySelect }),
  ]);
  if (!article || !workingCopy) {
    throw new EditorialError("NOT_FOUND", "Artigo ou working copy não encontrado.");
  }
  return { article: toArticle(article), workingCopy: toWorkingCopy(workingCopy) };
}

async function fetchArticleRevision(
  tx: Prisma.TransactionClient,
  articleId: string,
  revisionId: string,
): Promise<ArticleAndRevision> {
  const [article, revision] = await Promise.all([
    tx.article.findUnique({ where: { id: articleId }, select: articleSelect }),
    tx.articleRevision.findUnique({ where: { id: revisionId }, select: revisionSelect }),
  ]);
  if (!article || !revision) throw new EditorialError("NOT_FOUND", "Artigo ou revisão não encontrado.");
  return { article: toArticle(article), revision: toRevision(revision) };
}

export function createPrismaEditorialRepository(
  client: PrismaClient = defaultPrisma,
): EditorialRepository {
  return {
    async listAdminArticles(query: AdminArticleQuery): Promise<readonly AdminArticleListItem[]> {
      const rows = await client.article.findMany({
        where: {
          deletedAt: null,
          ...(query.editorialStatus ? { editorialStatus: query.editorialStatus } : {}),
          ...(query.publicationStatus ? { publicationStatus: query.publicationStatus } : {}),
          ...(query.assignedToUserId
            ? {
                OR: [
                  { assignedReviewerId: query.assignedToUserId },
                  { assignedEditorId: query.assignedToUserId },
                ],
              }
            : {}),
          ...(query.search
            ? {
                workingCopy: {
                  is: {
                    OR: [
                      { title: { contains: query.search, mode: "insensitive" } },
                      { summary: { contains: query.search, mode: "insensitive" } },
                    ],
                  },
                },
              }
            : {}),
        },
        select: {
          id: true,
          editorialStatus: true,
          publicationStatus: true,
          publicSlug: true,
          assignedReviewerId: true,
          assignedEditorId: true,
          updatedAt: true,
          publishedAt: true,
          workingCopy: {
            select: {
              title: true,
              proposedSlug: true,
              authorProfile: { select: { displayName: true } },
              category: { select: { name: true } },
            },
          },
        },
        orderBy: { updatedAt: "desc" },
        take: Math.min(Math.max(query.limit ?? 50, 1), 100),
        skip: Math.max(query.offset ?? 0, 0),
      });
      return rows.map((row) => ({
        id: row.id,
        editorialStatus: row.editorialStatus,
        publicationStatus: row.publicationStatus,
        title: row.workingCopy?.title ?? "",
        proposedSlug: row.workingCopy?.proposedSlug ?? "",
        publicSlug: row.publicSlug,
        authorName: row.workingCopy?.authorProfile?.displayName ?? null,
        categoryName: row.workingCopy?.category?.name ?? null,
        updatedAt: row.updatedAt,
        publishedAt: row.publishedAt,
        assignedReviewerId: row.assignedReviewerId,
        assignedEditorId: row.assignedEditorId,
      }));
    },

    async getArticle(articleId) {
      const row = await client.article.findFirst({
        where: { id: articleId, deletedAt: null },
        select: articleSelect,
      });
      return row ? toArticle(row) : null;
    },

    async getWorkingCopy(articleId) {
      const row = await client.articleWorkingCopy.findUnique({
        where: { articleId },
        select: workingCopySelect,
      });
      return row ? toWorkingCopy(row) : null;
    },

    async getRevision(revisionId) {
      const row = await client.articleRevision.findUnique({
        where: { id: revisionId },
        select: revisionSelect,
      });
      return row ? toRevision(row) : null;
    },

    async hasEndorsement(revisionId) {
      return (
        (await client.articleReview.count({
          where: { revisionId, decision: "ENDORSED" },
        })) > 0
      );
    },

    async createDraft(command: CreateDraftCommand) {
      try {
        return await client.$transaction(
          async (tx) => {
            const article = await tx.article.create({
              data: {
                primaryAuthorProfileId: command.primaryAuthorProfileId,
                assignedReviewerId: command.assignedReviewerId,
                assignedEditorId: command.assignedEditorId,
                createdById: command.actorId,
                updatedById: command.actorId,
                workingCopy: {
                  create: {
                    ...editableData(command.initialContent, command.actorId),
                    lastAutosavedAt: command.occurredAt,
                  },
                },
              },
              select: articleSelect,
            });
            await Promise.all([
              tx.articleWorkflowEvent.create({
                data: {
                  articleId: article.id,
                  toEditorialStatus: "DRAFT",
                  toPublicationStatus: "NEVER_PUBLISHED",
                  action: "CREATE",
                  actorUserId: command.actorId,
                  occurredAt: command.occurredAt,
                },
              }),
              tx.auditLog.create({
                data: {
                  actorUserId: command.actorId,
                  action: "ARTICLE_CREATED",
                  resourceType: "Article",
                  resourceId: article.id,
                  afterSummary: { editorialStatus: "DRAFT" },
                  occurredAt: command.occurredAt,
                },
              }),
            ]);
            return fetchPair(tx, article.id);
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (error) {
        return translateDatabaseError(error);
      }
    },

    async saveWorkingCopy(command: SaveWorkingCopyCommand) {
      try {
        return await client.$transaction(
          async (tx) => {
            const articleUpdate = await tx.article.updateMany({
              where: {
                id: command.articleId,
                lockVersion: command.expectedArticleVersion,
                deletedAt: null,
                editorialStatus: { in: ["DRAFT", "CHANGES_REQUESTED"] },
              },
              data: {
                lockVersion: { increment: 1 },
                updatedById: command.actorId,
                primaryAuthorProfileId: command.content.authorProfileId,
              },
            });
            const copyUpdate = await tx.articleWorkingCopy.updateMany({
              where: {
                articleId: command.articleId,
                lockVersion: command.expectedWorkingCopyVersion,
              },
              data: {
                ...editableData(command.content, command.actorId),
                lockVersion: { increment: 1 },
                lastAutosavedAt: command.occurredAt,
              },
            });
            if (articleUpdate.count !== 1 || copyUpdate.count !== 1) {
              throw new EditorialError("CONFLICT", "O rascunho foi alterado em outra sessão.");
            }
            await tx.auditLog.create({
              data: {
                actorUserId: command.actorId,
                action: "ARTICLE_AUTOSAVED",
                resourceType: "Article",
                resourceId: command.articleId,
                afterSummary: { workingCopyVersion: command.expectedWorkingCopyVersion + 1 },
                occurredAt: command.occurredAt,
              },
            });
            return fetchPair(tx, command.articleId);
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (error) {
        if (error instanceof EditorialError) throw error;
        return translateDatabaseError(error);
      }
    },

    async submitRevision(command: SubmitRevisionCommand) {
      try {
        return await client.$transaction(
          async (tx) => {
            const article = await tx.article.findFirst({
              where: {
                id: command.articleId,
                lockVersion: command.expectedArticleVersion,
                deletedAt: null,
                editorialStatus: { in: ["DRAFT", "CHANGES_REQUESTED"] },
              },
              select: articleSelect,
            });
            const working = await tx.articleWorkingCopy.findFirst({
              where: {
                articleId: command.articleId,
                lockVersion: command.expectedWorkingCopyVersion,
              },
              select: { basedOnRevisionId: true },
            });
            if (!article || !working) throw new EditorialError("CONFLICT", "A matéria mudou antes do envio.");
            if (!command.content.authorProfileId || !command.content.categoryId) {
              throw new EditorialError("VALIDATION_FAILED", "Autor e categoria são obrigatórios.");
            }
            const aggregate = await tx.articleRevision.aggregate({
              where: { articleId: command.articleId },
              _max: { version: true },
            });
            const seo = seoCreate(command.content);
            const geo = geoCreate(command.content);
            const revision = await tx.articleRevision.create({
              data: {
                articleId: command.articleId,
                version: (aggregate._max.version ?? 0) + 1,
                basedOnRevisionId: working.basedOnRevisionId,
                title: command.content.title,
                subtitle: command.content.subtitle,
                slug: command.content.proposedSlug,
                summary: command.content.summary,
                bodyJson: toInputJson(command.content.bodyJson),
                bodyHtml: command.content.bodyHtml,
                authorProfileId: command.content.authorProfileId,
                categoryId: command.content.categoryId,
                location: command.content.location,
                occurredAt: command.content.occurredAt,
                contentKind: command.content.contentKind,
                isExclusive: command.content.isExclusive,
                isSponsored: command.content.isSponsored,
                sponsorDisclosure: command.content.sponsorDisclosure,
                isSensitive: command.content.isSensitive,
                allowComments: command.content.allowComments,
                changeSummary: command.changeSummary,
                contentHash: command.contentHash,
                createdById: command.actorId,
                createdAt: command.occurredAt,
                sources: { create: sourceCreates(command.content.sources) },
                tags: {
                  create: [...new Set(command.content.tagIds)].map((tagId) => ({ tagId })),
                },
                media: { create: mediaCreates(command.content) },
                ...(seo ? { seoMetadata: { create: seo } } : {}),
                ...(geo ? { geoMetadata: { create: geo } } : {}),
              },
              select: revisionSelect,
            });
            await tx.article.update({
              where: { id: command.articleId },
              data: {
                editorialStatus: "IN_REVIEW",
                currentRevisionId: revision.id,
                approvedRevisionId: null,
                lockVersion: { increment: 1 },
                updatedById: command.actorId,
              },
            });
            await tx.articleWorkingCopy.update({
              where: { articleId: command.articleId },
              data: {
                basedOnRevisionId: revision.id,
                lockVersion: { increment: 1 },
              },
            });
            await Promise.all([
              tx.articleWorkflowEvent.create({
                data: {
                  articleId: command.articleId,
                  revisionId: revision.id,
                  fromEditorialStatus: article.editorialStatus,
                  toEditorialStatus: "IN_REVIEW",
                  action: "SUBMIT",
                  actorUserId: command.actorId,
                  occurredAt: command.occurredAt,
                },
              }),
              tx.auditLog.create({
                data: {
                  actorUserId: command.actorId,
                  action: "ARTICLE_SUBMITTED",
                  resourceType: "ArticleRevision",
                  resourceId: revision.id,
                  afterSummary: { articleId: command.articleId, contentHash: command.contentHash },
                  occurredAt: command.occurredAt,
                },
              }),
            ]);
            return fetchArticleRevision(tx, command.articleId, revision.id);
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (error) {
        if (error instanceof EditorialError) throw error;
        return translateDatabaseError(error);
      }
    },

    async recordReview(command: RecordReviewCommand) {
      try {
        return await client.$transaction(
          async (tx) => {
            const article = await tx.article.findFirst({
              where: {
                id: command.articleId,
                lockVersion: command.expectedArticleVersion,
                editorialStatus: "IN_REVIEW",
                currentRevisionId: command.revisionId,
                deletedAt: null,
              },
              select: articleSelect,
            });
            if (!article) throw new EditorialError("CONFLICT", "A revisão não está mais disponível para decisão.");
            await tx.articleReview.create({
              data: {
                articleId: command.articleId,
                revisionId: command.revisionId,
                reviewerId: command.actorId,
                decision: command.decision,
                comment: command.comment,
                createdAt: command.occurredAt,
              },
            });
            const nextStatus = command.decision === "CHANGES_REQUESTED" ? "CHANGES_REQUESTED" : "IN_REVIEW";
            const updated = await tx.article.update({
              where: { id: command.articleId },
              data: {
                editorialStatus: nextStatus,
                ...(command.decision === "CHANGES_REQUESTED" ? { approvedRevisionId: null } : {}),
                lockVersion: { increment: 1 },
                updatedById: command.actorId,
              },
              select: articleSelect,
            });
            await Promise.all([
              tx.articleWorkflowEvent.create({
                data: {
                  articleId: command.articleId,
                  revisionId: command.revisionId,
                  fromEditorialStatus: "IN_REVIEW",
                  toEditorialStatus: nextStatus,
                  action: command.decision,
                  actorUserId: command.actorId,
                  reason: command.comment,
                  occurredAt: command.occurredAt,
                },
              }),
              tx.auditLog.create({
                data: {
                  actorUserId: command.actorId,
                  action: `ARTICLE_${command.decision}`,
                  resourceType: "ArticleRevision",
                  resourceId: command.revisionId,
                  metadata: { articleId: command.articleId },
                  occurredAt: command.occurredAt,
                },
              }),
            ]);
            return toArticle(updated);
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (error) {
        if (error instanceof EditorialError) throw error;
        return translateDatabaseError(error);
      }
    },

    async approveRevision(command: ApproveRevisionCommand) {
      try {
        return await client.$transaction(
          async (tx) => {
            const article = await tx.article.findFirst({
              where: {
                id: command.articleId,
                lockVersion: command.expectedArticleVersion,
                editorialStatus: "IN_REVIEW",
                currentRevisionId: command.revisionId,
                deletedAt: null,
              },
              select: articleSelect,
            });
            const endorsement = await tx.articleReview.findFirst({
              where: { revisionId: command.revisionId, decision: "ENDORSED" },
              select: { id: true },
            });
            if (!article || !endorsement) {
              throw new EditorialError("REVIEW_REQUIRED", "A revisão atual precisa de endosso.");
            }
            await tx.articleApproval.create({
              data: {
                articleId: command.articleId,
                revisionId: command.revisionId,
                approvedById: command.actorId,
                note: command.note,
                createdAt: command.occurredAt,
              },
            });
            await tx.article.update({
              where: { id: command.articleId },
              data: {
                editorialStatus: "APPROVED",
                approvedRevisionId: command.revisionId,
                lockVersion: { increment: 1 },
                updatedById: command.actorId,
              },
            });
            await Promise.all([
              tx.articleWorkflowEvent.create({
                data: {
                  articleId: command.articleId,
                  revisionId: command.revisionId,
                  fromEditorialStatus: "IN_REVIEW",
                  toEditorialStatus: "APPROVED",
                  action: "APPROVE",
                  actorUserId: command.actorId,
                  reason: command.note,
                  occurredAt: command.occurredAt,
                },
              }),
              tx.auditLog.create({
                data: {
                  actorUserId: command.actorId,
                  action: "ARTICLE_APPROVED",
                  resourceType: "ArticleRevision",
                  resourceId: command.revisionId,
                  metadata: { articleId: command.articleId },
                  occurredAt: command.occurredAt,
                },
              }),
            ]);
            return fetchArticleRevision(tx, command.articleId, command.revisionId);
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (error) {
        if (error instanceof EditorialError) throw error;
        return translateDatabaseError(error);
      }
    },

    async publishRevision(command: PublishRevisionCommand) {
      try {
        return await client.$transaction(
          async (tx) => {
            const article = await tx.article.findFirst({
              where: {
                id: command.articleId,
                lockVersion: command.expectedArticleVersion,
                editorialStatus: "APPROVED",
                currentRevisionId: command.revisionId,
                approvedRevisionId: command.revisionId,
                deletedAt: null,
              },
              select: articleSelect,
            });
            const revision = await tx.articleRevision.findUnique({
              where: { id: command.revisionId },
              select: revisionSelect,
            });
            if (!article || !revision || revision.articleId !== command.articleId) {
              throw new EditorialError("STALE_REVISION", "A revisão aprovada mudou antes da publicação.");
            }
            const collision = await tx.article.findFirst({
              where: { publicSlug: revision.slug, id: { not: command.articleId } },
              select: { id: true },
            });
            if (collision) throw new EditorialError("SLUG_CONFLICT", "O slug já está publicado.");
            if (article.publicSlug && article.publicSlug !== revision.slug) {
              await tx.redirect.upsert({
                where: { sourcePath: `/noticias/${article.publicSlug}` },
                create: {
                  sourcePath: `/noticias/${article.publicSlug}`,
                  destinationPath: `/noticias/${revision.slug}`,
                  statusCode: 301,
                  createdById: command.actorId,
                },
                update: {
                  destinationPath: `/noticias/${revision.slug}`,
                  statusCode: 301,
                },
              });
            }
            await tx.article.update({
              where: { id: command.articleId },
              data: {
                publicationStatus: "PUBLISHED",
                publicSlug: revision.slug,
                publishedRevisionId: revision.id,
                ...(!article.publishedRevisionId
                  ? { firstPublishedAt: command.occurredAt }
                  : {}),
                publishedAt: command.occurredAt,
                unpublishedAt: null,
                lockVersion: { increment: 1 },
                updatedById: command.actorId,
              },
            });
            await Promise.all([
              tx.articleWorkflowEvent.create({
                data: {
                  articleId: command.articleId,
                  revisionId: command.revisionId,
                  fromEditorialStatus: "APPROVED",
                  toEditorialStatus: "APPROVED",
                  fromPublicationStatus: article.publicationStatus,
                  toPublicationStatus: "PUBLISHED",
                  action: "PUBLISH",
                  actorUserId: command.actorId,
                  occurredAt: command.occurredAt,
                },
              }),
              tx.auditLog.create({
                data: {
                  actorUserId: command.actorId,
                  action: "ARTICLE_PUBLISHED",
                  resourceType: "ArticleRevision",
                  resourceId: command.revisionId,
                  afterSummary: { articleId: command.articleId, slug: revision.slug },
                  occurredAt: command.occurredAt,
                },
              }),
            ]);
            return fetchArticleRevision(tx, command.articleId, command.revisionId);
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (error) {
        if (error instanceof EditorialError) throw error;
        return translateDatabaseError(error);
      }
    },
  };
}
