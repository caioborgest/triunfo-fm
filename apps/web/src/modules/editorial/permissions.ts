import { EditorialError } from "./errors";
import type {
  AuthorizationHook,
  EditorialActor,
  PermissionGrant,
  PermissionRequest,
} from "./types";

function grantMatches(
  actor: EditorialActor,
  grant: PermissionGrant,
  request: PermissionRequest,
): boolean {
  if (grant.resource !== request.resource || grant.action !== request.action) {
    return false;
  }

  if (grant.scope === "ANY") return true;
  if (grant.scope === "OWN") {
    return request.ownerId === undefined || request.ownerId === actor.id;
  }
  return request.assignedUserIds?.includes(actor.id) ?? false;
}

export const assertGrantAuthorization: AuthorizationHook = (actor, request) => {
  if (!actor.permissions.some((grant) => grantMatches(actor, grant, request))) {
    throw new EditorialError("FORBIDDEN", "Ação editorial não autorizada.", {
      resource: request.resource,
      action: request.action,
    });
  }
};
