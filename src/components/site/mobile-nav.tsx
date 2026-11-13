"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { isCurrentDestination, site, type NavItem } from "@/lib/site";

const linkClass =
  "flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-foreground transition-colors hover:bg-surface hover:text-primary aria-[current=page]:bg-surface aria-[current=page]:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function MobileNav({ solutions, items }: { solutions: NavItem[]; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape and lock body scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;
      const panelFocusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      const focusable = [menuButtonRef.current, ...panelFocusable].filter(
        (element): element is HTMLElement => Boolean(element),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center text-foreground transition-colors hover:bg-surface hover:text-primary aria-[current=page]:bg-surface aria-[current=page]:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <Menu className="size-6" aria-hidden="true" />
        )}
      </button>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="absolute inset-x-0 top-full border-b border-border bg-white shadow-lg"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-h-[calc(100dvh-5rem)] w-full max-w-7xl flex-col gap-1 overflow-y-auto px-6 py-4"
          >
            <p id="mobile-solutions-heading" className="px-3 pt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Solutions</p>
            <ul aria-labelledby="mobile-solutions-heading" className="flex flex-col gap-1 border-b border-border pb-3">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isCurrentDestination(pathname, item.href) ? "page" : undefined} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrentDestination(pathname, item.href) ? "page" : undefined}
                className={linkClass}
              >
                {item.label}
              </Link>
            ))}
            <LinkButton href={site.offerCtaHref} ctaLocation="mobile_navigation" className="mt-3 w-full">
              {site.offerCta}
            </LinkButton>
            <Link href={site.ctaHref} className="flex min-h-12 items-center justify-center text-sm font-semibold text-primary hover:underline">
              {site.cta}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
