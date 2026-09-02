# TKO Applied-AI & Technical-Fluency Evidence Ledger

**Date:** 2026-09-02
**Type:** Read-only repository audit. No files were edited to produce this.
**Authority:** `docs/TKO-2.0-STRATEGY.md`, `docs/TKO_FDE_MARKET_EVIDENCE_COMPARISON_2026_09_01.md`
**Executes:** Terra Prompt 1 of `docs/TKO_TERRA_CLAUDE_PROMPT_PACK_2026_09_01.md` — step 1 of the execution order, gating all downstream rewrites.

## Headline finding

**The applied-AI evidence is real, and it lives in a different repository than the one the site is built from.**

Two repositories matter, and conflating them is the main claim risk:

- **`tko-site`** (this repo) — the public site plus TIF/POIS. A provider sweep across `src/` and `package.json` for `anthropic`, `openai`, `langchain`, `google.generativeai`, `mistralai`, `cohere`, `ollama` returns exactly one hit: the string "generic AI consulting" in copy at `src/lib/offers.ts`. **No model integration here.** The POIS-3xx AI adapter, claim validator, and gated draft generation are written specs, not shipped code.
- **`/Users/todd/dev/rachel-realestate`** (RachelOS) — the system the public case study actually cites. It has **genuine, governed Anthropic integration**: `src/lib/ai/provider.ts` calls the Anthropic Messages API with dated model IDs, a validated known-model set, a 3s default timeout, a never-throws contract, safe JSON parse-failure handling, provider-failure classification (`api/providerFailures.ts`), rate-limit alerting (`api/providerLimitAlerts.ts`), and every external attempt recorded through `audit/auditEvents.ts` with correlation IDs.

So the applied-AI claim is **supportable** — but on RachelOS evidence, bounded to an independent single-operator system, and never as healthcare deployment.

What is unusually strong here is not that a model is called. It is **everything wrapped around the call**: `approveDraftAndSend()` records the authenticated human who approved that exact send, with an `approvalSource` discriminator and `approval.requested` / `approval.expired` audit events. Model output does not reach a recipient without a named human approval that is itself auditable. That is the governed-AI thesis TKO sells, implemented and inspectable.

The strategic consequence: TKO's public governed-AI language is currently written as **methodology** ("safe automation requires evidence, authority, confidence boundaries, exception routing, auditability"). That is accurate and should be preserved — but it now *understates* what can be evidenced. The upgrade path is to show the RachelOS mechanism, not to broaden the adjective.

> **Correction note.** An earlier draft of this ledger concluded no LLM provider existed anywhere, having swept only `tko-site`. RachelOS is a separate repository. The rows below reflect the corrected finding.

## Ledger

Status key: **V** = Verified · **A** = Supported but needs better artifact · **U** = Unverified · **P** = Prohibited / misleading

### Healthcare domain and operating model

| Claim | Status | Direct evidence | Public artifact | Supported wording | Prohibited wording | Gap | Next proof action |
|---|---|---|---|---|---|---|---|
| Healthcare payer domain depth | **V** | 4 anonymized enterprise records in `src/lib/content.ts`; `careerTimeline` in `src/lib/founder.ts` | `/healthcare`, `/selected-work`, `/founder` | "Healthcare experience spanning prior authorization, utilization management, payer and provider operations, interoperability" | Employer endorsement; naming Optum/UHC/Cognizant as clients | None material | Hold |
| Prior authorization and UM | **V** | `prior-authorization-modernization`, `provider-eligibility-modernization` records; PA insight article | `/selected-work/prior-authorization-modernization`, `/insights/prior-authorization-is-a-decision-rights-problem` | Governance, integration forums, dependency visibility, readiness oversight; downstream of the policy decision | Ownership of qualification methodology, medical policy, waiver criteria, economics models | None material | Hold |
| Workflow and operating-model design | **V** | Case records; `/approach`; `operating-model-design` offer | `/approach`, `/services/operating-model-design` | Target operating model, decision rights, controls, governance | — | None material | Hold |
| Executive communication and delivery governance | **V** | Case `role`/`intervention` fields across 4 records | `/selected-work` | Integrated planning, reporting, escalation, readiness oversight | — | None | Hold |
| Business/problem decomposition | **V** | Offer `triggers`/`boundaries` in `src/lib/offers.ts`; diagnostic structure | `/services` | Problem framing, dependency analysis, bounded scope | — | None | Hold |

