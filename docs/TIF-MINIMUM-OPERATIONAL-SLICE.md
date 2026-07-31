# TIF Minimum Operational Slice

**Date:** 2026-07-31  
**Status:** First usable commercial workflow (candidate for Phase 1 implementation)  
**Scope:** End-to-end slice from signal to outreach prep

---

## User Goal

Todd should be able to:

1. Paste a job posting or opportunity source.
2. TIF extracts facts, identifies Todd's fit, highlights research gaps, and ranks the opportunity.
3. Todd researches gaps and fills in hypothesis (why this matters, why he's relevant).
4. TIF generates a research summary and outreach draft.
5. Todd reviews, edits, and sends the email.
6. Todd logs the send and plans follow-up.

**Time to complete:** 5–15 minutes for high-fit opportunity, 30–45 minutes for research-intensive opportunity.

**Outcome:** Todd has sent a personalized, research-informed first email to a real decision-maker.

---

## Entry Point

**Primary:** `/tif/opportunities/sources` (pasted opportunity intake).

**Secondary:** Job posting link (future: URL ingestion, not in v1).

**User action:** "I found this job posting. Should I pursue it?"

---

## Required Data

### Input:

1. **Opportunity source:** Pasted text (job posting, announcement, proposal, etc.).
2. **Organization name:** Company being pursued (from posting or operator input).
3. **Opportunity title:** Role, initiative, or problem (from posting or operator input).
4. **Stakeholder hypothesis (optional):** If operator knows a likely contact, provide name/title.

### System derives:

- Structured facts (job level, problems, technologies, compensation).
- Fit score against Todd's capability profile.
- Research gaps (what we need to know).
- Opportunity status (reviewing → qualified → paused → closed).
- Next action recommendations.

---

## Core Entities

### OiOpportunity

The central record:

```
{
  title: string                        // "SVP Operations hiring at Humana"
  status: enum                         // "reviewing", "qualified", "paused", "closed"
  organizationId: string               // Humana
  
  operatorThesis: string?              // "Company is consolidating post-acquisition, likely needs workflow modernization expertise"
  thesisBasis: enum?                   // "operator", "stated", "inferred"
  
  sourceIds: string[]                  // Links to OiSource records
  facts: OiOpportunityFact[]          // Extracted facts with evidence offsets
  researchGaps: OiResearchGap[]       // Open questions
  
  currentScore: OiOpportunityScore    // Fit score + components
  engagementType: enum?                // "assessment", "advisory", null (not yet decided)
  
  createdAt: datetime
  updatedAt: datetime
}
```

### OiSource

Immutable source snapshot:

```
{
  sourceType: enum              // "job_posting", "pasted_text", etc.
  rawContent: string            // Full pasted text
  normalizedContent: string     // Cleaned version
  contentHash: string           // Duplicate detection
  
  opportunityId: string         // Back-link
  organizationId: string        // For duplicate checks
  
  retrievedAt: datetime         // When we captured it
  publishedAt: datetime?        // When source was published (if known)
  
  evidence: OiEvidence[]        // Text excerpts → facts
}
```

### OiOpportunityFact

Extracted or operator-supplied fact:

```
{
  field: string                 // "reporting_line", "business_problem", etc.
  value: string                 // Full text value
  normalizedValue: string       // Cleaned/canonical form
  
  basis: enum                   // "stated", "inferred", "operator"
  confidence: int (0-100)       // How sure are we?
  ordinal: int                  // For fields with multiple values
  
  isOperatorOverride: bool      // True if operator manually added/corrected
  
  evidenceId: string?           // Link to source offset
  opportunityId: string         // Back-link
}
```

### OiResearchGap

Open question:

```
{
  gapKey: string                    // "current_tech_stack", "recent_leadership_change"
  question: string                  // "What is their current workflow system?"
  reason: string                    // "To position interop/modernization work"
  
  status: enum                      // "open", "resolved", "dismissed"
  resolution: string?               // Answer found
  resolvedAt: datetime?             // When we resolved it
  
  opportunityId: string             // Back-link
}
```

### OiOpportunityScore

Fit score snapshot (append-only):

```
{
  total: int                                   // 0-125
  completeness: int                           // % of fields found
  
  components: [
    {
      key: string                             // "business_problem"
      label: string                           // "Funded problem fit"
      points: int
      maxPoints: int
      reason: string                          // Explanation
    },
    ...
  ]
  
  inputSnapshot: {
    fields: Record<string, string[]>          // What facts we found
    operatorThesisPresent: bool               // Did operator add context?
  }
  
  scorePolicyVersion: string                  // "opportunity-fit-v1"
  capabilityProfileVersion: string            // Todd's current version
  
  opportunityId: string                       // Back-link
}
```

---

## Workflow Steps

### Step 1: Ingest

**Page:** `/tif/opportunities/sources`

**Form:**
- Paste text (job posting, announcement).
- Company name (if not obvious).
- Opportunity title (if not obvious).
- Source type (job_posting, announcement, referral, other).
- Canonical URL (optional).

**System actions:**
1. Normalize and hash content; check duplicate.
2. Create OiSource (immutable).
3. Create OiOpportunity (status: reviewing).
4. Trigger extraction.

**Time to display:** 2–5 seconds (extraction is Claude-based, so may be slower).

---

### Step 2: Extract & Score

**System actions:**
1. Extract facts from pasted text using opportunity-intelligence contracts.
2. Verify evidence offsets (ensure quoted text matches offsets).
3. Plan research gaps.
4. Score fit using TODD_CAPABILITY_PROFILE.
5. Update opportunity status (stays "reviewing").

**Displayed to operator:**
- **Extracted facts:** Table of field → found values (with confidence).
- **Fit score:** Total + component breakdown (each component shows points, max points, reason).
- **Research gaps:** List of open questions (auto-prioritized).
- **Current status:** "Reviewing" with next action recommendation.

---

### Step 3: Operator Review & Thesis

**Page:** `/tif/opportunities/[id]` (detail view for this opportunity).

**Operator decisions:**

a) **Is this worth pursuing?**
   - Yes → Qualify opportunity (status: qualified).
   - No → Close opportunity (status: closed, reason: "not a fit" or similar).

