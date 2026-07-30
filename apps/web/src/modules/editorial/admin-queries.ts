import { prisma } from "@triunfo/database";
import { createPrismaEditorialRepository } from "./prisma-repository";

export async function getEditorialFormOptions() {
  const [authors, categories] = await Promise.all([
    prisma.authorProfile.findMany({
      where: { user: { status: "ACTIVE", deletedAt: null } },
      orderBy: { displayName: "asc" },
      select: { id: true, displayName: true },
    }),
    prisma.category.findMany({
      where: { isActive: true, deletedAt: null },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: { id: true, name: true },
    }),
  ]);

  return { authors, categories };
}

export async function getAdminArticleById(articleId: string) {
  const repository = createPrismaEditorialRepository();
  const article = await repository.getArticle(articleId);
  if (!article) return null;
  const [workingCopy, currentRevision, revisions] = await Promise.all([
    repository.getWorkingCopy(articleId),
    article.currentRevisionId
      ? repository.getRevision(article.currentRevisionId)
      : Promise.resolve(null),
    prisma.articleRevision.findMany({
      where: { articleId },
      orderBy: { version: "desc" },
      select: {
        id: true,
        version: true,
        checkpoint: true,
        title: true,
        summary: true,
        slug: true,
        createdAt: true,
      },
    }),
  ]);
  if (!workingCopy) return null;
  return { article, workingCopy, currentRevision, revisions };
}
