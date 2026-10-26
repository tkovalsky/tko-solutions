import { describe, expect, it } from "vitest";
import { buildLeadNotificationEmail, buildLeadReceiptEmail } from "./email-templates";
import type { PersistedInboundLead } from "./types";

const lead: PersistedInboundLead = {
  id: "lead-1", name: "Alex", email: "alex@example.com", company: "Example Co", role: "COO",
  source: "diagnostic_fit_call", landingPage: "/contact", notifiedAt: null,
  lastSubmittedAt: new Date("2026-10-16T12:00:00Z"),
  createdAt: new Date("2026-10-16T12:00:00Z"), updatedAt: new Date("2026-10-16T12:00:00Z"),
  payload: {
    transformationContext: "Slow manual handoffs", currentPressure: "manual-work",
    revenueBand: "5-20m", timing: "now", targetDeadline: "March decision",
    affectedSystems: "UM and claims", sponsor: "VP Operations", healthcareScope: "One platform transition",
    referrer: "https://private.example", privacyConsent: true,
  },
};

describe("prospect receipt", () => {
  it("acknowledges receipt without booking a call or echoing private intake", () => {
    const content = buildLeadReceiptEmail(lead);
    expect(content.subject).toBe("Your request to TKO Solutions");
    for (const body of [content.text, content.html]) {
      expect(body).toContain("Hi Alex,");
      expect(body).toContain("two business days");
      expect(body).toContain("todd@tko.solutions");
      expect(body).not.toMatch(/booked|scheduled/i);
      expect(body).not.toContain("Slow manual handoffs");
      expect(body).not.toContain("5-20m");
    }
  });

  it("escapes a submitted name in HTML and handles a missing name", () => {
    const content = buildLeadReceiptEmail({ ...lead, name: '<script>alert("x")</script>' });
    expect(content.html).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
    expect(content.html).not.toContain("<script>");
    expect(buildLeadReceiptEmail({ ...lead, name: null }).text).toMatch(/^Hello,/);
  });
});

describe("operator brief", () => {
  it("includes the saved contact, submitted intake, provenance, and an authenticated review destination", () => {
    const content = buildLeadNotificationEmail(lead);
    expect(content.subject).toBe("You've got leads! — Alex / Example Co");
    for (const body of [content.text, content.html]) {
      for (const value of ["Alex", "Example Co", "COO", "alex@example.com", "Slow manual handoffs", "manual-work", "5-20m", "now", "March decision", "UM and claims", "VP Operations", "One platform transition", "diagnostic_fit_call", "2026-10-16T12:00:00.000Z", "lead-1", "https://tko.solutions/tif/oi/today"]) {
        expect(body).toContain(value);
      }
      expect(body).toContain("Review the request and reply within two business days.");
      expect(body).not.toContain("https://private.example");
    }
  });

  it("includes private-client inquiry fields without assuming diagnostic context", () => {
    const content = buildLeadNotificationEmail({ ...lead, landingPage: "/private-client-os", payload: { firm: "Example Partners", market: "Palm Beach", transactionSize: "$10M+", inquiryType: "PCOS_QUEUE_WALKTHROUGH" } });
    for (const body of [content.text, content.html]) {
      for (const value of ["Example Partners", "Palm Beach", "$10M+", "PCOS_QUEUE_WALKTHROUGH", "/private-client-os"]) expect(body).toContain(value);
      expect(body).not.toContain("Revenue band:");
    }
  });

  it("includes managed follow-up qualification answers with labels", () => {
    const content = buildLeadNotificationEmail({ ...lead, payload: { offer: "managed-follow-up", crm: "Follow Up Boss", contactCount: "500-3000", consentEvidence: "Past clients; opt-outs in FUB", caller: "Agent and assistant" } });
    for (const line of ["CRM: Follow Up Boss", "Approximate contacts: 500-3000", "Consent evidence and opt-outs: Past clients; opt-outs in FUB", "Who makes the calls and logs dispositions: Agent and assistant", "Requested offer: managed-follow-up"]) expect(content.text).toContain(line);
    expect(content.html).toContain("Who makes the calls and logs dispositions");
  });

  it("includes BoundOS application answers with labels", () => {
    const content = buildLeadNotificationEmail({ ...lead, source: "BOUNDOS_APPLY", payload: { inquiryType: "BOUNDOS_APPLY", vertical: "ria", crmApiKey: "no", datedRelationships: "About 300 clients", optOuts: "Redtail flag", holdout: "unsure", riaCompliance: "CCO: Pat; Smarsh; procedure drafted" } });
    for (const line of ["Vertical: ria", "Can create a CRM API key: no", "Dated relationships: About 300 clients", "Where opt-outs live: Redtail flag", "Accepts a 10–20% holdout: unsure", "RIA: CCO, archiving, Reg S-P: CCO: Pat; Smarsh; procedure drafted", "Inquiry type: BOUNDOS_APPLY"]) expect(content.text).toContain(line);
  });

  it("labels a Ghost Test result as self-reported", () => {
    const content = buildLeadNotificationEmail({ ...lead, source: "BOUNDOS_GHOST_TEST", payload: { inquiryType: "BOUNDOS_GHOST_TEST", ghostScore: "61", estimatedGhosted: "122", lastTouch: "3-12-months", dailyPick: "memory" } });
    for (const line of ["Ghost Score (self-reported test, 0 best, 100 worst): 61", "Estimated people to call back: 122", "Last personal touch: 3-12-months", "How they pick daily calls: memory"]) expect(content.text).toContain(line);
  });

  it("escapes every user-controlled HTML field and removes subject line breaks", () => {
    const malicious = '<img src=x onerror="alert(1)">';
    const content = buildLeadNotificationEmail({ ...lead, name: "Alex\r\nBcc:other@example.com", company: malicious, role: malicious, email: malicious, source: malicious, landingPage: malicious, payload: { transformationContext: malicious } });
    expect(content.html).not.toContain(malicious);
    expect(content.html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
    expect(content.subject).not.toMatch(/[\r\n]/);
  });

  it.each([null, [], "old payload", { transformationContext: { nested: "invalid" }, timing: false }])("handles absent or malformed optional intake context", (payload) => {
    const content = buildLeadNotificationEmail({ ...lead, name: null, company: null, role: null, source: null, landingPage: null, payload });
    expect(content.subject).toBe("You've got leads! — New website inquiry");
    expect(content.text).toContain("Name: Not provided");
    expect(content.text).not.toContain("[object Object]");
    expect(content.html).not.toContain("undefined");
  });
});
