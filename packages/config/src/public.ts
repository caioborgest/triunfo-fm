import { z } from "zod";

const httpUrlSchema = z
  .string()
  .trim()
  .url()
  .refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "deve usar o protocolo http ou https")
  .transform((value) => new URL(value).origin);

export const publicEnvironmentSchema = z.object({
  NEXT_PUBLIC_SITE_URL: httpUrlSchema.default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .default("Triunfo FM 87,9"),
});

export type PublicEnvironment = z.infer<typeof publicEnvironmentSchema>;

function formatEnvironmentError(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "environment"}: ${issue.message}`)
    .join("; ");
}

export function getPublicEnvironment(
  source: Partial<
    Record<"NEXT_PUBLIC_SITE_URL" | "NEXT_PUBLIC_SITE_NAME", string>
  > = process.env,
): PublicEnvironment {
  const parsed = publicEnvironmentSchema.safeParse(source);

  if (!parsed.success) {
    throw new Error(
      `Configuração pública inválida: ${formatEnvironmentError(parsed.error)}`,
    );
  }

  return parsed.data;
}
