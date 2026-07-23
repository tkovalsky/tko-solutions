export const CONTENT_TENANT_LABELS = {
  tko: "TKO",
  boundos: "BoundOS",
  rachel_delray: "RachelDelray",
  cre_advisory: "Commercial Advisory",
} as const;

export const OPPORTUNITY_SOURCE_LABELS = {
  content_gap: "Content gap",
  keyword: "Keyword",
  title_idea: "Title idea",
  competitor_url: "Competitor URL",
  reddit_thread_url: "Reddit thread URL",
  forum_discussion: "Forum discussion",
  pasted_notes: "Pasted notes",
  pasted_transcript: "Pasted transcript",
  existing_page_url: "Existing page URL",
  existing_guide: "Existing guide",
} as const;

export const DERIVATIVE_ASSET_LABELS = {
  behavioral_content_brief: "Behavioral content brief",
  cre_tenant_rep_brief: "CRE tenant-rep brief",
  cre_site_driveby_report: "CRE site drive-by report",
  cre_corridor_comparison: "CRE corridor comparison",
  cre_lease_decision_guide: "CRE lease decision guide",
  business_exit_readiness_brief: "Business exit-readiness brief",
  business_transferability_assessment: "Business transferability assessment",
  owner_operating_system_brief: "Owner operating-system brief",
  cre_field_video_brief: "CRE field video brief",
  story_page: "Story page",
  linkedin_post: "LinkedIn post",
  linkedin_carousel: "LinkedIn carousel",
  facebook_post: "Facebook post",
  instagram_post: "Instagram post",
  instagram_story: "Instagram story",
  instagram_reel_script: "Instagram Reel script",
  reddit_post: "Reddit post",
  youtube_video_brief: "YouTube video brief",
  youtube_short_script: "YouTube Short script",
  video_shot_list: "Video shot list",
  meta_ad: "Meta ad",
  meta_ad_set: "Meta ad set",
  meta_video_script: "Meta video script",
  meta_image_brief: "Meta image brief",
  email_next_touch: "Email next-touch",
  image_brief: "Image brief",
  email_draft: "Email draft",
  ad_concept: "Ad concept",
  summary: "Summary",
  executive_brief: "Executive brief",
} as const;

export type DerivativeAssetKind = keyof typeof DERIVATIVE_ASSET_LABELS;

export type ChannelPackageContext = {
  voice?: string;
  audience?: string;
  objective?: string;
  cta?: string;
  destinationUrl?: string;
  editorialTrack?: "expertise" | "system_proof";
  ctaStage?: "awareness" | "consideration" | "conversion";
  claimBoundary?: string;
  geography?: string;
  privacyMode?: "not_applicable" | "anonymized" | "composite" | "consent_backed";
  channelNotes?: string;
  buyerDomain?: "rachel_luxury" | "tko_executive" | "cre_tenant_rep" | "business_owner_exit" | "general";
  journeyStage?: "exploring" | "defining" | "comparing" | "validating" | "ready_to_act" | "post_decision";
  searchIntent?: "broad" | "specific" | "high_intent";
  searchPhrase?: string;
  decisionJob?: "possibility" | "identity" | "belonging" | "certainty" | "simplification" | "legacy" | "control" | "risk_reduction" | "location_fit" | "transferability";
  expressedMotivation?: string;
  barrier?: string;
  priceOrValueContext?: string;
  desiredAction?: string;
  market?: string;
  propertyOrBusinessType?: string;
  leaseOrExitHorizon?: string;
  fieldObservationSummary?: string;
  referralPartner?: string;
  licenseDisclosure?: string;
};

const GOVERNED_SOCIAL_TYPES = new Set<DerivativeAssetKind>([
  "linkedin_post",
  "linkedin_carousel",
  "facebook_post",
  "instagram_post",
  "instagram_story",
  "instagram_reel_script",
]);

const PLATFORM_BY_DERIVATIVE: Partial<Record<DerivativeAssetKind, "linkedin" | "facebook" | "instagram">> = {
  linkedin_post: "linkedin",
  linkedin_carousel: "linkedin",
  facebook_post: "facebook",
  instagram_post: "instagram",
  instagram_story: "instagram",
  instagram_reel_script: "instagram",
};

const CURRENT_CLIENT_TERMS = [
  /\bcognizant\b/i,
  /\bunited\s*health\s*care\b/i,
  /\bunitedhealthcare\b/i,
  /\bunitedhealth\s+group\b/i,
  /\buhc\b/i,
];

