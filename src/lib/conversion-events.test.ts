import { beforeEach, describe, expect, it } from "vitest";
import { sanitizeEventProperties, trackConversion } from "@/lib/conversion-events";

describe("conversion events", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/contact?utm_source=referral&email=private@example.com");
    window.__tkoConversionEvents = [];
    window.dataLayer = [];
  });

  it("records only the path and allow-listed context", () => {
    trackConversion("primary_cta_click", {
      ctaLocation: "homepage_hero",
      ctaLabel: "Request a Diagnostic Fit Call",
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
});
