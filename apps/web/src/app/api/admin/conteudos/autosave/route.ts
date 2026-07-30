import { NextResponse } from "next/server";
import { requireActor } from "@/lib/auth";
import { editorialDependencies, toEditorialActor } from "@/lib/editorial";
import { parseTipTapJson, renderTipTapHtml } from "@/lib/tiptap-html";
import {
  saveWorkingCopy,
  type ContentKind,
  type JsonValue,
} from "@/modules/editorial";

export async function POST(request: Request) {
  try {
    const actor = toEditorialActor(await requireActor());
    const data = await request.json();

    const {
      articleId,
      articleVersion,
      workingCopyVersion,
      title,
      subtitle,
      proposedSlug,
      summary,
      bodyJson,
      authorProfileId,
      categoryId,
      heroMediaAssetId,
      heroAltText,
      heroCaption,
      heroCredit,
      location,
      contentKind = "NEWS",
      isExclusive = false,
      isSensitive = false,
      sourceName,
      sourceUrl,
    } = data;

    if (!articleId || articleVersion === undefined || workingCopyVersion === undefined) {
      return NextResponse.json(
        { error: "Parâmetros obrigatórios ausentes para o salvamento automático." },
        { status: 400 }
      );
    }

    const bodyDocument = parseTipTapJson(bodyJson);

    const savedWorkingCopy = await saveWorkingCopy(editorialDependencies, actor, {
      articleId,
      expectedArticleVersion: Number(articleVersion),
      expectedWorkingCopyVersion: Number(workingCopyVersion),
      content: {
        title: String(title ?? "").trim(),
        subtitle: subtitle ? String(subtitle).trim() : null,
        proposedSlug: String(proposedSlug ?? "").trim(),
        summary: String(summary ?? "").trim(),
        bodyJson: bodyDocument as unknown as JsonValue,
        bodyHtml: renderTipTapHtml(bodyDocument),
        authorProfileId: authorProfileId || null,
        categoryId: categoryId || null,
        heroMediaAssetId: heroMediaAssetId || null,
        heroAltText: heroAltText || null,
        heroCaption: heroCaption || null,
        heroCredit: heroCredit || null,
        location: location || null,
        occurredAt: null,
        contentKind: contentKind as ContentKind,
        isExclusive: Boolean(isExclusive),
        isSponsored: contentKind === "SPONSORED",
        sponsorDisclosure: null,
        isSensitive: Boolean(isSensitive),
        allowComments: false,
        tagIds: [],
        sources: [
          {
            sourceClass: "PRIMARY",
            kind: sourceUrl ? "WEBSITE" : "INTERVIEW",
            name: sourceName || null,
            publisher: null,
            title: null,
            url: sourceUrl || null,
            publishedAt: null,
            accessedAt: sourceUrl ? new Date().toISOString() : null,
            publicNote: null,
            isOfficial: false,
          },
        ],
        mediaUsages: [],
        seoDraft: null,
        geoDraft: null,
      },
    });

    return NextResponse.json({
      success: true,
      workingCopyVersion: savedWorkingCopy.workingCopy.lockVersion,
      savedAt: savedWorkingCopy.workingCopy.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Erro no autosave:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao salvar rascunho automaticamente." },
      { status: 500 }
    );
  }
}
