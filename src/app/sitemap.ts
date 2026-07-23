import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";
import { getInsights } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/healthcare",
    "/founder",
    "/services",
    "/selected-work",
    "/contact",
    "/privacy",
    "/insights",
  ];

  const serviceRoutes = ["/services/diagnostic", "/services/operating-system-build"];
  const caseStudyRoutes = caseStudies.map((study) => `/selected-work/${study.slug}`);
  const insightEntries = getInsights().map((insight) => ({
    url: absoluteUrl(`/insights/${insight.slug}`),
    lastModified: new Date(insight.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Selected Work is the canonical evidence center. /proof, /frameworks,
  // /case-studies, /offers, and /assessment are redirect-only namespaces.
  const pageEntries = [...new Set([...staticRoutes, ...serviceRoutes, ...caseStudyRoutes])].map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  return [...pageEntries, ...insightEntries];
}
