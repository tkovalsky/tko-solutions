import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createOpportunitySource,
  saveOpportunityThesis,
} from "./actions";
import {
  ingestPastedOpportunity,
  rerunOpportunityExtraction,
} from "@/lib/opportunity-intelligence/ingest";
import { tifDb } from "@/lib/tif/db";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

vi.mock("@/lib/opportunity-intelligence/ingest", () => ({
  ingestPastedOpportunity: vi.fn(),
  rerunOpportunityExtraction: vi.fn(),
}));

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    oiOpportunity: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const mockedIngest = vi.mocked(ingestPastedOpportunity);
const mockedRerun = vi.mocked(rerunOpportunityExtraction);
const mockedFindOpportunity = vi.mocked(tifDb.oiOpportunity.findUnique);
const mockedUpdateOpportunity = vi.mocked(tifDb.oiOpportunity.update);

beforeEach(() => {
  vi.clearAllMocks();
  mockedIngest.mockResolvedValue({
    created: true,
    duplicate: false,
    sourceId: "source-1",
    opportunityId: "opportunity-1",
    scoreId: "score-1",
  });
  mockedFindOpportunity.mockResolvedValue(null);
  mockedUpdateOpportunity.mockResolvedValue({} as never);
  mockedRerun.mockResolvedValue({
    opportunityId: "opportunity-1",
    sourceId: "source-1",
    scoreId: "score-2",
  });
});

describe("createOpportunitySource", () => {
  it("creates a person-free job-posting source and opens its review", async () => {
    await expect(createOpportunitySource(validSourceForm())).rejects.toThrow(
      "REDIRECT:/tif/opportunities/sources?opportunityId=opportunity-1&capture=created",
    );

    expect(mockedIngest).toHaveBeenCalledWith(
      {
        organization: {
          name: "Rula",
          website: "https://www.rula.com/",
          kind: "health_tech",
        },
        title: "Sr. Product Manager - Provider Experience",
        rawContent: expect.stringContaining("Provider Experience"),
        sourceType: "job_posting",
        canonicalUrl:
          "https://jobs.ashbyhq.com/rula/22a909c8-432d-4c40-b8fd-39defae52936",
        publishedAt: null,
      },
      tifDb,
    );
    expect(mockedFindOpportunity).not.toHaveBeenCalled();
    expect(mockedRerun).not.toHaveBeenCalled();
  });

  it("opens the existing opportunity when ingestion identifies a duplicate", async () => {
    mockedIngest.mockResolvedValue({
      created: false,
      duplicate: true,
      sourceId: "source-existing",
      opportunityId: "opportunity-existing",
      scoreId: "score-existing",
    });

    await expect(createOpportunitySource(validSourceForm())).rejects.toThrow(
      "REDIRECT:/tif/opportunities/sources?opportunityId=opportunity-existing&capture=duplicate",
    );
  });

  it("stores an operator thesis separately and rebuilds the score", async () => {
    const formData = validSourceForm();
    formData.set(
      "operatorThesis",
      "Provider workflow automation is funded and aligned; validate direct SMB SaaS ownership.",
    );

    await expect(createOpportunitySource(formData)).rejects.toThrow("REDIRECT:");

    expect(mockedUpdateOpportunity).toHaveBeenCalledWith({
      where: { id: "opportunity-1" },
      data: {
        operatorThesis:
          "Provider workflow automation is funded and aligned; validate direct SMB SaaS ownership.",
        thesisBasis: "operator",
      },
    });
    expect(mockedRerun).toHaveBeenCalledWith("opportunity-1", tifDb);
  });

  it("rejects non-http source URLs before persistence", async () => {
    const formData = validSourceForm();
    formData.set("canonicalUrl", "ftp://example.com/private");

    await expect(createOpportunitySource(formData)).rejects.toThrow(
      "Invalid canonicalUrl",
    );
    expect(mockedIngest).not.toHaveBeenCalled();
  });
});

describe("saveOpportunityThesis", () => {
  it("updates operator judgment without replacing source evidence", async () => {
    const formData = new FormData();
    formData.set("opportunityId", "opportunity-1");
    formData.set("operatorThesis", "This is a funded operating-model role.");

    await expect(saveOpportunityThesis(formData)).rejects.toThrow(
      "REDIRECT:/tif/opportunities/sources?opportunityId=opportunity-1&capture=reviewed",
    );

    expect(mockedUpdateOpportunity).toHaveBeenCalledWith({
      where: { id: "opportunity-1" },
      data: {
        operatorThesis: "This is a funded operating-model role.",
        thesisBasis: "operator",
      },
    });
    expect(mockedRerun).toHaveBeenCalledWith("opportunity-1", tifDb);
  });
});

function validSourceForm() {
  const formData = new FormData();
  formData.set("organizationName", "Rula");
  formData.set("organizationWebsite", "https://www.rula.com");
  formData.set("organizationKind", "health_tech");
  formData.set("sourceType", "job_posting");
  formData.set("title", "Sr. Product Manager - Provider Experience");
  formData.set(
    "canonicalUrl",
    "https://jobs.ashbyhq.com/rula/22a909c8-432d-4c40-b8fd-39defae52936",
  );
  formData.set(
    "rawContent",
    "Sr. Product Manager - Provider Experience\nBuild provider workflow tools using AI.",
  );
  return formData;
}
