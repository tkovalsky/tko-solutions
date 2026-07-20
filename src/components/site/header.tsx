import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { MobileNav } from "@/components/site/mobile-nav";
import { site } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services/diagnostic", label: "Diagnostic" },
  { href: "/selected-work", label: "Selected Work" },
  { href: "/healthcare", label: "Healthcare" },
  { href: "/insights", label: "Insights" },
  { href: "/founder", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Logo />
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <LinkButton href="/contact" className="whitespace-nowrap">
            {site.cta}
          </LinkButton>
        </div>
        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
