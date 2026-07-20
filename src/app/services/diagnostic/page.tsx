import type { Metadata } from "next";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational Truth & AI Workflow Diagnostic",
  description:
    "A fixed-scope, three-week diagnostic that maps one critical workflow, identifies operational friction and human-API risk, and produces a governed AI-assisted operating model with a 90-day plan.",
  alternates: { canonical: "/services/diagnostic" },
  openGraph: {
    title: "Operational Truth & AI Workflow Diagnostic",
    description:
      "Expose the real workflow, rank AI opportunities by value and risk, define human controls, and leave with a prioritized 90-day implementation plan.",
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
          name: "Operational Truth & AI Workflow Diagnostic",
          provider: { "@type": "Organization", name: "TKO Solutions" },
          serviceType: "AI-assisted workflow diagnostic",
          areaServed: "United States",
          providerMobility: "remote",
        }}
      />
      <ServiceTemplate slug="diagnostic" />
    </>
  );
}
