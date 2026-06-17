import {
  Activity,
  ChevronRight,
  Database,
  FileCheck,
  Radio,
  Target,
  UserCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { operatingFramework } from "@/lib/content";

const icons: LucideIcon[] = [Radio, Database, FileCheck, Activity, Zap, UserCheck, Target];

export function OperatingFramework() {
  return (
    <div className="grid gap-2 lg:grid-cols-7 lg:items-stretch lg:gap-0">
      {operatingFramework.map((step, index) => {
        const Icon = icons[index];
        const isLast = index === operatingFramework.length - 1;
        return (
          <div key={step.stage} className="flex items-center lg:contents">
            <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-5 lg:rounded-none lg:border-0 lg:border-r lg:border-white/10 lg:bg-transparent lg:p-6 lg:last:border-r-0">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary-light">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold text-white">{step.stage}</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">{step.description}</p>
            </div>
            {!isLast ? (
              <ChevronRight
                aria-hidden="true"
                className="mx-1 size-5 shrink-0 rotate-90 text-white/20 lg:mx-0 lg:hidden"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
