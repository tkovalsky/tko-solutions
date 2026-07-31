import { beforeEach, describe, expect, it, vi } from "vitest";
import { captureManualIntake } from "./actions";
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
  tifDb: {},
}));

const mockedIngest = vi.mocked(ingestPastedOpportunity);

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

function validForm() {
  const formData = new FormData();
  formData.set("rawContent", LONG_SOURCE);
  formData.set("canonicalUrl", "https://example.com/jobs/123");
  formData.set("organizationName", "Example Health");
  formData.set("title", "Director, Healthcare Transformation");
  return formData;
}
