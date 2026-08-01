import { tifDb } from "@/lib/tif/db";

export const EXECUTIVE_BRIEF_SECTION_KEYS = [
  "career",
  "responsibilities",
  "recentAnnouncements",
  "knownInitiatives",
  "likelyPriorities",
  "likelyKpis",
  "publicInterviews",
  "conferenceTalks",
  "authority",
  "relationship",
  "warmPath",
  "recommendedApproach",
  "researchGaps",
] as const;

export type ExecutiveBriefSectionKey = (typeof EXECUTIVE_BRIEF_SECTION_KEYS)[number];
export type BriefItem = { text: string; basis: "stated" | "inferred" | "operator"; confidence: number; sourceUrl: string | null };
export type BriefSection = { items: BriefItem[]; isEmpty: boolean; gapPrompt: string | null };

export type ExecutiveBrief = {
  person: {
    id: string;
    name: string;
    title: string;
    organizationName: string;
    contactPoints: Array<{ type: string; value: string; provenance: string; status: string }>;
  };
  stakeholder: {
    role: string;
    authority: string;
    relationshipType: string;
    accessScore: number | null;
    isSelected: boolean;
    opportunityId: string;
    opportunityTitle: string;
    accountName: string;
  } | null;
  sections: Record<ExecutiveBriefSectionKey, BriefSection>;
};

type BriefPerson = {
  id: string;
  name: string;
  title: string;
  organization: { name: string };
  contactPoints: Array<{ type: string; value: string; provenance: string; status: string }>;
  facts: Array<{
    field: string;
    value: string;
    basis: "stated" | "inferred" | "operator";
    confidence: number;
    evidence?: { source?: { canonicalUrl?: string | null } | null } | null;
  }>;
  stakeholders: Array<{
    role: string;
    authority: string;
    relationshipType: string;
    warmPathNotes: string | null;
    roleConfidence: number;
    accessScore: number | null;
    isSelected: boolean;
    opportunityId: string;
    opportunity: {
      title: string;
      organization: { name: string };
      currentScore: { accessScore: number | null } | null;
      initiative: {
        name: string;
        category: string;
        status: string;
        confidence: number;
        signalLinks: Array<{
          signal: {
            summary: string;
            confidence: number;
            occurredAt: Date | null;
            createdAt: Date;
            source: { canonicalUrl: string | null };
          };
        }>;
      } | null;
      playbook: { offerGuidance: string | null; decisionPoints: string[]; proofGuidance: string | null } | null;
      offer: { name: string; problemSolved: string | null; positioningNotes: string | null } | null;
      researchGaps: Array<{ question: string; reason: string; blocksOutreach: boolean; status: string }>;
    };
  }>;
};

export async function getExecutiveBrief(personId: string, client = tifDb): Promise<ExecutiveBrief | null> {
  const person = await client.oiPerson.findUnique({
    where: { id: personId },
    include: {
      organization: { select: { name: true } },
      contactPoints: { orderBy: [{ createdAt: "desc" }] },
      facts: { include: { evidence: { include: { source: true } } }, orderBy: [{ field: "asc" }, { ordinal: "asc" }] },
      stakeholders: {
        include: {
          opportunity: {
            include: {
              organization: { select: { name: true } },
              currentScore: { select: { accessScore: true } },
              initiative: {
                include: {
                  signalLinks: {
                    include: { signal: { include: { source: true } } },
                    orderBy: { createdAt: "desc" },
                  },
                },
              },
              playbook: true,
              offer: true,
              researchGaps: true,
            },
          },
        },
        orderBy: [{ isSelected: "desc" }, { updatedAt: "desc" }],
      },
    },
  });
  return person ? assembleExecutiveBrief(person) : null;
}

