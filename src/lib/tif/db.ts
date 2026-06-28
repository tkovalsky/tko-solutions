// Shared Prisma client for the TIF Operator Console (read-only consumer of the v0.1 spine).
// Mirrors the adapter setup in scripts/tif/compose-asset.mjs and scripts/tif/seed.mjs.
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { tifPrisma?: PrismaClient };

export const tifDb =
  globalForPrisma.tifPrisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.tifPrisma = tifDb;
}
