import { describe, expect, it } from "vitest";
import {
  DELIVERABLE_TYPES,
  type DeliverableType,
  buildDeliverableRegistry,
  evaluateDeliverableReadiness,
  getChannelPackageReadiness,
  getIgnoredDeliverables,
  getNextBestDeliverables,
  getPublishableDeliverables,
  getReadyToProduceDeliverables,
  toDeliverableType,
} from "./deliverables";

const evidence = {
  slug: "ev-human-api",
  domain: "healthcare",
  observation:
    "Critical operational knowledge depends on specific individuals, creating delay, burden, and Human API risk.",
  proofRef: "content/proof/healthcare/evidence.yaml#human-api-root-pattern",
  claimGuard: "Pattern-level advisory evidence. No named organization or metric.",
};

const newDeliverableTypes = [
  "comparison",
  "guide",
  "email_sequence",
  "landing_page",
  "linkedin_post",
  "facebook_ad",
  "reddit_post",
  "crm_next_touch_asset",
] satisfies DeliverableType[];

const legacyDeliverableTypes = [
  "article",
  "assessment",
  "report",
  "executive_brief",
  "case_study",
  "offer_asset",
  "sales_asset",
] satisfies DeliverableType[];

type ReadinessCaseInput = Omit<Parameters<typeof evaluateDeliverableReadiness>[0], "type">;