b) **Add operator hypothesis (text fields):**
   - **Problem hypothesis:** What is really happening underneath the stated problem?
   - **Fit hypothesis:** How does Todd's expertise apply?
   - **Engagement type (optional):** assessment, advisory, build sprint, etc.

c) **Review extracted facts:**
   - Correct obviously wrong extractions.
   - Mark suspicious facts for more research.

d) **Review research gaps:**
   - Dismiss gaps that are not critical ("founder's education" → not needed).
   - Prioritize critical gaps ("current workflow systems," "recent leadership changes").

**System updates:**
- Update thesis fields.
- Rescore (include operator thesis in completeness calc).
- Update gap priorities.

**Time to complete:** 5–10 minutes.

---

### Step 4: Research

**Page:** Still `/tif/opportunities/[id]`, new "Research" section.

**For each priority research gap:**

1. **Operator researches** (LinkedIn, company website, news, SEC filing, mutual connections).
2. **Operator logs findings:**
   - Fact field (auto-filled from gap key).
   - Value (what they found).
   - Confidence (1–3 scale, not 0–100).
   - Source (where they found it).
   - Basis: "stated" (from company site), "inferred" (from news + analysis), "operator" (Todd's knowledge).
3. **System records fact** as new OiOpportunityFact (operator-supplied, not extracted).
4. **System auto-resolves gap** if gap key matches fact field.

**Repeat until top gaps are closed.**

**Time per gap:** 5–15 minutes (depends on research difficulty).

---

### Step 5: Identify Stakeholder

**Page:** New "Stakeholders" section on `/tif/opportunities/[id]`.

**Operator actions:**

a) **Determine likely contact:**
   - Search LinkedIn for people at company in relevant roles (SVP Operations, CIO, transformation lead, etc.).
   - If operator has mutual connection, note that.

b) **Create or link OiPerson:**
   - Name, title, company, seniority.
   - Source (LinkedIn URL, news article, referral source).
   - Source confidence (1–3: 1 = guessed, 2 = likely, 3 = verified).
   - Relationship type (cold, warm referral, warm history).
   - If warm: referral source or prior interaction.

c) **Operator scores (1–3 scale, 0 = unknown):**
   - Budget authority (can this person approve $X?).
   - Transformation relevance (are they involved in the problem area?).
   - Hiring authority (are they involved in hiring or staffing?).

**System records OiPerson and candidate OiPursuit** (person-opportunity pair).

**Time to complete:** 10–20 minutes (includes LinkedIn research).

---

### Step 6: Prepare Outreach

**Page:** New "Outreach" section on `/tif/opportunities/[id]`.

**System generates (automation):**

