"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { isCurrentDestination, type NavItem } from "@/lib/site";

// Disclosure pattern (a button that shows a list of links), not an ARIA menu: links stay in
// the normal Tab order and screen readers announce them as links. Opens on click or Enter/Space;
// closes on Escape (focus returns to the button), an outside click, focus leaving, or navigation.
export function SolutionsMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = items.some((item) => isCurrentDestination(pathname, item.href));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        data-active={active || undefined}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground data-[active]:text-primary data-[active]:underline data-[active]:underline-offset-8 aria-expanded:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Solutions
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 mt-2 w-[22rem] -translate-x-1/2 rounded-xl border border-border bg-white p-2 shadow-lg"
      >
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrentDestination(pathname, item.href) ? "page" : undefined}
                className="block min-h-11 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface aria-[current=page]:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
              >
                <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                {item.summary ? <span className="mt-0.5 block text-xs leading-5 text-muted">{item.summary}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
