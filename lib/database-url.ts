/**
 * Resuelve URLs de Postgres según el entorno.
 * Vercel + Neon inyecta DATABASE_URL (pool) y DATABASE_URL_UNPOOLED (directo).
 */
export function getPooledDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL;

  if (!url) {
    throw new Error("DATABASE_URL no está definida");
  }

  return url;
}

/** Conexión directa para Prisma CLI (migrate, db push). */
export function getDirectDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL_UNPOOLED ??
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.DIRECT_URL ??
    getPooledDatabaseUrl()
  );
}
