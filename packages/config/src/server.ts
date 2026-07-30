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

const signupDisabledSchema = z
  .enum(["true", "false"])
  .default("true")
  .transform((value) => value === "true")
  .refine((value) => value, "o cadastro público deve permanecer desativado");

export const serverEnvironmentSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().trim().min(1),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: httpUrlSchema,
    NEXT_PUBLIC_SITE_URL: httpUrlSchema.default("http://localhost:3000"),
    NEXT_PUBLIC_SITE_NAME: z
      .string()
      .trim()
      .min(1)
      .max(80)
      .default("Triunfo FM 87,9"),
    AUTH_DISABLE_SIGNUP: signupDisabledSchema,
  })
  .superRefine((environment, context) => {
    if (environment.NODE_ENV !== "production") {
      return;
    }

    if (
      !environment.BETTER_AUTH_URL.startsWith("https://") ||
      !environment.NEXT_PUBLIC_SITE_URL.startsWith("https://")
    ) {
      context.addIssue({
        code: "custom",
        path: ["BETTER_AUTH_URL"],
        message: "produção exige URLs HTTPS",
      });
    }

    if (/replace|change|example/i.test(environment.BETTER_AUTH_SECRET)) {
      context.addIssue({
        code: "custom",
        path: ["BETTER_AUTH_SECRET"],
        message: "produção não aceita segredo de exemplo",
      });
    }
  });

export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;

let cachedEnvironment: ServerEnvironment | undefined;

function formatEnvironmentError(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "environment"}: ${issue.message}`)
    .join("; ");
}

export function getServerEnvironment(
  source: NodeJS.ProcessEnv = process.env,
): ServerEnvironment {
  if (source === process.env && cachedEnvironment) {
    return cachedEnvironment;
  }

  const parsed = serverEnvironmentSchema.safeParse(source);

  if (!parsed.success) {
    throw new Error(
      `Configuração de servidor inválida: ${formatEnvironmentError(parsed.error)}`,
    );
  }

  if (source === process.env) {
    cachedEnvironment = parsed.data;
  }

  return parsed.data;
}
