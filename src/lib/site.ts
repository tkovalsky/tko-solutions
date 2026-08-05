import { PROGRAM_RECOVERY_CONVERSATION, SPECIALIST_CONVERSATION } from "@/lib/offers";

export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "TKO recovers healthcare transformation programs that are behind, over budget, or about to fund automation on top of a workflow that does not work yet. Senior, accountable, fixed-scope work for health plans, healthcare services organizations, and PE-backed provider platforms.",
  positioning:
    "I recover healthcare transformation programs that are behind, over budget, or about to fund automation on top of a workflow that does not work yet.",
  differentiation:
    "I have worked inside large consulting firms, which is why I will tell you what an engagement team is rarely positioned to say: whether the program is actually recoverable, and what it will cost to find out the slow way. One accountable senior leader, no staffing ramp, no quarter-long discovery phase.",
  cta: PROGRAM_RECOVERY_CONVERSATION.label,
  ctaHref: PROGRAM_RECOVERY_CONVERSATION.href,
  secondaryCta: SPECIALIST_CONVERSATION.label,
  secondaryCtaHref: SPECIALIST_CONVERSATION.href,
  socialImage: "/og-pa-v2.png",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "t.e.kovalsky@gmail.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/toddkovalsky",
  scheduling: process.env.NEXT_PUBLIC_SCHEDULING_URL,
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
