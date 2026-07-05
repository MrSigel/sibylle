import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { crmSessionCookie, verifyCrmSessionToken } from "@/lib/sibylle/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(crmSessionCookie)?.value;
  const hasValidSession = await verifyCrmSessionToken(session);
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isCrmPath = request.nextUrl.pathname.startsWith("/crm");
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");

  if ((isCrmPath || isAdminPath) && !hasValidSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && hasValidSession) {
    return NextResponse.redirect(new URL("/crm", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crm/:path*", "/admin/:path*", "/login"],
};
