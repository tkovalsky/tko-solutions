# Activation and traction plan: tko.solutions + BoundOS

Prepared November 18, 2026. Supersedes the open items of
`docs/implementation/INFRASTRUCTURE_CONFIGURATION_ACTION_PLAN_2026_10_18.md` (Phase A and C1–C4)
and `docs/implementation/TKO_RESEND_LEAD_WORKFLOW_2026_10_16.md` (§ B, Zoho forwarding).

Tags: **[V]** verified today through the Vercel API · **[A]** assumption, confirm at the provider · **[D]** Todd's decision.

---

## 0. The one-paragraph version

Stop building for 30 days. The site, offers, intake, lead store, operator notifications and
Opportunity Intelligence workbench already exist in code. What is missing is (1) the sites being
live and wired, (2) one inbox that receives everything, and (3) a daily selling habit aimed at
about 50 named organizations and 20–30 named people. Week 1 fixes (1) and (2). Weeks 2–4 are
(3). Success is measured in conversations, not impressions.

---

## 1. Audit: what is true today

### 1.1 Blocker: neither site has a Vercel project [V]

The Vercel team "Todd Kovalsky's projects" (`team_HsVPkp5OV72DjU2GL0mAhuSj`) now contains only
two projects, `rachel-site` and `cms`. The `tko-solutions` and `rachel-site-marketing` (BoundOS)
projects listed on October 18 are gone, and so are `property-manager`, `cre-intelligence` and
`tko-healthcare`. The likeliest explanation is that the Phase C6 cleanup deleted more projects than
it meant to.

The domains `tko.solutions` and `boundos.com` are still registered to the team and verified, but no
project serves them. **If no other Vercel account hosts them, both sites return Vercel's
"deployment not found" page right now.** This container cannot reach either site, so open both in a
browser before doing anything else.

This takes out more than the TKO site. BoundOS `/apply` and the Ghost Test post to
`https://tko.solutions/api/contact` (decision D4), so **BoundOS lead capture fails too** whenever
tko.solutions is down.

### 1.2 Email [V for DNS host, A for records]

| Address | Mail host today | Problem |
|---|---|---|
| `todd@tko.solutions` | Zoho free (MX `mx.zoho.com` ×3) | Zoho free does not forward for newer accounts, so mail sits in a mailbox you don't check |
| `hi@boundos.com` | Titan (MX `mx1/mx2.titan.email`), sold through name.com | A second inbox, probably paid |
| Outbound from the site | Resend, configured in code | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `LEAD_NOTIFY_EMAIL` were never set in production, so notifications fail closed (`skipped: missing_env`) |

**Key fact:** DNS for both domains is on **Cloudflare** (nameservers `coleman` / `virginia.ns.cloudflare.com`),
not name.com. Name.com is only the registrar. So both domains can be managed from one Cloudflare
account, and Cloudflare Email Routing is free.

### 1.3 Commercial [V in repo]

- Offers are defined and priced: Execution Gap Blueprint ($999 founding / $1,499), Execution Sprint
  ($9,999 founding / $14,999), Enterprise Transformation & Readiness Sprint (from $15,000).
- There is **no "$25K diagnostic"** on the site. Don't promise a price on LinkedIn that the site
  doesn't show. Use the $15K Enterprise Readiness Sprint as the healthcare diagnostic offer for now.
- `/tif/oi` (Opportunity Intelligence: intake, pipeline, Today, people, decision capture) is built
  and is the right place for the 50-account list. A spreadsheet isn't needed.
- The repo holds about 93 stories, a 98 KB backlog and more than 30 strategy documents, but no
  record of an outbound conversation. The bottleneck is selling, not software.

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

### Step 1: Confirm the sites are down (5 min)
Open `https://tko.solutions` and `https://www.boundos.com`. If both load, find which Vercel account
serves them (Vercel dashboard → account switcher) and skip to Step 3.

### Step 2: Recreate the two Vercel projects (30–45 min)
For **tko.solutions**:
1. Vercel → Add New → Project → import GitHub `tkovalsky/tko-solutions`. Framework: Next.js. Leave
   the build command as the repo's `npm run build`.
2. Environment Variables (**Production only** for the Resend ones, so preview builds never send real mail):
   - `DATABASE_URL`: pooled connection string from the **tko-site** Neon project. Confirm in the
     Neon console that the project and its `InboundLead` rows still exist.
   - `TIF_ACCESS_KEY`: new random value (stored in a password manager).
   - `NEXT_PUBLIC_SITE_URL` = `https://tko.solutions`
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LEAD_NOTIFY_EMAIL`: set in Step 5.
   - Do **not** re-add the stale `ANTHROPIC_API_KEY` / `AI_*` variables. No code reads them.
3. Deploy, then Settings → Domains → add `tko.solutions` and `www.tko.solutions`. The domain is
   already in the team, so it attaches without new DNS records unless Vercel asks.
4. Run `npm run tif:migrate:status` once against production from a local checkout. If it reports
   pending migrations, run `npm run tif:migrate:deploy`.

For **boundos.com**: the same steps with the `rachel-realestate-marketing` repo and its own env.
This repo is not attached to this session, so its env list wasn't checked. It needs at least the
Turnstile keys (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`). Then add the
`boundos.com` and `www.boundos.com` domains.

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

