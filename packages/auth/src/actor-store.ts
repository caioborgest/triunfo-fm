import { prisma } from "@triunfo/database";

import { deduplicateGrants, type Actor, type PermissionGrant } from "./policy";

/**
 * Resolves current access from the database on every protected server request.
 * This intentionally avoids putting RBAC claims in a long-lived cookie.
 */
export async function loadActor(
  userId: string,
  now: Date = new Date(),
): Promise<Actor | null> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      status: "ACTIVE",
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      userRoles: {
        where: {
          revokedAt: null,
          OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
          role: {
            deletedAt: null,
          },
        },
        select: {
          role: {
            select: {
              key: true,
              rolePermissions: {
                where: {
                  revokedAt: null,
                  OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
                },
                select: {
                  permission: {
                    select: {
                      resource: true,
                      action: true,
                      scope: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const grants: PermissionGrant[] = user.userRoles.flatMap(({ role }) =>
    role.rolePermissions.map(({ permission }) => ({
      resource: permission.resource,
      action: permission.action,
      scope: permission.scope,
    })),
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roleKeys: [...new Set(user.userRoles.map(({ role }) => role.key))].sort(),
    grants: deduplicateGrants(grants),
  };
}
