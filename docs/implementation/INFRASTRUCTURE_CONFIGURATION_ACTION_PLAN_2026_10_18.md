# Infrastructure and configuration action plan: tko.solutions, BoundOS, RachelOS

Prepared October 18, 2026. Read-only inspection of the Vercel account, DNS, and repositories; **nothing was changed.** Tags: **[V]** verified today · **[A]** assumption, verify at the provider · **[D]** Todd's decision.

Companion: `docs/strategy/SIDECAR_GTM_PLAYBOOK_2026_10_18.md` (decisions D1–D7), `docs/implementation/TKO_RESEND_LEAD_WORKFLOW_2026_10_16.md` (the step-by-step Resend, Cloudflare, Zoho walkthrough; not repeated here).

---

## 1. What exists today [V]

### Vercel (one team: "Todd Kovalsky's projects", `team_HsVPkp5OV72DjU2GL0mAhuSj`)

| Project | Repository | Domain | Notes |
|---|---|---|---|
| `tko-solutions` | `tko-site` | tko.solutions | Linked locally. Production env has `DATABASE_URL`, `TIF_ACCESS_KEY`, `ANTHROPIC_API_KEY`, `AI_PROVIDER`, `AI_MODEL_*`, `AI_MAX_TOKENS_*`, `AI_ENRICHMENT_MODEL`, `AI_DRAFT_TIMEOUT_MS`. **No `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, or `LEAD_NOTIFY_EMAIL`.** |
| `rachel-site-marketing` | `rachel-realestate-marketing` | boundos.com (presumed) | The repo's local `.vercel/project.json` points at a project id that is **not in the account's project list** (stale link). |
| `rachel-site` | `rachel-realestate` | racheldelray.com | Rachel's production. Out of scope here. |
| `cms` | RachelOS Payload CMS | — | Out of scope. |
| `property-manager`, `cre-intelligence`, `tko-healthcare` | dormant / unknown | — | `tko-healthcare` is not referenced anywhere in `tko-site`; candidates for pause or deletion. |

Domains on the account: tko.solutions, boundos.com, racheldelray.com, atlantichomewatch.com, all with Cloudflare nameservers.

Team plan (Hobby vs Pro) could not be read through the tools available. **Vercel's Hobby plan prohibits commercial use**; all three live sites are commercial, so the team must be on Pro. Confirm in the dashboard (Settings → Billing).

### DNS

| Domain | MX | SPF | DMARC | Resend records |
|---|---|---|---|---|
| tko.solutions | Zoho (mx, mx2, mx3) | `v=spf1 include:zohomail.com ~all` | **none** | **none** (no `resend._domainkey`, no `send` subdomain) |
| boundos.com | Titan (mx1, mx2) | `v=spf1 include:spf.titan.email include:amazonses.com ~all` | **none** | n/a; `amazonses.com` suggests a prior sender (Titan or an older setup) |

### Consequences

1. **Lead notifications and prospect receipts are skipped in production.** The notifier fails closed on missing env (`skipped: missing_env`), so leads are saved to Neon and visible in `/tif/oi/today`, but Todd gets no email and the prospect gets no receipt. Every production inquiry since the Resend variables were never set has depended on Todd opening Today.
2. **The `ANTHROPIC_API_KEY` and `AI_*` production variables are unused.** No file under `src/` or `scripts/` reads them (searched today). They are stale from the paused POIS specs and should be removed to shrink the secret surface.
3. **Neither domain has DMARC.** Without it, spoofed mail from either domain is not policed and some receivers downgrade deliverability.
4. **The BoundOS repo cannot deploy from the CLI** until re-linked to `rachel-site-marketing` (or whatever project actually serves boundos.com).

---

## 2. Separate accounts or not? [D8]

The question: spin tko.solutions and BoundOS out onto their own Neon and Vercel free tiers, or leave them beside RachelOS?

**Short answer:** free tiers are not an option for any of the three (commercial use), separation by *account* buys billing clarity and nothing else, and separation by *project/database* is what matters and already exists. Spend the effort on the gaps in § 1, not on moving accounts.

| Concern | Same account, separate projects (today) | Separate Vercel team + Neon org for TKO |
|---|---|---|
| Cost | One Pro seat ($20/mo [A]); tko.solutions and BoundOS are near-static and add pennies. Neon: tko-site's one small table scales to zero. | A second Pro seat (+$20/mo) and a second Neon plan; Neon Free (0.5 GB, limited compute hours, limited projects [A]) would hold tko-site's database but not Sidecar's cell-per-client model. |
| Blast radius | Already isolated: separate Vercel projects, separate Neon databases, separate env. A RachelOS incident cannot reach tko-site data. | Same. |
| Ownership and books | TKO Solutions owns RachelOS/BoundOS (Todd, Oct 18), so one owner, one account is coherent. Cost attribution via per-project usage in the dashboard. | Cleaner if Rachel's business is a separate legal entity that should pay for racheldelray.com itself. Ask the accountant, not the architecture. |
| Client due diligence (RIA DDQ) | Asked "is client data segregated?": yes, per database and per project. Account sharing with an unrelated real-estate site is not a finding. | No difference to a DDQ. |
| Operational load | One login, one billing, one place to look. | Two of everything; stale links like the BoundOS one multiply. |

**Recommendation.** Keep one Vercel team (confirm Pro) and one Neon organization. Keep three separate Vercel projects and three separate Neon projects. Revisit only if (a) the accountant wants Rachel's hosting invoiced to her entity, or (b) Sidecar reaches the plan's cell-per-client phase and needs the Neon Launch project count, at which point Sidecar gets **its own** Neon org so client cells never share a billing or admin boundary with RachelOS.

One hard rule regardless: **never share a database, a Resend sending identity, or an API key between tko-site, BoundOS, and RachelOS.** Today that rule holds.

---

## 3. Resend: free tier and domains

Resend Free [A, verify at resend.com/pricing]: roughly 3,000 emails/month, 100/day, **one verified sending domain**, no dedicated IP. Pro (~$20/month) raises the limits and allows multiple domains.

Volume: website inquiries are tens per month, two emails each. Free is ample for tko.solutions alone.

The constraint is the **one-domain limit**. Options:

| Option | How | Verdict |
|---|---|---|
| A. One Resend account, domain `tko.solutions`, both sites send from it | tko.solutions receipts from `todd@tko.solutions`; BoundOS lead alerts from `sidecar@tko.solutions` or `leads@tko.solutions` with Reply-To the prospect | **Recommended for now.** Stays on Free; consistent with "by TKO Solutions"; one DKIM setup. |
| B. Resend Pro, verify both `tko.solutions` and `boundos.com` | BoundOS sends as `@boundos.com` | Only when a client or a marketplace listing requires product-domain sender identity. |
| C. Separate Resend accounts per site | Two free accounts | Two keys, two DNS setups, two logs; nothing gained. |

RachelOS uses its own Resend configuration for racheldelray.com; leave it alone.

Sidecar clients (plan v2, CSV-only clients who need sending) would need a delegated subdomain per client under Pro. Not in the first six months.

---

## 4. Action plan (ordered; each step says who and where)

### Phase A: make the inquiry loop real (this week)

| # | Action | Where | Owner | Done when |
|---|---|---|---|---|
| A1 | Confirm the Vercel team is on **Pro** | Vercel → Settings → Billing | Todd | Plan name recorded in this doc |
| A2 | Add sending domain `tko.solutions` in Resend (sending only, inbound off); copy the exact DKIM TXT, SPF TXT and MX for the `send` subdomain | resend.com/domains | Todd | Records displayed |
| A3 | Add those records in Cloudflare, DNS-only (no proxy); keep Zoho MX and root SPF untouched | Cloudflare → tko.solutions → DNS | Todd | Resend shows **Verified** |
| A4 | Add DMARC at `_dmarc.tko.solutions`: `v=DMARC1; p=none; rua=mailto:todd@tko.solutions; fo=1` (monitor for two weeks, then `p=quarantine`) | Cloudflare | Todd | Record resolves |
| A5 | Create a **sending-only** Resend API key named `tko-solutions-production` | Resend → API Keys | Todd | Key stored only in Vercel |
| A6 | Set production env: `RESEND_API_KEY` (secret), `RESEND_FROM_EMAIL` = `Todd Kovalsky \| TKO Solutions <todd@tko.solutions>`, `LEAD_NOTIFY_EMAIL` = `todd@tko.solutions`. **Do not set them in Preview**, so preview deployments never send real mail | Vercel → tko-solutions → Settings → Environment Variables | Todd | Three vars present in Production only |
| A7 | Remove stale `ANTHROPIC_API_KEY`, `AI_PROVIDER`, `AI_MODEL_QUALITY`, `AI_MODEL_FAST`, `AI_ENRICHMENT_MODEL`, `AI_MAX_TOKENS_QUALITY`, `AI_MAX_TOKENS_FAST`, `AI_DRAFT_TIMEOUT_MS` from tko-solutions (no code reads them). Rotate the Anthropic key at the provider if it was ever shared | Vercel env; console.anthropic.com | Todd | Env list shows only `DATABASE_URL`, `TIF_ACCESS_KEY`, Resend vars, `NEXT_PUBLIC_*` |
| A8 | Zoho → forward todd@tko.solutions to the personal Gmail, keep original; verify with a real test message from a third inbox | Zoho Mail settings | Todd | Test message arrives in both |
| A9 | Stage and deploy the Resend lead workflow commit (already passing tests); then submit one **labeled** test inquiry from a controlled inbox; check receipt, operator brief, Gmail copy, Today row, and Resend log | GitHub → Vercel | Todd + Claude | All five observed |

### Phase B: discovery and policy surface (with Phase 1 of the playbook)

| # | Action | Where | Done when |
|---|---|---|---|
| B1 | Deploy Phase 1 (robots, llms.txt, terms, privacy, security.txt) | GitHub → Vercel | `https://tko.solutions/llms.txt` and `/terms` return 200; verifier passes against production |
| B2 | Google Search Console: verify via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (already wired in `layout.tsx`); submit `/sitemap.xml` | search.google.com/search-console; Vercel env (Production + Preview is fine, it is public) | Property verified, sitemap read |
| B3 | Bing Webmaster Tools: same via `NEXT_PUBLIC_BING_SITE_VERIFICATION` | bing.com/webmasters | Verified |
| B4 | Optional: `NEXT_PUBLIC_SCHEDULING_URL` (Cal.com or Google Calendar booking page) so `/contact` shows "Pick a time" instead of the mailto fallback | Vercel env | Button appears |
| B5 | GitHub: branch protection on `main` requiring the CI workflow; enable Dependabot security updates | github.com repo settings | Protected |

