import { CONSTRAINT_CALL } from "@/lib/offers";

export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "TKO Solutions builds business operating systems for growing companies: find the constraint costing you the most, build the system that fixes it, and prove it changed the numbers.",
  positioning: "TKO builds the missing operating layer between your information and your execution.",
  differentiation:
    "Consultants stop at recommendations. Agencies and developers build what they are told. TKO finds the constraint and builds the fix, led by one principal who built and runs a production operating system.",
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
