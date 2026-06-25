# Visual Asset Master Plan

**Purpose:** Define every visual asset required to make TKO's proof *visible* — screenshots,
diagrams, workflow maps, and architecture graphics — aligned to
[`CURRENT_REALITY.md`](CURRENT_REALITY.md). This is a **requirements specification, not a
production deliverable.** No visuals are generated here.

**Why this exists:** The capability audits found that TKO's single largest gap is
presentation, not capability — a deployed Operational Knowledge System is hidden behind
abstract language. Closing that gap requires concrete visuals. This plan is the backlog.

**For every asset, this plan defines:**

- **Purpose** — what the visual must prove or explain
- **Audience** — who it is for
- **Page Destination** — where it will be used
- **Required Inputs** — what must exist to produce it (source, capture environment, data)

**Sources:**
- RachelOS visuals capture from the deployed `rachel-realestate` ops UI (`src/app/ops/*`).
  See [RachelOS Evidence Library](content/proof/rachelos/RACHELOS_EVIDENCE_LIBRARY.md).
- Healthcare visuals are **illustrative/anonymized** — no client data, no real PHI, no
  named programs. See [Healthcare Experience Library](content/proof/healthcare/HEALTHCARE_EXPERIENCE_LIBRARY.md).
- TKO visuals illustrate the operating model and framework from `CURRENT_REALITY.md`.

**Priority key:** `P0` = blocks website/sales work · `P1` = high leverage · `P2` = supporting.

---

## Category A — RachelOS (product evidence)

Captured from the live ops UI. These carry ~80% of marketing proof weight. All are
**required, none yet captured.** Anonymize any real names/PII in capture (use demo data or
redaction).

### A1. Queue — Canonical Queue screenshot — `P0`
- **Purpose:** Prove "one ranked list of who needs attention now and why," with freshness classes.
- **Audience:** All buyers; skeptical operators especially.
- **Page Destination:** Homepage, RachelOS case study, Build service page, Sales Deck, Assessment PDF.
- **Required Inputs:** `/ops/queue` view (`canonicalQueue.ts`, `app/ops/queue`); demo/anonymized data populating ranked rows with Healthy/Aging/Stale/Critical badges.

