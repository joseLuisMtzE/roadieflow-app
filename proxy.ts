import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { proxyAuth } from "@/lib/auth.proxy";

const protectedPaths = ["/", "/itinerary", "/events", "/artists", "/profile"];

function isProtectedPath(pathname: string): boolean {
  return protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const session = await proxyAuth();
  if (session?.user) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/",
    "/itinerary/:path*",
    "/events/:path*",
    "/artists/:path*",
    "/profile/:path*",
  ],
};
