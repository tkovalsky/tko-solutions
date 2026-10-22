# Subprocessors

Current as of October 18, 2026. Published on the product site once the Sidecar application exists; until then this list describes the pilot-1 (offline CLI) and tko.solutions configuration. Changes with 30 days' notice to clients.

## tko.solutions website and inquiry handling (today)

| Provider | Purpose | Data | Region |
|---|---|---|---|
| Vercel | Hosting, Web Analytics (no PII in events), build/deploy | Page paths, device category, campaign labels; inquiry payload in transit | United States |
| Neon (PostgreSQL) | Inquiry storage (`InboundLead`) and operator console data | Inquiry name, email, company, role, stated problem, attribution | United States |
| Resend | Prospect receipt and operator notification email | Prospect email, name, submitted fields (operator brief only) | United States |
| Zoho Mail | Business mailbox for todd@tko.solutions | Inbound and outbound business email | United States |
| Google Workspace / Gmail | Forwarding destination for the business mailbox | Copies of business email | United States |
| Cloudflare | DNS for tko.solutions | None (DNS only) | Global |
| GitHub | Source control, CI | No client data | United States |

## SidecarOS pilot 1 (offline CLI, before the application exists)

| Provider | Purpose | Data | Region |
|---|---|---|---|
| Provider device (full-disk encrypted) | Import, dedupe, lineup computation | Client export, facts, lineup | Provider premises |
| Client's CRM (Follow Up Boss / Wealthbox / other) | System of record; sends email; receives tasks and notes | Client's own data | Client's provider |
| Resend (from a Sidecar domain) | Daily lineup email to the Client's named operator only | Lineup content (names and next step) | United States |

## SidecarOS application (planned)

| Provider | Purpose | Data | Region |
|---|---|---|---|
| Vercel | Application hosting | Application traffic | United States |
| Neon | One isolated PostgreSQL project per client; control database | Client Data (encrypted at rest); client/credential/health records | United States |
| Upstash QStash | Background jobs (import, webhook re-fetch, nightly lineup, reports) | Job payloads carry tenant id and record ids only | United States |
| Resend | Lineup and operational email to the Client's personnel | Lineup content | United States |
| Anthropic (Claude API) | Fact extraction and drafting assistance | **Pseudonymized facts and redacted excerpts only; never identifiers or raw messages**; no training on API data per provider terms, confirmed contractually | United States |
| Object storage (Cloudflare R2 or Vercel Blob) | Encrypted raw imports (30 days) and export bundles | Client export files | United States |
| Stripe | Billing (from client 4) | Billing contact and payment method (Stripe-hosted) | United States |

Not used: SMS providers, dialers, data brokers, enrichment vendors, advertising platforms.
