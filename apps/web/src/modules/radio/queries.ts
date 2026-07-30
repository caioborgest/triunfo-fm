import { prisma as db } from "@triunfo/database";

export interface ProgramWithPresenter {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  scheduleText?: string | null;
  imageUrl?: string | null;
  presenter?: {
    id: string;
    name: string;
    role?: string | null;
    imageUrl?: string | null;
  } | null;
}

export interface ScheduleItem {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  program: ProgramWithPresenter;
}

export async function getPrograms(): Promise<ProgramWithPresenter[]> {
  try {
    const programs = await db.program.findMany({
      include: { presenter: true },
      orderBy: { title: "asc" },
    });
    return programs;
  } catch (error) {
    console.error("Erro ao buscar programas da rádio:", error);
    return [];
  }
}

export async function getScheduleSlots(): Promise<ScheduleItem[]> {
  try {
    const slots = await db.scheduleSlot.findMany({
      include: {
        program: {
          include: { presenter: true },
        },
      },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });
    return slots;
  } catch (error) {
    console.error("Erro ao buscar grade de programação:", error);
    return [];
  }
}
