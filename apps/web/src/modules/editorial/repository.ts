import type {
  AdminArticleListItem,
  EditableArticleContent,
  EditorialArticleRecord,
  ArticleRevisionRecord,
  WorkingCopyRecord,
} from "./types";

export interface AdminArticleQuery {
  readonly search?: string;
  readonly editorialStatus?: EditorialArticleRecord["editorialStatus"];
  readonly publicationStatus?: EditorialArticleRecord["publicationStatus"];
  readonly assignedToUserId?: string;
  readonly limit?: number;
  readonly offset?: number;
}

export interface CreateDraftCommand {
  readonly actorId: string;
  readonly primaryAuthorProfileId: string | null;
  readonly assignedReviewerId: string | null;
  readonly assignedEditorId: string | null;
  readonly initialContent: EditableArticleContent;
  readonly occurredAt: Date;
}

export interface SaveWorkingCopyCommand {
  readonly articleId: string;
  readonly actorId: string;
  readonly expectedArticleVersion: number;
  readonly expectedWorkingCopyVersion: number;
  readonly content: EditableArticleContent;
  readonly occurredAt: Date;
}

export interface SubmitRevisionCommand {
  readonly articleId: string;
  readonly actorId: string;
  readonly expectedArticleVersion: number;
  readonly expectedWorkingCopyVersion: number;
  readonly content: EditableArticleContent;
  readonly contentHash: string;
  readonly changeSummary: string | null;
  readonly occurredAt: Date;
}

export interface RecordReviewCommand {
  readonly articleId: string;
  readonly revisionId: string;
  readonly actorId: string;
  readonly expectedArticleVersion: number;
  readonly decision: "ENDORSED" | "CHANGES_REQUESTED";
  readonly comment: string | null;
  readonly occurredAt: Date;
}

export interface ApproveRevisionCommand {
  readonly articleId: string;
  readonly revisionId: string;
  readonly actorId: string;
  readonly expectedArticleVersion: number;
  readonly note: string | null;
  readonly occurredAt: Date;
}

export interface PublishRevisionCommand {
  readonly articleId: string;
  readonly revisionId: string;
  readonly actorId: string;
  readonly expectedArticleVersion: number;
  readonly occurredAt: Date;
}

export interface ArticleAndWorkingCopy {
  readonly article: EditorialArticleRecord;
  readonly workingCopy: WorkingCopyRecord;
}

export interface ArticleAndRevision {
  readonly article: EditorialArticleRecord;
  readonly revision: ArticleRevisionRecord;
}

export interface EditorialRepository {
  listAdminArticles(query: AdminArticleQuery): Promise<readonly AdminArticleListItem[]>;
  getArticle(articleId: string): Promise<EditorialArticleRecord | null>;
  getWorkingCopy(articleId: string): Promise<WorkingCopyRecord | null>;
  getRevision(revisionId: string): Promise<ArticleRevisionRecord | null>;
  hasEndorsement(revisionId: string): Promise<boolean>;
  createDraft(command: CreateDraftCommand): Promise<ArticleAndWorkingCopy>;
  saveWorkingCopy(command: SaveWorkingCopyCommand): Promise<ArticleAndWorkingCopy>;
  submitRevision(command: SubmitRevisionCommand): Promise<ArticleAndRevision>;
  recordReview(command: RecordReviewCommand): Promise<EditorialArticleRecord>;
  approveRevision(command: ApproveRevisionCommand): Promise<ArticleAndRevision>;
  publishRevision(command: PublishRevisionCommand): Promise<ArticleAndRevision>;
}
