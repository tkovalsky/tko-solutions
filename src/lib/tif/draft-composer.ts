import { z } from "zod";

const FrameworkSchema = z.enum(["rachel_community", "rachel_relocation", "cre_tenant_rep", "business_exit"]);
const ArtifactSchema = z.enum([
  "community_page",
  "comparison_page",
  "comparison_guide",
  "relocation_guide",
  "cre_area_page",
  "cre_neighborhood_page",
  "cre_corridor_page",
  "cre_medical_cluster_page",
  "cre_site_report",
  "cre_corridor_comparison",
  "tenant_rep_guide",
  "business_exit_guide",
  "transferability_assessment_page",
]);
const VoiceSchema = z.enum(["rachel", "consumer", "todd", "commercial_operator"]);

const ComposeDraftRequestSchema = z.object({
  framework: FrameworkSchema,
  artifact: ArtifactSchema,
  voice: VoiceSchema.default("rachel"),
  inputs: z
    .object({
      title: z.string().min(3).optional(),
      slug: z.string().min(3).optional(),
      community: z.string().min(2).optional(),
      communities: z.array(z.string().min(2)).optional(),
      county: z.string().min(2).optional(),
      city: z.string().min(2).optional(),
      area: z.string().min(2).optional(),
      budget: z.string().min(2).optional(),
      originMarket: z.string().min(2).optional(),
      origin_market: z.string().min(2).optional(),
      destinationMarket: z.string().min(2).optional(),
      destination_market: z.string().min(2).optional(),
      targetSegments: z.array(z.string().min(2)).optional(),
      tags: z.array(z.string().min(2)).optional(),
      internalLinks: z.array(z.string().min(2)).optional(),
      market: z.string().min(2).optional(),
      corridor: z.string().min(2).optional(),
      corridors: z.array(z.string().min(2)).optional(),
      neighborhood: z.string().min(2).optional(),
      medicalCluster: z.string().min(2).optional(),
      siteName: z.string().min(2).optional(),
      address: z.string().min(2).optional(),
      operatorType: z.string().min(2).optional(),
      businessType: z.string().min(2).optional(),
      leaseHorizon: z.string().min(2).optional(),
      exitHorizon: z.string().min(2).optional(),
      fieldObservations: z.array(z.string().min(2)).optional(),
      licenseStatus: z.enum(["pre_license", "active_sales_associate", "active_broker"]).optional(),
      brokerageName: z.string().min(2).optional(),
      licensedReferralPartner: z.string().min(2).optional(),
    })
    .default({}),
});

export type ComposeDraftRequest = z.input<typeof ComposeDraftRequestSchema>;
export type ComposeDraftResult = {
  ok: true;
  framework: z.infer<typeof FrameworkSchema>;
  artifact: z.infer<typeof ArtifactSchema>;
  voice: z.infer<typeof VoiceSchema>;
  slug: string;
  title: string;
  markdown: string;
  warnings: string[];
  suggestedPath: string;
};

type ParsedRequest = z.infer<typeof ComposeDraftRequestSchema>;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function yamlList(values: string[]) {
  if (values.length === 0) return "[]";
  return values.map((value) => `  - ${value}`).join("\n");
}

