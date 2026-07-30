-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('INVITED', 'ACTIVE', 'SUSPENDED', 'DISABLED');

-- CreateEnum
CREATE TYPE "PermissionScope" AS ENUM ('OWN', 'ASSIGNED', 'ANY');

-- CreateEnum
CREATE TYPE "EditorialStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'CHANGES_REQUESTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('NEVER_PUBLISHED', 'SCHEDULED', 'PUBLISHED', 'UNPUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ContentKind" AS ENUM ('NEWS', 'OPINION', 'COMMUNIQUE', 'SPONSORED', 'DEMONSTRATION');

-- CreateEnum
CREATE TYPE "RevisionCheckpoint" AS ENUM ('SUBMITTED', 'APPROVED', 'PUBLISHED', 'RESTORED');

-- CreateEnum
CREATE TYPE "ReviewDecision" AS ENUM ('ENDORSED', 'CHANGES_REQUESTED');

-- CreateEnum
CREATE TYPE "SourceClass" AS ENUM ('PRIMARY', 'SECONDARY');

-- CreateEnum
CREATE TYPE "SourceKind" AS ENUM ('OFFICIAL', 'DOCUMENT', 'INTERVIEW', 'AGENCY', 'RESEARCH', 'WEBSITE', 'OTHER');

-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('UPLOADING', 'PROCESSING', 'READY', 'QUARANTINED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MediaVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "MediaRole" AS ENUM ('HERO', 'GALLERY', 'INLINE', 'VIDEO', 'AUDIO', 'SOCIAL');

-- CreateEnum
CREATE TYPE "IndexPolicy" AS ENUM ('INDEX_FOLLOW', 'NOINDEX_FOLLOW', 'NOINDEX_NOFOLLOW');

-- CreateEnum
CREATE TYPE "StructuredDataType" AS ENUM ('NEWS_ARTICLE', 'ARTICLE');

-- CreateEnum
CREATE TYPE "SeoSeverity" AS ENUM ('ERROR', 'WARNING', 'INFO');

-- CreateEnum
CREATE TYPE "SeoAuditStatus" AS ENUM ('OPEN', 'RESOLVED', 'IGNORED');

-- CreateEnum
CREATE TYPE "EditorialCommentKind" AS ENUM ('GENERAL', 'CHANGE_REQUEST', 'REVIEW_NOTE', 'APPROVAL_NOTE', 'CORRECTION');

-- CreateEnum
CREATE TYPE "ActorType" AS ENUM ('USER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "HomepageSectionType" AS ENUM ('LATEST_NEWS', 'FEATURED_NEWS');

-- CreateEnum
CREATE TYPE "HomepageSourceMode" AS ENUM ('AUTOMATIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "DeviceTarget" AS ENUM ('ALL', 'DESKTOP', 'MOBILE');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'INVITED',
    "session_version" INTEGER NOT NULL DEFAULT 0,
    "last_login_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "user_id" UUID NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "id_token" TEXT,
    "access_token_expires_at" TIMESTAMPTZ(6),
    "refresh_token_expires_at" TIMESTAMPTZ(6),
    "scope" TEXT,
    "password" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author_profile" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "display_name" TEXT NOT NULL,
    "bio" TEXT,
    "job_title" TEXT,
    "avatar_asset_id" UUID,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "author_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL,
    "key" VARCHAR(80) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_system" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" UUID NOT NULL,
    "resource" VARCHAR(80) NOT NULL,
    "action" VARCHAR(80) NOT NULL,
    "scope" "PermissionScope" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "assigned_by_id" UUID,
    "assigned_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(6),
    "revoked_at" TIMESTAMPTZ(6),
    "revoked_by_id" UUID,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permission" (
    "id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "granted_by_id" UUID,
    "granted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(6),
    "revoked_at" TIMESTAMPTZ(6),
    "revoked_by_id" UUID,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "description" TEXT,
    "parent_id" UUID,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_folder" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "parent_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "media_folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_asset" (
    "id" UUID NOT NULL,
    "folder_id" UUID,
    "storage_provider" VARCHAR(40) NOT NULL,
    "bucket" TEXT NOT NULL,
    "object_key" TEXT NOT NULL,
    "public_url" TEXT,
    "mime_type" TEXT NOT NULL,
    "size_bytes" BIGINT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "duration_seconds" INTEGER,
    "checksum_sha256" CHAR(64) NOT NULL,
    "status" "MediaStatus" NOT NULL DEFAULT 'UPLOADING',
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PRIVATE',
    "default_alt_text" TEXT,
    "default_credit" TEXT,
    "license" TEXT,
    "technical_metadata" JSONB,
    "uploaded_by_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "media_asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" UUID NOT NULL,
    "editorial_status" "EditorialStatus" NOT NULL DEFAULT 'DRAFT',
    "publication_status" "PublicationStatus" NOT NULL DEFAULT 'NEVER_PUBLISHED',
    "public_slug" VARCHAR(180),
    "current_revision_id" UUID,
    "approved_revision_id" UUID,
    "published_revision_id" UUID,
    "scheduled_revision_id" UUID,
    "primary_author_profile_id" UUID,
    "assigned_reviewer_id" UUID,
    "assigned_editor_id" UUID,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "is_urgent" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "scheduled_at" TIMESTAMPTZ(6),
    "first_published_at" TIMESTAMPTZ(6),
    "published_at" TIMESTAMPTZ(6),
    "unpublished_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),
    "lock_version" INTEGER NOT NULL DEFAULT 0,
    "created_by_id" UUID NOT NULL,
    "updated_by_id" UUID NOT NULL,
    "deleted_by_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_working_copy" (
    "article_id" UUID NOT NULL,
    "based_on_revision_id" UUID,
    "title" TEXT NOT NULL DEFAULT '',
    "subtitle" TEXT,
    "proposed_slug" VARCHAR(180) NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    "body_json" JSONB NOT NULL,
    "body_html" TEXT NOT NULL DEFAULT '',
    "author_profile_id" UUID,
    "category_id" UUID,
    "hero_media_asset_id" UUID,
    "hero_alt_text" TEXT,
    "hero_caption" TEXT,
    "hero_credit" TEXT,
    "location" TEXT,
    "occurred_at" TIMESTAMPTZ(6),
    "content_kind" "ContentKind" NOT NULL DEFAULT 'NEWS',
    "is_exclusive" BOOLEAN NOT NULL DEFAULT false,
    "is_sponsored" BOOLEAN NOT NULL DEFAULT false,
    "sponsor_disclosure" TEXT,
    "is_sensitive" BOOLEAN NOT NULL DEFAULT false,
    "allow_comments" BOOLEAN NOT NULL DEFAULT false,
    "tag_ids" JSONB NOT NULL DEFAULT '[]',
    "sources" JSONB NOT NULL DEFAULT '[]',
    "media_usages" JSONB NOT NULL DEFAULT '[]',
    "seo_draft" JSONB,
    "geo_draft" JSONB,
    "lock_version" INTEGER NOT NULL DEFAULT 0,
    "last_autosaved_at" TIMESTAMPTZ(6),
    "updated_by_id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "article_working_copy_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "article_revision" (
    "id" UUID NOT NULL,
    "article_id" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "based_on_revision_id" UUID,
    "restored_from_revision_id" UUID,
    "checkpoint" "RevisionCheckpoint" NOT NULL DEFAULT 'SUBMITTED',
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "slug" VARCHAR(180) NOT NULL,
    "summary" TEXT NOT NULL,
    "body_json" JSONB NOT NULL,
    "body_html" TEXT NOT NULL,
    "author_profile_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "location" TEXT,
    "occurred_at" TIMESTAMPTZ(6),
    "content_kind" "ContentKind" NOT NULL,
    "is_exclusive" BOOLEAN NOT NULL DEFAULT false,
    "is_sponsored" BOOLEAN NOT NULL DEFAULT false,
    "sponsor_disclosure" TEXT,
    "is_sensitive" BOOLEAN NOT NULL DEFAULT false,
    "allow_comments" BOOLEAN NOT NULL DEFAULT false,
    "change_summary" TEXT,
    "content_hash" CHAR(64) NOT NULL,
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_revision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_source" (
    "id" UUID NOT NULL,
    "revision_id" UUID NOT NULL,
    "source_class" "SourceClass" NOT NULL,
    "kind" "SourceKind" NOT NULL,
    "name" TEXT,
    "publisher" TEXT,
    "title" TEXT,
    "url" TEXT,
    "published_at" TIMESTAMPTZ(6),
    "accessed_at" TIMESTAMPTZ(6),
    "public_note" TEXT,
    "is_official" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_revision_tag" (
    "revision_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "article_revision_tag_pkey" PRIMARY KEY ("revision_id","tag_id")
);

-- CreateTable
CREATE TABLE "article_revision_media" (
    "id" UUID NOT NULL,
    "revision_id" UUID NOT NULL,
    "media_asset_id" UUID NOT NULL,
    "role" "MediaRole" NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "alt_text" TEXT,
    "caption" TEXT,
    "credit" TEXT,

    CONSTRAINT "article_revision_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_review" (
    "id" UUID NOT NULL,
    "article_id" UUID NOT NULL,
    "revision_id" UUID NOT NULL,
    "reviewer_id" UUID NOT NULL,
    "decision" "ReviewDecision" NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_approval" (
    "id" UUID NOT NULL,
    "article_id" UUID NOT NULL,
    "revision_id" UUID NOT NULL,
    "approved_by_id" UUID NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_approval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_metadata" (
    "id" UUID NOT NULL,
    "revision_id" UUID NOT NULL,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "canonical_url_override" TEXT,
    "index_policy" "IndexPolicy" NOT NULL DEFAULT 'INDEX_FOLLOW',
    "og_title" TEXT,
    "og_description" TEXT,
    "og_image_asset_id" UUID,
    "twitter_card" TEXT,
    "structured_data_type" "StructuredDataType" NOT NULL DEFAULT 'NEWS_ARTICLE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seo_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geo_metadata" (
    "id" UUID NOT NULL,
    "revision_id" UUID NOT NULL,
    "schema_version" INTEGER NOT NULL DEFAULT 1,
    "short_answer" TEXT,
    "executive_summary" TEXT,
    "key_facts" JSONB,
    "context" TEXT,
    "what_happened" TEXT,
    "where_happened" TEXT,
    "when_happened" TEXT,
    "who_is_involved" TEXT,
    "why_relevant" TEXT,
    "what_happens_next" TEXT,
    "entities" JSONB,
    "relevant_dates" JSONB,
    "numbers" JSONB,
    "faqs" JSONB,
    "last_verified_at" TIMESTAMPTZ(6),
    "verified_by_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "geo_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_audit" (
    "id" UUID NOT NULL,
    "revision_id" UUID NOT NULL,
    "rule_code" VARCHAR(100) NOT NULL,
    "severity" "SeoSeverity" NOT NULL,
    "field" TEXT,
    "message" TEXT NOT NULL,
    "status" "SeoAuditStatus" NOT NULL DEFAULT 'OPEN',
    "ignored_reason" TEXT,
    "ignored_by_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMPTZ(6),

    CONSTRAINT "seo_audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_workflow_event" (
    "id" UUID NOT NULL,
    "article_id" UUID NOT NULL,
    "revision_id" UUID,
    "from_editorial_status" "EditorialStatus",
    "to_editorial_status" "EditorialStatus",
    "from_publication_status" "PublicationStatus",
    "to_publication_status" "PublicationStatus",
    "action" VARCHAR(80) NOT NULL,
    "actor_type" "ActorType" NOT NULL DEFAULT 'USER',
    "actor_user_id" UUID,
    "reason" TEXT,
    "metadata" JSONB,
    "occurred_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_workflow_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editorial_comment" (
    "id" UUID NOT NULL,
    "article_id" UUID NOT NULL,
    "revision_id" UUID,
    "author_id" UUID NOT NULL,
    "kind" "EditorialCommentKind" NOT NULL DEFAULT 'GENERAL',
    "body" TEXT NOT NULL,
    "resolved_at" TIMESTAMPTZ(6),
    "resolved_by_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "editorial_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homepage_section" (
    "id" UUID NOT NULL,
    "key" VARCHAR(80) NOT NULL,
    "type" "HomepageSectionType" NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "source_mode" "HomepageSourceMode" NOT NULL,
    "config" JSONB,
    "position" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "visible_from" TIMESTAMPTZ(6),
    "visible_until" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "homepage_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homepage_item" (
    "id" UUID NOT NULL,
    "section_id" UUID NOT NULL,
    "article_id" UUID NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "device" "DeviceTarget" NOT NULL DEFAULT 'ALL',
    "visible_from" TIMESTAMPTZ(6),
    "visible_until" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "homepage_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redirect" (
    "id" UUID NOT NULL,
    "source_path" TEXT NOT NULL,
    "destination_path" TEXT NOT NULL,
    "status_code" INTEGER NOT NULL DEFAULT 301,
    "starts_at" TIMESTAMPTZ(6),
    "ends_at" TIMESTAMPTZ(6),
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "redirect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" UUID NOT NULL,
    "actor_type" "ActorType" NOT NULL DEFAULT 'USER',
    "actor_user_id" UUID,
    "action" VARCHAR(100) NOT NULL,
    "resource_type" VARCHAR(100) NOT NULL,
    "resource_id" TEXT NOT NULL,
    "request_id" TEXT,
    "before_summary" JSONB,
    "after_summary" JSONB,
    "metadata" JSONB,
    "reason" TEXT,
    "occurred_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_status_deleted_at_idx" ON "user"("status", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_user_id_expires_at_idx" ON "session"("user_id", "expires_at");

-- CreateIndex
CREATE INDEX "account_user_id_idx" ON "account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_id_account_id_key" ON "account"("provider_id", "account_id");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "author_profile_user_id_key" ON "author_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "author_profile_slug_key" ON "author_profile"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "role_key_key" ON "role"("key");

-- CreateIndex
CREATE UNIQUE INDEX "permission_resource_action_scope_key" ON "permission"("resource", "action", "scope");

-- CreateIndex
CREATE INDEX "user_role_user_id_revoked_at_expires_at_idx" ON "user_role"("user_id", "revoked_at", "expires_at");

-- CreateIndex
CREATE INDEX "user_role_role_id_revoked_at_expires_at_idx" ON "user_role"("role_id", "revoked_at", "expires_at");

-- CreateIndex
CREATE INDEX "role_permission_role_id_revoked_at_expires_at_idx" ON "role_permission"("role_id", "revoked_at", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

-- CreateIndex
CREATE INDEX "category_parent_id_sort_order_idx" ON "category"("parent_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "tag_slug_key" ON "tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "media_folder_slug_key" ON "media_folder"("slug");

-- CreateIndex
CREATE INDEX "media_asset_checksum_sha256_idx" ON "media_asset"("checksum_sha256");

-- CreateIndex
CREATE INDEX "media_asset_status_deleted_at_idx" ON "media_asset"("status", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "media_asset_bucket_object_key_key" ON "media_asset"("bucket", "object_key");

-- CreateIndex
CREATE UNIQUE INDEX "article_public_slug_key" ON "article"("public_slug");

-- CreateIndex
CREATE UNIQUE INDEX "article_current_revision_id_key" ON "article"("current_revision_id");

-- CreateIndex
CREATE UNIQUE INDEX "article_approved_revision_id_key" ON "article"("approved_revision_id");

-- CreateIndex
CREATE UNIQUE INDEX "article_published_revision_id_key" ON "article"("published_revision_id");

-- CreateIndex
CREATE UNIQUE INDEX "article_scheduled_revision_id_key" ON "article"("scheduled_revision_id");

-- CreateIndex
CREATE INDEX "article_publication_status_published_at_idx" ON "article"("publication_status", "published_at" DESC);

-- CreateIndex
CREATE INDEX "article_editorial_status_updated_at_idx" ON "article"("editorial_status", "updated_at" DESC);

-- CreateIndex
CREATE INDEX "article_assigned_reviewer_id_editorial_status_idx" ON "article"("assigned_reviewer_id", "editorial_status");

-- CreateIndex
CREATE INDEX "article_assigned_editor_id_editorial_status_idx" ON "article"("assigned_editor_id", "editorial_status");

-- CreateIndex
CREATE INDEX "article_is_urgent_is_featured_priority_published_at_idx" ON "article"("is_urgent", "is_featured", "priority" DESC, "published_at" DESC);

-- CreateIndex
CREATE INDEX "article_scheduled_at_idx" ON "article"("scheduled_at");

-- CreateIndex
CREATE INDEX "article_revision_article_id_created_at_idx" ON "article_revision"("article_id", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "article_revision_article_id_version_key" ON "article_revision"("article_id", "version");

-- CreateIndex
CREATE INDEX "article_source_revision_id_position_idx" ON "article_source"("revision_id", "position");

-- CreateIndex
CREATE INDEX "article_revision_tag_tag_id_idx" ON "article_revision_tag"("tag_id");

-- CreateIndex
CREATE INDEX "article_revision_media_revision_id_role_position_idx" ON "article_revision_media"("revision_id", "role", "position");

-- CreateIndex
CREATE INDEX "article_revision_media_media_asset_id_idx" ON "article_revision_media"("media_asset_id");

-- CreateIndex
CREATE UNIQUE INDEX "article_revision_media_revision_id_media_asset_id_role_posi_key" ON "article_revision_media"("revision_id", "media_asset_id", "role", "position");

-- CreateIndex
CREATE INDEX "article_review_article_id_created_at_idx" ON "article_review"("article_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "article_review_revision_id_decision_idx" ON "article_review"("revision_id", "decision");

-- CreateIndex
CREATE INDEX "article_approval_approved_by_id_created_at_idx" ON "article_approval"("approved_by_id", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "article_approval_article_id_revision_id_key" ON "article_approval"("article_id", "revision_id");

-- CreateIndex
CREATE UNIQUE INDEX "seo_metadata_revision_id_key" ON "seo_metadata"("revision_id");

-- CreateIndex
CREATE UNIQUE INDEX "geo_metadata_revision_id_key" ON "geo_metadata"("revision_id");

-- CreateIndex
CREATE INDEX "seo_audit_revision_id_severity_status_idx" ON "seo_audit"("revision_id", "severity", "status");

-- CreateIndex
CREATE INDEX "article_workflow_event_article_id_occurred_at_idx" ON "article_workflow_event"("article_id", "occurred_at");

-- CreateIndex
CREATE INDEX "editorial_comment_article_id_created_at_idx" ON "editorial_comment"("article_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "homepage_section_key_key" ON "homepage_section"("key");

-- CreateIndex
CREATE INDEX "homepage_section_is_active_position_idx" ON "homepage_section"("is_active", "position");

-- CreateIndex
CREATE INDEX "homepage_item_section_id_position_idx" ON "homepage_item"("section_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "homepage_item_section_id_article_id_device_key" ON "homepage_item"("section_id", "article_id", "device");

-- CreateIndex
CREATE UNIQUE INDEX "redirect_source_path_key" ON "redirect"("source_path");

-- CreateIndex
CREATE INDEX "audit_log_resource_type_resource_id_occurred_at_idx" ON "audit_log"("resource_type", "resource_id", "occurred_at" DESC);

-- CreateIndex
CREATE INDEX "audit_log_actor_user_id_occurred_at_idx" ON "audit_log"("actor_user_id", "occurred_at" DESC);

-- CreateIndex
CREATE INDEX "audit_log_action_occurred_at_idx" ON "audit_log"("action", "occurred_at" DESC);

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_profile" ADD CONSTRAINT "author_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_profile" ADD CONSTRAINT "author_profile_avatar_asset_id_fkey" FOREIGN KEY ("avatar_asset_id") REFERENCES "media_asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_assigned_by_id_fkey" FOREIGN KEY ("assigned_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_revoked_by_id_fkey" FOREIGN KEY ("revoked_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_granted_by_id_fkey" FOREIGN KEY ("granted_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_revoked_by_id_fkey" FOREIGN KEY ("revoked_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_folder" ADD CONSTRAINT "media_folder_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "media_folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_asset" ADD CONSTRAINT "media_asset_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "media_folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_asset" ADD CONSTRAINT "media_asset_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_primary_author_profile_id_fkey" FOREIGN KEY ("primary_author_profile_id") REFERENCES "author_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_assigned_reviewer_id_fkey" FOREIGN KEY ("assigned_reviewer_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_assigned_editor_id_fkey" FOREIGN KEY ("assigned_editor_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_current_revision_id_fkey" FOREIGN KEY ("current_revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_approved_revision_id_fkey" FOREIGN KEY ("approved_revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_published_revision_id_fkey" FOREIGN KEY ("published_revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_scheduled_revision_id_fkey" FOREIGN KEY ("scheduled_revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_working_copy" ADD CONSTRAINT "article_working_copy_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_working_copy" ADD CONSTRAINT "article_working_copy_based_on_revision_id_fkey" FOREIGN KEY ("based_on_revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_working_copy" ADD CONSTRAINT "article_working_copy_author_profile_id_fkey" FOREIGN KEY ("author_profile_id") REFERENCES "author_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_working_copy" ADD CONSTRAINT "article_working_copy_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_working_copy" ADD CONSTRAINT "article_working_copy_hero_media_asset_id_fkey" FOREIGN KEY ("hero_media_asset_id") REFERENCES "media_asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_working_copy" ADD CONSTRAINT "article_working_copy_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision" ADD CONSTRAINT "article_revision_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision" ADD CONSTRAINT "article_revision_based_on_revision_id_fkey" FOREIGN KEY ("based_on_revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision" ADD CONSTRAINT "article_revision_restored_from_revision_id_fkey" FOREIGN KEY ("restored_from_revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision" ADD CONSTRAINT "article_revision_author_profile_id_fkey" FOREIGN KEY ("author_profile_id") REFERENCES "author_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision" ADD CONSTRAINT "article_revision_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision" ADD CONSTRAINT "article_revision_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_source" ADD CONSTRAINT "article_source_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision_tag" ADD CONSTRAINT "article_revision_tag_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision_tag" ADD CONSTRAINT "article_revision_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision_media" ADD CONSTRAINT "article_revision_media_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_revision_media" ADD CONSTRAINT "article_revision_media_media_asset_id_fkey" FOREIGN KEY ("media_asset_id") REFERENCES "media_asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_review" ADD CONSTRAINT "article_review_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_review" ADD CONSTRAINT "article_review_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_review" ADD CONSTRAINT "article_review_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_approval" ADD CONSTRAINT "article_approval_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_approval" ADD CONSTRAINT "article_approval_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_approval" ADD CONSTRAINT "article_approval_approved_by_id_fkey" FOREIGN KEY ("approved_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seo_metadata" ADD CONSTRAINT "seo_metadata_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seo_metadata" ADD CONSTRAINT "seo_metadata_og_image_asset_id_fkey" FOREIGN KEY ("og_image_asset_id") REFERENCES "media_asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geo_metadata" ADD CONSTRAINT "geo_metadata_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seo_audit" ADD CONSTRAINT "seo_audit_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_workflow_event" ADD CONSTRAINT "article_workflow_event_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_workflow_event" ADD CONSTRAINT "article_workflow_event_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editorial_comment" ADD CONSTRAINT "editorial_comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editorial_comment" ADD CONSTRAINT "editorial_comment_revision_id_fkey" FOREIGN KEY ("revision_id") REFERENCES "article_revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editorial_comment" ADD CONSTRAINT "editorial_comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homepage_item" ADD CONSTRAINT "homepage_item_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "homepage_section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homepage_item" ADD CONSTRAINT "homepage_item_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Domain checks that Prisma cannot express directly.
ALTER TABLE "article"
  ADD CONSTRAINT "article_priority_range" CHECK ("priority" BETWEEN 0 AND 100),
  ADD CONSTRAINT "article_schedule_complete" CHECK (
    "publication_status" <> 'SCHEDULED'
    OR ("scheduled_at" IS NOT NULL AND "scheduled_revision_id" IS NOT NULL)
  ),
  ADD CONSTRAINT "article_unpublished_timestamp" CHECK (
    "publication_status" <> 'UNPUBLISHED' OR "unpublished_at" IS NOT NULL
  ),
  ADD CONSTRAINT "article_published_pointer" CHECK (
    "publication_status" <> 'PUBLISHED'
    OR ("published_revision_id" IS NOT NULL AND "published_at" IS NOT NULL AND "unpublished_at" IS NULL)
  );

ALTER TABLE "article_working_copy"
  ADD CONSTRAINT "article_working_copy_slug_format" CHECK (
    "proposed_slug" = '' OR "proposed_slug" ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  ),
  ADD CONSTRAINT "article_working_copy_sponsorship" CHECK (
    "is_sponsored" = ("content_kind" = 'SPONSORED')
    AND (NOT "is_sponsored" OR length(btrim(coalesce("sponsor_disclosure", ''))) > 0)
  );

ALTER TABLE "article_revision"
  ADD CONSTRAINT "article_revision_slug_format" CHECK (
    "slug" ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  ),
  ADD CONSTRAINT "article_revision_sponsorship" CHECK (
    "is_sponsored" = ("content_kind" = 'SPONSORED')
    AND (NOT "is_sponsored" OR length(btrim(coalesce("sponsor_disclosure", ''))) > 0)
  );

ALTER TABLE "article_source"
  ADD CONSTRAINT "article_source_identifiable" CHECK (
    length(btrim(coalesce("name", ''))) > 0 OR length(btrim(coalesce("url", ''))) > 0
  ),
  ADD CONSTRAINT "article_source_digital_url" CHECK (
    "kind" IN ('INTERVIEW', 'OTHER') OR length(btrim(coalesce("url", ''))) > 0
  );

ALTER TABLE "media_asset"
  ADD CONSTRAINT "media_asset_positive_size" CHECK ("size_bytes" > 0),
  ADD CONSTRAINT "media_asset_dimensions" CHECK (
    ("width" IS NULL OR "width" > 0)
    AND ("height" IS NULL OR "height" > 0)
    AND ("duration_seconds" IS NULL OR "duration_seconds" >= 0)
  );

ALTER TABLE "homepage_section"
  ADD CONSTRAINT "homepage_section_window" CHECK (
    "visible_until" IS NULL OR "visible_from" IS NULL OR "visible_until" > "visible_from"
  );

ALTER TABLE "homepage_item"
  ADD CONSTRAINT "homepage_item_window" CHECK (
    "visible_until" IS NULL OR "visible_from" IS NULL OR "visible_until" > "visible_from"
  );

ALTER TABLE "redirect"
  ADD CONSTRAINT "redirect_status_code" CHECK ("status_code" IN (301, 302)),
  ADD CONSTRAINT "redirect_not_self" CHECK ("source_path" <> "destination_path"),
  ADD CONSTRAINT "redirect_window" CHECK (
    "ends_at" IS NULL OR "starts_at" IS NULL OR "ends_at" > "starts_at"
  );

-- Historical grants remain stored; only one active grant may exist at a time.
CREATE UNIQUE INDEX "user_role_active_key"
  ON "user_role" ("user_id", "role_id")
  WHERE "revoked_at" IS NULL;

CREATE UNIQUE INDEX "role_permission_active_key"
  ON "role_permission" ("role_id", "permission_id")
  WHERE "revoked_at" IS NULL;

CREATE UNIQUE INDEX "article_revision_single_hero_key"
  ON "article_revision_media" ("revision_id")
  WHERE "role" = 'HERO';

CREATE INDEX "article_public_feed_idx"
  ON "article" ("published_at" DESC)
  WHERE "publication_status" = 'PUBLISHED'
    AND "published_revision_id" IS NOT NULL
    AND "unpublished_at" IS NULL
    AND "deleted_at" IS NULL;

CREATE INDEX "article_scheduled_due_idx"
  ON "article" ("scheduled_at")
  WHERE "publication_status" = 'SCHEDULED' AND "deleted_at" IS NULL;

-- Revisions and audit trails are append-only at the database boundary.
CREATE FUNCTION "prevent_append_only_mutation"() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION '% is append-only', TG_TABLE_NAME USING ERRCODE = '55000';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "article_revision_append_only"
  BEFORE UPDATE OR DELETE ON "article_revision"
  FOR EACH ROW EXECUTE FUNCTION "prevent_append_only_mutation"();
CREATE TRIGGER "article_source_append_only"
  BEFORE UPDATE OR DELETE ON "article_source"
  FOR EACH ROW EXECUTE FUNCTION "prevent_append_only_mutation"();
CREATE TRIGGER "article_review_append_only"
  BEFORE UPDATE OR DELETE ON "article_review"
  FOR EACH ROW EXECUTE FUNCTION "prevent_append_only_mutation"();
CREATE TRIGGER "article_approval_append_only"
  BEFORE UPDATE OR DELETE ON "article_approval"
  FOR EACH ROW EXECUTE FUNCTION "prevent_append_only_mutation"();
CREATE TRIGGER "article_workflow_event_append_only"
  BEFORE UPDATE OR DELETE ON "article_workflow_event"
  FOR EACH ROW EXECUTE FUNCTION "prevent_append_only_mutation"();
CREATE TRIGGER "audit_log_append_only"
  BEFORE UPDATE OR DELETE ON "audit_log"
  FOR EACH ROW EXECUTE FUNCTION "prevent_append_only_mutation"();
