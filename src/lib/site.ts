import { CONSTRAINT_CALL } from "@/lib/offers";

export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "TKO Solutions designs and builds workflow systems, CRM integrations, and practical AI applications for growing businesses. Work directly with Todd Kovalsky.",
  positioning: "TKO builds the systems that turn scattered information into follow-up, decisions, and work that moves.",
  differentiation:
    "Todd Kovalsky connects business operations, product design, and hands-on development in one focused engagement, from the first workflow conversation through launch.",
  cta: CONSTRAINT_CALL.label,
  ctaShort: CONSTRAINT_CALL.shortLabel,
  ctaHref: CONSTRAINT_CALL.href,
  secondaryCta: "See How RachelOS Was Built",
  secondaryCtaHref: "/selected-work/from-crm-to-operating-system",
  socialImage: "/og-tko-3.png",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "t.e.kovalsky@gmail.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/toddkovalsky",
  scheduling: process.env.NEXT_PUBLIC_SCHEDULING_URL,
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
