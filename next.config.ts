import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    // v1 repositioning (2026-09-27): the site was not yet indexed, so the legacy
    // redirect map was replaced with this small set that catches old shared links.
    // Every destination is a live page; none is itself a redirect source.
    const retiredCaseStudies = [
      "prior-authorization-modernization",
      "provider-eligibility-modernization",
      "enterprise-care-management-modernization",
      "healthcare-interoperability-platform",
      "cre-intelligence-model",
      "rachelos-delivery-model",
    ];
    const retiredGuides = [
      "prior-authorization-is-a-decision-rights-problem",
      "prior-authorization-operational-quality-problem",
      "why-healthcare-transformation-programs-stall",
      "human-apis-become-organizational-bottlenecks",
      "operational-intelligence-vs-reporting",
    ];
    return [
      { source: "/healthcare", destination: "/healthcare/impact-assessment", permanent: true },
      { source: "/approach", destination: "/services", permanent: true },
      { source: "/program-recovery-readiness-check", destination: "/services/constraint-diagnostic", permanent: true },
      { source: "/about", destination: "/founder", permanent: true },
      { source: "/founder/:slug", destination: "/founder", permanent: true },
      { source: "/proof", destination: "/selected-work", permanent: true },
      { source: "/case-studies", destination: "/selected-work", permanent: true },
      { source: "/case-studies/:slug", destination: "/selected-work", permanent: true },
      { source: "/services/executive-diagnostic", destination: "/services/constraint-diagnostic", permanent: true },
      { source: "/services/transformation-diagnostic", destination: "/services/constraint-diagnostic", permanent: true },
      { source: "/services/operating-model-design", destination: "/services/operating-system-build", permanent: true },
      { source: "/services/transformation-leadership", destination: "/services", permanent: true },
      ...retiredCaseStudies.map((slug) => ({ source: `/selected-work/${slug}`, destination: "/selected-work", permanent: true })),
      ...retiredGuides.map((slug) => ({ source: `/insights/${slug}`, destination: "/insights", permanent: true })),
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
