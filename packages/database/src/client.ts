import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "./generated/client/client";

const globalForPrisma = globalThis as unknown as {
  triunfoPrisma?: PrismaClient;
};

export function createPrismaClient(connectionString = process.env.DATABASE_URL): PrismaClient {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is required to create the Triunfo FM database client.",
    );
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export function getPrismaClient(): PrismaClient {
  const client = globalForPrisma.triunfoPrisma ?? createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.triunfoPrisma = client;
  }
  return client;
}

// A lazy proxy keeps builds and pure domain tests independent from DATABASE_URL.
// The first database operation still fails fast with the explicit message above.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = getPrismaClient();
    const value: unknown = Reflect.get(client, property, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
