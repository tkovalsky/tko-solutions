import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContactPage from "@/app/contact/page";
import PrivateClientOSPage from "@/app/private-client-os/page";
import ManagedFollowUpPage, { metadata as managedFollowUpMetadata } from "@/app/products/ambient-crm/page";
import OfferPage, { generateMetadata as offerMetadata } from "@/app/services/[slug]/page";
import ServicesPage, { metadata as servicesMetadata } from "@/app/services/page";
import { buildLeadNotificationEmail, buildLeadReceiptEmail } from "@/lib/leads/email-templates";
import type { PersistedInboundLead } from "@/lib/leads/types";
import { buildLlmsText } from "@/lib/llms";
import { CONSTRAINT_CALL, healthcareExecutionAssurance, offers, sidecar } from "@/lib/offers";

vi.mock("@/app/contact/actions", () => ({ submitDiagnosticIntake: vi.fn() }));
afterEach(cleanup);

// Prices only: "$1,500", "$7,500", "$500". Revenue bands such as "$2M" or "$20M" are not prices.
const PRICE = /\$\d{1,3}(?:,\d{3})*(?:\.\d+)?(?![\d.,]*[KMB])/g;
const prices = (text: string) => new Set(text.match(PRICE) ?? []);
const registryPrices = prices(JSON.stringify([offers, sidecar, healthcareExecutionAssurance, CONSTRAINT_CALL]));

function expectRegistryPrices(surface: string, text: string) {
  const unknown = [...prices(text)].filter((price) => !registryPrices.has(price));
  expect(unknown, `${surface} states prices that are not in src/lib/offers.ts`).toEqual([]);
}

const managedLead: PersistedInboundLead = {
  id: "lead-1", name: "Alex", email: "alex@example.com", company: "Example Team", role: null,
  source: "managed_follow_up_pilot", landingPage: "/contact", notifiedAt: null,
  lastSubmittedAt: new Date("2026-10-20T12:00:00Z"),
  createdAt: new Date("2026-10-20T12:00:00Z"), updatedAt: new Date("2026-10-20T12:00:00Z"),
  payload: { offer: "managed-follow-up", transformationContext: "Past clients drift", currentPressure: "leads-follow-up", revenueBand: "under-2m", timing: "now" },
};

describe("commercial consistency", () => {
  it("publishes the D1 ladder and nothing from the retired price lists", () => {
    expect(sidecar.steps.map((step) => step.commercial)).toEqual([
      "$500 one-time · credited to setup within 60 days",
      "$1,500 setup + $500/month",
      "$2,500 setup + $1,200/month",
    ]);
    for (const retired of ["$5,000", "$750", "$25,000", "$30,000", "$75,000"]) expect(registryPrices.has(retired)).toBe(false);
  });

  it("renders only registry prices on the services index and every offer page", async () => {
    expectRegistryPrices("/services", render(<ServicesPage />).container.textContent ?? "");
    expectRegistryPrices("/services metadata", JSON.stringify(servicesMetadata));
    cleanup();
    for (const offer of offers) {
      const params = Promise.resolve({ slug: offer.slug });
      expectRegistryPrices(`/services/${offer.slug}`, render(await OfferPage({ params })).container.textContent ?? "");
      expectRegistryPrices(`/services/${offer.slug} metadata`, JSON.stringify(await offerMetadata({ params })));
      cleanup();
    }
  });

  it("renders the BoundOS ladder from the registry on the managed follow-up and PCOS pages", () => {
    const text = render(<ManagedFollowUpPage />).container.textContent ?? "";
    for (const step of sidecar.steps) {
      expect(text).toContain(step.name);
      expect(text).toContain(step.commercial);
    }
    expectRegistryPrices("/products/ambient-crm", text);
    expectRegistryPrices("/products/ambient-crm metadata", JSON.stringify(managedFollowUpMetadata));
    cleanup();
    const pcos = render(<PrivateClientOSPage />).container;
    expectRegistryPrices("/private-client-os", pcos.textContent ?? "");
    expect(pcos.querySelector(`a[href="${sidecar.productUrl}"]`)).not.toBeNull();
  });

  it("renders only registry prices on the contact page for every offer value", async () => {
    for (const offer of [undefined, "managed-follow-up", ...offers.map((item) => item.slug)]) {
      const { container } = render(await ContactPage({ searchParams: Promise.resolve({ offer }) }));
      expectRegistryPrices(`/contact?offer=${offer ?? ""}`, container.textContent ?? "");
      cleanup();
    }
  });

  it("keeps prices out of the receipt and operator brief, and llms.txt on the registry", () => {
    for (const content of [buildLeadReceiptEmail(managedLead), buildLeadNotificationEmail(managedLead)]) {
      expect(prices(`${content.subject}\n${content.text}\n${content.html}`).size).toBe(0);
    }
    expectRegistryPrices("/llms.txt", buildLlmsText());
  });
});
