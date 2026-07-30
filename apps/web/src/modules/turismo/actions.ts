"use server";

import { prisma as db } from "@triunfo/database";
import { revalidatePath } from "next/cache";

export async function createTouristSpotAction(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const hours = formData.get("hours") as string | null;
  const imageUrl = formData.get("imageUrl") as string | null;
  const highlightsRaw = formData.get("highlights") as string | null;
  const isFeatured = formData.get("isFeatured") === "true";

  if (!name || !category || !description || !location) return;

  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const highlights = highlightsRaw
    ? highlightsRaw.split(",").map((h) => h.trim()).filter(Boolean)
    : [];

  try {
    await db.touristSpot.create({
      data: {
        name,
        slug,
        category,
        description,
        location,
        hours: hours || null,
        imageUrl: imageUrl || null,
        highlights,
        isFeatured,
      },
    });

    revalidatePath("/turismo");
    revalidatePath("/admin/turismo");
  } catch (error) {
    console.error("Erro ao criar ponto turístico:", error);
  }
}

export async function deleteTouristSpotAction(id: string): Promise<void> {
  try {
    await db.touristSpot.delete({ where: { id } });
    revalidatePath("/turismo");
    revalidatePath("/admin/turismo");
  } catch (error) {
    console.error("Erro ao excluir ponto turístico:", error);
  }
}
