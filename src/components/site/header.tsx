import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { site } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Problems" },
  { href: "/proof", label: "Proof" },
  { href: "/insights", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/assessment", label: "Assessment" },
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
          <LinkButton href="/assessment" className="whitespace-nowrap">
            {site.cta}
          </LinkButton>
        </div>
        <Link
          href="/assessment"
          className="text-sm font-semibold uppercase tracking-[0.08em] text-primary lg:hidden"
        >
          Assessment
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
