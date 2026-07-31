# TIF Target Operating Model

**Date:** 2026-07-31  
**Status:** Recommended commercial operations architecture  
**Scope:** How TIF should work when fully operationalized for Todd's advisory business

---

## System Purpose

TIF exists to help Todd **repeatedly execute a commercial pursuit workflow** with high signal-to-noise and minimal friction between "I found something interesting" and "I know exactly what to do next."

The system should answer three questions daily:

1. **What should Todd work on today?** (Opportunity prioritization)
2. **What does Todd need to know before acting?** (Research readiness)
3. **What is Todd's best next move?** (Action clarity)

---

## Operator Profile

**Todd's role:** Sole commercial operator.

**Time available:** Constrained (full-time employment). Pursuit work fits into available hours and weekends.

**Constraints:**
- Cannot manually research 50+ companies per day.
- Cannot afford mass outreach or low-conversion activity.
- Cannot sustain high-touch engagement without leverage.
- Needs automation to multiply his time, but only where it genuinely helps.

**Win conditions:**
- 1–2 consulting engagements per quarter → $20K–$60K per engagement → $60K–$240K annually.
- OR one senior FTE role.
- OR fractional advisor retainer ($12K–$25K/month).

---

## Canonical Business Objects

### 1. Signal

**What it is:** Raw market observation that may indicate an opportunity.

**Examples:**
- Job posting for SVP Operations at payer X.
- News: "Company Y acquired Z, now consolidating workflows."
- Regulatory filing: New mandates in prior authorization.
- Analyst report: Healthcare operational challenges.
- Referral: "You should talk to my friend at company Z."

**Lifecycle:** Inbox (capture) → Reviewed (classified) → Linked or archived.

**Model:** Evolved from `CaptureItem`. Add structured classification and link to opportunity/organization when applicable.

**Operator action:** "I found this. Is it relevant?" → Yes → Create or link to opportunity.

---

### 2. Opportunity

**What it is:** A plausible funded need, problem, or role at a company that Todd might help with.

**Examples:**
- "Prior authorization workflow modernization at Elevance Health."
- "Post-acquisition integration challenge at UnitedHealth following Optum merger."
- "SVP of Operations hiring at Humana (suggests transformation work planned)."

**Lifecycle:** Reviewing → Qualified (worth pursuing) → Paused (waiting for better timing) → Closed (resolved, no path, or lost).

**Model:** `OiOpportunity` (extended with stakeholder hypotheses, required research, engagement type, and value estimate).

**Operator action:** "What is the commercial value of this opportunity?" → Score → Rank → Decide: pursue, research more, or defer.

---

### 3. Stakeholder

**What it is:** A person at the target company who might be an entry point, sponsor, operator, or influencer for the opportunity.

**Examples:**
- SVP Operations (likely owner of workflow modernization).
- Chief Medical Officer (likely approver for clinical workflow changes).
- CIO (technical implementation sponsor).
- External consultant/advisor (influencer, possible referral source).

**Lifecycle:** Identified (from research) → Researched (authority, interest, warm path) → Prospect (no contact) → Contacted → Conversation → Paused → Closed.

**Model:** Evolved `OiPerson` (add stakeholder type, research status, hypothesis about their interest/authority, and relationship journey).

**Operator action:** "Who should Todd contact first?" → Research → Rank by authority and warm path → Prepare outreach.

---

### 4. Relationship

**What it is:** Todd's existing or potential path to a stakeholder.

**Types:**
- **Cold:** No prior contact. Must generate outreach via research.
- **Warm referral:** Mutual connection. Referral email or LinkedIn intro.
- **Warm history:** Prior conversation or engagement. Continuation.

**Model:** New or extended field on `OiPerson`. Include relationship event log (how we met, prior interactions, referral source).

**Operator action:** "How do I reach this person?" → Warm path → Use referral → Send intro. No path → Generate research-based outreach.

---

### 5. Research Gap

**What it is:** A question that needs answering before Todd can confidently reach out.

