import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { services } from "@/lib/content";

// Public commercial path: one flagship diagnostic, then a bounded implementation.
const pathOrder = [
  "diagnostic",
  "operating-system-build",
] as const;

const stageLabels: Record<(typeof pathOrder)[number], string> = {
  diagnostic: "Diagnostic",
  "operating-system-build": "Implementation",
};

export function EngagementPath() {
  const steps = pathOrder
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service));

  return (
    <ol className="grid gap-4 lg:grid-cols-2" aria-label="Engagement path">
      {steps.map((service, index) => (
        <li key={service.slug} className="relative flex">
          <div className="flex w-full flex-col border border-border bg-white p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Step {index + 1} · {stageLabels[service.slug as (typeof pathOrder)[number]]}
              </p>
              {index < steps.length - 1 ? (
                <ArrowRight
                  className="hidden size-4 text-muted lg:block"
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-border py-4 text-sm">
              <div>
                <dt className="text-muted">Duration</dt>
                <dd className="mt-0.5 font-semibold">{service.duration}</dd>
              </div>
              <div>
                <dt className="text-muted">Commercial model</dt>
                <dd className="mt-0.5 font-semibold">{service.price}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-6 text-muted">{service.summary}</p>
            <p className="mt-4 text-sm leading-6 text-foreground">
              <span className="font-semibold text-primary">Outcome: </span>
              {service.outcomes[0]}
            </p>
            <ArrowLink href={`/services/${service.slug}`} className="mt-auto pt-6">
              View {stageLabels[service.slug as (typeof pathOrder)[number]].toLowerCase()}
            </ArrowLink>
          </div>
        </li>
      ))}
    </ol>
  );
}
