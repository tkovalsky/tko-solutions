import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/site/service-template";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operating System Build Sprint",
  description:
    "Build the operating system that turns fragmented work into clear priorities, accountable action, and better execution.",
  alternates: { canonical: "/services/operating-system-build" },
  openGraph: {
    title: "Operating System Build Sprint",
    description:
      "Turn workflow evidence into an operating system that identifies priorities, assigns next actions, and keeps humans in control.",
    url: absoluteUrl("/services/operating-system-build"),
  },
};

export default function OperatingSystemBuildPage() {
  return <ServiceTemplate slug="operating-system-build" />;
}
