import { CONSTRAINT_CALL } from "@/lib/offers";
import { solutions } from "@/lib/solutions";

export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "Your systems have the data. Your people shouldn't have to connect everything by hand. TKO designs and builds the operating layer between information and execution: clear owners, visible next actions, and human-approved AI.",
  positioning: "TKO builds the missing operating layer between the information in your systems and the work your people still do by hand.",
  differentiation:
    "Todd Kovalsky connects business operations, product design, and hands-on development in one focused engagement, from the first workflow conversation through launch.",
  cta: CONSTRAINT_CALL.label,
  ctaShort: CONSTRAINT_CALL.shortLabel,
  ctaHref: CONSTRAINT_CALL.href,
  // The first paid step, used by the persistent navigation CTA.
  offerCta: "Get My Blueprint",
  offerCtaHref: "/services/execution-gap-blueprint",
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

export type NavItem = { href: string; label: string; summary?: string };

// The Solutions menu: the three buyer paths from src/lib/solutions.ts, then the two vertical
// offers. Shared by the desktop menu, the mobile panel, and the footer.
export const solutionNavigation: NavItem[] = [
  ...solutions.map((solution) => ({ href: solution.path, label: solution.eyebrow, summary: solution.navSummary })),
  { href: "/healthcare/impact-assessment", label: "Healthcare readiness", summary: "Trace a mandate to workflows, owners, and evidence" },
  { href: "/private-client-os", label: "Private Client OS", summary: "Owned demand and follow-up for advisory firms" },
];

// Canonical public destinations after the Solutions menu.
export const publicNavigation: NavItem[] = [
  { href: "/services", label: "Services & Pricing" },
  { href: "/selected-work", label: "RachelOS Proof" },
  { href: "/insights", label: "Guides" },
  { href: "/founder", label: "About" },
];

export function isCurrentDestination(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
