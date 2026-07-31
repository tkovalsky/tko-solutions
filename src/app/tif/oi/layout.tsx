import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
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
  accounts: number;
};

const navItems = [
  { label: "Today", href: "/tif/oi/today", badge: "today" },
  { label: "Intake", href: "/tif/oi/intake", badge: "intake" },
  { label: "Pipeline", href: "/tif/oi/pipeline", badge: "pipeline" },
  { label: "Accounts", href: "/tif/oi/accounts", badge: "accounts" },
] as const;

async function getBadgeCounts(): Promise<BadgeCounts> {
  const [counts] = await tifDb.$queryRaw<BadgeCounts[]>`
    SELECT
      0::int AS "today",
      (SELECT COUNT(*)::int FROM "OiSource") AS "intake",
      (SELECT COUNT(*)::int FROM "OiOpportunity") AS "pipeline",
      (SELECT COUNT(*)::int FROM "OiOrganization") AS "accounts"
  `;

  return counts ?? { today: 0, intake: 0, pipeline: 0, accounts: 0 };
}

function daysUntilOct1() {
  const now = new Date();
  const targetYear = now.getMonth() > 9 || (now.getMonth() === 9 && now.getDate() > 1)
    ? now.getFullYear() + 1
    : now.getFullYear();
  const target = new Date(targetYear, 9, 1);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86_400_000));
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
