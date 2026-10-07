import { NextResponse } from "next/server";
import { notifyLead } from "@/lib/leads/notify";
import { persistInboundLead } from "@/lib/leads/persist";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, firm, market, transactionSize, inquiryType } = data;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const lead = await persistInboundLead({
      name: typeof name === "string" ? name : undefined,
      email: email.trim().toLowerCase(),
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

    await notifyLead(lead);

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (error) {
    console.error("api.contact.error", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 },
    );
  }
}
