import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gates /tif/* behind HTTP Basic Auth. The console reads/writes real Evidence/Opportunity/
// Asset/CaptureItem data and was never meant to be reachable without a shared secret —
// this is the minimum acceptable protection, not a user/account system.
export function middleware(request: NextRequest) {
  const accessKey = process.env.TIF_ACCESS_KEY;
  if (!accessKey) {
    // Fail closed: if the key isn't configured, block access rather than leaving it open.
    return new NextResponse("TIF_ACCESS_KEY is not configured.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
    const [, password] = decoded.split(":");
    if (password === accessKey) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="TIF Operator Console"' },
  });
}

export const config = {
  matcher: "/tif/:path*",
};