### Phase C: BoundOS site hygiene (before any marketplace or RIA conversation)

| # | Action | Where | Done when |
|---|---|---|---|
| C1 | Re-link the repo: `vercel link` to the project that serves boundos.com; fix `.vercel/project.json` (currently stale) | `rachel-realestate-marketing` | `vercel env ls` works |
| C2 | Decide the lead destination (playbook D4). If leads go to TKO's `InboundLead`, point `/apply` at tko.solutions' `/api/contact` with a `source` of `BOUNDOS_APPLY`; else configure BoundOS's own `RESEND_API_KEY` (same account, § 3 option A), `MAIL_FROM` = `SidecarOS by TKO Solutions <sidecar@tko.solutions>`, `LEAD_EMAIL_TO` = `todd@tko.solutions`, and leave `USE_NEON=false` | Vercel → rachel-site-marketing env | A test submission reaches Todd |
| C3 | Turnstile: confirm `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` are set for boundos.com | Cloudflare Turnstile; Vercel env | Form passes challenge |
| C4 | DMARC for boundos.com (`p=none` monitor); confirm whether the `amazonses.com` SPF include is still needed (Titan or legacy); remove if not | Cloudflare | Record resolves; SPF has no unused includes |
| C5 | Add privacy, terms, robots, llms.txt, security.txt to the BoundOS site (playbook § 5.2) | repo | Pages live |
| C6 | Pause or delete `property-manager`, `cre-intelligence`, and (after confirming it is unused) `tko-healthcare` Vercel projects | Vercel | Project list shows only live sites |

