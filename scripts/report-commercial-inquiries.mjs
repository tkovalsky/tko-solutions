// Read-only aggregate reporting. Never prints names, email, free text, or credentials.
// Run with an explicitly selected database environment:
// node --env-file=.env.local scripts/report-commercial-inquiries.mjs 30
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function reportingWindow(daysText = "30", now = new Date()) {
  const days = Number(daysText);
  if (!Number.isInteger(days) || days < 1 || days > 365) throw new Error("Reporting window must be a whole number from 1 to 365 days.");
  return new Date(now.getTime() - days * 86400000);
}

// Offers reported as their own bucket; anything else is "general". Keep in step with the offer
// slugs in src/lib/offers.ts plus the BoundOS managed-follow-up intake (tested).
export const REPORTED_OFFERS = [
  "execution-gap-blueprint",
  "constraint-diagnostic",
  "operating-system-build",
  "operate-and-improve",
  "regulatory-implementation-readiness-sprint",
  "managed-follow-up",
];

// Release-verification submissions are labeled by source prefix or utm_source and never counted.
export const RELEASE_VERIFICATION_LABEL = "release_verification";

export function summarizeInquiries(rows) {
  const groups = rows.map(row => ({ offer: row.offer, uniqueContacts: Number(row.contacts), latestNotificationAccepted: Number(row.notified) }));
  return { uniqueContacts: groups.reduce((sum, row) => sum + row.uniqueContacts, 0), latestNotificationAccepted: groups.reduce((sum, row) => sum + row.latestNotificationAccepted, 0), groups };
}

async function main() {
  const since = reportingWindow(process.argv[2]);
  if (!process.env.DATABASE_URL) throw new Error("Select the reporting database through DATABASE_URL before running this read-only report.");
  const { PrismaPg } = await import("@prisma/adapter-pg");
  const { PrismaClient, Prisma } = await import("@prisma/client");
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
  try {
    const rows = await prisma.$queryRaw`
      SELECT CASE WHEN "payload"->>'offer' IN (${Prisma.join(REPORTED_OFFERS)})
        THEN "payload"->>'offer' ELSE 'general' END AS offer,
      COUNT(*)::int AS contacts,
      COUNT(*) FILTER (WHERE "notifiedAt" >= "lastSubmittedAt")::int AS notified
      FROM "InboundLead"
      WHERE "lastSubmittedAt" >= ${since}
        AND COALESCE("source", '') NOT LIKE ${`${RELEASE_VERIFICATION_LABEL}%`}
        AND COALESCE("payload"->>'utmSource', '') <> ${RELEASE_VERIFICATION_LABEL}
      GROUP BY 1 ORDER BY 1
    `;
    console.log(JSON.stringify({ checkedAt: new Date().toISOString(), since: since.toISOString(), ...summarizeInquiries(rows), interpretation: "Unique contacts by latest submission, not all attempts or qualified opportunities. Notification acceptance is not confirmed mailbox receipt. Release-verification source and UTM labels are excluded." }, null, 2));
  } finally { await prisma.$disconnect(); }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(() => { console.error("Commercial inquiry report failed. Check the selected database and reporting window; no inquiry details were printed."); process.exitCode = 1; });
}