describe("TIF deliverable readiness", () => {
  it("recognizes new deliverable types without dropping legacy types", () => {
    expect(DELIVERABLE_TYPES).toEqual([...legacyDeliverableTypes, ...newDeliverableTypes]);

    for (const type of [...legacyDeliverableTypes, ...newDeliverableTypes]) {
      expect(toDeliverableType(type)).toBe(type);
    }

    expect(toDeliverableType("intelligence_report")).toBe("report");
    expect(toDeliverableType("comparison_page")).toBe("comparison");
    expect(toDeliverableType("relocation_guide")).toBe("guide");
  });

  it("scores article readiness from problem, evidence, and insight only", () => {
    const result = evaluateDeliverableReadiness({
      type: "article",
      title: "Human APIs Become Organizational Bottlenecks",
      angle: "When knowledge lives in a person instead of a system, that person becomes a bottleneck.",
      evidence: [evidence],
    });

    expect(result.readiness).toBe(100);
    expect(result.missing_components).toEqual([]);
  });

  it.each([
    [
      "comparison",
      {
        title: "Boca vs Delray",
        angle: "Compare Boca versus Delray for relocation buyers.",
        audience: "Relocation buyers.",
        evidence: [evidence],
      },
    ],
    [
      "guide",
      {
        title: "Relocation Buyer Guide",
        angle: "Relocation buyers need decision support before choosing a community.",
        audience: "Relocation buyers.",
        evidence: [evidence],
      },
    ],
    [
      "email_sequence",
      {
        title: "Operational Recovery Follow-Up Sequence",
        angle: "Primary topic: operational recovery assessment follow-up.",
        audience: "Healthcare operations leaders.",
        assetStatus: "draft",
        evidence: [],
      },
    ],
    [
      "landing_page",
      {
        title: "Operational Recovery Assessment",
        angle: "Offer: Operational Recovery Assessment. CTA: schedule a diagnostic.",
        audience: "Healthcare operations leaders.",
        evidence: [],
      },
    ],
    [
      "linkedin_post",
      {
        title: "Human API Insight",
        angle: "Insight: operational knowledge trapped in one person creates execution risk.",
        evidence: [],
      },
    ],
    [
      "facebook_ad",
      {
        title: "Relocation Guide Ad",
        angle: "Offer: relocation guide. CTA: book a buyer consultation.",
        audience: "Relocation buyers.",
        evidence: [],
      },
    ],
    [
      "reddit_post",
      {
        title: "Relocation Topic",
        angle: "Insight: relocation buyers need local decision criteria before touring homes.",
        evidence: [],
      },
    ],
    [
      "crm_next_touch_asset",
      {
        title: "Buyer Next Touch",
        angle: "Next action: send a follow-up email with the approved guide.",
        audience: "Relocation buyers.",
        assetStatus: "draft",
        evidence: [],
      },
    ],
  ] satisfies Array<[DeliverableType, ReadinessCaseInput]>)(
    "marks %s ready when deterministic inputs are present",
    (type, input) => {
      const result = evaluateDeliverableReadiness({ type, ...input });

      expect(result.readiness).toBe(100);
      expect(result.missing_components).toEqual([]);
      expect(result.blocking_gaps).toEqual([]);
    },
  );

  it.each([
    [
      "comparison",
      {
        title: "Community Comparison",
        angle: "",
        audience: null,
        evidence: [],
      },
      ["audience", "compared_entities", "supporting_material"],
    ],
    [
      "guide",
      {
        title: "Relocation Buyer Guide",
        angle: "",
        audience: null,
        evidence: [evidence],
      },
      ["audience", "topic"],
    ],
    [
      "email_sequence",
      {
        title: "Follow-Up Sequence",
        angle: "Primary topic: operational recovery.",
        audience: null,
        evidence: [],
      },
      ["audience", "source_deliverable"],
    ],
    [
      "landing_page",
      {
        title: "Conversion Page",
        angle: "",
        audience: "Healthcare operations leaders.",
        evidence: [],
      },
      ["offer", "cta"],
    ],
    [
      "linkedin_post",
      {
        title: "Post",
        angle: "",
        evidence: [],
      },
      ["source_insight_or_deliverable"],
    ],
    [
      "facebook_ad",
      {
        title: "Ad",
        angle: "",
        audience: null,
        evidence: [],
      },
      ["audience", "cta"],
    ],
    [
      "reddit_post",
      {
        title: "Post",
        angle: "",
        evidence: [],
      },
      ["source_insight", "topic"],
    ],
    [
      "crm_next_touch_asset",
      {
        title: "CRM Asset",
        angle: "",
        audience: "Relocation buyers.",
        evidence: [],
      },
      ["source_deliverable", "next_action"],
    ],
  ] satisfies Array<[
    DeliverableType,
    ReadinessCaseInput,
    string[],
  ]>)("blocks %s when required deterministic inputs are missing", (type, input, blockingGaps) => {
    const result = evaluateDeliverableReadiness({ type, ...input });

    expect(result.readiness).toBeLessThan(100);
    expect(result.blocking_gaps).toEqual(blockingGaps);
  });

  it("blocks a case study without proof even when other fields have signals", () => {
    const result = evaluateDeliverableReadiness({
      type: "case_study",
      title: "From Manual Queue To Decision System",
      angle: "The starting state changed after the system design intervention produced a result.",
      evidence: [{ ...evidence, proofRef: "" }],
    });

    expect(result.readiness).toBe(75);
    expect(result.blocking_gaps).toEqual(["proof"]);
  });

  it("builds deliverables from opportunities without creating storage records", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "human-apis-become-organizational-bottlenecks",
          title: "Human APIs Become Organizational Bottlenecks",
          businessUnit: "tko",
          assetType: "article",
          angle: "When operational knowledge lives in a person instead of a system, that person becomes a bottleneck.",
          audience: "Healthcare operations leaders.",
          evidenceLinks: [{ evidence }],
          assets: [],
        },
      ],
      assets: [],
    });

    expect(deliverables).toHaveLength(1);
    expect(deliverables[0]).toMatchObject({
      type: "article",
      status: "ready",
      readiness: 100,
      priority_score: 94,
      evidence_count: 1,
      has_asset: false,
      next_action: "Produce the deliverable from the existing opportunity and evidence.",
      channel_readiness_counts: { ready: 5, partial: 1, blocked: 4 },
    });
  });

  it("computes channel package readiness for supported deliverable shapes", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "boca-vs-delray",
          title: "Boca vs Delray",
          businessUnit: "rachel",
          assetType: "comparison",
          angle: "Compare Boca versus Delray for relocation buyers.",
          audience: "Relocation buyers.",
          evidenceLinks: [{ evidence }],
          assets: [],
        },
        {
          slug: "relocation-guide",
          title: "Relocation Buyer Guide",
          businessUnit: "rachel",
          assetType: "guide",
          angle: "Relocation buyers need decision support before choosing a community.",
          audience: "Relocation buyers.",
          evidenceLinks: [{ evidence }],
          assets: [],
        },
        {
          slug: "market-report",
          title: "Market Intelligence Report",
          businessUnit: "cre",
          assetType: "report",
          angle: "Executive summary with analysis, pattern, impact, and recommendation.",
          audience: "CRE operators.",
          evidenceLinks: [{ evidence }],
          assets: [{ slug: "market-report-draft", status: "draft" }],
        },
        {
          slug: "recovery-offer",
          title: "Operational Recovery Assessment Offer",
          businessUnit: "tko",
          assetType: "offer_asset",
          angle:
            "Offer: operational recovery assessment service. Buyer problem: delay and burden. Deliverables: roadmap and readout. CTA: schedule diagnostic.",
          audience: "Healthcare operations leaders.",
          evidenceLinks: [{ evidence }],
          assets: [],
        },
        {
          slug: "risk-assessment",
          title: "Human API Risk Assessment",
          businessUnit: "tko",
          assetType: "assessment",
          angle:
            "Assessment questions diagnose the root cause, operational impact, and recommended next move.",
          audience: "Healthcare operations leaders.",
          evidenceLinks: [{ evidence }],
          assets: [],
        },
      ],
      assets: [],
    });

    expect(deliverables.find((item) => item.id === "boca-vs-delray")?.channel_readiness.linkedin_carousel)
      .toBe("ready");
    expect(deliverables.find((item) => item.id === "relocation-guide")?.channel_readiness.seo_page)
      .toBe("ready");
    expect(deliverables.find((item) => item.id === "market-report")?.channel_readiness.pdf)
      .toBe("ready");
    expect(deliverables.find((item) => item.id === "recovery-offer")?.channel_readiness.facebook_ad)
      .toBe("ready");
    expect(deliverables.find((item) => item.id === "risk-assessment")?.channel_readiness.sales_one_pager)
      .toBe("ready");
  });

  it("blocks or partially blocks channel packages when required metadata is missing", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "missing-audience",
          title: "Ready Article Without Audience",
          businessUnit: "tko",
          assetType: "article",
          angle: "Reporting is not operational intelligence because leaders still need a next move.",
          audience: null,
          evidenceLinks: [{ evidence }],
          assets: [],
        },
        {
          slug: "missing-cta",
          title: "Offer Without Conversion Action",
          businessUnit: "tko",
          assetType: "offer_asset",
          angle:
            "Offer: operational recovery assessment service. Buyer problem: delay and burden. Deliverables: roadmap and readout.",
          audience: "Healthcare operations leaders.",
          evidenceLinks: [{ evidence }],
          assets: [],
        },
        {
          slug: "missing-insight",
          title: "Reddit Topic Without Insight",
          businessUnit: "rachel",
          assetType: "reddit_post",
          angle: "",
          audience: "Relocation buyers.",
          evidenceLinks: [],
          assets: [],
        },
        {
          slug: "missing-next-action",
          title: "CRM Asset Missing Instruction",
          businessUnit: "rachel",
          assetType: "crm_next_touch_asset",
          angle: "Source deliverable exists for relocation buyers.",
          audience: "Relocation buyers.",
          evidenceLinks: [],
          assets: [],
        },
      ],
      assets: [],
    });

    const missingAudience = deliverables.find((item) => item.id === "missing-audience");
    const missingCta = deliverables.find((item) => item.id === "missing-cta");
    const missingInsight = deliverables.find((item) => item.id === "missing-insight");
    const missingNextAction = deliverables.find((item) => item.id === "missing-next-action");

    expect(missingAudience?.channel_readiness.facebook_post).toBe("blocked");
    expect(missingAudience?.channel_readiness.email_sequence).toBe("blocked");
    expect(missingCta?.channel_readiness.facebook_ad).toBe("partial");
    expect(missingInsight?.channel_readiness.reddit_post).toBe("blocked");
    expect(missingNextAction?.channel_readiness.crm_next_touch_asset).toBe("blocked");
  });

  it("keeps channel package readiness separate from production readiness, queue rank, and priority score", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "ready-article",
          title: "Operational Intelligence vs Reporting",
          businessUnit: "tko",
          assetType: "article",
          angle: "Reporting is not operational intelligence because leaders still need a next move.",
          audience: "Operations leaders.",
          evidenceLinks: [{ evidence }],
          assets: [{ slug: "ready-article", status: "draft" }],
        },
        {
          slug: "almost-ready-brief",
          title: "Operational Recovery Executive Brief",
          businessUnit: "tko",
          assetType: "executive_brief",
          angle:
            "The business problem is delay from Human API dependency; evidence shows operational risk and impact.",
          evidenceLinks: [{ evidence }],
          audience: "Healthcare operators.",
          assets: [],
        },
      ],
      assets: [],
    });

    const readyArticle = deliverables.find((item) => item.id === "ready-article");

    expect(readyArticle?.readiness).toBe(100);
    expect(readyArticle?.priority_score).toBe(100);
    expect(getChannelPackageReadiness(readyArticle!)).toEqual(readyArticle?.channel_readiness);
    expect(getNextBestDeliverables(deliverables, 2).map((item) => item.id)).toEqual([
      "ready-article",
      "almost-ready-brief",
    ]);
  });

  it("ranks next best deliverables by deterministic production priority", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "ready-article",
          title: "Operational Intelligence vs Reporting",
          businessUnit: "tko",
          assetType: "article",
          angle: "Reporting is not operational intelligence because leaders still need a next move.",
          audience: "Operations leaders.",
          evidenceLinks: [{ evidence }],
          assets: [{ slug: "ready-article", status: "draft" }],
        },
        {
          slug: "almost-ready-brief",
          title: "Operational Recovery Executive Brief",
          businessUnit: "tko",
          assetType: "executive_brief",
          angle:
            "The business problem is delay from Human API dependency; evidence shows operational risk and impact.",
          evidenceLinks: [{ evidence }],
          audience: "Healthcare operators.",
          assets: [],
        },
      ],
      assets: [],
    });

    expect(getNextBestDeliverables(deliverables, 2).map((item) => item.id)).toEqual([
      "ready-article",
      "almost-ready-brief",
    ]);
    expect(deliverables.find((item) => item.id === "ready-article")).toMatchObject({
      priority_score: 100,
      completion_probability: 100,
      estimated_effort_minutes: 15,
      next_action: "Review final asset and publish manually.",
    });
  });

  it("surfaces new deliverable types in queue calculations while preserving legacy deliverables", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "boca-vs-delray",
          title: "Boca vs Delray",
          businessUnit: "rachel",
          assetType: "comparison",
          angle: "Compare Boca versus Delray for relocation buyers.",
          audience: "Relocation buyers.",
          evidenceLinks: [{ evidence }],
          assets: [],
        },
        {
          slug: "ready-article",
          title: "Operational Intelligence vs Reporting",
          businessUnit: "tko",
          assetType: "article",
          angle: "Reporting is not operational intelligence because leaders still need a next move.",
          audience: "Operations leaders.",
          evidenceLinks: [{ evidence }],
          assets: [],
        },
        {
          slug: "blocked-reddit-post",
          title: "Reddit Post",
          businessUnit: "rachel",
          assetType: "reddit_post",
          angle: "",
          audience: null,
          evidenceLinks: [],
          assets: [],
        },
      ],
      assets: [
        {
          slug: "recovery-follow-up-sequence",
          title: "Operational Recovery Follow-Up Sequence",
          businessUnit: "tko",
          assetType: "email_sequence",
          status: "draft",
          opportunity: {
            slug: "source-recovery-assessment",
            title: "Operational Recovery Assessment",
            angle: "Primary topic: operational recovery follow-up.",
            audience: "Healthcare operations leaders.",
          },
          evidenceLinks: [],
        },
      ],
    });

    expect(getReadyToProduceDeliverables(deliverables).map((item) => item.type)).toEqual(
      expect.arrayContaining(["comparison", "article"]),
    );
    expect(getPublishableDeliverables(deliverables).map((item) => item.type)).toEqual(["email_sequence"]);
    expect(getIgnoredDeliverables(deliverables).map((item) => item.type)).toEqual(["reddit_post"]);

    const nextBest = getNextBestDeliverables(deliverables, 3);
    const priorityScores = nextBest.map((item) => item.priority_score);
    expect(priorityScores).toEqual([...priorityScores].sort((a, b) => b - a));
    expect(nextBest.map((item) => item.type)).toEqual(
      expect.arrayContaining(["email_sequence", "comparison", "article"]),
    );
  });

  it("surfaces blocker details and ignores work outside a 2-hour window", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "blocked-report",
          title: "Empty Report",
          businessUnit: "cre",
          assetType: "intelligence_report",
          angle: "",
          audience: null,
          evidenceLinks: [],
          assets: [],
        },
      ],
      assets: [],
    });

    expect(deliverables[0].blocker_details).toEqual(
      expect.arrayContaining([{ kind: "missing_evidence", label: "missing evidence" }]),
    );
    expect(getIgnoredDeliverables(deliverables)).toHaveLength(1);
    expect(deliverables[0].ignore_reason).toBe("Blocked with low completion probability.");
  });
});
