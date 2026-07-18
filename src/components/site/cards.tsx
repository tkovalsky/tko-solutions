import { ArrowLink } from "@/components/ui/arrow-link";
import { Card } from "@/components/ui/card";
import { caseStudies, services } from "@/lib/content";

export function ServiceCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => {
        const investment =
          "investmentSummary" in service ? service.investmentSummary : service.price;
        return (
          <Card key={service.slug} className="flex min-h-80 flex-col">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              {service.entry}
            </p>
            <h3 className="mt-6 text-2xl font-semibold">{service.title}</h3>
            <p className="mt-4 text-base leading-7 text-muted">{service.summary}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
              <div>
                <dt className="text-muted">Investment</dt>
                <dd className="mt-1 font-semibold">{investment}</dd>
              </div>
              <div>
                <dt className="text-muted">Timeline</dt>
                <dd className="mt-1 font-semibold">{service.duration}</dd>
              </div>
            </dl>
            <ArrowLink href={`/services/${service.slug}`} className="mt-auto pt-8">
              View service
            </ArrowLink>
          </Card>
        );
      })}
    </div>
  );
}

export function CaseStudyCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {caseStudies.map((study) => (
        <Card key={study.slug}>
          <div className="flex flex-wrap gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
            <span>{study.industry}</span>
            <span>/</span>
            <span>{study.proofLevel}</span>
          </div>
          <h3 className="mt-6 text-2xl font-semibold">{study.title}</h3>
          <p className="mt-4 text-base leading-7 text-muted">{study.problem}</p>
          <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
            <span className="font-semibold text-primary">Outcome: </span>
            {study.outcome}
          </p>
          <ArrowLink href={`/selected-work/${study.slug}`} className="mt-8">
            View selected work
          </ArrowLink>
        </Card>
      ))}
    </div>
  );
}