### Technical and systems fluency

| Claim | Status | Direct evidence | Public artifact | Supported wording | Prohibited wording | Gap | Next proof action |
|---|---|---|---|---|---|---|---|
| Data models and system state | **V** (private) | `prisma/schema.prisma` — 1,577 lines, 11 migrations | **None** | "Designed and operate the relational data model and migration history behind a live system" | Enterprise scale; healthcare data; PHI handling | Not publicly inspectable | Publish a bounded schema-shape description, not the schema |
| Deterministic decision logic | **V** (private) | `commercial/score/`, `classify-opportunity.ts`, `lifecycle.ts`, `next-action.ts`, all with paired tests | Partially — RachelOS case | "Deterministic next actions, explicit lifecycle state machine, scored prioritization with explainability" | "AI-driven prioritization" | Mechanism named publicly but not shown | Expose one worked decision path on the RachelOS case |
| Evidence provenance / source authority | **V** (private) | `intake/extract.ts` returns spans with `startOffset`/`endOffset`; `research-gaps.ts` records what is *missing* | Weakly — "distinguish evidence from inference" | "Extracted facts carry source quotes and character offsets; unknowns are recorded as explicit gaps rather than inferred" | "AI extraction" — extraction is keyword/span matching, not a model | Strongest asset, least exposed | **Highest-value next artifact** |
| Human-in-the-loop / fail-closed controls | **V** (private) | `tif/manual-edit-protection.ts` — SHA-256 content hashing; `shouldBlockRegeneration()` blocks automated overwrite of human edits absent explicit confirmation | Weakly — "preserve human approval" | "Regeneration is blocked when a human has edited the artifact, unless explicitly confirmed" | "Human-in-the-loop AI" | Named abstractly, not demonstrated | Show the control, not the adjective |
| Testing discipline | **V** (private) | 67 test files, 387 passing tests, golden-fixture scoring tests | **None** | "Decision logic is covered by fixture tests" | Coverage percentages (unmeasured) | Not public | Optional; low buyer value alone |
| API and integration fluency | **A** | ELLKAY FHIR/Cures Act record; no integration code in repo | `/selected-work/healthcare-interoperability-platform` | "Payer-facing interoperability, CMS Cures Act, FHIR" as **product/domain** experience | Implementing FHIR services; writing integration code | Product-side evidence only | Keep bounded to product ownership |
| Observability, incidents, failure handling | **V** (private) | In `tko-site` only a spec (`POIS-306A`); **in RachelOS fully implemented** — see the applied-AI block below | RachelOS case mentions "system health" | See applied-AI block | Incident response, SLOs, on-call | Evidence is in the other repo | Source claims to RachelOS, never TIF |
| Deployment and production operations | **A** | Next.js app, Prisma migrations, live site | Implicit | "I built and operate it" | "Production engineering," scale, availability | Single-operator system | Bound explicitly to single-operator scope |
| Prototype-to-production judgment | **A** | 100+ `docs/implementation/POIS-*.md` specs showing phased slicing | **None** | "Sequenced a system in reversible increments with explicit acceptance criteria" | — | Genuinely strong, entirely invisible | Consider one artifact on the method |
| Architecture challenge / build-vs-buy | **A** | `docs/architecture/TIF_ARCHITECTURAL_RISK_REVIEW.md`, `KNOWLEDGE_ARCHITECTURE_REVIEW.md` | **None** | "Documented architecture risk reviews and scope-reduction decisions" | Enterprise architecture authority | Internal only | Low priority |
| Product ownership | **V** | ELLKAY Product Manager role; RachelOS end-to-end | `/founder`, `/selected-work` | "Product ownership translating operating requirements into workflows and controls" | — | None | Hold |

### Applied AI — the contested block

