import type { MetadataRoute } from "next";
import { caseStudies, services } from "@/lib/content";
import { founderPages, frameworkPages } from "@/lib/authority";
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
    "/frameworks",
    "/selected-work",
    "/about",
    "/contact",
    "/diagrams",
    "/insights",
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const caseStudyRoutes = caseStudies.map((study) => `/selected-work/${study.slug}`);
  const insightRoutes = getInsights().map((insight) => `/insights/${insight.slug}`);
  const founderRoutes = founderPages.map((page) => `/founder/${page.slug}`);
  const frameworkRoutes = frameworkPages.map((page) => `/frameworks/${page.slug}`);

  // /offers/* and /assessment/* are retired to 301 redirects (Phase A). The five
  // former /proof/* operating-model pages are reclassified as Frameworks and now
  // live (and are indexed) under /frameworks.
  return [...new Set([...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...insightRoutes, ...founderRoutes, ...frameworkRoutes])].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-07-13"),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
