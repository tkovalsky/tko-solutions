import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 border px-3 py-2 transition-colors",
        inverted
          ? "border-white/25 text-white hover:border-white/50"
          : "border-foreground/20 text-foreground hover:border-foreground/40",
        className,
      )}
      aria-label="TKO Solutions home"
    >
      <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em]">TKO</span>
      <span className={cn("h-3 w-px", inverted ? "bg-white/25" : "bg-foreground/20")} aria-hidden="true" />
      <span
        className={cn(
          "text-[0.65rem] font-medium uppercase tracking-[0.32em]",
          inverted ? "text-white/65" : "text-muted",
        )}
      >
        Solutions
      </span>
    </Link>
  );
}