export function validateChannelPackageGate({
  type,
  assetStatus,
  sourceVersionNumber,
  sourceText,
  context,
  confidentialityConfirmed,
  manualPublicationConfirmed,
}: {
  type: DerivativeAssetKind;
  assetStatus: string;
  sourceVersionNumber?: number;
  sourceText: string;
  context: ChannelPackageContext;
  confidentialityConfirmed: boolean;
  manualPublicationConfirmed: boolean;
}) {
  if (!GOVERNED_SOCIAL_TYPES.has(type)) return [];

  const errors: string[] = [];
  if (!sourceVersionNumber) {
    errors.push("Create a source asset version before generating a social package.");
  }
  if (assetStatus !== "approved" && assetStatus !== "published") {
    errors.push("Move the current source asset version through review and approval first.");
  }
  if (!context.claimBoundary?.trim()) {
    errors.push("Record the claim and permission boundary.");
  }
  if (!confidentialityConfirmed) {
    errors.push("Confirm that the source excludes confidential employer, client, patient, and deal information.");
  }
  if (!manualPublicationConfirmed) {
    errors.push("Confirm that Todd will review and publish this package manually.");
  }

  const platform = PLATFORM_BY_DERIVATIVE[type];
  try {
    const destination = new URL(context.destinationUrl ?? "");
    if (destination.protocol !== "https:") {
      errors.push("Use an HTTPS canonical destination URL.");
    }
    if (platform && destination.searchParams.get("utm_source") !== platform) {
      errors.push(`Set utm_source=${platform} for this package.`);
    }
    if (destination.searchParams.get("utm_medium") !== "social") {
      errors.push("Set utm_medium=social.");
    }
    if (!destination.searchParams.get("utm_campaign")) {
      errors.push("Add a non-empty utm_campaign.");
    }
  } catch {
    errors.push("Add a valid tracked canonical destination URL.");
  }

  const protectedText = [
    sourceText,
    context.channelNotes,
    context.claimBoundary,
    context.fieldObservationSummary,
  ].filter(Boolean).join(" ");
  if (CURRENT_CLIENT_TERMS.some((term) => term.test(protectedText))) {
    errors.push(
      "Current-client or employer identifiers are blocked from social generation. Remove them; a separate permissioned workflow is not implemented.",
    );
  }

  return errors;
}

export type BehavioralContentStrategy = {
  buyerDomain: NonNullable<ChannelPackageContext["buyerDomain"]>;
  journeyStage: NonNullable<ChannelPackageContext["journeyStage"]>;
  searchIntent: NonNullable<ChannelPackageContext["searchIntent"]>;
  decisionJob: NonNullable<ChannelPackageContext["decisionJob"]>;
  expressedMotivation: string;
  barrier: string;
  priceOrValueContext: string;
  desiredAction: string;
  recommendedArchetype: "educational" | "comparison" | "decision_support" | "proof" | "conversion";
  ctaIntensity: "soft" | "guided" | "direct";
  rationale: string[];
  prohibitedTactics: string[];
};

export function deriveBehavioralContentStrategy(
  context: ChannelPackageContext,
  sourceText = "",
): BehavioralContentStrategy {
  const combined = `${context.searchPhrase ?? ""} ${context.expressedMotivation ?? ""} ${sourceText}`.toLowerCase();
  const buyerDomain = context.buyerDomain ?? inferBuyerDomain(combined);
  const searchIntent = context.searchIntent ?? inferSearchIntent(context.searchPhrase, combined);
  const journeyStage = context.journeyStage ?? inferJourneyStage(combined, searchIntent);
  const decisionJob = context.decisionJob ?? inferDecisionJob(combined);
  const expressedMotivation = context.expressedMotivation || "Not supplied; use only source-supported motivations.";
  const barrier = context.barrier || "Not supplied; do not invent an objection.";
  const priceOrValueContext = context.priceOrValueContext || "Not supplied; avoid unsupported affordability or ROI claims.";
  const desiredAction = context.desiredAction || defaultDesiredAction(buyerDomain, journeyStage);
  const recommendedArchetype = archetypeFor(journeyStage, searchIntent);
  const ctaIntensity = journeyStage === "ready_to_act" ? "direct" : searchIntent === "high_intent" ? "guided" : "soft";

  return {
    buyerDomain,
    journeyStage,
    searchIntent,
    decisionJob,
    expressedMotivation,
    barrier,
    priceOrValueContext,
    desiredAction,
    recommendedArchetype,
    ctaIntensity,
    rationale: [
      `Use ${recommendedArchetype.replaceAll("_", " ")} content for a ${journeyStage.replaceAll("_", " ")} journey stage.`,
      `Answer the ${decisionJob.replaceAll("_", " ")} decision job before asking for action.`,
      `Use a ${ctaIntensity} CTA because search intent is ${searchIntent}.`,
    ],
    prohibitedTactics: [
      "Do not infer health, age, grief, financial distress, or other sensitive traits.",
      "Do not exploit mortality, fear, loneliness, or urgency that the person did not express.",
      "Do not promise a property, job, promotion, revenue result, or investment outcome.",
      "Do not conceal commercial intent or fabricate social proof.",
    ],
  };
}

export function makeContentSlug(input: string) {
  const slug = input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || `content-${Date.now()}`;
}

