# TKO Website Strategy

Generated: 2026-06-16
Grounded in: TKO_KNOWLEDGE_BASE.md, OFFERINGS_V2.md, CASE_STUDIES_V2.md
Status: Strategy only. Do not implement without confirming positioning and pricing with founder.

---

## Critical Prerequisite: Fix the Live Site Before Any Outreach

The current `src/app/page.tsx` contains:
- Headline: "TKO Solutions — Automation Strategy & Workflow Design"
- Subhead: "We map messy processes, design clean workflows, and stand up no-code/AI prototypes so your team ships outcomes — without hiring developers."
- Packages: $750 diagnostic · $3k–$5k prototype sprint · $1.5k–$3k/month retainer

This is not a brand alignment problem. It is a live credibility failure. A healthcare VP who receives an outreach message about operational transformation, visits this site, and reads "$750 no-code prototype" will not respond. They will assume the outreach was misdirected.

**Minimum viable fix — do this before any outreach:**
Replace the hero headline and description with one accurate sentence about who TKO serves. Remove the $750 package. Remove "no-code prototypes." This takes 15 minutes and prevents every warm lead from bouncing.

Suggested interim hero (pending positioning confirmation):
> **TKO Solutions** helps healthcare organizations recover stalled transformations and build the operating systems that make AI investments produce measurable results.
> [Start the Diagnostic →]

---

## Brand Positioning

**What TKO is:** A business operating systems consultancy for complex, workflow-driven organizations. The deliverable is a working system — not a deck, a prototype, or a set of recommendations.

**Primary market:** Healthcare transformation recovery and operational intelligence.

**Tier-1 healthcare wedge:** Prior Authorization Operational Assessment. Position this as operational quality improvement before Gold Card, automation, AI, FHIR, claims, or payer technology work. Gold Card readiness is an output of operational quality, not the product.

**Brand character:** Precise. Evidence-led. Operator perspective. Confident without grandiosity. Uses the language executives use — not vendor buzzwords.

**What TKO is not (must not appear anywhere on the site):**
- A no-code automation agency
- An AI hype firm
- A general management consultancy
- A SaaS company
- A prototype shop

---

## Homepage Thesis

> Organizations don't fail at transformation because they chose the wrong tools. They fail because no one can see where the work is actually stalling — and there's no operating system to fix it once they do.

The homepage proves this thesis, names the specific buyer pain, explains the method, shows the proof, and offers one clear next step.

---

## Tagline Options

Ranked by preference:

1. **"We build business operating systems."** — Direct. Category-defining. Differentiates from every alternative. Use as the brand line below the TKO Solutions name.
2. **"Where work stalls, we build the system that fixes it."** — Problem-led. Implies forensic approach. Use as homepage sub-headline.
3. **"Operational intelligence for complex work."** — More technical. Appropriate for services pages and case studies.
4. **"Recover the transformation. Build the system."** — Healthcare-specific, urgency-forward. Use on healthcare-targeted landing pages.

---

## Core Messages

**For the buyer who doesn't know TKO:**
Most AI and transformation programs fail not because the tools are wrong, but because the work, decisions, data, and accountability are too fragmented for any tool to be effective. TKO fixes the workflow and the decision system, not the tool selection.

**For the buyer evaluating TKO vs. a strategy firm:**
Strategy firms diagnose and recommend. TKO diagnoses and builds. The deliverable is a working system with canonical next actions, human-controlled AI, and operational alerting — not a presentation.

**For the buyer evaluating TKO vs. a software shop:**
Software shops build what you ask for. TKO starts from operational failure and designs the system the workflow actually needs. The output may be software, process, or both — whatever the operating model requires.

**For the buyer evaluating TKO vs. a large SI:**
Large SIs move slowly and build platforms before proving need. TKO is faster, proof-gated, and useful when a stalled program needs fast clarity without over-architecture.

---

## Sitemap

### One-Page Launch Site (build first — Week 1 priority)

Single scrolling page. All content above the fold of each section is visible without clicking.

```
[Header]      TKO Solutions · [Start the Diagnostic]
[Hero]        Thesis statement + primary CTA
[Problems]    5–6 named buyer pains in plain language
[Method]      The Operational Truth Framework (7 questions)
[How]         The Business Operating System architecture (Signals → Outcome)
[Services]    3 offers: name, problem, timeline, starting price
[Proof]       2–3 anonymized case studies: Situation / Approach / Outcome
[About]       One paragraph, founder credibility framing
[Contact]     Diagnostic intake form (5 qualifying questions)
[Footer]      © TKO Solutions · Terms · Privacy
```

Build this first. It takes 1–2 days of development work on the existing Next.js site. It is sufficient to support outreach for the first 90 days.

### Full Site (build after first paid engagement or when case studies are ready)

```
/                       Home (expanded from one-pager)
/services               Services overview
/services/diagnostic    Operational Intelligence Diagnostic (full detail page)
/services/build         Operating System Build
/services/advisory      Fractional Operating System Advisor
/case-studies           Index
/case-studies/[slug]    Individual case study pages
/insights               Thought leadership articles
/about                  Founder story, methodology, experience
/contact                Diagnostic intake form
/terms                  (already built)
/privacy                (already built)
```

Do not build the full site before publishing at least one case study and starting at least one paid engagement. The shell without proof looks like a vendor who hasn't yet worked with clients.

---

## CTA Strategy

**Primary CTA everywhere:** `Start the Diagnostic →`

This is specific. It creates an expectation. It signals that something happens when clicked — not a generic "contact us" inbox.

**Secondary CTA (for content pages):** `Schedule a Conversation`

**Tertiary CTA (for thought leadership):** `Download the [Framework Name]`

