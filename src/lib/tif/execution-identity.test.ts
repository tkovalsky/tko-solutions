import { describe, expect, it } from "vitest";
import { parseTifExecutionIdentity } from "./execution-identity";

function identityHeaders(values: Record<string, string> = {}) {
  return new Headers({
    "x-ai-workload": "product.content_generation",
    "x-ai-environment": "development",
    "x-ai-execution-source": "http_request",
    ...values,
  });
}

describe("TIF execution identity", () => {
  it("accepts and freezes the bounded Rachel content-generation identity", () => {
    const identity = parseTifExecutionIdentity(identityHeaders());

    expect(identity).toEqual({
      workload: "product.content_generation",
      environment: "development",
      executionSource: "http_request",
    });
    expect(Object.isFrozen(identity)).toBe(true);
  });

  it.each([
    ["x-ai-workload", "product.lead_enrichment", "workload"],
    ["x-ai-environment", "staging", "environment"],
    ["x-ai-execution-source", "webhook", "execution source"],
  ])("rejects an unsupported %s", (header, value, expected) => {
    expect(() => parseTifExecutionIdentity(identityHeaders({ [header]: value }))).toThrow(expected);
  });

  it("rejects a missing identity header", () => {
    const headers = identityHeaders();
    headers.delete("x-ai-workload");

    expect(() => parseTifExecutionIdentity(headers)).toThrow("workload");
  });
});
