import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import OperationalIntelligencePage, { metadata as oiMetadata } from "@/app/operational-intelligence/page";
import sitemap from "@/app/sitemap";
import SolutionRoute, { generateMetadata, generateStaticParams } from "@/app/solutions/[slug]/page";
import { getInsight } from "@/lib/insights";
import { CONSTRAINT_CALL, healthcareExecutionAssurance, offers, sidecar } from "@/lib/offers";
import { absoluteUrl } from "@/lib/site";
import { solutions } from "@/lib/solutions";

afterEach(cleanup);

const PRICE = /\$\d{1,3}(?:,\d{3})*(?:\.\d+)?(?![\d.,]*[KMB])/g;
const registryPrices = new Set(JSON.stringify([offers, sidecar, healthcareExecutionAssurance, CONSTRAINT_CALL]).match(PRICE) ?? []);

async function renderSolution(slug: string) {
  if (slug === "operational-intelligence") return render(<OperationalIntelligencePage />);
  return render(await SolutionRoute({ params: Promise.resolve({ slug }) }));
}

async function metadataFor(slug: string) {
  return slug === "operational-intelligence" ? oiMetadata : generateMetadata({ params: Promise.resolve({ slug }) });
}

describe("solution pages", () => {
  it("serves the two nested routes statically and nothing else under /solutions", () => {
    expect(generateStaticParams()).toEqual([{ slug: "delivery-intelligence" }, { slug: "revenue-operations" }]);
    expect(solutions.map((solution) => solution.path)).toEqual(["/operational-intelligence", "/solutions/delivery-intelligence", "/solutions/revenue-operations"]);
  });

  it.each(solutions.map((solution) => solution.slug))("%s has one H1, its own canonical, and is in the sitemap", async (slug) => {
    const solution = solutions.find((item) => item.slug === slug)!;
    await renderSolution(slug);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const meta = await metadataFor(slug);
    expect(meta.alternates?.canonical).toBe(solution.path);
    expect(meta.openGraph?.url).toBe(absoluteUrl(solution.path));
    expect(sitemap().map((entry) => entry.url)).toContain(absoluteUrl(solution.path));
  });

  it.each(solutions.map((solution) => solution.slug))("%s states only registry prices and no prohibited claims", async (slug) => {
    const text = (await renderSolution(slug)).container.textContent ?? "";
    expect([...new Set(text.match(PRICE) ?? [])].filter((price) => !registryPrices.has(price))).toEqual([]);
    for (const banned of ["Cognizant", "UnitedHealth", "UHG", "Optum", "autonomous agent", "testimonial", "%"]) expect(text).not.toContain(banned);
  });

  it("labels delivery intelligence a proposed application and its proof synthetic", async () => {
    const text = (await renderSolution("delivery-intelligence")).container.textContent ?? "";
    expect(text).toContain("Proposed application.");
    expect(text).toContain("no enterprise deployment is claimed");
    const solution = solutions.find((item) => item.slug === "delivery-intelligence")!;
    expect(solution.evidence.every((item) => item.kind !== "Working software")).toBe(true);
    expect(solution.example.label).toContain("Synthetic");
  });

  it("bounds every RachelOS citation to a single operator with no claimed results", () => {
    for (const solution of solutions) {
      for (const item of solution.evidence.filter((evidence) => evidence.kind === "Working software")) {
        expect(item.description).toMatch(/single-operator/);
        expect(item.description).toMatch(/does not establish client results|no conversion or revenue results are claimed/);
      }
    }
  });

  it("links only to published guides and live site routes", () => {
    const pageRoutes = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
    for (const solution of solutions) {
      for (const href of [...solution.evidence.map((item) => item.href), ...solution.related.map((item) => item.href), solution.cta.href, solution.cta.secondaryHref]) {
        const path = href.split("?")[0];
        if (path.startsWith("/insights/")) expect(getInsight(path.replace("/insights/", ""))?.slug, href).toBeTruthy();
        else expect(pageRoutes.has(path), href).toBe(true);
      }
    }
  });

  it("has no site-wide canonical that pages could inherit", () => {
    // Read as text: importing the layout would load global CSS into the test runner.
    expect(readFileSync("src/app/layout.tsx", "utf8")).not.toMatch(/^\s*alternates\s*:/m);
  });
});
