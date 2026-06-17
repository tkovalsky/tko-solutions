import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border border-[#111111] bg-[#111111] text-white hover:bg-white hover:text-[#111111]",
  secondary:
    "border border-[#111111] bg-white text-[#111111] hover:bg-[#111111] hover:text-white",
  ghost:
    "border border-transparent bg-transparent text-[#111111] hover:border-[#111111]",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
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
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