**Week 1 is done when:** both sites load, both addresses land in one Gmail, you can send as
`todd@tko.solutions`, and both forms produce a receipt, an alert and a Today row.

**Rollback:** in Cloudflare, disable Email Routing and restore the Zoho / Titan MX records (copy
them into a note before Step 4). In Vercel, remove the Resend variables; the notifier fails closed
and leads still save.

---

## 4. LinkedIn Featured: four cards that tell one story

Order: **offer → proof → thinking → specialization.** Replace the near-duplicate
prior-authorization cards. Each card links to a live page, so Step 2 must be done first.

| # | Question it answers | Card title | Link | One-line description |
|---|---|---|---|---|
| 1 | How do I buy Todd? | Healthcare Workflow & Operating Model Diagnostic | `https://tko.solutions/services/regulatory-implementation-readiness-sprint` | Fixed-scope readiness sprint: where a regulated workflow breaks across teams and systems, and what to fix first. From $15K. |
| 2 | Can he design and build modern systems? | RachelOS: a founder-built operating system, in production | `https://tko.solutions/selected-work/from-crm-to-operating-system` | Canonical next actions, evidence provenance, approval-gated AI, built and running daily. |
| 3 | Does he have an original way of thinking? | From System of Record to System of Action | `https://tko.solutions/insights/from-system-of-record-to-system-of-action` | Swap in "Decisioning: The Missing Layer Between Data and Action" once Post 1 below is written up on the site. |
| 4 | Does he know my industry? | Prior Authorization Is a Decision-Rights Problem | `https://tko.solutions/insights/prior-authorization-is-a-decision-rights-problem` | Why PA modernization stalls between policy, operations and systems. |

The card 1 title differs from the page name ("Enterprise Transformation & Readiness Sprint"). That
is acceptable on LinkedIn, but if card 1 converts, consider renaming the page to match. **[D]**

LinkedIn headline (draft, under 220 characters):
> Healthcare transformation leader · Operating models, decision systems & governed AI · I diagnose where work breaks between teams and systems, then build the fix · Founder, TKO Solutions

---

## 5. Weeks 2–4: the selling system

### 5.1 Two motions, one body of content

| Motion | Target | Ask | Where it's tracked |
|---|---|---|---|
| **A: Roles** | Principal / Director / Sr Director Transformation; Healthcare Product Strategy; AI Transformation; Operating Model / OpEx; Principal Program / Product; Transformation or Client Partner; Solutions / Value Consulting; Healthcare Strategy & Ops | Apply, then connect with the hiring VP, the transformation executive, the recruiter and one adjacent leader | `/tif/oi` as FTE opportunities |
| **B: Diagnostic buyers** | 50 organizations: specialty medical groups, MSOs, PE-backed provider groups. People: RCM, operations, prior-auth, transformation leaders, COO/CAO, and CIO/CTO where admin automation is active | A conversation about a named problem, then the diagnostic | `/tif/oi/intake` → pipeline → Today |
| **C: RachelOS as proving ground** | Not a buyer. It is the evidence source for both motions | — | Feeds posts and Featured card 2 |

**The 50-account rule.** Each account in `/tif/oi` needs three things before outreach: (1) a named
person with authority; (2) a specific, observable reason they likely have the problem (a job
posting, a payer mandate, an acquisition, a public statement); (3) the one post of yours that fits
it. No reason, no outreach.

### 5.2 Outreach shape

Conversation first, problem second, diagnostic third. Template:

> I've been writing about [topic from the post] because I keep seeing the same pattern: [one-sentence pattern]. [Organization] came to mind because of [specific, observable reason]. Curious whether that's something you're running into in [area]?

No pitch, no link, no calendar link in the first message. The diagnostic comes up only after they
describe the problem.

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
| 8 | Why I Don't Start an Automation Engagement With Automation | Consulting offer | The diagnostic | Links to the diagnostic page |

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
| 15 | Start or advance 2–3 real conversations, logged in `/tif/oi` |

### 5.5 KPIs (weekly, in this order)

| Metric | 30-day target |
|---|---|
| Relevant profile views (Director+ in target orgs or titles) | Trending up week over week |
| Senior connection requests sent / accepted | 60 / 25 |
| Substantive DM threads (2+ replies each way) | 15 |
| Calls held | 6 |
| Introductions received | 2 |
| Proposals or written orders sent | 1–2 |
| Paid work or serious role process | 1 |

Likes and impressions are secondary. One VP reply is worth more than 18,000 impressions.

---

## 6. What not to do for 30 days

- No new TIF / OI / RachelOS features unless a live conversation needs them.
- No new strategy documents. Update this one.
- No new offers or prices. Sell the ones on the site.
- No BoundOS feature work beyond making `/apply` reach Todd (Step 6).

---

## 7. Validation, rollback, regression risk

- **Validation:** the Week 1 checks in § 3; the weekly KPI table in § 5.5.
- **Rollback:** § 3, end of Step 6. No code changes in this plan.
- **Regression risk:** the MX cutover in Step 4 is the only change that can lose mail. Mitigate
  with Step 3 (backup) and by doing Step 4 when you can test immediately. Vercel recreation
  carries no risk to RachelOS: `rachel-site` and `cms` are untouched.
