import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const links = [
  { title: "Related problems", body: "Find the operating question before choosing a service.", href: "/problems", label: "Explore problems" },
  { title: "Related guides", body: "Read the evidence-led executive guides.", href: "/insights", label: "Read guides" },
  { title: "Related diagrams", body: "Inspect decision, workflow, and governance models.", href: "/diagrams", label: "Browse diagrams" },
  { title: "Related proof", body: "See direct system proof and bounded operating patterns.", href: "/proof", label: "Review proof" },
  { title: "Founder record", body: "Follow the operating judgment behind the work.", href: "/proof/founder", label: "Meet the founder" },
  { title: "Services", body: "One accountable path from strategy to production—start with the lane under pressure.", href: "/services", label: "View services" },
];

export function AuthorityLinks({ current }: { current?: string }) {
  return (
    <section aria-label="Related authority assets" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Connected authority</p>
        <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Follow the evidence from problem to next move.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
