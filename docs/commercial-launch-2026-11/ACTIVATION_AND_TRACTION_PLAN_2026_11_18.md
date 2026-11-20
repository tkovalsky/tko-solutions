# Activation and traction plan: tko.solutions + BoundOS

Prepared November 18, 2026. Supersedes the open items of
`docs/implementation/INFRASTRUCTURE_CONFIGURATION_ACTION_PLAN_2026_10_18.md` (Phase A and C1–C4)
and `docs/implementation/TKO_RESEND_LEAD_WORKFLOW_2026_10_16.md` (§ B, Zoho forwarding).

Tags: **[V]** verified today through the Vercel API · **[A]** assumption, confirm at the provider · **[D]** Todd's decision.

---

## 0. The one-paragraph version

The current strategy is already in the code: **the Execution Gap Blueprint ($999 founding) is the
front door for owner-led and midmarket businesses, the Execution Sprint is the follow-on, and
BoundOS sells a $500 Database Health Assessment to Follow Up Boss team leads.** Nothing has been
sold yet (`foundingPaid: 0` for both founding offers). Three admin decisions block taking any money,
and the email loop isn't wired. So: Week 1 clears the money gates and the email. Weeks 2–4 are
selling the Blueprint to about 50 named non-healthcare businesses, with BoundOS assessments sold
through warm introductions only. Healthcare content stays as a credibility layer for the job-search
motion. **Healthcare is not a sales lane until the employment-conflict check is done.** Pricing is
frozen for 60 days.

---

## 1. Audit: what is true today

### 1.1 Hosting: the projects exist; production env is unconfirmed [V / A]

The `tko-solutions` Vercel project exists (`prj_3p0qVFDVWAnHVswo6JlfXlJ7z8qO`, in team
`team_HsVPkp5OV72DjU2GL0mAhuSj`): Vercel's GitHub integration built a preview for this PR. The
Vercel API connector used in this session can see only `rachel-site` and `cms`, so it could not
read the `tko-solutions` or BoundOS project settings, env variables or domains. Treat the
October 18 finding as still open until checked in the dashboard: **no `RESEND_API_KEY`,
`RESEND_FROM_EMAIL` or `LEAD_NOTIFY_EMAIL` in Production.**

Dependency to remember: BoundOS `/apply` and the Ghost Test post to
`https://tko.solutions/api/contact` (decision D4), so **BoundOS lead capture works only while
tko.solutions is up and correctly configured.**

### 1.2 Email [V for DNS host, A for records]

| Address | Mail host today | Problem |
|---|---|---|
| `todd@tko.solutions` | Zoho free (MX `mx.zoho.com` ×3) | Zoho free does not forward for newer accounts, so mail sits in a mailbox you don't check |
| `hi@boundos.com` | Titan (MX `mx1/mx2.titan.email`), sold through name.com | A second inbox, probably paid |
| Outbound from the site | Resend, configured in code | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `LEAD_NOTIFY_EMAIL` were never set in production, so notifications fail closed (`skipped: missing_env`) |

**Key fact:** DNS for both domains is on **Cloudflare** (nameservers `coleman` / `virginia.ns.cloudflare.com`),
not name.com. Name.com is only the registrar. So both domains can be managed from one Cloudflare
account, and Cloudflare Email Routing is free.

### 1.3 Commercial: the current ladder [V in repo]

Source of record: `src/lib/offers.ts` (last changed 2026-11-14) and DEC-223 in the RachelOS repo
(2026-11-03), and the BoundOS site repo `racheldelray-team/rachel-site-marketing` (last change
2026-11-03). That site's `sidecarLadder` matches the ladder below exactly. One line is stale: see 1.5.

**How the two relate:** TKO Solutions is the parent company and sells the method in abstract,
workflow-agnostic terms: find where any workflow breaks (Blueprint), fix one (Sprint), keep it
working (Operate & Improve). BoundOS is one solution built on that method, packaged for one
workflow (relationship follow-up) and one buyer (agents and team leads), with its own
implementation-specific scope and price. The two ladders are meant to differ. They only need to
agree where one site quotes the other's offer.

