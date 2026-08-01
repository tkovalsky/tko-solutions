import { beforeEach, describe, expect, it, vi } from "vitest";
import { captureManualIntake, dismissSignal, promoteSignal } from "./actions";
import { ingestPastedOpportunity } from "@/lib/opportunity-intelligence/intake/ingest";
import { tifDb } from "@/lib/tif/db";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

vi.mock("@/lib/opportunity-intelligence/intake/ingest", () => ({
  ingestPastedOpportunity: vi.fn(),
}));

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    $transaction: vi.fn(),
  },
}));

const mockedIngest = vi.mocked(ingestPastedOpportunity);
const mockedDb = vi.mocked(tifDb);

const LONG_SOURCE = `${"Director, Healthcare Transformation. ".repeat(8)}
Reports to the COO and owns immediate modernization using FHIR. Compensation is $240,000 per year.`;

beforeEach(() => {
  vi.clearAllMocks();
  mockedIngest.mockResolvedValue({
    created: true,
    duplicate: false,
    sourceId: "source-1",
    opportunityId: "opportunity-1",
    scoreId: "score-1",
    facts: [],
    gaps: [],
  });
});

describe("captureManualIntake", () => {
  it("rejects invalid source content with a visible redirect error", async () => {
    const formData = validForm();
    formData.set("rawContent", "Too short.");

    await expect(captureManualIntake(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?error=Too%20short%20to%20extract%20from",
    );
    expect(mockedIngest).not.toHaveBeenCalled();
  });

  it("calls ingestion and redirects to the created review state", async () => {
    await expect(captureManualIntake(validForm())).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=created&sourceId=source-1&opportunityId=opportunity-1",
    );

    expect(mockedIngest).toHaveBeenCalledWith(
      {
        organization: { name: "Example Health" },
        title: "Director, Healthcare Transformation",
        rawContent: LONG_SOURCE,
        canonicalUrl: "https://example.com/jobs/123",
      },
      tifDb,
    );
  });

  it("shows the duplicate review state without silently creating a new source", async () => {
    mockedIngest.mockResolvedValue({
      created: false,
      duplicate: true,
      sourceId: "source-existing",
      opportunityId: "opportunity-existing",
      scoreId: "score-existing",
      facts: [],
      gaps: [],
    });

    await expect(captureManualIntake(validForm())).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=duplicate&sourceId=source-existing&opportunityId=opportunity-existing",
    );
  });
});

describe("dismissSignal", () => {
  it("rejects an empty dismiss reason", async () => {
    const formData = new FormData();
    formData.set("sourceId", "source-1");
    formData.set("opportunityId", "opportunity-1");
    formData.set("reason", " ");

    await expect(dismissSignal(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?error=Dismiss%20reason%20is%20required.",
    );
  });
});

describe("promoteSignal", () => {
  it("rejects malformed input when no opportunity type is selected", async () => {
    const formData = new FormData();
    formData.set("sourceId", "source-1");
    formData.set("opportunityId", "opportunity-1");

    await expect(promoteSignal(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?error=Select%20at%20least%20one%20opportunity%20type%20to%20promote.",
    );
    expect(mockedDb.$transaction).not.toHaveBeenCalled();
  });

  it("creates exactly one open next action for a promoted opportunity", async () => {
    const tx = {
      oiSource: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "source-1",
          publishedAt: new Date("2026-08-01T12:00:00Z"),
          retrievedAt: new Date("2026-08-01T12:00:00Z"),
          organizationId: "org-1",
          organization: { id: "org-1", name: "Example Health", tier: 1, signals: [], initiatives: [] },
          signals: [{ id: "signal-1", occurredAt: new Date("2026-08-01T12:00:00Z"), createdAt: new Date("2026-08-01T12:00:00Z") }],
          opportunity: { facts: [], researchGaps: [] },
        }),
      },
      oiOpportunity: {
        create: vi.fn().mockResolvedValue({
          id: "promoted-1",
          type: "assessment",
          status: "identified",
          estimatedValueLow: null,
          estimatedValueHigh: null,
          conversionProbability: null,
          estimatedHours: null,
          disqualifiedReason: null,
          offerId: null,
          lastActivityAt: null,
          createdAt: new Date("2026-08-01T12:00:00Z"),
        }),
        update: vi.fn().mockResolvedValue({ id: "promoted-1" }),
      },
      oiOpportunitySource: {
        create: vi.fn().mockResolvedValue({}),
      },
      oiScore: {
        create: vi.fn().mockResolvedValue({ id: "score-1" }),
      },
      oiNextAction: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: "action-1" }),
      },
      oiSignal: {
        update: vi.fn().mockResolvedValue({}),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("sourceId", "source-1");
    formData.set("opportunityId", "opportunity-1");
    formData.append("opportunityType", "assessment");

    await expect(promoteSignal(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=reviewed&sourceId=source-1&opportunityId=promoted-1",
    );
    expect(tx.oiNextAction.findFirst).toHaveBeenCalledWith({
      where: { opportunityId: "promoted-1", status: "open" },
      select: { id: true },
    });
    expect(tx.oiNextAction.create).toHaveBeenCalledTimes(1);
    expect(tx.oiNextAction.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          opportunityId: "promoted-1",
          type: "approve_initiative",
          estimatedMinutes: 5,
        }),
      }),
    );
  });
});

function validForm() {
  const formData = new FormData();
  formData.set("rawContent", LONG_SOURCE);
  formData.set("canonicalUrl", "https://example.com/jobs/123");
  formData.set("organizationName", "Example Health");
  formData.set("title", "Director, Healthcare Transformation");
  return formData;
}
