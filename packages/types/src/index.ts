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

export interface PublishedArticleSummary {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string;
  categoryName: string;
  categorySlug: string;
  publishedAt: Date;
  updatedAt: Date;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  isUrgent: boolean;
  isFeatured: boolean;
}

export interface PublishedArticle extends PublishedArticleSummary {
  bodyHtml: string;
  author: {
    name: string;
    slug: string | null;
  };
  sources: Array<{
    id: string;
    name: string;
    url: string | null;
    isOfficial: boolean;
  }>;
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    noIndex: boolean;
  };
  geo: {
    shortAnswer: string | null;
    keyFacts: string[];
  };
}

export interface Actor {
  userId: string;
  email: string;
  name: string;
  permissions: string[];
}
