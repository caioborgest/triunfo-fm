import { describe, expect, it } from "vitest";

import { EditorialError } from "./errors";
import type {
  ApproveRevisionCommand,
  ArticleAndRevision,
  ArticleAndWorkingCopy,
  EditorialRepository,
  PublishRevisionCommand,
  RecordReviewCommand,
  SaveWorkingCopyCommand,
  SubmitRevisionCommand,
} from "./repository";
import {
  approveArticleRevision,
  endorseArticleRevision,
  publishArticle,
  requestArticleChanges,
  submitArticle,
  type EditorialDependencies,
} from "./service";
import { transitionArticle } from "./state-machine";
import type {
  EditableArticleContent,
  EditorialActor,
  EditorialArticleRecord,
  WorkingCopyRecord,
  ArticleRevisionRecord,
} from "./types";

const instant = new Date("2026-07-29T18:00:00.000Z");

function validContent(): EditableArticleContent {
  return {
    title: "Conteúdo de demonstração editorial",
    subtitle: null,
    proposedSlug: "conteudo-de-demonstracao-editorial",
    summary: "Resumo demonstrativo suficientemente completo para a validação editorial.",
    bodyJson: { type: "doc", content: [] },
    bodyHtml:
      "<p>Este conteúdo é demonstrativo e existe somente para validar o fluxo editorial completo.</p><script>alert('x')</script>",
    authorProfileId: "author-1",
    categoryId: "category-1",
    heroMediaAssetId: null,
    heroAltText: null,
    heroCaption: null,
    heroCredit: null,
    location: null,
    occurredAt: null,
    contentKind: "DEMONSTRATION",
    isExclusive: false,
    isSponsored: false,
    sponsorDisclosure: null,
    isSensitive: false,
    allowComments: false,
    tagIds: [],
    sources: [
      {
        sourceClass: "PRIMARY",
        kind: "WEBSITE",
        name: "Fonte demonstrativa",
        publisher: null,
        title: null,
        url: "https://example.invalid/fonte",
        publishedAt: null,
        accessedAt: null,
        publicNote: null,
        isOfficial: false,
      },
    ],
    mediaUsages: [],
    seoDraft: null,
    geoDraft: null,
  };
}

function actor(
  id: string,
  permissions: EditorialActor["permissions"],
): EditorialActor {
  return { id, permissions };
}

class MemoryEditorialRepository implements EditorialRepository {
  article: EditorialArticleRecord = {
    id: "article-1",
    editorialStatus: "DRAFT",
    publicationStatus: "NEVER_PUBLISHED",
    publicSlug: null,
    currentRevisionId: null,
    approvedRevisionId: null,
    publishedRevisionId: null,
    assignedReviewerId: "reviewer-1",
    assignedEditorId: "editor-1",
    createdById: "writer-1",
    lockVersion: 0,
    deletedAt: null,
  };

  workingCopy: WorkingCopyRecord = {
    ...validContent(),
    articleId: "article-1",
    basedOnRevisionId: null,
    lockVersion: 0,
    updatedAt: instant,
  };

  private revisions = new Map<string, ArticleRevisionRecord>();
  private endorsed = new Set<string>();

  async listAdminArticles() {
    return [];
  }

  async getArticle(articleId: string) {
    return articleId === this.article.id ? this.article : null;
  }

  async getWorkingCopy(articleId: string) {
    return articleId === this.article.id ? this.workingCopy : null;
  }

  async getRevision(revisionId: string) {
    return this.revisions.get(revisionId) ?? null;
  }

  async hasEndorsement(revisionId: string) {
    return this.endorsed.has(revisionId);
  }

  async createDraft(): Promise<ArticleAndWorkingCopy> {
    return { article: this.article, workingCopy: this.workingCopy };
  }

  async saveWorkingCopy(command: SaveWorkingCopyCommand): Promise<ArticleAndWorkingCopy> {
    this.article = { ...this.article, lockVersion: this.article.lockVersion + 1 };
    this.workingCopy = {
      ...this.workingCopy,
      ...command.content,
      lockVersion: this.workingCopy.lockVersion + 1,
      updatedAt: command.occurredAt,
    };
    return { article: this.article, workingCopy: this.workingCopy };
  }

  async submitRevision(command: SubmitRevisionCommand): Promise<ArticleAndRevision> {
    const revision: ArticleRevisionRecord = {
      id: `revision-${this.revisions.size + 1}`,
      articleId: command.articleId,
      version: this.revisions.size + 1,
      slug: command.content.proposedSlug,
      title: command.content.title,
      summary: command.content.summary,
      bodyHtml: command.content.bodyHtml,
      createdAt: command.occurredAt,
    };
    this.revisions.set(revision.id, revision);
    this.article = {
      ...this.article,
      editorialStatus: "IN_REVIEW",
      currentRevisionId: revision.id,
      approvedRevisionId: null,
      lockVersion: this.article.lockVersion + 1,
    };
    this.workingCopy = {
      ...this.workingCopy,
      basedOnRevisionId: revision.id,
      lockVersion: this.workingCopy.lockVersion + 1,
    };
    return { article: this.article, revision };
  }

