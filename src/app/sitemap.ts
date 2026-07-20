import type { MetadataRoute } from "next";
import { caseStudies, services } from "@/lib/content";
import { frameworkPages } from "@/lib/authority";
import { getInsights } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/problems",
    "/proof",
    "/proof/rachelos",
    "/proof/transfer",
    "/healthcare",
    "/industries",
    "/founder",
    "/services",
    "/services/prior-authorization-assessment",
    "/frameworks",
    "/selected-work",
    "/contact",
    "/insights",
  ];

  const serviceRoutes = services
    .filter((service) => service.featured)
    .map((service) => `/services/${service.slug}`);
  const caseStudyRoutes = caseStudies.map((study) => `/selected-work/${study.slug}`);
  const insightRoutes = getInsights().map((insight) => `/insights/${insight.slug}`);
  const frameworkRoutes = frameworkPages.map((page) => `/frameworks/${page.slug}`);

  // /offers/* and /assessment/* are retired to 301 redirects (Phase A). The five
  // former /proof/* operating-model pages live under /frameworks. Founder
  // consolidation (2026-07-17): /about, /proof/founder, and /founder/* redirect
  // to the canonical /founder page.
  return [...new Set([...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...insightRoutes, ...frameworkRoutes])].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-07-20"),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
