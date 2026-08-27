# TKO P0 Positioning Audit — Reconciled

**Status:** Authoritative reconciliation of the August 27 positioning audit and its final P0 verdicts  
**Date:** 2026-08-27  
**Purpose:** Remove contradictions between the early broad-rewrite recommendations and the later evidence-based verdicts. This document authorizes no implementation by itself.

## Executive conclusion

The five P0 items were present in the source audit, but they were appended after recommendations that contradicted them. The source therefore contained the final verdicts without consistently applying them.

The governing conclusion is narrower:

- Preserve TKO's current category: **Healthcare Transformation & Operating Model Advisory**.
- Preserve the current four-offer public ladder and its $5K–$10K paid entry path.
- Preserve administrative-burden reduction, regulated-workflow redesign, transformation execution, and the existing PMO contrast as the principal message system.
- Correct the canonical strategy document immediately because it describes a retired fifth offer.
- Improve the first healthcare experience record conservatively, without overstating ownership or outcome.
- Improve founder identity and generic CTA routing in a later small phase.
- Do not publish the $12M–$20M+ portfolio range until provenance and public-disclosure permission are explicitly cleared.
- Do not introduce Healthcare Transformation Intelligence, a Command Center, Human API, systems of action, generic AI, RachelOS, or recruiter positioning as a competing homepage category or thesis.

## Verification of the five requested P0 items

| P0 | Verdict | Included in source? | Reconciled here? | Governing assessment |
|---|---|---:|---:|---|
| Rewrite first selected-work case | **MODIFY** | Yes | Yes | The altitude issue is real, but only the title and repetitive coordination language should change. Preserve rural specificity, role boundaries, and the published outcome. |
| Principal block, photo, LinkedIn, CredibilityStrip | **MODIFY** | Yes | Yes | Make Todd Kovalsky explicit and add a concise principal identity plus LinkedIn. Do not add a photo without an approved asset or automatically restore the full strip. |
| Replace the $5K secondary CTA | **MODIFY** | Yes | Yes | Route generic secondary CTAs to `/services`; keep problem-specific diagnostic links. This is a conversion refinement, not a P0 positioning emergency. |
| Publish $12M–$20M+ magnitude | **MODIFY — HOLD** | Yes | Yes | Internally supported as program/portfolio scope, not economic impact. Do not publish until source provenance and disclosure permission are resolved. |
| Reconcile canonical strategy | **APPROVE** | Yes | Yes | This is the only unequivocal P0 because the canonical document contradicts the shipped four-offer catalogue and redirects. |

## What the current site gets right

The current public site already establishes the important commercial foundation:

- Healthcare transformation and operating-model advisory is the named category.
- Administrative burden, provider friction, regulated workflow redesign, governed AI, and transformation execution are coherent problem families.
- The homepage now explains the cross-workstream ownership problem and includes a useful PMO-versus-TKO contrast.
- The public offer ladder ends with **Transformation Execution Authority**, priced from $20K to $50K per month by complexity.
- The healthcare experience library includes rural prior authorization, provider eligibility, enterprise readiness, and interoperability.
- Employment-period claims are anonymized and bounded by actual role.
- RachelOS is discoverable through Approach, Selected Work, and Founder while remaining subordinate to the healthcare advisory position.

The current direction should be tightened, not replaced by another category rewrite.

## What remains wrong or incomplete

### 1. Canonical strategy and shipped catalogue disagree

[`docs/TKO-2.0-STRATEGY.md`](/Users/todd/dev/tko-site/docs/TKO-2.0-STRATEGY.md) still describes five offers and retains the retired **Principal Transformation Advisor** tier at $8K/month.

The shipped catalogue in [`src/lib/offers.ts`](/Users/todd/dev/tko-site/src/lib/offers.ts) contains four offers and ends with **Transformation Execution Authority**, while [`next.config.ts`](/Users/todd/dev/tko-site/next.config.ts) permanently redirects the retired advisor route.