export function formatRevisionContext(notes: string[]) {
  const cleaned = notes.map((note) => note.trim()).filter(Boolean);
  if (cleaned.length === 0) return "";

  return [
    "<!-- Content Factory revision inputs -->",
    "REVISION REQUESTS TO ADDRESS:",
    ...cleaned.map((note, index) => `${index + 1}. ${note}`),
    "<!-- End revision inputs -->",
  ].join("\n");
}

export function compareVersionText(previous: string, next: string) {
  const previousLines = previous.split(/\r?\n/);
  const nextLines = next.split(/\r?\n/);
  const maxLength = Math.max(previousLines.length, nextLines.length);
  const changedLines = [];

  for (let index = 0; index < maxLength; index += 1) {
    const before = previousLines[index] ?? "";
    const after = nextLines[index] ?? "";
    if (before !== after) {
      changedLines.push({ line: index + 1, before, after });
    }
  }

  return {
    previousLineCount: previousLines.length,
    nextLineCount: nextLines.length,
    changedLineCount: changedLines.length,
    changedLines: changedLines.slice(0, 25),
  };
}

export function generateDerivativeCopy({
  type,
  title,
  body,
  context = {},
}: {
  type: DerivativeAssetKind;
  title: string;
  body: string;
  context?: ChannelPackageContext;
}) {
  const excerpt = extractPlainExcerpt(body);
  const audience = context.audience || "Define the intended audience before publication";
  const objective = context.objective || "Help the audience make a clearer next decision";
  const cta = context.cta || "Learn More";
  const destination = context.destinationUrl || "[ADD TRACKED DESTINATION URL]";
  const geography = context.geography || "Florida";
  const voice = context.voice || "operator";
  const strategy = deriveBehavioralContentStrategy(context, `${title} ${body}`);
  const governance = governanceBlock(context, strategy);

  switch (type) {
    case "behavioral_content_brief":
      return behavioralBrief(title, context, strategy);
    case "cre_tenant_rep_brief":
      return creTenantRepBrief(title, excerpt, context, strategy);
    case "cre_site_driveby_report":
      return creDrivebyReport(title, context, governance);
    case "cre_corridor_comparison":
      return creCorridorComparison(title, context, strategy, governance);
    case "cre_lease_decision_guide":
      return creLeaseDecisionGuide(title, context, strategy, destination, governance);
    case "business_exit_readiness_brief":
      return businessExitBrief(title, context, strategy, governance);
    case "business_transferability_assessment":
      return businessTransferabilityAssessment(title, context, strategy, governance);
    case "owner_operating_system_brief":
      return ownerOperatingSystemBrief(title, context, strategy, destination, governance);
    case "cre_field_video_brief":
      return creFieldVideoBrief(title, context, destination, governance);
    case "story_page":
      return [
        `# ${title}`,
        "",
        governance,
        "",
        "## Starting situation",
        excerpt,
        "",
        "## The decision",
        "Describe the real options considered and the tradeoff that mattered most.",
        "",
        "## What changed",
        "Explain what new information changed the decision. Do not imply an outcome that the source does not prove.",
        "",
        "## Rachel's lesson",
        `Connect the story to a practical ${geography} relocation decision without revealing identifying details.`,
        "",
        "## Next step",
        `${cta}: ${destination}`,
      ].join("\n");
    case "linkedin_post":
      return [
        `${title}`,
        "",
        excerpt,
        "",
        "Before choosing another tool, I would ask:",
        "",
        "- Where does the standard path stop?",
        "- Which exceptions create avoidable rework?",
        "- Who owns the decision when the case leaves the standard path?",
        "",
        "That is usually where the operating problem becomes specific enough to improve.",
        "",
        `${cta}: ${destination}`,
        "",
        "Todd review required: replace any phrasing that does not sound natural before publishing.",
      ].join("\n");
    case "linkedin_carousel":
      return [
        `Carousel: ${title}`,
        `Audience: ${audience}`,
        "",
        `Slide 1 — ${title}`,
        `Slide 2 — The situation: ${excerpt}`,
        "Slide 3 — What most people miss",
        "Slide 4 — The decision or tradeoff",
        "Slide 5 — A practical framework",
        "Slide 6 — What to do next",
        `Slide 7 — ${cta}: ${destination}`,
        "",
        governance,
      ].join("\n");
    case "facebook_post":
      return [
        `A practical note on ${title.toLowerCase()}`,
        "",
        excerpt,
        "",
        "The useful question is not whether a team is busy. It is where preventable work enters the process, who has to resolve it, and what evidence would support a better decision.",
        "",
        "I put the fuller framework in the linked guide for anyone working through a similar operating question.",
        "",
        `${cta}: ${destination}`,
        "",
        "Todd review required: keep this conversational and remove any detail learned from confidential work.",
      ].join("\n");
    case "instagram_post":
      return [
        `Instagram carousel: ${title}`,
        "",
        `Slide 1 — ${title}`,
        `Slide 2 — The operating signal: ${excerpt}`,
        "Slide 3 — Measure staff touches per case.",
        "Slide 4 — Separate clean submissions from preventable rework.",
        "Slide 5 — Make exceptions and decision owners visible.",
        "Slide 6 — Test whether the workflow is ready to automate.",
        `Slide 7 — ${cta}. Use the approved profile link.`,
        "",
        `Destination: ${destination}`,
        "Creative: 4:5 text-led carousel using TKO brand styles; do not use client or employer imagery.",
        "Caption: summarize one measure in plain language, state that the full guide is linked, and ask one non-sensitive question.",
        "Todd review required before manual publication.",
        governance,
      ].join("\n");
    case "instagram_story":
      return [
        `Instagram Story: ${title}`,
        "Frame 1 — Hook: name the Florida decision.",
        `Frame 2 — Context: ${excerpt}`,
        "Frame 3 — Tradeoff: show what most people overlook.",
        "Frame 4 — Interaction: poll, question, or slider tied to the decision.",
        `Frame 5 — ${cta}; link sticker destination: ${destination}`,
        "Use original vertical media and retain safe areas for interface overlays.",
        governance,
      ].join("\n");
    case "instagram_reel_script":
      return [
        `Instagram Reel: ${title}`,
        "Target length: 20–45 seconds · 9:16 vertical · captions required",
        `HOOK: ${excerpt}`,
        "BODY: explain one Florida relocation misconception or tradeoff.",
        "PROOF: show authentic footage, map, guide, or clearly labeled illustration.",
        `CLOSE: ${cta}; direct viewers to the approved profile link.`,
        `Destination: ${destination}`,
        governance,
      ].join("\n");
    case "reddit_post":
      return [
        `Suggested title: ${title}`,
        "",
        excerpt,
        "",
        `Here is the practical ${geography} takeaway: explain the decision criteria, tradeoffs, and what would change the answer.`,
        "",
        "End with a genuine discussion question. The post must remain useful if the link is removed.",
        "",
        `Optional disclosed source link, only if community rules allow: ${destination}`,
        "Disclosure: I am connected with the linked resource.",
        "",
        governance,
      ].join("\n");
    case "youtube_video_brief":
      return [
        `YouTube Video Brief: ${title}`,
        `Voice: ${voice}`,
        `Audience: ${audience}`,
        `Objective: ${objective}`,
        "",
        `Opening hook: ${excerpt}`,
        "Sections:",
        "1. The question or situation.",
        "2. The options people usually compare.",
        "3. The overlooked tradeoff.",
        "4. A practical decision framework.",
        "5. What to verify before acting.",
        `6. ${cta}.`,
        "",
        `Long-form description link: ${destination}`,
        "Required visual proof: original location footage, maps, source screenshots, or clearly labeled illustration.",
        governance,
      ].join("\n");
    case "youtube_short_script":
      return [
        `YouTube Short: ${title}`,
        "Target length: 45–90 seconds",
        "",
        `HOOK: ${excerpt}`,
        "CONTEXT: Name the Florida decision in one sentence.",
        "VALUE: Explain one useful tradeoff or misconception.",
        "CLOSE: Invite the viewer to the related long-form video or channel profile link.",
        "",
        "Production: vertical, captions on, original voice and footage preferred.",
        `Destination for profile/long-form description: ${destination}`,
        governance,
      ].join("\n");
    case "video_shot_list":
      return [
        `Shot List: ${title}`,
        `Geography: ${geography}`,
        "",
        "Capture horizontally and vertically where practical:",
        "- 3 establishing shots of the area or community.",
        "- Entrance, streetscape, homes, landscaping, and public surroundings.",
        "- 5 lifestyle detail shots that support the source claims.",
        "- 3 walking or driving clips of 8–12 seconds.",
        "- Rachel answering the central question on camera.",
        "- Clean ambient sound and 20 seconds of room tone.",
        "- Thumbnail portrait with uncluttered background.",
        "",
        "Rights log: date, location, owner, releases, restrictions, and what the footage actually depicts.",
        governance,
      ].join("\n");
    case "meta_ad":
      return metaAd({ title, excerpt, audience, objective, cta, destination, governance });
    case "meta_ad_set":
      return [
        `Meta Ad Set: ${title}`,
        `Audience: ${audience}`,
        `Objective: ${objective}`,
        "Test rule: change one variable per experiment.",
        "",
        "VARIANT A — Problem-led",
        metaAd({ title, excerpt: `The difficult part is not finding information. ${excerpt}`, audience, objective, cta, destination, governance: "" }),
        "",
        "VARIANT B — Decision-led",
        metaAd({ title, excerpt: `A clearer decision starts with the right comparison. ${excerpt}`, audience, objective, cta, destination, governance: "" }),
        "",
        "VARIANT C — Story-led",
        metaAd({ title, excerpt: `A recent decision pattern illustrates the tradeoff. ${excerpt}`, audience, objective, cta, destination, governance: "" }),
        "",
        governance,
      ].join("\n");
    case "meta_video_script":
      return [
        `Meta Video Script: ${title}`,
        "Format: 9:16 vertical · 20–35 seconds · captions required",
        `Audience: ${audience}`,
        "",
        `0–3s hook: ${excerpt}`,
        "3–15s: Explain one meaningful decision or tradeoff.",
        "15–25s: Show the guide, story, location, or comparison evidence.",
        `25–35s CTA: ${cta}.`,
        `Destination: ${destination}`,
        governance,
      ].join("\n");
    case "meta_image_brief":
      return [
        `Meta Image Brief: ${title}`,
        `Audience: ${audience}`,
        "Concept: one authentic Florida scene that directly supports the source insight.",
        "Overlay: one short decision-oriented phrase; avoid dense text.",
        "Formats: 1:1 and 4:5; retain a clean safe area for placement crops.",
        "Do not depict generated people, properties, amenities, or views as documentary evidence.",
        `CTA destination: ${destination}`,
        governance,
      ].join("\n");
    case "email_next_touch":
      return [
        `Subject: ${title}`,
        "",
        "Hi [Name],",
        "",
        excerpt,
        "",
        "I thought this was relevant to the decision you are already working through.",
        "",
        `${cta}: ${destination}`,
        "",
        "Ask exactly one context-aware follow-up question before sending.",
        governance,
      ].join("\n");
    case "image_brief":
      return [
        `Image Brief: ${title}`,
        `Audience: ${audience}`,
        `Objective: ${objective}`,
        `Geography: ${geography}`,
        "Use original photography when the image is evidence of a real place, person, property, or result.",
        "Record source, owner, usage rights, capture date, location, and expiration restrictions.",
        "Generated imagery must be clearly illustrative and must not manufacture documentary proof.",
        governance,
      ].join("\n");
    case "email_draft":
      return [
        `Subject: ${title}`,
        "",
        "Hi [Name],",
        "",
        excerpt,
        "",
        "I thought this might be useful context for the conversation you are already having.",
        "",
        "Todd",
      ].join("\n");
    case "ad_concept":
      return [
        `Concept: ${title}`,
        "Audience: Operators or buyers already feeling the problem described in the draft.",
        `Hook: ${excerpt}`,
        "CTA: Read the guide.",
      ].join("\n");
    case "summary":
      return [`Summary: ${title}`, "", excerpt].join("\n");
    case "executive_brief":
      return [
        `Executive Brief: ${title}`,
        "",
        `Core point: ${excerpt}`,
        "",
        "Operator implication: identify the decision or workflow this content should help move.",
        "Approval note: verify claims, examples, and source boundaries before external use.",
      ].join("\n");
  }
}

