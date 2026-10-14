export type RachelOSUseCase = {
  id: string;
  title: string;
  summary: string;
  flow: [string, string, string];
  question: string;
  problem: string;
  steps: { title: string; context: string; action: string }[];
  mechanism: string;
  adaptation: string;
  discussion: string;
  pressure: string;
  intake: string;
  proof: { image?: string; alt: string; caption: string; evidence: string };
};

export const RACHELOS_CASE_PATH = "/selected-work/from-crm-to-operating-system";

// Fixed teaching examples, not the RachelOS ranking engine or customer records.
// Capability boundaries come from content/proof/rachelos/evidence.yaml.
export const rachelosUseCases: RachelOSUseCase[] = [
  {
    id: "missed-follow-up",
    flow: ["Capture the commitment", "Surface the next action", "Operator follows through"],
    title: "Follow-up keeps slipping",
    summary: "The CRM has the record. The next commitment still gets lost.",
    question: "Why do leads fall through the cracks when we already have a CRM?",
    problem: "A useful conversation happens, a note gets saved, and the next step depends on someone remembering to return to it. The record exists without a clear path back into the day's work.",
    steps: [
      {
        title: "A conversation creates a commitment",
        context: "A prospective buyer says they want to revisit their search after a planned trip. The operator records the timing and the follow-up commitment.",
        action: "Capture the relevant context against the relationship so the next conversation has a starting point.",
      },
      {
        title: "The work becomes visible",
        context: "When the relationship needs attention, the operator needs to see the context and the reason for the next action together.",
        action: "RachelOS's queue brings relationship work and reasons for attention into one operator view.",
      },
      {
        title: "The operator takes the next step",
        context: "The operator can inspect the record, confirm that the proposed touch is appropriate, and decide how to follow up.",
        action: "Record what actually happened so the next person can see the latest conversation and commitment.",
      },
    ],
    mechanism: "Connect the conversation, its context, and the next action. Give the operator a usable place to begin instead of another record to rediscover.",
    adaptation: "For sales, client service, or internal requests, your triggers, owners, due dates, and contact rules would need to be defined. This real-estate example does not establish improved conversion in another business.",
    discussion: "Where does the next commitment live in your business, and what makes it reappear when someone needs to act?",
    pressure: "leads-follow-up",
    intake: "I explored the RachelOS follow-up example. In our business, the next commitment gets lost when…",
    proof: {
      image: "/proof/rachelos/canonical-queue.png",
      alt: "Redacted RachelOS queue showing operating lanes, relationship context, and actions for sample leads.",
      caption: "The operator queue brings work needing attention into view. This existing redacted capture illustrates the interface, not a measured revenue result.",
      evidence: "canonical-queue",
    },
  },
  {
    id: "key-person-dependency",
    flow: ["Capture the context", "Build shared memory", "Hand off with clarity"],
    title: "Everything depends on one person",
    summary: "The team has the tools. One person still holds the operating picture.",
    question: "How do we keep work moving when the person who knows everything is unavailable?",
    problem: "The team can find the contact, but still has to call the principal to understand the relationship. Context, exceptions, and unfinished commitments live in one person's head.",
    steps: [
      {
        title: "The context is scattered",
        context: "A buyer's timing is in a conversation, their preferences are in a note, and an unanswered question is remembered only by the principal.",
        action: "Identify which context someone else would need before making the next decision.",
      },
      {
        title: "Memory belongs to the relationship",
        context: "RachelOS holds relationship context, known facts, recent activity, and open questions in a persistent record.",
        action: "Inspect the relationship's current picture and the activity behind it without reconstructing it from several inboxes.",
      },
      {
        title: "A handoff has a starting point",
        context: "Another authorized operator can inspect what is known and what still needs confirmation before taking over the work.",
        action: "Use shared context to support the handoff. Preserve the need for a person to resolve ambiguity and make the decision.",
      },
    ],
    mechanism: "Capture reusable operating context against the work. A handoff becomes a review of shared memory rather than a request for one person to reconstruct everything.",
    adaptation: "Your permissions, source systems, exception rules, and handoff responsibilities would need to be mapped. Capturing memory supports continuity; it does not make a domain expert interchangeable.",
    discussion: "If your key operator were unavailable tomorrow, which decisions would everyone else struggle to make?",
    pressure: "knowledge-risk",
    intake: "I explored the RachelOS key-person dependency example. The decisions that still depend on one person in our business are…",
    proof: {
      alt: "",
      caption: "RachelOS stores a current relationship picture and activity history. The architecture below explains the handoff; it is an illustrative model, not a client record.",
      evidence: "relationship-memory",
    },
  },
  {
    id: "human-controlled-ai",
    flow: ["Prepare the context", "Human reviews the work", "Act within permissions"],
    title: "AI needs an accountable reviewer",
    summary: "Useful assistance needs context, a review boundary, and someone responsible.",
    question: "How can we use AI in client workflows while keeping people in control?",
    problem: "A polished recommendation is easy to generate. Deciding whether it is supported, appropriate, and ready for a client is a different part of the workflow.",
    steps: [
      {
        title: "Prepare the context",
        context: "Before an assisted recommendation is useful, the operator needs to know which information is recorded and which questions remain open.",
        action: "Show the relationship context and uncertainty alongside the proposed work.",
      },
      {
        title: "Give a person the decision",
        context: "RachelOS includes an operator review surface for inspecting relationship context and deciding the next action.",
        action: "Use that review boundary to check the recommendation, resolve missing context, or leave the action for later.",
      },
      {
        title: "Define what approval permits",
        context: "Reviewing a recommendation, approving a draft, and sending a message are distinct actions. Their permissions depend on the configured workflow.",
        action: "Specify who may approve and act, and retain the decision in the workflow. This walkthrough does not send a message.",
      },
    ],
    mechanism: "Place assistance inside an accountable workflow: context, proposed work, human review, and a defined action boundary.",
    adaptation: "The right controls depend on your risk, permissions, channels, and policies. A review interface does not guarantee factual accuracy, regulatory compliance, or the absence of every automated send.",
    discussion: "What should AI prepare for your team, and which decisions must remain with a named person?",
    pressure: "ai-tools",
    intake: "I explored the RachelOS human-controlled AI example. We want AI to prepare… while a person remains responsible for…",
    proof: {
      image: "/proof/rachelos/human-approval.png",
      alt: "Redacted RachelOS operator review surface showing known context, missing information, a recommended question, and operator controls.",
      caption: "The existing review surface makes context and missing information visible to the operator. It is interface evidence, not a live AI generation or sending demonstration.",
      evidence: "human-approved-ai",
    },
  },
];

export function getRachelOSUseCase(id: unknown) {
  return typeof id === "string" ? rachelosUseCases.find((useCase) => useCase.id === id) : undefined;
}

export function rachelosUseCaseHref(id: string) {
  return `${RACHELOS_CASE_PATH}#use-case-${id}`;
}

export function rachelosUseCaseContactHref(id: string, campaignSearch = "") {
  const target = new URLSearchParams({ useCase: id, cta: `rachelos_use_case_${id}` });
  const campaign = new URLSearchParams(campaignSearch);
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const value = campaign.get(key);
    if (value) target.set(key, value.slice(0, 200));
  }
  return `/contact?${target.toString()}`;
}
