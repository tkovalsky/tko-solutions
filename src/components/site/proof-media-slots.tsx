import Link from "next/link";
import { ArrowRight, FileSearch, ShieldCheck } from "lucide-react";
import { VideoEmbed } from "@/components/media/video-embed";

type Walkthrough = {
  id: string;
  kind: "rachelos" | "healthcare";
  title: string;
  summary: string;
  points: string[];
  href: string;
  linkLabel: string;
  src?: string;
  poster?: string;
  caption?: string;
};

// Each card is also a recording slot. Replace its explanatory card with the
// player by adding a reviewed Loom, Mux, YouTube embed URL or local video URL.
// Do not label automated walkthroughs as Todd's narrated recordings.
const walkthroughs: Walkthrough[] = [
  {
    id: "buyer-research",
    kind: "rachelos",
    title: "Own the path from buyer research to inquiry",
    summary: "Useful content gives buyers a reason to come to you. The operating system carries their question into the next conversation.",
    points: ["Answer a real buyer question", "Capture an inquiry with permission", "Keep context, ownership, and the next step together"],
    href: "/private-client-os",
    linkLabel: "Explore the owned-demand build",
  },
  {
    id: "governed-drafting",
    kind: "rachelos",
    title: "The model prepares. The operator decides.",
    summary: "RachelOS moved away from autonomous AI nurture after documented factual and quality failures. The current pattern puts exact-message review around AI-assisted outreach.",
    points: ["Keep recorded facts separate from proposed prose", "Record model attempts and classify failures", "Review the exact message before AI-assisted outreach"],
    href: "/selected-work/from-crm-to-operating-system#architecture-explorer",
    linkLabel: "Inspect the controls",
  },
  {
    id: "policy-trace",
    kind: "healthcare",
    title: "Watch a synthetic policy decision trace",
    summary: "Change a controlling fact and inspect the operational route and downstream claims artifact.",
    points: [],
    href: "/healthcare/impact-assessment#authorization-decision-lab",
    linkLabel: "Run the interactive decision lab",
    src: "/videos/healthcare-decision-lab.webm",
    poster: "/videos/healthcare-decision-lab-poster.webp",
    caption: "Automated walkthrough of TKO's educational prototype. Rules and identifiers are synthetic; no PHI or clinical determination. Use the interactive lab to change the facts yourself.",
  },
];

export function ProofMediaSlots({ kind = "all" }: { kind?: "rachelos" | "healthcare" | "all" }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2" aria-label="Proof walkthroughs">
      {walkthroughs.filter((item) => kind === "all" || item.kind === kind).map((item) => (
        <article key={item.id} id={`walkthrough-${item.id}`} className={item.src ? "scroll-mt-24 lg:col-span-2" : "scroll-mt-24 rounded-xl border border-border bg-white p-7 text-foreground md:p-9"}>
          {item.src ? (
            <VideoEmbed title={item.title} src={item.src} poster={item.poster} caption={item.caption} />
          ) : (
            <>
              {item.id === "buyer-research" ? <FileSearch className="size-7 text-primary" aria-hidden /> : <ShieldCheck className="size-7 text-primary" aria-hidden />}
              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-muted">{item.summary}</p>
              <ol className="mt-6 space-y-3 text-sm">
                {item.points.map((point, index) => <li key={point} className="flex gap-3"><span className="font-mono text-primary">0{index + 1}</span><span>{point}</span></li>)}
              </ol>
            </>
          )}
          <Link href={item.href} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
            {item.linkLabel}<ArrowRight className="size-4" aria-hidden />
          </Link>
        </article>
      ))}
    </div>
  );
}
