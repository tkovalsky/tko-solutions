import { afterEach, describe, expect, it, vi } from "vitest";
import { submitProgramReview } from "@/app/contact/actions";
import { notifyLead } from "@/lib/leads/notify";
import { persistInboundLead } from "@/lib/leads/persist";

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

vi.mock("@/lib/leads/persist", () => ({
  persistInboundLead: vi.fn(),
}));

vi.mock("@/lib/leads/notify", () => ({
  notifyLead: vi.fn(),
}));

const mockedPersistInboundLead = vi.mocked(persistInboundLead);
const mockedNotifyLead = vi.mocked(notifyLead);

afterEach(() => {
  vi.restoreAllMocks();
});

describe("submitProgramReview", () => {
  it("rejects an invalid business email without persisting", async () => {
    const formData = validFormData();
    formData.set("email", "not-an-email");

    await expect(submitProgramReview(formData)).rejects.toThrow(
      "REDIRECT:/contact?status=invalid",
    );

    expect(mockedPersistInboundLead).not.toHaveBeenCalled();
    expect(mockedNotifyLead).not.toHaveBeenCalled();
  });

  it("requires explicit privacy consent", async () => {
    const formData = validFormData();
    formData.delete("privacyConsent");

    await expect(submitProgramReview(formData)).rejects.toThrow(
      "REDIRECT:/contact?status=invalid",
    );

    expect(mockedPersistInboundLead).not.toHaveBeenCalled();
    expect(mockedNotifyLead).not.toHaveBeenCalled();
  });

  it("rejects a missing executive decision", async () => {
    const formData = validFormData();
    formData.delete("executiveDecision");

    await expect(submitProgramReview(formData)).rejects.toThrow(
      "REDIRECT:/contact?status=invalid",
    );

    expect(mockedPersistInboundLead).not.toHaveBeenCalled();
  });

  it("persists a valid lead with attribution before notifying", async () => {
    const lead = persistedLead();
    mockedPersistInboundLead.mockResolvedValue(lead);
    mockedNotifyLead.mockResolvedValue({ status: "skipped", reason: "missing_env" });

    await expect(submitProgramReview(validFormData())).rejects.toThrow(
      "REDIRECT:/contact?status=submitted",
    );

    expect(mockedPersistInboundLead).toHaveBeenCalledWith({
      name: "Todd Example",
      email: "todd@example.com",
      company: "Example Co",
      role: "COO",
      source: "confidential_program_review",
      landingPage: "/contact?utm_source=referral",
      payload: {
        name: "Todd Example",
        email: "todd@example.com",
        company: "Example Co",
        role: "COO",
        organizationType: "healthcare-provider-mso",
        engagementNeed: "program-under-pressure",
        programUnderPressure: "Enterprise care-management modernization program.",
        urgencyContext: "The integrated milestone plan no longer supports the funding decision.",
        executiveDecision: "Decide whether to re-baseline, narrow scope, or change vendor accountability.",
        timing: "31-90",
        executiveSponsor: "Chief Operating Officer",
        budgetRange: "25-50",
        privacyConsent: true,
        message: "We need an independent fact base before the next steering committee.",
        referrer: "https://example.com/referral",
        utmSource: "referral",
        utmMedium: "partner",
        utmCampaign: "program-recovery",
        device: "desktop",
        ctaLocation: "homepage_hero",
      },
      submittedAt: expect.any(Date),
    });
    expect(mockedNotifyLead).toHaveBeenCalledWith(lead);
  });

  it("still redirects successfully when notification fails safely", async () => {
    mockedPersistInboundLead.mockResolvedValue(persistedLead());
    mockedNotifyLead.mockResolvedValue({ status: "failed", reason: "Resend unavailable" });

    await expect(submitProgramReview(validFormData())).rejects.toThrow(
      "REDIRECT:/contact?status=submitted",
    );
  });

  it("redirects to an explicit error state when persistence fails", async () => {
    mockedNotifyLead.mockClear();
    mockedPersistInboundLead.mockRejectedValue(new Error("database unavailable"));

    await expect(submitProgramReview(validFormData())).rejects.toThrow(
      "REDIRECT:/contact?status=error",
    );
    expect(mockedNotifyLead).not.toHaveBeenCalled();
  });
});

function persistedLead() {
  const submittedAt = new Date("2026-07-02T12:00:00.000Z");
  return {
    id: "lead_123",
    name: "Todd",
    email: "todd@example.com",
    company: null,
    role: null,
    source: "contact_form",
    landingPage: "/contact",
    payload: {},
    notifiedAt: null,
    lastSubmittedAt: submittedAt,
    createdAt: submittedAt,
    updatedAt: submittedAt,
  };
}

function validFormData() {
  const formData = new FormData();
  formData.set("name", "Todd Example");
  formData.set("email", "todd@example.com");
  formData.set("company", "Example Co");
  formData.set("role", "COO");
  formData.set("organizationType", "healthcare-provider-mso");
  formData.set("engagementNeed", "program-under-pressure");
  formData.set("programUnderPressure", "Enterprise care-management modernization program.");
  formData.set("urgencyContext", "The integrated milestone plan no longer supports the funding decision.");
  formData.set("executiveDecision", "Decide whether to re-baseline, narrow scope, or change vendor accountability.");
  formData.set("timing", "31-90");
  formData.set("executiveSponsor", "Chief Operating Officer");
  formData.set("budgetRange", "25-50");
  formData.set("privacyConsent", "on");
  formData.set("message", "We need an independent fact base before the next steering committee.");
  formData.set("source", "confidential_program_review");
  formData.set("landingPage", "/contact?utm_source=referral");
  formData.set("referrer", "https://example.com/referral");
  formData.set("utmSource", "referral");
  formData.set("utmMedium", "partner");
  formData.set("utmCampaign", "program-recovery");
  formData.set("device", "desktop");
  formData.set("ctaLocation", "homepage_hero");
  return formData;
}