**Examples:**
- "What is their current technology stack?" (to position interoperability/integration work).
- "Who recently joined as Chief Operations Officer?" (signals readiness for transformation).
- "What was their most recent funding round?" (indicates financial health and appetite for investment).
- "Who is their external auditor?" (may indicate governance/compliance focus).

**Lifecycle:** Open (identified, not yet researched) → Resolved (answered, added to opportunity context) → Dismissed (not researchable, not critical).

**Model:** Evolved `OiResearchGap`. Add confidence, source, date answered, and optional resolution.

**Operator action:** "What should we research before contacting?" → Identify gaps → Research → Close gaps → Mark opportunity "research_ready" → Prepare outreach.

---

### 6. Hypothesis

**What it is:** Todd's point of view about why this opportunity matters and why he is relevant.

**Two parts:**

**a) Problem hypothesis:** What is the underlying problem?
- Example: "Prior authorization denials are driven by inconsistent workflow and insufficient clinical review staffing. The company sees this as a workflow problem, not a platform problem."

**b) Fit hypothesis:** Why is Todd relevant?
- Example: "Todd has led healthcare workflow modernization in high-volume payer environments. He understands the intersection of operations, clinical judgment, and workflow design."

**Model:** Text fields on `OiOpportunity`. Operator-written (not AI-generated).

**Operator action:** "Why does this matter to Todd?" → Write hypothesis → Use in outreach preparation.

---

### 7. Engagement Type

**What it is:** The commercial vehicle Todd is proposing.

**Options:**
- **Diagnostic assessment** ($5K–$10K, 1 week): Operational Recovery Assessment or Prior Authorization Assessment.
- **Diagnostic engagement** ($15K–$30K, 2–3 weeks): Deeper assessment + recommendations.
- **Build sprint** ($45K–$150K, 6–12 weeks): Design and implement operational system.
- **Fractional advisor** ($12K–$25K/month, 3–12 months): Ongoing advisory and governance.
- **FTE/Senior leader** (salary + equity): Permanent role if hiring.

**Model:** New field on `OiOpportunity` or new `EngagementType` model linked to pursuit.

**Operator action:** "What offer should Todd propose?" → Match problem to engagement type → Estimate value → Include in outreach.

---

### 8. Outreach

**What it is:** The first communication Todd sends to a stakeholder.

**Types:**
- **Cold email:** Research-based introduction to a new contact.
- **Warm intro:** Referral introduction from mutual connection.
- **Continuation:** Follow-up with prior conversation.

**Components:**
- **To:** Email address (discovered or provided).
- **Subject:** Personalized based on company and role.
- **Draft:** Research-informed, not template boilerplate. Addresses specific problem + why Todd. CTA: conversation, not "let's sell."
- **Rationale:** Why this person, why now, what research informed the draft.

**Model:** New `Outreach` model linked to stakeholder, opportunity, and engagement type. Draft stored with date sent, response status, and follow-up plan.

**Operator action:** "Prepare and send first outreach." → System generates research summary + draft + talking points → Todd reviews → Sends → Records sent date and response.

---

### 9. Activity

**What it is:** A logged action or event in a pursuit.

**Examples:**
- Email sent (to, subject, date, open status).
- Meeting scheduled (date, attendees, topic).
- Conversation had (date, note, outcome, next step).
- Proposal sent (date, value, status).
- Assessment completed (date, findings, next step).
- Closed won (date, value, contract type).
- Closed lost (date, reason).

**Model:** New `Activity` model linked to stakeholder and opportunity. Immutable. Auditable.

**Operator action:** "Log what happened." → Automatically adds timestamps and context → Records in activity log → Updates pursuit status.

---

### 10. Engagement (outcome)

**What it is:** A paid engagement or active relationship resulting from a successful pursuit.

**Lifecycle:**
- Proposed (outreach sent, meeting scheduled).
- Conversation scheduled (meeting confirmed).
- Diagnostic completed (assessment delivered).
- Proposal sent (for build sprint or retainer).
- Contract signed (engagement active).
- Active (work in progress).
- Completed (deliverables finished).
- Result (outcome: knowledge transfer, system built, advisory ended, recovered, hired).