**TKO Solutions** (buyer: founder, owner, COO or ops leader of an owner-led or midmarket business)

| Step | Offer | Price | Status |
|---|---|---|---|
| 1. Front door | Execution Gap Blueprint: one workflow, ≤ 3 systems, 5 business days, no credentials | **$999** founding (first 5 paid), then $1,499 | Homepage hero CTA. 0 of 5 founding sold |
| 2. Fix | Execution Sprint: one workflow live in about 30 days, acceptance scenarios signed in week 1 | **$9,999** founding (first 3), then from $14,999 | Blueprint fee credited if signed within 45 days. 0 of 3 sold |
| 3. Keep | Operate & Improve | $1,500–$3,000/mo, 3-month minimum | — |
| Alt. entry | Constraint Diagnostic: multi-function, interviews | $7,500 | Supporting step |
| Vertical package | Owned Demand & Governed AI Engine (`/private-client-os`): wealth advisory, luxury services, boutique practices | 1–2 Sprints | Priced in Sprints since 11-14 |
| Enterprise lane | Readiness Sprint for **health plans** + Execution Assurance | $15,000 | **Gated:** see 1.4 |

**BoundOS** (buyer: team leads on Follow Up Boss; RIA path on `/apply`)

| Step | Price |
|---|---|
| Database Health Assessment | $500, credited to setup within 60 days |
| BoundOS Core | $1,500 setup + $500/mo |
| BoundOS Managed | $2,500 setup + $1,200/mo |
| Owned sidecar (customer hardware, DEC-223) | Not priced on either site [V] |

Other facts:
- There is **no "$25K diagnostic"**. The LinkedIn advice assumed one. Don't introduce it.
- **Pricing changed eight times between Sept 27 and Nov 14** (`git log -- src/lib/offers.ts`). Each change resets
  the copy, the tests and your own pitch. The ladder above is coherent. Freeze it (§ 6).
- `/tif/oi` (intake, pipeline, Today, people, decision capture) is built and is the right place
  for the account list. A spreadsheet isn't needed.

### 1.4 Gates that block revenue [V in repo]

| Gate | Source | Blocks | Effort |
|---|---|---|---|
| Written cancellation and refund terms approved | `BLUEPRINT_OPERATING_PROCEDURE.md` § 9 | **Any** Blueprint order, invoice, paid promotion or live outreach | 30 min: approve or edit the proposed terms |
| Invoicing tool for TKO Solutions LLC (card + ACH) | same | same | 30 min: Stripe Invoicing is simplest; it also serves the BoundOS $500 (playbook E4) |
| Florida sales-tax treatment of professional services, in writing | same | same | One email to the accountant |
| Employment and conflict check (outside work, IP, non-solicit, client conflict) with the Cognizant agreement | Decision pack 2026-09-27, § E and § J.2 item 4; Sprint qualification Q10 | **All healthcare payer/provider selling.** Possibly all outside work | Read the agreement this week. If it is unclear, one hour with an employment lawyer |
| Service agreement + DPA + E&O/cyber quote | Sidecar playbook D2/D3, § 9 | BoundOS assessments that ingest a client's contact list | Counsel; start now, takes weeks |

The first three are a single afternoon. Until they are closed, the honest status is "TKO cannot
take money", whatever the website says.

### 1.5 One stale cross-reference [V]

BoundOS and TKO prices are meant to differ (1.3). The issue is the one place BoundOS quotes a
**TKO** offer. `boundos.com/pricing` says: "The Owned Demand & Governed AI Engine is a separately scoped build
($7,500–$15,000 build · fixed scope)". This comes from `tkoBuildEngagement` in
`rachel-site-marketing/src/lib/boundos/content.ts`, pinned by `tests/sidecar.test.ts`.
`tko.solutions/private-client-os` has said "From $9,999 per Sprint · usually one or two Sprints"
since Nov 14. A prospect who reads both sees two prices for the same thing.

