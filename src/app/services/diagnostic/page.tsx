import type { Metadata } from "next";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational Diagnostic",
  description:
    "A 2-3 week Operational Diagnostic, starting at $15K, for leaders who need to find where work stalls and what action should happen next.",
  alternates: { canonical: "/services/diagnostic" },
  openGraph: {
    title: "Operational Diagnostic",
    description:
      "A focused diagnostic that produces workflow assessment, decision analysis, AI opportunity review, and an implementation roadmap.",
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
          name: "Operational Diagnostic",
          provider: { "@type": "Organization", name: "TKO Solutions" },
          serviceType: "Operational Diagnostic",
          areaServed: "United States",
          offers: {
            "@type": "Offer",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: 15000,
            },
          },
        }}
      />
      <ServiceTemplate slug="diagnostic" />
    </>
  );
}
