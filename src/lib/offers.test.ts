import { describe, expect, it } from "vitest";
import { BLUEPRINT_CREDIT_TERMS, blueprintFoundingOpen, blueprintLaunch, commercialEngines, getOffer, isOfferSlug, offerHref, offers, sidecar, sprintFoundingOpen, sprintLaunch } from "@/lib/offers";

describe("TKO offer ladder", () => {
  it("contains three unique, priced steps in diagnose → build → operate order", () => {
    for (const offer of offers) {
      expect(["Diagnose", "Build", "Operate"]).toContain(offer.level);
    }
    expect(new Set(offers.map((offer) => offer.slug)).size).toBe(offers.length);
    for (const offer of offers) {
      expect(offer.startingPrice).toMatch(/^\$/);
      expect(offer.commercial).toMatch(/\$/);
      expect(offer.boundaries.length).toBeGreaterThanOrEqual(4);
      expect(offer.expansionPath.length).toBeGreaterThan(40);
      expect(getOffer(offer.slug)).toBe(offer);
      expect(isOfferSlug(offer.slug)).toBe(true);
      expect(offerHref(offer.slug)).toBe(`/services/${offer.slug}`);
    }
  });

  it("does not expose hourly staff augmentation", () => {
    expect(JSON.stringify(offers).toLowerCase()).not.toContain("per hour");
    expect(offers.some((offer) => offer.slug.includes("subcontract"))).toBe(false);
  });
});


describe("Commercial engine consistency", () => {
  it("keeps existing route identities while sharing the approved commercial terms", () => {
    expect(commercialEngines.map((engine) => engine.slug)).toEqual(["regulatory-implementation-readiness-sprint", "operating-system-build"]);
    expect(getOffer("regulatory-implementation-readiness-sprint")).toMatchObject({ startingPrice: "$15,000", duration: "3–4 weeks" });
    expect(getOffer("operating-system-build")).toMatchObject({ startingPrice: getOffer("execution-sprint")!.startingPrice, commercial: `From ${getOffer("execution-sprint")!.startingPrice} per Sprint · usually one or two Sprints` });
    expect(JSON.stringify(getOffer("operating-system-build"))).not.toMatch(/\$7,500/);
    expect(getOffer("operate-and-improve")).toMatchObject({ startingPrice: "$1,500/mo", commercial: "$1,500–$3,000 per month" });
    for (const engine of commercialEngines) expect(getOffer(engine.slug)).toBeDefined();
  });
});

describe("BoundOS ladder", () => {
  it("states assessment, Core, and Managed in order with Schedule A contact limits", () => {
    expect(sidecar.steps.map((step) => step.id)).toEqual(["assessment", "core", "managed"]);
    expect(sidecar.steps.map((step) => step.price)).toEqual(["$500", "$1,500 setup", "$2,500 setup"]);
    expect(sidecar.steps.map((step) => ("monthly" in step ? step.monthly : undefined))).toEqual([undefined, "$500/month", "$1,200/month"]);
    expect(sidecar.steps.map((step) => step.includes.find((item) => /contacts/.test(item)))).toEqual([
      "Up to 8,000 contacts",
      "Up to 3,000 contacts; email support within two business days",
      "Up to 8,000 contacts; email support within one business day",
    ]);
  });

  it("does not publish Rachel Desk or guarantee outcomes", () => {
    const text = JSON.stringify(sidecar).toLowerCase();
    expect(text).not.toContain("rachel desk");
    expect(text).not.toMatch(/guarantee/);
    expect(sidecar.contactHref).toBe("/contact?offer=managed-follow-up");
  });
});

