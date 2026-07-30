"use server";

import { prisma as db } from "@triunfo/database";
import { revalidatePath } from "next/cache";
import { extractYouTubeId } from "./queries";

export async function addYouTubeVideoAction(formData: FormData): Promise<void> {
  const youtubeUrl = formData.get("youtubeUrl") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const isFeatured = formData.get("isFeatured") === "true";

  if (!youtubeUrl || !title) return;

  const youtubeId = extractYouTubeId(youtubeUrl);
  if (!youtubeId) return;

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  try {
    const count = await db.youTubeVideo.count();

    await db.youTubeVideo.create({
      data: {
        youtubeUrl,
        youtubeId,
        title,
        description: description || null,
        thumbnailUrl,
        isFeatured,
        position: count + 1,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/youtube");
  } catch (error) {
    console.error("Erro ao adicionar vídeo do YouTube:", error);
  }
}

export async function deleteYouTubeVideoAction(id: string): Promise<void> {
  try {
    await db.youTubeVideo.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/youtube");
  } catch (error) {
    console.error("Erro ao deletar vídeo do YouTube:", error);
  }
}
