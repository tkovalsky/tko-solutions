---
title: "RachelOS Delivery Model — Executive FAQ"
status: DRAFT — requires human approval (TIF workflow)
tif_asset_type: article
evidence_base: ../06_TIF_EVIDENCE_PACKAGE.yaml
purpose: SEO (FAQ schema), executive discovery, sales enablement, consulting qualification
claim_discipline: 07_CLAIM_AUDIT.md governs every answer; PE-grade answers verbatim from 09.
---

# Executive FAQ — RachelOS and the Operator-Led AI Delivery Model

**Q1. How many people built RachelOS?**
Short: Two humans and AI assistance under written rules — one accountable operator-builder, one domain authority as the approval layer.
Detail: All 1,528 commits over ten months have a single author. Rachel, the practicing agent, participates through the system itself: reviewing AI drafts before any send, recording facts the AI is prohibited from overriding, and validating workflows. We deliberately do not say anyone was "replaced" — the accurate statement is that the system crossed competency boundaries normally distributed across 12–18 professional roles.
Evidence: git shortlog; dm-cadence; dm-competency-map.

**Q2. Did AI build RachelOS?**
Short: No. AI assisted; a human decided, merged, deployed, and activated everything.
Detail: AI's role in delivery was implementation, analysis, refactoring, and documentation under version-controlled operating rules. AI's role in the product is architecturally confined: it extracts knowledge and drafts messages; deterministic code derives state; humans take every action. Content generation literally returns an error without human approval. Todd retained accountability throughout.
Evidence: repo CLAUDE.md; dm-human-facts; dm-approval-loop.

**Q3. What would a traditional team have looked like?**
Short: A core team of 5–7, four to six fractional specialists, plus domain operators — and the coordination apparatus that team size requires (estimate).
Detail: The repository evidences 18 distinct competencies, from data modeling (67 migrations) to behavioral design to release management. The compressed cost wasn't typing speed — it was the handoff and meeting layer between those roles, which a decision log replaced.
Evidence: 03_DELIVERY_MODEL_ANALYSIS.md §2; dm-decision-log.

**Q4. How long did development take?**
Short: Ten months to the current state — live in production for essentially all of them.
Detail: 2025-09-30 to 2026-07-11, in five verifiable eras: acquisition site → lead persistence and daily execution → stabilization and governance → relationship intelligence and the operator system → behavioral layer and activation. There was no launch day; the system served real leads while being built.
Evidence: dm-timeline-eras; 01_CAPABILITY_TIMELINE.md.

**Q5. What remains unfinished?**
Short: The system's own state document lists it: inbound email receiving is dormant, email inbox delivery is unverified, the public recommendation engine has zero production snapshots, content publishing has never completed a production publication job, and downstream deal stages aren't consistently recorded.
Detail: Every capability is graded implemented / activated / validated / unvalidated, and the failures are published. One daily automation run was missed silently and is logged as an open incident.
Evidence: dm-status-vocabulary; dm-bus-factor; CURRENT_STATE §3A.

**Q6. What were the biggest mistakes?**
Short: A platform vision the project's own audit falsified; five competing lifecycle fields; a scoring column that was never written; parallel email paths that could double-send; and defaulting to email-first outreach that measured 2.2% replies.
Detail: Each is documented with its recovery in the transparency ledger — the point is that the project's self-audit caught them.
Evidence: 10_FAILED_BETS_AND_LESSONS.md; DEC-1, DEC-13.

**Q7. What would you do differently?**
Short: Consolidate state vocabulary from day one, activate observability (delivery/reply events) before scaling sends, and prove each conversion flow's last mile before building its engine.
Detail: The costliest work was reconciling truth that had been allowed to fork — five lifecycle representations, disagreeing event stores, an engine built before its landing page. The build order we'd sell a client is the RachelOS order minus those detours.
Evidence: 10 (ledger items 2, 5, 7); 11 §consulting-bridge.

**Q8. Where's the revenue proof?**
Short: There isn't one, and the case study says so before you can ask.
Detail: Production shows 2 active deals, 3 closed, 1 converted — but the records don't form an attribution chain, so we claim no closed revenue. This is a delivery-capability and governance story, not an ROI story. What's sold is the assessment method that found the constraints (35 never-touched leads; 2.2% email-first) in our own operation.
Evidence: CURRENT_STATE §1; 07_CLAIM_AUDIT.md prohibited list.

**Q9. What parts are reusable outside real estate?**
Short: The canonical queue with explanations, the fact/approval architecture, the behavioral layer, the content factory, and the governance method — highly reusable. The relocation recommendation engine — not, and we say so.
Detail: Component-by-component classification with an honest n=1 caveat: transfer claims are architectural inference, not a second deployment.
Evidence: 11_REPLICABILITY_ASSESSMENT.md.

**Q10. Can this approach work in my industry?**
Short: If your work breaks across tools, handoffs, decisions, and follow-up — and relationship facts are perishable — the pattern maps. Healthcare operations is where we see the sharpest fit.
Detail: Strongest mappings: healthcare (prior-auth/referral/care-coordination queues), professional services, wealth management, recruiting, consulting. The fit test is structural, not industry-labeled: is one person the integration layer between your systems of record?
Evidence: 11 §industry-applicability.

**Q11. What is an Operational Intelligence System?**
Short: A system of action, not a system of record: it captures evidence, derives current truth, recommends one explained next action, helps a human execute, records the outcome, and schedules the next commitment.
Detail: The distinguishing features are the loop (not the dashboards) and the governance: human-approved actions, explainable recommendations, and honest capability status.
Evidence: existing flagship (operating-loop story); dm-queue.

**Q12. How does TKO engage?**
Short: Assessment first, build second, never the reverse.
Detail: The entry engagement applies the same evidence hierarchy used on RachelOS to your operation — implementation vs configuration vs production records vs documentation — producing a Built/Activated/Validated map and a ranked constraint list. Build engagements, where warranted, follow the governed component order with activation gates.
Evidence: 05 §4; 11 §consulting-bridge.
