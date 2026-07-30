import { getServerEnvironment } from "@triunfo/config/server";
import { prisma } from "@triunfo/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError } from "better-auth/api";

const environment = getServerEnvironment();

const trustedOrigins = [
  environment.BETTER_AUTH_URL,
  environment.NEXT_PUBLIC_SITE_URL,
].filter((origin, index, origins) => origins.indexOf(origin) === index);

export const auth = betterAuth({
  appName: environment.NEXT_PUBLIC_SITE_NAME,
  baseURL: environment.BETTER_AUTH_URL,
  basePath: "/api/auth",
  secret: environment.BETTER_AUTH_SECRET,
  trustedOrigins,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: environment.AUTH_DISABLE_SIGNUP,
    requireEmailVerification: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: 60 * 60,
  },
  user: {
    additionalFields: {
      status: {
        type: ["INVITED", "ACTIVE", "SUSPENDED", "DISABLED"],
        required: true,
        defaultValue: "INVITED",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 12,
    updateAge: 60 * 60,
    cookieCache: {
      enabled: false,
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    storage: "memory",
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 5,
      },
    },
  },
  disabledPaths: ["/sign-up/email"],
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const activeUser = await prisma.user.findFirst({
            where: {
              id: session.userId,
              status: "ACTIVE",
              deletedAt: null,
            },
            select: { id: true },
          });

          if (!activeUser) {
            throw new APIError("FORBIDDEN", {
              message: "Não foi possível iniciar a sessão.",
            });
          }

          return { data: session };
        },
      },
    },
  },
  advanced: {
    useSecureCookies: environment.NODE_ENV === "production",
    database: {
      generateId: "uuid",
    },
  },
  telemetry: {
    enabled: false,
  },
});

export type AuthSession = typeof auth.$Infer.Session;
