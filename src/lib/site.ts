import { CONSTRAINT_CALL } from "@/lib/offers";

export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "TKO maps healthcare obligations to workflows, owners, controls, and evidence, and builds owned demand and follow-up systems with human-reviewed AI drafting.",
  positioning: "TKO builds the systems that turn scattered information into follow-up, decisions, and work that moves.",
  differentiation:
    "Todd Kovalsky connects business operations, product design, and hands-on development in one focused engagement, from the first workflow conversation through launch.",
  cta: CONSTRAINT_CALL.label,
  ctaShort: CONSTRAINT_CALL.shortLabel,
  ctaHref: CONSTRAINT_CALL.href,
  secondaryCta: "See How RachelOS Was Built",
  secondaryCtaHref: "/selected-work/from-crm-to-operating-system",
  socialImage: "/og-tko-4.png",
  // Explicit public address; legacy deployment settings must not override it.
  email: "todd@tko.solutions",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/toddkovalsky",
  scheduling: process.env.NEXT_PUBLIC_SCHEDULING_URL,
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

// Canonical public destinations, shared by desktop, mobile, and footer navigation.
export const publicNavigation = [
  { href: "/services", label: "Services & Pricing" },
  { href: "/healthcare/impact-assessment", label: "Healthcare" },
  { href: "/private-client-os", label: "Private Client OS" },
  { href: "/selected-work", label: "RachelOS Proof" },
  { href: "/insights", label: "Guides" },
  { href: "/founder", label: "About" },
];

export function isCurrentDestination(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
