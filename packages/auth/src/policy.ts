import {
  permissionKeySchema,
  type PermissionGrant,
  type PermissionScope,
} from "@triunfo/validation/permission";

import { InvalidPermissionError, PermissionDeniedError } from "./errors";

export type { PermissionGrant, PermissionScope };

export interface Actor {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly roleKeys: readonly string[];
  readonly grants: readonly PermissionGrant[];
}

export interface PermissionContext {
  /** For creation or list guards, request an explicit scope. */
  readonly requiredScope?: PermissionScope;
  /** Owner of an existing resource. */
  readonly ownerId?: string | null;
  /** Users assigned to an existing resource. */
  readonly assignedUserIds?: readonly string[];
}

export interface ParsedPermission {
  readonly resource: string;
  readonly action: string;
  readonly scope?: PermissionScope;
}

export function permissionKey(grant: PermissionGrant): string {
  return `${grant.resource}.${grant.action}:${grant.scope}`;
}

export function parsePermission(permission: string): ParsedPermission {
  const parsed = permissionKeySchema.safeParse(permission);

  if (!parsed.success) {
    throw new InvalidPermissionError(permission);
  }

  const [capability = "", requestedScope] = parsed.data.split(":");
  const separator = capability.lastIndexOf(".");
  const resource = capability.slice(0, separator);
  const action = capability.slice(separator + 1);

  if (requestedScope) {
    return {
      resource,
      action,
      scope: requestedScope as PermissionScope,
    };
  }

  return { resource, action };
}

function resolveTargetScope(
  actorId: string,
  requestedScope: PermissionScope | undefined,
  context: PermissionContext | undefined,
): PermissionScope | undefined {
  if (requestedScope) {
    return requestedScope;
  }

  if (context?.requiredScope) {
    return context.requiredScope;
  }

  if (context?.ownerId === actorId) {
    return "OWN";
  }

  if (context?.assignedUserIds?.includes(actorId)) {
    return "ASSIGNED";
  }

  if (
    context &&
    (Object.hasOwn(context, "ownerId") ||
      Object.hasOwn(context, "assignedUserIds"))
  ) {
    return "ANY";
  }

  return undefined;
}

function grantCoversScope(
  grantScope: PermissionScope,
  targetScope: PermissionScope,
): boolean {
  return grantScope === "ANY" || grantScope === targetScope;
}

/**
 * Checks a route-level capability when no context is supplied. Pass a context
 * (or append `:OWN`, `:ASSIGNED`, or `:ANY`) for resource-level authorization.
 */
export function can(
  actor: Actor,
  permission: string,
  context?: PermissionContext,
): boolean {
  const requested = parsePermission(permission);
  const matchingGrants = actor.grants.filter(
    (grant) =>
      grant.resource === requested.resource && grant.action === requested.action,
  );

  if (matchingGrants.length === 0) {
    return false;
  }

  const targetScope = resolveTargetScope(actor.id, requested.scope, context);

  if (!targetScope) {
    return true;
  }

  return matchingGrants.some((grant) =>
    grantCoversScope(grant.scope, targetScope),
  );
}

export function assertPermission(
  actor: Actor,
  permission: string,
  context?: PermissionContext,
): Actor {
  if (!can(actor, permission, context)) {
    throw new PermissionDeniedError(permission);
  }

  return actor;
}

export function deduplicateGrants(
  grants: readonly PermissionGrant[],
): PermissionGrant[] {
  const unique = new Map<string, PermissionGrant>();

  for (const grant of grants) {
    unique.set(permissionKey(grant), grant);
  }

  return [...unique.values()].sort((left, right) =>
    permissionKey(left).localeCompare(permissionKey(right)),
  );
}
