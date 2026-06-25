import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fractional Operational Intelligence Advisor",
  description:
    "Strategic advisory support for operational reviews, workflow governance, AI adoption guidance, prioritization reviews, and execution oversight.",
  alternates: { canonical: "/services/fractional-advisor" },
  openGraph: {
    title: "Fractional Operational Intelligence Advisor",
    description:
      "A strategic advisory engagement for leadership teams that need stronger operational decision making and execution visibility.",
    url: absoluteUrl("/services/fractional-advisor"),
  },
};

export default function FractionalAdvisorPage() {
  return <ServiceTemplate slug="fractional-advisor" />;
}
