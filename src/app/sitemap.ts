import type { MetadataRoute } from "next";
import { caseStudies, services } from "@/lib/content";
import { founderPages } from "@/lib/authority";
import { getInsights } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/problems",
    "/proof",
    "/proof/founder",
    "/proof/rachelos",
    "/healthcare",
    "/founder",
    "/services",
    "/services/prior-authorization-assessment",
    "/selected-work",
    "/about",
    "/contact",
    "/diagrams",
    "/insights",
    "/selected-work",
    "/contact",
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const caseStudyRoutes = caseStudies.map((study) => `/selected-work/${study.slug}`);
  const insightRoutes = getInsights().map((insight) => `/insights/${insight.slug}`);
  const founderRoutes = founderPages.map((page) => `/founder/${page.slug}`);

  // /offers/* and /assessment/* are retired to 301 redirects (Phase A). The five
  // framework-class /proof/* children are reclassified and noindexed pending a
  // dedicated Frameworks hub, so they are excluded from the sitemap.
  return [...new Set([...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...insightRoutes, ...founderRoutes])].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-07-13"),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
