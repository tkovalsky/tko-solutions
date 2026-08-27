---
title: "Prior Authorization Is a Decision-Rights Problem"
description: "Prior authorization stalls because exception authority, escalation logic, and auditability live in individual heads. A guide to diagnosing and measuring it before funding automation."
business_unit: tko
voice: tko-advisory
cluster: prior-authorization-operations
primary_buyer: >-
  VP Utilization Management, VP Prior Authorization, VP Clinical Operations, COO, and
  Chief Transformation Officers at health plans, healthcare services organizations, and
  PE-backed provider platforms.
buyer_problem: >-
  Prior authorization consumes large amounts of staff effort and produces results that vary
  by who handles the case, and the automation already funded has not changed either fact.
trigger_signal: >-
  A prior authorization platform, AI intake tool, Gold Card program, or CMS interoperability
  build is being funded, or an administrative-cost target has landed on the operating plan.
search_intent: >-
  Why prior authorization automation is not reducing administrative burden, and what to
  measure or fix before spending more.
problem_hypothesis: >-
  The expensive failure in prior authorization is rarely clinical content or portal speed. It
  is that decision rights, exception routing, and workflow ownership were never made explicit
  enough for any system to govern.
point_of_view: >-
  Prior authorization is an authority-model problem wearing a technology costume. Until an
  organization can state who decides what, on what evidence, with what escalation path,
  automation makes the existing ambiguity faster rather than cheaper.
relevant_proof: >-
  Direct enterprise experience in prior authorization, utilization management, and payer
  operations, including program delivery for a waiver and advanced-notification path that
  removed traditional authorization review for qualifying provider-code combinations while
  preserving downstream claims processing.
ai_useful: >-
  AI is genuinely useful for bounded, reviewable work: detecting missing information at
  intake, summarizing an assembled case for a human reviewer, classifying denial reasons for
  root-cause analysis, and drafting documentation a named person approves.
ai_not_answer: >-
  AI is not the answer where the governing rule is undocumented, where exception authority is
  ambiguous, or where the organization cannot reconstruct why a decision was made. Applied
  there, it industrializes an authority gap and creates a new audit problem.
diagnostic_questions:
  - "Which prior authorization decisions are routine, which are exceptions, and which require clinical review, and can you produce that list today?"
  - "Who holds authority at each tier, and where is that authority written down rather than remembered?"
  - "When a case leaves the standard path, what routes it, and what happens if that person is unavailable?"
  - "Can you reconstruct the source, owner, evidence, and rationale for an important decision made ninety days ago?"
  - "Which of your denial categories are operationally avoidable, and which reflect genuine clinical disagreement?"
  - "What proportion of staff effort is spent assembling information that already existed somewhere in the organization?"
recommended_action: >-
  Establish an operational baseline and an explicit authority map for one bounded workflow
  before committing further platform, staffing, or automation spend.
offer: transformation-diagnostic
cta: "Discuss a Transformation"
status: published
reviewer: "Todd Kovalsky"
reviewed_date: "2026-08-05"
sources:
  - healthcare:prior-auth-decision-rights
  - healthcare:human-api-root-pattern
  - https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f
  - https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/frequently-asked-questions/prior-authorization-api
  - https://www.ama-assn.org/practice-management/prior-authorization/ama-prior-authorization-physician-survey
date: "2026-08-05"
slug: prior-authorization-is-a-decision-rights-problem
published: true
featured: true
# Internal evidence trail (not rendered):
# - Decision handling varies when authority lives in individual heads. Evidence: healthcare:prior-auth-decision-rights; content/proof/healthcare/evidence.yaml#prior-auth-decision-rights and HEALTHCARE_EXPERIENCE_LIBRARY.md section 1. Guard: advisory pattern, no organization or metric.
# - Human API dependency recurs across healthcare operations. Evidence: healthcare:human-api-root-pattern; content/proof/healthcare/evidence.yaml#human-api-root-pattern and the cross-cutting experience-library pattern. Guard: advisory pattern, no organization or metric.
# - Certain requests continue to require clinical review under the CMS prior-authorization rule. Evidence: public CMS guidance cited in the guide. Guard: no organization-specific compliance interpretation.
# - Physicians report substantial administrative burden from prior authorization. Evidence: public AMA physician survey cited in the guide. Guard: directional self-reported evidence, not an organization-specific measure.
---

A prior authorization request arrives. Whether it is approved, delayed, or denied may depend less on the clinical facts than on which staff member picks it up: what they know, who they call when the case does not fit the standard pattern, and how they were trained to handle exceptions.

None of that authority model is visible to most systems. That is the business problem.

Prior authorization is routinely treated as a technology problem. It is more usefully treated as a decision-rights, exception-routing, and auditability problem that technology can support only after the authority model is explicit. Organizations that skip that step buy faster tools and keep the same variance.

## Why This Is Not Simply a Staffing or Automation Problem

The two most common explanations for prior authorization cost are that the team is understaffed and that the work is insufficiently automated. Both are plausible. Both are usually incomplete.

Add staff to a workflow with implicit decision rights and you add people who each develop their own version of the rules. Consistency gets worse, not better, and the organization now has more individuals whose absence creates delay.

