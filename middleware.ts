import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Arcjet instance with base rules for all routes
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: "1m",
      max: 60,
    }),
  ],
});

// Stricter Arcjet instance for AI/chat endpoints
const ajAI = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:PREVIEW"],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: "1m",
      max: 10,
    }),
  ],
});

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Gate admin UI and API routes (login endpoints are exempt)
  const isAdminLogin = pathname === "/admin/login" || pathname === "/api/admin/auth";
  if (!isAdminLogin && (pathname.startsWith("/admin") || pathname.startsWith("/api/admin"))) {
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

  // Apply stricter rules to AI/chat API routes
  const instance =
    pathname.startsWith("/api/chat") || pathname.startsWith("/api/ai")
      ? ajAI
      : aj;

  const decision = await instance.protect(request);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      const res = NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
      Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
      return res;
    }
    const res = NextResponse.json({ error: "Access denied" }, { status: 403 });
    Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
    return res;
  }

  const response = NextResponse.next();
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => response.headers.set(k, v));
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
