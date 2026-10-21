import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { offers } from "@/lib/offers";

// Guards docs/POSITIONING_LOCK.md: offer names and prices may only change when the lock
// file is updated in the same change, with Todd's approval. Fix the disagreement; do not
// edit this test to make it pass.

type LockedOffer = { slug: string; name: string; startingPrice: string; commercial: string; duration: string };
type LockedPage = { path: string; name: string; mustContain: string[] };

function readLock(): { offers: LockedOffer[]; otherPricedPages: LockedPage[] } {
  const markdown = readFileSync(path.join(process.cwd(), "docs/POSITIONING_LOCK.md"), "utf8");
  const block = markdown.match(/```json positioning-lock\n([\s\S]*?)```/);
  if (!block) throw new Error("docs/POSITIONING_LOCK.md is missing its ```json positioning-lock block.");
  return JSON.parse(block[1]);
}

describe("positioning lock", () => {
  const lock = readLock();

  it("lists exactly the offers in offers.ts", () => {
    expect(lock.offers.map((offer) => offer.slug).sort()).toEqual(offers.map((offer) => offer.slug).sort());
  });

  it("matches every offer's name, price, and duration", () => {
    for (const locked of lock.offers) {
      const offer = offers.find((item) => item.slug === locked.slug);
      expect(offer, locked.slug).toBeDefined();
      expect({ name: offer?.name, startingPrice: offer?.startingPrice, commercial: offer?.commercial, duration: offer?.duration }).toEqual({
        name: locked.name,
        startingPrice: locked.startingPrice,
        commercial: locked.commercial,
        duration: locked.duration,
      });
    }
  });

  it("matches prices on priced pages outside offers.ts", () => {
    for (const page of lock.otherPricedPages) {
      const source = readFileSync(path.join(process.cwd(), page.path), "utf8");
      for (const text of page.mustContain) expect(source, `${page.path} should contain ${text}`).toContain(text);
    }
  });
});
