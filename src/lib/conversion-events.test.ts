import { beforeEach, describe, expect, it, vi } from "vitest";
import { getConversionAttribution, sanitizeEventProperties, trackConversion } from "@/lib/conversion-events";

describe("conversion events", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/contact?utm_source=referral&email=private@example.com");
    window.__tkoConversionEvents = [];
    window.dataLayer = [];
    window.sessionStorage.clear();
  });

  it("records only the path and allow-listed context", () => {
    trackConversion("primary_cta_click", {
      ctaLocation: "homepage_hero",
      ctaLabel: "Request a Program Recovery Conversation",
      referencedService: "diagnostic",
    });

    expect(window.__tkoConversionEvents?.[0]).toMatchObject({
      event: "primary_cta_click",
      pagePath: "/contact",
      utmSource: "referral",
      ctaLocation: "homepage_hero",
      referencedService: "diagnostic",
    });
    expect(JSON.stringify(window.__tkoConversionEvents)).not.toContain("private@example.com");
  });

  it("keeps qualified intake as a boolean without form values", () => {
    expect(sanitizeEventProperties({ qualified: true })).toEqual({ qualified: true });
  });

  it("keeps first landing campaign context when the visitor navigates to intake", () => {
    window.history.replaceState({}, "", "/healthcare/readiness-preview?utm_source=linkedin&utm_medium=personal&utm_campaign=readiness&email=private@example.com");
    getConversionAttribution();
    window.history.replaceState({}, "", "/contact?offer=regulatory-implementation-readiness-sprint");
    expect(getConversionAttribution()).toMatchObject({ landingPage: "/healthcare/readiness-preview", utmSource: "linkedin", utmMedium: "personal", utmCampaign: "readiness" });
    trackConversion("contact_form_start");
    expect(window.__tkoConversionEvents?.[0]).toMatchObject({ pagePath: "/contact", utmSource: "linkedin", utmCampaign: "readiness" });
    expect(window.sessionStorage.getItem("tko:attribution:v1")).not.toContain("private@example.com");
  });

  it("drops personal-looking campaign values and recovers from damaged or unavailable storage", () => {
    window.history.replaceState({}, "", "/contact?utm_source=private@example.com&utm_campaign=hello%20private%20person");
    window.sessionStorage.setItem("tko:attribution:v1", "damaged JSON");
    expect(getConversionAttribution()).toMatchObject({ landingPage: "/contact", utmSource: "", utmCampaign: "" });
    window.sessionStorage.clear();
    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("storage disabled"); });
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("storage disabled"); });
    try { expect(() => trackConversion("contact_form_start")).not.toThrow(); }
    finally { getItem.mockRestore(); setItem.mockRestore(); }
  });

  it("expires old attribution and never emits private workspace events", () => {
    window.sessionStorage.setItem("tko:attribution:v1", JSON.stringify({ expiresAt: Date.now() - 1, landingPage: "/old", utmSource: "old" }));
    expect(getConversionAttribution()).toMatchObject({ landingPage: "/contact", utmSource: "referral" });
    window.history.replaceState({}, "", "/tif/opportunities/private-id");
    trackConversion("primary_cta_click");
    expect(window.__tkoConversionEvents).toEqual([]);
    expect(window.dataLayer).toEqual([]);
  });
});
