import { beforeEach, describe, expect, it, vi } from "vitest";
import { addPersonFact } from "@/app/tif/oi/opportunities/[id]/actions";
import { tifDb } from "@/lib/tif/db";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    oiOpportunityFact: {
      create: vi.fn(),
    },
  },
}));

const mockedDb = vi.mocked(tifDb);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("addPersonFact", () => {
  it("writes a person-scoped fact with provenance fields and no opportunity or initiative parent", async () => {
    const formData = new FormData();
    formData.set("personId", "person-1");
    formData.set("field", "career");
    formData.set("value", "VP Operations at Regional Payer Health");
    formData.set("basis", "operator");
    formData.set("confidence", "90");

    await addPersonFact(formData);

    const data = mockedDb.oiOpportunityFact.create.mock.calls[0][0].data;
    expect(data).toEqual(
      expect.objectContaining({
        personId: "person-1",
        field: "career",
        basis: "operator",
        confidence: 90,
      }),
    );
    expect(data).not.toHaveProperty("opportunityId");
    expect(data).not.toHaveProperty("initiativeId");
  });
});
