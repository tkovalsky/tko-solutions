import {
  AlertTriangle,
  Clock,
  Cpu,
  EyeOff,
  RefreshCw,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { problems } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  "Transformation Recovery": RefreshCw,
  "Workflow Visibility Failure": EyeOff,
  "Decision Latency": Clock,
  "Program Execution Failure": AlertTriangle,
  "Governance Breakdown": ShieldAlert,
  "AI Adoption Failure": Cpu,
};

export function ProblemGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {problems.slice(0, 6).map((problem) => {
        const Icon = icons[problem.title] ?? AlertTriangle;
        return (
          <article
            key={problem.title}
            className="group rounded-xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_30px_-12px_rgba(37,99,235,0.25)]"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">{problem.title}</h3>
            <p className="mt-2.5 text-sm leading-6 text-muted">{problem.description}</p>
          </article>
        );
      })}
    </div>
  );
}
