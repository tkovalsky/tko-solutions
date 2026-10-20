import { afterEach, describe, expect, it, vi } from "vitest";
import { markInboundLeadNotified, persistInboundLead } from "@/lib/leads/persist";
import { prisma } from "@/lib/db/prisma";

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    inboundLead: {
      upsert: vi.fn(),
      updateMany: vi.fn(),
    },
  },
}));

const mockedPrisma = vi.mocked(prisma);

afterEach(() => {
  vi.restoreAllMocks();
});

describe("persistInboundLead", () => {
  it("upserts by email and logs structured persistence metadata", async () => {
    const submittedAt = new Date("2026-07-02T12:00:00.000Z");
    const lead = {
      id: "lead_123",
      name: "Todd",
      email: "todd@example.com",
      company: null,
      role: null,
      source: "contact_form",
      landingPage: "/contact",
      payload: { email: "todd@example.com" },
      notifiedAt: null,
      lastSubmittedAt: submittedAt,
      createdAt: submittedAt,
      updatedAt: submittedAt,
    };
    const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
    mockedPrisma.inboundLead.upsert.mockResolvedValue(lead);

    await expect(
      persistInboundLead({
        name: "Todd",
        email: "todd@example.com",
        source: "contact_form",
        landingPage: "/contact",
        payload: { email: "todd@example.com" },
        submittedAt,
      }),
    ).resolves.toEqual(lead);

    expect(mockedPrisma.inboundLead.upsert).toHaveBeenCalledWith({
      where: { email: "todd@example.com" },
      create: expect.objectContaining({
        email: "todd@example.com",
        lastSubmittedAt: submittedAt,
      }),
      update: expect.objectContaining({
        lastSubmittedAt: submittedAt,
        notifiedAt: null,
      }),
    });
    expect(info).toHaveBeenCalledWith("inbound_lead.persisted", {
      leadId: "lead_123",
      email: "todd@example.com",
      source: "contact_form",
      timestamp: "2026-07-02T12:00:00.000Z",
    });
  });

  it("only marks the saved submission notified, leaving a newer submission pending", async () => {
    const submittedAt = new Date("2026-10-16T12:00:00Z");
    const notifiedAt = new Date("2026-10-16T12:01:00Z");
    mockedPrisma.inboundLead.updateMany.mockResolvedValue({ count: 0 });

    await expect(markInboundLeadNotified("lead_123", notifiedAt, submittedAt)).resolves.toEqual({ count: 0 });
    expect(mockedPrisma.inboundLead.updateMany).toHaveBeenCalledWith({
      where: { id: "lead_123", lastSubmittedAt: submittedAt },
      data: { notifiedAt },
    });
  });
});
