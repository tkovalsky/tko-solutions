import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HomePage, { metadata } from "@/app/page";
import { operatingLayerStages } from "@/components/site/operating-layer";
import { blueprintLaunch, getOffer, offers, sidecar, healthcareExecutionAssurance, CONSTRAINT_CALL } from "@/lib/offers";

afterEach(cleanup);

const PRICE = /\$\d{1,3}(?:,\d{3})*(?:\.\d+)?(?![\d.,]*[KMB])/g;
const registryPrices = new Set(JSON.stringify([offers, sidecar, healthcareExecutionAssurance, CONSTRAINT_CALL]).match(PRICE) ?? []);

describe("homepage positioning", () => {
  it("leads with the manual-work problem and the two buyer paths", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Your business has enough software. Why is everything still manual?");
    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(within(hero).getByRole("link", { name: "Get My Execution Blueprint" }).getAttribute("href")).toBe("/services/execution-gap-blueprint");
    expect(within(hero).getByRole("link", { name: "Discuss an Enterprise Engagement" }).getAttribute("href")).toBe("/contact?cta=homepage_enterprise");
    expect(String(metadata.title && typeof metadata.title === "object" && "absolute" in metadata.title ? metadata.title.absolute : "")).toContain("Why Is Everything Still Manual?");
  });

  it("states only registry prices, including the current Blueprint price", () => {
    const text = render(<HomePage />).container.textContent ?? "";
    const unknown = [...new Set(text.match(PRICE) ?? [])].filter((price) => !registryPrices.has(price));
    expect(unknown).toEqual([]);
    expect(text).toContain(getOffer("execution-gap-blueprint")!.commercial);
    expect(text).toContain(blueprintLaunch.standardPrice);
  });

  it("renders the operating layer as an ordered, labeled list with its conceptual caveat", () => {
    render(<HomePage />);
    const figure = screen.getByRole("figure", { name: /A conceptual model, not a packaged product/ });
    const stages = within(figure).getAllByRole("list")[1];
    expect(stages.tagName).toBe("OL");
    expect(within(stages).getAllByRole("listitem")).toHaveLength(operatingLayerStages.length);
    expect(operatingLayerStages.map((stage) => stage.name)).toEqual(["Connect", "Understand", "Decide", "Execute", "Verify", "Improve"]);
    expect(figure.textContent).toContain("A conceptual model, not a packaged product.");
  });

  it("labels the enterprise use case as proposed and RachelOS as single-operator evidence", () => {
    const text = render(<HomePage />).container.textContent ?? "";
    expect(text).toContain("Proposed application");
    expect(text).toContain("not a packaged platform");
    expect(text).toContain("single-operator");
    expect(text).toContain("does not establish client results");
    for (const banned of ["testimonial", "Cognizant", "UnitedHealth", "UHG", "Optum"]) expect(text).not.toContain(banned);
  });
});
