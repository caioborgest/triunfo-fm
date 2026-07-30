export type JsonPrimitive = boolean | number | string | null;
export type JsonValue =
  | JsonPrimitive
  | { readonly [key: string]: JsonValue }
  | readonly JsonValue[];

export type EditorialStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "CHANGES_REQUESTED"
  | "APPROVED";

export type PublicationStatus =
  | "NEVER_PUBLISHED"
  | "SCHEDULED"
  | "PUBLISHED"
  | "UNPUBLISHED"
  | "ARCHIVED";

export type ContentKind =
  | "NEWS"
  | "OPINION"
  | "COMMUNIQUE"
  | "SPONSORED"
  | "DEMONSTRATION";

export type PermissionScope = "OWN" | "ASSIGNED" | "ANY";

export interface PermissionGrant {
  readonly resource: string;
  readonly action: string;
  readonly scope: PermissionScope;
}

export interface EditorialActor {
  readonly id: string;
  readonly permissions: readonly PermissionGrant[];
}

export interface PermissionRequest {
  readonly resource: "article" | "article_revision" | "media" | "homepage";
  readonly action: string;
  readonly ownerId?: string;
  readonly assignedUserIds?: readonly string[];
}

export type AuthorizationHook = (
  actor: EditorialActor,
  request: PermissionRequest,
) => Promise<void> | void;

export interface ArticleState {
  readonly editorialStatus: EditorialStatus;
  readonly publicationStatus: PublicationStatus;
}

export interface EditorialArticleRecord extends ArticleState {
  readonly id: string;
  readonly publicSlug: string | null;
  readonly currentRevisionId: string | null;
  readonly approvedRevisionId: string | null;
  readonly publishedRevisionId: string | null;
  readonly assignedReviewerId: string | null;
  readonly assignedEditorId: string | null;
  readonly createdById: string;
  readonly lockVersion: number;
  readonly deletedAt: Date | null;
}

export interface SourceDraft {
  readonly sourceClass: "PRIMARY" | "SECONDARY";
  readonly kind:
    | "OFFICIAL"
    | "DOCUMENT"
    | "INTERVIEW"
    | "AGENCY"
    | "RESEARCH"
    | "WEBSITE"
    | "OTHER";
  readonly name: string | null;
  readonly publisher: string | null;
  readonly title: string | null;
  readonly url: string | null;
  readonly publishedAt: string | null;
  readonly accessedAt: string | null;
  readonly publicNote: string | null;
  readonly isOfficial: boolean;
}

export interface MediaUsageDraft {
  readonly mediaAssetId: string;
  readonly role: "GALLERY" | "INLINE" | "VIDEO" | "AUDIO" | "SOCIAL";
  readonly position: number;
  readonly altText: string | null;
  readonly caption: string | null;
  readonly credit: string | null;
}

export interface EditableArticleContent {
  readonly title: string;
  readonly subtitle: string | null;
  readonly proposedSlug: string;
  readonly summary: string;
  readonly bodyJson: JsonValue;
  readonly bodyHtml: string;
  readonly authorProfileId: string | null;
  readonly categoryId: string | null;
  readonly heroMediaAssetId: string | null;
  readonly heroAltText: string | null;
  readonly heroCaption: string | null;
  readonly heroCredit: string | null;
  readonly location: string | null;
  readonly occurredAt: Date | null;
  readonly contentKind: ContentKind;
  readonly isExclusive: boolean;
  readonly isSponsored: boolean;
  readonly sponsorDisclosure: string | null;
  readonly isSensitive: boolean;
  readonly allowComments: boolean;
  readonly tagIds: readonly string[];
  readonly sources: readonly SourceDraft[];
  readonly mediaUsages: readonly MediaUsageDraft[];
  readonly seoDraft: JsonValue | null;
  readonly geoDraft: JsonValue | null;
}

export interface WorkingCopyRecord extends EditableArticleContent {
  readonly articleId: string;
  readonly basedOnRevisionId: string | null;
  readonly lockVersion: number;
  readonly updatedAt: Date;
}

export interface ArticleRevisionRecord {
  readonly id: string;
  readonly articleId: string;
  readonly version: number;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly bodyHtml: string;
  readonly createdAt: Date;
}

export interface AdminArticleListItem extends ArticleState {
  readonly id: string;
  readonly title: string;
  readonly proposedSlug: string;
  readonly publicSlug: string | null;
  readonly authorName: string | null;
  readonly categoryName: string | null;
  readonly updatedAt: Date;
  readonly publishedAt: Date | null;
  readonly assignedReviewerId: string | null;
  readonly assignedEditorId: string | null;
}

export interface PublishedArticleHeroImage {
  readonly url: string;
  readonly altText: string;
  readonly caption: string | null;
  readonly credit: string | null;
}

export interface PublishedArticleSummary {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string | null;
  readonly summary: string;
  readonly publishedAt: Date;
  readonly updatedAt: Date;
  readonly isUrgent: boolean;
  readonly isFeatured: boolean;
  readonly category: { readonly name: string; readonly slug: string };
  readonly author: {
    readonly displayName: string;
    readonly slug: string;
  } | null;
  readonly heroImage: PublishedArticleHeroImage | null;
}

export interface PublishedArticleDetail extends PublishedArticleSummary {
  readonly bodyHtml: string;
  readonly contentKind: ContentKind;
  readonly isSponsored: boolean;
  readonly isSensitive: boolean;
  readonly tags: readonly { readonly name: string; readonly slug: string }[];
  readonly sources: readonly {
    readonly name: string | null;
    readonly publisher: string | null;
    readonly title: string | null;
    readonly url: string | null;
    readonly isOfficial: boolean;
  }[];
  readonly seo: {
    readonly title: string;
    readonly description: string;
    readonly canonicalUrlOverride: string | null;
    readonly ogImageUrl: string | null;
  };
  readonly geo: {
    readonly shortAnswer: string | null;
    readonly executiveSummary: string | null;
    readonly keyFacts: JsonValue | null;
  } | null;
}
