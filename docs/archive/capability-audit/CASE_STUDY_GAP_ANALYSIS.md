# CASE_STUDY_GAP_ANALYSIS.md
**Phase 5 — Case-study leverage audit**
Audited: 2026-06-24. Question: does the website fully leverage RachelOS, CRE Intelligence, and the operational-intelligence work?

---

## Project 1 — RachelOS (the flagship; live + deployed)

- **Strongest story:** "System of record vs system of action." A capable operator with every tool still missed what mattered because nothing converted what was *known* into what to *do next*. Already written beautifully in `content/selected-work/`.
- **Strongest proof:** It is **deployed and runs daily** — Vercel cron `/api/cron/run-all` at 11:00, 59 migrations, 57 test files, ~20K LOC of decision logic, live Anthropic AI. This is verifiable, not narrative.
- **Strongest operational outcome:** The morning no longer begins with reconstruction across 4 tools — a single ranked queue (`canonicalQueue.ts`) + one daily email (`dailyActionEngine.ts`) tells the operator who needs attention and why; relationship memory now lives outside one person's head (`relationshipMemory.ts`).
- **Strongest business outcome:** *Deliberately unclaimed* (no revenue figure). The honesty is itself a credibility asset for skeptical operator buyers.
- **Missing narrative on the website:**
  1. **No product evidence.** Zero screenshots/diagrams of the queue, the "Needs Rachel" approval surface, or the daily email. The single most demoable system is described only in prose.
  2. **The named subsystems are hidden.** Canonical Queue, Relationship Intelligence Engine, Intelligence-Gap Detection, Outreach Drafting, System-Health — none named. Naming them makes the work concrete and defensible.
  3. **The "it actually runs every day" fact is buried.** "Deployed, autonomous daily cadence, human-approved" should be a headline.
  4. **Intelligence-gap detection** ("the system that surfaces what it doesn't know") is a rare, memorable differentiator reduced to one sentence.

## Project 2 — CRE Intelligence (prototype; architecture-first)

- **Strongest story:** "The same intelligence pattern generalizes." A second, different domain (commercial real estate) built on the *same* Entity→Intelligence→Report philosophy with provenance-tagged facts.
- **Strongest proof:** Working comparison, recommendation, and content-gap engines over a shared, domain-agnostic intelligence model (`lib/intelligence/model.ts`, `lib/engines/*`).
- **Strongest operational insight:** Lease-lifecycle signals = "an approaching lease end is an opportunity *with timing*" — the commercial twin of buyer-timeline urgency (`leaseSignals.ts`).
- **Strongest business outcome:** None yet (prototype, in-memory, manual data).
- **Missing narrative:** The website ignores CRE completely. It should NOT be promoted as a data/market product (it isn't one), but it *is* legitimate proof that **the method is portable across domains** — a meaningful answer to "will this work for *my* business, not just real estate?"

## Project 3 — Enterprise healthcare work (resume credential; no code)

- **Strongest story:** Dependency-layer failure in large modernization programs — teams show green while enterprise delivery risk accumulates between them.
- **Strongest proof:** Deep functional knowledge (CMS prior-auth, care management, eligibility, interoperability). **But: no artifacts, named clients gated, metrics unconfirmed.**
- **Strongest operational/business outcome:** Asserted, **not currently provable.**
- **Missing narrative / problem:** These are presented as **case studies** (implying provable engagements) when they are really **advisory experience credentials**. For a cold prospect they read as unverifiable. They also *outnumber* the one provable case 3:1, diluting the strongest asset.

---

## Leverage scorecard

| Asset | Proof strength (actual) | Website leverage (current) | Leverage gap |
|---|---|---|---|
| RachelOS — deployed system | **Very high** | Medium (prose only) | **Largest gap** |
| RachelOS — named subsystems | High | ~None | Large |
| RachelOS — "runs daily, autonomous + approved" | High | Low | Large |
| CRE — pattern generalizes | Medium | None | Medium |
| Healthcare — advisory credibility | Medium (unverifiable) | High (3 case studies) | **Over-leveraged** |
| Insights / essays | Content largely written | None published | Medium |

## Recommendations (highest leverage first)
1. **Turn RachelOS into a product-evidence case study**, not just a narrative: annotated screenshots of the queue, the approval surface, and the daily email; name the subsystems; state "deployed, runs daily, human-approved."
2. **Re-label the 3 healthcare studies as "Advisory Experience" / "Background"**, not "Case Studies," until attribution/metrics are confirmed — and stop letting them outweigh the provable work.
3. **Add a short CRE "second-domain" proof block** ("the same architecture, applied to commercial real estate") — framed as method-portability, not a data product.
4. **Publish 2–3 Insights essays** mined directly from the RachelOS narrative ("System of record vs system of action," "Human-in-the-loop AI that earns trust," "The system that knows its blind spots"). The writing already exists.
