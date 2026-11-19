import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ReferralNetworkPage, { metadata } from "@/app/products/referral-network/page";
import sitemap from "@/app/sitemap";
import { absoluteUrl, solutionNavigation } from "@/lib/site";

afterEach(cleanup);

describe("BoundOS Referral Network page", () => {
  it("has one H1, its own canonical, a nav link, and a sitemap entry", () => {
    render(<ReferralNetworkPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(metadata.alternates?.canonical).toBe("/products/referral-network");
    expect(solutionNavigation.map((item) => item.href)).toContain("/products/referral-network");
    expect(sitemap().map((entry) => entry.url)).toContain(absoluteUrl("/products/referral-network"));
  });

  it("sends the call to action to boundos.com/apply and details to boundos.com", () => {
    render(<ReferralNetworkPage />);
    const apply = screen.getAllByRole("link", { name: "Apply to the Network" });
    expect(apply.length).toBeGreaterThan(0);
    apply.forEach((link) => expect(link.getAttribute("href")).toBe("https://www.boundos.com/apply"));
    screen.getAllByRole("link", { name: /Details on boundos\.com/ }).forEach((link) => expect(link.getAttribute("href")).toBe("https://www.boundos.com"));
  });

  // Referral fees, compensation, and territory terms live on boundos.com only.
  it("states no fees, splits, exclusivity, or guaranteed introductions", () => {
    const { container } = render(<ReferralNetworkPage />);
    const text = `${container.textContent} ${JSON.stringify(metadata)}`;
    expect(text).not.toMatch(/\d+\s?%|\$\d|exclusive|exclusivity|guaranteed (leads|introductions|referrals)|co-op|contribution|commission|one (seat|partner|specialist) per/i);
    expect(text).toContain("not a licensed real-estate brokerage");
    expect(text).toContain("No lead volume, conversion rate, or revenue is guaranteed.");
  });
});
