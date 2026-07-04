import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("crm_session");
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isCrmPath = request.nextUrl.pathname.startsWith("/crm");
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");

  if ((isCrmPath || isAdminPath) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/crm", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crm/:path*", "/admin/:path*", "/login"],
};
