# Orchestration prompt: ship the SidecarOS commercial surface (tko-site + BoundOS)

Copy everything below the line into a fresh Claude Code session (Opus) opened at `/Users/todd/dev/tko-site`, with `/Users/todd/dev/rachel-realestate-marketing` added as a second working directory.

---

You are the principal architect and implementer for TKO Solutions' commercial surface. Operate under `CLAUDE.md` in this repository: audit → recommend → implement, extension over rewrite, stop and propose phases if a change exceeds 10 modified files, 2 new directories, or 1 new service. Report outcomes faithfully; if a test fails or a step is skipped, say so.

## Read first, in this order

1. `docs/strategy/SIDECAR_GTM_PLAYBOOK_2026_10_18.md` — the plan you are executing. Sections 2 (content ownership), 3 (pricing), 5 (build list by repo), 11 (decisions D1–D8), 13 (Phase 1 record).
2. `docs/implementation/INFRASTRUCTURE_CONFIGURATION_ACTION_PLAN_2026_10_18.md` — Vercel, DNS, Resend, Neon findings and the ordered configuration steps.
3. `docs/implementation/TKO_RESEND_LEAD_WORKFLOW_2026_10_16.md` — the uncommitted lead-email package and its launch verification.
4. `docs/OPERATING-BOUNDARIES.md`, `docs/RELEASE_CHECKLIST.md`, `docs/legal/README.md`.
5. Memory: `~/.claude/projects/-Users-todd-dev-tko-site/memory/sidecar-gtm-and-three-property-model.md` and the memories it links.

Then run `git status` and `npm test && npm run lint && npm run build`. Expect a clean tree except the two uncommitted packages described below, and expect everything green (498 tests as of 2026-10-19).

## Hard constraints

- **Do not change any price, offer name, scope, or claim** in `src/lib/offers.ts`, `/products/ambient-crm`, `/private-client-os`, or the BoundOS `src/lib/boundos/content.ts` until Todd has recorded decision **D1** (the single pricing ladder) in this session. Ask for it explicitly; if he has not decided, do every other task and leave pricing untouched.
- Do not touch `/Users/todd/dev/rachel-realestate` (RachelOS). It is frozen except for its own plan; it is a source of proof, not a target.
- Do not modify scoring, queue ranking, lifecycle derivation, relationship derivation, or anything under `src/lib/opportunity-intelligence`.
- Never print, log, commit, or paste a secret. Secrets go into Vercel by Todd through the dashboard or `vercel env add` typed by him. You may list variable names; never pull values.
- Claim guardrails on every surface you touch: RachelOS is an independent single-operator proof; no guaranteed lead volume, conversion, revenue, savings, or compliance outcomes; a named person reviews every AI-assisted message; TKO is not a CRM vendor or SaaS company. Copy the guardrail paragraph from `src/lib/llms.ts` rather than rewriting it.
- Legal documents in `docs/legal/` are drafts for counsel. You may improve structure and consistency; you may not present them as reviewed or final.
- Preview deployments must never send real email: Resend variables go in Production only.
- Commit only when a work package is complete and verified, with Todd's confirmation per package. End commit messages with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Decisions to collect from Todd before the work that depends on them

Ask these up front in one message, then proceed with everything that does not depend on the answers:

- **D1** Pricing ladder: adopt the § 3 proposal ($500 assessment credited; Core $1,500 setup + $500/mo; Managed $2,500 setup + $1,200/mo; Build $7,500–$15,000 unchanged; Rachel Desk unpublished) or amend it.
- **D2** Contracting entity legal name and whether E&O/cyber insurance exists.
- **D4** Where BoundOS `/apply` leads land: TKO's `InboundLead` via `/api/contact` (recommended: one lead store, one Today view) or the marketing repo's own `/api/agent-lead`.
- **D5** BoundOS scope: Sidecar-only (hide Territory and Enterprise tiers) or keep three tiers.
- **D7** Order of the two commits (default: Resend workflow first, Phase 1 second).

## Work packages, in dependency order

For each package: state objective, files to modify, files to avoid, steps, test plan, acceptance criteria, rollback, regression risk; implement; verify; report; wait for Todd's go before committing.

### WP-1: Commit the two pending packages (no new code)

1. Stage only the Resend lead workflow files listed in `TKO_RESEND_LEAD_WORKFLOW_2026_10_16.md` § Files To Modify plus `.env.example`, `.gitignore`, `package.json`, `package-lock.json`, `scripts/record-walkthrough.ts`, `scripts/helpers/`. Commit.
2. Stage the Phase 1 files listed in the playbook § 13 plus `.claude/launch.json`, `docs/legal/`, `docs/strategy/SIDECAR_GTM_PLAYBOOK_2026_10_18.md`, `docs/implementation/INFRASTRUCTURE_CONFIGURATION_ACTION_PLAN_2026_10_18.md`, and this prompt. Commit.
3. Acceptance: `git status` clean; CI green on `main`; `node scripts/verify-public-site.mjs https://tko.solutions` reports zero failures after deploy; `/llms.txt`, `/terms`, `/robots.txt`, `/.well-known/security.txt` return 200 in production.