1. **Research summary:** Facts found + gaps closed + hypothesis → bullet-point brief.
2. **Proof matching:** Problem stated → which Todd case studies are relevant? → bullet-point list.
3. **Email draft:**
   - Subject: Personalized (no generic "Partnership Inquiry").
   - Body: Research + fit + CTA (meeting, conversation, no hard sell).
   - Tone: Professional, specific, not salesy.

**Example draft:**

```
Subject: Prior authorization workflow insight at [Company]

Hi [Name],

I came across your SVP Operations role announcement at [Company] and your background in 
healthcare operations. I'm Todd Kovalsky, and I focus on prior authorization and utilization 
management modernization—specifically operational quality improvement in high-volume payer 
environments.

A few things caught my attention:
- [Company's] recent acquisition of [target] suggests workflow consolidation is likely in your roadmap.
- Prior authorization operational quality is often a governance + workflow + staffing problem, not a 
  platform problem.
- I've completed three PA operational assessments in the past 18 months (similar payers); the 
  pattern is surprising and fixable.

I'm not sure if PA operational improvement is on your radar right now, but if it is, I'd be worth 
an exploratory conversation. Diagnostic assessments typically run $5K–$8K and take a week; the 
findings often unlock clearer thinking on what platform/tooling investments actually matter.

Would you be open to a 20-minute call next week?

Best,
Todd
```

**Operator review & edit:**
- Fix any errors or awkward phrasing.
- Add any personal detail (mutual connection, shared background, specific company knowledge).
- Change CTA if appropriate (but keep it invitation, not aggressive).

---

### Step 7: Send & Log

**Page:** Outreach section, "Send" form.

**Operator actions:**

