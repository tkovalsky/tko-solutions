import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";
import { getInsights } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdatedAt = new Date("2026-07-21");
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
  const currentRoutes = [...new Set([
    ...staticRoutes,
    ...serviceRoutes,
    ...caseStudies.map((study) => `/selected-work/${study.slug}`),
  ])].map((route) => ({
    url: absoluteUrl(route),
    lastModified: siteUpdatedAt,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const insightRoutes = getInsights().map((insight) => ({
    url: absoluteUrl(`/insights/${insight.slug}`),
    lastModified: siteUpdatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...currentRoutes, ...insightRoutes];
}
