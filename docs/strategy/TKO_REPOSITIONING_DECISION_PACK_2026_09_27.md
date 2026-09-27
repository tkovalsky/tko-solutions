# TKO Repositioning Decision Pack

**Status:** APPROVED IN SIMPLIFIED FORM (2026-09-27). Todd confirmed the site was not yet
indexed and directed a clean v1 over the phased plan. v1 shipped: new category and hero, the
three-step ladder (Constraint Diagnostic $7,500 / $5,000 founding, Operating System Build from
$15K, Operate & Improve $3K–$6K/mo), RachelOS as the flagship constraint-evolution case, new
About and contact, SMB guide clusters, and a minimal redirect map. Healthcare pages, enterprise
offers, and healthcare guides were removed from the public site; their content remains in git.
Deferred to later iterations: problem pages, `/enterprise`, `/south-florida`, new guides,
analytics provider. The acquisition channel is search-led (RachelDelray model) rather than
warm-network-led, which raises the priority of section H.
**Date:** 2026-09-27
**Supersedes on approval:** `docs/TKO-2.0-STRATEGY.md` (healthcare category), the category
verdicts in `docs/TKO_P0_AUDIT_RECONCILED_2026_08_27.md`, the "Primary Position" section of
`CURRENT_REALITY.md`, and the RachelOS freeze in `docs/OPERATING-BOUNDARIES.md`.
**Evidence base:** full read of the public site source (`src/app`, `src/lib`, `src/components/site`),
the offer catalogue, founder record, case studies, insights, redirects, analytics wiring, the
strategy and audit history in `docs/`, the RachelOS evidence library and claim audit, and a
limited round of web research (sources at the end).

> **What this reverses.** On 2026-08-27 the P0 audit ruled that TKO would keep **Healthcare
> Transformation & Operating Model Advisory** as its category. It also ruled that "systems of
> action" and RachelOS would not become a competing homepage thesis. Todd has now explicitly
> directed a change of market. This pack treats that instruction as the governing decision and
> keeps the parts of the earlier work that still hold: claim discipline, role boundaries,
> evidence limits, and redirect hygiene.

---

## 0. The answer in one page

**Why would an executive pay TKO instead of a consultant, an automation agency, a developer, an
AI vendor, or a new hire?**

Each of those alternatives owns one slice of the problem. The problem itself sits in the gaps
between the slices.

| Alternative | What they do well | Where it breaks for this buyer |
|---|---|---|
| Management / ops consultant | Diagnose, recommend, coach | Leaves a plan. Nobody builds the system, so the business reverts. |
| Automation / no-code agency | Connects tools quickly | Automates the current process, including the broken parts. Nobody asks whether the step should exist. |
| Developer / software shop | Builds what is specified | The hard part is the specification. The owner can't write it because the logic lives in their head. |
| AI vendor / AI consultant | Ships a tool or pilot | Adds another system to a fragmented stack. There is no operating model around it, so adoption stalls. |
| Internal hire (COO / ops lead / RevOps) | Permanent ownership | $150K–$250K+ loaded and months to impact. Rarely has both operating judgment and build capability. |
| EOS / coaching | Meeting rhythm, accountability | Organizes the people, but the systems still don't tell anyone what to do next. |

**TKO's answer:** TKO finds the constraint that costs the business the most, across process,
people, data, and technology. It then builds the system that removes it, proves the change with
a measured before and after, and moves on to the next constraint. One principal does the
diagnosis and the build. The first paid step costs less than two weeks of a senior hire.

**Hypothesis verdict: validated, with two refinements.**

The core hypothesis was: *"TKO diagnoses the operating constraint across business, process,
people, data and technology, and then builds the system required to change the outcome."* The
repository supports it:

- RachelOS is built and operated by Todd: 1,600+ commits, 86+ migrations, 100+ recorded
  architecture decisions, a production daily cron, and human-approval gates. See
  `09_TODD_OPERATING_PATTERN_ANALYSIS.md` and `asset-production/rachelos-delivery-model/07_CLAIM_AUDIT.md`.
- Twenty years of operating and program experience across financial services operations,
  enterprise transformation, product ownership, and large healthcare programs.

Two refinements:

1. **Add "and keeps improving it as the constraint moves."** This separates TKO from a one-shot
   build shop and justifies the recurring revenue line.
2. **Add "keeping human judgment where it belongs."** Every competitor in the AI space sells
   autonomy. TKO's evidence (approval gates, fact-versus-inference separation, human-override
   authority) is the opposite, and it is the safer thing for an owner to buy.

**The honest gap:** TKO has **no external small or mid-sized client result yet**, and RachelOS has
**no attributed revenue outcome** (the claim audit prohibits one). The whole 90-day plan is
built to close that gap with founding clients. It does not paper over it with copy.

---

## A. Current-State Audit

### A.1 What the site says today

| Surface | Current state | Evidence |
|---|---|---|
| Category | "Healthcare Transformation & Operating Model Advisory" | `src/app/layout.tsx` title template; `src/lib/site.ts` description and positioning |
| Hero | "Make complex healthcare change executable." | `src/app/page.tsx` |
| Buyer | Health plans, payers, provider organizations; COO / CTO / CIO at enterprise scale | `src/lib/offers.ts` audiences; `docs/TKO-2.0-STRATEGY.md` |
| Primary CTA | "Discuss a Transformation" | `TRANSFORMATION_CONVERSATION` in `offers.ts` |
| Offers | Executive Diagnostic $5K → Transformation Diagnostic $10K → Design Sprint $20K → Execution Authority $20K–$50K/mo | `offers.ts` |
| Nav | Healthcare · Services · Approach · Selected Work · Insights · About | `header.tsx` |
| Proof | 4 anonymized healthcare cases first; RachelOS 5th; CRE 6th | `src/lib/content.ts` |
| Founder | "Healthcare Transformation & Operating Model Strategist" | `founder/page.tsx`, JSON-LD `jobTitle` |
| Structured data | `knowsAbout` lists prior authorization, UM, provider ops | `layout.tsx` |
| Contact form | Pressure options: administrative burden, provider abrasion, regulatory change… | `diagnostic-form.tsx` |
| Content | 4 published insights: 2 healthcare-specific, 1 human-API piece framed at health plans, 1 AI-delivery piece | `src/content/insights/` |
| Guide clusters | 10 clusters, 8 of them healthcare | `src/lib/guide-clusters.ts` |
| OG image | "Make complex healthcare…" | `public/og-tko-2.svg` |
| Analytics | Events push to `window.dataLayer`, but no GA4/GTM/Plausible/Vercel Analytics consumer is loaded | `conversion-events.ts`, no provider in `src/` |
| Pipeline | `content/outreach/target-accounts.csv` holds headers only, no accounts. `content/feedback/guide-usage.csv` holds headers only. | files |

### A.2 Diagnosis

1. **The category is aimed at the wrong buyer.** Every signal on the site (title, schema,
   offers, clusters, form, OG image) tells Google and visitors that TKO serves enterprise
   healthcare. A $15M services-company owner would bounce off the hero in five seconds.
2. **The offer ladder is enterprise-priced and enterprise-shaped.** "Transformation Execution
   Authority, $20K–$50K/month" and "decision rights and control model" deliverables fit health
   plans. They do not fit an owner asking why leads disappear.
3. **The strongest proof is buried.** RachelOS, the one thing Todd built and operates end to
   end, is the fifth case study. On the homepage it appears as one bullet.
4. **The site sells advice and hides the build.** The design sprint FAQ says "Do you build the
   software? … Implementation may be led by internal teams, existing vendors…". For the new
   market, building is the differentiator.
5. **Too much internal vocabulary reaches the buyer.** "Operational truth", "execution
   authority", "decision intelligence", "integration and operational-truth layer" are precise
   but abstract. They sound like Gartner.
6. **The conversion system has never been instrumented or worked.** No analytics consumer is
   loaded, the target-account list is empty, and no guide-usage feedback is recorded. The site
   has not been tested against real buyers, so there is little conversion evidence to preserve.
