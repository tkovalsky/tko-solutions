import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operating System Build",
  description:
    "Design and build the Operational Intelligence System identified by diagnostic findings.",
  alternates: { canonical: "/services/operating-system-build" },
  openGraph: {
    title: "Operating System Build",
    description:
      "Turn operational truth into a system that captures signals, exposes state, surfaces action, and keeps humans in approval.",
    url: absoluteUrl("/services/operating-system-build"),
  },
};

export default function OperatingSystemBuildPage() {
  return <ServiceTemplate slug="operating-system-build" />;
}

