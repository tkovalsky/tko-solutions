import { describe, expect, it } from "vitest";
import {
  compareVersionText,
  formatRevisionContext,
  generateDerivativeCopy,
  deriveBehavioralContentStrategy,
  makeContentSlug,
} from "./content-workflow";

describe("content workflow helpers", () => {
  it("creates stable content slugs from operator titles", () => {
    expect(makeContentSlug("  Why Buyers Choose Rachel Delray!  ")).toBe("why-buyers-choose-rachel-delray");
  });

  it("formats revision notes for regeneration context", () => {
    expect(formatRevisionContext(["Tighten the opener.", "Add a practical CTA."])).toContain(
      "1. Tighten the opener.",
    );
    expect(formatRevisionContext(["  "])).toBe("");
  });

  it("compares draft versions with changed line metadata", () => {
    const comparison = compareVersionText("A\nB\nC", "A\nB2\nC");

    expect(comparison.changedLineCount).toBe(1);
    expect(comparison.changedLines).toEqual([{ line: 2, before: "B", after: "B2" }]);
  });

  it("generates copy-ready derivative text without external integrations", () => {
    const copy = generateDerivativeCopy({
      type: "email_draft",
      title: "Operational Intelligence vs Reporting",
      body: "# Operational Intelligence vs Reporting\n\nReporting tells you what happened. Operational intelligence tells you what to do next, who should act, and what evidence is still missing before a decision is safe.",
    });

    expect(copy).toContain("Subject: Operational Intelligence vs Reporting");
    expect(copy).toContain("Hi [Name],");
  });

  it("creates a complete Meta ad package with a tracked content link", () => {
    const copy = generateDerivativeCopy({
      type: "meta_ad",
      title: "Boca or Delray: Which Fits You?",
      body: "# Guide\n\nBoca and Delray offer different day-to-day experiences for relocating buyers.",
      context: {
        audience: "New Jersey buyers relocating to Florida",
        objective: "Qualified guide visits",
        cta: "Learn More",
        destinationUrl: "https://example.com/guide?utm_source=meta",
      },
    });

    expect(copy).toContain("Primary text:");
    expect(copy).toContain("Headline: Boca or Delray: Which Fits You?");
    expect(copy).toContain("Short description:");
    expect(copy).toContain("CTA: Learn More");
    expect(copy).toContain("Content link: https://example.com/guide?utm_source=meta");
  });

  it("preserves privacy and standalone-value guidance for Reddit stories", () => {
    const copy = generateDerivativeCopy({
      type: "reddit_post",
      title: "Renting before buying in Florida",
      body: "A relocating family used a rental year to understand seasonal traffic and neighborhood fit.",
      context: { privacyMode: "composite", destinationUrl: "https://example.com/story" },
    });

    expect(copy).toContain("must remain useful if the link is removed");
    expect(copy).toContain("Privacy mode: composite");
    expect(copy).toContain("Disclosure:");
  });

  it("creates Instagram and video production packages", () => {
    const instagram = generateDerivativeCopy({
      type: "instagram_story",
      title: "A Florida relocation decision",
      body: "The most important choice was lifestyle fit rather than the longest amenity list.",
      context: { cta: "Read the guide", destinationUrl: "https://example.com/guide" },
    });
    const video = generateDerivativeCopy({
      type: "video_shot_list",
      title: "Delray neighborhood guide",
      body: "A practical neighborhood comparison.",
      context: { geography: "Delray Beach, Florida" },
    });

    expect(instagram).toContain("link sticker destination");
    expect(video).toContain("Rights log:");
    expect(video).toContain("Delray Beach, Florida");
  });

  it("aligns luxury relocation content to an expressed possibility journey without exploiting mortality", () => {
    const strategy = deriveBehavioralContentStrategy({
      buyerDomain: "rachel_luxury",
      journeyStage: "defining",
      searchIntent: "specific",
      searchPhrase: "where can I buy my dream home in Florida for my next chapter",
      decisionJob: "possibility",
      expressedMotivation: "I want to enjoy the home and lifestyle I worked for.",
      priceOrValueContext: "$2M–$5M",
    });

    expect(strategy).toMatchObject({
      buyerDomain: "rachel_luxury",
      journeyStage: "defining",
      decisionJob: "possibility",
      recommendedArchetype: "decision_support",
      ctaIntensity: "soft",
    });
    expect(strategy.prohibitedTactics.join(" ")).toContain("mortality");
  });

  it("aligns detailed executive AI searches to proof and a guided conversation", () => {
    const strategy = deriveBehavioralContentStrategy({
      buyerDomain: "tko_executive",
      journeyStage: "validating",
      searchIntent: "high_intent",
      searchPhrase: "how to build a governed AI operating model for healthcare workflows",
      decisionJob: "control",
      desiredAction: "Review RachelOS proof and connect with Todd.",
    });

    expect(strategy.recommendedArchetype).toBe("proof");
    expect(strategy.ctaIntensity).toBe("guided");
    expect(strategy.desiredAction).toContain("Todd");
  });

  it("renders the behavioral brief into a reviewable package", () => {
    const copy = generateDerivativeCopy({
      type: "behavioral_content_brief",
      title: "Finding a Florida forever home",
      body: "A decision-support guide for buyers comparing luxury communities.",
      context: {
        buyerDomain: "rachel_luxury",
        journeyStage: "comparing",
        searchIntent: "specific",
        decisionJob: "possibility",
        priceOrValueContext: "$2M–$5M",
      },
    });

    expect(copy).toContain("Journey stage: comparing");
    expect(copy).toContain("Recommended archetype: comparison");
    expect(copy).toContain("Prohibited tactics:");
  });

  it("creates bounded tenant-rep and business-owner operating-system packages", () => {
    const tenantRep = generateDerivativeCopy({
      type: "cre_tenant_rep_brief",
      title: "Congress Avenue medical-office decision",
      body: "A site-selection brief based on dated field observations.",
      context: {
        buyerDomain: "cre_tenant_rep",
        journeyStage: "comparing",
        decisionJob: "location_fit",
        market: "Congress Avenue, Palm Beach County",
        propertyOrBusinessType: "medical office",
        licenseDisclosure: "Pre-license: licensed representation is handled by the confirmed referral partner.",
      },
    });
    const owner = generateDerivativeCopy({
      type: "owner_operating_system_brief",
      title: "Can the business operate without the owner?",
      body: "Owner dependency reduces transferability and makes operating evidence difficult to verify.",
      context: {
        buyerDomain: "business_owner_exit",
        journeyStage: "validating",
        decisionJob: "transferability",
        priceOrValueContext: "$25K+ monthly scope only after diagnosis",
      },
    });

    expect(tenantRep).toContain("parking");
    expect(tenantRep).toContain("Pre-license");
    expect(owner).toContain("$25K+ monthly scope may be proposed only after diagnosis");
    expect(owner).toContain("never present it as required to sell");
  });
});