function governanceBlock(context: ChannelPackageContext, strategy: BehavioralContentStrategy) {
  const privacy = context.privacyMode ?? "not_applicable";
  return [
    `BEHAVIORAL ALIGNMENT — ${strategy.buyerDomain} · ${strategy.journeyStage} · ${strategy.searchIntent} · ${strategy.decisionJob}.`,
    `Decision objective: ${strategy.desiredAction}. Recommended archetype: ${strategy.recommendedArchetype}. CTA intensity: ${strategy.ctaIntensity}.`,
    `Editorial track: ${context.editorialTrack ?? "not_recorded"}. CTA stage: ${context.ctaStage ?? "not_recorded"}.`,
    `Claim / permission boundary: ${context.claimBoundary ?? "NOT RECORDED — DO NOT PUBLISH"}.`,
    "APPROVAL REQUIRED — verify every claim, link, privacy decision, and channel rule before publication.",
    `Privacy mode: ${privacy}.`,
    context.channelNotes ? `Channel notes: ${context.channelNotes}` : "Channel notes: verify current placement and community rules.",
  ].join("\n");
}

function behavioralBrief(
  title: string,
  context: ChannelPackageContext,
  strategy: BehavioralContentStrategy,
) {
  return [
    `Behavioral Content Brief: ${title}`,
    `Buyer domain: ${strategy.buyerDomain}`,
    `Journey stage: ${strategy.journeyStage}`,
    `Search intent: ${strategy.searchIntent}`,
    `Observed search phrase: ${context.searchPhrase || "Not supplied"}`,
    `Decision job: ${strategy.decisionJob}`,
    `Expressed motivation: ${strategy.expressedMotivation}`,
    `Barrier: ${strategy.barrier}`,
    `Price / value context: ${strategy.priceOrValueContext}`,
    `Desired action: ${strategy.desiredAction}`,
    `Recommended archetype: ${strategy.recommendedArchetype}`,
    `CTA intensity: ${strategy.ctaIntensity}`,
    "",
    "Composition sequence:",
    "1. Mirror the expressed question without dramatizing it.",
    "2. Supply the missing decision criteria or proof.",
    "3. Make tradeoffs visible.",
    "4. Position Rachel or Todd as a credible guide only where the evidence supports it.",
    `5. Ask for the desired action with a ${strategy.ctaIntensity} CTA.`,
    "",
    "Rationale:",
    ...strategy.rationale.map((item) => `- ${item}`),
    "",
    "Prohibited tactics:",
    ...strategy.prohibitedTactics.map((item) => `- ${item}`),
  ].join("\n");
}

