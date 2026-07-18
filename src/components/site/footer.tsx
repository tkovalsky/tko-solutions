import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { site } from "@/lib/site";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/problems", label: "Problems" },
  { href: "/proof", label: "Proof" },
  { href: "/proof/transfer", label: "The Transfer Argument" },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/healthcare", label: "Healthcare" },
  { href: "/insights", label: "Guides" },
  { href: "/founder", label: "Founder" },
  { href: "/selected-work", label: "Selected Work" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-midnight text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-6 text-white/70">
            Executive strategy through implementation for complex operations.
            TKO turns operating problems into working strategy, operating
            models, products, and AI-enabled systems—from executive decision
            through production implementation.
          </p>
          <p className="mt-6 text-sm leading-6 text-white/70">
            <a href={`mailto:${site.email}`} className="font-medium text-white/90 underline-offset-4 hover:text-white hover:underline">
              {site.email}
            </a>
            <span className="mx-2 text-white/40">·</span>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="font-medium text-white/90 underline-offset-4 hover:text-white hover:underline">
              LinkedIn
            </a>
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:justify-self-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
