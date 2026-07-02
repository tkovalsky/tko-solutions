import { prisma } from "@/lib/db/prisma";
import type { InboundLeadSubmission, PersistedInboundLead } from "@/lib/leads/types";

export async function persistInboundLead(
  submission: InboundLeadSubmission,
): Promise<PersistedInboundLead> {
  const lead = await prisma.inboundLead.upsert({
    where: { email: submission.email },
    create: {
      name: submission.name,
      email: submission.email,
      company: submission.company,
      role: submission.role,
      source: submission.source,
      landingPage: submission.landingPage,
      payload: submission.payload,
      lastSubmittedAt: submission.submittedAt,
    },
    update: {
      name: submission.name,
      company: submission.company,
      role: submission.role,
      source: submission.source,
      landingPage: submission.landingPage,
      payload: submission.payload,
      lastSubmittedAt: submission.submittedAt,
    },
  });

  console.info("inbound_lead.persisted", {
    leadId: lead.id,
    email: lead.email,
    source: lead.source,
    timestamp: submission.submittedAt.toISOString(),
  });

  return lead;
}

export async function markInboundLeadNotified(leadId: string, notifiedAt = new Date()) {
  return prisma.inboundLead.update({
    where: { id: leadId },
    data: { notifiedAt },
  });
}
