// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().optional(),
});

// simple in-memory limiter (ok for single-region dev)
let lastHit = 0;
export async function POST(req: Request) {
  try {
    // rate limit 1 req/sec
    const now = Date.now();
    if (now - lastHit < 1000) return NextResponse.json({ ok: false }, { status: 429 });
    lastHit = now;

    const formData = await req.formData();
    const payload = Object.fromEntries(formData.entries());
    const data = ContactSchema.parse(payload);

    // TODO: send to your inbox (Formspree webhook, email API, or CRM)
    // For now, log it so you can verify:
    console.log("[contact] submission", data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}