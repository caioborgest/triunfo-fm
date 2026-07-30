"use server";

import { prisma as db } from "@triunfo/database";
import { revalidatePath } from "next/cache";

export async function createEventAction(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const startDateStr = formData.get("startDate") as string;
  const timeText = formData.get("timeText") as string | null;
  const imageUrl = formData.get("imageUrl") as string | null;
  const isFeatured = formData.get("isFeatured") === "true";

  if (!title || !category || !description || !location || !startDateStr) return;

  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    await db.event.create({
      data: {
        title,
        slug,
        category,
        description,
        location,
        startDate: new Date(startDateStr),
        timeText: timeText || null,
        imageUrl: imageUrl || null,
        isFeatured,
      },
    });

    revalidatePath("/eventos");
    revalidatePath("/admin/eventos");
    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao criar evento:", error);
  }
}

export async function deleteEventAction(id: string): Promise<void> {
  try {
    await db.event.delete({ where: { id } });
    revalidatePath("/eventos");
    revalidatePath("/admin/eventos");
    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao excluir evento:", error);
  }
}
