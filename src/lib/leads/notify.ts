import { markInboundLeadNotified } from "@/lib/leads/persist";
import type { PersistedInboundLead } from "@/lib/leads/types";

const RESEND_EMAIL_URL = "https://api.resend.com/emails";
const DEFAULT_FROM_EMAIL = "TKO Website <onboarding@resend.dev>";

type NotifyLeadResult =
  | { status: "sent"; notifiedAt: Date }
  | { status: "skipped"; reason: "missing_env" }
  | { status: "failed"; reason: string };

export async function notifyLead(lead: PersistedInboundLead): Promise<NotifyLeadResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;

  if (!apiKey || !to) {
    console.warn("inbound_lead.notification_skipped", {
      leadId: lead.id,
      email: lead.email,
      source: lead.source,
      reason: "missing_env",
      timestamp: new Date().toISOString(),
    });
    return { status: "skipped", reason: "missing_env" };
  }

  const submittedAt = lead.lastSubmittedAt.toISOString();

  try {
    const response = await fetch(RESEND_EMAIL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL,
        to,
        subject: `New inbound lead: ${lead.email}`,
        text: buildLeadEmailText(lead, submittedAt),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Resend returned ${response.status}: ${detail}`);
    }

    const notifiedAt = new Date();
    await markInboundLeadNotified(lead.id, notifiedAt);

    console.info("inbound_lead.notification_sent", {
      leadId: lead.id,
      email: lead.email,
      source: lead.source,
      timestamp: notifiedAt.toISOString(),
    });

    return { status: "sent", notifiedAt };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown notification error";

    console.error("inbound_lead.notification_failed", {
      leadId: lead.id,
      email: lead.email,
      source: lead.source,
      reason: message,
      timestamp: new Date().toISOString(),
    });

    return { status: "failed", reason: message };
  }
}

function buildLeadEmailText(lead: PersistedInboundLead, submittedAt: string) {
  return [
    "New inbound lead submission",
    "",
    `Lead ID: ${lead.id}`,
    `Name: ${lead.name || ""}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company || ""}`,
    `Role: ${lead.role || ""}`,
    `Source: ${lead.source || ""}`,
    `Landing Page: ${lead.landingPage || ""}`,
    `Submission Time: ${submittedAt}`,
    "",
    "Submitted Payload:",
    JSON.stringify(lead.payload, null, 2),
  ].join("\n");
}