**Model:** New `Engagement` model linked to opportunity and stakeholder. Stores engagement type, expected value, actual value, contract date, completion date, notes.

**Operator action:** "Record what closed and what it was worth." → Tracks outcome → Closes pursuit → Feeds learning loop.

---

## End-to-End Commercial Workflow

### Daily workflow:

```
Morning: Open TIF → Dashboard shows top 5 priorities
  ├─ New signal from job posting (extracted, scored)
  ├─ High-fit opportunity that needs research
  ├─ Opportunity research-ready for outreach prep
  ├─ Stakeholder awaiting follow-up email
  ├─ Prior engagement completed (record outcome)

Pick highest priority:
  ├─ Research: Close top research gap
  ├─ Outreach: Review research-informed draft, send email
  ├─ Follow-up: Log conversation, schedule next touch
  ├─ Outcome: Record engagement result, update lesson

Record time, move to next.
```

### Weekly workflow:

```
Monday:
  ├─ Review new signals (job postings, news, referrals)
  ├─ Ingest high-priority opportunities
  ├─ Score and prioritize
  ├─ Identify research gaps for top 5

Tuesday–Thursday:
  ├─ Research top gaps (news, LinkedIn, SEC filings, etc.)
  ├─ Build account hypotheses for top opportunities
  ├─ Draft outreach for contact-ready opportunities
  ├─ Send 2–3 emails
  ├─ Follow up on 1–2 paused opportunities

Friday:
  ├─ Log any conversations that happened
  ├─ Update stakeholder and opportunity status
  ├─ Plan next week's priorities
  ├─ Review outcomes from active engagements
```

### Monthly workflow:

```
End of month:
  ├─ Close opportunities that are no longer viable
  ├─ Record engagement outcomes and revenue
  ├─ Analyze: which signals → engagements?
  ├─ Analyze: which outreach approaches worked?
  ├─ Identify pattern shifts (which problems are hot)
  ├─ Adjust engagement type mix based on outcomes
  ├─ Update capability profile based on recent wins
```

---

## Information Flow

```
Signals
  ├─ Job posting (pasted)
  ├─ News article (pasted, web-scraped, or manually linked)
  ├─ Regulatory filing (referenced)
  ├─ Referral (recorded)
  ├─ Personal observation (captured in inbox)
  │
  ↓ (Extract facts, identify opportunity fit, classify)
  │
Opportunities
  ├─ Organization + problem
  ├─ Fit score (problem/responsibility/transformation match)
  ├─ Research gaps (what we need to know)
  ├─ Hypothesis (why this matters to Todd)
  ├─ Value estimate (typical engagement size)
  │
  ├─ [Research → Close gaps → Mark research_ready]
  │
  ├─ [Identify stakeholders → Rank by authority + warm path]
  │
  ↓ (Match to Todd's proof, select engagement type, prepare outreach)
  │
Stakeholders
  ├─ Name, title, seniority
  ├─ Authority scores (budget, transformation, hiring)
  ├─ Relationship type (cold, warm referral, warm history)
  ├─ Research on this person (from LinkedIn, news, etc.)
  │
  ├─ [Send research-based outreach]
  │
  ↓ (Track sends, opens, responses)
  │
Activities
  ├─ Email sent (timestamp, draft, recipient, open status)
  ├─ Meeting scheduled (date, attendees, topic)
  ├─ Conversation logged (date, note, outcome)
  ├─ Proposal sent (value, status)
  ├─ Assessment completed (findings, recommendation)
  │
  ├─ [Monitor for response, schedule follow-up]
  │
  ↓ (If positive signal → move to engagement)
  │
Engagement
  ├─ Type (assessment, advisory, build sprint, retainer, FTE)
  ├─ Expected value
  ├─ Timeline
  ├─ Status (proposed, confirmed, active, completed)
  ├─ Actual outcome (value, notes, lessons)
  │
  ↓ (Record outcome, update learning model)
  │
Learnings
  ├─ Which signals predict engagements
  ├─ Which outreach approaches work
  ├─ Which problems are most common
  ├─ Which stakeholders/companies are best fit
  ├─ Which engagement types are most viable
  │
  ↓ (Feed back into future opportunity prioritization and capability profile)
```

