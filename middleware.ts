import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

function isAdminAuthorized(request: NextRequest): boolean {
  const token = process.env.SECURITY_TOKEN;
  if (!token) return false;

  // API routes: check Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${token}`) return true;

  // UI routes: check admin_token cookie
  const cookie = request.cookies.get("admin_token")?.value;
  return cookie === token;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Gate admin UI and API routes (login endpoints are exempt)
  const isAdminLogin =
    pathname === "/admin/login" || pathname === "/api/admin/auth";
  if (
    !isAdminLogin &&
    (pathname.startsWith("/admin") || pathname.startsWith("/api/admin"))
  ) {
    if (!isAdminAuthorized(request)) {
      if (pathname.startsWith("/api/")) {
        const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
        return res;
      }
      // Redirect admin UI to login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) =>
    response.headers.set(k, v)
  );
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