export function assembleExecutiveBrief(person: BriefPerson): ExecutiveBrief {
  const stakeholder = person.stakeholders.find((item) => item.isSelected) ?? person.stakeholders[0] ?? null;
  const opportunity = stakeholder?.opportunity ?? null;
  const factsFor = (fields: string[]) => person.facts.filter((fact) => fields.includes(fact.field)).map(factItem);
  const signalItems =
    opportunity?.initiative?.signalLinks
      .filter((link) => withinDays(link.signal.occurredAt ?? link.signal.createdAt, 180))
      .map((link) => ({
        text: link.signal.summary,
        basis: "stated" as const,
        confidence: link.signal.confidence,
        sourceUrl: link.signal.source.canonicalUrl,
      })) ?? [];
  const sections: Record<ExecutiveBriefSectionKey, BriefSection> = {
    career: section(factsFor(["career"]), "Research this person's career history and current remit."),
    responsibilities: section(factsFor(["responsibilities", "responsibility"]), "Find responsibilities from company bios, filings, or interviews."),
    recentAnnouncements: section(signalItems, "Search recent account announcements and earnings mentions from the last 180 days."),
    knownInitiatives: section(
      opportunity?.initiative
        ? [{ text: `${opportunity.initiative.name} (${opportunity.initiative.status})`, basis: "stated", confidence: opportunity.initiative.confidence, sourceUrl: null }]
        : [],
      "Identify active initiatives connected to this stakeholder.",
    ),
    likelyPriorities: section(
      opportunity ? [{ text: priorityText(opportunity.initiative?.category), basis: "inferred", confidence: 55, sourceUrl: null }] : [],
      "Infer priorities after an initiative category or playbook is selected.",
    ),
    likelyKpis: section(
      opportunity?.playbook?.decisionPoints.map((point) => ({ text: point, basis: "inferred" as const, confidence: 55, sourceUrl: null })) ?? [],
      "Add playbook decision points or sourced KPI evidence.",
    ),
    publicInterviews: section(factsFor(["public_interviews", "publicInterviews", "interview"]), "Search the person's name with payer trade press and podcast archives."),
    conferenceTalks: section(factsFor(["conference_talks", "conferenceTalks", "talk"]), "Check AHIP, HLTH, ViVE, and vendor speaker lists."),
    authority: section(
      stakeholder
        ? [{ text: `Role ${stakeholder.role}; authority ${stakeholder.authority}; access ${stakeholder.accessScore ?? opportunity?.currentScore?.accessScore ?? 0}`, basis: "operator", confidence: stakeholder.roleConfidence, sourceUrl: null }]
        : [],
      "Confirm authority level and buying influence.",
    ),
    relationship: section(
      stakeholder ? [{ text: stakeholder.relationshipType, basis: "operator", confidence: stakeholder.roleConfidence, sourceUrl: null }] : [],
      "Confirm relationship history or referral path.",
    ),
    warmPath: section(
      stakeholder?.warmPathNotes ? [{ text: stakeholder.warmPathNotes, basis: "operator", confidence: stakeholder.roleConfidence, sourceUrl: null }] : [],
      "Find a warm path or record that this is cold.",
    ),
    recommendedApproach: section(
      opportunity
        ? [{ text: recommendedApproach(opportunity.playbook, opportunity.offer), basis: "inferred", confidence: 55, sourceUrl: null }]
        : [],
      "Select an offer and playbook before outreach preparation.",
    ),
    researchGaps: section(
      opportunity?.researchGaps
        .filter((gap) => gap.status === "open" && gap.blocksOutreach)
        .map((gap) => ({ text: `${gap.question} Why: ${gap.reason}`, basis: "operator" as const, confidence: 100, sourceUrl: null })) ?? [],
      "No blocking research gaps. Add one if outreach needs more proof.",
    ),
  };
  return {
    person: {
      id: person.id,
      name: person.name,
      title: person.title,
      organizationName: person.organization.name,
      contactPoints: person.contactPoints,
    },
    stakeholder: stakeholder
      ? {
          role: stakeholder.role,
          authority: stakeholder.authority,
          relationshipType: stakeholder.relationshipType,
          accessScore: stakeholder.accessScore ?? opportunity?.currentScore?.accessScore ?? null,
          isSelected: stakeholder.isSelected,
          opportunityId: stakeholder.opportunityId,
          opportunityTitle: stakeholder.opportunity.title,
          accountName: stakeholder.opportunity.organization.name,
        }
      : null,
    sections,
  };
}

function section(items: BriefItem[], gapPrompt: string): BriefSection {
  return { items, isEmpty: items.length === 0, gapPrompt: items.length === 0 ? gapPrompt : null };
}

function factItem(fact: BriefPerson["facts"][number]): BriefItem {
  return {
    text: fact.value,
    basis: fact.basis,
    confidence: fact.confidence,
    sourceUrl: fact.evidence?.source?.canonicalUrl ?? null,
  };
}

function withinDays(date: Date, days: number) {
  return Date.now() - date.getTime() <= days * 86_400_000;
}

function priorityText(category?: string) {
  if (!category) return "Confirm the initiative category before outreach.";
  return `Address ${category.replaceAll("_", " ")} risk with a concrete recovery next step.`;
}

function recommendedApproach(playbook: BriefPerson["stakeholders"][number]["opportunity"]["playbook"], offer: BriefPerson["stakeholders"][number]["opportunity"]["offer"]) {
  const offerText = offer ? `Offer: ${offer.name}.` : "Offer not selected.";
  const guidance = playbook?.offerGuidance ?? playbook?.proofGuidance ?? offer?.positioningNotes ?? offer?.problemSolved ?? "Lead with the sourced business problem.";
  return `${guidance} ${offerText}`;
}