---

## Human vs. Automation Responsibility

### Automation (deterministic, low-risk):

- **Extract facts from pasted text:** Job posting, announcement, financial filing → structured facts (company, title, problem, technology, compensation, etc.).
- **Calculate fit score:** Facts + capability profile → fit score + component breakdown.
- **Identify research gaps:** Based on extracted facts, suggest missing information needed.
- **Rank opportunities:** By fit score, recent signals, time to decision, expected value.
- **Suggest research:** "To contact this person, we should learn: current company, reporting line, recent projects."
- **Match to proof assets:** "The stated problem is workflow modernization; Todd's case study on PA modernization is relevant."
- **Draft outreach research summary:** Facts + hypothesis + relevant case study → "Here is what we know, here is why Todd matters, here is what you should say."
- **Surface changes:** "New job posting for this company," "New signal since last week," "Follow-up reminder due today."

### Operator judgment (required, not automatable):

- **Accept or reject signals:** Is this actually a possibility or noise?
- **Formulate problem hypothesis:** What is really happening underneath the stated problem?
- **Formulate fit hypothesis:** How exactly does Todd's experience apply?
- **Research execution:** Decide where to research (LinkedIn, SEC, news, mutual connections) and synthesize findings.
- **Stakeholder prioritization:** Which person to contact first? Which are blockers vs. influencers?
- **Engagement type selection:** Is this an assessment, advisory, or build? What price?
- **Outreach personalization:** Edit the draft; make it Todd's voice; add specific details.
- **Relationship building:** When to follow up? What to say? How to leverage warm paths?
- **Outcome learning:** Why did this work? Why didn't that? What should we change?

---

## Private vs. Public Capabilities

### Private (operator-only, no public disclosure):

- Opportunity identification and scoring.
- Research gaps and research progress.
- Stakeholder hypotheses and relationship strategies.
- Outreach drafts and activity logs.
- Pursuit status and next actions.
- Engagement outcomes and revenue.
- Operator learning and strategy adjustments.

### Public (on TKO website, shared in outreach):

- Case studies and proof of capability.
- Service offerings and engagement types.
- Assessment frameworks and methodology.
- Articles and authority content on Todd's focus areas.
- Social proof (testimonials, outcomes).
- Diagnostic tools or assessments.

### Semi-public (shareable on demand):

- Executive briefs or capability overviews (for warm prospects).
- Proposal templates (customized per engagement type).
- Assessment sample or methodology overview (to introduce approach).

---

## Operating Rhythm

### Daily (5–15 min):

- Open dashboard → see top 3 priorities.
- Check for responses to recent outreach.
- Log any conversations or interactions.
- Move highest-priority action forward.

### Weekly (1–2 hours):

- Review new signals (job postings, news, referrals).
- Ingest and score top opportunities.
- Research top gaps for next week's outreach.
- Plan outreach sequence.
- Follow up on stalled opportunities.

### Monthly (2–3 hours):

- Review and close completed opportunities.
- Record engagement outcomes.
- Analyze: which signals → outcomes?
- Adjust prioritization and strategy based on results.

### Quarterly (4 hours):

- Comprehensive pipeline review.
- Revenue and engagement pipeline analysis.
- Strategic adjustments (new focus areas, new engagement types, new markets).
- Update Todd's capability profile and positioning based on recent wins.

---

## Success Measures

### Revenue-focused (North Star):

- **Qualified opportunities identified:** Opportunities with score ≥ 60 and at least one contact-ready stakeholder.
- **Outreach sent:** Emails sent to contact-ready stakeholders (goal: 5–10/week).
- **Positive responses:** Conversations initiated (goal: 1–2/week → 4–8/month).
- **Diagnostic conversations:** Completed conversations leading to a proposal opportunity.
- **Proposals:** Diagnostics, assessments, or advisory engagements proposed (goal: 1–2/month).
- **Closed:** Engagements with contract signed (goal: 1–2/quarter).
- **Revenue:** Actual revenue from engagements (goal: $20K–$60K per engagement).

