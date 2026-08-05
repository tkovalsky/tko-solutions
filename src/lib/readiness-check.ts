// The Program Recovery Readiness Check.
//
// Twelve questions an executive can work through without contacting anyone. Each
// question has a documentary answer or it does not, and the pattern of missing
// answers is the finding.
//
// Deliberately static and email-free: the page is useful on its own. It earns the
// conversation rather than gating the content behind a form.

export const READINESS_CHECK_PATH = "/program-recovery-readiness-check";

export type ReadinessQuestion = {
  number: number;
  question: string;
  /** What a weak answer sounds like: the tell that this area needs work. */
  weakAnswer: string;
};

export type ReadinessTheme = {
  slug: string;
  name: string;
  premise: string;
  questions: ReadinessQuestion[];
};

export const readinessThemes: ReadinessTheme[] = [
  {
    slug: "outcomes",
    name: "Outcomes",
    premise:
      "A program that cannot state the operating change it will produce is measuring delivery instead of value.",
    questions: [
      {
        number: 1,
        question:
          "What operating change will be true when this program is finished, stated so someone outside the program could verify it?",
        weakAnswer:
          "A list of systems, deliverables, or milestones rather than a description of how work will happen differently.",
      },
      {
        number: 2,
        question: "If the program stopped next month, what would the organization have permanently gained?",
        weakAnswer:
          "Very little. Value was sequenced entirely to the end, which is a recoverable design error only if it is named early.",
      },
    ],
  },
  {
    slug: "decision-rights",
    name: "Decision rights",
    premise:
      "Most stalled programs are waiting on a small number of decisions that no individual has authority to make.",
    questions: [
      {
        number: 3,
        question:
          "Which decisions has this program been waiting on for more than thirty days, and who owns each one by name?",
        weakAnswer:
          "The list cannot be produced quickly, or the owners are committees and forums rather than people.",
      },
      {
        number: 4,
        question:
          "When two workstreams disagree on a cross-functional decision, who settles it without going to the steering committee?",
        weakAnswer:
          "Everything escalates. If the steering committee meets monthly, every disagreement costs a month.",
      },
    ],
  },
  {
    slug: "workflow-ownership",
    name: "Workflow ownership",
    premise:
      "Technical delivery lands on an unchanged operation unless a line executive has agreed to change how their organization works.",
    questions: [
      {
        number: 5,
        question:
          "Which line executive has agreed to change how their organization operates, and what are they measured on?",
        weakAnswer:
          "The program director is the only named owner. The program has no operating-model owner in the line organization.",
      },
      {
        number: 6,
        question:
          "Who is accountable for adoption, as distinct from delivery, and what are they measured on?",
        weakAnswer:
          "The same person, on the same measures, with training completion standing in for adoption.",
      },
    ],
  },
  {
    slug: "dependencies",
    name: "Dependencies",
    premise:
      "Programs rarely fail inside a workstream. They fail at the boundaries, and boundaries have no reporting line.",
    questions: [
      {
        number: 7,
        question:
          "Name every workstream reporting green whose deliverable another workstream is currently blocked on.",
        weakAnswer:
          "Nobody can produce this from existing reporting, which means the reporting is not showing enterprise risk.",
      },
      {
        number: 8,
        question:
          "Which external dependency (a vendor, a regulator, another program) could stop this work, and who is managing it?",
        weakAnswer:
          "The risk is documented in a register but no individual is actively working it.",
      },
    ],
  },
  {
    slug: "operating-measures",
    name: "Operating measures",
    premise:
      "A program measured against an unverified baseline cannot demonstrate whether it worked.",
    questions: [
      {
        number: 9,
        question: "What baseline will this program be judged against, and when was it last verified?",
        weakAnswer:
          "The baseline comes from the original business case and has not been revalidated since approval.",
      },
      {
        number: 10,
        question:
          "Which assumption in the original business case is no longer true, and when did it stop being true?",
        weakAnswer:
          "\"None.\" After eighteen months in healthcare, that usually means nobody has checked.",
      },
    ],
  },
  {
    slug: "ai-and-automation-readiness",
    name: "AI and automation readiness",
    premise:
      "Automating a workflow whose authority model was never written down makes the ambiguity faster, not cheaper.",
    questions: [
      {
        number: 11,
        question:
          "For the workflow you intend to automate, can you produce the decision inventory: which decisions are routine, which are exceptions, and which require clinical or expert judgment?",
        weakAnswer:
          "No such list exists. Without it the automation scope cannot be defined, only estimated.",
      },
      {
        number: 12,
        question:
          "Take one significant decision from ninety days ago and reconstruct it: the inputs, the rule applied, the approver, and the rationale. Can you?",
        weakAnswer:
          "You cannot. Adding machine-assisted determinations on top of that will make the audit position worse, not better.",
      },
    ],
  },
];

export const readinessInterpretation = [
  {
    range: "0–2 unclear",
    heading: "The structure is sound.",
    body:
      "Where a program with clear answers is still behind, the constraint is usually capacity or sequencing rather than design. That is a management problem, and an outside review is unlikely to tell you much you do not already know.",
  },
  {
    range: "3–5 unclear",
    heading: "There is a structural gap worth naming before the next milestone.",
    body:
      "A cluster of unclear answers in one theme locates the problem precisely. Work that theme first, internally, and re-run the check. If the same answers stay unclear after a genuine attempt, the gap is not one of effort.",
  },
  {
    range: "6 or more unclear",
    heading: "The program is running on assumptions.",
    body:
      "At this point additional funding or an automation decision is being made without the information required to make it. An independent review before that commitment is usually cheaper than discovering the same thing two quarters later.",
  },
];

export const totalReadinessQuestions = readinessThemes.reduce(
  (count, theme) => count + theme.questions.length,
  0,
);
