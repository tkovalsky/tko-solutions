import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const links = [
  { title: "Transformation Recovery Diagnostic", body: "See the fixed-fee, 15-business-day scope, deliverables, and decision boundary.", href: "/services/diagnostic", label: "See scope and pricing" },
  { title: "Selected Work", body: "Review recovery, healthcare, regulated product, financial, and inspectable implementation evidence with claim limits stated.", href: "/selected-work", label: "Review the evidence" },
  { title: "Healthcare specialization", body: "See transformation recovery, interoperability, regulated operations, workflow execution, and the Prior Authorization Performance Diagnostic.", href: "/healthcare", label: "Explore healthcare" },
  { title: "Founder accountability", body: "Review Todd's verified career record, recovery capabilities, and principal-led engagement model.", href: "/founder", label: "Meet the principal" },
];

export function AuthorityLinks({ current }: { current?: string }) {
  return (
    <section aria-label="Related authority assets" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Continue the buyer path</p>
        <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">From program pressure to evidence to recovery decision.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {links.filter((link) => link.href !== current).map((link) => (
            <Card key={link.href} className="rounded-lg">
              <h3 className="text-lg font-semibold">{link.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{link.body}</p>
              <Link href={link.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark">
                {link.label}<ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
