import { prisma as db } from "@triunfo/database";

export interface SponsorItem {
  id: string;
  name: string;
  imageUrl: string;
  linkUrl: string;
  placement: string;
  isActive: boolean;
  position: number;
}

export async function getSponsors(placement?: string): Promise<SponsorItem[]> {
  try {
    const sponsors = await db.sponsor.findMany({
      where: {
        isActive: true,
        ...(placement ? { placement } : {}),
      },
      orderBy: { position: "asc" },
    });
    return sponsors;
  } catch (error) {
    console.error("Erro ao buscar patrocinadores:", error);
    return [];
  }
}
