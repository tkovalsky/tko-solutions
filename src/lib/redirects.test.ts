import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("redirect map", () => {
  it("has no chains or loops", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const sources = new Set(redirects.map((redirect) => redirect.source));
    for (const redirect of redirects) {
      expect(sources.has(redirect.destination), `${redirect.source} → ${redirect.destination} chains`).toBe(false);
    }
  });

  it("never redirects away from a route that still exists", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    for (const { source } of redirects) {
      if (source.includes(":")) continue;
      const page = path.join(process.cwd(), "src/app", source, "page.tsx");
      expect(existsSync(page), `${source} is both a page and a redirect`).toBe(false);
    }
  });
});
