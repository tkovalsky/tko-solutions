import { TRANSFORMATION_CONVERSATION } from "@/lib/offers";

export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "Principal-led healthcare transformation and operating-model advisory for organizations reducing administrative burden, modernizing regulated workflows, governing automation, and making complex change executable.",
  positioning:
    "I help healthcare organizations make complex, regulated change executable.",
  differentiation:
    "When a transformation's outcome is distributed across dozens of teams, systems, and decisions, every part has an owner and the whole does not. TKO becomes the integration and operational-truth layer that closes that gap. One accountable principal leads the work.",
  cta: TRANSFORMATION_CONVERSATION.label,
  ctaHref: TRANSFORMATION_CONVERSATION.href,
  secondaryCta: "Compare Engagements",
  secondaryCtaHref: "/services",
  socialImage: "/og-tko-2.png",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "t.e.kovalsky@gmail.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/toddkovalsky",
  scheduling: process.env.NEXT_PUBLIC_SCHEDULING_URL,
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
