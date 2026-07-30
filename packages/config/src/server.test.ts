import { describe, expect, it } from "vitest";

import { getServerEnvironment } from "./server";

const validEnvironment = {
  NODE_ENV: "test",
  DATABASE_URL: "postgresql://user:password@localhost:5432/triunfo_test",
  BETTER_AUTH_SECRET: "a-secure-test-secret-with-more-than-32-characters",
  BETTER_AUTH_URL: "http://localhost:3000",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  NEXT_PUBLIC_SITE_NAME: "Triunfo FM 87,9",
  AUTH_DISABLE_SIGNUP: "true",
} satisfies NodeJS.ProcessEnv;

describe("getServerEnvironment", () => {
  it("aceita uma configuração segura com signup desativado", () => {
    expect(getServerEnvironment(validEnvironment)).toMatchObject({
      NODE_ENV: "test",
      AUTH_DISABLE_SIGNUP: true,
    });
  });

  it("recusa habilitar cadastro público", () => {
    expect(() =>
      getServerEnvironment({
        ...validEnvironment,
        AUTH_DISABLE_SIGNUP: "false",
      }),
    ).toThrow(/cadastro público deve permanecer desativado/);
  });

  it("recusa segredo curto sem incluir seu valor no erro", () => {
    const secret = "curto";

    expect(() =>
      getServerEnvironment({
        ...validEnvironment,
        BETTER_AUTH_SECRET: secret,
      }),
    ).toThrow(/BETTER_AUTH_SECRET/);

    try {
      getServerEnvironment({
        ...validEnvironment,
        BETTER_AUTH_SECRET: secret,
      });
    } catch (error) {
      expect(String(error)).not.toContain(secret);
    }
  });

  it("normaliza URLs para origens confiáveis", () => {
    expect(
      getServerEnvironment({
        ...validEnvironment,
        BETTER_AUTH_URL: "http://localhost:3000/",
      }).BETTER_AUTH_URL,
    ).toBe("http://localhost:3000");
  });

  it("recusa HTTP e segredo de exemplo em produção", () => {
    expect(() =>
      getServerEnvironment({
        ...validEnvironment,
        NODE_ENV: "production",
        BETTER_AUTH_SECRET:
          "replace-with-a-real-production-secret-that-is-long-enough",
      }),
    ).toThrow(/produção/);
  });
});
