"use server";

import { prisma as db } from "@triunfo/database";
import { revalidatePath } from "next/cache";

export async function createSponsorAction(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const linkUrl = formData.get("linkUrl") as string;
  const placement = (formData.get("placement") as string) || "HOME_PATROCINADORES";

  if (!name || !imageUrl || !linkUrl) return;

  try {
    const count = await db.sponsor.count();

    await db.sponsor.create({
      data: {
        name,
        imageUrl,
        linkUrl,
        placement,
        position: count + 1,
        isActive: true,
      },
    });

    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath("/admin/anunciantes");
  } catch (error) {
    console.error("Erro ao cadastrar patrocinador:", error);
  }
}

export async function deleteSponsorAction(id: string): Promise<void> {
  try {
    await db.sponsor.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/noticias");
    revalidatePath("/admin/anunciantes");
  } catch (error) {
    console.error("Erro ao excluir patrocinador:", error);
  }
}