Because the strategy document declares itself canonical, this discrepancy can cause future copy, navigation, SEO, offer, and implementation regressions. It is the highest-priority correction.

### 2. The first healthcare experience card leads at the wrong altitude

The title **“Coordinating a Rural Prior-Authorization Initiative”** and the repeated coordination verbs make the first proof item feel closer to program administration than enterprise readiness leadership.

The underlying evidence does support governance, integration forums, dependency visibility, testing coordination, escalation, and readiness oversight. It does not support claiming that Todd originated the commitment or achieved a stronger result than “moved toward enterprise implementation readiness.”

The correction must improve emphasis without upgrading the evidence.

### 3. Founder identity is too implicit on the homepage

The homepage says “Why Todd” but does not name **Todd Kovalsky**. The page already contains four proof bullets and links to About and Selected Work, so it does not need a new résumé-style proof system.

A full-name heading, a concise principal descriptor, and a LinkedIn link are sufficient. A professional photo is conditional on an approved asset. Restoring the entire CredibilityStrip would duplicate the existing proof block and pull the page back toward chronology.

### 4. Generic CTA destinations are inconsistent

Several generic secondary CTAs go directly to the $5K Executive Diagnostic. That offer is intentional and remains valid, so the problem is not the existence of the $5K entry point.

The refinement is contextual routing:

- Generic buyer exploration → `/services`, labeled **Compare Engagements** or **See the Advisory Ladder**.
- A page diagnosing a tightly bounded problem → `/services/executive-diagnostic`.
- A page diagnosing a larger transformation → `/services/transformation-diagnostic`.

No evidence currently proves that the $5K anchor is harming conversion. CTA normalization should therefore follow the true P0 work rather than trigger a sitewide offer change.

### 5. Portfolio magnitude is not cleared for public use

The $12M–$20M+ range exists in the baseline résumé and internal profile. The evidence describes program or portfolio budget scope. It is not savings, attributable value, revenue impact, or an outcome Todd personally produced.

The internal fact base also records unresolved provenance/public-disclosure questions, and public case-study guardrails withhold unpublished metrics.

Until cleared, the number must remain absent from public pages. If later approved, the narrow form is:

> Delivery governance across healthcare transformation portfolios with $12M–$20M+ program scope.

It belongs in career-scale proof, not as a case result.

## Detailed P0 verdicts

### P0-1 — First selected-work case: MODIFY

**Approved direction**

- Preserve the existing slug.
- Preserve “Rural” unless Todd identifies a confidentiality or target-market reason to remove it.
- Prefer a title close to **“Establishing Enterprise Readiness for a Rural Prior-Authorization Initiative.”**
- Retain accurate coordination language where coordination is the work performed.
- Reduce repetition among governance, planning, reporting, forums, and cadence.
- Increase emphasis on integrated readiness, unresolved dependencies, and executive visibility only where the existing evidence supports it.
- Preserve the current result boundary and evidence-limit paragraph.

**Not approved**

- “Making the commitment executable” as an achieved result.
- Implying ownership of strategy, policy, architecture, funding, sponsorship, or the public commitment.
- Removing “Rural” merely to make the title sound broader.
- Replacing every coordination verb with executive-altitude language unsupported by the record.

### P0-2 — Principal identity block: MODIFY, later phase

**Approved direction**

- Change **Why Todd** to **Why Todd Kovalsky**.
- Add a short identifier such as **Founder & Principal, TKO Solutions**.
- Add a LinkedIn link in the existing module.
- Use the existing proof bullets rather than building another chronology block.
- Add a photo only after a professional asset is explicitly approved.

**Not approved**

- Automatically restoring the full CredibilityStrip.
- Reorganizing the advisory homepage for recruiter discovery.
- Treating employer names as client endorsement.
- Adding a placeholder, generated, casual, or unapproved photo.

