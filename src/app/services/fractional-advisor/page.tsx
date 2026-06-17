import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fractional Operating System Advisor",
  description:
    "Advisory support for sustaining operating cadence, governance, and transformation momentum after diagnostic or build work.",
  alternates: { canonical: "/services/fractional-advisor" },
  openGraph: {
    title: "Fractional Operating System Advisor",
    description:
      "A post-diagnostic or post-build advisory engagement for maintaining operational discipline and sponsor visibility.",
    url: absoluteUrl("/services/fractional-advisor"),
  },
};

export default function FractionalAdvisorPage() {
  return <ServiceTemplate slug="fractional-advisor" />;
}

