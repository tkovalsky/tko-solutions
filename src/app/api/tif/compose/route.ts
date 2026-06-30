import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { runCompose } from "@/lib/tif/execution";

export const runtime = "nodejs";

function isAuthorized(request: NextRequest) {
  const accessKey = process.env.TIF_ACCESS_KEY;
  if (!accessKey) return false;

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const apiKey = request.headers.get("x-tif-access-key");

  return bearer === accessKey || apiKey === accessKey;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const result = runCompose(payload);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid compose payload",
          issues: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Draft composition failed",
      },
      { status: 400 },
    );
  }
}

