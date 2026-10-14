import { describe, expect, it } from "vitest";
import { commercialEngines, getOffer, isOfferSlug, offerHref, offers } from "@/lib/offers";

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
