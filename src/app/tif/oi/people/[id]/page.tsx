import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXECUTIVE_BRIEF_SECTION_KEYS, getExecutiveBrief, type BriefSection } from "@/lib/opportunity-intelligence/action/executive-brief";
import { addPersonFact } from "@/app/tif/oi/opportunities/[id]/actions";

export const metadata: Metadata = {
  title: "POIS Executive Brief",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PeoplePageProps = {
  params: Promise<{ id: string }>;
};

const inputClass = "w-full rounded-md border border-input-border bg-white px-3 py-2 text-sm";

export default async function ExecutiveBriefPage({ params }: PeoplePageProps) {
  const { id } = await params;
  const brief = await getExecutiveBrief(id);
  if (!brief) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <Link href={brief.stakeholder ? `/tif/oi/opportunities/${brief.stakeholder.opportunityId}` : "/tif/oi/opportunities"} className="text-sm font-semibold underline">
        Back to workbench
      </Link>

      <header className="mt-4 rounded-md border border-border bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{brief.person.organizationName}</p>
            <h2 className="mt-1 text-2xl font-semibold">{brief.person.name}</h2>
            <p className="mt-1 text-lg">{brief.person.title}</p>
            {brief.stakeholder ? (
              <p className="mt-2 text-sm text-muted">
                Role: {label(brief.stakeholder.role)} · Authority: {brief.stakeholder.authority} · Relationship:{" "}
                {label(brief.stakeholder.relationshipType)}
              </p>
            ) : null}
          </div>
          <div className="rounded-md border border-border bg-[#f7f8fb] p-4 text-sm">
            <p className="font-semibold">ACCESS {brief.stakeholder?.accessScore ?? 0}</p>
            <p className="mt-1 text-muted">{brief.stakeholder?.isSelected ? "Selected stakeholder" : "Not selected"}</p>
          </div>
        </div>
        {brief.person.contactPoints.length > 0 ? (
          <ul className="mt-4 grid gap-1 text-sm text-muted">
            {brief.person.contactPoints.map((point) => (
              <li key={`${point.type}-${point.value}`}>
                {point.type}: {point.value} · {point.provenance}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-6 grid gap-4">
        {EXECUTIVE_BRIEF_SECTION_KEYS.map((key) => (
          <BriefSectionCard key={key} title={sectionTitle(key)} section={brief.sections[key]} />
        ))}
      </div>

      <section className="mt-6 rounded-md border border-border bg-white p-5">
        <h3 className="text-lg font-semibold">Add person fact</h3>
        <form action={addPersonFact} className="mt-4 grid gap-2 md:grid-cols-[1fr_2fr_auto_auto_auto]">
          <input type="hidden" name="personId" value={brief.person.id} />
          <select name="field" className={inputClass} defaultValue="career">
            <option value="career">Career</option>
            <option value="responsibilities">Responsibilities</option>
            <option value="public_interviews">Public interviews</option>
            <option value="conference_talks">Conference talks</option>
          </select>
          <input name="value" className={inputClass} placeholder="Fact" />
          {/* `stated` is deliberately absent: it requires offsets into immutable source text
              (Rule 5), which this form cannot supply. Stated person facts come from intake
              extraction. The server rejects a forged `stated` submission regardless. */}
          <select name="basis" className={inputClass} defaultValue="operator">
            <option value="operator">operator</option>
            <option value="inferred">inferred</option>
          </select>
          <input name="confidence" className={inputClass} type="number" min="1" max="100" defaultValue="85" />
          <button className="rounded-md bg-[#17375e] px-3 py-2 text-sm font-semibold text-white">Add fact</button>
        </form>
        <p className="mt-3 text-xs text-muted">
          Sourced (&ldquo;stated&rdquo;) facts are captured through intake, where the exact source offsets are recorded.
        </p>
      </section>
    </section>
  );
}

function BriefSectionCard({ title, section }: { title: string; section: BriefSection }) {
  return (
    <section className={`rounded-md border p-5 ${section.items.some((item) => item.basis === "inferred") ? "border-dashed border-[#7c6b2f] bg-[#fffdf4]" : "border-border bg-white"}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {section.items.some((item) => item.basis === "inferred") ? <span className="text-xs font-semibold uppercase text-[#7c6b2f]">inferred</span> : null}
      </div>
      {section.isEmpty ? (
        <p className="mt-3 text-sm text-muted">Research: {section.gapPrompt}</p>
      ) : (
        <ul className="mt-3 grid gap-2">
          {section.items.map((item, index) => (
            <li key={`${item.text}-${index}`} className={`text-sm ${item.basis === "inferred" ? "hypothesis-inferred" : item.basis === "operator" ? "fact-operator" : "fact-stated"}`}>
              <span>{item.text}</span>
              <span className="ml-2 text-muted">
                {item.basis} {item.confidence}% {item.sourceUrl ? "source" : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function sectionTitle(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function label(value: string) {
  return value.replaceAll("_", " ");
}