### P0-3 — Secondary CTA routing: MODIFY, later phase

**Approved direction**

- Inventory generic and problem-specific CTA contexts before editing.
- Route generic exploration CTAs to `/services`.
- Retain relevant diagnostic deep links on problem-specific pages.
- Preserve the $5K Executive Diagnostic as the intentional paid entry point.
- Preserve the $10K Transformation Diagnostic as the standard broader entry engagement.
- Keep CTA-event instrumentation and labels internally consistent.

**Not approved**

- Replacing every Executive Diagnostic link with the Transformation Diagnostic.
- Changing offer prices or the four-offer ladder.
- Calling CTA routing an established P0 conversion failure without behavioral evidence.

### P0-4 — $12M–$20M+ magnitude: MODIFY — HOLD

**Publication gate**

Do not modify public copy until Todd confirms all of the following:

1. The authoritative source of the range.
2. Whether the range represents annual budget, multi-year budget, aggregate portfolio scope, or another measure.
3. Whether the number can be disclosed publicly under employment and client obligations.
4. The precise relationship between Todd's role and the portfolio.
5. The approved anonymized wording.

Even after approval, do not describe the range as value delivered, savings, revenue, economic impact, or personally owned outcome.

### P0-5 — Canonical strategy reconciliation: APPROVE, immediate

Update the canonical strategy to match the shipped system:

1. Replace the five-offer ladder with the current four offers.
2. Remove the retired Principal Transformation Advisor tier.
3. Use the shipped name **Transformation Execution Authority** and the shipped $20K–$50K/month complexity framing.
4. Explain recovery as a use case spanning two stages:
   - **Transformation Diagnostic** determines why the program stalled and what should happen next.
   - **Transformation Execution Authority** governs the accepted restructuring, recovery, integration, and readiness work.
5. Update internal commercial objectives only as needed to eliminate contradiction with the shipped catalogue; do not invent a new revenue target.
6. Preserve the category, buyer, core promise, evidence hierarchy, claim guardrails, canonical routes, and current design principles.

## Where the earlier audit overreached

The following should not control implementation:

- **Healthcare Transformation Intelligence / Command Center as a new category:** conflicts with the canonical instruction to avoid abstract category creation and is unnecessary because Transformation Execution Authority now carries the integration-and-operational-truth value.
- **Three-offer replacement architecture:** conflicts with the shipped four-offer ladder and would constitute a new strategic migration rather than reconciliation.
- **Full homepage, healthcare, services, founder, approach, contact, and navigation rewrites:** disproportionate to the verified gaps and likely to undo the August 27 positioning work.
- **W-2/recruiter halo:** recruiters are not the public site's canonical buyer. Full-name clarity is valuable; recruiter-led architecture is not.
- **Human API as a homepage thesis:** valid diagnostic thought leadership, but conceptual and subordinate.
- **Systems of action as a category:** not established canonical positioning and risks reviving an abstract operational-intelligence direction.
- **Dedicated AI destination as P0:** governed AI already has a coherent destination on Approach and Healthcare. A new route would risk generic AI positioning.
- **RachelOS elevation:** its current supporting role is appropriate. It should not displace enterprise healthcare experience or become the homepage thesis.
- **PMO contrast as proof:** the contrast explains a different job but does not independently prove role or outcomes. Proof must still come from bounded experience records.

## Corrected page-impact assessment