**Rules:**
- One primary CTA per page. Never two competing CTAs.
- Never "Learn More" — it commits to nothing.
- Never "Get Started" — too vague.
- The diagnostic intake form is the CTA destination, not a generic contact form.

**Diagnostic intake form questions:**
1. What operational problem are you trying to solve?
2. What systems or workflows are involved?
3. What is not working today?
4. Is AI already being deployed or piloted?
5. What decision needs to be made in the next 90 days?

These questions qualify the buyer, prime the first conversation, and signal that TKO's work is specific — not generic.

---

## Lead Generation Strategy

The site does not generate leads before the brand is established. Its job for months 1–3 is credibility confirmation. When a warm contact receives outreach and visits the site, they should find: "Yes, this is who I thought it was. Yes, they can do what they described."

**Lead generation sequence (in priority order):**

1. **Network outreach → site visit → call booked.** A personalized message creates context. The site confirms it. The conversion happens in conversation, not on the page.
2. **Consulting partner referral → one-pager → site.** Partner introduces TKO to a client. Client visits the site to validate.
3. **LinkedIn content → profile → site.** Posts create interest. LinkedIn profile channels it. Site confirms credibility.
4. **SEO inbound (months 4–12).** Long-tail healthcare search terms. Builds over time, not in week one.

The site should never be the primary lead source in the first 90 days. The site is insurance against a warm lead talking themselves out of a call.

---

## SEO Opportunities

**Primary terms (high intent, low volume, right fit):**
- healthcare transformation recovery consultant
- healthcare operational intelligence consulting
- prior authorization workflow modernization
- prior authorization operational assessment
- healthcare AI governance consulting
- stalled transformation recovery

**Secondary terms:**
- business operating system consulting
- healthcare administrative burden reduction
- human-in-the-loop AI consulting
- operational intelligence system

**SEO approach:**
Start with one well-structured homepage optimized for the primary terms. Add case study pages as they are published — each is a targetable URL for a specific topic. Add one insight article per month once thought leadership is active.

Do not invest in SEO before case studies and thought leadership exist. An optimized site with no content is just a faster way for the wrong buyer to find TKO.

---

## Recommended Domain Strategy

**Preferred domain:** `tko-solutions.com` (or `tkosolutions.com` if available)

If neither is available: `tkoconsulting.com`, `tko-advisory.com`, or a variant. Avoid hyphens in the primary domain if possible.

**Check immediately:**
- Is the domain owned? Is it live?
- Does the live version match what is described in this document?
- If not, what is the minimum change required before outreach begins?

**Email:** Ensure professional email is set up at the domain before outreach. A gmail.com address undermines the enterprise positioning.

---

## One-Page Launch Site — Draft Copy

### Hero
**TKO Solutions**

Most AI and transformation programs fail not because the tools are wrong.
They fail because no one can see where the work is actually stalling.

We build business operating systems for healthcare organizations where transformation programs are underperforming, AI isn't producing results, and leadership can't get a trusted view of what's happening.

[Start the Diagnostic →]

### Problems We Solve
You're not alone if one of these sounds familiar:
- "The transformation is running, but we can't explain where the value is."
- "We've invested in AI. Adoption is low. ROI is unclear."
- "Teams are using spreadsheets alongside the systems we bought."
- "Leadership is asking why results aren't showing up. Nobody has a confident answer."
- "We have a strategy. We don't have a system that executes it."

### The Method
**The Operational Truth Framework**
Before building anything, we answer seven questions:
1. What is supposed to happen?
2. What actually happens?
3. Where does work stall?
4. What does your organization already know but fail to use?
5. What should the next action be?
6. Where can AI help without removing human control?
7. How will success be measured?

These questions have not failed to surface the real constraint — in $20M+ healthcare programs, in prior authorization workflows, and in single-operator relationship-intensive businesses.

### How We Work
Every TKO engagement produces a working system, not a recommendation.

`Signals → Relationship Memory → Facts → State → Canonical Action → Human Approval → Outcome`

Each layer is a deliverable. The system runs after we leave.

### Services
**Operational Intelligence Diagnostic** — 3 weeks · from $25,000
Find where the work is actually stalling. Ten prioritized recovery opportunities. 90-day roadmap. Executive brief.

**Operating System Build** — 8–12 weeks · from $50,000
Design and build the decision system: canonical next actions, human-controlled AI, operational alerting, measurement model.

**Fractional Operating System Advisor** — 3–6 months · from $12,000/month
Senior transformation leadership to maintain recovery momentum without a full-time hire.

### Proof (abbreviated — expand when case studies are published)
- 40–60% reduction in manual prior authorization review effort
- $200M+ annualized operational value from payer/provider workflow redesign
- $20M+ care management modernization program de-risked across 24 enterprise applications
- Production operating system built from scratch: relationship memory, canonical next actions, approval-gated AI, operational alerting

### About
Todd Kovalsky is the founder of TKO Solutions. He has led healthcare operational transformation at enterprise scale — prior authorization modernization, interoperability platform delivery, and care management program governance across $12M–$20M+ portfolios.

He has also built a production business operating system from scratch, proving the TKO architecture pattern in a real operating environment with real operational constraints.

TKO exists to do what strategy consultants, software shops, and AI vendors do not: leave a working system behind.

### Contact / Diagnostic Intake
Tell us about your situation. We respond within one business day.

[Five-question intake form as defined in CTA section above]

---

## Full Site Evolution Notes

When expanding beyond the one-pager:
- Add individual service pages only when case studies exist to substantiate the claims on those pages.
- Add the Insights section only when the first article is written and published — not as a placeholder.
- Keep the About page focused on proof and methodology, not biography. Healthcare executives buy credibility, not résumés.
- The case study pages are the highest-ROI content investment after the site launches. Prioritize one complete case study over a polished empty site.
