import { describe, expect, it } from "vitest";
import { commercialEngines, getOffer, isOfferSlug, offerHref, offers, sidecar } from "@/lib/offers";

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
    expect(getOffer("operating-system-build")).toMatchObject({ startingPrice: "$7,500", commercial: "$7,500–$15,000 build · fixed scope" });
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
