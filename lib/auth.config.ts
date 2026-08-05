import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";

import { Role } from "@/lib/generated/prisma/client";

declare module "next-auth" {
  interface User {
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    email?: string;
  }
}

export const authConfig = {
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.email = user.email ?? undefined;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.email = token.email ?? "";
        session.user.role = (token as JWT).role ?? Role.ROAD_STAFF;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
