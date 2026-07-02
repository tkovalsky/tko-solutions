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
      source: "contact_form",
      landingPage: "/contact",
      payload: {
        problem: "Prior authorization work is stuck across teams.",
        systems: "CRM, spreadsheets, dashboards",
        notWorking: "Exceptions stall because ownership is unclear.",
        aiDeployed: "unsure",
        decision: "Leadership needs to choose the next recovery move.",
        name: "Todd Example",
        email: "todd@example.com",
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
});

function validFormData() {
  const formData = new FormData();
  formData.set("problem", "Prior authorization work is stuck across teams.");
  formData.set("systems", "CRM, spreadsheets, dashboards");
  formData.set("notWorking", "Exceptions stall because ownership is unclear.");
  formData.set("aiDeployed", "unsure");
  formData.set("decision", "Leadership needs to choose the next recovery move.");
  formData.set("name", "Todd Example");
  formData.set("email", "todd@example.com");
  return formData;
}
