import {
  assertPermission,
  auth,
  AuthenticationRequiredError,
  loadActor,
  type Actor,
  type AuthSession,
  type PermissionContext,
} from "@triunfo/auth";
import { headers } from "next/headers";

export { auth };
export type { Actor, AuthSession, PermissionContext };

export async function getSession(): Promise<AuthSession | null> {
  return auth.api.getSession({
    headers: await headers(),
  });
}

/** Returns null for missing, expired, disabled or deleted users. */
export async function getActor(): Promise<Actor | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return loadActor(session.user.id);
}

export async function requireActor(): Promise<Actor> {
  const actor = await getActor();

  if (!actor) {
    throw new AuthenticationRequiredError();
  }

  return actor;
}

/**
 * Without context, checks whether the actor has the route-level capability.
 * For a mutation, pass ownership/assignment context or an explicit scoped key
 * such as `article.edit:OWN`.
 */
export async function requirePermission(
  permission: string,
  context?: PermissionContext,
): Promise<Actor> {
  const actor = await requireActor();
  return assertPermission(actor, permission, context);
}
