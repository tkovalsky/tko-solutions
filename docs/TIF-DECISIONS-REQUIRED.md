# TIF Decisions Required

**Date:** 2026-07-31  
**Status:** Material decisions blocking Phase 1 implementation  
**Format:** Decision statement, options, recommendation, rationale, impact of delay, affected architecture

---

## D1: Outreach Generation Approach

### Decision Statement
How should TIF generate research-informed email drafts? AI-assisted (Claude prompt), template-based, or hybrid?

### Options

**A. AI-assisted (Claude API with prompt caching)**
- Pro: Personalized, research-driven, not template-like.
- Pro: Leverage existing Claude credits and API infrastructure.
- Pro: Can improve over time (refine prompt, add examples).
- Con: Slower (API latency ~3–5 sec).
- Con: Requires prompt engineering and testing.
- Con: Cost (~$0.10–0.30 per draft, scaling).

**B. Template-based (pre-written email templates)**
- Pro: Fast (instant generation).
- Pro: Predictable output.
- Pro: No API calls needed.
- Con: Generic, low response rate.
- Con: Difficult to personalize.
- Con: Doesn't leverage Todd's proof or research.

**C. Hybrid (template structure + Claude enhancement)**
- Pro: Combines speed + personalization.
- Pro: Can fall back to template if API fails.
- Con: More complex to implement.
- Con: Still requires prompt engineering.

### Recommendation
**Option A (AI-assisted).** 

Todd's differentiator is research-informed, credible outreach (not template boilerplate). The system should match his expertise. API cost is low (~$200–300 for 1000 drafts). Latency (3–5 sec) is acceptable for draft generation (not real-time).

### Rationale
- Todd needs quality over speed for outreach. A generic template defeats the purpose of the system.
- Claude's capability profile matching and proof asset integration are competitive advantages. Don't abandon them for template simplicity.
- Testing with 10 real job postings will validate whether draft quality justifies the approach.

