import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth.config";

/** Edge-safe auth for proxy (JWT validation only, no Prisma). */
export const { auth: proxyAuth } = NextAuth(authConfig);
