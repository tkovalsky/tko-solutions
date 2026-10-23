import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyLead } from "@/lib/leads/notify";
import { persistInboundLead } from "@/lib/leads/persist";

// The BoundOS product site posts its /apply form here (decision D4): one lead store, one
// Today view. Only its production origins may call cross-origin; other callers are same-origin.
const BOUNDOS_ORIGINS = new Set(["https://www.boundos.com", "https://boundos.com"]);
const BOUNDOS_APPLY = "BOUNDOS_APPLY";

const answer = z.enum(["yes", "no", "unsure"]);
const boundosApplySchema = z.object({
  name: z.string().trim().min(2).max(200),
  firm: z.string().trim().min(2).max(200),
  role: z.string().trim().max(200).optional(),
  vertical: z.enum(["real-estate", "ria", "other"]),
  crm: z.string().trim().min(2).max(200),
  crmApiKey: answer,
  contactCount: z.enum(["under-500", "500-3000", "3000-8000", "over-8000", "unsure"]),
  datedRelationships: z.string().trim().max(500).optional(),
  optOuts: z.string().trim().min(2).max(500),
  caller: z.string().trim().min(2).max(200),
  holdout: answer,
  riaCompliance: z.string().trim().max(1000).optional(),
  message: z.string().trim().max(2000).optional(),
}).refine((data) => data.vertical !== "ria" || (data.riaCompliance?.length ?? 0) >= 2, { path: ["riaCompliance"] });

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  if (!origin || !BOUNDOS_ORIGINS.has(origin)) return {};
  return { "Access-Control-Allow-Origin": origin, Vary: "Origin" };
}

export function OPTIONS(request: Request) {
  const headers = corsHeaders(request);
  if (!headers["Access-Control-Allow-Origin"]) return new NextResponse(null, { status: 403 });
  return new NextResponse(null, {
    status: 204,
    headers: { ...headers, "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" },
  });
}

export async function POST(request: Request) {
  const headers = corsHeaders(request);
  const json = (body: unknown, status: number) => NextResponse.json(body, { status, headers });
  try {
    const data = await request.json();
    const { name, email, firm, market, transactionSize, inquiryType, website } = data ?? {};
    const parsedEmail = z.string().trim().toLowerCase().pipe(z.email()).safeParse(email);

    if (!parsedEmail.success) {
      return json({ error: "A valid email address is required." }, 400);
    }
    // Honeypot: a person never fills the hidden field. Accept silently without storing or emailing.
    if (typeof website === "string" && website.trim()) {
      return json({ ok: true }, 200);
    }

    let lead;
    if (inquiryType === BOUNDOS_APPLY) {
      const application = boundosApplySchema.safeParse(data);
      if (!application.success) {
        return json({ error: "Please complete the required application fields." }, 400);
      }
      const { name: applicant, firm: company, role, ...answers } = application.data;
      lead = await persistInboundLead({
        name: applicant,
        email: parsedEmail.data,
        company,
        role,
        source: BOUNDOS_APPLY,
        landingPage: "https://www.boundos.com/apply",
        payload: { inquiryType: BOUNDOS_APPLY, offer: "sidecar", firm: company, ...answers },
        submittedAt: new Date(),
      });
    } else {
      lead = await persistInboundLead({
        name: typeof name === "string" ? name : undefined,
        email: parsedEmail.data,
        company: typeof firm === "string" ? firm : undefined,
        role: "Principal / Managing Partner",
        source: typeof inquiryType === "string" ? inquiryType : "PCOS_QUEUE_WALKTHROUGH",
        landingPage: "/private-client-os",
        payload: {
          firm: typeof firm === "string" ? firm : undefined,
          market: typeof market === "string" ? market : undefined,
          transactionSize: typeof transactionSize === "string" ? transactionSize : undefined,
          inquiryType: typeof inquiryType === "string" ? inquiryType : "PCOS_QUEUE_WALKTHROUGH",
        },
        submittedAt: new Date(),
      });
    }

    const notification = await notifyLead(lead);
    const notificationSent = notification.status === "sent";

    return json({ ok: true, leadId: lead.id, notificationSent }, notificationSent ? 200 : 202);
  } catch (error) {
    console.error("api.contact.error", error);
    return json({ error: "Failed to process inquiry" }, 500);
  }
}