| Claim | Status | Direct evidence | Public artifact | Supported wording | Prohibited wording | Gap | Next proof action |
|---|---|---|---|---|---|---|---|
| Model integration in `tko-site` | **U** | **None.** `extract.ts` is deterministic keyword+span matching. `ai-client-adapter` (`POIS-206`), gated drafts (`POIS-304A`), claim validator (`POIS-302A`) are **specs, not shipped code** | None claimed | — | Any AI claim sourced to TIF/POIS | Total | Build, or never claim it |
| Model integration in RachelOS | **V** (private) | `rachel-realestate/src/lib/ai/provider.ts` — Anthropic Messages API, dated model IDs, validated model set, 3s timeout, never-throws, safe JSON parse handling | Weakly — "governed decision system" | "Model calls are made through a single audited wrapper with timeouts, validated model identifiers, and failure classification" | "AI platform"; healthcare deployment; scale | Not exposed | Expose as bounded mechanism |
| Human approval gating model output | **V** (private) | `leads/outreachDrafts.ts:1659` `approveDraftAndSend()`; `approvedBy` = authenticated human; `approvalSource` discriminator; `approval.requested` / `approval.expired` events | Weakly — "preserve human approval" | "No model-drafted message reaches a recipient without a named, authenticated, auditable human approval" | "Autonomous agent"; "AI sends outreach" | **Strongest single asset; least exposed** | **Highest-value next artifact** |
| Observability, incidents, failure handling | **V** (private) | `audit/auditEvents.ts` — `recordExternalAttempt`, `withAuditSpan`, `recordStateTransition`, correlation IDs; `providerFailures.ts`, `providerLimitAlerts.ts` | "system health" mention | "Every external model attempt is recorded with a correlation ID; provider failures are classified and rate-limit conditions alert" | SLOs, on-call, uptime | Named abstractly | Show the mechanism |
| Governed AI as *methodology* | **V** | `/approach` line 47 and `/healthcare` line 14 are framed as what safe automation *requires* — advice, not implementation | `/approach`, `/healthcare` | "A model call is not an operating model. Safe automation requires evidence, authority, confidence boundaries, exception routing, auditability, human review, outcome measurement" | Any shift to "I built," "I deployed," "our AI" | None — **currently correct** | **Preserve verbatim. Do not upgrade.** |
| RachelOS as governed *decision* system | **V** | Deterministic logic, state, approval, feedback all real | `/selected-work/from-crm-to-operating-system` | "Governed decision system"; "human-in-the-loop is an operating model, not an AI feature" | "AI system," "AI operating system" | Case says "distinguish evidence from inference" — *inference* invites a model reading it cannot support | **Tighten this one phrase** |
| Todd as applied-AI / ML / data-science practitioner | **P** | Contradicted by provider sweep and by `todd-profile-facts.md:40` | — | — | Building/training models; Python/PyTorch/TensorFlow; leading an ML team | — | Standing prohibition |

### Outcomes and scale

| Claim | Status | Direct evidence | Public artifact | Supported wording | Prohibited wording | Gap | Next proof action |
|---|---|---|---|---|---|---|---|
| Adoption evidence | **U** | None for enterprise work; RachelOS is single-operator | None | — | Adoption rates, user counts, satisfaction | Total | Acknowledge as gap |
| Measurable client outcomes | **U** | Case records deliberately stop at readiness/mechanism | Correctly absent | "Moved toward enterprise implementation readiness" | Savings, %, ROI, cycle-time reduction | Structural — the known weakest link | Build measurement into the next engagement |
| $12M–$20M+ portfolio magnitude | **P** | Two *separate* client program budgets ($12M Gold Card 2024, $20M est. Optum CM) aggregated as "portfolios"; `todd-profile-facts.md:34` marks this an **"Open discrepancy, unresolved"** and directs anonymizing "Optum" | Correctly absent from all of `src/` | — | Any public use | Provenance **and** re-identification risk: figures map 1:1 to named employer programs | **HOLD.** Todd is the only approver |

## Cross-cutting risks

1. **Two repositories, one story.** Every applied-AI claim must be sourced to **RachelOS**, never to TIF/POIS. The two are easy to conflate because both live under `~/dev` and both contain "governed decision system" vocabulary. Only one calls a model.