function inferBuyerDomain(text: string): BehavioralContentStrategy["buyerDomain"] {
  if (/\b(tenant rep|lease|commercial space|site selection|corridor|occupancy|landlord)\b/.test(text)) return "cre_tenant_rep";
  if (/\b(sell my business|business sale|exit readiness|transferab|owner dependent|succession)\b/.test(text)) return "business_owner_exit";
  if (/\b(home|house|florida|delray|boca|boynton|relocat|community|realtor)\b/.test(text)) return "rachel_luxury";
  if (/\b(ai|operator|operating model|workflow|director|vice president|vp|transformation|healthcare)\b/.test(text)) return "tko_executive";
  return "general";
}

function inferSearchIntent(searchPhrase: string | undefined, text: string): BehavioralContentStrategy["searchIntent"] {
  if (/\b(call|consult|hire|agent|assessment|advisor|tour|showing|buy|ready)\b/.test(text)) return "high_intent";
  if ((searchPhrase?.trim().split(/\s+/).length ?? 0) >= 7 || /\b(vs|versus|which|how|where|before|compare)\b/.test(text)) return "specific";
  return "broad";
}

function inferJourneyStage(
  text: string,
  intent: BehavioralContentStrategy["searchIntent"],
): BehavioralContentStrategy["journeyStage"] {
  if (/\b(call|consult|tour|showing|ready to|this month|immediately)\b/.test(text)) return "ready_to_act";
  if (/\b(verify|trust|proof|case study|reviews?|evidence)\b/.test(text)) return "validating";
  if (/\b(vs|versus|compare|which|shortlist|tradeoff)\b/.test(text)) return "comparing";
  if (intent === "specific") return "defining";
  return "exploring";
}

