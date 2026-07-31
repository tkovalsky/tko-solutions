# TIF Gap and Priority Backlog

**Date:** 2026-07-31  
**Status:** Prioritized list of gaps blocking operationalization  
**Format:** Grouped by priority tier with commercial impact and implementation complexity

---

## P0: Blocks Operational Use (Do First)

### P0.1: Unified Commercial Dashboard

**Problem:** Todd must check `/tif` (content queue) and `/tif/opportunities` (pursuit ranking) separately. No single view answers "What's most important today?"

**Commercial impact:** Todd loses focus and misses priorities. No daily operating rhythm.

**Affected components:**
- `/src/app/tif/opportunities/page.tsx` (current pursuit list, not prioritized).
- `/src/app/tif/page.tsx` (content queue, separate from commercial).

**Recommended change:**
1. Add unified dashboard at `/tif/dashboard` or default `/tif` view.
2. Show top 5 opportunities ranked by:
   - Fit score
   - Recent signals (sourced within 7 days)
   - Stakeholder authority (if known)
   - Next action due date
3. For each opportunity, show:
   - Company + problem title
   - Fit score + 1-line reason
   - Research status (# gaps open / total)
   - Next action + due date
   - "Open detail" link
4. Add filters: "Contact-ready," "Research-ready," "Paused," "New this week."
5. Add "What changed?" feed (new sources, status transitions, responses received).

**Dependencies:** Opportunity detail page (P0.2), outreach prep (P0.3).

**Estimated complexity:** Medium (1–2 weeks for solid UX + queries).

**Validation method:** Todd uses dashboard daily for 1 week; reports whether he knows his top 3 priorities.

---

### P0.2: Opportunity Detail Page & Stakeholder Workflow

**Problem:** No single-page view of an opportunity with extracted facts, research gaps, hypothesis, and next actions.

**Commercial impact:** Todd cannot easily review what is known, what is missing, or what to do next for a pursuit.

**Affected components:**
- No `/tif/opportunities/[id]` page yet (referenced in minimum slice but not implemented).
- No stakeholder creation workflow (person + pursuit).

**Recommended change:**
1. Create `/tif/opportunities/[id]` page with tabs or sections:
   - **Overview:** Company, opportunity title, status, fit score, created date.
   - **Extracted facts:** Table (field, value, confidence, source offset).
   - **Research gaps:** List (question, priority, status, resolved answer if done).
   - **Operator hypothesis:** Text fields (problem hypothesis, fit hypothesis, engagement type).
   - **Stakeholder:** Person card (name, title, company, source, authority scores, relationship type).
   - **Outreach prep:** Research summary, proof match, email draft.
   - **Activity log:** Timeline (outreach sent, responses, follow-ups, status changes).
2. Implement stakeholder creation form:
   - Link existing person or create new.
   - Set seniority, authority scores, relationship type.
   - Auto-populate from LinkedIn URL if provided.
3. Add status machine:
   - Transitions: reviewing → qualified/paused/closed.
   - Rules: Can only move to "qualified" if hypothesis is filled in.

**Dependencies:** None (independent).

**Estimated complexity:** Medium (2–3 weeks for full-featured page).

**Validation method:** Todd can open any opportunity, see all relevant info, and execute next action without context-switching.

---

### P0.3: Outreach Generation Service

**Problem:** No workflow to generate research-informed email drafts.

**Commercial impact:** Todd must write every email from scratch, or use generic templates (low response rate).

**Affected components:**
- No outreach generation service.
- No outreach logging workflow.

**Recommended change:**
1. Create `/lib/oi/outreach-generator.ts`:
   - Input: Opportunity (facts, hypothesis), stakeholder (name, title), engagement type.
   - Output: Research summary (bullet points), proof match (list of relevant case studies), email draft.
   - Use Claude API (prompt-caching for capability profile + proof assets).
   - Tone: Professional, specific, research-informed. Not salesy.
2. Add `generateOutreach()` server action (in `/src/app/tif/opportunities/actions.ts`).
3. Display generated draft on opportunity detail page.
4. Allow operator to edit draft before logging send.
5. Add outreach logging action:
   - Record email address, subject, draft, sent date, sent by (Todd).
   - Update pursuit status to "contacted."
   - Schedule follow-up reminder (14 days default).
6. Add simple "Did they respond?" form:
   - Response status (yes/no/not yet).
   - If yes: sentiment (positive, neutral, deflecting, rejection).
   - If yes: next step (meeting, more info, follow-up).

**Dependencies:** Opportunity detail page (P0.2).

**Estimated complexity:** Medium-high (2–3 weeks for prompt, testing, refinement).

**Validation method:** Todd generates 5 drafts, edits them minimally, sends 3, and gets at least 1 response. Compare response rate to his prior email approach.

---

### P0.4: Integrate Research Gaps with Operator Workflow

**Problem:** Research gaps are identified but no workflow exists to close them or record operator research.

**Commercial impact:** Todd doesn't know which gaps are critical or where to focus research effort.

**Affected components:**
- `/src/lib/opportunity-intelligence/research-gaps.ts` (gap planning exists, but no UI/operator workflow).

**Recommended change:**
1. Add "Research" tab/section to opportunity detail page.
2. Display priority research gaps (auto-ranked by importance).
3. For each gap, show:
   - Question (auto-generated from gap key).
   - Why it matters (reason field).
   - Suggested sources (LinkedIn, news, company website, SEC filings—recommend search paths).
4. Add form to log research finding:
   - Fact field (auto-filled from gap key, operator can override).
   - Value (what operator found).
   - Confidence (1–3 scale).
   - Source (where they found it, e.g., "LinkedIn VP Ops profile").
   - Basis (stated, inferred, operator).
5. System action:
   - Record finding as new OiOpportunityFact (operator-supplied).
   - Auto-resolve gap if gap key matches fact field.
   - Rescore opportunity (include new fact).
6. Add "Research complete" checkbox to mark opportunity as "research_ready."

**Dependencies:** Opportunity detail page (P0.2).

**Estimated complexity:** Medium (1–2 weeks).

**Validation method:** Todd researches 3 gaps for a high-priority opportunity and marks it research-ready. Time: < 30 minutes.

---

### P0.5: Opportunity Status Machine with State Guards

**Problem:** Todd can mark an opportunity "contact_ready" without preparing outreach. Status does not guarantee readiness.

**Commercial impact:** Todd gets false sense of progress; wastes time on half-prepared opportunities.

**Affected components:**
- `/src/app/tif/opportunities/actions.ts` (updatePursuitStatus or similar).

**Recommended change:**
1. Define state machine:
   - **reviewing** → can add hypothesis, research gaps, stakeholder.
   - → **qualified**: requires (hypothesis filled in).
   - → **research_ready**: requires (top 3 research gaps closed).
   - → **contact_ready**: requires (stakeholder identified + email draft reviewed).
   - → **contacted**: auto (when outreach logged).
   - → **conversation**: manual (when meeting/call scheduled).
   - → **paused**: can happen from any state.
   - → **closed**: final (closed-won or closed-lost).
2. Add form to transition status:
   - Show why transition is blocked (if it is).
   - Require note/reason for paused or closed.
3. Prevent backwards transitions (no "research_ready" → "reviewing").

**Dependencies:** P0.2, P0.3, P0.4.

**Estimated complexity:** Low (1 week).

**Validation method:** Todd tries to mark opportunity "contact_ready" without preparing outreach; system blocks with clear reason.

---

### P0.6: Next-Action Clarity and Prioritization

**Problem:** Todd doesn't know which pursuit needs action today.

**Commercial impact:** No urgency or rhythm; opportunities age without progress.

**Affected components:**
- `/src/app/tif/opportunities/page.tsx` (pursuit list, no prioritization).
- `OiPursuit.nextAction` (text field, manually written, no structure).
- `OiPursuit.nextFollowUpAt` (date field, set but not used to sort/remind).

**Recommended change:**
1. Add structured next-action fields to `OiPursuit` or new `NextAction` model:
   - Action type (enum): "research", "draft_outreach", "send_outreach", "follow_up", "schedule_meeting", "send_proposal".
   - Due date.
   - Assigned to (Todd; future: other team members).
   - Notes/rationale.
2. Add next-action inference logic:
   - If status is "reviewing" or "qualified" → next action is "research gaps" (if any open).
   - If status is "research_ready" → next action is "draft_outreach."
   - If status is "contact_ready" and no outreach logged → "send_outreach."
   - If status is "contacted" and 7+ days since send → "follow_up."
   - If status is "conversation" → "send_proposal" or "schedule_assessment."
3. Display next-action queue:
   - Sort by due date.
   - Show "Overdue," "Due today," "Due this week."
   - One-click "Start" action (navigates to relevant page/form).
4. Add dashboard widget: "Your next 3 actions today."

**Dependencies:** P0.2 (detail page), P0.5 (state machine).

**Estimated complexity:** Medium (1–2 weeks).

**Validation method:** Todd opens dashboard; sees 3 concrete next actions (not just "follow up"); can execute each in < 10 min.

---

## P1: Necessary for Repeatable Deal Generation (Phase 2)

### P1.1: Contact Discovery & Email Lookup

**Problem:** Todd doesn't have email addresses for identified stakeholders. Must manually search LinkedIn/company directory.

**Commercial impact:** Friction between "I know who to contact" and "I can send email." Delays outreach by hours.

**Affected components:**
- No contact discovery service.
- No email lookup (RocketReach, Hunter, Clearbit, etc.).

**Recommended change:**
1. Add optional email lookup integration (start with free/cheap service: Clearbit, Hunter, or Rocketreach API).
2. When stakeholder is created:
   - Capture name, title, company.
   - Call email lookup API.
   - If email found, offer to store (with confidence).
   - If not found, prompt operator: "Email not found. Would you like to (a) search manually, (b) use a different approach?"
3. Add email field to OiPerson.
4. For outreach generation, check email before drafting; stop if not found.

**Dependencies:** P0.2, P0.3.

**Estimated complexity:** Low-medium (1 week; mostly API integration).

**Validation method:** Create 5 stakeholders; system finds emails for 4+ (typical success rate for APIs).

---

### P1.2: Activity Log & Relationship History

**Problem:** No record of interactions with stakeholders. Todd can't answer "Have we already talked about this?" or "Why did we pause?"

**Commercial impact:** Loses continuity; repeats conversations; misses warm relationships.

**Affected components:**
- No activity model in schema.
- No relationship event log.
- No conversation notes or reason fields.

**Recommended change:**
1. Add `Activity` model:
   ```
   {
     id: string
     type: enum // "email_sent", "call_scheduled", "call_completed", "proposal_sent", "message_received", etc.
     opportunityId: string
     personId: string
     createdAt: datetime
     loggedAt: datetime // when Todd logged it
     loggedBy: string // "Todd" placeholder for now
     
     // Type-specific fields
     emailSubject?: string
     emailBody?: string
     callNotes?: string
     callOutcome?: string
     proposalValue?: int
     proposalStatus?: enum // "sent", "under_review", "accepted", "declined"
     
     reason?: string // "why we paused", "why we closed", etc.
   }
   ```
2. Add activity logging actions:
   - "Email sent" → auto-logged when outreach sent (P0.3).
   - "Call scheduled" → form to record meeting.
   - "Call completed" → form to record outcome + notes.
   - "Follow-up sent" → log follow-up email.
   - "Paused" → form to record reason.
   - "Closed" → form to record outcome (closed-won, closed-lost, moved on).
3. Display activity log on opportunity/person detail page (immutable, timestamped).
4. Use activity history to detect "have we talked to this person before?"

**Dependencies:** P0.2, P0.3.

**Estimated complexity:** Medium (1–2 weeks).

**Validation method:** Todd logs 5 activities over 1 week; can view all interactions with one person; understands why each opportunity is paused/closed.

---

### P1.3: Enhanced Opportunity Scoring (Include Person Authority)

**Problem:** Opportunity fit score ignores who owns the problem. High-scoring opportunity might be owned by junior person with no budget.

**Commercial impact:** Todd pursues unrealistic opportunities; wastes time on nice-to-have problems.

**Affected components:**
- `/src/lib/opportunity-intelligence/score.ts` (opportunity-fit-v1 scoring; ignores person data).
- `/src/lib/oi.ts` (pursuit-fit scoring is richer but separate).

**Recommended change:**
1. Modify `OiOpportunityScore` to include person-based factors:
   - If stakeholder is identified, roll up authority scores to opportunity.
   - Add "decision-maker clarity" component: (full authority → +8, some authority → +4, unclear → 0).
   - Add "likelihood of engagement" component based on:
     - Seniority (Director+ required).
     - Organization kind (payer/health_tech/health_system priority).
     - Transformation relevance + budget authority.
2. Rename or add new score type: "opportunity-value-v1" (encompasses fit + person + realism).
3. Display both components:
   - "Fit to Todd's expertise: 80 points."
   - "Person authority & engagement likelihood: 45 points."
   - "Total opportunity value: 125 points."

**Dependencies:** P0.2, P1.2 (stakeholder identification).

**Estimated complexity:** Low (1 week; mostly scoring logic).

**Validation method:** Score 10 opportunities, then score them manually; scores align within 10%.

---

### P1.4: Engagement Type & Offer Selection

**Problem:** No model for which engagement Todd should propose (assessment, advisory, build sprint, FTE).

**Commercial impact:** Todd makes engagement decisions ad-hoc; misses upsell opportunities; doesn't position value correctly.

**Affected components:**
- No engagement type selection in OI system.
- No offer model linked to opportunity/problem.

**Recommended change:**
1. Add `EngagementType` model or simple enum on `OiOpportunity`:
   - assessment ($5K–$8K, 1 week)
   - advisory ($15K–$30K, 2–3 weeks)
   - build_sprint ($45K–$150K, 6–12 weeks)
   - fractional_advisor ($12K–$25K/month, 3–12 months)
   - fte (full-time role)
2. Add engagement-type recommendation logic:
   - If problem is "diagnostic/understanding unclear" → suggest assessment.
   - If problem is "we know the problem but need strategy" → suggest advisory.
   - If problem is "we need to build a system" → suggest build_sprint.
   - If problem is "ongoing governance/operations" → suggest fractional_advisor.
3. Add engagement type to outreach draft (mention "typical scope is 1-week assessment").
4. Add engagement type to proposal template (if/when proposal generation is added).

**Dependencies:** P0.3 (outreach generation), future proposal workflow.

**Estimated complexity:** Low (1 week).

**Validation method:** Todd prepares outreach for 3 opportunities; engagement type recommendation matches his intuition 90%+ of the time.

---

### P1.5: Proof Asset Matching

**Problem:** No way to link commercial opportunities to Todd's case studies, assessments, or content proof.

**Commercial impact:** Todd must manually remember "which case study is relevant?" Weakens outreach and proposal positioning.

**Affected components:**
- No bridge between `OiOpportunity` and `Asset` / content system.
- No asset tagging or searchability by problem type.

**Recommended change:**
1. Add optional tagging to existing `Asset` records:
   - Problem types (prior authorization, workflow modernization, governance, etc.).
   - Industry (healthcare, real estate, etc.).
   - Engagement type (assessment, recovery project, advisory).
2. Add asset-matching logic to outreach generation:
   - Query assets tagged with problem types + engagement type matching opportunity.
   - Return top 3 relevant assets (case study, assessment framework, executive brief).
3. Include proof match in research summary + email draft:
   - "Todd has completed similar engagements. Here is the methodology: [link to framework]. Here is a case study: [link or brief]."
4. In outreach section of opportunity detail page:
   - Display "Relevant assets" section with case studies, frameworks, assessments.
   - Allow operator to add custom links ("send them this article").

**Dependencies:** P0.3, P1.3 (outreach generation).

**Estimated complexity:** Medium (1–2 weeks; requires content audit + tagging system).

**Validation method:** For 5 opportunities, system recommends 2+ relevant assets per opportunity; operator agrees with recommendations 80%+.

---

## P2: Improves Leverage or Quality (Phase 3)

### P2.1: Company News & Signal Monitoring

**Problem:** Todd must manually find job postings, news, and regulatory changes. No automated signals.

**Commercial impact:** Misses time-sensitive opportunities (new hires, funding rounds, compliance deadlines).

**Affected components:**
- No news monitoring or alert system.
- No job board integration.
- No RSS feed aggregation.

**Recommended change:**
1. Identify monitoring sources:
   - Job boards (LinkedIn, Healthcare IT News job listings, CMS postings).
   - News aggregators (healthcare news, regulatory).
   - Company announcements (SEC filings, press releases).
   - RSS feeds (Humana IR, Elevance Health investor relations, etc.).
2. Add optional alert integration:
   - For target companies/problems, subscribe to news alerts.
   - When signal detected, create CaptureItem or OiSource automatically.
   - Flag as "new signal" on dashboard.
3. Operator reviews signals daily/weekly:
   - "This is relevant" → create/link opportunity.
   - "This is noise" → archive.
4. Start simple: RSS feeds + email digests. Defer scrapers/APIs.

**Dependencies:** P0.1 (dashboard), signal integration to OI system.

**Estimated complexity:** Medium (2–3 weeks for basic monitoring + ingestion).

**Validation method:** Monitor 4 target companies for 2 weeks; capture 5+ relevant signals (job posts, news, regulatory).

---

### P2.2: Engagement Outcome & Revenue Attribution

**Problem:** No record of closed engagements, outcomes, or revenue. Todd can't answer "which strategies work?" or "how much did TIF contribute?"

**Commercial impact:** No learning loop. Todd cannot improve approach over time.

**Affected components:**
- No engagement outcome model.
- No closed-won tracking.
- No revenue attribution.

**Recommended change:**
1. Add `Engagement` model:
   ```
   {
     id: string
     opportunityId: string
     stakeholderId: string
     engagementType: enum // assessment, advisory, build_sprint, etc.
     status: enum // proposed, confirmed, active, completed, closed_won, closed_lost
     
     proposalDate?: datetime
     proposalValue?: int
     contractDate?: datetime
     contractValue?: int
     completionDate?: datetime
     actualValue?: int // revenue if paid
     
     outcome: enum? // knowledge_transfer, system_built, recovered, hired, advised, etc.
     notes?: string
   }
   ```
2. Add engagement lifecycle:
   - "Proposed" (proposal sent to prospect).
   - "Confirmed" (prospect accepted or meeting scheduled to discuss).
   - "Active" (work underway).
   - "Completed" (deliverables finished).
   - "Closed-won" (contract signed and revenue received).
   - "Closed-lost" (prospect declined or moved on).
3. Add form to record outcome:
   - Engagement type + value.
   - Date signed.
   - Actual revenue (if different from proposal).
   - Outcome type (what Todd actually did for them).
   - Lessons (what worked, what didn't, how to improve).
4. Add engagement closure flow:
   - Link engagement to opportunity.
   - Record outcome.
   - Generate lesson record (capture insights for future reference).

**Dependencies:** P0.2, P1.2 (activity log).

**Estimated complexity:** Medium (1–2 weeks).

**Validation method:** After 3 closed engagements, Todd can answer "How many proposals led to closed deals?" and "What was the revenue per engagement type?"

---

### P2.3: Lookalike Cohort & Company-Level Ranking

**Problem:** No way to say "these 10 companies are our target segment." Todd must individually score each opportunity.

**Commercial impact:** Inefficient prioritization; misses pattern across companies.

**Affected components:**
- OI system has lookalike anchor concept (in OiPerson) but no company-level aggregation.

**Recommended change:**
1. Add optional `Company` or `Cohort` model:
   - List of target companies (Elevance Health, Humana, Availity, etc.).
   - Strategic reason (payer, health-tech, post-acquisition, etc.).
   - Metadata (industry, size, growth rate).
2. Add company-level score/priority:
   - Aggregate opportunity scores for this company.
   - Surface "top 3 opportunities at Humana this week."
3. Add account-planning view:
   - Show all active opportunities + stakeholders at one company.
   - Highlight complementary entry points ("Can reach via IT and Operations teams").
4. Use cohort to auto-tag new opportunities:
   - When opportunity is ingest with company in cohort, surface cohort context automatically.

**Dependencies:** P0.1, P1.3 (scoring).

**Estimated complexity:** Medium (1–2 weeks).

**Validation method:** Show account-planning view for one cohort company; confirm 3+ entry points are visible.

---

### P2.4: Warm-Path & Referral Workflow

**Problem:** No structured workflow for warm introductions or referrals.

**Commercial impact:** Todd can't leverage warm relationships; defaults to cold outreach.

**Affected components:**
- `OiPerson.relationshipStrength` score exists; relationship journey does not.
- No referral source tracking.
- No introduction request workflow.

**Recommended change:**
1. Add relationship event log to `OiPerson` or `Activity`:
   - Relationship type (cold, warm referral, warm history).
   - Mutual connection (name, how Todd knows them).
   - Prior interactions (dates, context).
2. When warm path exists:
   - Offer "Send introduction request" action.
   - Generate introduction request email (to mutual connection, asking for intro).
   - Track intro request status (pending, sent, declined, intro happened).
3. Link to activity log:
   - Record when intro was sent.
   - Record when intro happened (mutual connection replies "I introduced you to X").
4. In outreach generation:
   - If warm path exists, suggest warm intro approach instead of cold email.
   - Generate intro request email (template).

**Dependencies:** P0.2, P0.3, P1.2.

**Estimated complexity:** Medium (1–2 weeks).

**Validation method:** Todd identifies 2 warm paths; generates intro requests; tracks status.

---

## P3: Later-Stage Expansion

### P3.1: Multi-Stakeholder Account Planning

- Model multiple entry points at one company.
- Track interdependencies (this person reports to that person).
- Identify blocker vs. influencer vs. sponsor vs. operator roles.

### P3.2: CRM Integration

- Sync opportunities/stakeholders to Salesforce or HubSpot.
- Bi-directional activity syncing (email logged in TIF → appears in CRM).

### P3.3: Email Integration

- Directly send emails from TIF (instead of Todd copying to his email client).
- Auto-log opens/clicks.
- Track reply status.

### P3.4: Proposal & Contract Generation

- Generate proposal from engagement type + scope + value.
- Track proposal status.
- Link to signed contract.

### P3.5: Measurement & Learning Loop

- Aggregate outcomes: which signals → engagements → revenue?
- Cohort analysis: which company types are most valuable?
- Time-to-close analysis: which engagement types close fastest?
- Capability profile updates based on completed engagements.

### P3.6: Autonomous Pursuit Discovery

- Automated job board scraping + ingestion (high false-positive risk; operator review required).
- News-triggered opportunity creation (if news mentions Todd's problem domain).
- Regulatory-triggered alerts (new rules in healthcare that imply transformation work).

---

## Backlog Snapshot

| Gap | P-Tier | Complexity | Dependencies | Est. Time | Blocker? |
|---|---|---|---|---|---|
| Unified dashboard | P0 | Medium | P0.2, P0.6 | 2 weeks | **Yes** |
| Opportunity detail page | P0 | Medium | None | 2 weeks | **Yes** |
| Outreach generation | P0 | Medium-high | P0.2 | 2 weeks | **Yes** |
| Research gap workflow | P0 | Medium | P0.2 | 1 week | **Yes** |
| Status machine | P0 | Low | P0.2–P0.4 | 1 week | **Yes** |
| Next-action clarity | P0 | Medium | P0.2, P0.5 | 1 week | **Yes** |
| Contact discovery | P1 | Low-medium | P0.2, P0.3 | 1 week | No |
| Activity log | P1 | Medium | P0.2, P0.3 | 2 weeks | No |
| Enhanced scoring | P1 | Low | P0.2, P1.2 | 1 week | No |
| Engagement types | P1 | Low | P0.3 | 1 week | No |
| Proof asset matching | P1 | Medium | P0.3, P1.3 | 2 weeks | No |
| News monitoring | P2 | Medium | P0.1 | 2 weeks | No |
| Engagement outcome | P2 | Medium | P0.2, P1.2 | 2 weeks | No |
| Company cohorts | P2 | Medium | P0.1, P1.3 | 2 weeks | No |
| Warm-path workflow | P2 | Medium | P0.2, P0.3, P1.2 | 2 weeks | No |

---

## Summary

**P0 (Critical path, ~8 weeks):** Dashboard, opportunity detail page, outreach generation, research workflow, status machine, next-action clarity. Without these, Todd cannot operate commercially.

**P1 (Necessary for scale, ~6–8 weeks):** Contact discovery, activity log, enhanced scoring, engagement types, proof matching. Without these, Todd must do manual research and has no learning loop.

**P2 (Improves efficiency/quality, ~8–10 weeks):** News monitoring, engagement tracking, company cohorts, warm-path workflow. Enables strategic prioritization and outcome attribution.

**P3 (Differentiators):** Multi-stakeholder planning, CRM sync, email integration, proposals, full learning loop. Later-stage scale plays.

**Recommendation:** Implement P0 first (8 weeks), then P1 (6–8 weeks). By end of Phase 2, Todd has a mature, learnable commercial system. P2 and P3 are optimizations.
