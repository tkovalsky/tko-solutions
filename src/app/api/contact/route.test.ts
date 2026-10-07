import { describe, expect, it, vi, beforeEach } from "vitest";
import { POST } from "./route";

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
});