### Impact of Delaying
- Phase 1 shipping delayed 1–2 weeks (for testing).
- If draft quality is poor, Phase 1 must pivot to Option B (lose Todd's competitive advantage).

### Affected Architecture
- `/lib/oi/outreach-generator.ts`: Core service.
- `/src/app/tif/opportunities/actions.ts`: Action to call generator.
- Prompt library in code (Capability Profile, Proof Assets, Tone examples).

---

## D2: Opportunity Detail Page Scope

### Decision Statement
Should the opportunity detail page include activity log, engagement outcome, and learning fields, or keep it minimal (facts + research + outreach only)?

### Options

**A. Minimal scope (Phase 1 only)**
- Sections: Overview, facts, research gaps, hypothesis, stakeholder, outreach prep.
- No activity log, no engagement outcome, no learning fields.
- Pro: Faster to ship (2 weeks vs. 3–4 weeks).
- Pro: Simpler codebase, easier to test.
- Con: Todd must jump to separate page/form to log responses or close opportunity.
- Con: Fragmented experience (detail page is not complete workflow).

**B. Full scope (Phase 1 + Phase 3 preview)**
- Add activity log, engagement outcome form, learning notes.
- One comprehensive page (single-source-of-truth for opportunity).
- Pro: Complete workflow in one place.
- Pro: Activity history visible throughout.
- Con: Longer to build (~3–4 weeks).
- Con: Some features (engagement outcome) not used until Phase 3.

**C. Progressive scope (Phase 1 core + Phase 3 as extension)**
- Ship Phase 1 minimal, add activity log + engagement outcome in Phase 3.
- Activity log is read-only in Phase 1 (actions auto-logged by system).
- Pro: Ship faster; add depth in Phase 3.
- Con: Requires UX redesign between Phase 1 and Phase 3.

### Recommendation
**Option C (Progressive scope).**

Ship Phase 1 with minimal scope (facts, research, hypothesis, outreach prep). When Todd logs responses or pauses opportunities, system auto-logs them but activity log is read-only on Phase 1 page.

In Phase 3, add activity log with full logging/editing forms.

### Rationale
- Faster Phase 1 shipping (2 weeks → operational by end of August).
- Activity auto-logging (from outreach and follow-up workflows) means Todd gets history without extra work.
- Full engagement outcome forms can wait until Phase 3 (when Todd is actually ready to track closed deals).

### Impact of Delaying
- Minimal (Option C is best of both worlds).
- If you choose Option B, Phase 1 takes 3–4 weeks instead of 2.

### Affected Architecture
- `/src/app/tif/opportunities/[id]/page.tsx`: Detail page layout.
- Activity log addition in Phase 3 is additive (no breaking changes to Phase 1).

---

## D3: Stakeholder Creation UX

### Decision Statement
Should stakeholder creation be inline on the opportunity detail page, or a separate modal/page?

### Options

**A. Inline form**
- Add stakeholder form below the opportunity hypothesis section.
- Create new or link existing person.
- Pro: Minimal context-switching.
- Pro: Stakeholder visible same page.
- Con: Page becomes long (lots of scrolling).
- Con: Form has many fields (name, title, seniority, source, authority scores, relationship).

**B. Modal dialog**
- "Add stakeholder" button → modal opens.
- Form contained in modal.
- Pro: Cleaner layout (main page doesn't scroll excessively).
- Pro: Clear "task" boundary (add stakeholder is a separate action).
- Con: Switching between main page and modal is friction.
- Con: Harder to see stakeholder after creation (must close modal, scroll to see).

**C. Separate step/page**
- After operator qualifies opportunity, next page is "Add stakeholder."
- Wizard-style workflow: Review → Hypothesis → Stakeholder → Outreach.
- Pro: Very clear workflow.
- Pro: Each step is focused.
- Con: More friction (multiple pages).
- Con: Longer flow (4 pages vs. 1).

### Recommendation
**Option A (Inline form).**

Todd needs speed over polish. Inline form keeps context together. Long page is acceptable (modern browsers).

### Rationale
- Phase 1 goal is speed and clarity, not design polish.
- Operator can see hypothesis and stakeholder on same screen (understand the opportunity + contact strategy together).
- If UX becomes cluttered, Phase 3 can refactor to modal.

### Impact of Delaying
- Minimal (Option A is fastest to build).

### Affected Architecture
- `/src/app/tif/opportunities/[id]/page.tsx`: Add stakeholder form section.
- `/src/app/tif/opportunities/actions.ts`: createOiPerson and createOiPursuit actions.

---

## D4: Contact Email Required or Optional

### Decision Statement
Should outreach be blocked if email address is not found, or should system suggest alternatives (manual search, warm intro)?

### Options

**A. Email required**
- Cannot proceed to outreach generation without email.
- System must find email or operator must fill in manually.
- Pro: Prevents incomplete outreach records.
- Con: Blocks workflow if email not found.
- Con: Frustrating UX if contact discovery fails.

**B. Email optional (in Phase 1)**
- Outreach draft can be generated without email.
- Operator manually fills in email when sending (or defers outreach).
- Pro: Unblocks workflow immediately.
- Pro: Operator can decide priority (worth manual search vs. skip).
- Con: May generate outreach for contacts Todd can't reach.

**C. Email strongly recommended (with alternatives)**
- System tries email lookup; shows result (found/not found).
- If not found, suggests: manual search, warm intro, defer contact.
- Operator chooses: proceed without email, defer, or try alternative.
- Pro: Flexible, user choice.
- Pro: Guided alternatives (don't block).
- Con: More complex UX.

### Recommendation
**Option C (Strongly recommended with alternatives)** for Phase 2, but **Option B (optional in Phase 1)** for MVP.

Phase 1 does NOT include email lookup. Email is optional (Todd fills in manually if he has it). If missing, outreach draft is generated anyway; Todd can decide whether to defer contact or research email manually.

Phase 2 adds email lookup → Option C behavior.

### Rationale
- Phase 1 is minimal slice; email lookup is Phase 2.
- In Phase 1, Todd already knows how to find contact info; system doesn't need to block on it.
- Unblocks Phase 1 shipping (email lookup is 1 week of Phase 2).

### Impact of Delaying
- No impact (email lookup is planned for Phase 2).

### Affected Architecture
- Phase 1: Email field on stakeholder is optional.
- Phase 2: Email lookup integration adds email-required logic.

---

## D5: Engagement Type Inference

### Decision Statement
Should engagement type be inferred by system or chosen by operator?

### Options

**A. System infers, operator can override**
- Service: `suggestEngagementType(opportunity)` analyzes problem statement.
- Returns suggestion: "This looks like an assessment opportunity (diagnostic/workflow understanding)."
- Operator can accept or override to "advisory" or "build_sprint."
- Pro: Reduces cognitive load (system suggests, operator decides).
- Pro: Leads to consistent offer positioning.
- Con: Inference logic must be calibrated to Todd's experience.

**B. Operator chooses manually**
- Dropdown: Assessment, Advisory, Build Sprint, Fractional Advisor, FTE.
- No system inference.
- Pro: No inference errors.
- Con: Extra decision point (Todd must think about engagement type).
- Con: Inconsistent positioning if Todd chooses different types for similar problems.

**C. No engagement type in Phase 1**
- Phase 1 doesn't include engagement type field.
- Phase 2 adds it with inference logic.
- Pro: Simplifies Phase 1 scope.
- Con: Outreach draft can't mention "typical assessment scope" etc.

### Recommendation
**Option A (System infers, operator overrides), but defer to Phase 2.**

Phase 1 does NOT include engagement type (Option C). Phase 2 adds inference logic (Option A).

Rationale for deferral:
- Phase 1 focus is outreach generation + follow-up, not offer positioning.
- Engagement type is important for Phase 2–3 (proposals + outcome tracking).
- Inference logic needs calibration to Todd's past engagements (which Phase 3 captures).

### Impact of Delaying
- Phase 1 outreach doesn't mention engagement type. Todd can add manually if desired.
- Phase 2 adds full engagement-type workflow.

### Affected Architecture
- Phase 1: No engagement type field.
- Phase 2: Add `OiOpportunity.engagementType` enum, `suggestEngagementType()` service.

---

## D6: Research Gap Prioritization Algorithm

### Decision Statement
How should research gaps be ranked (which gaps should Todd research first)?

### Options

**A. Auto-prioritize by importance (system decides order)**
- System defines importance weights: "reporting_line" is critical (8/10), "technology" is medium (5/10), etc.
- Display gaps in priority order.
- Pro: Todd knows where to focus effort.
- Pro: Consistent prioritization.
- Con: Weights may not match Todd's actual priorities.

**B. Operator-prioritized**
- All gaps shown with priority field (high/medium/low) set by operator.
- Operator can reorder or dismiss gaps.
- Pro: Todd controls prioritization.
- Pro: Flexible.
- Con: Manual effort (Todd must set priorities).

**C. Suggested order, operator can reorder**
- System suggests order (importance-based).
- Operator can drag/reorder or dismiss.
- Pro: Smart default (system suggests), operator can override.
- Pro: Efficient (Todd doesn't need to prioritize from scratch).

### Recommendation
**Option C (Suggested order, operator can reorder).**

System auto-prioritizes gaps:
1. **Critical** (blocks outreach or changes fit score significantly): reporting_line, budget_authority.
2. **High** (important for narrative): business_problem, transformation_language, responsibility.
3. **Medium** (nice-to-have for credibility): technology, compensation, urgency.

Operator can see suggested order, drag to reorder, or dismiss gaps.

### Rationale
- Todd doesn't need to think about gap importance; system can define it.
- Operator can override if system prioritization is wrong.
- Efficient (fast for operator, smart for system).

### Impact of Delaying
- Minimal (can be simple heuristic weights).

### Affected Architecture
- `/lib/oi/research-gaps.ts`: Add priority weighting logic.
- `/src/app/tif/opportunities/[id]`: Display gaps in priority order with reorder UI.

---

## D7: Proof Asset Tagging Scope

### Decision Statement
Should all Assets be tagged with problem types, or only manual-selected assets?

### Options

**A. Auto-tag existing assets (by problem keywords in title/content)**
- Scan Asset titles, content for problem keywords ("prior authorization," "workflow," etc.).
- Auto-assign problem tags.
- Operator reviews and corrects.
- Pro: Fast (one-time scan).
- Con: Noisy (keyword matching is imprecise).
- Con: Requires operator cleanup.

**B. Manual tagging (Todd or Codex reviews each asset)**
- Go through existing Assets one-by-one.
- Todd assigns problem types + engagement types.
- Pro: High accuracy.
- Con: Slow (manual effort).
- Con: Requires Todd's expertise (which is constrained).

**C. Defer tagging to Phase 2**
- Phase 1 does NOT include proof matching.
- Phase 2 adds asset tagging + matching.
- Pro: Simplifies Phase 1.
- Con: Outreach drafts won't reference proof assets in Phase 1.

### Recommendation
**Option B (Manual tagging), but scope to Phase 2.**

Phase 1 does NOT include proof matching (Option C). Phase 2 adds manual tagging (Todd + Codex review Assets, assign tags, ~4 hours work).

### Rationale
- Phase 1 outreach doesn't need proof matching (too much scope).
- Phase 2 proof matching is high-value (improves credibility).
- Manual tagging is accurate and only ~4 hours of work (12–15 assets × 15 min each).

### Impact of Delaying
- Phase 1 outreach is generic (doesn't mention case studies).
- Phase 2 outreach is credible (mentions proof).

### Affected Architecture
- Phase 1: No asset tagging.
- Phase 2: Add Asset tags (problem type, engagement type), asset-matching service.

---

## D8: Opportunity Score v2 Timing

### Decision Statement
Should Phase 1 use current scoring (opportunity-fit-v1, 125 max), or wait for Phase 2 to add person-authority factors?

### Options

**A. Keep current scoring in Phase 1, enhance in Phase 2**
- Phase 1: Opportunity-fit-v1 (fit to Todd's expertise only).
- Phase 2: Add person-authority factors (budget, hiring, transformation relevance).
- Pro: Phase 1 can ship faster (no scoring changes).
- Pro: Clear phase boundary (scoring improvement is Phase 2 work).
- Con: Phase 1 scoring ignores important factors (who owns the problem).

**B. Implement Phase 2 scoring in Phase 1**
- Include person-authority factors from start.
- Pro: More realistic opportunity ranking from day 1.
- Con: Phase 1 takes longer (1–2 weeks for scoring + testing).

### Recommendation
**Option A (Keep current scoring in Phase 1, enhance in Phase 2).**

Phase 1 uses opportunity-fit-v1. Phase 2 adds person-authority factors.

### Rationale
- Faster Phase 1 shipping.
- Person-authority scoring needs stakeholder data, which is new in Phase 1. Phase 2 can calibrate scoring after Todd has used system with real stakeholders.
- Clear phase boundaries (Phase 1: capture + research; Phase 2: ranking improvements).

### Impact of Delaying
- Phase 1 opportunity ranking is less realistic (problem-focused, not person-focused).
- Phase 2 adds significant ranking improvement.

### Affected Architecture
- Phase 1: Keep `scoreOpportunityFit()` unchanged.
- Phase 2: Create new `scoreOpportunityValue()` that includes person authority; replace ranking logic.

---

## D9: Data Migration & Cleanup

### Decision Statement
Should Phase 1 start with clean database (reset and replay bootstrapped data), or keep existing test data?

### Options

**A. Clean start (reset database, start fresh)**
- Delete all existing opportunities, sources, facts, scores.
- Todd tests Phase 1 with fresh opportunities.
- Pro: Clean state (no legacy data confusing results).
- Pro: Clear baseline metrics.
- Con: Loses any prior testing/data.

**B. Keep existing data**
- Preserve opportunities, sources, facts from prior testing.
- Todd tests Phase 1 with mix of new + legacy opportunities.
- Pro: Maintains continuity.
- Con: Legacy data may have quality issues (bad extractions, incorrect scores).
- Con: Harder to measure Phase 1 impact (mix of old + new).

### Recommendation
**Option A (Clean start).**

Before Phase 1 ships, reset database. Deletes all legacy opportunities/sources/facts/scores. Todd starts fresh with new opportunities in Phase 1.

### Rationale
- Phase 1 is v1 of the workflow; legacy data doesn't reflect new design.
- Clean baseline makes Phase 1 testing easier (can measure "how many opportunities did we ingest in Phase 1?").
- Todd is testing a new workflow; fresh data makes sense.

### Impact of Delaying
- None (cleanup is Phase 0 work, already planned).

### Affected Architecture
- Phase 0: Data migration/cleanup.
- Phase 1 onward: Fresh opportunities.

---

## D10: Outreach v1 Should Support Email Drafts, NOT Email Sending

### Decision Statement
Should Phase 1 outreach workflow actually send emails (integration with Gmail, Outlook), or just generate drafts that Todd copies to his email client?

### Options

**A. Drafts only (Todd sends manually)**
- System generates draft + logs intent to send.
- Todd copies draft, sends via his email client.
- System asks for confirmation: "Email sent?" → Todd confirms → System logs send date/recipient.
- Pro: No email service integration needed (faster to ship).
- Pro: Todd retains full control over his email.
- Con: Manual friction (copy-paste).
- Con: Possible logging errors (Todd forgets to log send).

**B. Direct sending (TIF sends via Gmail/Outlook API)**
- System integrates with Todd's email.
- "Send" button in TIF → email sent directly.
- Activity logged automatically.
- Pro: Seamless (no copy-paste).
- Pro: Automatic logging (no missing records).
- Con: Email API integration complexity (~2 weeks extra).
- Con: Credentials management (Gmail OAuth, etc.).
- Con: Not needed for Phase 1 MVP.

### Recommendation
**Option A (Drafts only) for Phase 1. Option B (Direct sending) for Phase 4+.**

Phase 1 generates drafts; Todd sends manually and confirms. Phase 4+ adds direct email sending if Todd wants it.

### Rationale
- Phase 1 focus: generate quality drafts. Sending integration is out of scope.
- Todd can start using Phase 1 immediately without email setup.
- Email API integration can come later (Phase 4) if Todd wants it.

### Impact of Delaying
- Phase 1 requires manual send + confirmation (1 extra minute per email).
- Phase 4+ removes manual step.

### Affected Architecture
- Phase 1: `recordOutreachIntent()` action (draft + send date).
- Phase 4: `integrateEmailSending()` service (Gmail/Outlook API).

---

## D11: What Should Be Automated vs. Manual in Phase 1

### Decision Statement
Which tasks should TIF do automatically, vs. which require operator judgment?

### Options (predefined positions)

**Automate (system decides, operator reviews after):**
- Extract facts from pasted text.
- Calculate fit score.
- Identify research gaps.
- Rescore when operator adds findings.
- Auto-resolve gaps when finding matches gap key.
- Auto-log emails as activities (after operator sends).
- Auto-set next follow-up date (14 days default).

**Manual (operator decides first):**
- Decide if opportunity is worth pursuing (qualify vs. reject).
- Write hypothesis (why it matters, why Todd is relevant).
- Choose stakeholder to contact.
- Research gaps (Todd must find answers).
- Edit outreach draft before sending.
- Decide follow-up timing (can override default).
- Log response (did they reply, sentiment, next step).

### Recommendation
**Accept predefined positions (above).**

Phase 1 automates deterministic work (extraction, scoring, gap planning). Manual decisions stay with Todd (qualify, hypothesis, research, stakeholder, outreach review, response logging).

### Rationale
- Automation reduces friction (extraction + scoring + gap identification are fast).
- Manual decisions preserve Todd's judgment (he decides what to pursue, why, and how to respond).
- Balance: system handles mechanical work, Todd handles judgment.

### Impact of Delaying
- No impact (this is Phase 1 design principle, not a blocker).

### Affected Architecture
- Phase 1 architecture is designed around this split (automated extraction/scoring, manual workflow steps).

---

## Summary Table

| Decision | Recommendation | Phase | Impact | Owner |
|---|---|---|---|---|
| D1: Outreach generation | AI-assisted (Claude API) | Phase 1 | High (core feature) | Codex |
| D2: Opportunity detail scope | Minimal scope (progressive) | Phase 1 | Medium (UX friction if minimal) | Codex |
| D3: Stakeholder creation UX | Inline form | Phase 1 | Low (cosmetic) | Codex |
| D4: Email required/optional | Optional in Phase 1 | Phase 1 | Medium (enables workflow) | Codex |
| D5: Engagement type | Defer to Phase 2 | Phase 2 | Low (outreach doesn't mention offer) | Codex |
| D6: Gap prioritization | Suggested order, reorderable | Phase 1 | Low (UX improvement) | Codex |
| D7: Proof asset tagging | Manual, defer to Phase 2 | Phase 2 | Medium (Phase 1 outreach is generic) | Todd + Codex |
| D8: Opportunity scoring v2 | Keep v1 in Phase 1 | Phase 1–2 | Medium (ranking less accurate) | Codex (Phase 2) |
| D9: Database cleanup | Clean start before Phase 1 | Phase 0 | Low (admin work) | Codex |
| D10: Email sending | Drafts only (manual send) | Phase 1 | Low (manual step accepted) | Codex |
| D11: Automate vs. manual | Predefined split (extraction auto, decision manual) | Phase 1 | High (core philosophy) | Codex |

---

## Next Steps

1. **Review & confirm each decision** above (Todd or sponsor).
2. **Document any disagreements or changes** (update this file).
3. **Proceed with Phase 1 implementation** based on confirmed decisions.
4. **Revisit D5, D7, D8 in Phase 2 kickoff** (time-bound, not before Phase 1 completes).

---

## Questions for Todd

1. **D1 (AI-assisted outreach):** Are you comfortable with Claude API generating drafts? Is cost (~$0.10–0.30 per draft) acceptable?
2. **D4 (Email optional):** Can you manually research email addresses for now (Phase 2 will automate)?
3. **D7 (Proof tagging):** Can you (or someone) spend ~4 hours in Phase 2 tagging 12–15 assets with problem types?
4. **D10 (Manual email sending):** Is copy-paste friction acceptable for Phase 1, with direct sending added later (Phase 4)?
5. **Phase 1 timeline:** Given 2-week estimate, can you test starting early September?
