import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { credibilityStrip } from "@/lib/founder";

export function CredibilityStrip() {
  return (
    <section
      aria-label="Career background"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <p className="shrink-0 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            20+ years in regulated operations
          </p>
          <ul className="grid flex-1 grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:max-w-4xl">
            {credibilityStrip.map((item) => (
              <li key={item.name} className="text-sm leading-6">
                <span className="font-semibold text-foreground">{item.name}</span>
                <span className="text-muted"> — {item.detail}</span>
              </li>
            ))}
            <li className="text-sm leading-6">
              <Link
                href="/founder"
                className="group inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-dark"
              >
                Full career record
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
