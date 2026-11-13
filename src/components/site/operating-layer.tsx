import { ArrowDown, ArrowRight } from "lucide-react";

// Client-neutral conceptual model of the operating layer. Built from text and lists (not an
// image) so it reads correctly to screen readers and reflows on a phone. It is a method, not a
// deployed product; the caption says so.

export const operatingLayerInputs = [
  "CRM",
  "ERP",
  "Email",
  "Spreadsheets",
  "Delivery and ticketing tools",
  "Documents",
  "Databases",
  "Workflow tools",
] as const;

export const operatingLayerStages = [
  { name: "Connect", governance: "Signal", description: "Read from the systems you already use. Nothing is ripped out." },
  { name: "Understand", governance: "Fact", description: "Turn records into facts: what this is, who it belongs to, what is missing." },
  { name: "Decide", governance: "State → Decision", description: "Apply explicit rules for what needs attention now and who owns it." },
  { name: "Execute", governance: "Action", description: "Put the next action in front of the accountable person. People approve consequential steps." },
  { name: "Verify", governance: "Outcome", description: "Record what happened and the evidence for it." },
  { name: "Improve", governance: "Review", description: "Review exceptions and change the rules on purpose, not by drift." },
] as const;

export const operatingLayerOutcomes = [
  "Clear ownership",
  "Visible next actions",
  "Earlier exception detection",
  "Less manual reconciliation",
  "Better evidence",
  "More reliable execution",
] as const;

export function OperatingLayer() {
  return (
    <figure aria-labelledby="operating-layer-caption" className="mt-12">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_auto_1.6fr_auto_0.8fr] lg:items-stretch">
        <section aria-labelledby="ol-inputs" className="rounded-xl border border-border bg-white p-6">
          <h3 id="ol-inputs" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Your existing systems</h3>
          <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
            {operatingLayerInputs.map((input) => (
              <li key={input} className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm">{input}</li>
            ))}
          </ul>
        </section>

        <Connector />

        <section aria-labelledby="ol-layer" className="rounded-xl border-2 border-primary bg-white p-6">
          <h3 id="ol-layer" className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">The operating layer</h3>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {operatingLayerStages.map((stage, index) => (
              <li key={stage.name} className="rounded-lg border border-border bg-surface p-4">
                <p className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold"><span className="mr-2 font-mono text-sm text-primary">{index + 1}</span>{stage.name}</span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">{stage.governance}</span>
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">{stage.description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-6 text-muted">
            AI helps extract, summarize, draft, and flag. Rules set the state of the work, and a person approves anything consequential.
          </p>
        </section>

        <Connector />

        <section aria-labelledby="ol-outcomes" className="rounded-xl border border-border bg-white p-6">
          <h3 id="ol-outcomes" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">What changes</h3>
          <ul className="mt-4 space-y-2">
            {operatingLayerOutcomes.map((outcome) => (
              <li key={outcome} className="border-l-2 border-primary pl-3 text-sm font-medium">{outcome}</li>
            ))}
          </ul>
        </section>
      </div>
      <figcaption id="operating-layer-caption" className="mt-4 max-w-[80ch] text-sm leading-6 text-muted">
        A conceptual model, not a packaged product. Each engagement builds only the parts a given workflow needs, on top of the tools you already have. The small labels show the governance model underneath: Signal → Fact → State → Decision → Action → Outcome.
      </figcaption>
    </figure>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-primary">
      <ArrowDown className="size-5 lg:hidden" />
      <ArrowRight className="hidden size-5 lg:block" />
    </div>
  );
}
