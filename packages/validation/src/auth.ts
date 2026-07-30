import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email().max(254);

export const passwordSchema = z.string().min(12).max(128);

export const loginCredentialsSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    rememberMe: z.boolean().optional(),
  })
  .strict();

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
