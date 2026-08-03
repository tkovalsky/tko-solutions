import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { daysUntilOct1 } from "@/lib/opportunity-intelligence/date/oct1";
import { tifDb } from "@/lib/tif/db";

export const metadata: Metadata = {
  title: "Opportunity Intelligence",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type OiShellProps = {
  children: ReactNode;
};

type BadgeCounts = {
  today: number;
  intake: number;
  pipeline: number;
};

const navItems = [
  { label: "Today", href: "/tif/oi/today", badge: "today" },
  { label: "Intake", href: "/tif/oi/intake", badge: "intake" },
  { label: "Pipeline", href: "/tif/oi/opportunities", badge: "pipeline" },
] as const;

async function getBadgeCounts(): Promise<BadgeCounts> {
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  const [counts] = await tifDb.$queryRaw<BadgeCounts[]>`
    SELECT
      (
        SELECT COUNT(*)::int
        FROM "OiNextAction"
        WHERE "status" = 'open'
          AND "dueAt" IS NOT NULL
          AND "dueAt" <= ${endOfToday}
      ) AS "today",
      (
        SELECT COUNT(*)::int
        FROM "OiSignal"
        WHERE "status" IN ('captured', 'classified')
          AND "tier" IN ('tier_1', 'tier_2')
      ) AS "intake",
      (
        SELECT COUNT(*)::int
        FROM "OiOpportunity"
        WHERE "status" NOT IN (
          'dismissed',
          'paused',
          'closed',
          'won',
          'accepted',
          'lost',
          'declined',
          'rejected',
          'no_bid',
          'no_response'
        )
      ) AS "pipeline"
  `;

  return counts ?? { today: 0, intake: 0, pipeline: 0 };
}

export default async function OiLayout({ children }: OiShellProps) {
  const counts = await getBadgeCounts();
  const days = daysUntilOct1();

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-foreground">
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Personal Opportunity Intelligence
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Operator workflow</h1>
          </div>

          <div className="flex items-center gap-3 rounded-md border border-border bg-[#f7f8fb] px-3 py-2 text-sm">
            <span className="font-semibold">{days}</span>
            <span className="text-muted">days to Oct 1</span>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 pb-5" aria-label="POIS">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-fit items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm font-medium hover:border-[#17375e]"
            >
              <span>{item.label}</span>
              <span className="rounded-full bg-[#17375e] px-2 py-0.5 text-xs text-white">
                {counts[item.badge]}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {children}
    </main>
  );
}
