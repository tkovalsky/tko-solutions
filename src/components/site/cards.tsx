import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { caseStudies, services } from "@/lib/content";

export function ServiceCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.slug} className="flex min-h-80 flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {service.entry}
          </p>
          <h3 className="mt-6 text-2xl font-semibold">{service.title}</h3>
          <p className="mt-4 text-base leading-7 text-muted">{service.summary}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-muted">Position</dt>
              <dd className="mt-1 font-semibold">{service.price}</dd>
            </div>
            <div>
              <dt className="text-muted">Timeline</dt>
              <dd className="mt-1 font-semibold">{service.duration}</dd>
            </div>
          </dl>
          <Link
            href={`/services/${service.slug}`}
            className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold uppercase tracking-[0.08em] text-primary"
          >
            View service
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Card>
      ))}
    </div>
  );
}

export function CaseStudyCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {caseStudies.map((study) => (
        <Card key={study.slug}>
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            <span>{study.industry}</span>
            <span>/</span>
            <span>{study.proofLevel}</span>
          </div>
          <h3 className="mt-6 text-2xl font-semibold">{study.title}</h3>
          <p className="mt-4 text-base leading-7 text-muted">{study.problem}</p>
          <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
            <span className="font-semibold text-primary">Outcome — </span>
            {study.outcome}
          </p>
          <Link
            href={`/case-studies/${study.slug}`}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary"
          >
            Read case study
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Card>
      ))}
    </div>
  );
}

