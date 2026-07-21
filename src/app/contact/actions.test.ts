import { afterEach, describe, expect, it, vi } from "vitest";
import { submitDiagnosticIntake } from "@/app/contact/actions";
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

describe("submitDiagnosticIntake", () => {
  it("rejects invalid submissions without persisting", async () => {
    const formData = validFormData();
    formData.set("email", "not-an-email");

    await expect(submitDiagnosticIntake(formData)).rejects.toThrow(
      "REDIRECT:/contact?status=invalid",
    );

    expect(mockedPersistInboundLead).not.toHaveBeenCalled();
    expect(mockedNotifyLead).not.toHaveBeenCalled();
  });

  it("requires explicit privacy consent", async () => {
    const formData = validFormData();
    formData.delete("privacyConsent");

    await expect(submitDiagnosticIntake(formData)).rejects.toThrow(
      "REDIRECT:/contact?status=invalid",
    );

    expect(mockedPersistInboundLead).not.toHaveBeenCalled();
    expect(mockedNotifyLead).not.toHaveBeenCalled();
  });

  it("persists a valid lead before notifying", async () => {
    const lead = {
      id: "lead_123",
      name: "Todd",
      email: "todd@example.com",
      company: null,
      role: null,
      source: "contact_form",
      landingPage: "/contact",
      payload: {},
      notifiedAt: null,
      lastSubmittedAt: new Date("2026-07-02T12:00:00.000Z"),
      createdAt: new Date("2026-07-02T12:00:00.000Z"),
      updatedAt: new Date("2026-07-02T12:00:00.000Z"),
    };
    mockedPersistInboundLead.mockResolvedValue(lead);
    mockedNotifyLead.mockResolvedValue({ status: "skipped", reason: "missing_env" });

    await expect(submitDiagnosticIntake(validFormData())).rejects.toThrow(
      "REDIRECT:/contact?status=submitted",
    );

    expect(mockedPersistInboundLead).toHaveBeenCalledWith({
      name: "Todd Example",
      email: "todd@example.com",
      company: "Example Co",
      role: "COO",
      source: "contact_form",
      landingPage: "/contact",
      payload: {
        name: "Todd Example",
        email: "todd@example.com",
        company: "Example Co",
        role: "COO",
        organizationType: "specialty-medical-group",
        workflowSegment: "Cardiology prior authorizations for two high-volume payers.",
        currentTrigger: "turnaround-backlog",
        triggerContext: "Turnaround time increased before a planned automation decision.",
        timing: "31-90",
        executiveSponsor: "VP Revenue Cycle",
        commercialReadiness: "prepared",
        privacyConsent: true,
        message: "We need a defensible next move.",
      },
      submittedAt: expect.any(Date),
    });
    expect(mockedNotifyLead).toHaveBeenCalledWith(lead);
  });

  it("still redirects successfully when notification fails safely", async () => {
    mockedPersistInboundLead.mockResolvedValue({
      id: "lead_123",
      name: "Todd",
      email: "todd@example.com",
      company: null,
      role: null,
      source: "contact_form",
      landingPage: "/contact",
      payload: {},
      notifiedAt: null,
      lastSubmittedAt: new Date("2026-07-02T12:00:00.000Z"),
      createdAt: new Date("2026-07-02T12:00:00.000Z"),
      updatedAt: new Date("2026-07-02T12:00:00.000Z"),
    });
    mockedNotifyLead.mockResolvedValue({ status: "failed", reason: "Resend unavailable" });

    await expect(submitDiagnosticIntake(validFormData())).rejects.toThrow(
      "REDIRECT:/contact?status=submitted",
    );
  });

  it("redirects to an explicit error state when persistence fails", async () => {
    mockedNotifyLead.mockClear();
    mockedPersistInboundLead.mockRejectedValue(new Error("database unavailable"));

    await expect(submitDiagnosticIntake(validFormData())).rejects.toThrow(
      "REDIRECT:/contact?status=error",
    );
    expect(mockedNotifyLead).not.toHaveBeenCalled();
  });
});

function validFormData() {
  const formData = new FormData();
  formData.set("name", "Todd Example");
  formData.set("email", "todd@example.com");
  formData.set("company", "Example Co");
  formData.set("role", "COO");
  formData.set("organizationType", "specialty-medical-group");
  formData.set("workflowSegment", "Cardiology prior authorizations for two high-volume payers.");
  formData.set("currentTrigger", "turnaround-backlog");
  formData.set("triggerContext", "Turnaround time increased before a planned automation decision.");
  formData.set("timing", "31-90");
  formData.set("executiveSponsor", "VP Revenue Cycle");
  formData.set("commercialReadiness", "prepared");
  formData.set("privacyConsent", "on");
  formData.set("message", "We need a defensible next move.");
  return formData;
}