1. Confirm email address (system should surface from LinkedIn or company directory).
2. Review draft one final time.
3. Click send (integrates with Todd's email, or system records intent to send).
4. System logs:
   - To: email address.
   - Subject: Subject line.
   - Draft: Full email.
   - Sent date/time.
   - Sent by: Todd (or "operator" as placeholder).

**System updates:**
- Record outreach activity.
- Update pursuit status: "contacted".
- Set follow-up reminder (14 days by default; operator can override).

---

### Step 8: Track Response & Follow-up

**Page:** Activity log on `/tif/opportunities/[id]`.

**Operator actions:**

1. **Log response:**
   - Did they reply? Yes/No.
   - If yes: sentiment (positive, neutral, deflecting, rejection).
   - If yes: next step (meeting scheduled, asked for more info, will follow up, etc.).

2. **Schedule follow-up:**
   - If no response after 7 days: "Send polite follow-up."
   - If positive: "Schedule 30-min call."
   - If deflecting: "Wait 30 days; try different angle."

3. **Update status:**
   - If positive → "conversation"
   - If no response after 2 follow-ups → "paused" (revisit in 3 months).
   - If rejection → "closed"

**System:**
- Logs all activities immutably.
- Reminds Todd on follow-up dates.
- Maintains audit trail.

---

## Interface Requirements

### `/tif/opportunities` (dashboard update)

Current view lists all pursuits. Add:

- **Filter:** "Contact-ready" (my top actions).
- **Sort:** By score, recency, next-action-due-date.
- **Card per opportunity:** 
  - Company + opportunity title
  - Fit score
  - Top research gap
  - Next action + due date
  - "Open detail" link

### `/tif/opportunities/sources` (already exists, needs minor update)

- Paste form (already works).
- Extraction result display (already works).
- Add: One-click "Create opportunity" or "Link to existing" after ingestion.

### `/tif/opportunities/[id]` (new detail page)

Sections:
1. **Overview:** Company, opportunity title, status, fit score.
2. **Extracted facts:** Table (field, value, confidence, source offset).
3. **Research gaps:** List (question, status, priority).
4. **Operator hypothesis:** Problem + fit (text fields).
5. **Stakeholder:** Person (name, title, company, source, authority scores, relationship).
6. **Outreach prep:** Research summary, proof match, email draft.
7. **Activity log:** All logged events (outreach sent, responses, follow-ups, status changes).

---

## API/Service Requirements

### Existing:

- `extractOpportunity()` (in `/lib/opportunity-intelligence/extract.ts`) → works.
- `scoreOpportunityFit()` (in `/lib/opportunity-intelligence/score.ts`) → works.
- `planResearchGapReconciliation()` (in `/lib/opportunity-intelligence/research-gaps.ts`) → works.
- `ingestPastedOpportunity()` (in `/lib/opportunity-intelligence/ingest.ts`) → works.

### New or modified:

- **Stakeholder creation:** Action to create OiPerson and OiPursuit.
- **Outreach generation:** Service to generate research summary + proof match + email draft.
  - Inputs: Opportunity facts, hypothesis, problem.
  - Calls Claude to generate draft (research-informed, not boilerplate).
  - Returns: Summary, proof list, email draft.
- **Outreach logging:** Action to record email sent, schedule follow-up.
- **Activity logging:** Action to log response, status change.

---

## Provenance & Audit

### Evidence chain (immutable):

- OiSource: Original pasted text, hashed, timestamp.
- OiEvidence: Text excerpt with offsets (immutable audit trail).
- OiOpportunityFact: Extracted or operator-supplied, with basis (stated/inferred/operator).
- Outreach draft: Generated, operator-edited, timestamp, who sent.
- Activity log: All events timestamped, immutable.

### Traceability:

Todd can show a prospect: "Here is how we found you and why we think you matter" → sources, facts, hypothesis.

---

## Acceptance Criteria

### Functional:

- [ ] Paste job posting → System extracts facts.
- [ ] Facts → Fit score calculated correctly.
- [ ] Score breakdown shown (component with points + reason).
- [ ] Research gaps identified and prioritized.
- [ ] Operator can add hypothesis (problem + fit).
- [ ] Operator can add stakeholder (name, title, source, authority scores).
- [ ] Outreach draft generated (research-informed, personalized).
- [ ] Operator can edit draft.
- [ ] Outreach can be logged (sent date, recipient, draft stored).
- [ ] Follow-up reminder scheduled.
- [ ] Activity log records all events.

### Usability:

- [ ] End-to-end time: 30–45 min for typical opportunity (5 min to ingest, 10–15 min to review/hypothesis, 10–15 min to research, 10 min to prepare outreach).
- [ ] Operator can see "what's next" at each step.
- [ ] Errors are clear and actionable (e.g., "Email address not found—please provide").
- [ ] No data loss (drafts auto-save; logs are immutable).

### Reliability:

- [ ] Extraction works on 95%+ of job postings (some edge cases expected).
- [ ] Score reproducible (same input → same score).
- [ ] No false duplicates (hash-based duplicate detection works).
- [ ] Activity log never loses data (immutable; audit trail preserved).

---

## Explicit Exclusions (Phase 2+)

- Contact discovery automation (email lookup).
- Email sending integration (Todd sends manually; system logs intent).
- Meeting scheduling integration (Calendly, etc.).
- CRM sync (Salesforce, HubSpot).
- Email open/click tracking.
- Multi-stakeholder account planning.
- Warm introduction workflow (LinkedIn outreach, referral intro emails).
- Conversation outcome (no call notes or engagement tracking yet).
- Revenue attribution or closed-won tracking.

---

## Migration Implications

### Data:

- No schema changes required (all models already exist).
- May need new fields for outreach tracking (sent date, email, draft) → new model or extend Pursuit.

### Navigation:

- Consolidate `/tif/opportunities` and `/tif` into one mental model (both feed the same commercial workflow).

### Content:

- No changes to content production spine (AssetOpportunity, Asset, etc.) in Phase 1.
- Phase 2 will link commercial opportunities to relevant assets/proof.

---

## Rollout Plan

### Week 1: Build & test

- Implement stakeholder creation action.
- Implement outreach generation service (calls Claude).
- Implement outreach logging.
- Test end-to-end with 3–5 real opportunities.

### Week 2: Refine & ship

- Fix bugs from testing.
- Improve email draft quality based on feedback.
- Ship to `/tif/opportunities` with new detail page.
- Todd uses for 1 week, provides feedback.

### Week 3: Iterate

- Refinement based on Todd's real usage.
- Improve research gap prioritization.
- Improve outreach draft personalization.
- Ready for Phase 2.

---

## Why This Slice Works

1. **End-to-end:** Signal → Outreach. One complete commercial loop.
2. **High value:** Todd gets research-informed drafts, not template boilerplate.
3. **Minimal scope:** No contact discovery, no email integration, no CRM sync. Just core workflow.
4. **Real usage:** Todd can start using this next Monday and will benefit immediately.
5. **Foundation:** Builds the right data model for Phases 2–4 (contact discovery, follow-up tracking, outcome learning).

---

## Success Metric

**After Phase 1 complete:** Todd sends 2–3 research-informed, personalized outreach emails per week (vs. 0 today). At least 1 response per month. After 3 months of usage, at least 1 diagnostic conversation.

This is not "complete commercialization," but it is a repeatable, usable commercial workflow. Phase 2+ adds contact discovery, follow-up automation, and outcome tracking.
