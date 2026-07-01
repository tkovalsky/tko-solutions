import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-[0_16px_40px_-16px_rgb(var(--primary-rgb)/0.16)] md:p-8",
        className,
      )}
      {...props}
    />
  );
}
