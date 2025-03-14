import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/write"];
const reverseProtectedRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isReverseProtectedRoute = reverseProtectedRoutes.includes(path);

  const sessionCookie = getSessionCookie(req, {
    // Optionally pass config if cookie name, prefix or useSecureCookies option is customized in auth config.
    cookieName: "session_token",
    cookiePrefix: "better-auth",
  });

  // redirect to home if accessing route while been authenticated
  if (isReverseProtectedRoute && !!sessionCookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // redirect to sign in if accession route while not been authenticated
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
