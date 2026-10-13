import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 border-t border-border py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-[65ch]", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[clamp(1.875rem,3.4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
      ) : null}
    </div>
  );
}

