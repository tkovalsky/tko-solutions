import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { notifyLead } from "@/lib/leads/notify";
import { markInboundLeadNotified } from "@/lib/leads/persist";
import type { PersistedInboundLead } from "@/lib/leads/types";

vi.mock("@/lib/leads/persist", () => ({ markInboundLeadNotified: vi.fn() }));

const originalEnv = { ...process.env };
const mockedMarkInboundLeadNotified = vi.mocked(markInboundLeadNotified);
const lead: PersistedInboundLead = {
  id: "lead_123", name: "Todd", email: "todd@example.com", company: null, role: null,
  source: "contact_form", landingPage: "/contact", payload: { problem: "Workflow pressure", email: "todd@example.com" },
  notifiedAt: null,
  lastSubmittedAt: new Date("2026-07-02T12:00:00.000Z"),
  createdAt: new Date("2026-07-02T12:00:00.000Z"), updatedAt: new Date("2026-07-02T12:00:00.000Z"),
};
const accepted = () => ({ ok: true, json: vi.fn().mockResolvedValue({ id: "resend-123" }) });

beforeEach(() => {
  vi.resetAllMocks();
  process.env = { ...originalEnv, RESEND_API_KEY: "test-key", LEAD_NOTIFY_EMAIL: "operator@example.com" };
  delete process.env.RESEND_FROM_EMAIL;
  delete process.env.FROM_EMAIL;
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
  vi.spyOn(console, "info").mockImplementation(() => undefined);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => accepted()));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  process.env = { ...originalEnv };
});

function sentMessages() {
  return vi.mocked(fetch).mock.calls.map(([url, options]) => ({
    url, headers: options!.headers as Record<string, string>, signal: options!.signal,
    body: JSON.parse(options!.body as string),
  }));
}

