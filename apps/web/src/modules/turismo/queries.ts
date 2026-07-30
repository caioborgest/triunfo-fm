import { prisma as db } from "@triunfo/database";

export interface TouristSpotItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  hours?: string | null;
  imageUrl?: string | null;
  highlights: string[];
  isFeatured: boolean;
}

export async function getTouristSpots(): Promise<TouristSpotItem[]> {
  try {
    const spots = await db.touristSpot.findMany({
      orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    });
    return spots.map((spot: { id: string; name: string; slug: string; category: string; description: string; location: string; hours: string | null; imageUrl: string | null; highlights: any; isFeatured: boolean }) => ({
      ...spot,
      highlights: Array.isArray(spot.highlights) ? (spot.highlights as string[]) : [],
    }));
  } catch (error) {
    console.error("Erro ao buscar pontos turísticos:", error);
    return [];
  }
}
