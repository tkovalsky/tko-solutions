import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { notifyLead } from "@/lib/leads/notify";
import { markInboundLeadNotified } from "@/lib/leads/persist";
import type { PersistedInboundLead } from "@/lib/leads/types";

vi.mock("@/lib/leads/persist", () => ({
  markInboundLeadNotified: vi.fn(),
}));

const originalEnv = { ...process.env };
const mockedMarkInboundLeadNotified = vi.mocked(markInboundLeadNotified);

const lead: PersistedInboundLead = {
  id: "lead_123",
  name: "Todd",
  email: "todd@example.com",
  company: null,
  role: null,
  source: "contact_form",
  landingPage: "/contact",
  payload: {
    problem: "Workflow pressure",
    email: "todd@example.com",
  },
  notifiedAt: null,
  lastSubmittedAt: new Date("2026-07-02T12:00:00.000Z"),
  createdAt: new Date("2026-07-02T12:00:00.000Z"),
  updatedAt: new Date("2026-07-02T12:00:00.000Z"),
};

beforeEach(() => {
  vi.clearAllMocks();
  process.env = { ...originalEnv };
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  process.env = { ...originalEnv };
});

describe("notifyLead", () => {
  it("skips email when notification env vars are missing", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.LEAD_NOTIFY_EMAIL;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(notifyLead(lead)).resolves.toEqual({
      status: "skipped",
      reason: "missing_env",
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(mockedMarkInboundLeadNotified).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith("inbound_lead.notification_skipped", {
      leadId: "lead_123",
      email: "todd@example.com",
      source: "contact_form",
      reason: "missing_env",
      timestamp: expect.any(String),
    });
  });

  it("sends notification and marks the lead notified", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.LEAD_NOTIFY_EMAIL = "operator@example.com";
    const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
      }),
    );

    await expect(notifyLead(lead)).resolves.toEqual({
      status: "sent",
      notifiedAt: expect.any(Date),
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("lead_123"),
      }),
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        body: expect.stringContaining("Submitted Payload"),
      }),
    );
    expect(mockedMarkInboundLeadNotified).toHaveBeenCalledWith("lead_123", expect.any(Date));
    expect(info).toHaveBeenCalledWith("inbound_lead.notification_sent", {
      leadId: "lead_123",
      email: "todd@example.com",
      source: "contact_form",
      timestamp: expect.any(String),
    });
  });

  it("does not throw when Resend rejects the notification", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.LEAD_NOTIFY_EMAIL = "operator@example.com";
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        text: vi.fn().mockResolvedValue("unavailable"),
      }),
    );

    await expect(notifyLead(lead)).resolves.toEqual({
      status: "failed",
      reason: "Resend returned 503: unavailable",
    });
    expect(mockedMarkInboundLeadNotified).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith("inbound_lead.notification_failed", {
      leadId: "lead_123",
      email: "todd@example.com",
      source: "contact_form",
      reason: "Resend returned 503: unavailable",
      timestamp: expect.any(String),
    });
  });
});
