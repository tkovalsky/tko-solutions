import { describe, expect, it, vi, beforeEach } from "vitest";
import { OPTIONS, POST } from "./route";

const { persistInboundLead, notifyLead } = vi.hoisted(() => ({
  persistInboundLead: vi.fn(),
  notifyLead: vi.fn(),
}));

vi.mock("@/lib/leads/persist", () => ({ persistInboundLead }));
vi.mock("@/lib/leads/notify", () => ({ notifyLead }));

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when email is missing or invalid", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Todd" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("A valid email address is required.");
  });

  it("persists the lead and triggers notification", async () => {
    persistInboundLead.mockResolvedValue({ id: "lead_abc" });
    notifyLead.mockResolvedValue({ status: "sent", notifiedAt: new Date() });

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Todd Kovalsky",
        email: "todd@firm.com",
        firm: "Boutique Advisory",
        market: "Palm Beach",
        transactionSize: "$10M+",
        inquiryType: "PCOS_QUEUE_WALKTHROUGH",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.notificationSent).toBe(true);
    expect(body.leadId).toBe("lead_abc");

    expect(persistInboundLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Todd Kovalsky",
        email: "todd@firm.com",
        company: "Boutique Advisory",
        source: "PCOS_QUEUE_WALKTHROUGH",
        landingPage: "/private-client-os",
      }),
    );
    expect(notifyLead).toHaveBeenCalledWith({ id: "lead_abc" });
  });
  it.each(["a@", "@example.com", "a@@example.com", "a@example", "a@example.com\r\nBcc:other@example.com", null, 123])("rejects malformed addresses before storage or email: %s", async (email) => {
    const response = await POST(new Request("http://localhost:3000/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
    }));
    expect(response.status).toBe(400);
    expect(persistInboundLead).not.toHaveBeenCalled();
    expect(notifyLead).not.toHaveBeenCalled();
  });

  it("normalizes a valid email before saving and sending", async () => {
    persistInboundLead.mockResolvedValue({ id: "normalized" });
    notifyLead.mockResolvedValue({ status: "sent", notifiedAt: new Date() });
    const response = await POST(new Request("http://localhost:3000/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "  Alex@Example.COM  " }),
    }));
    expect(response.status).toBe(200);
    expect(persistInboundLead).toHaveBeenCalledWith(expect.objectContaining({ email: "alex@example.com" }));
    expect(notifyLead).toHaveBeenCalledWith({ id: "normalized" });
  });
  it("stores a complete BoundOS application with a fixed source and landing page", async () => {
    persistInboundLead.mockResolvedValue({ id: "lead_boundos" });
    notifyLead.mockResolvedValue({ status: "sent", notifiedAt: new Date() });
    const response = await POST(boundosRequest({ landingPage: "https://evil.example", source: "spoofed" }));
    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://www.boundos.com");
    expect(persistInboundLead).toHaveBeenCalledWith(expect.objectContaining({
      name: "Jordan Agent", email: "jordan@team.com", company: "Jordan Team", source: "BOUNDOS_APPLY",
      landingPage: "https://www.boundos.com/apply",
      payload: expect.objectContaining({ inquiryType: "BOUNDOS_APPLY", offer: "sidecar", crm: "Follow Up Boss", crmApiKey: "yes", contactCount: "500-3000", optOuts: "FUB tags", caller: "Me", holdout: "yes" }),
    }));
    expect(persistInboundLead.mock.calls[0][0].payload).not.toHaveProperty("landingPage");
    expect(notifyLead).toHaveBeenCalledWith({ id: "lead_boundos" });
  });

  it.each([
    ["missing the caller", { caller: undefined }],
    ["missing opt-outs", { optOuts: "" }],
    ["an unknown contact count", { contactCount: "lots" }],
    ["an RIA without compliance answers", { vertical: "ria", riaCompliance: undefined }],
  ])("rejects a BoundOS application %s before storage or email", async (_label, overrides) => {
    const response = await POST(boundosRequest(overrides));
    expect(response.status).toBe(400);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://www.boundos.com");
    expect(persistInboundLead).not.toHaveBeenCalled();
    expect(notifyLead).not.toHaveBeenCalled();
  });

  it("accepts a filled honeypot silently without storage or email", async () => {
    const response = await POST(boundosRequest({ website: "https://spam.example" }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(persistInboundLead).not.toHaveBeenCalled();
    expect(notifyLead).not.toHaveBeenCalled();
  });

  it("allows cross-origin preflight only from the BoundOS production origins", async () => {
    for (const origin of ["https://www.boundos.com", "https://boundos.com"]) {
      const response = OPTIONS(new Request("https://tko.solutions/api/contact", { method: "OPTIONS", headers: { Origin: origin } }));
      expect(response.status).toBe(204);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe(origin);
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST");
    }
    for (const origin of ["https://evil.example", "http://localhost:3000", "https://boundos.com.evil.example"]) {
      const response = OPTIONS(new Request("https://tko.solutions/api/contact", { method: "OPTIONS", headers: { Origin: origin } }));
      expect(response.status).toBe(403);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
    }
    persistInboundLead.mockResolvedValue({ id: "same-origin" });
    notifyLead.mockResolvedValue({ status: "sent" });
    const sameOrigin = await POST(new Request("https://tko.solutions/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "a@example.com" }) }));
    expect(sameOrigin.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it.each(["failed", "skipped"])("reports saved inquiry without claiming an email when notification is %s", async (status) => {
    persistInboundLead.mockResolvedValue({ id: "lead_saved" });
    notifyLead.mockResolvedValue({ status });
    const response = await POST(new Request("http://localhost:3100/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "website-check@example.com" }),
    }));
    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ ok: true, leadId: "lead_saved", notificationSent: false });
  });

});

function boundosRequest(overrides: Record<string, unknown> = {}) {
  return new Request("https://tko.solutions/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://www.boundos.com" },
    body: JSON.stringify({
      inquiryType: "BOUNDOS_APPLY", name: "Jordan Agent", email: "Jordan@Team.com", firm: "Jordan Team", role: "Team lead",
      vertical: "real-estate", crm: "Follow Up Boss", crmApiKey: "yes", contactCount: "500-3000",
      datedRelationships: "About 400 closings", optOuts: "FUB tags", caller: "Me", holdout: "yes",
      ...overrides,
    }),
  });
}
