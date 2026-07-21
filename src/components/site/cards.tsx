import { ArrowLink } from "@/components/ui/arrow-link";
import { Card } from "@/components/ui/card";
import { caseStudies } from "@/lib/content";

export function CaseStudyCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {caseStudies.map((study) => (
        <Card key={study.slug}>
          <div className="flex flex-wrap gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
            <span>{study.classification}</span>
            <span>/</span>
            <span>{study.industry}</span>
          </div>
          <h3 className="mt-6 text-2xl font-semibold">{study.title}</h3>
          <p className="mt-4 text-base leading-7 text-muted">{study.trigger}</p>
          <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
            <span className="font-semibold text-primary">Evidence boundary: </span>
            {study.evidenceLimit}
          </p>
          <ArrowLink href={`/selected-work/${study.slug}`} className="mt-8">
            Review the evidence
          </ArrowLink>
        </Card>
      ))}
    </div>
  );
}
