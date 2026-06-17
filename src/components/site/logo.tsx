import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex border border-[#111111] px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#111111]",
        className,
      )}
      aria-label="TKO Solutions home"
    >
      TKO Solutions
    </Link>
  );
}

