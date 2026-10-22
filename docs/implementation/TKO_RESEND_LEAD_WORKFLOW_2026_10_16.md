# TKO website lead emails: Resend, Zoho, Cloudflare, and Gmail

Prepared October 16, 2026. Application implementation and local configuration are complete; see the execution record and account setup walkthrough below for verification and remaining launch steps. External account configuration and deployment have not been completed.

## Execution record — October 16, 2026

- Implemented separate HTML/text prospect receipts and operator briefs in the existing shared notifier. Both form entry points use it without redirect/response changes. Sends run independently and use different idempotency keys per saved submission.
- Preserved operator-only `notifiedAt` semantics, reset that value on repeat capture, and made notification marking conditional on the submission timestamp to protect a newer request from an older in-flight send.
- Strengthened the JSON endpoint's address validation. Automated tests cover channel failures, missing/blank environment, malformed acceptance responses, independent timeout handling, recipient routing, template escaping, repeat-submission marking, and duplicate-send keys.
- Configured the ignored local `.env.local` from Todd's RTF key, with the intended TKO From identity and operator inbox. The key was not displayed or added to source control. Production environment values have not been inspected or changed.
- Verification passed: 74 targeted tests, all 487 tests across 80 files, ESLint, production build including type checking, and diff whitespace checks. These were mocked email tests; they did not contact Resend or send messages.
- Public DNS inspection found Cloudflare nameservers and these existing root MX records: `mx.zoho.com` priority 10, `mx2.zoho.com` priority 20, and `mx3.zoho.com` priority 50. Root SPF is `v=spf1 include:zohomail.com ~all`. Keep these records in place.
- No public record was found at the standard Resend locations `resend._domainkey.tko.solutions` or `send.tko.solutions`. Custom sending records may differ; Resend's actual domain screen remains the authority. The sending-only key cannot inspect that screen via the domain API.
- No Resend/Cloudflare/Zoho/Gmail settings were changed, no deployment was started, and no live email was sent. Provider delivery and forwarding remain unverified.

## Your account setup walkthrough

### A. Resend → Cloudflare → Resend

