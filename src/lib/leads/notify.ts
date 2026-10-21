import { site } from "@/lib/site";
import { markInboundLeadNotified } from "@/lib/leads/persist";
import type { PersistedInboundLead } from "@/lib/leads/types";
import { buildLeadNotificationEmail, buildLeadReceiptEmail, type LeadEmailContent } from "@/lib/leads/email-templates";

const RESEND_EMAIL_URL = "https://api.resend.com/emails";
const DEFAULT_FROM_EMAIL = "Todd Kovalsky | TKO Solutions <todd@tko.solutions>";

type NotifyLeadResult =
  | { status: "sent"; notifiedAt: Date }
  | { status: "skipped"; reason: "missing_env" }
  | { status: "failed"; reason: string };

export async function notifyLead(lead: PersistedInboundLead): Promise<NotifyLeadResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  // An explicit notification override is supported; legacy CONTACT_EMAIL is not.
  const to = process.env.LEAD_NOTIFY_EMAIL?.trim() || site.email;
  const from = process.env.RESEND_FROM_EMAIL?.trim() || process.env.FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;

  if (!apiKey || !to) {
    logOutcome(lead, "operator", "skipped", { reason: "missing_env" });
    logOutcome(lead, "receipt", "skipped", { reason: "missing_env" });
    return { status: "skipped", reason: "missing_env" };
  }

  const [notification] = await Promise.all([
    sendOperatorNotification(),
    sendEmail("receipt", lead.email, site.email, buildLeadReceiptEmail(lead)),
  ]);
  return notification;

  async function sendOperatorNotification(): Promise<NotifyLeadResult> {
    const result = await sendEmail("operator", to, lead.email, buildLeadNotificationEmail(lead));
    if (result.status !== "sent") return result;
    const notifiedAt = new Date();
    try {
      // An older in-flight submission must not mark a newer one notified.
      await markInboundLeadNotified(lead.id, notifiedAt, lead.lastSubmittedAt);
      return { status: "sent", notifiedAt };
    } catch {
      const reason = "Failed to record operator notification";
      logOutcome(lead, "operator", "failed", { reason, providerAccepted: true });
      return { status: "failed", reason };
    }
  }

  async function sendEmail(messageKind: MessageKind, recipient: string, replyTo: string, content: LeadEmailContent): Promise<{ status: "sent" } | { status: "failed"; reason: string }> {
    try {
      const response = await fetch(RESEND_EMAIL_URL, {
        method: "POST",
        signal: AbortSignal.timeout(10_000),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `tko-lead/${messageKind}/${lead.id}/${lead.lastSubmittedAt.toISOString()}`,
        },
        body: JSON.stringify({ from, to: recipient, reply_to: replyTo, ...content }),
      });
      if (!response.ok) {
        // Provider bodies may echo submitted data; keep them out of logs.
        const reason = `Resend returned ${response.status}`;
        logOutcome(lead, messageKind, "failed", { reason });
        return { status: "failed", reason };
      }
      const data: unknown = await response.json();
      if (!data || typeof data !== "object" || !("id" in data) || typeof data.id !== "string" || !data.id) {
        const reason = "Resend returned an invalid acceptance response";
        logOutcome(lead, messageKind, "failed", { reason });
        return { status: "failed", reason };
      }
      logOutcome(lead, messageKind, "sent", { providerId: data.id });
      return { status: "sent" };
    } catch (error) {
      const reason = error && typeof error === "object" && "name" in error && ["TimeoutError", "AbortError"].includes(String(error.name))
        ? "Resend request timed out"
        : "Resend request failed";
      logOutcome(lead, messageKind, "failed", { reason });
      return { status: "failed", reason };
    }
  }
}

type MessageKind = "operator" | "receipt";

function logOutcome(lead: PersistedInboundLead, messageKind: MessageKind, status: "sent" | "skipped" | "failed", detail: Record<string, unknown>) {
  const event = `inbound_lead.${messageKind === "operator" ? "notification" : "confirmation"}_${status}`;
  const metadata = { leadId: lead.id, messageKind, submissionTime: lead.lastSubmittedAt.toISOString(), timestamp: new Date().toISOString(), ...detail };
  if (status === "failed") console.error(event, metadata);
  else if (status === "skipped") console.warn(event, metadata);
  else console.info(event, metadata);
}
