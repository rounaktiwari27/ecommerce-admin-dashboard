import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const admin = req.cookies.get("admin")?.value;
  const pathname = req.nextUrl.pathname;

  // Protect dashboard routes only
  if (pathname.startsWith("/dashboard") && admin !== "true") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};