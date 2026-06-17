import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { site } from "@/lib/site";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
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
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <LinkButton href="/contact" className="min-h-10 px-4 text-xs">
            {site.cta}
          </LinkButton>
        </div>
        <Link
          href="/contact"
          className="text-sm font-semibold uppercase tracking-[0.08em] text-primary lg:hidden"
        >
          Start
        </Link>
      </div>
      <nav
        aria-label="Mobile navigation"
        className="flex gap-5 overflow-x-auto border-t border-border px-6 py-3 text-sm text-muted lg:hidden"
      >
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

