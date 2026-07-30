import { prisma as db } from "@triunfo/database";

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  startDate: Date;
  endDate?: Date | null;
  timeText?: string | null;
  imageUrl?: string | null;
  isFeatured: boolean;
}

export async function getEvents(): Promise<EventItem[]> {
  try {
    const events = await db.event.findMany({
      orderBy: [{ isFeatured: "desc" }, { startDate: "asc" }],
    });
    return events;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }
}