**Fix (two lines plus one test assertion):** change `tkoBuildEngagement.commercial` to a
number-free phrase such as `"priced in fixed-fee Execution Sprints"`, so it can't drift again when
the founding price ends. This is the one pricing edit the § 6 freeze allows, because it aligns
with the source of truth rather than changing it.

---

## 2. Recommendation: one inbox

**Use Gmail as the one inbox, Cloudflare Email Routing for inbound on both domains, and Resend
SMTP for outbound as `todd@tko.solutions`.**

| Option | Cost | Inbound | Outbound | Verdict |
|---|---|---|---|---|
| **A. Cloudflare Routing → Gmail, plus Gmail "Send mail as" through Resend SMTP** | $0 (Resend Free covers one domain) | Both domains | As `todd@tko.solutions`. `hi@boundos.com` mail is answered from the TKO address ("BoundOS by TKO Solutions") | **Recommended.** Free, uses the DNS host and Resend account you already have, and drops Zoho and Titan |
| B. Option A plus Resend Pro | about $20/mo [A] | Both | As either address | Upgrade when a BoundOS buyer needs replies from `@boundos.com` |
| C. Google Workspace Business Starter, with boundos.com as a secondary domain | about $7–8/mo [A] | Both | Both, signed by Google | Best deliverability for heavy 1:1 outreach. Switch if Gmail send-as through Resend proves fiddly |
| D. Keep Zoho + Titan and fix forwarding | Zoho paid tier, plus Titan | Both | Split | Rejected: two vendors and two inboxes, the problem you have now |

Resend Free limits are about 100 emails a day and 3,000 a month [A]. Personal 1:1 outreach fits
easily. **Never run bulk or cold sequences through this path.**

---

## 3. Week 1: activation runbook (in order; each step has a check)

### Step 1: Confirm the sites load (5 min)
Open `https://tko.solutions/contact` and `https://www.boundos.com/apply`. Both should render a form.

### Step 2: Audit the Vercel projects (15 min)
For **tko-solutions** (Vercel → tko-solutions → Settings):
1. **Domains:** `tko.solutions` and `www.tko.solutions` are attached and valid.
2. **Environment Variables, Production:**
   - `DATABASE_URL` (pooled Neon connection string for the **tko-site** Neon project), `TIF_ACCESS_KEY`
     and `NEXT_PUBLIC_SITE_URL` = `https://tko.solutions` are present.
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `LEAD_NOTIFY_EMAIL` are set in Step 5. Use
     **Production only**, so preview builds never send real mail.
   - Remove the stale `ANTHROPIC_API_KEY` / `AI_*` variables. No code reads them.
3. Run `npm run tif:migrate:status` once against production from a local checkout. If it reports
   pending migrations, run `npm run tif:migrate:deploy`.