function inferDecisionJob(text: string): BehavioralContentStrategy["decisionJob"] {
  if (/\b(location|site|corridor|lease|parking|access|visibility|occupancy)\b/.test(text)) return "location_fit";
  if (/\b(sell my business|exit|transferab|succession|owner dependent)\b/.test(text)) return "transferability";
  if (/\b(dream|next chapter|life I want|aspir|possib)\b/.test(text)) return "possibility";
  if (/\b(belong|community|social|people like me)\b/.test(text)) return "belonging";
  if (/\b(legacy|family|children|generation)\b/.test(text)) return "legacy";
  if (/\b(simple|easy|overwhelm|narrow|guide me)\b/.test(text)) return "simplification";
  if (/\b(risk|safe|avoid|mistake|proof|trust)\b/.test(text)) return "risk_reduction";
  if (/\b(control|own|govern|approval|accountab)\b/.test(text)) return "control";
  if (/\b(identity|become|career|role|director|vp)\b/.test(text)) return "identity";
  return "certainty";
}

function archetypeFor(
  stage: BehavioralContentStrategy["journeyStage"],
  intent: BehavioralContentStrategy["searchIntent"],
): BehavioralContentStrategy["recommendedArchetype"] {
  if (stage === "ready_to_act") return "conversion";
  if (stage === "validating") return "proof";
  if (stage === "comparing") return "comparison";
  if (intent === "specific") return "decision_support";
  return "educational";
}

function defaultDesiredAction(
  domain: BehavioralContentStrategy["buyerDomain"],
  stage: BehavioralContentStrategy["journeyStage"],
) {
  if (domain === "rachel_luxury" && stage === "ready_to_act") return "Call Rachel for a guided shortlist or tour conversation.";
  if (domain === "rachel_luxury") return "Use the guide, then ask Rachel one specific relocation question.";
  if (domain === "tko_executive" && stage === "ready_to_act") return "Start a scoped operating-system or AI delivery conversation with Todd.";
  if (domain === "tko_executive") return "Review the relevant proof or method and connect with Todd around the operating problem.";
  if (domain === "cre_tenant_rep" && stage === "ready_to_act") return "Request an introduction to Rachel's licensed commercial teammate for tenant representation.";
  if (domain === "cre_tenant_rep") return "Use the location intelligence, then request a licensed tenant-rep introduction when ready.";
  if (domain === "business_owner_exit" && stage === "ready_to_act") return "Start a scoped operating-system readiness engagement with Todd and obtain independent licensed brokerage advice.";
  if (domain === "business_owner_exit") return "Assess business transferability and owner dependency before beginning a sale process.";
  return "Take the next evidence-supported step.";
}

function commercialBoundary(context: ChannelPackageContext) {
  return context.licenseDisclosure || "Licensing boundary: educational and operational intelligence only. Brokerage services and transaction representation must be performed by an appropriately licensed broker or sales associate through their registered brokerage.";
}

