# TKO_ALIGNMENT_MATRIX.md
**Phase 4 — Cross-reference: Website vs RachelOS vs CRE Intelligence**
Audited: 2026-06-24.

**Classification key:**
A = Accurately Represented · B = Underrepresented · C = Missing Entirely · D = Overstated · E = Outdated/Aspirational

---

## Master alignment table

| Capability | Repo (evidence) | Website coverage | Class | Gap | Recommendation |
|---|---|---|---|---|---|
| Operational memory / relationship memory | RachelOS `relationshipMemory.ts`, mig `055` | Described abstractly on Home/Build/RachelOS | **B** | Site says "operational memory"; code has a *named, persistent, timeline-based* memory subsystem | Show the subsystem by name; screenshot the relationship-memory view |
| Canonical queue / one trusted next action | RachelOS `canonicalQueue.ts`, `app/ops/queue` | "Action queues" mentioned | **B** | The single most demoable asset (ranked daily queue w/ freshness) is invisible | Add a product screenshot/diagram of the queue to RachelOS case study |
| Daily action engine (morning digest) | RachelOS `dailyActionEngine.ts`, cron `daily-action` | "Daily execution support" (one line in `caseStudies[].evidence`) | **B** | A deployed daily-email engine is buried in a sub-bullet | Make "one email a day that runs the business" a headline proof |
| Human-approved AI / outreach drafting | RachelOS `outreachDrafts.ts`, "Needs Rachel" queue | Strongly themed site-wide | **A** | Well-aligned conceptually | Strengthen with the *actual* approval-queue screenshot |
| Intelligence-gap detection ("surfaces what it doesn't know") | RachelOS `intelligenceGaps.ts` | One narrative line in selected-work Part 4 | **B** | A differentiated, rare capability under-sold | Promote to a named feature/insight ("the system that knows its blind spots") |
| Fact resolution / source authority (human > AI) | RachelOS `rie.ts`, `lead_facts` | Framework "Facts" stage | **B** | The governance story (provenance, authority model) is a buyer-grade differentiator, barely surfaced | Add an "authority model / governed facts" explainer |
| Referral intelligence | RachelOS mig `051`, `app/api/referral` | **None** | **C** | A monetization-relevant capability absent from site | Add as a capability bullet; relevant to PE/ops buyers |
| SMS / two-way conversational intake | RachelOS `lib/sms`, Twilio routes | **None** | **C** | Multi-channel signal capture not shown | Mention multi-channel signal ingestion (email/SMS/web/forms) |
| Email drip / nurture automation | RachelOS `lib/email/**`, `processDrips` | **None** | **C** | Real automation surface invisible | Include in "Signals → Action" proof |
| Operational visibility / system-health / smoke tests | RachelOS `app/ops/system-health`, `runSmokeTest.ts` | "Operational visibility" (narrative) | **B** | A *self-monitoring* system exists; only described in prose | Show it; it proves "trusted execution" |
| Content recommendation | RachelOS `contentRecommendation.ts` | **None** | **C** | — | Minor; fold into "content intelligence" service |
| Healthcare prior-auth modernization | **No code in any repo**; resume-only | Full case study (gated) | **E** | Aspirational/gated — not provable to a prospect today | Keep but clearly mark as advisory/experience credential, not product proof; pursue attribution |
| Enterprise care-management modernization | Resume-only | Full case study (gated) | **E** | Same | Same |
| Healthcare interoperability modernization | Resume-only | Full case study (gated) | **E** | Same | Same |
| AI opportunity review (service deliverable) | Demonstrated by RachelOS AI usage | Diagnostic deliverable | **A** | Backed by real AI implementation experience | OK |
| Measurement model | RachelOS `outcomes.ts`, score snapshots | Build/Fractional deliverable | **B** | Real outcome-tracking code exists but isn't cited as proof | Cite the loop-closing code |
| **CRE Intelligence platform (whole repo)** | `cre-intelligence` engines + model | **None (zero mentions)** | **C** | Entire second proof-of-generalization missing | Add a short "second domain" proof: same architecture, commercial real estate |
| CRE: reusable Intelligence/Report architecture | CRE `lib/intelligence/model.ts` | **None** | **C** | Strongest CRE asset unused | Use as "the pattern generalizes across domains" evidence |
| CRE: comparison/recommendation/content-gap engines | CRE `lib/engines/*` | **None** | **C** | Working engines unshown | Optional capability bullet under "Decision Systems" |
| CRE: automated market-data collection | **Manual photos + YAML only** | **None** | **A (correctly absent)** | Would be **D/overstated** if claimed | Do NOT claim automated data/market intelligence yet |
| CRE: RachelOS integration (live) | **Stub** (`lib/rachel/client.ts`) | **None** | **A (correctly absent)** | Would be overstated if claimed | Do not claim cross-system integration as live |
| Insights / thought leadership | tko-site `/insights` empty | Page exists, no articles | **E** | Stated SEO pillar with zero inventory | Publish the RachelOS-derived essays (content already mostly written in selected-work) |

---

## Summary by classification

- **A — Accurately Represented (4):** Human-approved AI, AI-opportunity experience, and (importantly) the *restraint* of not claiming CRE automation/integration that doesn't exist.
- **B — Underrepresented (8):** Nearly every concrete, demoable RachelOS subsystem (canonical queue, daily action engine, relationship memory, intelligence-gap detection, governed facts, op-visibility, measurement). **This is the dominant finding.**
- **C — Missing Entirely (6):** Referral intelligence, SMS/multi-channel intake, email automation, content recommendation, and the **entire CRE Intelligence repo** (incl. its reusable architecture).
- **D — Overstated (0 on the live site):** None currently — the site is commendably restrained. The *risk* of D appears only if CRE "data/market intelligence" or "RachelOS integration" were ever claimed as automated/live (they are not built that way).
- **E — Outdated/Aspirational (4):** Three gated healthcare case studies + the empty Insights section.

## The one-sentence answer
**"Does TKO accurately represent what Todd has built?"** → It does not *misrepresent* (low overstatement risk), but it **dramatically under-represents** a deployed, tested, AI-backed Operational Intelligence System, while leaning on three *unprovable gated* healthcare stories and ignoring a second supporting prototype (CRE). The fix is almost entirely **"show the proof you already have,"** not "build more."
