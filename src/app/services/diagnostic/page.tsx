import type { Metadata } from "next";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational Truth Diagnostic",
  description:
    "A 2-3 week Operational Truth Diagnostic for leaders with AI or workflow budget who need to find where work stalls and what to fund first.",
  alternates: { canonical: "/services/diagnostic" },
  openGraph: {
    title: "Operational Truth Diagnostic",
    description:
      "A focused diagnostic that produces workflow assessment, decision analysis, AI spend guidance, and an implementation roadmap.",
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
          name: "Operational Truth Diagnostic",
          provider: { "@type": "Organization", name: "TKO Solutions" },
          serviceType: "Operational Truth Diagnostic",
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
