import { describe, expect, it } from "vitest";
import {
  canonicalizeSourceUrl,
  hashSourceContent,
  normalizeSourceContent,
} from "./normalize";

describe("source normalization", () => {
  it("normalizes line endings and insignificant whitespace before hashing", () => {
    const first = normalizeSourceContent("Role\r\n\r\n  Lead   delivery ");
    const second = normalizeSourceContent("Role\n\n Lead delivery");

    expect(first).toBe("Role\n\n Lead delivery");
    expect(hashSourceContent(first)).toBe(hashSourceContent(second));
  });

  it("canonicalizes URLs without making the URL alone an identity", () => {
    expect(
      canonicalizeSourceUrl(
        "HTTPS://Example.com:443/jobs/123/?utm_source=mail&b=2&a=1#description",
      ),
    ).toBe("https://example.com/jobs/123?a=1&b=2");
  });

  it("supports pasted text without a URL", () => {
    expect(canonicalizeSourceUrl("  ")).toBeNull();
    expect(canonicalizeSourceUrl()).toBeNull();
  });
});
