# TIF 90-Day Operationalization Plan

**Date:** 2026-07-31  
**Status:** Phased roadmap to commercial operations  
**Scope:** What can Todd realistically accomplish in 90 days to make TIF genuinely useful for generating deal flow

---

## Executive Context

Todd is employed full-time (Cognizant). Pursuit work fits into ~10–15 hours/week (evenings, weekends).

Realistic capacity per 2-week sprint: **1 senior engineer** (focused, no context-switching) OR **2 part-time contributors** (Todd + contract developer).

This plan assumes 1 senior engineer, part-time availability. Adjust timelines if more resources become available.

---

## Phase 0: Stabilize & Simplify (Weeks 1–2)

### Outcome
Code is clean, tests pass, baseline is clear. Ready to build without technical debt.

### Work included

1. **Audit existing TIF implementation:**
   - Run full test suite (identify failures).
   - Review schema against documented contracts (spot inconsistencies).
   - Check for unused models or dead code.
   - **Evidence:** git log of any cleanup commits.

2. **Document baseline state:**
   - How many opportunities exist? How many contacts?
   - What extraction and scoring are actually working?
   - What data quality issues exist (bad scoring, duplicates, stale records)?
   - **Evidence:** Baseline metrics snapshot.

3. **Fix critical bugs or inconsistencies:**
   - Any schema migrations pending? Run them.
   - Any tests failing? Fix them.
   - Any type mismatches between contract and implementation? Resolve.
   - **Evidence:** All tests pass. No warnings in build.

4. **Plan data cleanup (if needed):**
   - Bad records in dev database? Reset or migrate.
   - Duplicate companies/people from prior bootstrap? Deduplicate.
   - **Evidence:** Clean database ready for testing Phase 1.

### Work excluded

- No new features.
- No UX improvements.
- No schema changes beyond necessary consistency fixes.

### User-visible result

None (internal stability work).

### Commercial use

None yet (Phase 1 enables this).

### Success criteria

- All tests pass.
- No console warnings or error logs.
- Baseline metrics recorded (X opportunities, Y people, Z pursuits, avg score).
- Database is clean and ready.

---

## Phase 1: Minimum Operational Loop (Weeks 3–6)

### Outcome
Todd can go from "I found a job posting" to "I sent a research-informed email" in one sitting. Loop takes ~30–45 min for typical opportunity.

### Work included

1. **Opportunity detail page** (`/tif/opportunities/[id]`):
   - Sections: Overview, extracted facts, research gaps, operator hypothesis, stakeholder, outreach prep, activity log.
   - Add hypothesis fields (problem hypothesis, fit hypothesis, engagement type).
   - Add stakeholder form (create new or link existing person).
   - Estimated time: 2 weeks (includes design, build, testing).

2. **Research gap workflow:**
   - Display research gaps with priority ranking.
   - Form to log research findings (fact, value, confidence, source).
   - Auto-resolve gap when finding matches gap key.
   - Estimated time: 1 week.