| Priority | Page or asset | Action | Boundary |
|---|---|---|---|
| P0 | `docs/TKO-2.0-STRATEGY.md` | Reconcile | Four offers; recovery spans diagnosis and execution; no new category. |
| P0 | First record in `src/lib/content.ts` | Conservative copy modification | Keep slug, rural specificity, result, and evidence limit. |
| P1 | Homepage founder module | Small identity enhancement | Full name, principal descriptor, LinkedIn; no automatic strip/photo. |
| P1 | Generic secondary CTA call sites | Contextual routing cleanup | Generic → services; problem-specific → relevant diagnostic. |
| HOLD | Public portfolio-scale proof | No public change | Await explicit provenance and disclosure clearance. |
| Preserve | Healthcare, Services, Approach, Founder architecture | No broad rewrite | Existing category and page structure remain authoritative. |
| Preserve | RachelOS and governed-AI placement | No elevation | Supporting evidence and method, not competing homepage theses. |
| Avoid | Offers, redirects, schema, TIF, Opportunity Intelligence | No change in this package | The shipped offer catalogue and runtime are the current-state authority. |

## Scope and sequencing

### Phase 1 — Immediate P0 reconciliation

- Modify `docs/TKO-2.0-STRATEGY.md`.
- Modify only the first healthcare experience record in `src/lib/content.ts`.
- Expected scope: two modified files, no new runtime files, no migrations, no schema changes, no new service.

### Phase 2 — Identity and CTA refinement

- Modify the existing homepage founder module.
- Inventory and normalize only generic secondary CTA destinations.
- Do not change offer definitions, prices, or problem-specific journeys.
- Expected scope: approximately four to six call-site files, subject to inventory.

### Phase 3 — Portfolio-scale claim, only after clearance

- Perform a source-and-permission review.
- If cleared, add one narrowly bounded career-scale statement.
- If not cleared, record the decision and make no public-site change.

## Codex execution prompts

The prompts below are deliberately separate so each change can be reviewed and rolled back independently.

### Prompt 1 — Reconcile the canonical strategy

```text
Act as Principal Architect and implement only the canonical-strategy reconciliation described below.

Objective:
Make docs/TKO-2.0-STRATEGY.md accurately describe the already-shipped public TKO offer system.

Required changes:
1. Replace the five-offer ladder with the four current offers defined in src/lib/offers.ts.
2. Remove Principal Transformation Advisor; it is retired and redirected.
3. Describe Transformation Execution Authority using the shipped name, $20K–$50K/month complexity range, and its integration/operational-truth role.
4. Clarify program recovery as a use case across two stages:
   - Transformation Diagnostic identifies why a program stalled and recommends the next decision.
   - Transformation Execution Authority governs an accepted restructuring, recovery, integration, and readiness mandate.
5. Reconcile any commercial-objective wording that directly contradicts the four-offer ladder, without inventing new targets.

Preserve:
- Healthcare Transformation & Operating Model Advisory category.
- “Reduce the burden. Preserve the control. Redesign the system.”
- Current buyers, problem families, methodologies, evidence hierarchy, claim guardrails, routes, CTA architecture, and design principles unless a narrow wording correction is required for internal consistency.

Files to modify:
- docs/TKO-2.0-STRATEGY.md only.

Files to avoid:
- src/lib/offers.ts
- next.config.ts
- public pages
- archived strategy documents
- runtime, database, TIF, Opportunity Intelligence, scoring, queue, and lifecycle files

Validation:
- Compare the revised ladder line by line with src/lib/offers.ts.
- Verify the retired route remains described only as retired/redirected, not as a live offer.
- Verify recovery is not assigned exclusively to either diagnosis or execution.
- Run a focused textual consistency search for Principal Transformation Advisor and the current offer names.

Acceptance criteria:
- The canonical document contains exactly four current offers.
- No $8K/month advisor tier remains canonical.
- Transformation Execution Authority matches the shipped catalogue.
- Recovery clearly spans diagnosis and authorized execution.
- No new category, offer, price, route, or unsupported claim is introduced.
```

### Prompt 2 — Conservatively improve the first healthcare experience record