### WP-2: Production email goes live (guide Todd; do not perform secret steps yourself)

Walk Todd through configuration plan Phase A step by step, verifying each with read-only checks you can run: `dig` for DKIM, SPF, return-path MX and DMARC on `tko.solutions`; `vercel env ls production` for variable **names** only; Resend domain status by asking Todd to read the dashboard. Then he submits one labeled test inquiry from a controlled inbox; you confirm the Today row and ask him to confirm receipt, operator brief, Gmail copy, and the Resend log. Also have him remove the stale `ANTHROPIC_API_KEY` and `AI_*` variables and rotate the key at Anthropic. Record the outcome in `docs/CURRENT_STATE.md` under a dated entry.

### WP-3: tko-site Phase 2 (after D1)

- Single pricing ladder in `src/lib/offers.ts` (extend the registry; add a `sidecar` entry group rather than scattering strings), `/products/ambient-crm` rendered from it, one cross-link sentence to the BoundOS site on that page and on `/private-client-os`.
- Intake: in the managed-follow-up variant of `src/components/site/diagnostic-form.tsx` and `src/app/contact/actions.ts`, add CRM, approximate contact count, consent-evidence description, and "who makes the calls and logs dispositions". Carry the fields into the operator brief in `src/lib/leads/email-templates.ts`. Extend existing tests; add none that mock less than the current ones.
- Add a **commercial-consistency test**: render the services index, each offer page, `/products/ambient-crm`, the contact page with each `?offer=` value, and both email templates; assert every dollar string present comes from `offers.ts`.
- Add the discovery-call section with the six qualification questions (playbook § 4.1) to `docs/COMMERCIAL_OUTREACH_PLAYBOOK.md`.
- Budget: ≤10 files modified. If more, split.

### WP-4: BoundOS site Phase 2 (after D4, D5; second working directory)

- Re-link the repo to the Vercel project that serves boundos.com (`vercel link`), fix `.vercel/project.json`.
- Add `robots.ts`, `llms.txt` route (mirror the tko-site implementation; byline "by TKO Solutions"), `/privacy`, `/terms`, `public/.well-known/security.txt`, sitemap entries. Name the actual providers that repo uses (`/api/agent-lead`, Resend, Turnstile, optional Neon).
- Pricing page rendered from the single ladder; hide or remove tiers per D5.
- `/apply`: add the six qualification fields; route leads per D4. If D4 = TKO, post to `https://tko.solutions/api/contact` with `inquiryType: "BOUNDOS_APPLY"` and confirm the field contract against `src/app/api/contact/route.ts` in tko-site before changing anything.
- `/docs`: publish client-facing versions of `docs/legal/CLIENT_ONBOARDING_CHECKLIST.md`, `SUBPROCESSORS.md`, and the pilot-1 column of `SECURITY_AND_VENDOR_DDQ.md`. Keep the sources in tko-site; do not fork the text, link back.
- Footer: "by TKO Solutions" linking to tko.solutions founder page and case study; the guardrail paragraph.
- Verify with that repo's own tests and a crawl equivalent to `verify-public-site.mjs` (port the script if none exists).

### WP-5: QA hardening (any time after WP-1)

- CI job that builds, starts the site with a placeholder `DATABASE_URL`, and runs `scripts/verify-public-site.mjs`.
- Playwright smoke (already a dev dependency): contact form validation path, `/terms` renders, `/llms.txt` is text/plain, mobile nav opens. Add `playwright.config.ts` and `e2e/`; keep it under five minutes.
- `@axe-core/playwright` on the ten pages in `publicNavigation` plus `/contact`, `/privacy`, `/terms`.

### WP-6: External registrations (draft the messages; Todd sends)

Draft, for Todd to send himself: Follow Up Boss `X-System` registration details; Wealthbox partnerships inquiry (OAuth client, partner program); Redtail partner API key request. Put the drafts in `content/outreach/partner-requests-2026-10.md`. Do not send anything.

## Reporting

After each package, report in this shape: what changed (files), what was verified (commands and results, with numbers), what is left out and why, the rollback, and the next decision needed. Lead with outcome. If anything is blocked on Todd, say exactly what you need from him in one sentence.

Do not start WP-3 pricing changes, WP-4 pricing changes, or any commit without Todd's explicit go in this session.