3. **Outreach generation service:**
   - Service: `generateOutreach()` (input: opportunity, stakeholder, engagement type; output: research summary, proof match, email draft).
   - Use Claude API with prompt caching (Todd's capability profile + proof assets).
   - UI: "Generate draft" button on opportunity detail page.
   - Allow operator to edit draft.
   - Estimated time: 1–1.5 weeks (prompt engineering + refinement).

4. **Outreach logging:**
   - Form: email address, subject, draft, send date.
   - System: record email as Activity, update pursuit status to "contacted," schedule 14-day follow-up reminder.
   - Estimated time: 1 week.

5. **Dashboard (basic):**
   - Simple list: top 5 opportunities by fit score, ranked by next-action due date.
   - For each: company, problem, score, next action, "Open detail" link.
   - Filter: "Contact-ready," "Research-ready," "This week."
   - Estimated time: 1 week.

### Work excluded

- Contact discovery (email lookup).
- Activity log (P1).
- Enhanced scoring (P1).
- News monitoring.
- Engagement outcome tracking.

### User-visible result

- Todd can open `/tif/opportunities/sources`, paste a job posting.
- System extracts facts, calculates score, identifies gaps.
- Todd opens opportunity detail page, adds hypothesis, researches 2–3 gaps.
- Todd generates outreach draft, edits it, logs send.
- System logs activity and schedules follow-up.
- Todd opens dashboard, sees top 5 priorities and next actions.

### Commercial use

Todd can identify and pursue 1–2 opportunities per week. Expected outcome: 1–2 research-informed emails sent per week. At typical response rates (10–20%), this generates 1 conversation every 2–4 weeks.

### Success criteria

- End-to-end workflow time: < 45 minutes for typical opportunity.
- Outreach draft quality: Todd edits < 3 lines per draft (not template-like).
- Dashboard shows clear priorities and next actions.
- Todd sends 2+ emails using system before Phase 2.

---

## Phase 2: Opportunity & Stakeholder Intelligence (Weeks 7–12)

### Outcome
Todd has better data about who to contact and why. System recommends relevant case studies. Opportunity scoring is more realistic.

### Work included

1. **Contact discovery:**
   - Integrate email lookup service (Clearbit, Hunter, or Rocketreach).
   - Auto-lookup when stakeholder is created; offer to store email.
   - Optional: add domain finder (company website scrape for domains, then email pattern guess).
   - Estimated time: 1 week.

2. **Activity log & relationship tracking:**
   - New `Activity` model (email sent, call scheduled, call completed, follow-up sent, etc.).
   - Auto-log emails from outreach workflow.
   - Form to log calls: date, notes, outcome, next step.
   - Form to log follow-ups: when, what, result.
   - Display activity timeline on opportunity detail page.
   - Estimated time: 1–1.5 weeks.

3. **Enhanced opportunity scoring:**
   - Fold stakeholder authority (budget, hiring, transformation relevance) into opportunity value.
   - Add "decision-maker clarity" component (full authority → +8, some → +4, unknown → 0).
   - Add "engagement likelihood" component (seniority + company kind + authority).
   - Display both fit score and value score.
   - Re-score existing opportunities with new model.
   - Estimated time: 1 week.

4. **Engagement type & offer matching:**
   - Add engagement type enum to OiOpportunity.
   - Logic: infer engagement type from problem statement (diagnostic → assessment, ongoing → advisory, build → build_sprint).
   - Display in outreach draft ("We typically start with a 1-week assessment").
   - Estimated time: 1 week.

5. **Proof asset matching:**
   - Audit existing `Asset` records; tag by problem type (PA, workflow modernization, governance, etc.) and engagement type.
   - Service: given opportunity, recommend top 2–3 relevant assets.
   - Display on opportunity detail page ("Relevant case studies").
   - Include in outreach research summary and draft.
   - Estimated time: 2 weeks (includes content audit + tagging system).

6. **Research gap improvement:**
   - Add "suggested sources" for each gap (LinkedIn, news, company website, SEC filings).
   - Add "research difficulty" assessment (easy 5-min search vs. deep research).
   - Recommend research order (easy gaps first).
   - Estimated time: 1 week.

### Work excluded

- News/signal monitoring.
- Engagement outcome tracking.
- Company cohorts.
- Warm-path workflow.

### User-visible result

- Todd opens opportunity detail page; sees email address auto-populated for stakeholder (or lookup failed clearly).
- Todd logs call; system records it and suggests next action.
- Dashboard shows updated scores: "Fit: 85 points, Value: 65 points (Total: 150)."
- Outreach draft mentions "typical assessment scope" and includes 2–3 relevant case studies.
- Research gaps show "Quick search (5 min)" vs. "Deep research (30 min)."

### Commercial use

Todd spends less time searching for emails and more time on meaningful research and relationship building. Outreach is more credible (mentions relevant proof). Opportunity prioritization is more realistic (high-value opportunities ranked higher).

### Success criteria

- Contact discovery finds email for 70%+ of stakeholders.
- Activity log captures 10+ interactions across opportunities.
- Enhanced scoring correlates with perceived opportunity quality (Todd's intuition matches system ranking).
- Outreach drafts include relevant case studies 80%+ of the time.

---

## Phase 3: Outreach & Follow-up Management (Weeks 13–18)

### Outcome
Todd has a clear follow-up rhythm. Responses are tracked. Failed pursuits are closed with learning captured.

### Work included

1. **Next-action state machine:**
   - Define state transitions: reviewing → qualified → research_ready → contact_ready → contacted → conversation → paused → closed.
   - Add guards: can only move to contact_ready if outreach has been drafted.
   - Add reason field for paused/closed.
   - Display state machine on opportunity detail page with next transition action.
   - Estimated time: 1 week.

2. **Follow-up reminder & scheduling:**
   - When outreach is logged, auto-schedule 14-day follow-up.
   - Dashboard shows "Overdue follow-ups," "Follow-ups due this week," "Follow-ups due later."
   - Form to log follow-up (sent, result, next step).
   - Auto-escalate overdue follow-ups to urgent.
   - Estimated time: 1 week.

3. **Response tracking:**
   - When Todd logs response to outreach, record: yes/no/not_yet, sentiment (positive/neutral/deflecting/rejection).
   - If positive: next step (meeting, more info, will follow up).
   - If no response: suggest follow-up or pause.
   - Update pursuit status based on response.
   - Estimated time: 1 week.

4. **Engagement outcome model (basic):**
   - New `Engagement` model: link to opportunity, engagement type, proposed value, contract date, actual value, outcome (assessment completed, advisory ongoing, built system, hired, etc.).
   - Form to record outcome when pursuit closes.
   - Estimated time: 1–1.5 weeks.

5. **Activity log enhancements:**
   - Link activities to engagement if applicable.
   - Auto-log status transitions.
   - Generate "activity summary" for opportunity (X emails sent, Y calls, Z days since last contact).
   - Estimated time: 1 week.

6. **Pause/closed workflow:**
   - When Todd closes opportunity, form captures: outcome (assessment accepted, proposal declined, no longer fit, etc.), reason, lessons (what to do different next time).
   - Closed opportunities stay visible in history (not deleted).
   - Estimated time: 1 week.

### Work excluded

- News monitoring.
- Company cohorts or multi-stakeholder planning.
- Warm-path workflow (can be added later).
- CRM integration.

### User-visible result

- Dashboard shows "2 follow-ups due today," "1 overdue."
- Todd logs call with prospect: "Meeting scheduled for next week, they want to see assessment scope."
- System updates status to "conversation" and sets next action to "prepare assessment proposal."
- Todd later records: "Assessment completed, prospect found it valuable, moving to build sprint proposal."
- System creates Engagement record, closes opportunity, captures lessons.
- Dashboard now shows this engagement in pipeline review.

### Commercial use

Todd has a repeatable follow-up rhythm. No opportunities age without action. Response tracking prevents lost conversations. Outcome tracking enables learning.

### Success criteria

- All follow-ups are logged (within 24 hours of scheduled date).
- 100% of closed opportunities have outcome recorded.
- At least 1 opportunity moves to engagement/closed-won status.

---

## Phase 4: Selective Automation & Learning (Weeks 19–24, Optional)

### Outcome
System proactively surfaces opportunities and learns from outcomes.

### Work included

1. **News monitoring (optional, if time permits):**
   - Set up RSS feeds for top target companies.
   - Subscribe to healthcare news alerts (Job board, CMS, regulatory).
   - Auto-create CaptureItem or OiSource when signal detected.
   - Dashboard flags "new signal" for manual review.
   - Estimated time: 2 weeks (simple version; defer complex scraping).

2. **Learning loop:**
   - After 5+ closed opportunities, analyze: which signals → engagements?
   - Which problems are most common? Which engagement types close?
   - Report: "70% of closed deals started with job postings. Average time to close: 12 weeks. Typical value: $35K."
   - Recommend strategy adjustments (e.g., "Focus on SVP Operations roles, deprioritize CIO roles").
   - Estimated time: 1 week (queries + reporting).

3. **Company cohort view (optional):**
   - Define target cohort (Elevance Health, Humana, UnitedHealth, Availity).
   - Show all active opportunities + stakeholders per company.
   - Highlight entry points and blockers.
   - Account-level strategy view.
   - Estimated time: 1–2 weeks.

### Work excluded

- Full autonomous discovery (too high false-positive risk).
- CRM sync (can be Phase 5).
- Email integration (can be Phase 5).

### User-visible result

- Dashboard flags "Job posting from Humana (one of your targets)."
- Todd reviews, decides it's relevant, creates opportunity.
- After 5 closed engagements, Todd runs "Learning Report": sees patterns and adjusts strategy.

### Commercial use

Less manual signal detection. Todd can focus on high-probability opportunities. Strategy improvements based on evidence.

### Success criteria

- News feed captures 5+ relevant signals per week.
- Learning report generates actionable insights.

---

## What Todd Can Do After Phase 1 (Week 6)

1. **Identify opportunities:** Paste job posting → extract facts → score fit.
2. **Research:** Research gaps → close with findings.
3. **Send outreach:** System generates draft → Todd edits → logs send.
4. **Track activity:** Log responses, follow-ups, calls.
5. **Prioritize:** Dashboard shows top opportunities and next actions.

**Expected outcome after Phase 1:** 1–2 research-informed emails per week, leading to 1 conversation every 2–4 weeks.

---

## What Todd Can Do After Phase 2 (Week 12)

Everything from Phase 1, plus:

6. **Better contact data:** Email addresses auto-discovered (70%+ success).
7. **Better opportunity ranking:** Scores account for stakeholder authority.
8. **Credible outreach:** Mentions relevant case studies + proof.
9. **Smart research:** System recommends where to research and how long to spend.

**Expected outcome after Phase 2:** Same volume, but higher quality outreach and stakeholder data. Improved conversation quality (better targeting).

---

## What Todd Can Do After Phase 3 (Week 18)

Everything from Phase 1–2, plus:

10. **Clear follow-up rhythm:** Dashboard shows overdue and upcoming follow-ups.
11. **Response tracking:** Know who replied and what they said.
12. **Outcome learning:** Closed opportunities recorded with lessons.
13. **Engagement pipeline:** Track assessments → proposals → closed engagements.

**Expected outcome after Phase 3:** 1–2 engagements per quarter (from improved follow-up and outcome tracking). Beginning of learning loop.

---

## Timeline & Resource Estimate

### Phase 0 (Weeks 1–2)
- **People:** 1 engineer (20 hours).
- **Cost:** If external contractor ($100/hr), $2K.

### Phase 1 (Weeks 3–6)
- **People:** 1 senior engineer (50–60 hours over 4 weeks).
- **Cost:** If external, $5K–$6K.
- **Tools:** Claude API credits (~$200–300 for prompt testing).

### Phase 2 (Weeks 7–12)
- **People:** 1 engineer (50–60 hours over 6 weeks) + Todd (content audit, 10 hours).
- **Cost:** If external, $5K–$6K + email lookup API (~$30–50/month).

### Phase 3 (Weeks 13–18)
- **People:** 1 engineer (40–50 hours over 6 weeks) + Todd (outcome logging, learning review, ~10 hours).
- **Cost:** If external, $4K–$5K.

### Phase 4 (Weeks 19–24, optional)
- **People:** 1 engineer (30–40 hours) + Todd (strategy review, ~5 hours).
- **Cost:** If external, $3K–$4K.

### Total 6-month estimate (Phases 0–4)
- **Engineering:** ~180–200 hours (~$18K–$20K if external contractor; included in Todd's time if internal).
- **Tools/APIs:** ~$300–500 total.

### Timeline option A: Full-time contractor
- 24 weeks / 4 weeks per month = 6 months to full Phase 4.
- Cost: ~$20K engineering + $500 tools.

### Timeline option B: Part-time (Todd + 10 hrs/week contractor)
- Same work, 12 weeks → ~3 months.
- Phases 1–2 in parallel. Phase 3 serial.
- Cost: ~$10K–$12K engineering + $500 tools.

### Timeline option C: Todd + internal resources (Codex or team)
- Codex can execute each phase independently.
- Phase 1: 4 weeks (Codex-executed, Todd reviews + tests).
- Phase 2: 6 weeks.
- Phase 3: 6 weeks.
- Phases 1–3 complete in 12–16 weeks (~3–4 months).

---

## Risk & Mitigation

### Risk A: Outreach generation quality is poor
- **Mitigation:** Test prompt with 10 real job postings in Phase 1. If 60%+ of drafts are usable (Todd edits < 3 lines), proceed. Otherwise, refine prompt.

### Risk B: Todd doesn't have time to research gaps or test system
- **Mitigation:** Phase 1 is intentionally minimal. Todd can test in 1 week, 2 opportunities. No long-term commitment to testing.

### Risk C: Extraction fails on edge-case job postings
- **Mitigation:** Extraction is already tested and working. Edge cases are acceptable; system gracefully degrades (shows "couldn't extract field X; please fill in manually").

### Risk D: Email lookup fails for many stakeholders
- **Mitigation:** Email is optional. Todd can manually fill in. System suggests manual search paths (LinkedIn, company website).

### Risk E: Opportunity scoring diverges from Todd's intuition
- **Mitigation:** Score is a ranking hint, not law. Todd can manually override or adjust. After 10 opportunities, compare system ranking to Todd's ranking; if divergence > 20%, recalibrate scoring weights.

---

## Rollout & Validation

### Phase 1 Rollout (End of Week 6)
1. Deploy to `/tif/opportunities`.
2. Todd tests with 3–5 real job postings (evening/weekend work).
3. Provides feedback: "Draft quality is X," "Gaps are accurate," "Dashboard is clear."
4. Decision: Proceed to Phase 2, or refine Phase 1 further (1–2 week iteration).

### Phase 2 Rollout (End of Week 12)
1. Deploy contact discovery, activity log, enhanced scoring, proof matching.
2. Todd uses system for 1 full week of pursuit work.
3. Reports: "Email discovery success rate," "Relevance of recommended case studies," "Usefulness of activity log."
4. Decision: Proceed to Phase 3, or refine Phase 2.

### Phase 3 Rollout (End of Week 18)
1. Deploy state machine, follow-up management, engagement outcome.
2. Todd runs at least one complete pursuit through the system (from ingest to closed-won or closed-lost).
3. Reports: "Follow-up rhythm is usable," "Outcome learning is meaningful."
4. Decision: Phase 3 is complete and operationalized.

### Phase 4 (Optional, Weeks 19–24)
- If Phase 3 shows strong ROI and Todd has time, add news monitoring and learning loop.

---

## Success Definition

### Phase 1
- Todd can complete a full opportunity → outreach workflow in 1 sitting.
- At least 2 research-informed emails sent using system.

### Phase 2
- Email discovery works for 70%+ of stakeholders.
- Outreach quality improves (responses reference case studies or research).

### Phase 3
- Todd closes at least 1 engagement sourced through TIF.
- Learning loop starts (Todd can point to "what worked" patterns).

### Phases 1–3 combined (end of Week 18)
- **Operational:** TIF is Todd's primary tool for opportunity pursuit.
- **Commercial:** 1–2 engagements per quarter sourced through TIF.
- **Time:** Todd spends < 10 hours/week on commercial pursuit (vs. manual approach).
- **Learning:** Todd can adjust strategy based on outcome data.

---

## What's Deliberately Excluded

This plan does NOT include:

- **Autonomous discovery:** Too risky; high false-positive rate. Deferring to Phase 4.
- **CRM sync:** Nice-to-have; Todd can use both systems. Phase 5 later.
- **Email integration:** Todd sending from TIF. Phase 5 later.
- **Proposal generation:** Comes after Phase 3. Phase 4–5.
- **Multi-stakeholder planning:** Phase 4–5 (lower priority).
- **Warm-path workflow:** Phase 4 (lower priority than cold outreach).
- **Analytics/reporting:** Phase 4–5 (learning loop minimum viable).

These aren't bad ideas; they're just later priorities after Todd has a working commercial system.

---

## Recommendation

**Start with Phase 1 immediately.** By end of August, Todd has a working outreach system.

**Target Phase 1–2 completion by end of September** (8 weeks from now). By then, Todd has quality data + credible outreach.

**Target Phase 1–3 completion by end of October** (12 weeks from now). By then, Todd has a full commercial pursuit loop and has closed at least 1 engagement.

**Phase 4+ is optional.** Revisit in Q4 based on Phase 1–3 results and available time.
