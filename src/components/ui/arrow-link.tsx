import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ArrowLinkProps = ComponentPropsWithoutRef<typeof Link>;

export function ArrowLink({ className, children, ...props }: ArrowLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight
        className="size-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
