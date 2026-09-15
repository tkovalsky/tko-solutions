import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { runCompose } = vi.hoisted(() => ({ runCompose: vi.fn() }));

vi.mock("@/lib/tif/execution", () => ({ runCompose }));

import { POST } from "./route";

const payload = {
  framework: "rachel_community",
  artifact: "community_page",
  inputs: { title: "Synthetic attribution check" },
};

function request(headers: Record<string, string> = {}) {
  return new NextRequest("https://tif.example.test/api/tif/compose", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tif-access-key": "test-tif-key",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

describe("POST /api/tif/compose identity boundary", () => {
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
