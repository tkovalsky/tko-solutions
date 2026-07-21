import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border border-primary bg-primary text-white hover:bg-primary-dark hover:border-primary-dark",
  secondary:
    "border border-foreground/20 bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/[0.03]",
  ghost:
    "border border-transparent bg-transparent text-foreground hover:border-foreground/20",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  className?: string;
  eventName?: "primary_cta_click" | "secondary_cta_click";
  ctaLocation?: string;
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
  eventName,
  ctaLocation = "link_button",
}: LinkButtonProps) {
  const referencedService = href.startsWith("/services/") ? href.split("/").pop() : undefined;
  const label = typeof children === "string" ? children : undefined;
  return (
    <Link
      href={href}
      data-conversion-event={eventName ?? (variant === "primary" ? "primary_cta_click" : "secondary_cta_click")}
      data-cta-location={ctaLocation}
      data-cta-label={label}
      data-referenced-service={referencedService}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