```text
Implement a copy-only refinement to the first selected-work record in src/lib/content.ts.

Objective:
Improve the record's executive/readiness emphasis without overstating Todd's ownership, role, or outcome.

Required changes:
1. Change the title from “Coordinating a Rural Prior-Authorization Initiative” to “Establishing Enterprise Readiness for a Rural Prior-Authorization Initiative,” unless the current content schema or test fixtures require a typographic variation only.
2. Tighten the role and intervention copy to reduce repetitive uses of coordination/cadence language.
3. Preserve factual references to governance, planning, reporting, testing coordination, integration forums, dependency visibility, escalation, and readiness oversight where supported.
4. Preserve the result boundary: the initiative moved toward enterprise implementation readiness.
5. Preserve “Rural,” the existing slug, classification, evidence items, evidence limit, related offer, and URL behavior.

Do not:
- Claim Todd originated the business strategy, regulatory commitment, policy, architecture, sponsorship, or funding.
- Say Todd “made the commitment executable” as an achieved outcome.
- Add metrics, client/employer names, confidential dates, savings, or outcome claims.
- Modify other case records.

Files to modify:
- src/lib/content.ts only.

Validation:
- Run the content tests.
- Run lint and the production build if the focused test passes.
- Verify /selected-work and /selected-work/prior-authorization-modernization still use the existing slug.
- Review the rendered index card because the role copy appears directly on it.

Acceptance criteria:
- The title communicates enterprise readiness.
- The record still accurately describes coordination and orchestration work.
- The result and evidence boundary are not upgraded.
- No other case or offer changes.
```

### Prompt 3 — Add explicit founder identity to the homepage

```text
Implement a small homepage identity refinement. Do not redesign the homepage.

Objective:
Make the accountable principal immediately identifiable inside the existing proof section.

Required changes:
1. Change the existing “Why Todd” eyebrow to “Why Todd Kovalsky.”
2. Add a concise “Founder & Principal, TKO Solutions” descriptor within the same module.
3. Add a LinkedIn link using the existing site.linkedin value and the site's established conversion-event conventions.
4. Preserve the existing proof bullets, About Todd link, Selected Work link, layout hierarchy, and evidence disclaimer.

Do not:
- Add or generate a photo. A photo requires a separately approved professional asset.
- Restore CredibilityStrip automatically.
- Add employer-logo or recruiter-oriented content.
- Change the homepage category, hero, PMO contrast, offer ladder, or primary CTA.

Files to modify:
- src/app/page.tsx only unless an existing shared link primitive must be reused without modification.

Validation:
- Run lint and production build.
- Render the homepage at desktop and mobile widths.
- Verify the LinkedIn link is external, safe, keyboard-accessible, and instrumented consistently.

Acceptance criteria:
- Todd Kovalsky's full name is visible on the homepage.
- His principal role and LinkedIn are available without adding a second résumé block.
- No unapproved image or duplicated credibility strip appears.
```

### Prompt 4 — Normalize generic secondary CTA routing

```text
Audit and implement a bounded secondary-CTA routing cleanup across public pages.

Objective:
Send generic comparison/exploration intent to the service catalogue while preserving problem-specific diagnostic journeys.

Decision rules:
- Generic exploration CTA → /services with label “Compare Engagements” or “See the Advisory Ladder,” chosen to fit the local sentence.
- Tightly bounded single-problem context → /services/executive-diagnostic.
- Broader transformation-diagnosis context → /services/transformation-diagnostic.
- Offer-detail comparison CTA → /services.

Required workflow:
1. Inventory every public CTA currently targeting /services/executive-diagnostic or /services/transformation-diagnostic.
2. Classify each as generic, bounded-problem, or broader-transformation intent.
3. Change only generic CTA destinations and labels.
4. Preserve conversion-event instrumentation and update tests only where current assertions intentionally cover changed labels/destinations.

Do not:
- Change offer definitions, prices, or the four-offer ladder.
- Redirect every $5K diagnostic link to the $10K diagnostic.
- Change primary CTAs.
- Modify TIF, privacy, Opportunity Intelligence, scoring, queue, lifecycle, or database code.

Likely files, subject to the inventory:
- src/app/page.tsx
- src/app/services/page.tsx
- src/app/healthcare/page.tsx
- src/app/approach/page.tsx
- src/app/selected-work/page.tsx
- shared CTA constants only if required to maintain consistency

Validation:
- Report the before/after CTA inventory.
- Run relevant conversion/content tests, lint, and production build.
- Verify all changed destinations resolve and CTA labels match their destinations.

Acceptance criteria:
- Generic exploration no longer implies that one diagnostic is always the correct entry point.
- Problem-specific journeys retain their relevant diagnostic links.
- The $5K Executive Diagnostic remains a live intentional offer.
- No offer, pricing, route, or primary-positioning change occurs.
```

