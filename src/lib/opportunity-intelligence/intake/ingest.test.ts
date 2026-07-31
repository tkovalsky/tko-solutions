import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { extractOpportunity } from "./extract";
import { ingestPastedOpportunity } from "./ingest";

const RAW_SOURCE = `Director, Healthcare Transformation
Reports to the COO and will lead a rapid modernization program.
Own delivery using FHIR. Compensation is $240,000 per year.`;

function createDatabaseDouble() {
  const extractedFacts = extractOpportunity(RAW_SOURCE).facts.map((fact) => ({
    field: fact.field,
    value: fact.value,
    normalizedValue: fact.normalizedValue,
    basis: fact.basis,
    confidence: fact.confidence,
    isOperatorOverride: false,
  }));

  const tx = {
    oiOrganization: {
      upsert: vi.fn().mockResolvedValue({ id: "org-1" }),
    },
    oiSource: {
      findFirst: vi
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null),
      create: vi.fn().mockResolvedValue({ id: "source-1", rawContent: RAW_SOURCE }),
    },
    oiOpportunity: {
      create: vi.fn().mockResolvedValue({ id: "opportunity-1", operatorThesis: null }),
      findUniqueOrThrow: vi.fn(),
      update: vi.fn().mockResolvedValue({ id: "opportunity-1" }),
    },
    oiOpportunityFact: {
      deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
      create: vi.fn().mockResolvedValue({ id: "fact-1" }),
      findMany: vi.fn().mockResolvedValue(extractedFacts),
    },
    oiEvidence: {
      deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
      upsert: vi
        .fn()
        .mockImplementation(async ({ create }: { create: { startOffset: number } }) => ({
          id: `evidence-${create.startOffset}`,
        })),
    },
    oiResearchGap: {
      findMany: vi.fn().mockResolvedValue([]),
      createMany: vi.fn().mockResolvedValue({ count: 1 }),
      updateMany: vi.fn().mockResolvedValue({ count: 0 }),
    },
    oiOpportunityScore: {
      create: vi.fn().mockResolvedValue({ id: "score-1" }),
    },
  };
  const db = {
    $transaction: vi.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
  } as unknown as PrismaClient;

  return { db, tx };
}

describe("ingestPastedOpportunity", () => {
  it("creates a person-free opportunity, immutable score, then updates the current pointer", async () => {
    const { db, tx } = createDatabaseDouble();

    const result = await ingestPastedOpportunity(
      {
        organization: { name: "Example Health", kind: "payer" },
        title: "Director, Healthcare Transformation",
        rawContent: RAW_SOURCE,
        sourceType: "job_posting",
        canonicalUrl: "https://example.com/jobs/123?utm_source=email",
      },
      db,
    );

    expect(result).toEqual({
      created: true,
      duplicate: false,
      sourceId: "source-1",
      opportunityId: "opportunity-1",
      scoreId: "score-1",
    });
    expect(tx.oiOpportunity.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.not.objectContaining({ personId: expect.anything() }),
      }),
    );
    expect(tx.oiOpportunityFact.deleteMany).toHaveBeenCalledWith({
      where: {
        opportunityId: "opportunity-1",
        isOperatorOverride: false,
      },
    });
    expect(tx.oiOpportunityScore.create).toHaveBeenCalledTimes(1);
    expect(tx.oiOpportunity.update).toHaveBeenCalledWith({
      where: { id: "opportunity-1" },
      data: { currentScoreId: "score-1" },
    });
    expect(
      tx.oiOpportunityScore.create.mock.invocationCallOrder[0],
    ).toBeLessThan(tx.oiOpportunity.update.mock.invocationCallOrder[0]);
  });

  it("returns the existing source without rescoring a duplicate", async () => {
    const { db, tx } = createDatabaseDouble();
    tx.oiSource.findFirst.mockReset().mockResolvedValue({
      id: "source-existing",
      opportunityId: "opportunity-existing",
      opportunity: { currentScoreId: "score-existing" },
    });

    const result = await ingestPastedOpportunity(
      {
        organization: { name: "Example Health" },
        title: "Director",
        rawContent: RAW_SOURCE,
      },
      db,
    );

    expect(result.duplicate).toBe(true);
    expect(tx.oiOpportunity.create).not.toHaveBeenCalled();
    expect(tx.oiOpportunityScore.create).not.toHaveBeenCalled();
  });

  it("links a changed snapshot at the same canonical URL to the existing opportunity", async () => {
    const { db, tx } = createDatabaseDouble();
    tx.oiSource.findFirst
      .mockReset()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ opportunityId: "opportunity-existing" });
    tx.oiOpportunity.findUniqueOrThrow.mockResolvedValue({
      id: "opportunity-existing",
      operatorThesis: null,
    });

    const result = await ingestPastedOpportunity(
      {
        organization: { name: "Example Health" },
        title: "Updated Director Role",
        rawContent: RAW_SOURCE,
        canonicalUrl: "https://example.com/jobs/123",
      },
      db,
    );

    expect(result.opportunityId).toBe("opportunity-existing");
    expect(tx.oiOpportunity.create).not.toHaveBeenCalled();
    expect(tx.oiSource.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          opportunityId: "opportunity-existing",
          canonicalUrl: "https://example.com/jobs/123",
        }),
      }),
    );
  });
});
