import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import { GET as getLlmsText } from "./llms.txt/route";
import { getInsights } from "@/lib/insights";
import { buildLlmsText } from "@/lib/llms";
import { offers } from "@/lib/offers";

// Discovery surface: robots, sitemap, llms.txt, security.txt. These are generated from the
// offer registry and published guides, so the checks assert they cannot drift from the pages.

describe("robots", () => {
  const rules = [robots().rules].flat();

  it("keeps the operator console and form endpoints out of every crawler's index", () => {
    for (const rule of rules) {
      const disallow = [rule.disallow].flat();
      expect(disallow).toContain("/tif");
      expect(disallow).toContain("/api");
    }
  });

  it("allows public pages for search and answer engines and points at the sitemap", () => {
    expect(rules.some((rule) => rule.userAgent === "*" && [rule.allow].flat().includes("/"))).toBe(true);
    const answerEngines = rules.find((rule) => Array.isArray(rule.userAgent));
    expect(answerEngines?.userAgent).toEqual(expect.arrayContaining(["GPTBot", "ClaudeBot", "PerplexityBot"]));
    expect([answerEngines?.allow].flat()).toContain("/llms.txt");
    expect(robots().sitemap).toBe("https://tko.solutions/sitemap.xml");
  });
});

describe("sitemap", () => {
  const urls = sitemap().map((entry) => new URL(entry.url).pathname);

  it("lists the policy pages and every offer", () => {
    expect(urls).toContain("/privacy");
    expect(urls).toContain("/terms");
    for (const offer of offers) expect(urls).toContain(`/services/${offer.slug}`);
  });

  it("never exposes the operator console or API", () => {
    expect(urls.some((url) => url.startsWith("/tif") || url.startsWith("/api"))).toBe(false);
  });

  it("matches a page on disk for every static route", () => {
    for (const url of urls) {
      if (url.startsWith("/insights/") || url.startsWith("/selected-work/") || url.startsWith("/services/")) continue;
      const page = path.join(process.cwd(), "src/app", url, "page.tsx");
      expect(existsSync(page), `${url} is in the sitemap but has no page`).toBe(true);
    }
  });
});

describe("llms.txt", () => {
  const text = buildLlmsText();

  it("follows the llmstxt.org shape: one H1, a blockquote summary, then H2 sections", () => {
    const lines = text.split("\n");
    expect(lines[0]).toBe("# TKO Solutions");
    expect(lines.filter((line) => line.startsWith("# ")).length).toBe(1);
    expect(lines[2]?.startsWith("> ")).toBe(true);
    expect(lines.filter((line) => line.startsWith("## "))).toEqual([
      "## Engagements",
      "## Proof and demonstrations",
      "## Guides",
      "## About and contact",
      "## Policies",
      "## Optional",
    ]);
  });

  it("states every offer with its registry commercial terms", () => {
    for (const offer of offers) {
      expect(text).toContain(`[${offer.name}](https://tko.solutions/services/${offer.slug})`);
      expect(text).toContain(offer.commercial);
    }
    expect(text).toContain("$5,000 30-day pilot");
  });

  it("links every published guide and the policy pages, and nothing private", () => {
    for (const insight of getInsights()) expect(text).toContain(`https://tko.solutions/insights/${insight.slug}`);
    expect(text).toContain("https://tko.solutions/privacy");
    expect(text).toContain("https://tko.solutions/terms");
    expect(text).not.toMatch(/tko\.solutions\/(tif|api)/);
  });

  it("carries the claim guardrails", () => {
    expect(text).toContain("does not establish healthcare deployment, enterprise scale, or measured conversion or revenue results");
    expect(text).toContain("does not guarantee lead volume, conversion, revenue");
    expect(text).toContain("reviews the exact message before anything is sent");
  });

  it("serves as cacheable UTF-8 plain text", async () => {
    const response = getLlmsText();
    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(response.headers.get("cache-control")).toContain("public");
    expect(await response.text()).toBe(text);
  });
});

describe("security.txt", () => {
  const file = readFileSync(path.join(process.cwd(), "public/.well-known/security.txt"), "utf8");

  it("names the contact and has not expired", () => {
    expect(file).toContain("Contact: mailto:todd@tko.solutions");
    const expires = file.match(/^Expires: (.+)$/m)?.[1];
    expect(expires).toBeDefined();
    expect(new Date(expires!).getTime()).toBeGreaterThan(Date.now());
    expect(file).toContain("Canonical: https://tko.solutions/.well-known/security.txt");
  });
});