function creTenantRepBrief(
  title: string,
  excerpt: string,
  context: ChannelPackageContext,
  strategy: BehavioralContentStrategy,
) {
  return [
    `CRE Tenant-Representation Brief: ${title}`,
    `Market: ${context.market || context.geography || "VERIFY"}`,
    `Operator / property type: ${context.propertyOrBusinessType || "VERIFY"}`,
    `Lease event or horizon: ${context.leaseOrExitHorizon || "VERIFY"}`,
    `Journey: ${strategy.journeyStage} · decision job: ${strategy.decisionJob}`,
    "",
    `Starting question: ${excerpt}`,
    "Decision criteria:",
    "- Customer and employee access.",
    "- Visibility, ingress/egress, parking, and delivery constraints.",
    "- Space configuration and buildout exposure.",
    "- Lease economics and operational flexibility; verify with licensed and legal advisors.",
    "- Competitive and complementary tenant context.",
    "- Renewal, relocation, expansion, and timing alternatives.",
    "",
    `Field intelligence: ${context.fieldObservationSummary || "Add dated, source-backed observations."}`,
    `Referral path: ${context.referralPartner || "Rachel's licensed commercial teammate — confirm identity and brokerage before publication."}`,
    commercialBoundary(context),
    "No availability, rent, zoning, financial, or suitability claim may be published without current verification.",
  ].join("\n");
}

function creDrivebyReport(title: string, context: ChannelPackageContext, governance: string) {
  return [
    `CRE Site Drive-By Report: ${title}`,
    `Location: ${context.market || context.geography || "VERIFY exact address/corridor"}`,
    `Observed: ${context.fieldObservationSummary || "ADD DATED FIELD OBSERVATION"}`,
    "",
    "Capture and assess:",
    "- Approach from both traffic directions.",
    "- Sign visibility at realistic driving speed.",
    "- Ingress, egress, turn restrictions, stacking, and delivery access.",
    "- Parking count impression and peak-use conflicts; do not state a count unless verified.",
    "- Adjacent tenants, vacancies, anchors, and customer generators.",
    "- Pedestrian environment, lighting, maintenance, and construction conditions.",
    "- What the site may fit and who should not lease there.",
    "",
    "Evidence manifest: original files, capture date/time, route, location, photographer, rights, transcript, and claim references.",
    commercialBoundary(context),
    governance,
  ].join("\n");
}

function creCorridorComparison(
  title: string,
  context: ChannelPackageContext,
  strategy: BehavioralContentStrategy,
  governance: string,
) {
  return [
    `CRE Corridor Comparison: ${title}`,
    `Audience: ${context.audience || "South Florida business operators"}`,
    `Operator type: ${context.propertyOrBusinessType || "VERIFY"}`,
    `Decision stage: ${strategy.journeyStage}`,
    "",
    "Compare each corridor on the same verified dimensions:",
    "- Customer geography and trip purpose.",
    "- Access, parking, visibility, and signage.",
    "- Space type, configuration, and buildout exposure.",
    "- Competitive set and complementary demand.",
    "- Lease flexibility and timing risk.",
    "- Best fit / poor fit by operator model.",
    "",
    "Finish with conditional guidance, not a universal winner.",
    commercialBoundary(context),
    governance,
  ].join("\n");
}

function creLeaseDecisionGuide(
  title: string,
  context: ChannelPackageContext,
  strategy: BehavioralContentStrategy,
  destination: string,
  governance: string,
) {
  return [
    `CRE Lease Decision Guide: ${title}`,
    `Lease horizon: ${context.leaseOrExitHorizon || "VERIFY"}`,
    `Decision job: ${strategy.decisionJob}`,
    "",
    "1. Define the operating requirement before touring space.",
    "2. Compare renewal, relocation, expansion, contraction, and sublease alternatives.",
    "3. Model operational constraints separately from headline rent.",
    "4. Verify current availability, economics, zoning, use, and buildout with qualified advisors.",
    "5. Establish a decision calendar before leverage disappears.",
    "",
    `Next step: ${strategy.desiredAction}`,
    `Content link: ${destination}`,
    commercialBoundary(context),
    governance,
  ].join("\n");
}

function businessExitBrief(
  title: string,
  context: ChannelPackageContext,
  strategy: BehavioralContentStrategy,
  governance: string,
) {
  return [
    `Business Exit-Readiness Brief: ${title}`,
    `Business type: ${context.propertyOrBusinessType || "VERIFY"}`,
    `Exit horizon: ${context.leaseOrExitHorizon || "VERIFY"}`,
    `Expressed motivation: ${strategy.expressedMotivation}`,
    "",
    "Readiness lenses:",
    "- Revenue and margin visibility.",
    "- Customer and vendor concentration.",
    "- Owner dependency and key-person risk.",
    "- Documented workflows, decisions, controls, and operating cadence.",
    "- Management depth and role clarity.",
    "- Recurring revenue, pipeline quality, and evidence reliability.",
    "- Technology, data, compliance, and transition risk.",
    "- Facility and lease obligations that affect transferability.",
    "",
    "This is operational readiness, not a valuation, brokerage opinion, legal opinion, tax advice, or promise of a premium sale.",
    commercialBoundary(context),
    governance,
  ].join("\n");
}