describe("notifyLead", () => {
  it.each([undefined, " \n "])("skips both emails when the key is absent or blank", async (key) => {
    if (key === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = key;

    await expect(notifyLead(lead)).resolves.toEqual({ status: "skipped", reason: "missing_env" });
    expect(fetch).not.toHaveBeenCalled();
    expect(mockedMarkInboundLeadNotified).not.toHaveBeenCalled();
    for (const kind of ["notification", "confirmation"]) {
      expect(console.warn).toHaveBeenCalledWith(`inbound_lead.${kind}_skipped`, expect.objectContaining({ leadId: lead.id, reason: "missing_env" }));
    }
  });

  it("sends the operator brief and prospect receipt with separate reply routing", async () => {
    await expect(notifyLead(lead)).resolves.toEqual({ status: "sent", notifiedAt: expect.any(Date) });
    const messages = sentMessages();
    expect(messages).toHaveLength(2);
    const operator = messages.find(({ body }) => body.to === "operator@example.com")!;
    const receipt = messages.find(({ body }) => body.to === lead.email)!;
    expect(operator.body).toMatchObject({
      from: "Todd Kovalsky | TKO Solutions <todd@tko.solutions>", reply_to: lead.email,
      subject: "You've got leads! — Todd", html: expect.stringContaining("Review lead"),
      text: expect.stringContaining("Workflow pressure"),
    });
    expect(receipt.body).toMatchObject({
      from: "Todd Kovalsky | TKO Solutions <todd@tko.solutions>", reply_to: "todd@tko.solutions",
      subject: "Your request to TKO Solutions", text: expect.stringContaining("two business days"), html: expect.stringContaining("Your request is saved"),
    });
    for (const message of messages) {
      expect(message.url).toBe("https://api.resend.com/emails");
      expect(message.headers.Authorization).toBe("Bearer test-key");
      expect(message.signal).toBeDefined();
    }
    expect(mockedMarkInboundLeadNotified).toHaveBeenCalledWith(lead.id, expect.any(Date), lead.lastSubmittedAt);
    expect(console.info).toHaveBeenCalledWith("inbound_lead.notification_sent", expect.objectContaining({ messageKind: "operator", providerId: "resend-123", submissionTime: lead.lastSubmittedAt.toISOString() }));
    expect(console.info).toHaveBeenCalledWith("inbound_lead.confirmation_sent", expect.objectContaining({ messageKind: "receipt", providerId: "resend-123" }));
  });

  it("defaults the operator inbox to Todd and ignores CONTACT_EMAIL", async () => {
    delete process.env.LEAD_NOTIFY_EMAIL;
    process.env.CONTACT_EMAIL = "hello@tko.solutions";
    await notifyLead(lead);
    expect(sentMessages().map(({ body }) => body.to)).toEqual(["todd@tko.solutions", lead.email]);
  });

  it("trims the key, explicit sender, and operator recipient", async () => {
    process.env.RESEND_API_KEY = " test-key\n";
    process.env.RESEND_FROM_EMAIL = " Todd <todd@tko.solutions>\n";
    process.env.FROM_EMAIL = "Ignored <ignored@example.com>";
    process.env.LEAD_NOTIFY_EMAIL = " operator@example.com\n";
    await notifyLead(lead);
    expect(sentMessages()[0].body.to).toBe("operator@example.com");
    for (const { body, headers } of sentMessages()) {
      expect(body.from).toBe("Todd <todd@tko.solutions>");
      expect(headers.Authorization).toBe("Bearer test-key");
    }
  });

  it.each([
    [" Legacy Todd <todd@tko.solutions>\n", "Legacy Todd <todd@tko.solutions>"],
    [" \n", "Todd Kovalsky | TKO Solutions <todd@tko.solutions>"],
  ])("falls back cleanly when the explicit sender is blank", async (legacy, expected) => {
    process.env.RESEND_FROM_EMAIL = " \n";
    process.env.FROM_EMAIL = legacy;
    await notifyLead(lead);
    expect(sentMessages().every(({ body }) => body.from === expected)).toBe(true);
  });

  it.each(["operator", "receipt"])("keeps the other email independent when %s is rejected", async (failedKind) => {
    vi.mocked(fetch).mockImplementation(async (_url, options) => {
      const { to } = JSON.parse(options!.body as string);
      const fail = failedKind === "operator" ? to === "operator@example.com" : to === lead.email;
      return (fail ? { ok: false, status: 503, text: vi.fn().mockResolvedValue("private provider response") } : accepted()) as unknown as Response;
    });

    const result = await notifyLead(lead);
    expect(fetch).toHaveBeenCalledTimes(2);
    if (failedKind === "operator") {
      expect(result).toEqual({ status: "failed", reason: "Resend returned 503" });
      expect(mockedMarkInboundLeadNotified).not.toHaveBeenCalled();
      expect(console.info).toHaveBeenCalledWith("inbound_lead.confirmation_sent", expect.any(Object));
    } else {
      expect(result.status).toBe("sent");
      expect(mockedMarkInboundLeadNotified).toHaveBeenCalledTimes(1);
    }
    expect(console.error).toHaveBeenCalledWith(`inbound_lead.${failedKind === "operator" ? "notification" : "confirmation"}_failed`, expect.objectContaining({ reason: "Resend returned 503" }));
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain("private provider response");
  });

  it("does not wait for operator acceptance to start the receipt", async () => {
    let resolveOperator!: (value: Response) => void;
    vi.mocked(fetch).mockImplementation((_url, options) => {
      const { to } = JSON.parse(options!.body as string);
      if (to === "operator@example.com") return new Promise((resolve) => { resolveOperator = resolve; });
      return Promise.resolve(accepted() as unknown as Response);
    });
    const result = notifyLead(lead);
    expect(fetch).toHaveBeenCalledTimes(2);
    resolveOperator(accepted() as unknown as Response);
    await expect(result).resolves.toMatchObject({ status: "sent" });
  });

  it("contains network failures without leaking request details", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("private payload test-key"));
    await expect(notifyLead(lead)).resolves.toEqual({ status: "failed", reason: "Resend request failed" });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(mockedMarkInboundLeadNotified).not.toHaveBeenCalled();
    const logs = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logs).not.toContain("test-key");
    expect(logs).not.toContain("private payload");
  });

  it("contains timeout failures independently", async () => {
    vi.mocked(fetch).mockRejectedValue(new DOMException("timeout", "TimeoutError"));
    await expect(notifyLead(lead)).resolves.toEqual({ status: "failed", reason: "Resend request timed out" });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(mockedMarkInboundLeadNotified).not.toHaveBeenCalled();
  });

  it.each([null, {}, { id: 42 }])("does not mark an unconfirmed provider response notified", async (data) => {
    vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => data } as Response);
    await expect(notifyLead(lead)).resolves.toEqual({ status: "failed", reason: "Resend returned an invalid acceptance response" });
    expect(mockedMarkInboundLeadNotified).not.toHaveBeenCalled();
  });

  it("retains the receipt when saving the operator timestamp fails", async () => {
    mockedMarkInboundLeadNotified.mockRejectedValue(new Error("private database detail"));
    await expect(notifyLead(lead)).resolves.toEqual({ status: "failed", reason: "Failed to record operator notification" });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith("inbound_lead.notification_failed", expect.objectContaining({ providerAccepted: true }));
    expect(console.info).toHaveBeenCalledWith("inbound_lead.confirmation_sent", expect.any(Object));
  });

  it("uses separate stable keys and bodies for retries and new keys for another submission", async () => {
    await notifyLead(lead);
    const first = sentMessages();
    await notifyLead(lead);
    const retry = sentMessages().slice(2);
    expect(retry.map(({ headers, body }) => [headers["Idempotency-Key"], body])).toEqual(first.map(({ headers, body }) => [headers["Idempotency-Key"], body]));
    expect(first[0].headers["Idempotency-Key"]).not.toBe(first[1].headers["Idempotency-Key"]);
    await notifyLead({ ...lead, lastSubmittedAt: new Date("2026-07-03T12:00:00Z") });
    const next = sentMessages().slice(4);
    expect(next[0].headers["Idempotency-Key"]).not.toBe(first[0].headers["Idempotency-Key"]);
    expect(next[1].headers["Idempotency-Key"]).not.toBe(first[1].headers["Idempotency-Key"]);
  });
});
