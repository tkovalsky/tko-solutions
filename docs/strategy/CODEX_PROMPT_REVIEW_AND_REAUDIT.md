# Codex Prompt: RachelOS Re-Audit and v1 Site Review

Run this in Codex on the machine that has both repositories. It does two things:

1. Re-audits RachelOS **from scratch**, so TKO stops relying on the July 2026 audit.
2. Reviews everything that changed in the v1 repositioning
   ([PR #5](https://github.com/tkovalsky/tko-solutions/pull/5)) against that fresh evidence.

Paste everything below the line.

---

You are an independent auditor and reviewer for TKO Solutions. Be skeptical: your job is to find
what is wrong, stale, unsupported, or weak, not to confirm the work.

**Context.** TKO repositioned on 2026-09-27/28 from healthcare advisory to "business operating
systems for growing companies" (~$5M+ revenue). The core promise: find the constraint costing the
business the most, build the missing layer between their tools and their team, and prove it
changed the numbers. RachelOS is the flagship proof: a production system Todd Kovalsky built and
runs for a South Florida real-estate business where "the person was the operating system." The
public site was rebuilt around this in PR #5, which is now merged to `main`. The strategy is in
`docs/strategy/TKO_REPOSITIONING_DECISION_PACK_2026_09_27.md`.

**Repositories**

- RachelOS: `/Users/todd/dev/rachel-realestate`. Read-only.
- TKO site: `/Users/todd/dev/tko-site`. Write only where Phase 3 says.

## Phase 1: Re-audit RachelOS from scratch

Treat every existing TKO evidence document as **historical and untrusted**. That includes
`asset-production/rachelos-delivery-model/*`, `content/proof/rachelos/*`, and
`09_TODD_OPERATING_PATTERN_ANALYSIS.md`. Use them only to see what used to be claimed. Derive
everything from the RachelOS repository, its git history, and the latest production snapshot
or state documents it contains.

Produce:

1. **Scale facts as of today:** commits and date range, authors, DEC entries, migrations, test
   files and their status (including any red suites), operator screens, and API routes.
2. **Production facts (aggregates only):** leads (total and last 30/90 days), leads never
   touched, median time to first response, reply rate by first-touch channel (call, text,
   email) with sample sizes, open versus completed queue actions, human-approved sends, and
   daily-run reliability (runs, misses, last miss).
3. **Capability status:** grade each capability `Implemented`, `Activated`, `Validated`, or
   `Dormant`: canonical queue, daily action email, relationship memory, human approval,
   AI-assisted drafting, inbound email capture, content publishing, zero-lead alerting,
   attribution. Anything the site describes as running must be at least `Activated`.
4. **Funnel:** lead → response → qualification → conversation → appointment → representation →
   transaction → referral/repeat. For each stage give counts where the records support them,
   marked `Verified`, `Partial`, or `Unknown`. Say explicitly whether an attribution chain from
   system activity to closed transactions exists today.
5. **Decision ledger:** the 12–15 decisions that best show judgment, prioritizing reversals
   where evidence overturned a belief. For each: date, DEC id, what was believed, what the
   evidence showed, what changed, and what getting it wrong would cost a normal business.
   Verify, rather than assume, these candidates from the old audit:
   - automated AI follow-up switched off after factual errors;
   - an interface reversed after one day;
   - the shift away from email-first outreach;
   - five lifecycle fields consolidated into one;
   - a scoring column that was never written;
   - inbound email built but never activated.
6. **Constraint timeline:** dated shifts (foundation → visibility → follow-up → conversion),
   and the constraint that binds **today**, with evidence.
7. **Claim register:** a single table of every publishable claim, with its class, citation, and
   "safe wording." This becomes the new authority, replacing
   `asset-production/rachelos-delivery-model/07_CLAIM_AUDIT.md`.

## Phase 2: Review the v1 site against the fresh evidence

In `tko-site`, review what PR #5 changed (`git log` and `git diff` from `1eb49d0` to the merge),
plus the live pages: `/`, `/services`, the three `/services/*` pages, `/selected-work`,
`/selected-work/from-crm-to-operating-system`, `/founder`, `/contact`, `/insights`, the footer,
the metadata, the JSON-LD, and `public/og-tko-3.png`.

1. **Claims.** List every factual claim on every public page, including numbers, "runs daily,"
   "still run it," "a person approves anything that goes out," career facts, and prices. Check
   each against the Phase 1 register and mark it `OK`, `Stale`, `Unsupported`, or `Wrong`, with
   corrected wording.
2. **The unpublished guide.** `src/content/insights/why-leads-fall-through-the-cracks.md` is
   blocked until its figures are re-verified. Re-check every number and statement, and produce
   the corrected text.
3. **Positioning and conversion.** Does each page answer, in order: do you understand my
   problem, have you solved something similar, what do you do, what changes, what's the first
   step, why trust you, what next? Flag anything still reading as healthcare, enterprise,
   consulting jargon, AI hype, or "real-estate CRM company." Check that prices and offer names
   are identical everywhere, including in `src/lib/offers.ts`, page copy, and JSON-LD.
4. **SEO and technical.** Check titles and descriptions (length, uniqueness), canonicals,
   `sitemap.xml`, `robots.txt`, JSON-LD validity, redirects (no chains or loops, and none pointing
   at a missing page), broken internal links, image alt text, heading order, and mobile layout
   at 390px. Run `npm run lint`, `npm test`, and
   `DATABASE_URL=postgresql://u:p@localhost:5432/db npm run build`. The baseline is 401 tests
   passing.
5. **Risk.** Look for personal data in screenshots or copy, anything that implies employer or
   client endorsement, anything that names Rachel or her business beyond "RachelOS" (her written
   permission is still pending), and anything that conflicts with Todd holding a full-time job
   (for example, implying unlimited availability).

## Phase 3: Output

1. Write `content/proof/rachelos/AUDIT_<YYYY-MM-DD>.md` with Phase 1 sections 1–7.
2. Write `docs/strategy/V1_REVIEW_<YYYY-MM-DD>.md` with:
   - findings ranked `Blocker` / `Should fix` / `Nit`, each with `file:line`, the problem, the
     evidence, and exact replacement text;
   - a **top-5 hooks** section: the five most compelling verified stories for guides and outreach.
3. On a new branch `codex/v1-review-fixes` (never `main`), apply only the Blocker and Should-fix
   copy and claim corrections. Re-run lint, tests, and build, and commit with a message listing
   each fix. Do not publish the guide; leave it `in_review` with corrected figures.

## Rules (non-negotiable)

- Every claim is labeled `Verified` (with a cited file, DEC id, commit, or record), `Inference`,
  `Estimate` (with bounds), or `Unknown`. If you can't cite it, it isn't Verified.
- Aggregates only. No lead names, emails, phone numbers, addresses, message contents, secrets,
  or environment values.
- No revenue, commission, ROI, or conversion-lift claims without a complete attribution chain.
- Small samples carry their n. No "10x" or productivity multiples.
- Do not modify RachelOS. In `tko-site`, do not touch scoring, queue ranking, lifecycle
  derivation, TIF, Opportunity Intelligence, Prisma schema, or migrations.
- Prefer deleting a claim to weakening it into vagueness.