  async recordReview(command: RecordReviewCommand) {
    if (command.decision === "ENDORSED") this.endorsed.add(command.revisionId);
    this.article = {
      ...this.article,
      editorialStatus:
        command.decision === "CHANGES_REQUESTED" ? "CHANGES_REQUESTED" : "IN_REVIEW",
      lockVersion: this.article.lockVersion + 1,
    };
    return this.article;
  }

  async approveRevision(command: ApproveRevisionCommand): Promise<ArticleAndRevision> {
    const revision = this.revisions.get(command.revisionId);
    if (!revision) throw new Error("revision missing");
    this.article = {
      ...this.article,
      editorialStatus: "APPROVED",
      approvedRevisionId: revision.id,
      lockVersion: this.article.lockVersion + 1,
    };
    return { article: this.article, revision };
  }

  async publishRevision(command: PublishRevisionCommand): Promise<ArticleAndRevision> {
    const revision = this.revisions.get(command.revisionId);
    if (!revision) throw new Error("revision missing");
    this.article = {
      ...this.article,
      publicationStatus: "PUBLISHED",
      publicSlug: revision.slug,
      publishedRevisionId: revision.id,
      lockVersion: this.article.lockVersion + 1,
    };
    return { article: this.article, revision };
  }
}

describe("editorial state machine", () => {
  it("keeps endorsement in review and separates publication state", () => {
    expect(
      transitionArticle(
        { editorialStatus: "IN_REVIEW", publicationStatus: "NEVER_PUBLISHED" },
        "ENDORSE",
      ),
    ).toEqual({ editorialStatus: "IN_REVIEW", publicationStatus: "NEVER_PUBLISHED" });
    expect(
      transitionArticle(
        { editorialStatus: "APPROVED", publicationStatus: "NEVER_PUBLISHED" },
        "PUBLISH",
      ),
    ).toEqual({ editorialStatus: "APPROVED", publicationStatus: "PUBLISHED" });
  });

  it("rejects publishing a draft", () => {
    expect(() =>
      transitionArticle(
        { editorialStatus: "DRAFT", publicationStatus: "NEVER_PUBLISHED" },
        "PUBLISH",
      ),
    ).toThrowError(EditorialError);
  });
});

describe("editorial use cases", () => {
  it("runs submit → changes → resubmit → endorse → approve → publish", async () => {
    const repository = new MemoryEditorialRepository();
    const dependencies: EditorialDependencies = { repository, now: () => instant };
    const writer = actor("writer-1", [
      { resource: "article", action: "submit", scope: "OWN" },
    ]);
    const reviewer = actor("reviewer-1", [
      { resource: "article", action: "request_changes", scope: "ASSIGNED" },
      { resource: "article", action: "review", scope: "ASSIGNED" },
    ]);
    const editor = actor("editor-1", [
      { resource: "article", action: "approve", scope: "ANY" },
      { resource: "article", action: "publish", scope: "ANY" },
    ]);

    const first = await submitArticle(dependencies, writer, {
      articleId: "article-1",
      expectedArticleVersion: 0,
      expectedWorkingCopyVersion: 0,
    });
    expect(first.revision.bodyHtml).not.toContain("<script");

    await requestArticleChanges(dependencies, reviewer, {
      articleId: "article-1",
      revisionId: first.revision.id,
      expectedArticleVersion: 1,
      comment: "Esclarecer a natureza demonstrativa.",
    });
    expect(repository.article.editorialStatus).toBe("CHANGES_REQUESTED");

    const second = await submitArticle(dependencies, writer, {
      articleId: "article-1",
      expectedArticleVersion: 2,
      expectedWorkingCopyVersion: 1,
      changeSummary: "Identificação demonstrativa revisada.",
    });
    await endorseArticleRevision(dependencies, reviewer, {
      articleId: "article-1",
      revisionId: second.revision.id,
      expectedArticleVersion: 3,
      comment: "Revisão endossada.",
    });
    await approveArticleRevision(dependencies, editor, {
      articleId: "article-1",
      revisionId: second.revision.id,
      expectedArticleVersion: 4,
    });
    const published = await publishArticle(dependencies, editor, {
      articleId: "article-1",
      revisionId: second.revision.id,
      expectedArticleVersion: 5,
    });

    expect(published.article.publicationStatus).toBe("PUBLISHED");
    expect(published.article.publishedRevisionId).toBe(second.revision.id);
    expect(published.article.publicSlug).toBe("conteudo-de-demonstracao-editorial");
  });

  it("does not let the writer publish even with an approved state", async () => {
    const repository = new MemoryEditorialRepository();
    repository.article = { ...repository.article, editorialStatus: "APPROVED" };
    const revision = await repository.submitRevision({
      articleId: "article-1",
      actorId: "writer-1",
      expectedArticleVersion: 0,
      expectedWorkingCopyVersion: 0,
      content: validContent(),
      contentHash: "0".repeat(64),
      changeSummary: null,
      occurredAt: instant,
    });
    repository.article = {
      ...repository.article,
      editorialStatus: "APPROVED",
      approvedRevisionId: revision.revision.id,
    };
    const dependencies: EditorialDependencies = { repository, now: () => instant };
    const writer = actor("writer-1", [
      { resource: "article", action: "submit", scope: "OWN" },
    ]);
    await expect(
      publishArticle(dependencies, writer, {
        articleId: "article-1",
        revisionId: revision.revision.id,
        expectedArticleVersion: repository.article.lockVersion,
      }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
