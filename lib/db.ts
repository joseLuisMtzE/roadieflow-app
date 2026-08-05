import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { getPooledDatabaseUrl } from "@/lib/database-url";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = getPooledDatabaseUrl();

  const pool = globalForPrisma.pool ?? new Pool({ connectionString });
  if (!globalForPrisma.pool) {
    pool.on("error", (error) => {
      console.error("Unexpected idle PostgreSQL client error", error);
    });
  }

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export function getDb(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}
