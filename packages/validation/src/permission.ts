import { z } from "zod";

const permissionSegmentSchema = z
  .string()
  .trim()
  .min(1)
  .max(64)
  .regex(
    /^[a-z][a-z0-9_-]*$/,
    "deve iniciar com uma letra minúscula e conter apenas letras, números, _ ou -",
  );

export const permissionScopeSchema = z.enum(["OWN", "ASSIGNED", "ANY"]);

export const permissionGrantSchema = z
  .object({
    resource: permissionSegmentSchema,
    action: permissionSegmentSchema,
    scope: permissionScopeSchema,
  })
  .strict();

export const permissionKeySchema = z
  .string()
  .trim()
  .regex(
    /^[a-z][a-z0-9_-]*\.[a-z][a-z0-9_-]*(?::(?:OWN|ASSIGNED|ANY))?$/,
    "use resource.action ou resource.action:SCOPE",
  );

export type PermissionScope = z.infer<typeof permissionScopeSchema>;
export type PermissionGrant = z.infer<typeof permissionGrantSchema>;
