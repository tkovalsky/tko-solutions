import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational Intelligence System Build",
  description:
    "Design and implement the decision layer between data and action: operational memory, prioritization, action queues, escalation detection, and human-in-the-loop AI.",
  alternates: { canonical: "/services/operating-system-build" },
  openGraph: {
    title: "Operational Intelligence System Build",
    description:
      "Turn workflow evidence into an Operational Intelligence System that identifies priorities, recommends next actions, and keeps humans in approval.",
    url: absoluteUrl("/services/operating-system-build"),
  },
};

export default function OperatingSystemBuildPage() {
  return <ServiceTemplate slug="operating-system-build" />;
}