### Efficiency-focused:

- **Time from signal to outreach:** < 5 days for high-fit opportunities.
- **Time from outreach to conversation:** 2–4 weeks (typical sales cycle).
- **Conversation-to-proposal:** 2–4 weeks (diagnostic + findings).
- **Proposal-to-close:** 4–12 weeks (typical for advisory/build services).

### Quality-focused:

- **False positive rate:** % of opportunities that close/convert (goal: 10–20% for outreach, 30–50% for conversations).
- **Opportunity freshness:** % of top-20 opportunities with signal < 30 days old.
- **Research completeness:** Avg % of research gaps closed before outreach.
- **Stakeholder accuracy:** % of first contacts that are actually decision-makers or influencers.

### Learning-focused:

- **Engagement outcome attribution:** Can Todd trace engagement back to source signal?
- **Approach iteration:** % of outreach approaches tested and validated.
- **Capability alignment:** How often do closed engagements match stated capability profile?

---

## TIF as an Integrated System

### Content + Commercial Integration:

- **Opportunity identifies need for new content:** "Three companies this quarter asked about prior authorization workflow. We should write an assessment framework guide."
- **Content supports outreach:** "This prospect received our article on PA automation. It opened the conversation."
- **Proof assets inform opportunity selection:** "We have a strong PA case study; we should prioritize PA-related opportunities."
- **Outcome feeds content:** "We completed three PA assessments; let's extract lessons into an article."

### Capture + Opportunity Integration:

- **Inbox signal becomes opportunity:** "LinkedIn post about healthcare automation → captures observation → identifies company/problem → creates opportunity."
- **Opportunity research surfaces in next outreach:** "We captured 'company X just acquired Y.' When company X appears as opportunity, that signal appears in stakeholder research."
- **Activity feeds back to signals:** "We contacted person X who mentioned new budget approval. Capture that as signal for future priority."

---

## Staffing and Scaling

### Current state (Todd, solo):

- Signal detection: Manual (LinkedIn, news, referrals, direct).
- Ingestion: Manual (paste into TIF).
- Research: Manual (Todd researches gaps).
- Outreach: Prepared by Todd, sent by Todd.
- Follow-up: Todd's calendar.
- Outcome tracking: Manual (Todd records it).

### Near-term (if Todd hires VA or contracts analyst):

- Signal detection: Semi-automated (web scraping, alerts, RSS).
- Ingestion: VA ingests signals; Todd reviews.
- Research: VA researches gaps; Todd validates.
- Outreach: System generates draft; Todd edits and sends.
- Follow-up: System reminds; Todd decides timing.
- Outcome tracking: VA logs activities; Todd records outcomes.

### Future (if TKO becomes full operation):

- Signal detection: Automated (news aggregation, job board monitoring, regulatory feeds).
- Ingestion: Automated (with quality gates).
- Research: Automated research synthesis + operator validation.
- Outreach: Templates + operator customization (not fully automated).
- Follow-up: Automated reminders + operator judgment.
- Outcome tracking: Automated (CRM integration, email tracking, calendar sync).

---

## Why This Model Works for Todd

1. **Reduces friction:** Signal → Dashboard → Next action. No manual spreadsheets or switching between systems.
2. **Maximizes leverage:** Automation handles research, scoring, and tracking. Todd focuses on judgment and relationships.
3. **Prevents false positives:** Score + research + stakeholder ranking filter out noise before Todd wastes time.
4. **Preserves relationships:** Relationship tracking and outcome logging help Todd build real relationships, not blast outreach.
5. **Enables learning:** Outcome tracking and signal-to-conversion tracing let Todd improve his approach.
6. **Connects to credibility:** Todd's case studies and content are integrated, not separate marketing.
7. **Scales without overhead:** One operator can manage 20–30 active opportunities if the system is well-designed.

---

## Summary

TIF becomes Todd's commercial operating system: signal detection, opportunity ranking, research management, outreach preparation, activity logging, and outcome tracking—all integrated, all in one place, all designed for one smart operator with constrained time.

The system's job is to **turn Todd's expertise and judgment into repeatable deal flow.**
