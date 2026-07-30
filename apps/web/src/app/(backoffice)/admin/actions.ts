"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireActor } from "@/lib/auth";
import { editorialDependencies, toEditorialActor } from "@/lib/editorial";
import { parseTipTapJson, renderTipTapHtml } from "@/lib/tiptap-html";
import {
  approveArticleRevision,
  createArticle,
  endorseArticleRevision,
  publishArticle,
  requestArticleChanges,
  saveWorkingCopy,
  submitArticle,
  type ContentKind,
  type EditableArticleContent,
  type JsonValue,
} from "@/modules/editorial";

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalText(formData: FormData, key: string): string | null {
  return text(formData, key) || null;
}

function integer(formData: FormData, key: string): number {
  const value = Number.parseInt(text(formData, key), 10);
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`Valor inválido: ${key}.`);
  return value;
}

function articleContent(formData: FormData): EditableArticleContent {
  const bodyDocument = parseTipTapJson(text(formData, "bodyJson"));
  const contentKind = text(formData, "contentKind") as ContentKind;
  const sourceUrl = optionalText(formData, "sourceUrl");

  return {
    title: text(formData, "title"),
    subtitle: optionalText(formData, "subtitle"),
    proposedSlug: text(formData, "proposedSlug"),
    summary: text(formData, "summary"),
    bodyJson: bodyDocument as unknown as JsonValue,
    bodyHtml: renderTipTapHtml(bodyDocument),
    authorProfileId: optionalText(formData, "authorProfileId"),
    categoryId: optionalText(formData, "categoryId"),
    heroMediaAssetId: optionalText(formData, "heroMediaAssetId"),
    heroAltText: optionalText(formData, "heroAltText"),
    heroCaption: optionalText(formData, "heroCaption"),
    heroCredit: optionalText(formData, "heroCredit"),
    location: optionalText(formData, "location"),
    occurredAt: null,
    contentKind,
    isExclusive: formData.get("isExclusive") === "on",
    isSponsored: contentKind === "SPONSORED",
    sponsorDisclosure: optionalText(formData, "sponsorDisclosure"),
    isSensitive: formData.get("isSensitive") === "on",
    allowComments: false,
    tagIds: [],
    sources: [
      {
        sourceClass: "PRIMARY",
        kind: sourceUrl ? "WEBSITE" : "INTERVIEW",
        name: optionalText(formData, "sourceName"),
        publisher: null,
        title: null,
        url: sourceUrl,
        publishedAt: null,
        accessedAt: sourceUrl ? new Date().toISOString() : null,
        publicNote: null,
        isOfficial: false,
      },
    ],
    mediaUsages: [],
    seoDraft: null,
    geoDraft: null,
  };
}

async function actor() {
  return toEditorialActor(await requireActor());
}

export async function createArticleAction(formData: FormData) {
  const editorialActor = await actor();
  const created = await createArticle(editorialDependencies, editorialActor, {
    primaryAuthorProfileId: optionalText(formData, "authorProfileId"),
  });
  await saveWorkingCopy(editorialDependencies, editorialActor, {
    articleId: created.article.id,
    expectedArticleVersion: created.article.lockVersion,
    expectedWorkingCopyVersion: created.workingCopy.lockVersion,
    content: articleContent(formData),
  });
  revalidatePath("/admin/conteudos");
  redirect(`/admin/conteudos/${created.article.id}?created=1`);
}

export async function saveArticleAction(formData: FormData) {
  const articleId = text(formData, "articleId");
  await saveWorkingCopy(editorialDependencies, await actor(), {
    articleId,
    expectedArticleVersion: integer(formData, "articleVersion"),
    expectedWorkingCopyVersion: integer(formData, "workingCopyVersion"),
    content: articleContent(formData),
  });
  revalidatePath(`/admin/conteudos/${articleId}`);
  revalidatePath("/admin/conteudos");
  redirect(`/admin/conteudos/${articleId}?saved=1`);
}

export async function submitArticleAction(formData: FormData) {
  const articleId = text(formData, "articleId");
  await submitArticle(editorialDependencies, await actor(), {
    articleId,
    expectedArticleVersion: integer(formData, "articleVersion"),
    expectedWorkingCopyVersion: integer(formData, "workingCopyVersion"),
    changeSummary: optionalText(formData, "reason"),
  });
  revalidatePath("/admin", "layout");
  redirect(`/admin/conteudos/${articleId}?submitted=1`);
}

export async function requestChangesAction(formData: FormData) {
  const articleId = text(formData, "articleId");
  await requestArticleChanges(editorialDependencies, await actor(), {
    articleId,
    revisionId: text(formData, "revisionId"),
    expectedArticleVersion: integer(formData, "articleVersion"),
    comment: text(formData, "reason"),
  });
  revalidatePath("/admin", "layout");
  redirect(`/admin/conteudos/${articleId}?changes-requested=1`);
}

export async function endorseArticleAction(formData: FormData) {
  const articleId = text(formData, "articleId");
  await endorseArticleRevision(editorialDependencies, await actor(), {
    articleId,
    revisionId: text(formData, "revisionId"),
    expectedArticleVersion: integer(formData, "articleVersion"),
    comment: optionalText(formData, "reason"),
  });
  revalidatePath("/admin", "layout");
  redirect(`/admin/conteudos/${articleId}?endorsed=1`);
}

export async function approveArticleAction(formData: FormData) {
  const articleId = text(formData, "articleId");
  await approveArticleRevision(editorialDependencies, await actor(), {
    articleId,
    revisionId: text(formData, "revisionId"),
    expectedArticleVersion: integer(formData, "articleVersion"),
    comment: optionalText(formData, "reason"),
  });
  revalidatePath("/admin", "layout");
  redirect(`/admin/conteudos/${articleId}?approved=1`);
}

export async function publishArticleAction(formData: FormData) {
  const articleId = text(formData, "articleId");
  const published = await publishArticle(editorialDependencies, await actor(), {
    articleId,
    revisionId: text(formData, "revisionId"),
    expectedArticleVersion: integer(formData, "articleVersion"),
  });
  revalidatePath("/");
  revalidatePath(`/noticias/${published.revision.slug}`);
  revalidatePath("/admin", "layout");
  redirect(`/admin/conteudos/${articleId}?published=1`);
}