Add automation to the same workflow and the standard path gets faster while the exception path, which is where the cost concentrates, stays exactly as it was. Worse, automation tends to increase exception volume in the short term, because a faster standard path surfaces the cases that never fit it.

CMS has been explicit that certain requests will continue to require clinical review even as prior authorization APIs become standard. An API changes how a request moves. It does not decide who has authority when the request does not fit.

The failure mode is not the technology. It is sequencing: automating a workflow whose authority model was never written down.

## The Decision Model Is Usually Implicit

Most prior authorization teams have policies, workflows, and tools. The fragile part is the operational judgment between them.

Who decides when a case is complete enough to submit? Who knows which payer-specific exception applies? Who escalates a borderline denial? Who has authority to override the normal path? Who reviews the cases that do not fit?

When those answers live in individual heads, the same case moves differently depending on who handles it. The policy did not change. The workflow did not officially change. The decision rights were never made explicit enough for a system to govern.

That produces three costs at once: **delay**, because exceptions wait for specific people; **inconsistency**, because the same facts produce different handling; and **audit exposure**, because the organization cannot always show why a decision went one way rather than another.

### The human API pattern

The pattern is simple: a person becomes the interface to critical operational knowledge.

In prior authorization, that person knows payer-specific requirements, escalation paths, documentation details, exception rules, and the practical order in which work should move. The organization depends on them because the actual decision model was never captured anywhere else.

This is not a criticism of the individual. It is usually a sign that someone competent absorbed the complexity the operating model failed to handle. But it means the organization's authorization performance is a function of one person's availability. That is a structural risk, not a personnel issue.

### A concrete example

Consider a request that does not fit the standard path. Intake is complete enough to start, but a specific payer routinely rejects this case type unless an extra supporting detail is attached. One experienced staff member knows that. A newer staff member does not.

The first version moves cleanly. The second stalls or returns denied.

That variance is not caused by a missing portal. It is caused by exception knowledge living outside the governed workflow. A faster portal makes the wrong path faster. AI-assisted intake summarizes the case without knowing who has authority to decide the exception.

## Exception Routing Is Where the Money Is

Most prior authorization improvement programs optimize the standard path, because it is the one that is documented and the one that dominates volume. The cost, however, concentrates in the minority of cases that leave it.

Exception routing deserves to be designed explicitly:

- **What qualifies as an exception**, stated as categories rather than as a residual "everything else" bucket.
- **Where each category routes**, to a role rather than to a named individual.
- **What evidence each category requires** before it can move.
- **What happens when the route is unavailable**: the fallback, not the informal workaround.
- **How long a category may sit** before it escalates automatically.

An organization that cannot produce that table does not have an exception process. It has a set of habits that happen to work while the experienced people are present.

## Workflow Ownership

Decision rights answer *who decides*. Workflow ownership answers *who is accountable for the workflow working at all*, a different question that is frequently unassigned.

Prior authorization typically spans intake, clinical review, revenue cycle, provider relations, technology, and compliance. Each function owns a segment. Very often no single role owns the end-to-end result, which means no one is accountable when the handoffs are the problem.

The diagnostic question is direct: if turnaround time degrades by thirty percent next quarter, whose objective is missed? If the honest answer is "several people partially," the workflow is unowned, and improvement efforts will keep dissolving at function boundaries.

## Operational Quality: What to Measure First

An authority model becomes actionable only when it is attached to measurement. The baseline does not need to be elaborate. It needs to connect effort and outcomes to decisions leaders can actually make.

| Measure | Practical definition | Decision it supports | Important caveat |
|---|---|---|---|
| Staff touches per case | Every handoff, follow-up, correction, or status check required to complete one request | Where to simplify the workflow | A low average can hide a small group of very costly exceptions |
| Staff minutes per case | Active work time, separated from elapsed payer response time | Staffing, standardization, and automation priorities | Sample the work; do not ask staff to estimate from memory |
| Clean submission rate | Requests accepted without missing-information follow-up or internal correction | Documentation and intake improvements | Define "clean" consistently before comparing teams |
| Avoidable denial rate | Denials tied to preventable documentation, eligibility, routing, or timing failures | Root-cause fixes and training | Clinical disagreement is not an operational failure |
| Median turnaround time | Time from a complete request to a decision, by request type and payer | Service expectations and escalation rules | Report expedited and standard requests separately |
| Aged exception inventory | Open requests outside the normal path or expected response window | Exception ownership and escalation capacity | A queue count alone does not reveal why work is stuck |

CMS requires impacted payers to report certain prior authorization metrics, including approval, denial, and decision-time measures. Those published metrics provide useful external context. They do not replace an internal view of staff effort, submission quality, handoffs, and rework.

### Segment before drawing conclusions

A single organization-wide average is rarely actionable. At minimum, segment by request type or specialty; payer and plan; routine versus expedited; initial request versus resubmission or appeal; standard path versus exception; and location or team where workflows differ.

The aim is not a perfect dashboard. It is to find a repeatable concentration of avoidable work that can be addressed without making clinical judgment less safe.

### An illustrative case

