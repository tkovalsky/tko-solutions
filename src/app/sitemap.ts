import type { MetadataRoute } from "next";
import { caseStudies, services } from "@/lib/content";
import { getInsights } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/services",
    "/services/prior-authorization-assessment",
    "/selected-work",
    "/about",
    "/contact",
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const caseStudyRoutes = caseStudies.map((study) => `/selected-work/${study.slug}`);
  const insightRoutes = getInsights().map((insight) => `/insights/${insight.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...insightRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-06-25"),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
