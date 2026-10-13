"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { MobileNav } from "@/components/site/mobile-nav";
import { isCurrentDestination, publicNavigation, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Logo />
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex xl:gap-8">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrentDestination(pathname, item.href) ? "page" : undefined}
              className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors aria-[current=page]:text-primary aria-[current=page]:underline aria-[current=page]:underline-offset-8 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <LinkButton href={site.ctaHref} ctaLocation="header" className="whitespace-nowrap">
            {site.ctaShort}
          </LinkButton>
        </div>
        <MobileNav items={publicNavigation} />
      </div>
    </header>
  );
}