function businessTransferabilityAssessment(
  title: string,
  context: ChannelPackageContext,
  strategy: BehavioralContentStrategy,
  governance: string,
) {
  return [
    `Business Transferability Assessment: ${title}`,
    `Owner objective: ${strategy.desiredAction}`,
    `Exit horizon: ${context.leaseOrExitHorizon || "VERIFY"}`,
    "",
    "Score with evidence, not optimism:",
    "- Can the business operate for 30 days without the owner?",
    "- Are decisions, workflows, exceptions, and controls documented?",
    "- Can another leader see pipeline, margin, commitments, and risk?",
    "- Are customer, employee, vendor, and facility dependencies explicit?",
    "- Are claims supported by reconciled operating and financial records?",
    "- Is there a staged transition plan with accountable owners?",
    "",
    "Output: evidence map, transferability gaps, 90-day remediation priorities, and independent-advisor questions.",
    "Do not calculate enterprise value or claim that remediation will produce a specific multiple.",
    commercialBoundary(context),
    governance,
  ].join("\n");
}

function ownerOperatingSystemBrief(
  title: string,
  context: ChannelPackageContext,
  strategy: BehavioralContentStrategy,
  destination: string,
  governance: string,
) {
  return [
    `Owner Operating-System Brief: ${title}`,
    `Audience: ${context.audience || "Owners preparing for transfer, succession, or scale"}`,
    `Value context: ${strategy.priceOrValueContext}`,
    "",
    "Problem: a business that depends on the owner's memory, approvals, relationships, and daily intervention is harder to transfer safely.",
    "Engagement outcome: make operating truth, workflows, decisions, accountability, and performance evidence visible enough for management and independent transaction advisors to evaluate.",
    "Potential scope: operational truth audit → dependency map → management system → evidence-backed 90-day implementation.",
    "Commercial framing: $25K+ monthly scope may be proposed only after diagnosis and explicit fit; never present it as required to sell or as a guarantee of sale value.",
    `Next step: ${strategy.desiredAction}`,
    `Proof / method link: ${destination}`,
    commercialBoundary(context),
    governance,
  ].join("\n");
}

function creFieldVideoBrief(
  title: string,
  context: ChannelPackageContext,
  destination: string,
  governance: string,
) {
  return [
    `CRE Field Video Brief: ${title}`,
    `Market / route: ${context.market || context.geography || "VERIFY"}`,
    "",
    "Capture sequence:",
    "1. Route approach and corridor context from a safe, legal position.",
    "2. Center entrance, signage, access, parking, adjacent uses, and visible vacancies.",
    "3. A 30–60 second on-camera observation separating what is visible from what still needs verification.",
    "4. Neutral B-roll for tenant-rep and owner-operator content packages.",
    "5. Voice memo: best fit, poor fit, decision questions, and follow-up research.",
    "",
    "Safety: do not film while driving; use a passenger, parked capture, or mounted equipment consistent with law and platform policy.",
    "Privacy: avoid faces, license plates, private interiors, access controls, and confidential tenant information unless permission exists.",
    `Related content destination: ${destination}`,
    commercialBoundary(context),
    governance,
  ].join("\n");
}

function metaAd({
  title,
  excerpt,
  audience,
  objective,
  cta,
  destination,
  governance,
}: {
  title: string;
  excerpt: string;
  audience: string;
  objective: string;
  cta: string;
  destination: string;
  governance: string;
}) {
  const primaryText = excerpt.length > 360 ? `${excerpt.slice(0, 357).trim()}...` : excerpt;
  return [
    `Campaign objective: ${objective}`,
    `Audience: ${audience}`,
    `Primary text: ${primaryText}`,
    `Headline: ${title}`,
    "Short description: Practical guidance for making the next decision clearer.",
    `CTA: ${cta}`,
    `Content link: ${destination}`,
    "Creative recommendation: authentic source-aligned image or a 20–35 second vertical explanation.",
    "Test hypothesis: this source-supported framing will produce qualified content visits, not merely impressions.",
    governance,
  ].filter(Boolean).join("\n");
}

function extractPlainExcerpt(markdown: string) {
  const paragraph =
    markdown
      .split(/\n{2,}/)
      .map((block) =>
        block
          .replace(/^---[\s\S]*?---/, "")
          .replace(/<!--[\s\S]*?-->/g, "")
          .replace(/^#+\s+/gm, "")
          .replace(/[*_`>#|[\]]/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      )
      .find((block) => block.length > 80) ?? markdown.replace(/\s+/g, " ").trim();

  return paragraph.length > 450 ? `${paragraph.slice(0, 447).trim()}...` : paragraph;
}
