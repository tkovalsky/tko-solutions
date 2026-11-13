import { describe, expect, it } from "vitest";
import { offers } from "@/lib/offers";
import { RELEASE_VERIFICATION_LABEL, REPORTED_OFFERS, reportingWindow, summarizeInquiries } from "./report-commercial-inquiries.mjs";

describe("commercial inquiry report", () => {
  it("reports every published offer, including the Blueprint, as its own bucket", () => {
    for (const offer of offers) expect(REPORTED_OFFERS).toContain(offer.slug);
    expect(REPORTED_OFFERS).toContain("execution-gap-blueprint");
    expect(REPORTED_OFFERS).toContain("managed-follow-up");
    expect(new Set(REPORTED_OFFERS).size).toBe(REPORTED_OFFERS.length);
  });

  it("excludes release-verification submissions by the same label the release test uses", () => {
    expect(RELEASE_VERIFICATION_LABEL).toBe("release_verification");
  });

  it("totals unique contacts and notification acceptance across buckets", () => {
    expect(summarizeInquiries([{ offer: "execution-gap-blueprint", contacts: 2, notified: 0 }, { offer: "general", contacts: "3", notified: "1" }])).toEqual({
      uniqueContacts: 5,
      latestNotificationAccepted: 1,
      groups: [{ offer: "execution-gap-blueprint", uniqueContacts: 2, latestNotificationAccepted: 0 }, { offer: "general", uniqueContacts: 3, latestNotificationAccepted: 1 }],
    });
  });

  it("accepts only a whole-day window from 1 to 365", () => {
    const now = new Date("2026-11-13T00:00:00Z");
    expect(reportingWindow("30", now).toISOString()).toBe("2026-10-14T00:00:00.000Z");
    for (const bad of ["0", "366", "1.5", "x"]) expect(() => reportingWindow(bad, now)).toThrow();
  });
});