Suppose one denial category appears across several service lines. Initially it looks like a single payer problem. A case-level review shows three different causes: incomplete documentation at intake, an outdated routing rule, and cases that genuinely require clinical review.

Treating all three as one automation opportunity would hide the real work. The first calls for a clearer intake control, the second for maintained routing logic, and the third for explicit clinical decision rights. This example is illustrative, not a reported client result.

## Where AI Helps

AI earns its place in prior authorization where the task is bounded, the output is reviewable, and a named human remains accountable:

- **Missing-information detection at intake**: identifying what a request lacks before it is submitted, which is among the highest-value administrative capabilities available.
- **Case summarization for human reviewers**: assembling scattered documentation into a reviewable summary, shortening preparation without moving the decision.
- **Denial classification for root-cause analysis**: clustering denial reasons at volumes no analyst would work through manually.
- **Draft documentation and correspondence**: producing a first draft a qualified person edits and approves.
- **Prioritization support**: surfacing which cases need attention now and what each is waiting on.

The common thread: the machine assembles, detects, drafts, and ranks. It does not decide.

## Where AI Creates Additional Risk

The same technology becomes a liability under three conditions.

**When the governing rule is undocumented.** A model trained or prompted against inconsistent historical handling learns the inconsistency. It then applies it at scale and with an appearance of authority.

**When exception authority is ambiguous.** Automating the standard path while leaving exceptions to informal routing increases exception volume and removes the slack the experienced staff were using to absorb it.

**When decisions cannot be reconstructed.** If an organization cannot show the evidence, the rule applied, the human who approved it, and the reason, then AI-assisted determinations create an audit problem that did not previously exist. This risk is highest precisely where organizations are most eager to deploy: high-volume administrative determinations.

There is a fourth, quieter risk: automation makes the human API dependency invisible rather than resolving it. The organization stops noticing that one person is still the only one who knows why the exception rule exists, because throughput improved.

## An Executive Diagnostic Framework

Before committing to a prior authorization platform, an automation vendor, a Gold Card program, or an AI initiative, work through five questions in order. Each has a documentary answer or it does not.

**1. Decision inventory.** Can you produce a list of the decisions made in this workflow, classified as routine, exception, or clinical review? *If not, you cannot scope automation, because you cannot say what is being automated.*

**2. Authority map.** For each decision class, who holds authority, and is that recorded anywhere other than in practice? *If authority is only observable, it cannot be governed, delegated, or audited.*

**3. Exception routing table.** For each exception category: the route, the required evidence, the time limit, and the fallback. *If exceptions route to individuals rather than roles, the workflow has a bus-factor problem. Technology will not fix it.*

**4. Evidence and reconstruction test.** Take one significant decision from ninety days ago and reconstruct it: inputs, rule applied, approver, rationale. *If you cannot, adding machine-assisted determinations will make the audit position worse.*

**5. Ownership test.** If end-to-end performance degrades next quarter, whose objective is missed? *If the answer is not one name, the workflow is unowned.*

An organization that can answer all five is genuinely ready to evaluate automation, and will buy better because it knows what it is buying. An organization that cannot has just found its actual first project. It is considerably cheaper than the platform.

For the program-level version of this diagnostic, the [Program Recovery Readiness Check](/program-recovery-readiness-check) covers twelve questions across outcomes, decision rights, workflow ownership, dependencies, operating measures, and AI readiness.

## Practical Next Steps

The sequence that tends to work:

1. **Bound the scope.** One workflow, one segment, one accountable executive. Enterprise-wide scope is where this work goes to stall.
2. **Establish the baseline.** Six measures, segmented. Two to three weeks of honest sampling beats a quarter of instrumentation.
3. **Write the authority map and exception table.** This is a documentation exercise, not a technology project. It is usually the highest-return week in the entire program.
4. **Separate avoidable work from clinical judgment.** Only the first is an operations problem. Conflating them is how improvement programs damage clinical safety and lose credibility.
5. **Then evaluate automation**, against a baseline that can demonstrate whether it worked.

Most organizations discover in step three that a meaningful share of the delay they were about to spend seven figures automating is caused by three or four undocumented rules and one unassigned handoff.

---

**If a program is already underway and not producing the expected result**, the [Transformation Diagnostic](/services/transformation-diagnostic) is a bounded engagement that establishes what is actually wrong, which controls and dependencies matter, and what should happen next.

For the portable version of the underlying pattern, read [Human APIs Become Organizational Bottlenecks](/insights/human-apis-become-organizational-bottlenecks).

## Public Sources and Claim Boundaries

- [CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F)](https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f): requirements, compliance dates, and payer reporting context.
- [CMS Prior Authorization API frequently asked questions](https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/frequently-asked-questions/prior-authorization-api): implementation guidance and the continued role of clinical review.
- [AMA prior authorization physician survey](https://www.ama-assn.org/practice-management/prior-authorization/ama-prior-authorization-physician-survey): directional evidence of physician-reported administrative burden.

The measurement model, diagnostic framework, and examples above are TKO advisory guidance. They are not CMS requirements, client results, or evidence that any specific intervention caused a financial outcome.
