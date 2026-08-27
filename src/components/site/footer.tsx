import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { site } from "@/lib/site";

const footerLinks = [
  { href: "/healthcare", label: "Healthcare Practice" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/selected-work", label: "Selected Work" },
  { href: "/insights", label: "Insights" },
  { href: "/founder", label: "About Todd" },
  { href: "/program-recovery-readiness-check", label: "Transformation Readiness Check" },
  { href: "/contact", label: "Discuss a Transformation" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-midnight text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-6 text-white/70">
            Principal-led healthcare transformation and operating-model advisory for complex,
            regulated change.
          </p>
          <p className="mt-4 max-w-sm text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
            Reduce the burden · Preserve the control · Redesign the system
          </p>
          <p className="mt-6 text-sm leading-6 text-white/70">
            <a href={`mailto:${site.email}`} data-conversion-event="email_link_click" data-cta-location="footer" data-cta-label="email" className="font-medium text-white/90 underline-offset-4 hover:text-white hover:underline">
              {site.email}
            </a>
            <span className="mx-2 text-white/40">·</span>
            <a href={site.linkedin} target="_blank" rel="noreferrer" data-conversion-event="linkedin_click" data-cta-location="footer" data-cta-label="LinkedIn" className="font-medium text-white/90 underline-offset-4 hover:text-white hover:underline">
              LinkedIn
            </a>
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:justify-self-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-conversion-event={link.href === "/contact" ? "primary_cta_click" : "secondary_cta_click"}
              data-cta-location="footer"
              data-cta-label={link.label}
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