### Phase D: Neon

| # | Action | Where | Done when |
|---|---|---|---|
| D1 | Confirm tko-site's database is its own Neon **project** (not a branch of RachelOS's) and that `DATABASE_URL` uses the pooled connection string | Neon console | Project listed separately |
| D2 | Confirm the plan's point-in-time-restore window and that it covers the `InboundLead` table's risk appetite (default on Free is short [A]) | Neon console → project settings | Window recorded |
| D3 | Check `npm run tif:migrate:status` against production (read-only) so the repo's "production migration state unverified" note in `docs/CURRENT_STATE.md` can be closed | local, with the production URL read from Vercel (`vercel env pull` to an ignored file, then delete) | Status recorded in `CURRENT_STATE.md` |
| D4 | When Sidecar reaches client 2: create a **separate Neon organization** for Sidecar client cells on the Launch plan, per the plan's architecture; never place client cells in the RachelOS or tko-site org | Neon | Org exists before the first client database |

### Phase E: external registrations (lead time is weeks; start early)

| # | Action | Where | Done when |
|---|---|---|---|
| E1 | Follow Up Boss: register the `X-System` / `X-System-Key` identifiers (self-serve form) | docs.followupboss.com → Identification | Key received |
| E2 | Wealthbox: email the partnerships team about the Integration Partner Program and OAuth client registration (playbook D6) | wealthbox.com/integrations | Reply with next steps |
| E3 | Redtail: request a partner API key via Redtail partner support with the account username and integration purpose; expect a developer agreement (playbook D6) | Redtail support | Key or agreement received |
| E4 | Stripe account for the $500 assessment and later subscriptions (playbook D2 names the entity first) | stripe.com | Test-mode charge works |
| E5 | E&O and cyber insurance quotes | broker | Certificate on file |

---

## 5. Validation, rollback, regression risk

- **Validation.** After A1–A9: one labeled test inquiry produces five observable artifacts (receipt, brief, Gmail copy, Today row, Resend log entry). After A4/C4: DMARC aggregate reports arrive within 48 hours. After B1: `node scripts/verify-public-site.mjs https://tko.solutions` reports zero failures and `/llms.txt`, `/robots.txt`, `/terms`, `/.well-known/security.txt` return 200.
- **Rollback.** Env variables: remove the added keys; the notifier returns to `skipped`, leads remain stored. DNS: delete only the records added for Resend and DMARC, using the pre-change values recorded above. No step here changes application code, schema, or data.
- **Regression risk.** Low for the site; moderate for mail if a DNS record replaces rather than adds (the walkthrough is explicit about additive changes). Removing the stale AI variables is zero-risk because no code path reads them, but it is a one-way action for the key value itself, which is why rotation at the provider is listed alongside.
