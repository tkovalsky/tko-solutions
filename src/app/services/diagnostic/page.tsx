import type { Metadata } from "next";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational Intelligence Diagnostic",
  description:
    "A $25k-$50k diagnostic for leaders who need to see where complex work is actually failing and what should be fixed first.",
  alternates: { canonical: "/services/diagnostic" },
  openGraph: {
    title: "Operational Intelligence Diagnostic",
    description:
      "A fixed-scope diagnostic that produces operational truth, ranked recovery opportunities, and a 90-day roadmap.",
    url: absoluteUrl("/services/diagnostic"),
  },
};

export default function DiagnosticPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Operational Intelligence Diagnostic",
          provider: { "@type": "Organization", name: "TKO Solutions" },
          serviceType: "Operational Intelligence Diagnostic",
          areaServed: "United States",
          offers: {
            "@type": "Offer",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: 25000,
              maxPrice: 50000,
            },
          },
        }}
      />
      <ServiceTemplate slug="diagnostic" />
    </>
  );
}

