import type { PersistedInboundLead } from "@/lib/leads/types";

const TODD_EMAIL = "todd@tko.solutions";
const REVIEW_URL = "https://tko.solutions/tif/oi/today";

export type LeadEmailContent = { subject: string; text: string; html: string };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export function buildLeadReceiptEmail(lead: PersistedInboundLead): LeadEmailContent {
  const greeting = lead.name?.trim() ? `Hi ${lead.name.trim()},` : "Hello,";
  const message = "Thanks for contacting TKO Solutions. Your request is saved. I review every submission myself and will reply within two business days.";
  const reply = "If you have anything to add, just reply to this email.";
  return {
    subject: "Your request to TKO Solutions",
    text: [greeting, "", message, "", reply, "", "Todd Kovalsky", "TKO Solutions", TODD_EMAIL].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#17375e"><p>${escapeHtml(greeting)}</p><p>${message}</p><p>${reply}</p><p>Todd Kovalsky<br>TKO Solutions<br><a href="mailto:${TODD_EMAIL}">${TODD_EMAIL}</a></p></div>`,
  };
}

export function buildLeadNotificationEmail(lead: PersistedInboundLead): LeadEmailContent {
  const payload = lead.payload && typeof lead.payload === "object" && !Array.isArray(lead.payload) ? lead.payload : {};
  const fields = [
    ["transformationContext", "Problem / request"], ["currentPressure", "Current pressure"],
    ["revenueBand", "Revenue band"], ["timing", "Timing"], ["offer", "Requested offer"],
    ["targetDeadline", "Target deadline"], ["affectedSystems", "Affected systems"],
    ["sponsor", "Sponsor"], ["healthcareScope", "Readiness scope"],
    ["crm", "CRM"], ["contactCount", "Approximate contacts"],
    ["consentEvidence", "Consent evidence and opt-outs"], ["caller", "Who makes the calls and logs dispositions"],
    ["vertical", "Vertical"], ["crmApiKey", "Can create a CRM API key"], ["datedRelationships", "Dated relationships"],
    ["optOuts", "Where opt-outs live"], ["holdout", "Accepts a 10–20% holdout"], ["riaCompliance", "RIA: CCO, archiving, Reg S-P"],
    ["message", "Message"], ["consequence", "Consequence"],
    ["firm", "Firm"], ["market", "Market"], ["transactionSize", "Transaction size"],
    ["inquiryType", "Inquiry type"], ["problem", "Problem"], ["systems", "Systems"],
    ["notWorking", "What is not working"], ["aiDeployed", "AI deployed"], ["decision", "Decision needed"],
  ] as const;
  const details: Array<[string, string]> = fields.flatMap(([key, label]) => {
    const value = payload[key];
    return typeof value === "string" && value.trim() ? [[label, value.trim()]] : [];
  });
  const identity: Array<[string, string]> = [
    ["Name", lead.name || "Not provided"], ["Company", lead.company || "Not provided"],
    ["Role", lead.role || "Not provided"], ["Email", lead.email],
    ["Source", lead.source || "Not provided"], ["Landing page", lead.landingPage || "Not provided"],
    ["Submitted at", lead.lastSubmittedAt.toISOString()], ["Lead ID", lead.id],
  ];
  const subjectLabel = [lead.name, lead.company].filter(Boolean).join(" / ") || "New website inquiry";
  const nextStep = "Review the request and reply within two business days.";
  const rows = [...identity, ...details];
  return {
    subject: `You've got leads! — ${subjectLabel.replace(/[\r\n\t]+/g, " ").slice(0, 160)}`,
    text: ["You've got leads!", "", `Next step: ${nextStep}`, "", ...rows.map(([label, value]) => `${label}: ${value}`), "", `Review lead: ${REVIEW_URL}`].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#17375e"><h1>You've got leads!</h1><p><strong>Next step:</strong> ${nextStep}</p><dl>${rows.map(([label, value]) => `<dt style="font-weight:bold">${label}</dt><dd style="margin:0 0 12px;white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(value)}</dd>`).join("")}</dl><p><a href="${REVIEW_URL}">Review lead</a></p></div>`,
  };
}
