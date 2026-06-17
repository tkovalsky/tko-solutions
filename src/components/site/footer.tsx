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
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
            Operational Intelligence Systems for complex organizations that need to
            see where work is actually failing.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:justify-self-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