describe("Execution Gap Blueprint", () => {
  const blueprint = getOffer("execution-gap-blueprint")!;

  it("is the first rung and states the approved founding and standard prices", () => {
    expect(offers[0].slug).toBe("execution-gap-blueprint");
    expect(blueprintLaunch).toMatchObject({ foundingPrice: "$999", standardPrice: "$1,499", foundingAllocation: 5, creditMinimum: "$7,500", creditWindowDays: 45 });
    expect(blueprintLaunch.foundingPaid).toBeGreaterThanOrEqual(0);
    expect(blueprintLaunch.foundingPaid).toBeLessThanOrEqual(blueprintLaunch.foundingAllocation);
    if (blueprintFoundingOpen) {
      expect(blueprint).toMatchObject({ startingPrice: "$999", commercial: "$999 founding price · $1,499 standard" });
    } else {
      expect(blueprint).toMatchObject({ startingPrice: "$1,499", commercial: "$1,499 fixed" });
      expect(JSON.stringify(blueprint)).not.toContain("$999");
    }
  });

  it("states the credit once, with every limit, wherever the Blueprint is described", () => {
    for (const term of ["once", "$7,500", "45 days", "not transferable", "cash", "combined with another credit", "Existing signed agreements"]) {
      expect(BLUEPRINT_CREDIT_TERMS).toContain(term);
    }
    expect(blueprint.feeBoundary).toBe(BLUEPRINT_CREDIT_TERMS);
    expect(blueprint.expansionPath).toContain("$7,500 or more within 45 days");
    expect(blueprint.expansionPath).toContain("credited once");
    expect(getOffer("constraint-diagnostic")!.expansionPath).toContain("Blueprint fee is credited once under its published terms");
  });

  it("states its scope limits and that a request is not a charge", () => {
    const text = JSON.stringify(blueprint);
    for (const limit of ["one business function", "three systems", "30 minutes", "No production credentials", "One round of factual clarification"]) {
      expect(text).toContain(limit);
    }
    expect(blueprint.purchasePath?.map((step) => step.title)).toEqual(["Request", "Confirm fit", "Order and invoice", "Intake and delivery"]);
    expect(text).toContain("does not charge you");
  });
});

describe("Execution Sprint", () => {
  const sprint = getOffer("execution-sprint")!;

  it("follows the Blueprint and states the approved founding and standard prices", () => {
    expect(offers[1].slug).toBe("execution-sprint");
    expect(sprint.level).toBe("Build");
    expect(sprintLaunch).toMatchObject({ foundingPrice: "$9,999", standardPrice: "$14,999", foundingAllocation: 3 });
    expect(sprintLaunch.foundingPaid).toBeGreaterThanOrEqual(0);
    expect(sprintLaunch.foundingPaid).toBeLessThanOrEqual(sprintLaunch.foundingAllocation);
    if (sprintFoundingOpen) {
      expect(sprint).toMatchObject({ startingPrice: "$9,999", commercial: "$9,999 founding price · from $14,999 standard" });
    } else {
      expect(sprint).toMatchObject({ startingPrice: "$14,999", commercial: "From $14,999 · fixed scope" });
      expect(JSON.stringify(sprint)).not.toContain("$9,999");
    }
  });

  it("qualifies for the Blueprint credit and names it in the credit terms", () => {
    expect(Number(sprintLaunch.foundingPrice.replace(/\D/g, ""))).toBeGreaterThanOrEqual(Number(blueprintLaunch.creditMinimum.replace(/\D/g, "")));
    expect(BLUEPRINT_CREDIT_TERMS).toContain("an Execution Sprint");
    expect(sprint.feeBoundary).toContain("Blueprint fee is credited once under its published terms");
  });

  it("states the qualification limits, acceptance, change control, and that a request is not a charge", () => {
    const text = JSON.stringify(sprint);
    for (const limit of ["one business function", "up to five users", "up to two sources", "no more than three systems", "sign by Day 5", "after Day 10", "human-approved", "BoundOS", "enterprise engagement"]) {
      expect(text).toContain(limit);
    }
    expect(sprint.purchasePath?.map((step) => step.title)).toEqual(["Request", "Qualify", "Written order", "Kickoff"]);
    expect(text).toContain("does not charge you");
    expect(sprint.ctaLabel).toBe("Evaluate an Execution Sprint");
  });

  it("does not claim a packaged platform, CRM integrations, or guaranteed results", () => {
    const text = JSON.stringify(sprint).toLowerCase();
    for (const claim of ["tko os", "platform", "follow up boss", "guarantee", "autonomous agent"]) {
      expect(text).not.toContain(claim);
    }
    expect(sprint.faqs.find((faq) => faq.q === "Is this a software product?")?.a).toMatch(/^No\. /);
  });
});