### Prompt 5 — Resolve the portfolio-scale publication gate

```text
Perform a read-only evidence and disclosure audit for the $12M–$20M+ healthcare transformation portfolio range. Do not edit public-site copy.

Objective:
Determine whether one narrowly bounded portfolio-scope statement can be published responsibly.

Inspect:
- docs/todd-jobsearch/Todd Kovalsky - Director AI Transformation - Example.md
- docs/todd-jobsearch/todd-profile-facts.md
- relevant decision records and public claim guardrails
- current employment/client confidentiality constraints available in the workspace

Answer explicitly:
1. What exactly does the range measure?
2. What is the authoritative source?
3. Is the source internally consistent?
4. Is public disclosure permission documented?
5. What role wording is supported?
6. Where could the statement appear without becoming a case-result claim?

Rules:
- If any provenance, meaning, or permission question remains unresolved, verdict = HOLD and make no public edits.
- Do not call the number economic impact, savings, value delivered, revenue, or an outcome owned by Todd.
- Do not name a client or employer as an endorser.
- If fully cleared, recommend—but do not implement—wording no stronger than: “Delivery governance across healthcare transformation portfolios with $12M–$20M+ program scope.”

Deliverable:
- A short evidence table, verdict, approved/prohibited wording, recommended placement, and remaining approval owner.
```

## Test plan for the complete sequence

- Run focused content and offer tests after each applicable phase.
- Run lint and production build after public-copy changes.
- Verify the four-offer ladder across strategy, services, generated offer pages, and redirects.
- Verify the first case retains its slug and evidence limits.
- Verify external LinkedIn behavior and conversion instrumentation.
- Produce a CTA before/after inventory and test every changed destination.
- Perform a final claim audit confirming that $12M–$20M+ remains unpublished unless explicitly cleared.

## Rollback strategy and regression risk

- Keep each prompt's work in a separate commit or reversible change set.
- Strategy reconciliation risk: **low technically, high if left unresolved** because future agents may treat stale strategy as authority.
- Case-copy risk: **moderate** for SEO and evidence interpretation; retain the slug and revert copy only if needed.
- Founder identity risk: **low** if no new asset or employer endorsement is introduced.
- CTA risk: **moderate** for conversion behavior; preserve instrumentation and compare lead quality/click behavior.
- Portfolio claim risk: **high** until disclosure is cleared; default rollback is no publication.

## Acceptance criteria

- One audit contains one non-contradictory verdict set.
- TKO's current category, buyer, core thesis, and four-offer ladder remain unchanged.
- The canonical strategy matches shipped offers and redirects.
- Recovery is correctly represented across diagnosis and execution.
- The first healthcare experience record reads at a stronger readiness altitude without overstating outcome.
- Todd Kovalsky can be made explicit without creating recruiter-oriented positioning or duplicating proof.
- Generic CTAs can be normalized without removing the $5K entry offer.
- The $12M–$20M+ claim remains gated until provenance and disclosure permission are resolved.
- No Human API, systems-of-action, AI, RachelOS, Command Center, or abstract intelligence category becomes a competing homepage thesis.
- No runtime, database, TIF, Opportunity Intelligence, scoring, queue, or lifecycle behavior changes.