function normalizeRequest(payload: ComposeDraftRequest) {
  return ComposeDraftRequestSchema.parse(payload);
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function getOriginMarket(request: ParsedRequest) {
  return request.inputs.originMarket ?? request.inputs.origin_market;
}

function getDestinationMarket(request: ParsedRequest) {
  return request.inputs.destinationMarket ?? request.inputs.destination_market;
}

function validateRequest(request: ParsedRequest) {
  const errors: string[] = [];
  const rachelArtifacts = new Set(["community_page", "comparison_page", "comparison_guide", "relocation_guide"]);
  const creArtifacts = new Set([
    "cre_area_page",
    "cre_neighborhood_page",
    "cre_corridor_page",
    "cre_medical_cluster_page",
    "cre_site_report",
    "cre_corridor_comparison",
    "tenant_rep_guide",
  ]);
  const exitArtifacts = new Set(["business_exit_guide", "transferability_assessment_page"]);

  if (request.framework === "rachel_relocation" && request.artifact !== "relocation_guide") {
    errors.push("rachel_relocation can only compose relocation_guide drafts in this first slice.");
  }

  if (request.framework === "rachel_community" && request.artifact === "relocation_guide") {
    errors.push("rachel_community cannot compose relocation_guide drafts.");
  }

  if (request.framework.startsWith("rachel_") && !rachelArtifacts.has(request.artifact)) {
    errors.push("Rachel frameworks cannot compose commercial-site artifacts.");
  }

  if (request.framework === "cre_tenant_rep" && !creArtifacts.has(request.artifact)) {
    errors.push("cre_tenant_rep requires a CRE area, neighborhood, corridor, cluster, site, comparison, or tenant-rep artifact.");
  }

  if (request.framework === "business_exit" && !exitArtifacts.has(request.artifact)) {
    errors.push("business_exit can only compose business_exit_guide or transferability_assessment_page.");
  }

  if ((request.framework === "cre_tenant_rep" || request.framework === "business_exit") && !request.inputs.market) {
    errors.push("Commercial-site drafts require inputs.market.");
  }

  if (request.artifact === "cre_corridor_comparison" && (!request.inputs.corridors || request.inputs.corridors.length < 2)) {
    errors.push("cre_corridor_comparison requires inputs.corridors with at least two corridors.");
  }

  if (request.artifact === "comparison_guide" || request.artifact === "comparison_page") {
    if (!request.inputs.communities || request.inputs.communities.length < 2) {
      errors.push("comparison drafts require inputs.communities with at least two communities.");
    }
  }

  if (request.artifact === "community_page" && !request.inputs.community) {
    errors.push("community_page drafts require inputs.community.");
  }

  if (request.framework === "rachel_community" && !request.inputs.county) {
    errors.push("rachel_community drafts require inputs.county.");
  }

  if (request.framework === "rachel_relocation") {
    if (!getOriginMarket(request)) errors.push("rachel_relocation drafts require inputs.originMarket.");
    if (!getDestinationMarket(request)) errors.push("rachel_relocation drafts require inputs.destinationMarket.");
  }

  return errors;
}

function buildFrontmatter(params: {
  title: string;
  slug: string;
  description: string;
  area?: string;
  targetSegments?: string[];
  tags?: string[];
  exploreGuides?: string[];
}) {
  return `---
title: "${params.title.replaceAll('"', '\\"')}"
type: guide
id: ${params.slug}
slug: ${params.slug}
area: ${params.area ?? "VERIFY"}
description: "${params.description.replaceAll('"', '\\"')}"
imageSrc: /hero/guides/${params.slug}.webp
publishDate: '${todayIsoDate()}'
lastUpdated: '${todayIsoDate()}'
draftStatus: tko-draft
targetSegments:
${yamlList(params.targetSegments ?? ["relocating-buyers"])}
tags:
${yamlList(params.tags ?? ["rachel-guide"])}
exploreGuides:
${yamlList(params.exploreGuides ?? [])}
---
`;
}

function draftNotes(warnings: string[]) {
  return `> **TKO Draft Notes**
> This draft was generated for Rachel review. Keep all VERIFY notes until Rachel or a trusted source confirms the fact.
${warnings.map((warning) => `> - ${warning}`).join("\n")}
`;
}

function ctaBlock() {
  return `If you are narrowing this down from out of state or comparing communities before a trip, Rachel can help you decide which options are actually worth seeing.

[Ask Rachel to help narrow your short list ->](#contact)`;
}

function communityDraft(request: ParsedRequest, warnings: string[]) {
  const community = request.inputs.community ?? "VERIFY Community";
  const county = request.inputs.county ?? "VERIFY County";
  const city = request.inputs.city ?? "VERIFY City";
  const title = request.inputs.title ?? `${community}: Community Guide for Buyers`;
  const slug = request.inputs.slug ?? slugify(`${community} community guide`);
  const description = `${community} in ${county}: lifestyle fit, homes, amenities, tradeoffs, similar communities, and questions to ask before touring.`;

  const markdown = `${buildFrontmatter({
    title,
    slug,
    description,
    area: request.inputs.area ?? slugify(city),
    targetSegments: request.inputs.targetSegments,
    tags: request.inputs.tags ?? ["community-guide", "active-adult", slugify(community)],
    exploreGuides: request.inputs.internalLinks,
  })}
# ${title}

${draftNotes(warnings)}

${community} may be a fit if you want the lifestyle and location advantages of ${city}, but the right answer depends on budget, timing, activity level, and how you want your week to feel.

This page is designed to help buyers decide whether ${community} belongs on the short list before scheduling tours.

${ctaBlock()}

---

## Community Overview

${community} is located in ${county}. VERIFY: add the exact city, builder/developer context, guard-gate status, age restriction if applicable, and current property mix.

For buyers comparing communities, the important question is not only whether the amenities look good. It is whether the daily pace, home styles, costs, and social environment match how you actually plan to live.

## Lifestyle Fit

${community} should be evaluated around four practical questions:

- Do you want a highly social community or a quieter home base?
- Are you full-time, seasonal, or still deciding?
- Do you want structured activities or flexibility?
- Is new construction, recent construction, or resale value more important?

VERIFY: add Rachel's local take on the community's energy level, seasonal rhythm, and buyer fit.

## Homes & Pricing

Current pricing should be verified before publication. Use MLS-backed ranges, recent pending/sold context, and HOA or membership notes only after confirming the source.

| Item | Draft note |
|---|---|
| Typical price range | VERIFY |
| Home types | VERIFY |
| Build era | VERIFY |
| HOA / membership | VERIFY |
| Best buyer fit | VERIFY with Rachel |

## Amenities

VERIFY: list only confirmed amenities. Avoid copying builder language without checking current community materials.

Potential amenity categories to confirm:

- Clubhouse and social spaces.
- Fitness and wellness.
- Racquet sports.
- Pool and outdoor spaces.
- Clubs, events, and resident programming.

## Pros

- Clear lifestyle positioning for buyers who know what they want.
- Useful comparison point against nearby communities in ${county}.
- Potentially strong fit for buyers who value community structure and amenities.

VERIFY: replace these generic pros with community-specific strengths.

## Cons

- The lifestyle may not fit every buyer, even if the homes do.
- HOA, membership, or carrying costs need current verification.
- Inventory and pricing can shift quickly.

VERIFY: add Rachel's honest tradeoffs before publishing.

## Similar Communities

Suggested comparisons to verify:

- Valencia Sound.
- Valencia Grand.
- Valencia Del Mar.
- Seven Bridges.
- The Bridges.

Only keep communities that are actually relevant to ${community}.

## FAQ

### Is ${community} a good fit for seasonal buyers?

It depends on how often you plan to use the home and whether you want a community with enough activity when you are in town. VERIFY with Rachel's local experience.

### What should buyers compare before touring?

Compare budget, HOA or membership costs, home age, activity level, location, and whether the community's pace feels right.

### Should I visit ${community} before deciding?

Yes. A short visit can tell you whether the energy feels right, but it helps to narrow your list before scheduling tours.

## CTA

${ctaBlock()}
`;

  return { title, slug, markdown };
}

function comparisonDraft(request: ParsedRequest, warnings: string[]) {
  const communities = request.inputs.communities ?? ["VERIFY Community A", "VERIFY Community B"];
  const county = request.inputs.county ?? "VERIFY County";
  const title = request.inputs.title ?? `${communities.join(" vs ")}: Which Community Fits You?`;
  const slug = request.inputs.slug ?? slugify(communities.join(" vs "));
  const description = `${communities.join(" vs ")} compared for buyers evaluating lifestyle, pricing, amenities, tradeoffs, and fit in ${county}.`;

  const rows = communities
    .map((community) => `| ${community} | VERIFY | VERIFY | VERIFY | VERIFY | VERIFY |`)
    .join("\n");

  const markdown = `${buildFrontmatter({
    title,
    slug,
    description,
    area: request.inputs.area ?? slugify(county),
    targetSegments: request.inputs.targetSegments,
    tags: request.inputs.tags ?? ["comparison-guide", "community-comparison"],
    exploreGuides: request.inputs.internalLinks,
  })}
# ${title}

${draftNotes(warnings)}

If you are comparing ${communities.join(" and ")}, the decision usually comes down to fit, not just features. Similar-looking communities can feel very different once you account for budget, pace, home styles, social energy, and location.

${ctaBlock()}

---

## Quick Comparison

| Community | Location | Price range | Lifestyle energy | Amenities | Best fit |
|---|---|---|---|---|---|
${rows}

VERIFY all pricing, HOA, amenities, and location notes before publishing.

## Cost Comparison

Budget is more than purchase price. Buyers should compare:

- Current asking and recent sold prices.
- HOA or membership costs.
- Insurance and taxes.
- Upgrade or renovation exposure.
- Seasonal carrying costs.

VERIFY: add current MLS-backed and HOA-backed ranges.

## Lifestyle Comparison

The better choice depends on how you want your week to feel.

${communities
  .map(
    (community) => `### ${community}

VERIFY Rachel's practical take: social pace, full-time vs seasonal fit, activity level, privacy, and buyer personality match.`,
  )
  .join("\n\n")}

