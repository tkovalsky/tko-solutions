import { NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { runCompose } = vi.hoisted(() => ({ runCompose: vi.fn() }));

vi.mock("@/lib/tif/execution", () => ({ runCompose }));

import { POST } from "./route";

const payload = {
  framework: "rachel_community",
  artifact: "community_page",
  inputs: { title: "Synthetic attribution check" },
};

function request(headers: Record<string, string> = {}, body: unknown = payload) {
  return new NextRequest("https://tif.example.test/api/tif/compose", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tif-access-key": "test-tif-key",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/tif/compose identity boundary", () => {
  it("runs a real social package through the authenticated composer without any external request", async () => {
    const actual = await vi.importActual<typeof import("@/lib/tif/execution")>("@/lib/tif/execution");
    runCompose.mockImplementation(actual.runCompose);
    const hash = (value: string) => createHash("sha256").update(value).digest("hex");
    const body = "Compare daily travel and home types before deciding which South Florida options you want to research further.";
    const voice = "Synthetic canonical voice: calm practical questions, no invented anecdotes or unsupported promises.";
    const input = { framework: "rachel_relocation", artifact: "social_package", voice: "rachel", inputs: { socialPackage: {
      channel: "linkedin_post", source: { parentContentId: 42, contentId: "newsroom:42", clusterId: "relocation", revision: "v1",
        title: "Compare Boca and Delray", canonicalUrl: "https://racheldelray.com/guides/boca-vs-delray", body, sha256: hash(body) },
      voice: { path: "docs/content-system/RACHEL_VOICE.md", content: voice, sha256: hash(voice) },
      destinationUrl: "https://racheldelray.com/guides/boca-vs-delray?utm_source=linkedin&utm_medium=social&utm_campaign=relocation" } } };
    const headers = { "x-ai-workload": "product.content_generation", "x-ai-environment": "test", "x-ai-execution-source": "http_request" };
    const external = vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("External requests forbidden"));
    try {
      const response = await POST(request(headers, input));
      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toMatchObject({ ok: true, artifact: "social_package",
        socialPackage: { channel: "linkedin_post", sourceRevision: "v1", voiceSha256: hash(voice) } });
      const invalid = structuredClone(input); invalid.inputs.socialPackage.source.body += " Changed.";
      expect((await POST(request(headers, invalid))).status).toBe(400);
      expect((await POST(request({ ...headers, "x-tif-access-key": "wrong" }, input))).status).toBe(401);
      expect(external).not.toHaveBeenCalled();
    } finally { external.mockRestore(); }
  });
  beforeEach(() => {
    process.env.TIF_ACCESS_KEY = "test-tif-key";
    runCompose.mockReset();
  });

  it("fails closed before composition when attribution is absent", async () => {
    const response = await POST(request());

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: "Invalid TIF execution identity: workload",
    });
    expect(runCompose).not.toHaveBeenCalled();
  });

  it("passes the validated immutable tuple into composition", async () => {
    const executionIdentity = {
      workload: "product.content_generation",
      environment: "development",
      executionSource: "http_request",
    } as const;
    runCompose.mockReturnValue({ ok: true, executionIdentity });

    const response = await POST(request({
      "x-ai-workload": executionIdentity.workload,
      "x-ai-environment": executionIdentity.environment,
      "x-ai-execution-source": executionIdentity.executionSource,
    }));

    expect(response.status).toBe(200);
    expect(runCompose).toHaveBeenCalledWith(payload, executionIdentity);
    expect(Object.isFrozen(runCompose.mock.calls[0]?.[1])).toBe(true);
    await expect(response.json()).resolves.toMatchObject({ ok: true, executionIdentity });
  });
});
