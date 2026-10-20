# Codex Prompt: RachelOS Re-Audit and Site Review

Paste everything below the line into Codex, on the machine that has both repositories.
It reviews the site as it stands today. It does not rely on git diffs or commit history.

---

You are an independent, skeptical auditor for TKO Solutions. Your job is to find what is wrong, stale, unsupported, or weak, not to confirm the work.

CONTEXT
TKO Solutions is Todd Kovalsky's principal-led practice. It currently sells along two lanes:
1. Healthcare: mapping obligations to workflows, owners, controls, and evidence.
2. Growing businesses: owned demand and follow-up systems with human-reviewed AI drafting.

Learn the current positioning, offers, and prices from the site itself. Start with src/lib/site.ts, src/lib/offers.ts, and the homepage. Don't assume them.

RachelOS is the main proof: a production system Todd built and runs for an independent South Florida real-estate operation.

REPOSITORIES
- RachelOS: /Users/todd/dev/rachel-realestate (read-only)
- TKO site: /Users/todd/dev/tko-site

PART 1: RE-AUDIT RACHELOS FROM SCRATCH
Treat every existing TKO evidence document as outdated history, not truth. That includes everything in asset-production/rachelos-delivery-model/, everything in content/proof/rachelos/, and 09_TODD_OPERATING_PATTERN_ANALYSIS.md. Rebuild the evidence from the RachelOS code, its history, and its latest production records. Report:

1. Scale today: commits and date range, recorded decisions (DEC entries), migrations, test files and whether they pass, and operator screens.
2. Production numbers (aggregates only):
   - leads, in total and for the last 30 and 90 days
   - leads never contacted
   - time to first response
   - reply rate by first-contact channel (call, text, email), with sample sizes
   - open versus completed queue actions
   - human-approved messages sent
   - how reliably the daily run happens, including misses
3. What is actually switched on. Grade each feature Built, Switched on, Proven, or Dormant: the daily queue, the daily email, relationship memory, human approval, AI drafting, email-reply capture, content publishing, the no-leads alert, and revenue attribution.
4. The funnel: lead → reply → qualified → conversation → appointment → representation → closed deal → referral. Give counts where the records support them, and say plainly whether anything connects system activity to closed deals.
5. The 12–15 best decision stories, especially reversals where evidence overturned a belief. For each: when it happened, what was believed, what the evidence showed, what changed, and what getting it wrong would cost a normal business. Confirm or reject these candidates:
   - AI follow-up turned off after it stated false facts
   - a screen reversed after one day
   - the move away from email-first outreach
   - five status fields merged into one
   - a score that was never actually saved
   - email-reply capture built but never live
6. Which constraint was solved when, and which constraint limits the business today.
7. A claim list: every statement TKO could safely publish, with its source and safe wording.

PART 2: REVIEW THE CURRENT WEBSITE
Review every public page as it exists now:
- /
- /services and each /services/[slug] page
- /healthcare/impact-assessment and /healthcare/readiness-preview
- /private-client-os
- /products/ambient-crm
- /selected-work and each case study
- /founder, /contact, /privacy
- /insights and every published guide in src/content/insights/
- the header, footer, page titles, descriptions, structured data, and share image

1. List every factual claim, including numbers, dates, "runs daily," "I built and run," "a person approves everything that goes out," career facts, and prices. Mark each OK, Stale, Unsupported, or Wrong, and give corrected wording. One known stale item to confirm and fix: why-leads-fall-through-the-cracks.md says "Seventy-seven messages went out that way by July."
2. Check every published guide's figures and named sources against the Part 1 claim list.
3. Does each page quickly answer the buyer's questions: do you understand my problem, have you solved something like it, what do you do, what changes, what's the first step, why trust you, what should I do next?
4. Are the two lanes clearly separated, so a healthcare buyer and a growing-business owner each find their own path without confusion?
5. Flag consulting jargon, AI hype, overlapping product names, and anything that makes TKO look like a software company. Make sure each offer's name, price, and duration match everywhere: offers.ts, page copy, structured data, and guides.
6. Technical basics: page titles and descriptions (length and uniqueness), sitemap, redirects (no chains, loops, or dead destinations), broken internal links, image descriptions, heading order, and the phone layout at 390px wide. Run:
   npm run lint
   npm test
   DATABASE_URL=postgresql://u:p@localhost:5432/db npm run build
   The current baseline is 450 tests passing.
7. Risks: any personal data in screenshots or text; anything implying an employer or client endorses TKO; any mention of Rachel or her business beyond the name "RachelOS" without her written permission; anything implying unlimited availability (Todd has a full-time job).

PART 3: DELIVERABLES
1. Write content/proof/rachelos/AUDIT_<today's date>.md with the Part 1 results.
2. Write docs/strategy/SITE_REVIEW_<today's date>.md with:
   - findings ranked Must fix / Should fix / Minor, each with the file, the problem, the evidence, and the exact replacement text
   - the five most compelling verified stories, for guides and outreach
3. Create a new branch named codex/site-review-fixes, never main. Apply only the Must-fix and Should-fix wording corrections. Re-run lint, tests, and build, then commit.

RULES
- Label every claim Verified (with its source), Inference, Estimate (with a range), or Unknown. If you can't point to the source, it isn't Verified.
- Aggregates only. No names, emails, phone numbers, addresses, message contents, passwords, or keys.
- No revenue, ROI, or conversion-lift claims unless the records connect system activity to closed deals.
- Always give the sample size for small numbers. No "10x"-style claims.
- Do not change RachelOS. In the TKO site, do not touch scoring, queue ranking, lifecycle logic, TIF, Opportunity Intelligence, the database schema, or migrations.
- When a claim can't be supported, delete it rather than making it vaguer.