## Amenities Comparison

Do not compare amenity lists only by length. Confirm which amenities are used often, which matter for resale, and which actually shape daily life.

VERIFY: add confirmed amenity table after source review.

## Buyer Recommendations

Choose based on the constraint that matters most:

- Choose the more social option if you want activity built into your week.
- Choose the quieter option if privacy and control matter more.
- Choose the newer option if maintenance exposure is your main concern.
- Choose the better-located option if your life outside the gates matters most.

VERIFY: replace these with community-specific guidance.

## Recommended Alternative

If neither option feels right, compare nearby communities with a different price point, activity level, or location profile.

Suggested alternatives to verify:

- Valencia Del Mar.
- Lotus.
- Seven Bridges.
- The Bridges.
- Avenir.

## FAQ

### Which community is better?

There is no universal better choice. The right answer depends on budget, lifestyle pace, location preference, and how you plan to use the home.

### Should I tour both communities?

Usually yes, but not blindly. Narrow the decision criteria first so the tour confirms fit instead of creating more confusion.

### What should I verify before making an offer?

Verify current pricing, HOA or membership costs, rules, included services, insurance exposure, recent comparable sales, and any community-specific restrictions.

## CTA

${ctaBlock()}
`;

  return { title, slug, markdown };
}

function relocationDraft(request: ParsedRequest, warnings: string[]) {
  const origin = getOriginMarket(request) ?? "VERIFY Origin Market";
  const destination = getDestinationMarket(request) ?? "South Florida";
  const title = request.inputs.title ?? `Moving from ${origin} to ${destination}: What Buyers Should Know`;
  const slug = request.inputs.slug ?? slugify(`moving from ${origin} to ${destination}`);
  const description = `A practical relocation guide for buyers moving from ${origin} to ${destination}, including timing, costs, housing, healthcare, mistakes, and next steps.`;

  const markdown = `${buildFrontmatter({
    title,
    slug,
    description,
    area: request.inputs.area ?? slugify(destination),
    targetSegments: request.inputs.targetSegments ?? ["relocating-buyers", "out-of-state-buyers"],
    tags: request.inputs.tags ?? ["relocation", slugify(origin), slugify(destination)],
    exploreGuides: request.inputs.internalLinks,
  })}