2. **Specs read as shipped.** `docs/implementation/POIS-3xx` describes an outreach gate, claim validator, AI adapter, and gated draft approval in implementation-ready detail. None are in `tko-site/src/`. Any future agent mining those docs for copy will manufacture unsupported claims. This ledger is the authority over that directory.

3. **Stale counts in circulation.** Prior session notes cite "733 passing tests, 60 migrations" for RachelOS (dated 2026-07-08). Current observation: **399 test files on disk**, but the default vitest project runs only `tests/**` — a 17-file, 161-test subset — and there are **114 SQL migration files**, no `prisma/migrations` directory. Do not publish any of these counts without re-verifying; volume metrics are weak proof anyway.

4. **The best evidence is entirely private.** The approval gate, audit spans, provider failure classification, provenance-with-offsets, hash-based edit protection — none publicly inspectable. **The FDE gap is exposure, not capability.**

5. **Two pre-existing test failures** in TIF/OI UI (`src/app/tif/oi/intake/page.test.tsx`, `src/app/tif/oi/today/page.test.tsx`), confirmed present at `ce084bc` before this branch. Inside the do-not-modify fence; noted, not touched.

## Recommendation

The FDE-aligned rewrite should **expose the governed-AI mechanism that already exists in RachelOS**. That is a stronger position than the site currently takes, and it requires no new claims — only accurate description of shipped behavior.

Sequenced smallest-first:

1. Tighten "distinguish evidence from inference" in the RachelOS record — with a real model in the loop, name where inference is *allowed* and where it is not.
2. Add a bounded mechanism section to the RachelOS case built on the approval gate and audit trail: a model drafts, a named authenticated human approves, every attempt is recorded with a correlation ID, provider failures are classified and fail closed. This is Terra Prompt 2 and it is the highest-value work available.
3. Leave `/approach` and `/healthcare` governed-AI copy as written — correct, and now backed by more than it claims.
4. Do **not** build the POIS AI adapter to support positioning. RachelOS already carries the proof.
5. Keep every claim bounded to an independent single-operator system. RachelOS never establishes healthcare compliance, enterprise scale, or client outcomes.

---

## Implementation package (later phase)

**Objective** — Convert verified-but-private governance evidence into bounded public proof, without adding a single unsupported technical or AI claim.

**Scope** — Copy and content only. No new routes, offers, prices, or categories.

**Files to modify in a later phase**
- `src/lib/content.ts` — RachelOS record: inference phrasing; mechanism evidence
- `src/app/selected-work/[slug]/page.tsx` — only if a mechanism section needs a render slot
- `docs/TKO-2.0-STRATEGY.md` — record the two-repo evidence boundary as a standing guardrail: applied-AI claims source to RachelOS only, never to TIF/POIS

**Files to avoid**
- `src/lib/opportunity-intelligence/**`, `src/lib/tif/**`, `src/app/tif/**`
- Scoring, queue ranking, lifecycle derivation, relationship-state derivation
- `prisma/schema.prisma` and migrations
- `src/app/approach/page.tsx`, `src/app/healthcare/page.tsx` — currently correct
- `docs/archive/**` as current authority

**Implementation steps**
1. Amend the RachelOS inference phrasing.
2. Draft the mechanism evidence block; verify every sentence against a named file.
3. Review against prohibited wording in this ledger.
4. Add the strategy guardrail.

**Test plan** — `npx vitest run src/lib/content.test.ts src/lib/offers.test.ts src/lib/guide-validation.test.ts`; `npm run lint`; production build; render `/selected-work/from-crm-to-operating-system` at desktop and mobile; re-run the provider sweep on `tko-site` to confirm it still returns only the `offers.ts` copy hit.

**Acceptance criteria**
- Every technical claim traces to a named file in this repository.
- No claim of agentic or autonomous behavior; model integration is claimed only for RachelOS, bounded to a single-operator system.
- RachelOS evidence limit and healthcare-boundary language preserved.
- `/approach` and `/healthcare` unchanged.
- $12M–$20M+ remains absent.
- Slug and route unchanged; the two known TIF/OI failures neither fixed nor worsened.
