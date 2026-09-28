import { describe, expect, it } from "vitest";
import { getOffer, isOfferSlug, offerHref, offers } from "@/lib/offers";

describe("TKO offer ladder", () => {
  it("contains three unique, priced steps in diagnose → build → operate order", () => {
    expect(offers.map((offer) => offer.level)).toEqual(["Diagnose", "Build", "Operate"]);
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