# ${title}

${draftNotes(warnings)}

Moving from ${origin} to ${destination} is not only a housing decision. It affects taxes, healthcare, family logistics, travel patterns, insurance, lifestyle, and how quickly you need to make decisions when the right home appears.

This guide helps you organize the move before you start touring homes.

${ctaBlock()}

---

## Why People Move

Buyers leaving ${origin} for ${destination} usually start with one or more of these goals:

- Warmer weather and easier winters.
- Lower-maintenance living.
- A more social or active lifestyle.
- Proximity to family or grandchildren.
- A second-home or seasonal plan that may become full-time later.

VERIFY: add Rachel's observed reasons for this specific origin market.

## Cost Differences

Do not compare purchase price alone. Relocation buyers should compare:

- Property taxes.
- Insurance.
- HOA or condo fees.
- Maintenance and landscaping.
- Travel back to ${origin}.
- Renovation or furnishing costs.

VERIFY: add sourced, current examples where appropriate.

## Taxes

Florida does not have a state income tax, but that does not make every move automatically cheaper. Property taxes, insurance, HOA fees, and estate planning should be reviewed with qualified advisors.

VERIFY: keep this as general guidance unless tax claims are sourced.

## Healthcare

Healthcare access can matter as much as the home. Buyers should think through:

- Primary care access.
- Specialists.
- Hospital proximity.
- Prescription routines.
- Seasonal care if they split time between states.

