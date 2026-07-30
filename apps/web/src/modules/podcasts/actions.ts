"use server";

import { prisma as db } from "@triunfo/database";
import { revalidatePath } from "next/cache";

export async function createPodcastAction(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const host = formData.get("host") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const category = formData.get("category") as string | null;

  if (!title || !host || !description) return;

  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    await db.podcast.create({
      data: {
        title,
        slug,
        host,
        description,
        imageUrl: imageUrl || null,
        category: category || null,
      },
    });

    revalidatePath("/podcasts");
    revalidatePath("/admin/podcasts");
  } catch (error) {
    console.error("Erro ao criar podcast:", error);
  }
}

export async function deletePodcastAction(id: string): Promise<void> {
  try {
    await db.podcast.delete({ where: { id } });
    revalidatePath("/podcasts");
    revalidatePath("/admin/podcasts");
  } catch (error) {
    console.error("Erro ao excluir podcast:", error);
  }
}
