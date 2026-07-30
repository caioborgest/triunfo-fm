"use server";

import { prisma as db } from "@triunfo/database";
import { revalidatePath } from "next/cache";

export async function createProgramAction(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const scheduleText = formData.get("scheduleText") as string | null;
  const presenterName = formData.get("presenterName") as string | null;

  if (!title) return;

  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    let presenterId: string | null = null;
    if (presenterName) {
      const presenter = await db.presenter.create({
        data: { name: presenterName, role: "Locutor(a)" },
      });
      presenterId = presenter.id;
    }

    await db.program.create({
      data: {
        title,
        slug,
        description: description || null,
        scheduleText: scheduleText || null,
        presenterId,
      },
    });

    revalidatePath("/programacao");
    revalidatePath("/admin/programacao");
  } catch (error) {
    console.error("Erro ao criar programa:", error);
  }
}

export async function deleteProgramAction(id: string): Promise<void> {
  try {
    await db.program.delete({ where: { id } });
    revalidatePath("/programacao");
    revalidatePath("/admin/programacao");
  } catch (error) {
    console.error("Erro ao excluir programa:", error);
  }
}
