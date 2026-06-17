import type { MetadataRoute } from "next";
import { caseStudies, services } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/services",
    "/industries",
    "/case-studies",
    "/insights",
    "/about",
    "/contact",
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const caseStudyRoutes = caseStudies.map((study) => `/case-studies/${study.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-06-17"),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

