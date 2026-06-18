import Link from "next/link";
import { Logo } from "@/components/site/logo";

const footerLinks = [
  { href: "/services/diagnostic", label: "Diagnostic" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-midnight text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-6 text-white/70">
            Operational Intelligence Systems for complex organizations that need to
            see where work is actually failing.
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

