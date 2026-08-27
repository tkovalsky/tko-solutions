import { describe, expect, it } from "vitest";
import { getOffer, isOfferSlug, offerHref, offers } from "@/lib/offers";

describe("TKO 2.0 offer catalogue", () => {
  it("contains four unique, value-priced engagements", () => {
    expect(offers).toHaveLength(4);
    expect(new Set(offers.map((offer) => offer.slug)).size).toBe(4);
    for (const offer of offers) {
      expect(offer.startingPrice).toMatch(/^\$/);
      expect(offer.commercial).toContain("Starting at");
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
