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
    "/insights",
  ];

  const serviceRoutes = ["/services/diagnostic", "/services/operating-system-build"];
  const caseStudyRoutes = caseStudies.map((study) => `/selected-work/${study.slug}`);
  const insightRoutes = getInsights().map((insight) => `/insights/${insight.slug}`);
  // Selected Work is the canonical evidence center. /proof, /frameworks,
  // /case-studies, /offers, and /assessment are redirect-only namespaces.
  return [...new Set([...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...insightRoutes])].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-07-21"),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
