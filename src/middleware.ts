import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TIF_AUTH_COOKIE, validateTifAccessKey } from "@/lib/tif/auth";

// Gates /tif/* behind access-key auth. The console reads/writes real Evidence/Opportunity/
// Asset/CaptureItem data and was never meant to be reachable without a shared secret —
// this is the minimum acceptable protection, not a user/account system.
export function middleware(request: NextRequest) {
  if (!process.env.TIF_ACCESS_KEY) {
    // Fail closed: if the key isn't configured, block access rather than leaving it open.
    return new NextResponse("TIF_ACCESS_KEY is not configured.", { status: 503 });
  }

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/tif/login";
  const cookieAuth = request.cookies.get(TIF_AUTH_COOKIE)?.value;
  if (validateTifAccessKey(cookieAuth)) {
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/tif", request.url));
    }
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
    const [, password] = decoded.split(":");
    if (validateTifAccessKey(password)) {
      const response = NextResponse.next();
      response.cookies.set(TIF_AUTH_COOKIE, password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 8,
        path: "/",
      });
      return response;
    }
  }

  if (isLoginPage) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/tif/login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: "/tif/:path*",
};