1. Open [Resend Domains](https://resend.com/domains), then inspect or add **tko.solutions** in the account containing the supplied key. Choose sending only; keep inbound receiving disabled.
2. Choose manual setup to inspect the records before changing the existing zone. Copy the exact record type, host, value, and priority from Resend. Do not use a sample DKIM public key or a guessed AWS region.
3. Open [Cloudflare](https://dash.cloudflare.com), select **tko.solutions → DNS → Records**, and add the records. With Resend's usual setup, the mapping is:

   | Record purpose | Typical Cloudflare type/name | Value |
   | --- | --- | --- |
   | Signing key | TXT `resend._domainkey` | Exact DKIM value from Resend |
   | Sender authorization | TXT `send` | Exact SPF value from Resend |
   | Bounce handling | MX `send` | Exact mail server and priority from Resend |

   These names are examples of the standard setup, not substitutes for the account's actual record list. Use Auto TTL. Any proxy-capable verification record must be DNS only. Keep the root Zoho MX and SPF shown above, plus any existing Zoho signing records. Do not add a second SPF policy at an occupied hostname.
4. Return to Resend and select **Verify DNS Records**. Continue when sending is **Verified**. Confirm the sending key is permitted to send for this domain. No Resend inbox or Cloudflare Email Routing change is needed.

Source: [Resend's Cloudflare guide](https://resend.com/docs/guides/dns/cloudflare).

### B. Zoho → Gmail forwarding

1. Sign in to Todd's Zoho mailbox. Open **Settings → Mail Accounts → todd@tko.solutions → Forwards**.
2. Add **t.e.kovalsky@gmail.com**. Keep **Delete original email copy after forwarding** unchecked.
3. Open the Zoho verification message in Gmail. Enter its code in Zoho's forwarding verification screen and enable the destination.
4. Send an ordinary test message from a separate controlled inbox to Todd's TKO address. Confirm it appears in both Zoho and Gmail. Receiving a verification code alone does not prove forwarding is working.
5. If the forwarding option is missing, inspect the Zoho subscription and organization policy. Zoho says the feature is unavailable for newly registered free-plan users. Do not purchase an upgrade or change mailbox routing without choosing that separately.

Source: [Zoho forwarding instructions](https://www.zoho.com/mail/help/email-forwarding.html).

### C. Gmail and business replies

Receiving forwarded messages needs no Gmail POP import. Confirm the destination in step B and check Inbox/Spam during the initial test.

**Updated recommendation:** use Zoho's web or mobile app to reply from **todd@tko.solutions**. Google now documents removal of third-party Gmail **Send as** starting January 2027 and says new setups may already be restricted. It separately confirms that incoming forwarding is unaffected. Do not make a fresh Gmail Send as configuration a launch dependency. [Google's announced changes](https://support.google.com/mail/answer/17101213).

If Todd still wants a temporary setup and Gmail permits it: **Gmail Settings → See all settings → Accounts and Import → Send mail as → Add another email address**. Add Todd's TKO identity, use the SMTP server shown inside the actual Zoho account's **Server Configuration Details**, and authenticate as `todd@tko.solutions`. Use the supported secure connection and an app-specific password if required; never use the Resend key as a mailbox password. Complete Gmail's address verification and check both From and Reply-To when testing. This is temporary, not the recommended durable workflow. [Gmail setup](https://support.google.com/mail/answer/22370?hl=en), [Zoho SMTP settings](https://www.zoho.com/mail/help/zoho-smtp.html).

### D. Production hosting configuration

Local configuration is complete. For **Vercel → tko-site project → Settings → Environment Variables**, set these in the intended production environment:

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | Secret from `/Users/todd/dev/tko-resend.rtf`; copy only into the secret field |
| `RESEND_FROM_EMAIL` | `Todd Kovalsky \| TKO Solutions <todd@tko.solutions>` |
| `LEAD_NOTIFY_EMAIL` | `todd@tko.solutions` |

Use the normal deployment process to ship the implementation and activate the production values. Do not replace the site's database or other environment settings. Preview deployments also send real mail if configured with the real key; use mocked email or controlled inboxes for tests.

Once deployed and verified, submit a labeled inquiry from a controlled prospect address. Check the prospect receipt, Todd's Zoho brief, its forwarded Gmail copy, and the saved lead in Today. Reply through Zoho to confirm sender identity and routing. Inspect Resend's email log and actual inboxes; an API acceptance or a green unit test alone does not prove delivery.

## Initial audit — before implementation

- `/contact` saves an `InboundLead` and calls `src/lib/leads/notify.ts`. The private-client inquiry endpoint `/api/contact` uses the same functions.
- The notifier currently sends only an internal text email. It does not acknowledge the prospect.
- Local `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are missing. Local `FROM_EMAIL` is `hello@tko.solutions`; `LEAD_NOTIFY_EMAIL` is `todd@tko.solutions`. Production settings were not inspected.
- `/Users/todd/dev/tko-resend.rtf` contains a Resend key. A read-only Resend domain-list request returned `401 restricted_api_key`: this key is restricted to sending. Domain verification and the key's permitted sending domain remain unverified. No email was sent.
- RachelOS implements separate prospect confirmations and operator notifications, with independent handling of failures. Use that behavior as a reference without importing or modifying RachelOS.
- The prior local change already keeps saved `/contact` requests in a positive confirmation state and displays five recent inbound leads in `/tif/oi/today`.
- Repeat submissions update the same lead by email. Persistence currently retains an older `notifiedAt`, which can incorrectly imply that Todd was notified about the newest submission.
- Todd uses Zoho for the `todd@tko.solutions` mailbox. Forwarding destination explicitly supplied by Todd: `t.e.kovalsky@gmail.com`.

## Recommendation and tradeoffs

Extend the existing shared notifier. After storage succeeds, independently send one prospect receipt and one operator brief. Keep Zoho handling the mailbox and forward incoming mail to Gmail, retaining a Zoho copy. Configure only Resend's required sending records in Cloudflare.

This provides a small RachelOS-style workflow: capture → acknowledge → alert Todd → review in Today → reply personally. It requires no new service, schema, migrations, or framework. The first version attempts both emails during the request. It does not add background retry, delivery webhooks, drip campaigns, inferred lead scores, or automated sales replies. A Resend acceptance is not proof of inbox delivery; inspect the provider log and actual mailbox during launch verification.

An alternative is to send Todd's alert directly to Gmail. Do not choose it here: Todd requested Zoho forwarding, and sending directly plus forwarding would create duplicate alerts. A durable outbox with per-message delivery history is a separate future phase if retries or richer status become necessary.

## Objective

For every valid saved website inquiry, send a short receipt from `Todd Kovalsky | TKO Solutions <todd@tko.solutions>` to the prospect and a useful lead brief to `todd@tko.solutions`. Route incoming Todd mail through Zoho to `t.e.kovalsky@gmail.com`, retaining the original. Preserve the lead even if either email fails.

## Scope

- Seven existing source/configuration files modified and two source/test files added; this package is one additional documentation file, for ten repository files total.
- No new directories, services, schema changes, or migrations.
- Operational configuration: ignored local environment, production hosting environment, Resend sending-domain verification, Cloudflare DNS, Zoho forwarding, and optionally Gmail sender configuration.
- Regression risk: moderate for email behavior and repeat-submission status; higher if incorrect DNS records replace existing mailbox records. Make additive DNS changes after inspecting the current zone.

## Files To Modify

Existing files:

1. `src/lib/leads/notify.ts`
2. `src/lib/leads/notify.test.ts`
3. `src/lib/leads/persist.ts`
4. `src/lib/leads/persist.test.ts`
5. `src/app/api/contact/route.ts`
6. `src/app/api/contact/route.test.ts`
7. `.env.example`

New files:

8. `src/lib/leads/email-templates.ts`
9. `src/lib/leads/email-templates.test.ts`

Package documentation:

10. `docs/implementation/TKO_RESEND_LEAD_WORKFLOW_2026_10_16.md`

Environment values must be configured outside source control. Never place the RTF key in this package, application source, screenshots, command output, or committed example configuration.

## Files To Avoid

- `prisma/schema.prisma`, migration directories, scoring, queue ranking, lifecycle and relationship derivation.
- `src/lib/offers.ts`, pricing, and claim boundaries.
- The RachelOS repository: reference only.
- Unrelated existing changes to dependencies, recording scripts, and `.gitignore`.
- Preserve the recently improved `/contact` confirmation and analytics behavior. Keep `/contact` redirects and `/api/contact` response contracts intact.

## Implementation Steps

### 1. Prepare the sending domain in Resend and Cloudflare

1. Inspect the current Cloudflare DNS records for `tko.solutions`, including Zoho MX, SPF, DKIM, and DMARC. Record the existing values for rollback.
2. In the Resend account associated with the supplied key, inspect or add the sending domain `tko.solutions`. The requested From address uses this root domain; verifying a different From subdomain alone does not establish that address.
3. Use the exact sending DNS records and priorities displayed by Resend. Typically these include DKIM plus SPF and a return-path MX at a sending subdomain such as `send`. Do not invent region-specific values or publish sample keys. Use Cloudflare's DNS-only setting for any proxy-capable email verification record.
4. Preserve Zoho's existing root MX records and authentication records. Resend's return-path MX is separate from the root mailbox MX. Do not enable Resend inbound receiving or replace Zoho with Cloudflare Email Routing for this task. Avoid multiple SPF policies at the same hostname; inspect and reconcile any existing policy at the exact host before changes.
5. Wait for Resend to report sending-domain verification. Confirm the supplied sending key permits this domain. The restricted key cannot perform domain administration; use the signed-in dashboard for those checks.

Reference: [Resend's Cloudflare setup](https://resend.com/docs/guides/dns/cloudflare), [verified domains](https://resend.com/docs/dashboard/domains/introduction), and [Cloudflare record management](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

### 2. Configure Zoho forwarding

1. Confirm Todd's current Zoho plan and organization policy support external forwarding. Zoho documents restrictions for new free-plan accounts; do not assume the feature is included or change the paid plan automatically.
2. In Zoho Mail Settings → Mail Accounts → `todd@tko.solutions` → Forwards, add `t.e.kovalsky@gmail.com`.
3. Complete Zoho's destination verification using the email delivered to Gmail. Leave “Delete original email copy after forwarding” unchecked. Verify the forwarding rule is enabled.
4. Forward all incoming Todd mailbox mail, including website alerts and prospect replies. Do not add Gmail as an additional Resend recipient or BCC, and do not create a reverse forwarding loop.
5. Send business replies from Zoho. The optional Gmail sender setup is now a temporary option only: Google's current documentation says third-party Send as ends in January 2027 and may restrict new configurations beforehand. See the walkthrough above. Forwarding remains independent of the outgoing identity.

Reference: [Zoho forwarding, verification, retention, and plan limitations](https://www.zoho.com/mail/help/email-forwarding.html).

### 3. Configure application environment

- Set `RESEND_API_KEY` from the RTF secret and `RESEND_FROM_EMAIL="Todd Kovalsky | TKO Solutions <todd@tko.solutions>"`.
- Keep `LEAD_NOTIFY_EMAIL="todd@tko.solutions"`; Gmail remains a Zoho forwarding destination.
- Make the explicit Resend From value take precedence over legacy `FROM_EMAIL`. Continue trimming all values. Replace the example `onboarding@resend.dev` sender with the intended TKO sender; keep the example key empty.
- Configure the local environment and the appropriate hosting environment independently. Changing local values does not configure production. Use the hosting platform's normal deployment process after environment changes.

### 4. Extend the shared notifier and templates

1. Add deterministic HTML and text templates with escaped user-controlled values. No AI dependency is needed.
2. Prospect receipt: From Todd, To the saved prospect email, Reply-To `todd@tko.solutions`; subject “Your request to TKO Solutions”. Thank the person, confirm receipt, and state Todd will review and reply within two business days. Do not claim a call is booked or echo the complete private intake payload. Reuse this general wording for both form types.
3. Operator brief: From Todd, To `LEAD_NOTIFY_EMAIL`, Reply-To the prospect; subject “You've got leads! — [name/company]”. Include the submitted name, company, role, email, stated problem, pressure, revenue/timing or relevant private-client inquiry fields, source, submission time, and lead ID. Include “Review lead” linking to the existing authenticated `https://tko.solutions/tif/oi/today` page. Recommend the deterministic next step “Review the request and reply within two business days”; do not invent qualification or urgency.
4. Attempt the two sends independently, with separate caught outcomes and structured logs. Missing credentials skip both. One provider rejection or timeout must not prevent the other send or escape as a persistence failure. Log lead ID, message kind, outcome and provider ID when available; never log the key or the full intake payload.
5. Preserve `notifyLead`'s existing top-level `sent` / `skipped` / `failed` contract as the outcome of Todd's operator notification. Preserve `notifiedAt` as the operator-notification acceptance timestamp. A failed prospect receipt is separately logged and must not mislabel the stored lead or suppress Todd's successful alert. This phase does not give the cockpit a separate prospect-confirmation badge.
6. Give each message its own Resend idempotency key derived from message kind, lead ID, and `lastSubmittedAt`. A repeated send attempt for the same saved submission uses the same key and payload; a genuine new submission gets new keys. Resend's protection lasts 24 hours; do not describe this as permanent deduplication or automatic retry infrastructure. [Resend idempotency reference](https://resend.com/docs/dashboard/emails/idempotency-keys).
7. Reset `notifiedAt` to null when persisting a new submission for an existing email, so an old successful alert does not make the newest attempt appear notified. Preserve existing lead upsert behavior otherwise.
8. Both existing entry points already invoke `notifyLead`; extend that shared path rather than creating separate send implementations. Strengthen `/api/contact`'s current `email.includes("@")` validation using the existing Zod dependency before enabling customer receipts. Preserve its valid-input and response contracts. Invalid requests and `/contact` honeypot submissions must send no email.

## Test Plan

- Unit tests: exact From/To/Reply-To per message, escaped template values, both intake shapes, missing optional fields, whitespace-only configuration, absent key, both successes, either send failing independently, timeout, operator persistence marking, and idempotency keys that remain stable on retry but change for a new submission.
- Persistence tests: a repeat submission clears the older `notifiedAt`.
- Endpoint tests: valid input retains the current response contract; malformed addresses are rejected before storage or email. Retain contact action redirect and form-result analytics tests.
- Run targeted lead, `/api/contact`, `/contact` action, diagnostic-form, and Today tests, followed by `npm test`, `npm run lint`, and `npm run build`. Mock Resend during automated tests.
- After verified DNS and deployment, submit a clearly labeled test inquiry using a Todd-controlled prospect inbox. Confirm the database lead, prospect receipt, Todd's Zoho alert, Gmail forwarded copy, and the Today entry. Test Reply-To in both directions and confirm a business reply sent via Zoho displays `todd@tko.solutions`. Validate actual mailbox receipt in addition to Resend acceptance. Use controlled inboxes only; do not email real prospects as a test.
- Confirm ordinary Zoho inbound mail still arrives and forwards after DNS changes. Inspect authentication results on actual messages; do not loosen DMARC or replace mailbox routing to hide a failure.
- Regression risks: duplicated sends, either channel blocking the other, stale notification status on resubmission, altered API status contracts, HTML injection, mailbox disruption, and replies accidentally exposing the Gmail identity.
- Rollback: restore only this implementation's source/configuration changes or redeploy the last known-good release; preserve unrelated working changes. Remove or disable the newly added Zoho forward if needed. Restore only DNS records changed for this task using their recorded prior values. Retain leads in Neon; disable sending rather than deleting production submissions. Provider acceptance already completed cannot be rolled back.

## Acceptance Criteria

1. Valid saved inquiries through both website capture paths independently attempt a prospect receipt and Todd's operator brief from `todd@tko.solutions`.
2. A prospect can reply to Todd, and Todd can reply to the prospect using the brief's Reply-To. Business replies sent through Zoho retain the TKO sender identity.
3. Todd receives alerts in Zoho and `t.e.kovalsky@gmail.com` through verified forwarding, with originals retained in Zoho and no duplicate direct Gmail sends.
4. Resend reports the correct sending domain verified; Zoho's mailbox routing remains functional.
5. Email failures preserve the lead and the positive saved-request experience; Todd's pending notification remains visible in Today. Prospect-receipt failures are identifiable in logs.
6. Repeat submissions cannot inherit a misleading previous notification timestamp, and retries for the same saved message use the same idempotency key.
7. Tests, lint, and production build pass. Launch verification proves receipt in the controlled inboxes; no real prospect outreach is used as a test.
8. No schema, scoring, ranking, relationship derivation, or RachelOS repository changes are introduced.
