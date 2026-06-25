import type { Metadata } from "next";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational Recovery Assessment",
  description:
    "A one-week, $5K-$8K assessment for leaders who need fast clarity on where AI, automation, or workflow spend should go next.",
  alternates: { canonical: "/services/recovery-assessment" },
  openGraph: {
    title: "Operational Recovery Assessment",
    description:
      "A fixed-scope assessment that produces a workflow map, bottleneck analysis, dependency analysis, AI readiness assessment, operational risk assessment, and executive briefing.",
    url: absoluteUrl("/services/recovery-assessment"),
  },
};

export default function RecoveryAssessmentPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Operational Recovery Assessment",
          provider: { "@type": "Organization", name: "TKO Solutions" },
          serviceType: "Operational Recovery Assessment",
          areaServed: "United States",
          offers: {
            "@type": "Offer",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: 5000,
              maxPrice: 8000,
            },
          },
        }}
      />
      <ServiceTemplate slug="recovery-assessment" />
    </>
  );
}
