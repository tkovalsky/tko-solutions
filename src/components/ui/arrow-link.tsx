import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ArrowLinkProps = ComponentPropsWithoutRef<typeof Link>;

export function ArrowLink({ className, children, ...props }: ArrowLinkProps) {
  return (
    <Link
      data-conversion-event="secondary_cta_click"
      data-cta-location="arrow_link"
      data-cta-label={typeof children === "string" ? children : undefined}
      data-referenced-service={typeof props.href === "string" && props.href.startsWith("/services/") ? props.href.split("/").pop() : undefined}
      data-case-study={typeof props.href === "string" && props.href.startsWith("/selected-work/") ? props.href.split("/").pop() : undefined}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary underline-offset-4 transition-colors duration-200 hover:text-primary-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight
        className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
