import type { Actor } from "@triunfo/auth";
import {
  createPrismaEditorialRepository,
  type EditorialActor,
} from "@/modules/editorial";

export const editorialRepository = createPrismaEditorialRepository();

export const editorialDependencies = {
  repository: editorialRepository,
} as const;

export function toEditorialActor(actor: Actor): EditorialActor {
  return {
    id: actor.id,
    permissions: actor.grants,
  };
}