VERIFY: add destination-specific healthcare context only from reliable sources.

## Housing

The most common relocation mistake is starting with listings before deciding what lifestyle and location actually fit.

Compare:

- Active adult communities.
- Country club communities.
- Gated non-club communities.
- Condos and villas.
- Single-family neighborhoods.
- New construction vs resale.

## Common Mistakes

- Touring too many communities without a decision framework.
- Underestimating insurance and carrying costs.
- Choosing amenities without understanding daily lifestyle.
- Waiting too long to visit if the timeline is real.
- Assuming a community that worked for a friend will fit the same way.

## Relocation Timeline

| Timeline | Recommended next step |
|---|---|
| 0-3 months | Narrow communities, confirm financing/cash plan, visit with a focused tour plan. |
| 3-6 months | Build a shortlist, watch inventory, understand tradeoffs. |
| 6-12 months | Learn markets and communities before listings drive the process. |
| 12+ months | Use content and short visits to clarify fit. |

## FAQ

### When should I start looking?

Start learning communities before you are ready to buy. Start touring seriously when budget, timeline, and preferred lifestyle are clear enough to compare options.

### Should I sell before buying in Florida?

That depends on financing, risk tolerance, inventory, and whether you need proceeds from the sale. Discuss the sequence with your agent and financial advisors before you are under pressure.

### How many communities should I tour?

Enough to compare the real tradeoffs, but not so many that the decision becomes noise. A strong shortlist usually makes the trip more useful.

## CTA

${ctaBlock()}
`;

  return { title, slug, markdown };
}

function commercialFrontmatter(params: {
  title: string;
  slug: string;
  artifact: ParsedRequest["artifact"];
  market: string;
  audience: string;
}) {
  return `---
title: "${params.title.replaceAll('"', '\\"')}"
slug: ${params.slug}
type: ${params.artifact}
market: "${params.market.replaceAll('"', '\\"')}"
audience: "${params.audience.replaceAll('"', '\\"')}"
draftStatus: tko-draft
publishDate: '${todayIsoDate()}'
lastUpdated: '${todayIsoDate()}'
licenseReviewRequired: true
intelligenceSource: cre-intelligence
---`;
}

function commercialLicenseBlock(request: ParsedRequest) {
  if (request.inputs.licenseStatus === "active_broker" || request.inputs.licenseStatus === "active_sales_associate") {
    return `VERIFY before publication: confirm active license, registered brokerage (${request.inputs.brokerageName ?? "ADD BROKERAGE"}), advertising approval, and the exact brokerage relationship offered.`;
  }
  return `Pre-license boundary: educational and operational intelligence only. Do not present Todd as a broker or sales associate. Route licensed tenant-representation or business-brokerage services to ${request.inputs.licensedReferralPartner ?? "a confirmed licensed commercial partner"}.`;
}

function commercialDraft(request: ParsedRequest, warnings: string[]) {
  const market = request.inputs.market ?? "VERIFY South Florida Market";
  const subject = request.inputs.corridor
    ?? request.inputs.neighborhood
    ?? request.inputs.medicalCluster
    ?? request.inputs.siteName
    ?? request.inputs.businessType
    ?? request.inputs.operatorType
    ?? market;
  const titleByArtifact: Record<string, string> = {
    cre_area_page: `${market} Commercial Real Estate Intelligence for Business Operators`,
    cre_neighborhood_page: `${subject}: Commercial Location Intelligence`,
    cre_corridor_page: `${subject}: Tenant and Operator Corridor Guide`,
    cre_medical_cluster_page: `${subject}: Medical Office and Healthcare Location Guide`,
    cre_site_report: `${subject}: Operator-Informed Site Report`,
    cre_corridor_comparison: `${(request.inputs.corridors ?? []).join(" vs ")}: Which Corridor Fits the Operation?`,
    tenant_rep_guide: `How to Make a Better ${market} Lease and Location Decision`,
    business_exit_guide: `Preparing a ${request.inputs.businessType ?? "Business"} to Operate Without the Owner`,
    transferability_assessment_page: `Business Transferability Assessment for ${request.inputs.businessType ?? "Owner-Led Companies"}`,
  };
  const title = request.inputs.title ?? titleByArtifact[request.artifact] ?? `${subject} Intelligence`;
  const slug = request.inputs.slug ?? slugify(title);
  const isExit = request.framework === "business_exit";
  const audience = isExit
    ? "business owners preparing for succession, transfer, or a future sale"
    : `${request.inputs.operatorType ?? "business operators"} evaluating ${market}`;
  const observations = request.inputs.fieldObservations?.length
    ? request.inputs.fieldObservations.map((item) => `- ${item}`).join("\n")
    : "- VERIFY: add dated field observations, source, location, confidence, and media references.";

  const body = isExit
    ? `## The Operating Question