For **BoundOS** (the project built from `racheldelray-team/rachel-site-marketing`): confirm the
`boundos.com` / `www.boundos.com` domains and the Turnstile keys (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`,
`TURNSTILE_SECRET_KEY`).

**Check:** both URLs load; `https://tko.solutions/contact` renders the form.

### Step 3: Back up the old mailboxes (15 min)
Export or forward-by-hand anything you want to keep from Zoho (`todd@tko.solutions`) and Titan
(`hi@boundos.com`). Once the MX records change in Step 4, those mailboxes stop receiving.

### Step 4: Inbound with Cloudflare Email Routing (20 min, both domains)
For each of `tko.solutions` and `boundos.com` in Cloudflare:
1. Email → Email Routing → Get started. Add the destination address (your personal Gmail) and click
   the verification link Cloudflare sends.
2. Create routes: `todd@tko.solutions` → Gmail. `hi@boundos.com` → Gmail. Optionally add
   `hello@` / `sidecar@` aliases, or a catch-all, to the same destination.
3. When Cloudflare offers to fix the DNS records, let it. This **deletes the Zoho / Titan MX
   records** and adds Cloudflare's MX plus its SPF include. The root SPF must be a single record.
   On `boundos.com`, drop `include:spf.titan.email` and `include:amazonses.com` unless something
   else still sends through them.
4. Add DMARC on both domains: TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:todd@tko.solutions; fo=1`.
   Move to `p=quarantine` after two clean weeks.

**Check:** from a third account (phone or any other address), send one message to each address.
Both arrive in Gmail.

### Step 5: Outbound with Resend for the site and for Gmail send-as (30 min)
1. resend.com → Domains → add `tko.solutions` (sending only). Add the DKIM (`resend._domainkey`)
   and the `send` subdomain MX + SPF records to Cloudflare as **DNS only** (grey cloud). They
   don't conflict with Step 4: Resend uses the `send.` subdomain, Email Routing uses the root.
   Wait for **Verified**.
2. Create **two** sending-only API keys scoped to `tko.solutions`: `tko-site-production` and
   `gmail-send-as`. With separate keys, either can be rotated without breaking the other.
3. Vercel → tko-solutions → Production env:
   - `RESEND_API_KEY` = the `tko-site-production` key
   - `RESEND_FROM_EMAIL` = `Todd Kovalsky | TKO Solutions <todd@tko.solutions>`
   - `LEAD_NOTIFY_EMAIL` = `todd@tko.solutions` (Cloudflare routes it to Gmail; don't put the
     personal address in app config)
   - Then redeploy so the variables take effect.
4. Gmail → Settings → Accounts → **Send mail as** → Add `Todd Kovalsky <todd@tko.solutions>`.
   SMTP server `smtp.resend.com`, port `465` (SSL), username `resend`, password = the
   `gmail-send-as` key. Gmail emails a code to `todd@tko.solutions`, which now arrives in Gmail
   through Step 4. Enter it. Then set **"Reply from the same address the message was sent to"**.
5. Gmail filters: `to:hi@boundos.com` → label `BoundOS`; `to:todd@tko.solutions` → label `TKO`;
   `from:todd@tko.solutions subject:"New inquiry"` → star + label `Leads`.

**Check:** send from Gmail as `todd@tko.solutions` to a third account and confirm that
"Show original" reports DKIM pass and SPF pass. Replying to a `hi@boundos.com` message defaults
to sending as `todd@tko.solutions`.

### Step 6: End-to-end form test (15 min)
1. On `https://tko.solutions/contact`, submit one inquiry labeled `TEST 2026-11-xx` from the third account.
2. Confirm all five: (a) the prospect receipt arrives at the third account; (b) the operator
   notification arrives in Gmail with Reply-To set to the prospect; (c) the row appears in
   `/tif/oi/today`; (d) the Resend log shows two sends; (e) the page shows `status=submitted`, not
   `notification-error`.
3. Repeat once from `https://www.boundos.com/apply`, which exercises the CORS path into the same store.
4. Cancel Titan at name.com. Leave Zoho free dormant, or delete the org.

### Step 7: Clear the money gates (one afternoon, plus one email)
1. Approve or edit the Blueprint cancellation and refund terms (`BLUEPRINT_OPERATING_PROCEDURE.md` § 3, item 9).
2. Open the invoicing account for TKO Solutions LLC (card + ACH). Create two saved items:
   "Execution Gap Blueprint (founding)" at $999 and "BoundOS Database Health Assessment" at $500.
3. Email the accountant: "Is a fixed-fee workflow assessment delivered remotely by a Florida LLC
   taxable in Florida?" File the written answer.
4. Read the outside-work, IP, non-solicit and conflict clauses of the Cognizant agreement. Write
   down one of three answers in this file: *clear*, *clear except healthcare payer/provider*, or
   *needs approval*. If it needs approval, request it before any outreach.
5. Ask counsel for a quote on the BoundOS service agreement and DPA (drafts in `docs/legal/`),
   and ask a broker for E&O and cyber quotes. These take weeks, so start them now; they don't
   block the Blueprint.

**Week 1 is done when:** both sites load, both addresses land in one Gmail, you can send as
`todd@tko.solutions`, both forms produce a receipt, an alert and a Today row, and you can issue a
Blueprint invoice today.

**Rollback:** in Cloudflare, disable Email Routing and restore the Zoho / Titan MX records (copy
them into a note before Step 4). In Vercel, remove the Resend variables; the notifier fails closed
and leads still save.

---

## 4. LinkedIn Featured: four cards that tell one story

Order: **offer → proof → thinking → specialization.** Replace the near-duplicate
prior-authorization cards. Each card links to a live page, so Step 2 must be done first.

| # | Question it answers | Card title | Link | One-line description |
|---|---|---|---|---|
| 1 | How do I buy Todd? | Execution Gap Blueprint | `https://tko.solutions/services/execution-gap-blueprint` | One workflow, up to three systems, five business days: where the work breaks, why, and what to fix first. $999 for the first five clients. |
| 2 | Can he design and build modern systems? | RachelOS: a founder-built operating system, in production | `https://tko.solutions/selected-work/from-crm-to-operating-system` | Canonical next actions, evidence provenance, approval-gated AI, built and running daily. |
| 3 | Does he have an original way of thinking? | From System of Record to System of Action | `https://tko.solutions/insights/from-system-of-record-to-system-of-action` | Swap in "Decisioning: The Missing Layer Between Data and Action" once Post 1 below is on the site. |
| 4 | Does he know a hard domain deeply? | Prior Authorization Is a Decision-Rights Problem | `https://tko.solutions/insights/prior-authorization-is-a-decision-rights-problem` | Healthcare depth for recruiters and enterprise readers (Motion A). Thought leadership, not an offer. |

Why card 1 changed from the healthcare Readiness Sprint: the site's front door is the Blueprint,
and selling health-plan work is gated on the employment check (§ 1.4). If that check comes back
*clear*, add the Readiness Sprint as a fifth card. Don't swap it in for card 1. **[D]**

LinkedIn headline (draft, under 220 characters):
> Transformation leader · Operating models, decision systems & governed AI · I find where work breaks between teams and systems, then fix it · Founder, TKO Solutions

---

## 5. Weeks 2–4: the selling system

### 5.1 Three motions, one body of content

| Motion | Priority | Target | Offer | Where it's tracked |
|---|---|---|---|---|
| **B: Blueprint buyers** | **Primary** | 50 owner-led or midmarket businesses (about $5M–$100M revenue; the general intake treats $5M+ as a fit) in the verticals the insights library already covers: RIAs and wealth advisory, commercial insurance brokers, boutique M&A / capital-formation firms, law firms, B2B SaaS implementation teams, luxury / private-client services. Buyer: owner, COO, head of operations. South Florida first, where introductions are warmest | Blueprint ($999 founding) → Execution Sprint | `/tif/oi/intake` → pipeline → Today; Blueprint ledger |
| **C: BoundOS** | Secondary, at reduced cadence | Agents and Follow Up Boss team leads. Two channels: (1) the existing Ghost Test launch plan (`rachel-site-marketing/docs/GHOST_TEST_LAUNCH_PLAN.md`: TikTok/Reels, Reddit, reply template), cut to **3 videos a week from one batch session** instead of daily; (2) warm introductions through Rachel's network | Ghost Test (free) → $500 Database Health Assessment → Core / Managed | Same `InboundLead` store (`BOUNDOS_APPLY`, `BOUNDOS_GHOST_TEST`) |
| **A: Roles** | Parallel; LinkedIn only | Principal / Director / Sr Director Transformation; Healthcare Product Strategy; AI Transformation; Operating Model / OpEx; Principal Program / Product; Transformation or Client Partner; Solutions / Value Consulting; Healthcare Strategy & Ops | Apply, then connect with the hiring VP, the transformation executive, the recruiter and one adjacent leader | `/tif/oi` as FTE opportunities |

RachelOS is not a motion. It is the evidence behind all three: Featured card 2, Posts 4, 5 and 7,
and the BoundOS pitch.

**Healthcare buyers are not a motion yet.** No outreach to health plans, providers, MSOs or
provider groups, and no Readiness Sprint pitches, until § 1.4's employment check returns *clear*.
Sprint qualification Q10 already excludes payer and provider work. Healthcare posts are fine: they
build credibility for Motion A, with the § 5.3 boundary.

**Why the Blueprint is the primary motion, not BoundOS:** the Blueprint touches no credentials or
contact lists, so it needs no DPA or insurance to start. At $999 it is a small first yes, it feeds
a $9,999 follow-on, and the site, intake and operating procedure are finished. BoundOS's paid step
imports a client's contact list, so it needs the authorization letter and DPA signed off. No E1
report was found in the RachelOS repo, so outcome claims are off-limits anyway; the launch plan's
rules already forbid them. The Ghost Test itself needs neither, so run it now. It is the only
inbound engine either business has.

**Capacity:** the Ghost Test launch plan assumed one video a day. On top of a full-time job, the
Blueprint motion and LinkedIn, that doesn't fit. Three a week from one recording session does.
Raise the cadence only if sent Ghost Test results justify it (launch plan § 4 scorecard).

**The 50-account rule.** Each account in `/tif/oi` needs three things before outreach: (1) a named
person with authority; (2) a specific, observable reason they likely have the problem (hiring an
ops coordinator, a new CRM, an acquisition, growth past the founder's span, a public complaint
about follow-up); (3) the one post or insight of yours that fits it. No reason, no outreach.

### 5.2 Outreach shape

Conversation first, problem second, Blueprint third. Template:

> I've been writing about [topic from the post] because I keep seeing the same pattern: [one-sentence pattern]. [Organization] came to mind because of [specific, observable reason]. Curious whether that's something you're running into in [area]?

No pitch, no link, no calendar link in the first message. When they describe the problem, the
next line is: *"I do a fixed-scope, five-day look at exactly that workflow. The first five are
$999. Want the one-page scope?"*

BoundOS variant (warm introduction): *"[Introducer] said you run a team on Follow Up Boss. I built
the follow-up system Rachel runs her business on. There's a two-minute Ghost Test that estimates
how many past clients have gone quiet. Want the link?"*

### 5.3 Eight posts (one or two a week)

Every post must pass the **commercial test**: *what expensive problem would someone reasonably hire
me to solve after reading this?* Every post closes with an observation or a question, never "DM me".

| # | Title | Buyer signal | Hireable for | Day-job source (generalized, never the client) |
|---|---|---|---|---|
| 1 | Most Businesses Have a Decision Problem | Decision systems | Operating-model design, diagnostic | Lots of data, unclear rules for what happens next |
| 2 | A System of Record Is Not a System of Accountability | Program recovery | Program recovery | Repeated status meetings as a reconciliation layer |
| 3 | The Platform Is Not the Workflow | Healthcare transformation | Workflow modernization | Teams each see one slice of a cross-application flow |
| 4 | The First Job of Automation Is Knowing When Not to Act | AI governance | AI workflow architecture | RachelOS suppression and fail-closed design |
| 5 | What Building a Small Operating System Taught Me About Enterprise Transformation | Builder credibility | Build / Sprint | RachelOS |
| 6 | Green Status Without Evidence Is Just Optimism | Executive / program leadership | Program recovery | "Green" while dates and dependencies stay unstable |
| 7 | Human Attention Is a Capacity Constraint | Operations economics | Queue / operating design | RachelOS queue overload, operator burden |
| 8 | Why I Don't Start an Automation Engagement With Automation | Consulting offer | The Blueprint | The only post that links an offer: `/services/execution-gap-blueprint` |

Reserve themes for later posts: one-field changes that cross eight teams (dependency topology);
accountability without decision rights produces escalation theater; transformation breaks at
organizational boundaries more than application boundaries.

**Boundary:** no client names, people, systems, dates or numbers from current employment. Write the
pattern, never the incident.

### 5.4 Daily 60 minutes

| Minutes | Activity |
|---|---|
| 15 | Inspect one real piece of work and extract one operating principle |
| 15 | Draft or finish one post (publish one or two a week, not daily) |
| 15 | Substantive comments on 5–8 posts by buyers, executives, recruiters or partners |
| 15 | Start or advance 2–3 real conversations, logged in `/tif/oi` (Blueprint accounts first) |

Once a week, 30 minutes: ask Rachel for two Follow Up Boss team-lead introductions, and run the
Blueprint ledger's funnel reconciliation (`BLUEPRINT_OPERATING_PROCEDURE.md` § 8).

Once a week, about 90 minutes: one Ghost Test recording session (three videos), per the launch plan.
Answer every sent result within two business days using launch plan § 5.

### 5.5 KPIs (weekly, in this order)

| Metric | 30-day target |
|---|---|
| Accounts in `/tif/oi` meeting the 50-account rule | 50 |
| Substantive conversations (2+ replies each way) | 15 |
| Blueprint scopes sent | 6 |
| **Founding Blueprints paid** | **2** (of the 5) |
| BoundOS Ghost Test results sent (video + introductions) | 15 |
| BoundOS assessment calls held | 3 |
| **BoundOS assessments paid** | **1** (only if the DPA is signed off; otherwise 0 and that's fine) |
| Execution Sprint proposals sent (from a delivered Blueprint) | 1 |
| Motion A: senior connections accepted / role processes | 25 / 1 |

Likes and impressions are secondary. Revenue rows are the ones that matter. Two paid Blueprints in
30 days proves the front door works; zero after 15 real conversations is a signal about the offer
or the targeting, and it is the only evidence that justifies a price change.

---

## 6. What not to do

**For 60 days, or until 5 founding Blueprints are paid, whichever comes first:**
- **No price or offer changes** in `src/lib/offers.ts` or on the BoundOS site. The only allowed
  edit is incrementing `foundingPaid` on confirmed payment. Write any pricing ideas down in this
  file's § 8 and review them at day 60 against real conversations.
- No new offers, tiers or bundles. No "$25K diagnostic".

**For 30 days:**
- No new TIF / OI / RachelOS features unless a live conversation needs them.
- No new strategy documents. Update this one.
- No BoundOS feature work beyond making `/apply` reach Todd (Step 6).
- No healthcare buyer outreach until the employment check is *clear*.

---

## 7. Validation, rollback, regression risk

- **Validation:** the Week 1 checks in § 3; the weekly KPI table in § 5.5.
- **Rollback:** § 3, end of Step 6. No code changes in this plan.
- **Regression risk:** the MX cutover in Step 4 is the only change that can lose mail. Mitigate
  with Step 3 (backup) and by doing Step 4 when you can test immediately. The Vercel
  env changes touch only the tko-solutions and BoundOS projects; `rachel-site` and `cms` are untouched.

---

## 8. Open items and parked ideas

| Item | Why open | Next action |
|---|---|---|
| BoundOS build-price line | § 1.5 | Fixed in racheldelray-team/rachel-site-marketing PR 5 (draft); merge to deploy |
| BoundOS analytics | Launch plan § 0 item 5: no UTM capture or page analytics on BoundOS, so only sent results are countable | Accept for 30 days; sent results are the KPI that matters |
| Owned-sidecar pricing (DEC-223) | Decided as an offer shape, with no public price | Leave unpriced and out of the pitch until a managed client exists |
| Rachel E1 holdout report | Needed for BoundOS outbound credibility | Confirm whether it ran. If not, it is the one RachelOS task worth doing in the 30 days |
| Pricing ideas | Parked under the § 6 freeze | Review at day 60 |
