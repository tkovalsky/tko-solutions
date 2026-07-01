export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { TIF_AUTH_COOKIE, validateTifAccessKey } from "@/lib/tif/auth";

function safeNextPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "/tif";
  if (value !== "/tif" && !value.startsWith("/tif/")) return "/tif";
  if (value.startsWith("/tif/login")) return "/tif";
  return value;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const rawKey = formData.get("key");
  const key = typeof rawKey === "string" ? rawKey : "";
  const next = safeNextPath(formData.get("next"));

  if (!validateTifAccessKey(key)) {
    const loginUrl = new URL("/tif/login", req.url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", next);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.redirect(new URL(next, req.url));
  response.cookies.set(TIF_AUTH_COOKIE, key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return response;
}
