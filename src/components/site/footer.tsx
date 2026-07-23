import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { site } from "@/lib/site";

const footerLinks = [
  { href: "/services/diagnostic", label: "Prior Authorization Performance Diagnostic" },
  { href: "/services/operating-system-build", label: "90-Day Improvement Sprint" },
  { href: "/healthcare", label: "How We Help" },
  { href: "/selected-work", label: "Evidence & Experience" },
  { href: "/founder", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Request a Fit Call" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-midnight text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-6 text-white/70">
            TKO helps specialty medical groups, MSOs, and provider-side healthcare
            operators identify the operational causes of prior-authorization delays,
            avoidable denials, rework, and staff dependency before they fund more automation.
          </p>
          <p className="mt-4 max-w-sm text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
            15 business days · $25,000 fixed fee · Principal-led
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
              data-referenced-service={link.href.startsWith("/services/") ? link.href.split("/").pop() : undefined}
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
