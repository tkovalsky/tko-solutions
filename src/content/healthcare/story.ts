import { disclosure } from "@/lib/disclosure";

export const storyCopy = {
  hero: {
    badge: "Healthcare Case Study",
    title: "NO PA REQUIRED — CREATE ADVANCED NOTIFICATION",
    subtitle: `The simplest-looking change in American healthcare. It took a dozen systems, multiple programs, and two and a half years to make it true.`,
  },

  promise: {
    headline: "The promise of gold carding.",
    content: `If a provider's prior authorization requests are almost always approved, stop making them ask. It's a simple idea that cuts administrative burden and accelerates care. It's also becoming the law—from the CMS interoperability and prior authorization rule to a growing list of state mandates.`,
  },

  hardPart: {
    headline: "Removing a step isn't deleting it.",
    content: `Taking a step out of healthcare is never as simple as deleting it. Bypassing a process is not the same as removing it. The design problem is continuity, not deletion.`,
    pullQuote: `Claims still need an authorization to pay against. If we just turn off the review, the claim fails. The new path has to slot an Advanced Notification exactly where the old authorization used to sit.`,
  },

  multiplies: {
    headline: "Then it multiplies.",
    content: `Every new program is the same idea with entirely different facts. The provider × code × program matrix explodes.`,
    columns: disclosure.showPediatric ? [
      { title: disclosure.programNational, description: "National criteria, distinct code sets, regular recalculations." },
      { title: disclosure.programState, description: "State-specific rules, legislative deadlines, unique appeals paths." },
      { title: disclosure.programRural, description: "Rural hospital exemptions, different provider matching logic." },
      { title: disclosure.programPediatric, description: "Children's hospital carve-outs and specialized logic." }
    ] : [
      { title: disclosure.programNational, description: "National criteria, distinct code sets, regular recalculations." },
      { title: disclosure.programState, description: "State-specific rules, legislative deadlines, unique appeals paths." },
      { title: disclosure.programRural, description: "Rural hospital exemptions, different provider matching logic." },
    ]
  },

  humanApi: {
    title: "My title was Release Train Engineer.",
    intro: `For two and a half years at ${disclosure.employerName}, I was the human API holding these ${disclosure.genericGoldCardDescription} together. The real job was this:`,
    responsibilities: [
      "tech roadmap",
      "exec metrics",
      "architecture alignment",
      "API contracts",
      "test data",
      "testing coordination",
      "financials",
      "forecasts",
      "attribution",
      "weekly summaries",
      "status reporting",
      "\"can you just...\""
    ],
    outro: `The program's memory wasn't in Jira, Confluence, or SharePoint. It was in me. That works, right up until the human API is out sick the week of go-live.`,
  },

  toddOs: {
    headline: "The machine that doesn't forget.",
    intro: `I built ToddOS because relying on human memory at enterprise scale is a delivery risk. It's the method that turns scattered information into follow-up, decisions, and work that moves.`,
    panels: [
      {
        title: "Capture",
        content: `Every decision, change, and "why" is recorded as it happens, not reconstructed later.`
      },
      {
        title: "Structure",
        content: `Programs, codes, rules, owners, dates: facts with sources.`
      },
      {
        title: "Govern",
        content: `Humans decide. Unknown means ask. Every decision leaves a receipt.`
      },
      {
        title: "Assist",
        content: `AI drafts the weekly summary, the exec metrics, the impact analysis. You approve.`
      }
    ],
    week31: {
      label: "Illustrative · Synthetic",
      scenario: `A state program's code list changes on a Thursday.`,
      question: `"Which providers lose their waiver, which claims are in flight, and who has to sign off?"`,
      before: `Three days of Teams archaeology and two people who remember.`,
      after: `40 seconds. The affected set, the rule that changed, who approved the original, the downstream artifacts, and a drafted impact note waiting for a human to approve.`
    }
  },

  interactiveProof: {
    headline: "See it run.",
    content: `One MRI. Two lanes. See exactly where the work goes when the rules change.`,
    failures: [
      "Claims can't read the notification",
      "Qualification expired yesterday",
      "Portal and API disagree",
      "A required fact is missing"
    ]
  },

  rules: {
    headline: "The rules I won't break.",
    lines: [
      "AI assists. It never approves, denies, or pays.",
      "The machine can say yes. Only a human can say no.",
      "Missing facts don't get guessed. They get escalated.",
      "Every number shows its work."
    ]
  },

  bridge: {
    headline: "It's not a healthcare trick.",
    content: `RachelOS is the same machine, running a real business every day. ToddOS is the method. RachelOS is the proof that it runs in production.`,
    linkText: "See How RachelOS Was Built"
  },

  cta: {
    primary: {
      title: "Running a program like this?",
      linkText: "Regulatory Implementation Readiness Sprint",
      href: "/services"
    },
    secondary: {
      title: "Building a team that needs this?",
      linkText: "Let's talk on LinkedIn",
      href: "https://www.linkedin.com/in/toddkovalsky" // Check global link? We can import site.
    }
  }
};