### A2. Digest — Daily Action Engine screenshot — `P0`
- **Purpose:** Prove "one email a day that runs the business," deployed on a daily cron.
- **Audience:** Operators, COO/VP Ops.
- **Page Destination:** Homepage, RachelOS case study, Build service page, Sales Deck, Assessment PDF.
- **Required Inputs:** Rendered daily digest email (TODAY'S FOCUS / DO THESE TODAY / NEXT UP) from `dailyActionEngine.ts`; sample composed output; note the `0 11 * * *` cron as caption.

### A3. Journey — Journey Intelligence screenshot — `P1`
- **Purpose:** Show facts → interpreted state → recommended next step (facts override stage).
- **Audience:** Operations/transformation buyers.
- **Page Destination:** RachelOS case study, Build service page.
- **Required Inputs:** Journey/lifecycle state view (`journeyIntelligence.ts`, `journeyView.ts`) with derived recommendation visible.

### A4. Memory — Relationship Memory screenshot — `P0`
- **Purpose:** Prove durable, cross-source memory that lives outside one person's head (the human-API antidote).
- **Audience:** All buyers; the "human API" narrative.
- **Page Destination:** Homepage, RachelOS case study, Build service page, Sales Deck.
- **Required Inputs:** Relationship-memory detail (`relationshipMemory.ts`, `migrations/055`) showing situation, known facts, open questions, event timeline.

### A5. Approval — Human-Approved AI ("Needs Rachel") screenshot — `P0`
- **Purpose:** Prove the live human-in-the-loop control point — nothing sends unapproved.
- **Audience:** All buyers; AI-skeptical and regulated buyers especially.
- **Page Destination:** Homepage, RachelOS case study, all service pages, Sales Deck, Assessment PDF.
- **Required Inputs:** `/ops/needs-rachel` approval surface with pending AI drafts awaiting review.

### A6. Intelligence — Intelligence-Gap screenshot — `P1`
- **Purpose:** Prove "the system that knows its blind spots" — the next highest-value missing fact.
- **Audience:** All buyers; differentiated/memorable.
- **Page Destination:** Homepage (differentiator), RachelOS case study, Build service page, Sales Deck, Assessment PDF.
- **Required Inputs:** Intelligence-gap prompt (`intelligenceGaps.ts`, `nextMissingField.ts`) shown in a relationship context.

### A7. Outreach draft lifecycle screenshot — `P2`
- **Purpose:** Show governed drafting — context-aware draft + copy-safety + lifecycle state.
- **Audience:** AI-adoption buyers.
- **Page Destination:** RachelOS case study, Build service page, Sales Deck.
- **Required Inputs:** Outreach draft detail (`outreachDrafts.ts`) showing state (pending/sent/skipped/…) and safety indication.

### A8. System-Health (Operational Visibility) screenshot — `P1`
- **Purpose:** Prove the system is self-monitoring (trusted execution).
- **Audience:** Operations/transformation buyers, governance-minded sponsors.
- **Page Destination:** RachelOS case study, Build/Fractional service pages, Sales Deck, Assessment PDF.
- **Required Inputs:** `/ops/system-health` (`runSmokeTest.ts`, `migrations/015/030/024`) with cron runs + smoke-test status.

---

## Category B — Healthcare (illustrative diagrams)

**All illustrative/anonymized — no client data, no PHI, no named programs.** These visuals
explain the *pattern*, not a real engagement.

### B1. Workflow maps (prior authorization / utilization management) — `P0`
- **Purpose:** Show a complex, exception-heavy workflow and where it stalls — making "administrative burden = hidden decision latency" visible.
- **Audience:** Healthcare payer/provider operations leaders.
- **Page Destination:** Healthcare/advisory page, Assessment PDF, Sales Deck.
- **Required Inputs:** Generic PA/UM workflow stages from the Healthcare Experience Library (items 1–2); no real policy logic or client process.

### B2. Governance diagrams (decision rights) — `P1`
- **Purpose:** Visualize a decision-rights / authority model — who can decide what and on what basis.
- **Audience:** Transformation sponsors, compliance.
- **Page Destination:** Healthcare/advisory page, Build service page, Assessment PDF.
- **Required Inputs:** Generic decision-rights structure (Healthcare items 1, 5, 7); illustrative roles only.

### B3. Decision trees (exception handling) — `P1`
- **Purpose:** Show how exceptions *should* route vs. how they route when logic is tacit.
- **Audience:** Operations leaders.
- **Page Destination:** Healthcare/advisory page, Assessment PDF.
- **Required Inputs:** Generic exception-path logic (Healthcare items 1, 2, 6).

### B4. Escalation paths — `P1`
- **Purpose:** Contrast person-dependent escalation vs. defined escalation model.
- **Audience:** Operations/transformation leaders.
- **Page Destination:** Healthcare/advisory page, Sales Deck, Assessment PDF.
- **Required Inputs:** Generic escalation model (Healthcare items 1, 5, 7).

### B5. Human API examples (illustrative) — `P0`
- **Purpose:** Make the "one person becomes the operating system" failure mode visceral and visual.
- **Audience:** All buyers (this is the master narrative).
- **Page Destination:** Homepage, Healthcare/advisory page, "The Human API" story, Sales Deck, Assessment PDF.
- **Required Inputs:** "The Human API" story (Story 1); before/after — all arrows through one person vs. routed through a governed system.

---

## Category C — TKO (operating model / framework)

Conceptual graphics that explain the TKO thesis itself.

### C1. Operating model graphic — `P0`
- **Purpose:** Show what an Operational Knowledge System is — how TKO turns institutional knowledge into a governed operating layer.
- **Audience:** All buyers; the category-definition visual.
- **Page Destination:** Homepage, About, Services index, Sales Deck.
- **Required Inputs:** Secondary-position definition from `CURRENT_REALITY.md` (Operational Knowledge Systems).

### C2. Knowledge-flow graphic — `P1`
- **Purpose:** Visualize "information ≠ understanding ≠ decision ≠ execution" and where TKO operates.
- **Audience:** Executive buyers.
- **Page Destination:** Homepage, About, Essays, Sales Deck.
- **Required Inputs:** Core Thesis section of `CURRENT_REALITY.md`.

### C3. Framework spine graphic — `P0`
- **Purpose:** Render the full spine — `Signals → Memory → Facts → State → Priority → Recommendation → Human Approval → Action → Outcome` — and map RachelOS capabilities onto each stage.
- **Audience:** All buyers; the proof-that-the-category-is-real visual.
- **Page Destination:** Homepage, RachelOS case study, Build service page, Sales Deck, Assessment PDF.
- **Required Inputs:** Unified Pattern in `CURRENT_REALITY.md`; capability→stage map in the RachelOS Evidence Library.

---

## Consolidated production backlog (priority order)

| ID | Asset | Type | Priority | Primary destination |
|---|---|---|---|---|
| A1 | Canonical Queue | Screenshot | P0 | Homepage / Case study |
| A2 | Daily Digest | Screenshot | P0 | Homepage / Case study |
| A4 | Relationship Memory | Screenshot | P0 | Homepage / Case study |
| A5 | Needs Rachel (approval) | Screenshot | P0 | Homepage / all services |
| B1 | PA/UM workflow map | Diagram | P0 | Healthcare / Assessment PDF |
| B5 | Human API example | Diagram | P0 | Homepage / story |
| C1 | Operating model | Graphic | P0 | Homepage / About |
| C3 | Framework spine + RachelOS map | Graphic | P0 | Homepage / Case study |
| A3 | Journey Intelligence | Screenshot | P1 | Case study |
| A6 | Intelligence Gap | Screenshot | P1 | Homepage differentiator |
| A8 | System Health | Screenshot | P1 | Case study |
| B2 | Governance diagram | Diagram | P1 | Healthcare |
| B3 | Decision tree | Diagram | P1 | Healthcare |
| B4 | Escalation paths | Diagram | P1 | Healthcare |
| C2 | Knowledge flow | Graphic | P1 | Homepage / essays |
| A7 | Outreach lifecycle | Screenshot | P2 | Case study |

**Capture/production standards (apply to all):**
- RachelOS screenshots: use demo or anonymized data; redact any real PII; consistent
  viewport and theme; caption with the subsystem name and "deployed, runs daily,
  human-approved" where true.
- Healthcare diagrams: explicitly illustrative; no client names, no PHI, no real policy
  logic; label as "illustrative pattern."
- TKO graphics: consistent with the framework spine wording in `CURRENT_REALITY.md` exactly
  (do not paraphrase the stage names).
