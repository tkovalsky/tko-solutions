# Codex Prompt: RachelOS Evidence Refresh

Run this in Codex on the machine that has both repositories checked out. It refreshes the
RachelOS evidence (last audited 2026-07-24) so TKO guides and the case study can cite current,
verified facts. Paste everything below the line.

---

You are an evidence analyst for TKO Solutions. TKO builds "business operating systems" for
growing companies (~$5M+ revenue): it finds the constraint costing the business the most, builds
the missing layer between their tools and their team, and proves it changed the numbers. RachelOS
is TKO's flagship proof: a production system Todd Kovalsky designed, built, and operates for a
South Florida real-estate business where "the person was the operating system."

Your job is to extract **verified evidence and decision stories** from the RachelOS repository
that would make the owner of a $10M business think: *this person understands why my business
isn't working, and has actually fixed it somewhere.*

## Repositories

- RachelOS: `/Users/todd/dev/rachel-realestate` (source of evidence, **read-only**)
- TKO site: `/Users/todd/dev/tko-site` (write your output here only)

Start by reading, in RachelOS: `CURRENT_STATE.md`, `docs/DECISIONS.md` (the DEC-* log), any
audits and funnel studies, `vercel.json`, the migrations directory, and `src/lib/leads/`. In the
TKO site, read `asset-production/rachelos-delivery-model/07_CLAIM_AUDIT.md`,
`10_FAILED_BETS_AND_LESSONS.md`, and `09_TODD_OPERATING_PATTERN_ANALYSIS.md`. Those are the July
baseline you are updating.

## Tasks

1. **Refresh the verified numbers as of today.** Commits (and the date range), DEC entries,
   migrations, test files, and the daily cron record (runs and misses). From the latest
   production snapshot, use aggregates only: leads (total and last 30 days), leads never
   touched, median time to first response, response rate by first-touch channel (call, text,
   email) **with sample sizes**, open versus completed canonical actions, and approved sends.
   Give the before/after against July wherever both exist.
2. **Funnel stage counts.** Lead → response → qualification → conversation → appointment →
   representation → transaction → referral/repeat. Report whatever the records support, and
   mark each stage `Verified`, `Partial`, or `Unknown`. State plainly whether an attribution
   chain from system activity to transactions now exists.
3. **Decision ledger (the most important task).** Find the 12–15 decisions that best show
   judgment, prioritizing **reversals**, where evidence overturned a belief. Include at least:
   autonomous AI nurture turned off after factual errors; the interface reversed after one day
   because it made the AI look like the actor; the shift from email-first to making calls and
   texts easier; five lifecycle fields consolidated into one; the scoring column that was never
   written; and "implemented ≠ activated" (inbound email). For each, give: date, DEC id,
   *what we believed*, *what the evidence showed*, *what changed*, and *what it would cost a
   normal business to get this wrong*.
4. **Constraint timeline.** Date each shift (foundation → visibility → follow-up → conversion)
   using commits and DEC entries. Name the constraint that binds **today**, with evidence.
5. **Owner-language translation.** Rewrite every finding as one sentence a non-technical owner
   would recognize. Example: "We had five different fields for 'where is this lead?' Your CRM
   probably does too."
6. **Fuel for guide #1, "Why Leads Fall Through the Cracks."** Cover five leak points: first
   response, no owner, unclear status, memory-based follow-up, and handoffs. Give each one
   RachelOS evidence (a number or a decision), plus the self-audit question an owner could ask
   of their own CRM.

## Rules (non-negotiable)

- Label every claim `Verified` (cite a file, DEC id, commit, or query), `Inference`, `Estimate`
  (with a bound), or `Unknown`. If you can't cite it, it's not Verified.
- Aggregates only. No lead names, emails, phone numbers, addresses, or message contents. No
  secrets or environment values.
- No revenue, commission, ROI, or conversion-lift claims unless a complete attribution chain
  exists. Say so explicitly either way.
- Small samples are labeled with their n. No "10x" claims or productivity multiples.
- Do not modify any application code in either repository.

## Output

Write exactly one file: `/Users/todd/dev/tko-site/content/proof/rachelos/EVIDENCE_REFRESH_<YYYY-MM-DD>.md`,
with sections 1–6 in the order above. Then add:

- **Top 5 hooks:** the five most compelling verified facts or stories, each as a headline plus
  two sentences.
- **Claim changes since July:** what's newly publishable, and what is no longer true.

Keep it tight. Tables beat prose.