7. **The earlier work was solid.** Claim discipline, role boundaries ("led / influenced /
   supported"), evidence notes, redirect hygiene, and the lead persistence and notification
   path are all worth keeping.

### A.3 KEEP / MODIFY / REMOVE / ADD

| | Item | Decision |
|---|---|---|
| **KEEP** | Next.js/MDX stack, design system, `Section`/`PageHero`/`CtaBand` primitives | Reuse as is |
| KEEP | Lead persistence, Resend notification, spam honeypot, privacy page | Reuse |
| KEEP | Conversion event taxonomy and `data-conversion-event` pattern | Extend it; don't replace it |
| KEEP | Claim guardrails: led / influenced / supported, evidence limits, no employer endorsement | Apply to all new copy |
| KEEP | Healthcare case studies (all four), with URLs preserved | Move them to the enterprise lane (see F and J) |
| KEEP | `/healthcare`, `/founder`, `/selected-work`, `/insights` URLs | Preserve link equity |
| KEEP | "Human API" insight; the "What AI-assisted delivery compresses" insight | Retarget framing to SMB |
| KEEP | Guide-validation gate (every guide maps to a cluster and an offer) | Update the enums |
| **MODIFY** | Category, hero, meta, JSON-LD, OG image | Business operating systems for growing companies |
| MODIFY | Offer ladder | Diagnostic → Build → Operate & Improve (→ Fractional) |
| MODIFY | RachelOS case study | Make it the flagship, told as a *constraint-evolution* story |
| MODIFY | Founder page | Cross-functional operator-builder; healthcare as one chapter |
| MODIFY | "What this is not" PMO contrast | Contrast with the alternatives table in section 0 |
| MODIFY | Contact form | SMB pressure options, a revenue band, and a business type |
| MODIFY | `/approach` | Becomes `/how-it-works` (redirect) around the constraint loop |
| MODIFY | `/healthcare` | Enterprise and healthcare lane page, out of primary nav |
| **REMOVE** (from primary funnel) | Execution Authority $20K–$50K/mo, Design Sprint, Transformation Diagnostic as public SMB offers | Move to the enterprise lane |
| REMOVE | "Discuss a Transformation" CTA | Replace (see D) |
| REMOVE | Healthcare `knowsAbout` dominance in schema | Rebalance |
| REMOVE | Program-recovery readiness check from footer | Redirect to the enterprise lane |
| **ADD** | Problem pages in buyer language | `/problems/*` |
| ADD | Founding-client diagnostic offer | Price and case-study terms |
| ADD | Sample diagnostic deliverable (redacted, built from RachelOS) | PDF linked from the diagnostic page |
| ADD | Scheduling link as primary CTA | `NEXT_PUBLIC_SCHEDULING_URL` already exists in `site.ts` |
| ADD | A real analytics consumer | Vercel Analytics or GA4 |
| ADD | South Florida page | One page, not city spam |
| ADD | Enterprise page | Holds healthcare and the large-program offer |

---

## B. Recommended Market Position

### B.1 Category decision

Six candidates were evaluated as the **single external category**:

| Candidate | Buyer comprehension | Search / market collision | Describes something *built* | Verdict |
|---|---|---|---|---|
| **Business Operating Systems** | High. Owners already say "we need systems" | EOS/Traction owns "business operating system" as a *meeting framework*. That is a collision, but it is also a bridge. | Yes | **Choose** |
| Systems of Action | Low for SMB owners | Now a Microsoft Dynamics / BVP / agentic-AI **software** category. It would make TKO read as a SaaS vendor. | Yes | Use as a supporting concept and a content topic |
| Operational Intelligence | Medium | BI and analytics vendors; implies dashboards, which is exactly what TKO argues against | Weak | Internal only |
| Decision Systems | Low (academic) | Decision-science and BI vendors | Partly | Internal architecture term |
| Execution Architecture | Low (jargon) | Little | Weak | Drop |
| Operational Knowledge Systems | Medium | Knowledge-management and wiki tools | Partly | Drop as a category; keep "institutional knowledge" as a problem |

**Decision:** TKO's external category is **business operating systems for growing
companies**. The one-line proposition carries the thesis:

> **TKO builds the missing operating layer between your information and your execution.**

Why this wins:

- It names the artifact the buyer gets (a working system), not a service type.
- It matches the proof: Rachel*OS*.
- It lets TKO state its difference from EOS in one line. EOS gives the leadership team a
  rhythm; TKO builds the system that tells the team what to do between the meetings.
- EOS **Integrators** (the second-in-command role in EOS companies) are exactly TKO's buyer.
  EOS **Implementers** are a natural referral partner, because they surface system problems
  they don't build fixes for.

Guardrail: TKO does **not** target the head term "business operating system" in SEO, because
EOS owns that search intent. The category phrase is used on-page. Search strategy targets
problem queries (section H).

**Supporting concepts** (used below the category, never alongside it as peers):

- *"The person is the operating system"*: the problem, in the buyer's words.
- *Systems of record vs. systems of action*: the explainer, used in content and on How It Works.
- *Find the constraint → build the fix → prove it → find the next constraint*: the method.
- Internal-only architecture: `Signal → Fact → State → Decision → Action → Outcome → Feedback`.
  It appears publicly at most once, on How It Works, in plain words.

### B.2 Primary ICP

| Dimension | Definition |
|---|---|
| Company | Owner-led, founder-led, family-owned, or PE/independent-sponsor-backed operating business |
| Size | **~$5M–$100M revenue**, ~15–300 people. The sweet spot is $8M–$50M: big enough to have budget and system sprawl, small enough that one executive can decide. |
| Shape | Revenue depends on **pipeline, relationships, or multi-step service delivery**: many inbound leads or accounts, handoffs between sales, ops and delivery, repeat and referral business |
| Stack | CRM (HubSpot, Salesforce, Follow Up Boss, industry CRM), email, spreadsheets, 10–40 SaaS tools, some AI subscriptions, maybe Zapier/Make |
| Condition | Has outgrown the systems it started with. Growth has made the owner or COO the routing layer. |
| Geography | South Florida first (section I), then remote across the US |

**Beachhead segments** (ranked by proof proximity × Todd's credibility × buying ease):

1. **Relationship-driven sales businesses:** real-estate brokerages and teams, new-construction
   sales, property management, mortgage, title, insurance agencies. RachelOS is direct
   structural proof. *Risk:* being typecast as "the real-estate CRM guy". *Mitigation:* this is
   an outbound segment, not the site identity.
2. **Wealth, advisory, and financial-services firms:** RIAs, family offices, independent
   broker-dealers, specialty lenders. Todd's Apollo, JPMorgan AM, Goldman AM (via Sapient),
   FolioDynamix, and WBI record covers CRM, advisor platforms, and operations. This credibility
   is currently hidden behind healthcare.
3. **Mid-market healthcare *services*:** specialty practices, MSOs, home health, DME,
   PE-backed provider platforms in the $5M–$50M range. These buyers purchase like SMBs (owner
   or COO decides, no vendor-qualification gauntlet) and value Todd's healthcare fluency. This
   is how healthcare stays commercially useful without defining TKO.
4. Opportunistic: professional services, multi-location home services, logistics and
   distribution, marine (strong in South Florida).

**Disqualifiers:** under ~$3M revenue; wants "a chatbot"; wants hourly staff augmentation;
wants a tool installed without operating change; no executive who owns the outcome.

### B.3 Economic buyer and champion

- **Economic buyer:** owner, founder, CEO, or president; COO or EOS Integrator in larger firms;
  PE operating partner for portfolio companies.
- **Champion or user:** head of operations, head of sales or revenue, VP or director of a
  function, office or operations manager who does the human integration work today.
- **Blocker to anticipate:** the incumbent "tech person" or agency. Position TKO as working
  *with* them on the operating layer, not replacing them.

### B.4 Triggering conditions (why now)

- A lead-volume increase that isn't converting, or a marketing spend that isn't producing revenue.
- A key employee who "knows everything" gives notice, goes on leave, or is promoted.
- The owner wants to step back, sell, bring in a president, or take PE money (diligence
  exposes that the business runs on people rather than systems).
- A CRM migration or re-implementation, or a CRM renewal nobody wants to pay for.
- AI tool sprawl: several subscriptions, no measurable change.
- A new location, acquisition, or service line that breaks the existing way of working.
- A bad quarter traced to missed follow-up, dropped handoffs, or a lost large account.

### B.5 Primary problems (buyer language)

1. "Leads come in and we don't know which ones matter, or they just disappear."
2. "Everything routes through me (or my COO)."
3. "We have a CRM but nobody trusts it and it doesn't tell us what to do."
4. "My people spend hours copying information between systems."
5. "We bought AI tools and it made things messier."
6. "Our reports tell us what happened. They don't tell anyone what to do."
7. "When [person] leaves, we lose half of how things work."

### B.6 Desired outcomes

- Fewer opportunities lost; faster, more consistent follow-up; measurably more revenue from
  the same lead flow.
- The owner or COO stops being the routing layer and gets time back.
- A trustworthy daily view of what matters and what's next, one list instead of five places.
- Hours of manual reconciliation removed.
- Knowledge captured in the system, so people can leave or scale without loss.
- AI that is used, governed, and tied to outcomes.

### B.7 Differentiation

1. **Diagnose *and* build, same person.** No handoff loss between the strategy and the build.
2. **Cross-boundary.** Works across strategy, process, CRM, data, automation, AI, content, and
   measurement, instead of optimizing one silo.
3. **Constraint-driven and iterative.** No imaginary end-state transformation. Fix the binding
   constraint, measure, find the next one.
4. **Human judgment by design.** Approval gates, fact-versus-inference separation, and clear
   owners. Automation where it is safe, people where judgment belongs.
5. **Enterprise discipline at SMB speed.** Twenty years inside large programs where
   dependencies, controls, and ownership had to be explicit, applied with the speed of a
   solo, AI-assisted builder.

### B.8 Proof and reasons to believe

- **RachelOS:** a production operating system Todd designed, built, and runs. It turned a
  business where "the person was the operating system" into memory, state, a daily action
  queue, and approval-gated outreach. It is still evolving as the constraint moves.
- **Enterprise record:** program and delivery leadership on large healthcare transformations
  (dozens of applications, 100+ participant governance), product ownership (FHIR and CMS Cures
  Act), and financial-services operations (Apollo, JPMorgan AM and Goldman AM programs via
  Sapient, FolioDynamix).
- **TKO runs on its own systems:** the internal content factory (TIF) and opportunity pipeline
  are the same pattern applied to TKO's own business. Use this as a light claim only, with no
  screenshots of private tooling needed.
- **Method transparency:** a published sample diagnostic deliverable.

### B.9 Alternatives the buyer might choose

Status quo (most common, so the site must quantify the cost of doing nothing); hiring a COO or
ops manager; a CRM partner or implementer; a Zapier/Make/AI automation agency; a fractional
COO; EOS or a coach; a software dev shop; an AI vendor. Section 0 gives the response to each.

---

## C. Canonical Positioning Statement (internal)

> For owners and operating executives of growing businesses (roughly $5M–$100M) whose systems
> have fallen behind how the company actually runs, **TKO Solutions builds the missing operating
> layer between information and execution.** TKO finds the constraint that costs the business the
> most, across process, people, data and technology. It builds the system that removes it, keeps
> human judgment where it belongs, proves the change with a measured before and after, and then
> moves to the next constraint. Unlike consultants who stop at recommendations, or agencies,
> developers and AI vendors who build what they are told, TKO does the diagnosis *and* the
> build. The work is led by a principal who has run enterprise-scale programs and who built and
> operates his own production operating system.

Short form (bio, LinkedIn headline, footer):

> **TKO Solutions: I find what's holding your business back and build the system that fixes it.**

---

## D. Homepage Thesis

### D.1 Hero options

**Option A: "The person is the operating system" (recommended)**

> **Your business has systems. A person is still the operating system.**
>
> CRM, email, spreadsheets, a dozen apps, maybe some AI. But deciding what matters, what
> happens next, and who does it still runs through you and a few key people. TKO finds where
> that is costing you, builds the missing operating layer, and proves it changed the numbers.
>
> [Book a 30-minute constraint call] [See how RachelOS was built]

*Why it wins:* It names the condition in one line that a $20M owner recognizes instantly. It
carries the whole thesis (systems of record exist; systems of action don't; humans fill the
gap). It leads straight into the RachelOS proof ("the human was the operating system"). It uses
no AI hype and no jargon.

**Option B: "You bought the software" (sharper, more provocative)**

> **You bought the software. Why does the business still run on memory?**
>
> Leads slip. Follow-up depends on who remembered. Reports explain last month and don't say
> what to do this week. TKO builds the operating layer that turns what your systems already
> know into what your team does next.

*Use:* Strong for paid social, outbound subject lines, and a problem page. As a homepage hero
it is slightly accusatory, and it frames TKO around software only.

**Option C: "Method-led"**

> **Find the constraint. Build the fix. Prove it. Repeat.**
>
> TKO works across process, people, data and technology to remove what's actually limiting
> your business, and then builds and runs the system that keeps it removed.

*Use:* Good for the How It Works page and the services header. As a hero it describes TKO
before it describes the buyer's problem, which is the wrong order for a cold visitor.

**Recommendation: A.** Test B as the outbound and LinkedIn variant and keep C as the How It
Works headline.

### D.2 CTAs

- **Primary:** **Book a 30-minute constraint call.** A scheduling link (`site.scheduling`),
  with the form as fallback. It is free, bounded, and explicit about what happens: *"Tell me
  what's stuck. I'll tell you where I'd look first and whether a diagnostic is worth it."*
- **Secondary (home):** **See how RachelOS was built** (proof).
- **Secondary (elsewhere):** **See the Diagnostic** (`/services/constraint-diagnostic`).
- Retire "Discuss a Transformation" and "Compare Engagements".

### D.3 Page narrative and section order

The page answers the seven buyer questions in order.

| # | Section | Buyer question | Content |
|---|---|---|---|
| 1 | Hero (Option A) | Do you understand my problem? | Hero, two CTAs, one line: *"For owner-led and growing businesses, typically $5M+ in revenue."* |
| 2 | **Sound familiar?** | Do you understand my problem? | 6 symptom cards in buyer voice (B.5), each linking to its problem page |
| 3 | **The missing layer** | Why is this happening? | Plain-language diagram: *Your systems hold information → [the missing layer: what's true now · what matters · what happens next · who does it · did it work] → your team's work.* One paragraph: "Today a person does this job, usually you." |
| 4 | **How TKO works** | What do you actually do? | 4-step loop: Find the constraint → Build the fix → Prove it → Find the next constraint. One sentence each. "No imaginary end state. The constraint moves; the system moves with it." |
| 5 | **Proof: RachelOS** | Have you solved something structurally similar? | Screenshot (queue or daily action), the before-state ("Rachel was the operating system"), a 4-stage constraint timeline, what's next (conversion), and a link to the case. Evidence note: "Built and operated by Todd. Metrics published only where verified." |
| 6 | **What we build** | What changes after I hire you? | 6 outcome-titled examples: revenue follow-up system · owner's daily action queue · CRM operating layer · AI-assisted workflows with human approval · institutional memory · reporting connected to action |
| 7 | **How engagements work** | What is the first engagement? | Diagnostic → Build → Operate & Improve, with prices (section E) |
| 8 | **Who you'll work with** | Why should I trust you? | Todd: short, not autobiographical. The pattern he recognizes, plus 4 credibility lines (financial-services operations; enterprise programs incl. large healthcare transformations; product ownership; built and runs a production system). Links to About and LinkedIn. |
| 9 | **Why not just…** | Why TKO rather than alternatives? | Compact version of the section 0 table: consultant / agency / developer / AI tool / new hire |
| 10 | Enterprise line | (enterprise visitors) | One sentence: *"Larger organization or healthcare enterprise? See enterprise engagements →"* |
| 11 | CTA band | What should I do next? | "Tell me what's stuck." Primary and secondary CTAs |

**Remove from home:** the healthcare problem list, the PMO contrast table, the four-offer
enterprise ladder, and the credibility strip of employer names (move to About).

---

## E. Service Architecture

### E.1 Design principles

- One obvious first purchase. The buyer should be able to say yes to something under $10K
  without a committee.
- Each step produces something useful on its own **and** makes the next step obvious.
- Price the outcome and the risk removed, not hours. Publish "from" prices for the first two
  steps and a range for recurring work.
- Recurring revenue comes from **operating the system**, not from open-ended advice.

### E.2 The ladder

| | **0. Constraint Call** | **1. Constraint Diagnostic** | **2. Operating Layer Build** | **3. Operate & Improve** | **4. Fractional Operating Partner** |
|---|---|---|---|---|---|
| Buyer | Owner / COO / functional head | Same | Same | Same | Owner / CEO / PE operating partner |
| Problem | "Something is stuck and I can't name it" | "Where is this costing us and what do we fix first?" | "Build the thing that fixes it" | "Keep it working and keep finding the next constraint" | "I need a senior operator-builder in the business" |
| Scope | 30 min, free | 1 business unit or revenue motion; ≤6 interviews; system and data walkthrough; sample of records | One scoped intervention (see examples) with a named metric | The live system(s) TKO built, plus a monthly constraint review | Operating responsibility for systems, ops cadence, and the improvement roadmap |
| Deliverable | Where I'd look first; is a diagnostic worth it (yes/no) | **Constraint Report:** outcome and current operating model; where revenue or time leaks (estimated in $ and hours); human-integration map (who is "the system" today); system-fragmentation map; the missing decision and state logic; **first-build spec with a fixed price**; a measurement baseline; 90-day plan. 60-minute readout. | The working system in production, documentation, a trained team, a before/after measurement at 30 days | Monitoring and fixes, monthly metric review, 1 improvement cycle per month (capped), quarterly constraint re-assessment | Weekly presence (~1–2 days/week equivalent), leadership cadence, roadmap, build oversight |
| Duration | 30 min | **2 weeks** | **4–8 weeks** | Monthly, 3-month minimum | Monthly, 6-month minimum |
| Price | Free | **$7,500 list.** Founding-client price **$5,000** for the first 3 clients in exchange for case-study rights and a reference call. 100% of the fee is credited to a Build signed within 30 days. | **From $15K.** Typical first build $18K–$30K. Multi-phase $40K–$100K+ | **$3K–$6K / month** by system count and change volume | **$8K–$15K / month** |
| Next step | Diagnostic | Build (fixed quote in the report) | Operate & Improve | Next Build (new constraint) or Fractional | Continue / hand off to a hire |

Notes on the pricing logic:

- **$7,500 diagnostic.** This sits inside the brief's $3.5K–$8K range and below the $10K–$25K
  AI-readiness assessments that are common in 2026 (see sources). It is priced low enough for
  owner sign-off and high enough to filter out tire-kickers. The founding price is justified by
  what TKO receives (a case study and a reference), not a discount without a reason. The full
  credit toward a Build turns the diagnostic into a de-risked down payment.
- **Build from $15K.** Solo, AI-assisted delivery keeps TKO's cost low (the RachelOS delivery
  evidence supports this). Value anchoring does the rest: a $15M business leaking 2–5% of
  revenue through missed follow-up loses $300K–$750K per year. Show that math in the diagnostic
  using *the client's* numbers, never generic claims. No artificial ceiling: complex builds are
  quoted from the diagnostic.
- **Operate & Improve.** This is the MRR engine. Every Build proposal includes it as the default
  continuation, because systems decay without an owner (a lesson recorded in the RachelOS
  history).
- **Fractional.** Offer it only when asked, or when a client's constraint is leadership
  bandwidth. Don't lead with it; it caps capacity.
- **Enterprise ladder (separate lane):** the existing Transformation Diagnostic ($10K+),
  Design Sprint ($20K+), and Execution Authority ($20K–$50K/mo) move to `/enterprise` unchanged
  (section J).

### E.3 Build examples (named by outcome, not tool)

- **Revenue follow-up system:** every lead gets a state, an owner, and a next action; nothing
  ages silently. Includes response-time and follow-up measurement.
- **Owner's daily action queue:** one ranked list of what needs attention today and why,
  assembled from the CRM, inbox, and pipeline.
- **CRM operating layer:** makes the existing CRM trustworthy (data rules, stages that mean
  something, automated hygiene) and useful (next actions, not fields).
- **AI-assisted workflows with human approval:** drafting, summarizing, and classifying, with a
  person approving anything consequential.
- **Institutional memory:** the facts about customers, deals, and processes that currently live
  in one person's head, captured where the team works.
- **Reporting connected to action:** each metric has an owner, a threshold, and a triggered next step.
- **Content and research operating systems:** for firms whose growth depends on expertise-led
  marketing. This is TIF's pattern.

### E.4 Revenue path

Assumes solo delivery with AI-assisted build and roughly 3 concurrent builds maximum.

| Milestone | What gets you there |
|---|---|
| First $5K | 1 founding diagnostic |
| $10K MRR | ~3 Operate & Improve clients at ~$3.5K (plus project revenue from 3+ builds) |
| $30K MRR | e.g., 5 Operate & Improve at ~$4.5K + 1 Fractional at ~$8K, *or* 1 enterprise lane engagement at $20K + 3 Operate & Improve. At this level, add a contract builder or analyst. |
| Beyond | Productize repeat builds (e.g., the revenue follow-up system) into fixed-scope, fixed-price packages; the Diagnostic becomes a repeatable instrument |

**Capacity constraint:** Todd's public record lists a current Cognizant role and there is an
active job-search track in `docs/todd-jobsearch/`. Before selling, **confirm what the
employment agreement allows** (outside work, IP assignment, non-solicit, conflicts). It is also
likely to constrain enterprise healthcare pursuit (section J). The site must not read as a
résumé or a job search.

---

## F. Proof Architecture

### F.1 Hierarchy (new order)

| Tier | Proof | Role on site | Claim boundary |
|---|---|---|---|
| 1 | **RachelOS**: built and operated | Flagship case; homepage section 5 | Verified figures only (claim audit). No revenue attribution until an attribution chain exists. |
| 2 | **Founding-client results** (future) | Replace or join the flagship as they arrive | Baseline captured in the diagnostic; published with permission |
| 3 | **Enterprise experience**: financial services, enterprise programs, healthcare | "Where the pattern was learned" on About; full cases in the enterprise lane | Existing led / influenced / supported boundaries, unchanged |
| 4 | **Method portability**: CRE model, TKO's own systems | One line each | Unchanged limits |

### F.2 RachelOS: reframe as a constraint-evolution case

**Title:** *"When the owner was the operating system."* Keep the slug
`/selected-work/from-crm-to-operating-system`, which already receives four redirects.

**Structure:**

1. **Before.** The CRM, notes, emails, texts, site activity, leads, and content all existed.
   What mattered, why, what happened, and what's next lived in Rachel. The human was the
   operating system.
2. **Constraint 1, foundation:** capture and memory. Signals from every channel into one
   relationship record; facts separated from interpretation; human facts override AI.
3. **Constraint 2, visibility:** one canonical queue and a daily action email. "Who needs me today and why."
4. **Constraint 3, workflow and lead handling:** qualification, state, and approval-gated
   drafts ("Needs Rachel"). Automation drafts; a human approves.
5. **Constraint 4 (now), conversion and advancement:**
   *Lead → Response → Qualification → Conversation → Appointment → Representation →
   Transaction → Referral/Repeat.* The next objective is not more leads. It is to measure and
   improve each transition, **including building the attribution chain that doesn't exist yet.**
6. **What this shows.** Solve the current constraint, observe, and the constraint moves. The
   system is deliberately unfinished.
7. **Evidence and limits.** Verified build facts (commit history, decisions, migrations, daily
   cron, approval gates). Explicitly *not* claimed: revenue, conversion rate, ROI.

**On transactions:** Todd reports real transactions and new-build opportunities moving toward
close. The claim audit found **no attribution chain**. Publishing "the system produced deals"
would be an unsupported claim.

- **Allowed now:** "The system now supports active transactions and new-construction
  opportunities; the current work is measuring which parts of the funnel the system moves."
  This is a state claim, not an attribution claim, and it still requires Rachel's confirmation.
- **Allowed after instrumentation:** stage-transition metrics (e.g., median response time,
  lead→conversation rate) with a before/after window.

**Permission:** get Rachel's **written** consent to name her, RachelDelray, and the
screenshots on a commercial site. Redaction in the existing screenshots should be re-checked.

**Not allowed:** "real-estate CRM", "SaaS", "platform you can buy", autonomy language.

**Operating Boundaries change:** the RachelOS "frozen" status (Aug 5) conflicts with using it as
living proof. Recommend reopening RachelOS **for conversion-stage instrumentation only**. That
work produces the metrics the case study needs, and it doubles as the demonstration of the
method.

### F.3 Enterprise and healthcare experience

- Keep all four healthcare case pages and URLs. Tag them "Enterprise experience", and link
  them from `/enterprise`, `/healthcare`, and About, not from the homepage.
- On About, add a *"Where the pattern was learned"* block. Three short patterns, each with one
  sentence of context: invisible dependencies across dozens of teams (healthcare programs);
  controls and exceptions under consequence (financial operations); turning regulation into an
  operable product (FHIR/CMS). This translates enterprise experience into SMB relevance
  without dumping a résumé.
- Keep the "no employer endorsement" and anonymization rules. The unapproved $12M–$20M+
  portfolio figure stays unpublished (per the P0 audit).

### F.4 Future case studies (designed in, not hoped for)

- Every diagnostic records a **baseline** (response time, leads without a next action, hours of
  manual reconciliation, pipeline aging, owner touches per day). Every build's 30-day review
  measures the same metrics.
- Case-study rights are part of founding-client terms. The template already exists in
  `asset-production/templates/case-study.md`.
- Publish anonymized results by default ("a $20M South Florida insurance agency") and named
  results with permission.

---

## G. Website Architecture

### G.1 Navigation

**Primary:** Problems · How It Works · Services · Proof · Insights · About · **[Book a Constraint Call]**

**Footer adds:** Enterprise & Healthcare · South Florida · Privacy · email · LinkedIn

"Proof" is a *label* over the existing `/selected-work` URL. Changing the label and not the
URL avoids redirect churn on a namespace that already receives about 15 redirects.

### G.2 Page tree

| Route | Status | Purpose | Target intent | CTA |
|---|---|---|---|---|
| `/` | Rewrite | Recognition → thesis → method → proof → offer | Brand and referral traffic | Constraint call |
| `/problems` | **New** hub | Symptoms index in buyer language | "why does my business…" navigational | Problem pages, constraint call |
| `/problems/leads-falling-through-the-cracks` | **New** | Revenue follow-up and leakage | *leads falling through the cracks; lead follow-up system* | Diagnostic |
| `/problems/owner-is-the-bottleneck` | **New** | Owner/COO as routing layer | *owner is the bottleneck; business too dependent on owner* | Diagnostic |
| `/problems/crm-nobody-trusts` | **New** | CRM exists, doesn't drive action | *why CRM implementations fail; CRM adoption problems* | Diagnostic |
| `/problems/manual-work-between-systems` | New (phase 3b) | Copy/paste integration by humans | *reduce manual data entry between systems* | Diagnostic |
| `/problems/ai-tools-without-a-plan` | New (phase 3b) | AI sprawl, no operating model | *AI tools creating more work; AI for small business operations* | Diagnostic |
| `/problems/knowledge-trapped-in-people` | New (phase 3b) | Key-person risk | *institutional knowledge loss; key person dependency* | Diagnostic |
| `/how-it-works` | Rename of `/approach` (301) | Constraint loop, systems of record vs action, human-judgment stance | *systems of record vs systems of action* | Constraint call |
| `/services` | Rewrite | Ladder overview with prices | *operations consultant pricing* | Diagnostic |
| `/services/constraint-diagnostic` | **New slug** (replaces executive-diagnostic) | The first purchase; sample deliverable | *operations assessment; process audit small business* | **Book / buy diagnostic** |
| `/services/operating-layer-build` | **New slug** (replaces operating-model-design) | What gets built, examples, pricing logic | *workflow automation consultant; CRM implementation help* | Constraint call |
| `/services/operate-and-improve` | **New slug** | Managed continuation | Low search; conversion support | Constraint call |
| `/selected-work` ("Proof") | Rewrite hub | RachelOS first, then "Enterprise experience" group | Credibility | Constraint call |
| `/selected-work/from-crm-to-operating-system` | Rewrite | Flagship constraint-evolution case | *how to build an operating system for a small business* | Constraint call |
| `/selected-work/<4 healthcare slugs>` | Keep, relabel | Enterprise experience | Enterprise and healthcare | Enterprise page |
| `/enterprise` | **New** | Larger orgs and healthcare lane; hosts enterprise ladder | *healthcare transformation consultant; program recovery* | Enterprise conversation |
| `/healthcare` | Keep URL; rewrite as the healthcare section of the enterprise lane; remove from nav | Healthcare credibility, enterprise path | Healthcare queries already earned | Enterprise conversation |
| `/south-florida` | **New** (one page) | Local proof of presence; in-person diagnostic | *operations consultant Boca Raton / South Florida; fractional COO Palm Beach* | Constraint call |
| `/insights` + `/insights/[slug]` | Keep; re-cluster | Problem guides (section H) | Problem-search | Mapped offer |
| `/founder` ("About") | Rewrite | Operator-builder; pattern recognition; career as evidence | Name searches; trust | Constraint call |
| `/contact` | Rewrite | Scheduling link first, form fallback | — | — |
| `/program-recovery-readiness-check` | 301 → `/enterprise` | Retire from SMB funnel | — | — |
| `/services/executive-diagnostic`, `/transformation-diagnostic`, `/operating-model-design`, `/transformation-leadership` | 301 (section M) | — | — | — |

Phase 3b pages come after the first three problem pages prove they get engagement. Don't ship
empty pages (a lesson recorded in `CURRENT_REALITY.md`: "Remove … industry pages without proof").

### G.3 Internal-linking strategy

- **Hub and spoke per problem.** Problem page → its pillar guide(s) → back to the problem page
  → Diagnostic. Every guide links to exactly one problem page and one offer. The existing
  guide-validation gate enforces the offer link; extend it to the problem page.
- **Proof in every commercial page.** Every problem and service page carries one RachelOS
  proof block with the relevant screenshot (queue → leads page; memory → knowledge page;
  approval → AI page).
- **One path to money.** Every page ends in the Constraint Call CTA. Service pages also offer
  "Buy the Diagnostic".
- **Enterprise isolation.** Healthcare and enterprise pages link *to* the SMB site freely, but
  SMB pages link to enterprise only from the homepage line and the footer. That keeps the
  primary funnel clean.

---

## H. Content and SEO Strategy

### H.1 Method and honesty note

This environment had web search but **no keyword-volume or difficulty tooling**. Volume and
difficulty below are **directional estimates** from SERP inspection and category knowledge.
They must be validated in Google Search Console, Google Keyword Planner, or Semrush/Ahrefs
before the build order is locked. Findings that are well supported:

- "Systems of record vs. systems of action" is actively contested by Microsoft, BVP, QAD,
  Forbes Council and others, with an **enterprise and agentic-software** framing. There is room
  for a practitioner, SMB-owner angle, but not to rank for the head term quickly.
- "Owner is the bottleneck" is served mostly by coaches and accountants, with a
  personal-productivity framing. The *systems* angle ("it's not your delegation, it's your
  system") is underserved.
- "Fractional COO [South Florida city]" has local competitors (Royal Palm Consulting, MarkCMO
  city pages). Local volume is low but the intent is high.
- AI-consulting pricing content is saturated with agency listicles. Don't compete there.

### H.2 Pillars

1. **Revenue follow-up and leakage:** leads, follow-up, response time, pipeline aging. *Closest to money.*
2. **The owner as the operating system:** bottlenecks, key-person risk, institutional knowledge.
3. **Systems that don't drive action:** CRM failure, dashboards, systems of record vs action, fragmentation.
4. **AI in operations without an AI team:** operating model, governance, human approval, tool sprawl.
5. **What to fix first:** automation opportunity identification, COO priorities, manual work reduction.

Healthcare content becomes a **separate enterprise cluster** (section J) and stops receiving new
investment in the primary funnel.

### H.3 Topic classification

Scale: H/M/L. *Insight* = TKO's ability to write from first-hand evidence.

| Topic | Intent | Vol. (est.) | Difficulty (est.) | Commercial relevance | Authority fit | Offer proximity | First-hand insight |
|---|---|---|---|---|---|---|---|
| Leads falling through the cracks | Problem-aware | M | M | H | H | Diagnostic | **H** (RachelOS) |
| Revenue leakage from poor follow-up | Problem-aware | L–M | L | H | H | Diagnostic | H |
| Automate follow-up without losing human judgment | Solution-aware | L | L | H | **H** | Build | **H** |
| Why CRM implementations fail | Problem-aware | M–H | H | H | H | Diagnostic | H |
| Why doesn't our CRM tell us what to do | Problem-aware | L | L | H | H | Build | H |
| Owner is the bottleneck | Problem-aware | M | M | H | H | Diagnostic | M–H |
| Operational knowledge trapped in employees | Problem-aware | L–M | M | M–H | H | Diagnostic | H |
| Systems of record vs systems of action | Education | M | **H** | M | H | How It Works | H |
| Why dashboards don't improve operations | Problem-aware | L | L | M | H | Build | H |
| How to use AI in operations | Solution-aware | H | **H** | M | M | Diagnostic | M |
| AI tools creating more work | Problem-aware | L–M | L | M–H | H | Diagnostic | H |
| AI operating model for small business | Solution-aware | L | M | M–H | H | Diagnostic | M–H |
| AI transformation without an AI team | Solution-aware | L | L | M–H | H | Build | **H** (AI-assisted delivery evidence) |
| AI governance for mid-sized business | Solution-aware | L–M | M | M | H | Operate & Improve | M–H |
| How to connect CRM and AI | Solution-aware | M | M | M | M–H | Build | H |
| What should a COO automate first | Solution-aware | L | L | H | H | Diagnostic | M–H |
| How to identify workflow automation opportunities | Solution-aware | M | M | H | H | Diagnostic | H |
| How to reduce manual administrative work | Problem-aware | M | M | M | M | Diagnostic | M |
| Fragmented business systems | Problem-aware | L–M | L | M | H | Diagnostic | H |
| How to automate small business operations | Solution-aware | H | H | M | M | Build | M |
| Fractional operations / COO transformation | Vendor-aware | M | M | H | M | Fractional | M |
| Operations consultant South Florida / Boca | Vendor-aware, local | L | L–M | **H** | M | Constraint call | M |

**Deprioritize (high volume, low fit):** "how to automate small business operations" and "how
to use AI in operations." Both are saturated by tool vendors. Cover them only as sections of
stronger pieces.

### H.4 First 20 content opportunities (build order)

Order rule: commercial pages first, then pillars closest to the diagnostic, then supporting pieces.

| # | Asset | Type | Pillar | Maps to | Intent |
|---|---|---|---|---|---|
| 1 | Leads falling through the cracks | Problem page | 1 | Diagnostic | Commercial |
| 2 | The owner is the bottleneck | Problem page | 2 | Diagnostic | Commercial |
| 3 | The CRM nobody trusts | Problem page | 3 | Diagnostic | Commercial |
| 4 | RachelOS: when the owner was the operating system | Flagship case | all | Diagnostic | Proof |
| 5 | Sample Constraint Report (redacted, RachelOS-based) | PDF / lead asset | all | Diagnostic | Conversion |
| 6 | Why leads fall through the cracks (and it isn't your salespeople) | Pillar guide | 1 | Diagnostic | Problem |
| 7 | How to automate follow-up without losing human judgment | Pillar guide | 1/4 | Build | Solution |
| 8 | Your business runs on a person: the owner-as-operating-system problem | Pillar guide (retarget Human-API piece) | 2 | Diagnostic | Problem |
| 9 | Why CRM implementations fail after go-live | Pillar guide | 3 | Diagnostic | Problem |
| 10 | Systems of record vs. systems of action: a guide for owners | Pillar guide | 3 | How It Works | Education |
| 11 | What should a COO automate first? | Guide | 5 | Diagnostic | Solution |
| 12 | Where revenue leaks in a $10M–$50M business (and how to estimate it) | Guide with worksheet | 1 | Diagnostic | Problem |
| 13 | AI tools are creating more work: the missing operating model | Guide | 4 | Diagnostic | Problem |
| 14 | Running AI in operations without an AI team (from 10 months of building) | Guide (retarget existing AI-delivery piece) | 4 | Build | Solution |
| 15 | Why dashboards don't change what people do | Guide (rewrite the unpublished operational-intelligence draft) | 3 | Build | Problem |
| 16 | Institutional knowledge: what to capture before someone leaves | Guide | 2 | Diagnostic | Problem |
| 17 | How to find workflow automation opportunities worth doing | Guide | 5 | Diagnostic | Solution |
| 18 | AI governance for a 50-person company (one page, not a policy binder) | Guide | 4 | Operate & Improve | Solution |
| 19 | Operations and systems help for South Florida businesses | Local page | — | Constraint call | Local commercial |
| 20 | Connecting your CRM and AI without creating another silo | Guide | 3/4 | Build | Solution |

**Cadence:** items 1–5 before outreach scales (weeks 1–4), then one guide every two weeks.
Every guide is also cut into a LinkedIn post and an outbound follow-up asset. TIF's
`repurposing.ts` already supports this. The advantage is not volume; each piece should
contain evidence no generic AI article can.

**Tone rules for all content:** first-hand, specific, and skeptical of hype. Show the mechanism
(a diagram of an actual queue or state), not adjectives. No "unlock", "leverage AI", "digital
transformation", or "seamless".

---

## I. South Florida Go-To-Market

**Recommendation: yes. Use South Florida as the wedge for the first 5–8 clients, deliberately
and without becoming a local IT-services firm.**

Why it fits:

- **Trust is the constraint at this stage, not reach.** Without SMB case studies, in-person
  credibility and warm introductions convert far better than cold search traffic.
- **Density.** Palm Beach, Broward, and Miami-Dade hold a large base of $5M–$100M owner-led
  firms in the beachhead segments (real estate and development, wealth and insurance,
  healthcare services, marine, professional services), plus many relocated owners and PE-backed
  platforms.
- **An in-person diagnostic is a differentiator.** Remote AI agencies can't walk the office.
- **Existing network overlap:** Rachel's business touches owners, relocating executives,
  builders, lenders, and attorneys, all of whom are ICP members or referral sources.

How to run it:

| Motion | Action | Weekly effort |
|---|---|---|
| **Warm network** | List 50 people who know owners: past colleagues in South Florida, Rachel's professional network (lenders, attorneys, builders' sales leads, title), neighbors. Ask for introductions to "an owner whose business has outgrown its systems". | 10 touches |
| **Targeted outbound** | 40 named accounts (Palm Beach/Broward first), $5M–$50M, in segments 1–3. Personal email or LinkedIn referencing a specific observable symptom (slow lead response, hiring for ops or admin roles, CRM job posts). Offer: 30-minute constraint call, in person if they prefer. | 10 touches |
| **Referral partners** | Fractional CFOs and CPA firms (they see the cost of operational mess and don't build systems), EOS Implementers in SE Florida, IT managed-service providers (they own infrastructure, not operating logic), CRM partners, bank relationship managers | 1–2 meetings |
| **Rooms** | Pick **two** and show up consistently: e.g., Boca Chamber or Business Development Board of Palm Beach County events, a Vistage or YPO speaker slot, Palm Beach Tech / FAU Tech Runway. Give one talk: *"Your business runs on a person."* | 1 event |
| **Search, local** | One `/south-florida` page; a Google Business Profile (service-area business, "Business management consultant"); ask the first clients for reviews | One-time, then monthly |

Guardrails: no city-by-city doorway pages; no "IT support" or "managed services" language; the
local page presents South Florida as *where we start*, not *all we serve*.

---

## J. Healthcare Lane (separate)

### J.1 Structure

- Healthcare becomes a **vertical expertise and enterprise lane**, not the company identity.
- **Mid-market healthcare services** (practices, MSOs, home health, DME, PE-backed provider
  platforms, $5M–$50M) sit **inside the primary funnel** as beachhead segment 3, with the same
  offers and prices. They buy like SMBs.
- **Enterprise healthcare** (payers, health systems, large health-tech vendors, integrators)
  lives on **`/enterprise`**, with `/healthcare` retained as its healthcare section, and uses
  the **existing enterprise ladder** unchanged: Transformation Diagnostic, Design Sprint, and
  Execution Authority at $20K–$50K/mo, plus the delivery-partner path.
- The 4 healthcare case studies, the prior-authorization guide, and the "Why healthcare
  transformation programs stall" guide stay live on existing URLs and link to `/enterprise`.
  Healthcare guide clusters are kept but marked enterprise, with no new investment.

### J.2 When to pursue enterprise healthcare (bid/no-bid)

Pursue only if **all** of the following hold:

1. **Economics:** ≥$50K total contract value or ≥$15K/month.
2. **Fit:** the problem sits in Todd's proven zone: multi-team program recovery or readiness,
   UM/PA operating model, interoperability operations, governed automation.
3. **Contracting path exists:** subcontract under a qualified consultancy or integrator, a
   health-tech vendor's services arm, a PE operating-partner engagement, or direct advisory to
   an executive with discretionary budget. **Don't pursue** direct payer vendor qualification
   (security questionnaires, insurance minimums, MSAs) until the revenue justifies the cost.
4. **No employment conflict.** While Todd is employed at Cognizant, enterprise payer work is the
   most likely area to conflict with non-compete, non-solicit, or client-conflict terms. **This
   is a gating question for legal review, not a copy question.**
5. **Capacity:** it doesn't displace 2+ SMB builds or managed clients without a price that
   justifies it.

### J.3 Channels

Delivery-partner and subcontract relationships (already on the site as
`/services#delivery-partners`), former-colleague referrals, PE healthcare operating partners,
and health-tech vendors needing implementation or operating-model help. Outbound here is
relationship-only. No mass outreach.

---

## K. Government / RFP Lane (separate BD channel)

### K.1 Reality check

- TKO has **no government past performance**, no set-aside certification established in the
  record, and no public-sector capability statement. Large RFPs (state term contracts, federal
  IDIQs) are not realistic as a prime in year one.
- Procurement cycles run 3–12 months. **This lane produces no revenue in the 90-day window.**
  Treat it as a 12-month option, capped at about 2–3 hours per week.
- It is **not** on the public site navigation. A capability statement is sent directly;
  optionally add an unlinked `/public-sector` page later.

### K.2 Staged entry

**Stage 0: Registration (weeks 1–6; low cost).**

- **SAM.gov** entity registration (UEI; free). NAICS: **541611** (Administrative and General
  Management Consulting, $24.5M small-business size standard, with a proposed increase to $27M
  pending), **541618** (Other Management Consulting), **541512** / **541519** (Computer Systems
  Design / Other Computer-Related Services), **541690** as needed. TKO qualifies as small under
  all of them. *Verify current size standards at registration.* Be aware of the 2026 SAM.gov
  size-calculation error affecting renewals between March and July 2026.
- **Florida MyFloridaMarketPlace (MFMP)** vendor registration: W-9 with Florida DFS, commodity
  codes including **80101500** (management consulting) and **80101600** (project management).
- **Palm Beach County** Vendor Self Service registration, then **Palm Beach County SBE
  certification** (requires domicile in Palm Beach County, a Florida for-profit registration,
  and revenue under the size standard). *Assumption:* Todd or TKO is PBC-domiciled; confirm.
  **Broward County** (OESBD SBE/CBE) and **Miami-Dade** SBE if the business is eligible (check
  domicile and local-presence rules).
- City and agency portals: Boca Raton, Delray Beach, West Palm Beach (often via DemandStar or
  Bonfire), Palm Beach County School District, FAU, and **Community Redevelopment Agencies**
  (Delray Beach CRA, Boca CRA). These are small, local, and often need process or operations
  studies.
- Do **not** assume eligibility for 8(a), WOSB, SDVOSB, HUBZone, or Florida OSD certification.
  Check each only if Todd's ownership profile qualifies.

**Stage 1: Capability statement and monitoring (weeks 4–8).**

- A one-page capability statement: core competencies in buyer terms (operational assessment,
  process improvement, CRM and workflow modernization, AI readiness and governance, program
  recovery); past performance framed truthfully (enterprise program experience as individual
  experience, not TKO past performance; RachelOS as commercial work); NAICS; UEI/CAGE;
  certifications (as obtained); contact.
- Saved searches on SAM.gov, MFMP, DemandStar/BidNet, and county portals. Keywords: *process
  improvement, operational assessment, business process reengineering, organizational
  assessment, CRM implementation, workflow automation, AI readiness, program management
  support.*

**Stage 2: Small-dollar direct work (months 3–9).**

- Target **informal quotes and small-purchase thresholds** (local professional-services quotes;
  federal micro-purchase and simplified-acquisition buys). Thresholds differ by jurisdiction
  and are being revised federally, so verify current values per agency.
- Best targets: CRAs, special districts, utilities, housing authorities, small municipalities,
  university departments. These are organizations with SMB-like operational problems and
  small-dollar procurement.
- Respond to **RFIs and sources-sought** notices. They are free, build agency relationships, and
  sometimes shape set-asides.

**Stage 3: Teaming and subcontracting (months 3–12).**

- Approach primes on the **Florida State Term Contract 80101500-25-STC (Management Consulting
  Services)** contractor list, and federal primes with small-business subcontracting goals.
  Offer a narrow specialty (operational assessment plus workflow and CRM modernization with
  human-governed AI). Subcontract performance builds the past performance TKO lacks.
- Attend county and state small-business matchmaking events (PBC OSBD, Broward OESBD,
  FL APEX Accelerator, formerly PTAC, which is free counseling).

### K.3 Bid/no-bid scorecard (score 0–2 each; bid only at ≥9 of 12)

Scope fit to TKO's actual capability · Contract value ≥$15K and ≤ capacity · Evaluated on
approach rather than past performance TKO lacks · Relationship or pre-RFP insight exists ·
Realistic competition (not a wired incumbent) · Delivery doesn't displace commercial revenue.

---

## L. 90-Day Commercial Plan

**Objective:** revenue, proof, and learning, in that order. No months of brand work before selling.

### L.1 Must exist before outreach (weeks 1–2)

1. **Employment and conflict check completed** (outside-work permission, IP, non-solicit).
2. **Site Phase 1 live** (section M): new homepage, services, contact, offers, nav, metadata.
   This is a copy and configuration change on the existing design system, not a redesign.
3. **Scheduling link** configured (`NEXT_PUBLIC_SCHEDULING_URL`) with 3 intake questions:
   revenue band, what's stuck, and who owns it.
4. **Diagnostic one-pager (PDF)** and a **sample Constraint Report**, redacted and built from RachelOS.
5. **RachelOS case, 1-page version (PDF)**, with Rachel's written permission.
6. **Target list:** 50 warm-network people and 40 named South Florida accounts. Put them in
   `content/outreach/target-accounts.csv` after updating its enums (section M).
7. **LinkedIn:** headline and About aligned to the short-form positioning.
8. **Analytics wired:** a real consumer for the existing event taxonomy.

### L.2 Can wait (weeks 5+)

Problem pages 4–6, most guides, `/south-florida`, `/enterprise` polish, a self-assessment
tool, the government capability statement, Google Business Profile reviews, and paid
acquisition. Paid acquisition is not in this window.

### L.3 First offers to sell

1. **Constraint Diagnostic, founding price $5,000**, 3 slots, with case-study rights and a
   reference call. The scarcity is real (capacity) and should be stated honestly.
2. **Operating Layer Build**, quoted from each diagnostic.
3. **Operate & Improve**, attached to every build proposal.

### L.4 First ICPs to contact (in order)

1. Warm-network owners and COOs of $5M–$50M firms (any segment).
2. Segment 1 via Rachel's professional network: brokerage owners, new-construction sales
   leaders, lenders, title, insurance.
3. Segment 2: South Florida RIAs, family offices, and insurance agencies, using Todd's
   financial-services record.
4. Segment 3: South Florida specialty practices, MSOs, and home health, using healthcare fluency.

### L.5 Weekly operating rhythm

| Activity | Target / week |
|---|---|
| Warm touches (asks for intros or conversations) | 10 |
| Targeted outbound (personal, symptom-specific) | 10 |
| Partner meetings (CPA/fCFO/EOS/MSP/CRM) | 1–2 |
| Constraint calls held | 2–3 |
| Content: one asset every two weeks, plus 2 LinkedIn posts/week from it | 1 / 2 weeks |
| Pipeline review (Fridays, 30 min) | 1 |

### L.6 Referral motion

- At every diagnostic readout, ask: *"Who else do you know whose business has outgrown its
  systems?"*
- Partner referral: a thank-you or referral fee (e.g., 10% of the first engagement) **where
  professionally permitted** (CPAs have independence and commission rules).
- Every completed build produces a 1-page result summary that the client can forward.

### L.7 Measurement

| Metric | Day 30 | Day 60 | Day 90 |
|---|---|---|---|
| Constraint calls held | 6 | 15 | 25 |
| Qualified (≥$5M, owner or exec, real constraint) | 3 | 8 | 12 |
| Diagnostics sold | 1 | 2 | 3–4 |
| Builds signed | 0 | 1 | 1–2 |
| Operate & Improve MRR | $0 | $0–3K | $3–6K |
| Cumulative revenue | $5K | $10–30K | $30–60K |
| Referral partners actively sending | 0 | 1 | 2–3 |

**Learning metrics** (as important as revenue): which symptom headline gets replies; which
segment converts call → diagnostic; the most common constraint found; objections, logged in
`content/feedback/`. **Decision point at day 45:** if calls are happening but not converting,
change the offer. If calls aren't happening, change the list and the message, not the website.

---

## M. Repository Implementation Plan

Smallest safe plan. Every phase stays within the CLAUDE.md scope limits (≤10 files modified, ≤2
new directories, no new services, no schema changes, no migrations). Each phase is one
reversible commit or PR.

### M.0 Pre-implementation decisions needed from Todd

1. Approve the category, hero (Option A), and CTA.
2. Approve offer names and prices (E.2), including founding terms.
3. Confirm the employment and conflict position (affects the `/enterprise` wording and whether
   enterprise is shown at all).
4. Obtain Rachel's written permission for named RachelOS proof and screenshots.
5. Choose an analytics provider (**recommend Vercel Analytics plus the existing event
   taxonomy**; GA4 via GTM if ads are planned).
6. Scheduling tool URL.

### M.1 Phase 1: Core narrative and offers (before outreach)

**1a. Offers and routing** (6 files)

| File | Change |
|---|---|
| `src/lib/offers.ts` | Replace SMB ladder: `constraint-diagnostic`, `operating-layer-build`, `operate-and-improve`. Move the 3 enterprise offers into an `enterpriseOffers` export (keep their content). Replace `TRANSFORMATION_CONVERSATION` with a `CONSTRAINT_CALL` constant. Keep the `PROGRAM_RECOVERY_CONVERSATION` alias pointing to the new constant for compatibility. |
| `src/lib/offers.test.ts` | Update the length and "Starting at" assertions. Add a test that enterprise offers remain resolvable. |
| `src/app/services/page.tsx` | New ladder, commercial model copy, delivery-partner section → link to `/enterprise` |
| `src/app/services/[slug]/page.tsx` | Resolve both `offers` and `enterpriseOffers`, so enterprise slugs still render if kept, or 301 per below |
| `src/lib/site.ts` | New description, positioning, differentiation, CTA label and href, secondary CTA |
| `next.config.ts` | Redirects below; **rewrite existing redirect targets so none chain** |

Redirects (permanent):

- `/services/executive-diagnostic` → `/services/constraint-diagnostic`
- `/services/operating-model-design` → `/services/operating-layer-build`
- `/services/transformation-diagnostic` → `/enterprise` (enterprise offer), *or* keep it live
  under enterprise if Todd prefers the URL. **Recommend keeping** `/services/transformation-diagnostic`
  and `/services/transformation-leadership` live as enterprise offers (unlisted from `/services`,
  linked from `/enterprise`). That avoids redirecting pages that 15 legacy redirects already
  target (10 and 5 respectively), which is the lowest-risk path.
- `/approach` → `/how-it-works` (Phase 2)
- `/program-recovery-readiness-check` → `/enterprise` (Phase 3)
- Update legacy redirects that point to `/services/executive-diagnostic` (`/assessment`,
  `/services/diagnostic`) so they point directly to `/services/constraint-diagnostic`.

**1b. Homepage and global surfaces** (≤9 files)

| File | Change |
|---|---|
| `src/app/page.tsx` | New narrative (D.3), Option A hero, RachelOS proof section with existing `/public/proof/rachelos/*.png` |
| `src/components/site/header.tsx` | Nav: Problems (added in Phase 3; until then omit), How It Works, Services, Proof, Insights, About |
| `src/components/site/mobile-nav.tsx` | Only if labels are hard-coded (they're passed as props; likely no change) |
| `src/components/site/footer.tsx` | New descriptor; Enterprise & Healthcare link; remove readiness check; new tagline |
| `src/components/site/cta-band.tsx` | Default copy (drop "healthcare") |
| `src/app/layout.tsx` | Title template, OG/Twitter, Organization `knowsAbout` rebalanced, Person `jobTitle` → "Founder & Principal"; add `areaServed` (South Florida; United States) and a `ProfessionalService` type |
| `src/app/contact/page.tsx` | Scheduling-first layout, new metadata |
| `src/components/site/diagnostic-form.tsx` | Pressure options → SMB symptoms (leads/follow-up, owner bottleneck, CRM trust, manual work between systems, AI tools, reporting→action, knowledge risk, enterprise/healthcare program, other). Add a **revenue band** select and a **business type** field. Keep "de-identified" guidance. |
| `src/app/contact/actions.ts` (+ test) | Accept the new fields; `qualified_intake_indicator` = revenue ≥ $5M **and** timing ≤ 90 days |
| `public/og-tko-3.svg/.png` (new asset) | New social image; `site.socialImage` points to it |

*Note:* 1b touches about 10 files. If `actions.ts` needs a lead-type change in
`src/lib/leads/types.ts`, split the form work into its own PR (1c). **No DB migration**: store
the new fields in the existing free-text or JSON columns, or confirm the columns in
`prisma/schema.prisma` first. If a column is required, stop and propose it separately.

### M.2 Phase 2: Proof and founder (≤8 files)

| File | Change |
|---|---|
| `src/lib/content.ts` | Reorder: RachelOS first, rewritten per F.2. Add a `group: "operating-systems" \| "enterprise"` field. Healthcare cases keep their text; relabel the classification "Enterprise experience". |
| `src/app/selected-work/page.tsx` | Title "Proof"; two groups; new metadata |
| `src/app/selected-work/[slug]/page.tsx` | Enterprise-group cases get an `/enterprise` CTA instead of the constraint call |
| `src/components/site/evidence-note.tsx` | Evidence rules restated for the new hierarchy |
| `src/lib/founder.ts` | New headline and archetypes (operator-builder). `careerTimeline` is kept but TKO's own entry is rewritten; add "Where the pattern was learned" data |
| `src/app/founder/page.tsx` | Restructure: pattern-recognition first, career second |
| `src/app/how-it-works/page.tsx` (new, from `approach`) | Constraint loop; systems of record vs action; human-judgment stance |
| `next.config.ts` | `/approach` → `/how-it-works` |

Delete `src/app/approach/page.tsx` in the same commit (the redirect replaces it).

### M.3 Phase 3: Lanes and problems (1 new directory)

| File | Change |
|---|---|
| `src/app/enterprise/page.tsx` (new) | Enterprise and healthcare lane; lists `enterpriseOffers`; links to 4 healthcare cases, 2 healthcare guides, delivery partners |
| `src/app/healthcare/page.tsx` | Retitle as the healthcare section of the enterprise lane; CTA → `/enterprise` conversation |
| `src/app/problems/page.tsx` (new dir) | Hub |
| `src/app/problems/[slug]/page.tsx` | Data-driven page |
| `src/lib/problems.ts` (new) | 3 problems (phase 3a); schema: symptom list, cost-of-doing-nothing, what TKO builds, proof block, guide links, offer |
| `src/app/sitemap.ts` | Add `/enterprise`, `/problems/*`, `/how-it-works`; remove the readiness check |
| `src/components/site/header.tsx` | Add "Problems" |
| `next.config.ts` | Readiness-check redirect |

### M.4 Phase 4: Content system (≤8 files per batch)

- `src/lib/guide-clusters.ts`: add 5 SMB clusters (the H.2 pillars). Keep the healthcare
  clusters and add an `lane: "primary" | "enterprise"` field.
- `src/lib/guide-validation.ts` (+ test): the offer slug must exist in `offers` **or**
  `enterpriseOffers`, and primary-lane guides must name a `problem` page.
- Frontmatter updates in `src/content/insights/*.md`: `offer` fields that point at retired
  slugs, and `cluster` and `primary_buyer` retargeting for the Human-API and AI-delivery pieces.
- New guides per H.4, one PR per 1–2 guides, each passing `npm run guides:validate`.
- `content/outreach/target-accounts.csv`: new enums for `relevant_offer` (new slugs), `segment`,
  `revenue_band`, and `path_in` (add `partner`, `event`). This is data only.

### M.5 Analytics and CTA tracking

- Load an analytics consumer in `layout.tsx`. The existing `dataLayer`/`tko:conversion` events
  currently go nowhere.
- Extend `conversionEventNames` with `scheduling_click`, `problem_page_view`,
  `sample_report_download`, and `enterprise_view`. Add `segment` and `revenueBand` properties
  (sanitized like the existing properties). Update `conversion-events.test.ts`.
- `ConversionTracker`: fire `problem_page_view` on `/problems/*` and `enterprise_view` on
  `/enterprise` and `/healthcare`.
- Tag every CTA with `data-cta-location` (existing pattern). UTM convention for outbound:
  `utm_source=outbound|partner|linkedin&utm_campaign=<segment>-<month>`.
- Primary funnel report: sessions → problem/service view → scheduling click or form start →
  submit → qualified.

### M.6 Content to preserve, archive, and retire

| Preserve (live) | Preserve (enterprise lane) | Archive (repo only) | Retire (301) |
|---|---|---|---|
| Human-API guide (retargeted), AI-delivery guide, RachelOS case | 4 healthcare cases, PA guide, "healthcare programs stall" guide, `/healthcare`, enterprise offers | `docs/TKO-2.0-STRATEGY.md` → `docs/archive/` with a superseded header; P0 audit gets a superseded header | `/approach`, readiness check, `/services/executive-diagnostic`, `/services/operating-model-design` |

Also update `CURRENT_REALITY.md` (Primary Position), `docs/OPERATING-BOUNDARIES.md` (RachelOS
reopened for instrumentation; commercial paths), and add a `DECISIONS.md` entry
`DEC-2026-09-XX-TKO-Primary-Market-Repositioning`. These are docs only.

### M.7 SEO risk and mitigation

- **Risk: low to moderate.** The site is young, and there is no evidence of meaningful organic
  traffic (no analytics consumer). Ranking loss on healthcare terms is expected and acceptable.
  Those pages stay live on the same URLs.
- **Mitigations:** 301 every retired URL with **no chains** (add a test); keep all insight and
  case URLs; submit the new sitemap in Search Console; watch 404s and coverage for 4 weeks;
  change titles once, not repeatedly.
- **Canonical hygiene:** every new page sets `alternates.canonical`; `/healthcare` and
  `/enterprise` must not target the same query (healthcare = domain, enterprise = engagement model).

### M.8 Test requirements, validation, rollback, regression risk

- **Per phase:** `npm run lint`, `npm test`, `npm run build`. The pre-existing baseline is 2
  failing private TIF/OI UI tests; no new failures are allowed.
- **New tests:** a redirect test that parses `next.config.ts` `redirects()` and asserts no
  destination is itself a redirect source (no chains) and no loops. Offer tests for both ladders.
  Guide validation with the new clusters. Contact-action tests for the new fields and the
  qualification rule. Conversion-event sanitization for the new properties.
- **Manual smoke (Playwright available):** home, services, each offer, contact submit (with
  notification env absent → `skipped` path), `/healthcare`, `/enterprise`, 5 legacy redirects,
  mobile nav.
- **Rollback:** each phase is one revertible commit or PR. No migrations or data writes, so a
  revert restores the prior site fully. Redirects revert with `next.config.ts`.
- **Regression risk:** *Medium* in Phase 1. Current offer slugs are referenced outside
  `offers.ts` in: all 5 insights' frontmatter, `src/lib/guide-clusters.ts`,
  `src/lib/content.ts` (`relatedOfferHref`), `src/components/site/authority-links.tsx`,
  `src/app/services/page.tsx`, `src/app/program-recovery-readiness-check/page.tsx`, and the
  tests `guide-validation.test.ts`, `repurposing.test.ts`, and `insights/[slug]/page.test.tsx`.
  Keeping the enterprise slugs resolvable (M.1) means most of these keep working unchanged. *Low* in Phases 2–4.
  **Out of scope and untouched:** TIF, OI/POIS, Prisma schema, scoring, queue ranking, and
  lifecycle logic (CLAUDE.md RachelOS/TIF rules).

---

## Appendix 1: Language guide

| Use | Avoid |
|---|---|
| "the person is the operating system" | "digital transformation" |
| "what happens next, and who does it" | "unlock", "leverage AI", "seamless", "cutting-edge" |
| "find the constraint", "the constraint moves" | "end-to-end solutions", "holistic" |
| "build the missing layer" | "operational truth layer", "execution authority" (enterprise lane only) |
| "keeps human judgment where it belongs" | "autonomous", "AI agents run your business" |
| "prove it changed the numbers" | unverified %, ROI, "10x" |
| "Todd builds it" / "I build it" | "our team of experts" (there is no team; don't pretend) |

**Voice:** first person ("I") for the founder-led reality on About and in CTAs. "TKO" on
method and service pages. Short sentences. One idea per paragraph.

## Appendix 2: Open questions for Todd

1. Employment and conflict position (gating for enterprise healthcare and possibly all outside work).
2. Rachel's permission scope (name, screenshots, transaction references).
3. Domicile for Palm Beach County SBE eligibility.
4. Whether to keep the enterprise offers live at existing URLs (recommended) or redirect them.
5. The founding-client terms you're comfortable with (price, case-study rights, reference).
6. Capacity: how many hours per week TKO actually gets in the next 90 days. This sets the
   realistic concurrent-client ceiling.

## Sources (web research, 2026-09-27)

- Systems of action as a vendor/VC category: [Microsoft Dynamics 365](https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2025/10/21/from-systems-of-record-to-systems-of-action-dynamics-365-agentic-business-applications-for-the-frontier/), [Bessemer Venture Partners](https://www.bvp.com/atlas/roadmap-ai-systems-of-action), [QAD](https://www.qad.com/blog/2026/03/how-agentic-ai-is-turning-systems-of-record-into-systems-of-action-for-manufacturers), [Forbes Tech Council](https://www.forbes.com/councils/forbestechcouncil/2026/06/02/systems-of-record-are-not-enough-why-enterprises-must-shift-to-systems-of-action/), [Worknet](https://www.worknet.ai/blog/system-of-action-vs-system-of-record)
- Owner-bottleneck SERP character: [World Consulting Group](https://www.worldconsultinggroup.com/operations-management-consulting/), [Michael D. Morrison](https://www.michaeldmorrison.com/mdmarticles/2026/8/21/business-owner-bottleneck), [Chalifour Consulting](https://chalifourconsulting.com/business-systems-consultant-building-a-company-without-chaos/)
- South Florida fractional competition: [Royal Palm Consulting](https://www.alignable.com/boca-raton-fl/royal-palm-consulting/fractional-coo-services-strategic-operating-consulting), [MarkCMO](https://markcmo.com/fractional-coo-west-palm-beach-fl), [Vessel Advisors](https://vesseladvisors.com/locations/south-florida.html)
- 2026 AI and ops consulting price benchmarks: [ClearForge](https://clearforge.ai/insights/ai-consulting-cost), [Leanware](https://leanware.co/insights/how-much-does-an-ai-consultant-cost), [Layer3 Labs](https://www.layer3labs.io/ai-consulting-for-small-business)
- Federal: [SBA size standards, Federal Register 2026-08-20](https://www.federalregister.gov/documents/2026/08/20/2026-17042/small-business-size-standards), [GovCon Giants size table](https://govcongiants.com/guides/sba-size-standards), [FedBiz Access on the 2026 SAM.gov size error](https://fedbizaccess.com/sam-gov-naics-size-error-2026-renewal/)
- Florida: [MFMP vendor registration requirements](https://www.dms.myflorida.com/business_operations/state_purchasing/myfloridamarketplace/mfmp_vendors/requirements_for_vendor_registration), [State Term Contract 80101500-25-STC Management Consulting](https://www.dms.myflorida.com/business_operations/state_purchasing/state_contracts_and_agreements/state_term_contract/management_consulting_services)
- Local: [Palm Beach County vendor registration](https://discover.pbc.gov/procurement/Pages/Vendor-Registration.aspx), [PBC OSBD certification](https://discover.pbc.gov/HED/osbd/Pages/Certification-Program.aspx), [Broward County SBE certification](https://www.broward.org/econdev/SmallBusiness/Certification), [Miami-Dade SBE programs](https://www.miamidade.gov/global/strategic-procurement/small-business-enterprise-certification.page)