Can this business produce reliable results, decisions, and customer value without the owner's constant intervention?

## Transferability Evidence

- Revenue, margin, pipeline, and customer concentration visibility.
- Documented workflows, exceptions, controls, and decision rights.
- Management depth, role clarity, and accountability.
- Vendor, employee, facility, technology, and compliance dependencies.
- A staged owner-transition plan supported by operating evidence.

## What This Is Not

This is not a valuation, listing agreement, brokerage opinion, legal opinion, tax advice, or promise of a premium. Independent licensed brokerage, legal, tax, and financial advice remains separate.

## Engagement Path

An operational assessment may lead to a scoped operating-system implementation when evidence shows that owner dependency, unreliable reporting, or undocumented workflows are constraining transferability. Pricing and scope follow diagnosis; no engagement guarantees a transaction or valuation outcome.`
    : `## Operator Decision

Define the operating requirement before selecting real estate: customer geography, staffing, workflow, access, parking, visibility, configuration, buildout, lease timing, and flexibility.

## Field Intelligence

${observations}

## Fit and Poor Fit

State who this location, corridor, or market may fit—and who should avoid it—using verified operating criteria rather than generic market prose.

## Lease and Location Risks

VERIFY current availability, asking economics, use/zoning, parking, access, signage, buildout, operating expenses, and lease terms with qualified licensed and legal professionals.

## Licensed Representation

${commercialLicenseBlock(request)}`;

  const markdown = `${commercialFrontmatter({ title, slug, artifact: request.artifact, market, audience })}
# ${title}

${draftNotes(warnings)}

This page helps ${audience} make a high-stakes decision with clearer operating criteria, field evidence, and explicit verification boundaries.

${body}

## Next Step

${isExit
  ? "Start with an operational-readiness conversation; engage independent licensed transaction advisors separately."
  : commercialLicenseBlock(request)}
`;

  return { title, slug, markdown };
}

export function composeDraft(payload: ComposeDraftRequest): ComposeDraftResult {
  const request = normalizeRequest(payload);
  const validationErrors = validateRequest(request);
  if (validationErrors.length > 0) {
    throw new Error(validationErrors.join(" "));
  }

  const isCommercial = request.framework === "cre_tenant_rep" || request.framework === "business_exit";
  const warnings = isCommercial
    ? [
        "Availability, lease economics, zoning/use, operating performance, valuation, and transaction claims require current source verification.",
        "License and brokerage status must be reviewed before every publication or CTA change.",
        "Field observations must include provenance, date, location, rights, and a separation between visible fact and operator judgment.",
      ]
    : [
        "Pricing, HOA, tax, amenity, and inventory claims must be verified before publishing.",
        "This draft intentionally avoids unsupported claims and leaves VERIFY markers where source facts are needed.",
      ];

  const draft = isCommercial
    ? commercialDraft(request, warnings)
    : request.artifact === "relocation_guide"
      ? relocationDraft(request, warnings)
      : request.artifact === "community_page"
        ? communityDraft(request, warnings)
        : comparisonDraft(request, warnings);

  return {
    ok: true,
    framework: request.framework,
    artifact: request.artifact,
    voice: request.voice,
    slug: draft.slug,
    title: draft.title,
    markdown: draft.markdown,
    warnings,
    suggestedPath: isCommercial
      ? `src/content/commercial/${draft.slug}.md`
      : `src/content/guides/${draft.slug}.md`,
  };
}

// Compatibility export for the original RachelOS integration. New callers should use composeDraft.
export const composeRachelDraft = composeDraft;
