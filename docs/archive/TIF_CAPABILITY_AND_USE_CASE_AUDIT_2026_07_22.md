# TIF Capability and Use-Case Audit — 2026-07-22

**Audit type:** evidence-based architecture, product, and operational audit  
**Repositories:** `tko-solutions` (TIF/TKO) and `rachel-site` (RachelDelray/RachelOS)  
**As-of date:** 2026-07-22  
**Change made by this audit:** this document only. No feature, migration, service, workflow, publication, scoring, ranking, lifecycle, or relationship-state implementation was changed.

## 1. Executive verdict

### Plain-language answer

TIF today is two related but not unified production mechanisms:

1. A persisted, human-reviewed **Evidence → Opportunity → Asset → Version → Derivative** spine with an operator console and a deterministic, file-producing CLI composer.
2. A stateless **`POST /api/tif/compose`** integration scaffold that validates a narrow set of Rachel, CRE, and business-exit page requests and returns hard-coded Markdown templates with `VERIFY` markers.

It is not a model-backed writing system, a fact-resolution service, an authentic voice engine, a publishing system, a conversation-discovery service, or a measurement system. The installed package has no model SDK dependency; the API calls deterministic template functions, and the older asset CLI explicitly says it uses template fill rather than AI (`package.json:18-32`; `src/lib/tif/draft-composer.ts:685-724`; `scripts/tif/compose-asset.mjs:1-24`). The runtime itself says publication and measurement are not persisted (`docs/TIF_RUNTIME_MODEL.md:17-33`).

### Use-case readiness

| Use case | Can it support the use case today? | Verdict |
|---|---|---|
| 1. TKO executive content | **Only with substantial human authorship and editorial work.** The evidence/asset spine, proof files, versioning, anti-slop method, and TKO publication repository are useful. The API does not support a TKO framework or TKO executive artifact; the CLI falls back to generic templates for several executive asset types. | **Implemented but incomplete** |
| 2. TKO multichannel distribution | **Draft packages only.** TIF can persist deterministic LinkedIn, Facebook, Instagram, Reddit, YouTube/video, Meta, and email derivatives linked to an asset version. It cannot discover live conversations, recommend conversation-specific comments, operate a cadence, publish, engage, or measure outcomes. | **Implemented but incomplete** |
| 3. Existing RachelDelray guide distribution | **Possible only after manual ingestion/handoff.** TIF can derive packages from a persisted TIF asset/version, and RachelOS has a smaller native derivative workflow. Neither repository currently provides a complete exact-guide-version ingestion-to-channel lineage. The TIF inventory script points at the obsolete repository name `rachel-realestate`, not the supplied `rachel-site`. | **Implemented but incomplete** |
| 4. New RachelDelray content | **A review scaffold, not publish-ready content.** Community, comparison, and relocation templates return valid structure and warnings. RachelOS can persist, review, and prepare publication. However, validated RachelOS facts are silently stripped by TIF, and changing the `voice` label does not change the Markdown. | **Implemented but incomplete** |

### Most consequential gap

The largest gap is not prose quality. It is the **truth-contract break at the cross-repository boundary**.

RachelOS retrieves approved, unexpired facts and sends `facts`, `context`, `notes`, and revision feedback (`rachel-site/src/app/api/ops/content/generate/route.ts:140-179`; `rachel-site/src/lib/content/contentFacts.ts:37-74`). TIF's Zod input schema accepts none of those fact-bearing fields and, because the object is not strict or passthrough, strips them during parsing (`src/lib/tif/draft-composer.ts:21-59,89-91`). The generated page therefore does not use the facts even though RachelOS records their IDs as if they influenced the run (`rachel-site/src/app/api/ops/content/generate/route.ts:204-236`). A direct execution check on 2026-07-22 confirmed that adding `facts`, `context`, and `notes` made **no Markdown change**. That creates false traceability and blocks safe Rachel content production.

Voice is the second consequential gap: `voice` is a validated and echoed label, not a refinement step. A direct execution check confirmed that changing `voice` from `rachel` to `consumer` made **no Markdown change** (`src/lib/tif/draft-composer.ts:704-724`).

## 2. Audit basis and method

### Governance followed

- Root `AGENTS.md`: Principal Architect mode; audit → recommendation → implementation package; no implementation; prefer the smallest extension; preserve RachelOS scoring, queue ranking, lifecycle derivation, and relationship-state derivation.
- `GOVERNANCE.md:17-24,95-127`: the narrow TIF production spine is sanctioned; graph/vector/agent/platform work remains deferred; the API is only an integration scaffold.
- `rachel-site/CLAUDE.md`: code and production evidence override planning documents; audit work stops after the report; changes to protected RachelOS decision systems are out of scope.
- `rachel-site/docs/CURRENT_STATE.md:30-40,66-81`: implemented capability must be distinguished from production authorization and observation; migration 081 and content publication remain production-unproven.

### Evidence standard

Operational code, schema, routes, tests, and safe command results were treated as primary evidence. PRDs, enum values, fixtures, and roadmap entries were not treated as proof of an operational workflow.

### Commands and results

| Check | Result | Interpretation |
|---|---|---|
| TIF focused Vitest: draft composer, derivatives, deliverables, manual-edit protection, auth, and knowledge package | **6 files passed; 49 tests passed** | The tested deterministic and registry/read-model behavior is locally usable. |
| RachelOS focused Jest: TIF generate route, GitHub publication adapter, IndexNow, robots, and SEO entity contract | **5 suites passed; 14 tests passed** | The tested consumer/publication/SEO adapters are implemented in the repository. |
| TIF repo TypeScript `tsc --noEmit` | **Failed** at `src/lib/leads/persist.test.ts:38` because `mockResolvedValue` is not available on the inferred type | Existing repo-wide test typing failure; not caused by this audit and not evidence that the focused TIF flows failed. |
| Direct compose comparison: base request vs same request plus `facts`/`context`/`notes` | **Markdown identical** | Fact-bearing RachelOS fields do not reach composition. |
| Direct compose comparison: `voice=rachel` vs `voice=consumer` | **Markdown identical** | Voice is configuration/metadata only. |

No production database mutation, live publication, external posting, or engagement action was performed.

## 3. Current architecture

### Implemented flow and boundaries

```text
Capture / source knowledge
    │  TIF CaptureItem: persisted raw intake; no promotion workflow
    │  file-based proof libraries: human-curated
    ▼
Evidence
    │  persisted in TIF; admission and linkage are human/manual
    ▼
AssetOpportunity
    │  persisted; operator or seed/script creates it
    │  deterministic CLI template fill
    ▼
Asset ───────────────► AssetVersion
    │                    persisted body snapshots
    │
    ├───────────────► DerivativeAsset
    │                    persisted deterministic channel copy
    │                    optional exact sourceVersionId
    ▼
Review / Approval
    │  TIF: RevisionRequest + freely selected status field (weak operational gate)
    │  RachelOS: governed status transition + blocking facts + approval provenance
    ▼
Publication
    │  TIF: missing record; status='published' only
    │  TKO site: human moves/commits content
    │  RachelOS: publication_jobs + reviewable GitHub PR adapter; production canary unproven
    ▼
Measurement
       TIF: missing
       RachelOS: metadata/model additions pending production deployment and ingestion
       Both: no proven asset-version → channel → visit → conversion → revenue loop
```

Evidence: `prisma/schema.prisma:140-165,207-378`; `docs/TIF_RUNTIME_MODEL.md:17-33,76-94`; `scripts/tif/compose-asset.mjs:36-170`; `src/app/tif/actions.ts:99-199`; `rachel-site/src/app/api/ops/publishing/[id]/route.ts:120-203`; `rachel-site/src/app/api/ops/publishing/[id]/publish/route.ts:50-171`.

### Transition map

| Transition | Current implementation | Nature | Where it lives |
|---|---|---|---|
| Capture/Knowledge → Evidence | `CaptureItem` may point to Evidence, but no promotion action exists. Proof YAML is curated manually. | Persisted endpoints; transition manual/missing | TIF: `prisma/schema.prisma:140-165,207-226`; `docs/TIF_RUNTIME_MODEL.md:21-22` |
| Evidence → Opportunity | Join model exists. Operator opportunity creation does not accept evidence IDs; linkage comes through other/manual data operations. | Persisted; manual | TIF: `prisma/schema.prisma:228-257`; `src/app/tif/actions.ts:66-97` |
| Opportunity → Asset | CLI reads opportunity/evidence, fills a template, writes a file, upserts Asset, creates Version and evidence links. | Persisted + deterministic | TIF: `scripts/tif/compose-asset.mjs:36-170` |
| Asset → Asset Version | Every CLI composition creates a version. Manual edits are protected by overwrite checks. | Persisted | TIF: `prisma/schema.prisma:326-353`; CLI above |
| Asset Version → Derivative Package | Operator action takes latest version and deterministically creates channel copy; source version is stored. | Persisted + deterministic + manual trigger | TIF: `src/app/tif/actions.ts:139-199`; `src/lib/tif/content-workflow.ts:184-492` |
| Review → Revision | Human creates `RevisionRequest`; next compose applies it and records a new version. | Persisted + manual | TIF: `src/app/tif/actions.ts:99-122`; `prisma/schema.prisma:326-353` |
| Review → Approval | TIF form directly writes any lifecycle status. There is no actor, timestamped approval decision, transition graph, or fact-blocking gate. | Persisted field; operationally incomplete | TIF: `src/app/tif/assets/[slug]/page.tsx:215-240`; `src/app/tif/actions.ts:124-137` |
| Approval → Publication | TIF has no Publication model. TKO publication is a repository operation. RachelOS can create publication jobs and reviewable GitHub PRs. | Missing in TIF; manual in TKO; implemented but unproven in RachelOS | TIF: `docs/TIF_RUNTIME_MODEL.md:31`; RachelOS routes cited above |
| Publication → Measurement | No TIF model/action. RachelOS migration 081 adds lifecycle/performance/attribution metadata, but production application and ingestion remain pending. | Missing/unproven | TIF: `docs/TIF_RUNTIME_MODEL.md:32`; RachelOS: `migrations/081_canonical_operating_system.sql:120-220`; `docs/CURRENT_STATE.md:77-81` |

### Reconciliation with “Framework × Artifact × Voice → Composer”

The documented expression is only partially real:

| Element | Actual state |
|---|---|
| Framework | A validated enum and branching key for four API frameworks. No persisted Framework registry (`src/lib/tif/contract.ts:7-28`; `docs/TIF_RUNTIME_MODEL.md:33`). |
| Artifact | A validated enum; selects one of community, comparison, relocation, or commercial hard-coded templates (`src/lib/tif/draft-composer.ts:3-19,704-710`). |
| Voice | A validated enum returned in the response. It does not select a corpus, prompt, ruleset, or refinement function (`src/lib/tif/draft-composer.ts:19,712-724`). |
| Composer | There are two operational composition surfaces, not one unified composer: the stateless API page composer and the persisted Opportunity/Asset CLI composer. They have different inputs, artifact taxonomies, outputs, and persistence (`src/lib/tif/execution.ts:1-41`; `scripts/tif/compose-asset.mjs:1-170`). |
| Fact Resolution | Documented in the target flow but absent from the API execution scaffold. Current runtime is explicitly only Payload → Validation → Run → Draft → Response (`src/lib/tif/execution.ts:1-14`). |

Therefore the accurate current formula is:

```text
API: validated framework + artifact + voice label + allowed scalar inputs
     → deterministic template → stateless Markdown response

Operator: persisted Opportunity + linked Evidence + revision requests
          → deterministic file template → Asset + AssetVersion + lineage
```

## 4. Capability matrix

Each row uses exactly one required status.

| Capability | Status | User entry point | Implementation evidence | Inputs → outputs | Persistence / traceability / review | Current limitation | Roadmap |
|---|---|---|---|---|---|---|---|
| Capture inbox | Implemented but incomplete | `/tif/inbox` | `src/app/tif/inbox/page.tsx:37-120`; `actions.ts:8-70` | Raw title, source, notes, links → CaptureItem | Capture persisted; optional Evidence pointer; manual review | No edit, classification, deduplication, or promotion workflow | P2 only if pilot volume proves need |
| Cross-repo content inventory | Deprecated or conflicting | `/tif/inventory`; `npm run tif:inventory` | `src/app/tif/inventory/page.tsx:30-40`; `scripts/tif/inventory-scan.mjs:13-16,52-208` | Repository files → flat ContentInventoryItem rows | Persisted discovery only; explicitly not lineage | Hard-coded Rachel path is `../rachel-realestate`, but governed repo is `../rachel-site`; scan scope is partial | P0 correct path/config and label inventory as discovery |
| Evidence registry | Implemented and usable | `/tif`; Prisma/operator data | `prisma/schema.prisma:207-226`; `src/app/tif/page.tsx:218-255` | Observation + proofRef + claimGuard → Evidence | Persisted; linkable to opportunities/assets; human admission | Structured freshness/status/boundary model is thinner than file proof conventions | P0 use existing Evidence for TKO pilot; no generic fact platform |
| Evidence quality method | Implemented and usable | Human asset method | `asset-production/METHOD.md:88-136,139-185` | Resolved proof references + claim guards → admissible claim set | File/process traceability; hard human checklist | Enforcement is human, not a runtime blocker | P0 encode only minimum compose boundary checks |
| Opportunity registry | Implemented but incomplete | `/tif` opportunity form | `prisma/schema.prisma:228-257`; `src/app/tif/actions.ts:66-97` | Business unit, asset type, audience, title, angle → AssetOpportunity | Persisted; join model supports Evidence | UI creation does not attach evidence; no discovery-to-opportunity promotion | P1 pilot uses manual evidence linkage |
| Asset generation (operator/CLI) | Implemented but incomplete | `/tif` Generate; `tif:compose` | `src/app/tif/actions.ts:28-64`; `scripts/tif/compose-asset.mjs:1-170` | Opportunity + evidence + revisions → Markdown file + Asset | File, Asset, Version, Evidence links persisted | Deterministic placeholders; landing/executive/comparison types use a generic fallback; not authentic model-backed prose | P1 use one narrow, human-authored TKO asset |
| Asset generation (`POST /api/tif/compose`) | Implemented but incomplete | Authenticated API; RachelOS content generate route | `src/app/api/tif/compose/route.ts:7-46`; `src/lib/tif/draft-composer.ts:685-724` | Narrow request → Markdown/warnings/path | Stateless in TIF; RachelOS persists returned Markdown | No facts, true voice, TKO framework, or durable TIF run/draft | P0 align truth contract; P2 consider durable run only after pilots |
| Asset versions | Implemented and usable | CLI/operator asset detail | `prisma/schema.prisma:326-343`; `src/app/tif/assets/[slug]/page.tsx:30-65,122-205` | Generated body + note → immutable numbered version | Persisted; diffs shown; derivatives can link exact version | API drafts are not TIF AssetVersions | P1 use version as pilot lineage anchor |
| Revisions | Implemented and usable | Asset detail revision form | `src/app/tif/actions.ts:99-122`; `prisma/schema.prisma:345-353` | Human request → queued/applied revision | Persisted; application captured on next version | Revision application is template-level, not model editing | P1 human edit/review remains authoritative |
| Approval in TIF | Implemented but incomplete | Asset status form | `src/app/tif/assets/[slug]/page.tsx:215-240`; `src/app/tif/actions.ts:124-137` | Selected status → Asset.status | Status persisted; no durable approval event | Any allowed status can be written directly; no reviewer identity, fact gate, or destination | P1 manual checklist; P2 publication record/provenance |
| Approval in RachelOS | Implemented but incomplete | Content Board and publishing API | `rachel-site/src/app/api/ops/publishing/[id]/route.ts:120-203`; publish route `:50-71` | Governed transition + blocking-fact state → approval/publish eligibility | Audit/stage events in migration 081 | Migration/deployment/production use pending (`docs/CURRENT_STATE.md:77-81`) | P0 production validation; do not alter lifecycle derivation |
| Knowledge diagrams | Implemented and usable | Asset detail/read models | `prisma/schema.prisma:287-324`; `docs/TIF_RUNTIME_MODEL.md:27-28` | Typed diagram + source → diagram linked to Asset | Persisted and deployed; parent Asset owns lifecycle | No automatic diagram generation and not needed for content pilots | Deferred unless a pilot asset needs a specific diagram |
| Derivative channel packages | Implemented but incomplete | Asset detail derivative form | `src/app/tif/actions.ts:139-199`; `src/lib/tif/content-workflow.ts:184-492`; `src/lib/tif/content-workflow.test.ts:29-177` | Source AssetVersion + channel brief → channel body/context/strategy | Persisted with optional exact source version; human trigger | Template adaptation, not voice refinement; no live channel validation, discovery, posting, or results | P1 LinkedIn + Reddit only |
| RachelOS native derivatives | Implemented but incomplete | `/api/ops/publishing/[id]/derivatives` | `rachel-site/src/app/api/ops/publishing/[id]/derivatives/route.ts:71-136`; `src/lib/content/derivatives.ts:1-250` | Approved/published content + type → child content item/version | Persisted child and metadata | Only LinkedIn, Facebook, email, executive summary, ad concept; exact parent version is not durable lineage | Rachel pilot: add source version reference before expanding types |
| API contract/authentication | Implemented and usable | `POST /api/tif/compose` | `src/app/api/tif/compose/route.ts:7-46`; `src/lib/tif/contract.ts:7-62` | Bearer/x-header JSON → 200/400/401 JSON | No TIF persistence; IDs ephemeral | Documentation response example omits runtime IDs/status | P0 update canonical contract doc after code alignment |
| Voice selection | Modeled but not operational | `voice` request field; derivative context form | `src/lib/tif/draft-composer.ts:19,685-724`; `src/app/tif/assets/[slug]/page.tsx:269-425` | Voice label → echoed metadata | No corpus, evaluation, or transformation persisted | Direct check: Rachel and consumer Markdown identical | P0 approved corpus manifest + evaluation gate |
| Actual voice refinement | Documented roadmap only | None | `ENGINEERING_BACKLOG.md:1748-1759`; `src/lib/tif/execution.ts:12-14` | Intended draft + voice rules → refined draft | None | No model call or deterministic voice transform | P0/P1 human refinement; model-backed refinement only if later authorized |
| Canonical fact resolution | Documented roadmap only | None in TIF compose | `ENGINEERING_BACKLOG.md:1731-1746,1816-1835`; roadmap `:1852-1918` | Intended claim request → approved/fresh fact | TIF has Evidence, not a canonical fact resolver | RachelOS validated facts are stripped from TIF input; warnings are not resolution | P0 contract alignment using existing RachelOS facts and TIF Evidence |
| Fact warnings / `VERIFY` | Implemented but incomplete | Compose response and Markdown | `src/lib/tif/draft-composer.ts:169-209,212-565,692-702` | Missing values → warnings and `VERIFY` markers | Only returned/persisted downstream; human review required | Generic warning is not claim-level proof, freshness, or blocker; some `VERIFY` text can survive to draft | P0 fail closed for required claims before approval |
| SEO/page scaffold | Implemented but incomplete | Compose API → target content repository | `src/lib/tif/draft-composer.ts:169-197,721-723` | Inputs → frontmatter, headings, internal link list, suggested path | Stateless; target repo owns final page | No canonical, JSON-LD, intent brief, entity/source freshness fields, sitemap registration, or route validation | P0 define target-repo page contract; P1 validate one page end to end |
| TKO target-repo SEO | Implemented but incomplete | `/insights/[slug]`; sitemap/robots | `src/app/insights/[slug]/page.tsx:22-75,75-127`; `src/app/sitemap.ts:6-27`; `src/app/robots.ts:4-13` | Insight content → metadata, Article schema, sitemap, CTA | Repository/deploy persistence | No automatic compose handoff; schema is basic; sitemap dates are hard-coded | P1 manual publish and technical validation |
| Rachel target-repo SEO | Implemented and usable | `/guides/[slug]`; sitemap; IndexNow workflow | `rachel-site/src/app/guides/[slug]/page.tsx:56-97,451-506,913-929`; `src/app/sitemap.ts:53-135,248-265`; `src/lib/seo/indexNow.ts:80-155` | Registered guide → canonical, OG, Article/Breadcrumb/FAQ schema, sitemap, changed-URL submission | Repository/deploy persistence; tests pass | Search Console/Bing ownership, crawling, and indexing are external observations; new content still requires loader/inventory inclusion | Rachel pilot uses this existing publication surface |
| Publication record in TIF | Modeled but not operational | Asset status selector only | `prisma/schema.prisma:37-65`; `docs/TIF_RUNTIME_MODEL.md:31` | Status choice → `published` flag | No destination, URL, release, reviewer, version, or timestamp record | Status is not a publication workflow | P2 add smallest publication record only after pilots |
| Automated publishing/engagement | Documented roadmap only | None authorized | `docs/CONTENT_PIPELINE_ROADMAP.md:53-79`; governance `:120-127` | N/A | None | Explicitly deferred/not authorized | Non-goal |
| Measurement and attribution in TIF | Documented roadmap only | None | `docs/TIF_RUNTIME_MODEL.md:32`; `ENGINEERING_BACKLOG.md:2157-2177` | Intended publication/outcomes → feedback | None | No asset/channel/outcome record or analytics ingestion | P1 manual measurement sheet/record; P2 smallest persisted linkage |

## 5. Real `POST /api/tif/compose` reference

### Endpoint and authentication

`POST /api/tif/compose`

- Accepted authentication: `Authorization: Bearer <TIF_ACCESS_KEY>` or `x-tif-access-key: <TIF_ACCESS_KEY>`.
- Server secret: `TIF_ACCESS_KEY`.
- If the server secret is absent, authentication fails closed.
- Missing/wrong credentials return HTTP 401 with `{ "ok": false, "error": "Unauthorized" }`.

Evidence: `src/app/api/tif/compose/route.ts:7-23`; `docs/TIF_RACHEL_DRAFT_API.md:29-45`.

### Supported values

**Frameworks:** `rachel_community`, `rachel_relocation`, `cre_tenant_rep`, `business_exit`.

**Artifacts:** `community_page`, `comparison_page`, `comparison_guide`, `relocation_guide`, `cre_area_page`, `cre_neighborhood_page`, `cre_corridor_page`, `cre_medical_cluster_page`, `cre_site_report`, `cre_corridor_comparison`, `tenant_rep_guide`, `business_exit_guide`, `transferability_assessment_page`.

**Voices:** `rachel`, `consumer`, `todd`, `commercial_operator`.

The `voice` field defaults to `rachel`, but it does not currently change output content (`src/lib/tif/contract.ts:7-28`; `src/lib/tif/draft-composer.ts:19,704-724`).

### Accepted request fields

Top level: `framework`, `artifact`, optional `voice`, and `inputs`.

Accepted `inputs` are only:

`title`, `slug`, `community`, `communities`, `county`, `city`, `area`, `budget`, `originMarket`, `origin_market`, `destinationMarket`, `destination_market`, `targetSegments`, `tags`, `internalLinks`, `market`, `corridor`, `corridors`, `neighborhood`, `medicalCluster`, `siteName`, `address`, `operatorType`, `businessType`, `leaseHorizon`, `exitHorizon`, `fieldObservations`, `licenseStatus`, `brokerageName`, `licensedReferralPartner` (`src/lib/tif/draft-composer.ts:21-59`).

`facts`, `context`, `notes`, `knownFacts`, `operatorNotes`, `revisionFeedback`, `contentType`, `persona`, `funnelStage`, and `targetUrl` are not accepted and are silently removed during parsing. This is a contract defect, not an optional feature.

### Semantic validation

- `rachel_relocation` can only compose `relocation_guide`.
- `rachel_community` cannot compose relocation or commercial artifacts.
- CRE and business-exit artifacts require their matching framework and `inputs.market`.
- Community pages require `inputs.community`.
- Rachel community drafts require `inputs.county`.
- Community comparisons require at least two `inputs.communities`.
- Corridor comparisons require at least two `inputs.corridors`.
- Relocation requires origin and destination market.

Evidence: `src/lib/tif/draft-composer.ts:105-167`.

### Responses

**HTTP 200:**

```json
{
  "runId": "run_<24 hex characters>",
  "draftId": "draft_<24 hex characters>",
  "status": "draft",
  "ok": true,
  "framework": "rachel_community",
  "artifact": "community_page",
  "voice": "rachel",
  "slug": "...",
  "title": "...",
  "markdown": "---\n...",
  "warnings": ["..."],
  "suggestedPath": "src/content/guides/<slug>.md"
}
```

**HTTP 400, schema validation:**

```json
{
  "ok": false,
  "error": "Invalid compose payload",
  "issues": [
    { "code": "...", "path": ["..."], "message": "..." }
  ]
}
```

**HTTP 400, semantic validation:** `{ "ok": false, "error": "<joined semantic error>" }`.

**HTTP 401:** `{ "ok": false, "error": "Unauthorized" }`.

Evidence: `src/app/api/tif/compose/route.ts:17-46`; `src/lib/tif/execution.ts:28-41`.

### `VERIFY`, warnings, paths, and persistence

- Rachel drafts always return two broad warnings covering pricing, HOA, tax, amenities, inventory, unsupported claims, and `VERIFY` markers (`src/lib/tif/draft-composer.ts:692-702`).
- Templates deliberately insert `VERIFY` placeholders where required facts are unavailable (`src/lib/tif/draft-composer.ts:169-565`).
- Suggested paths are `src/content/guides/<slug>.md` for Rachel and `src/content/commercial/<slug>.md` for commercial artifacts (`src/lib/tif/draft-composer.ts:721-723`).
- The API does **not** write that path.
- `runId` and `draftId` are random in-memory response IDs and are **not persisted in TIF**; no Run/Draft record is created (`src/lib/tif/execution.ts:12-14,20-41`).
- The API does not persist a source reference, request, response, warning acceptance, or draft.
- RachelOS does persist returned Markdown as `content_versions` and the IDs/warnings/fact IDs as task metadata (`rachel-site/src/app/api/ops/content/generate/route.ts:193-236`). That downstream record does not repair the fact-input omission.

### Sanitized examples

All names and values below are illustrative. Markdown is abbreviated only for readability.

#### Valid Rachel community-page request

```http
POST /api/tif/compose
Authorization: Bearer <redacted>
Content-Type: application/json

{
  "framework": "rachel_community",
  "artifact": "community_page",
  "voice": "rachel",
  "inputs": {
    "community": "Illustrative Community",
    "county": "Palm Beach County",
    "city": "Illustrative City",
    "internalLinks": ["illustrative-guide"]
  }
}
```

Illustrative response shape using the actual composer output:

```json
{
  "runId": "run_0123456789abcdef01234567",
  "draftId": "draft_89abcdef0123456789abcdef",
  "status": "draft",
  "ok": true,
  "framework": "rachel_community",
  "artifact": "community_page",
  "voice": "rachel",
  "slug": "illustrative-community-community-guide",
  "title": "Illustrative Community: Community Guide for Buyers",
  "markdown": "---\ntitle: \"Illustrative Community: Community Guide for Buyers\"\n...\n## What Buyers Should Know First\n... VERIFY ...",
  "warnings": [
    "Pricing, HOA, tax, amenity, and inventory claims must be verified before publishing.",
    "This draft intentionally avoids unsupported claims and leaves VERIFY markers where source facts are needed."
  ],
  "suggestedPath": "src/content/guides/illustrative-community-community-guide.md"
}
```

#### Valid Rachel comparison-guide request

```json
{
  "framework": "rachel_community",
  "artifact": "comparison_guide",
  "voice": "rachel",
  "inputs": {
    "communities": ["Illustrative Community A", "Illustrative Community B"],
    "county": "Palm Beach County",
    "internalLinks": ["illustrative-hub"]
  }
}
```

Illustrative response excerpt:

```json
{
  "runId": "run_aaaaaaaaaaaaaaaaaaaaaaaa",
  "draftId": "draft_bbbbbbbbbbbbbbbbbbbbbbbb",
  "status": "draft",
  "ok": true,
  "framework": "rachel_community",
  "artifact": "comparison_guide",
  "voice": "rachel",
  "slug": "illustrative-community-a-vs-illustrative-community-b",
  "title": "Illustrative Community A vs. Illustrative Community B: A Practical Buyer Comparison",
  "markdown": "---\n...\n## The Short Version\n... VERIFY ...",
  "warnings": ["...same two Rachel warnings..."],
  "suggestedPath": "src/content/guides/illustrative-community-a-vs-illustrative-community-b.md"
}
```

#### Invalid request

```json
{
  "framework": "rachel_community",
  "artifact": "comparison_guide",
  "voice": "rachel",
  "inputs": {
    "communities": ["Only One Community"],
    "county": "Palm Beach County"
  }
}
```

HTTP 400:

```json
{
  "ok": false,
  "error": "comparison drafts require inputs.communities with at least two communities."
}
```

#### CLI/operator-console asset production

Prerequisite: a persisted Opportunity and linked Evidence in the configured TIF database.

```bash
npm run tif:compose -- illustrative-opportunity-slug
```

Equivalent UI action: `/tif` → select/generate the opportunity. Expected effect: the script fills the chosen template, writes `asset-production/generated/<asset-slug>.md`, upserts `Asset`, creates `AssetVersion`, stores Asset–Evidence links, marks the opportunity composed, and applies open revision requests (`src/app/tif/actions.ts:28-64`; `scripts/tif/compose-asset.mjs:36-170`). It does not approve or publish.

## 6. Four use-case walkthroughs

### 6.1 TKO executive content

**Current happy path:** human selects admitted proof → creates/links a TKO Opportunity → generates a template scaffold → human writes/refines the actual executive asset using the evidence/claim guards → records revisions and approval status → manually adds the final article/page to the TKO publication repository → commits/deploys → manually records channel URLs and outcomes elsewhere.

**Concrete example input:** a healthcare Opportunity titled “Why prior-authorization modernization stalls at exception ownership,” aimed at VP Operations/COO/CIO buyers, linked to `healthcare:prior-auth-decision-rights` and `healthcare:human-api-root-pattern`, with CTA to the Prior Authorization Performance Diagnostic.

**Expected output:** an evidence-backed insight with symptom-language title, clear buyer decision job, cited evidence trail, no named client/unsupported metric, relevant internal links, Article metadata/schema, and one diagnostic CTA. The existing article demonstrates the desired proof pattern (`src/content/insights/prior-authorization-is-a-decision-rights-problem.md:1-75`).

**What TIF handles:** Evidence, Opportunity, Asset, Version, revision, derivative persistence, deterministic scaffolding, and traceability.

**What the publication repository handles:** route rendering, metadata, canonical URL, Article JSON-LD, sitemap, related links, CTA, build, and deployment (`src/app/insights/[slug]/page.tsx:22-127`; `src/app/sitemap.ts:6-27`).

**Manual work:** research admission, executive angle, narrative, real TKO voice, claim-level edit, anti-slop review, approval, repository handoff, publication, Search Console observation, and conversion review.

**Missing capability:** no TKO API framework, no model-backed prose/voice refinement, generic fallback templates for executive artifacts, no publication/measurement record.

**Risks:** advisory experience can be mistaken for measured client proof; generic category language can hide the offer; repeated AI cadence can erode executive trust; unsupported metrics create legal/reputation risk. The existing anti-slop audit identifies symptom language, offer clarity, and proof specificity as more important than polished abstraction (`docs/TKO_ANTISLOP_AUDIT.md:9-23,170-182`).

**Smallest change:** do not add a platform. Use the existing TIF Asset spine for one prior-auth executive insight, require resolved evidence IDs and the existing hard checklist, manually publish it, then create only LinkedIn and Reddit packages with tracked destinations.

### 6.2 TKO multichannel distribution

**Current happy path:** open an approved TIF Asset → select derivative type → enter audience/objective/CTA/tracked destination/privacy/channel notes → generate deterministic copy from the latest AssetVersion → human edits and approves → human publishes in the native channel.

**Concrete example input:** source AssetVersion for the prior-auth article; LinkedIn audience “VP Operations and CIO leaders with an active modernization initiative”; objective “earn a diagnostic conversation”; CTA `/services/diagnostic?utm_source=linkedin&utm_campaign=pa-decision-rights`; privacy “no employer or client names.”

**Expected output:** a LinkedIn post, carousel brief, and Reddit draft that each stand alone, retain the claim boundary, and point to the exact source version. TIF can generate several channel forms (`src/lib/tif/content-workflow.ts:245-380`).

**What TIF handles:** persisted deterministic derivative bodies, brief context, behavioral strategy, and optional source version.

**What the publication repository handles:** the canonical source page only. Native social systems remain the publication destination.

**Manual work:** community selection, live conversation discovery, reading the thread, deciding whether to participate, writing a context-specific comment, disclosing affiliation where appropriate, posting, replying, relationship judgment, and capturing results.

**Missing capability:** no conversation discovery, live thread record, comment recommendation tied to a real conversation, sustainable cadence, publication record, or outcome capture. A generic Reddit derivative is not community-specific participation guidance.

**Risks:** repetitive cross-posting, link-first participation, undisclosed commercial interest, automation, and off-context comments create spam/authenticity/reputation risk.

**Smallest change:** for the pilot, generate only LinkedIn and Reddit packages; add a human-owned worksheet/record containing source version, target conversation URL, community rules checked, proposed comment, disclosure, decision, posted URL, and outcome. Do not automate posting, voting, following, commenting, or messaging.

### 6.3 Existing RachelDelray guide distribution

**Current happy path:** a human identifies an approved guide/version → manually represents it as a TIF AssetVersion or uses RachelOS's derivative endpoint → drafts channel variants → Rachel checks factual/privacy/voice boundaries → Rachel publishes manually → URLs/outcomes are recorded manually.

**Concrete example input:** exact approved version of an illustrative “Community A vs Community B” guide, including canonical URL, version ID/hash, approved facts, prohibited claims, audience, and low-pressure CTA.

**Expected output:** Facebook, Instagram, LinkedIn, Reddit, short-video script/shot list, email next touch, Meta concept, and conversation opportunities, each carrying the source guide/version and fact boundary.

**What TIF handles:** a broader set of derivative formats than RachelOS once the guide exists as a TIF AssetVersion.

**What RachelOS handles:** source content versions, human review/approval, a smaller derivative set, content items/tasks, publication eligibility, and repository publication (`rachel-site/src/app/api/ops/publishing/[id]/derivatives/route.ts:71-136`; `src/lib/content/derivatives.ts:1-250`).

**Manual work:** source ingestion, exact version selection, channel/community research, fact freshness check, Rachel voice edit, visual production, native posting, and outcome capture.

**Missing capability:** no operational “ingest existing guide version” workflow; TIF's inventory path is stale; RachelOS derivatives do not persist the exact parent source version; TIF and RachelOS derivative records are not reconciled.

**Risks:** stale prices/HOA/availability, source drift, accidental housing targeting or privacy violations, repeated generic posts, and derivative facts outliving their guide facts.

**Smallest change:** configure the real `rachel-site` path and implement one explicit handoff manifest—not content migration—with canonical URL, repository path, version/hash, fact IDs/versions, approval owner/date, and permitted derivative claims. Pilot one guide only.

### 6.4 New RachelDelray content

**Current happy path:** create a RachelOS content item with communities and validated facts → request a TIF community/comparison/relocation draft → RachelOS persists the Markdown/version/task and moves it to review → human replaces/verifies `VERIFY` values and edits for voice → governed approval → RachelOS creates a reviewable publication job/PR → build/deploy/SEO systems render it.

**Concrete example input:** comparison of two illustrative Palm Beach County communities for seasonal buyers, using approved facts for HOA structure, housing types, location, amenities, and exact verification dates.

**Expected output:** a guide that explains fit and tradeoffs, contains only verified facts, uses Rachel's recognizable short/direct style, links to related guides, provides canonical metadata and valid schema through the target repository, and ends with a low-pressure CTA.

**What TIF handles:** page structure, slug/title/frontmatter scaffold, standard sections, broad warnings, and `VERIFY` placeholders.

**What RachelOS handles:** content brief/item, validated-fact retrieval, returned version/task persistence, fact-usage metadata, candidate-fact extraction, review lifecycle, publication adapter, guide loader, metadata/schema, sitemap, and IndexNow.

**Manual work:** fix the current fact-contract break, verify every local claim, select internal links, authentic voice edit, fair-housing/privacy review, approval, image/alt text, loader/route validation, and external indexing observation.

**Missing capability:** compose does not consume validated facts; voice label has no effect; canonical/page schema fields are target-repo concerns; no automated proof that generated slug is loader-registered; publication production canary is unproven.

**Risks:** fabricated or stale pricing/HOA/inventory/school claims, fair-housing implications, apparent first-person experience that Rachel did not supply, duplicated pages, schema/content mismatch, and indexable `VERIFY` placeholders.

**Smallest change:** align the request schema so claim-level approved facts and their versions actually reach composition; reject unknown fact-bearing fields; require zero unresolved publish-blocking claims; then pilot one comparison guide through Rachel review and manual publication.

## 7. Voice and anti-slop assessment

### Strongest existing voice sources

**Rachel candidate corpus**

1. `rachel-site/docs/gpt/rachel-voice-reference.md:1-81` — current explicit tone, paragraph, phrase, and anti-hype rules. It is a configuration document, not evidence that TIF uses it.
2. Human-approved, currently published Rachel guides. These should become the primary corpus once Rachel identifies the 5–10 canonical examples.
3. `rachel-site/docs/archive/voice-analysis-report.md:1-18,22-54,57-90,93-147,200-218` — useful measured patterns from nine pages, but explicitly historical and therefore a candidate input, not current authority.

**TKO candidate corpus**

1. `content/selected-work/rachelos-from-crm-to-operating-system.md:12-30,42-72,74-120` — specific operational narrative, explicit limits on outcomes, and strong executive argument.
2. `src/content/insights/prior-authorization-is-a-decision-rights-problem.md:15-75` — direct healthcare argument, specific operational questions, offer continuity, and an evidence trail.
3. `asset-production/METHOD.md:88-185` — evidence/claim/anti-slop constraints.
4. `docs/TKO_ANTISLOP_AUDIT.md:9-23,27-65,170-182` — negative examples and buyer-level standards.

The approved TKO author is **Unknown—requires validation**. The repository contains `todd`, `commercial_operator`, and `tko-advisory` labels but no approved-corpus manifest or owner decision.

### Does TIF have a genuine voice system?

No. It has voice labels/configuration. There is no corpus retrieval, style feature extraction, example selection, transformation pass, model call, persisted voice version, evaluation score, or acceptance gate. Prompt/configuration instructions alone would not establish authentic voice even if a model call existed.

### Measurable voice-quality contract

Before any model-backed refinement is authorized, define a versioned contract per voice:

| Contract element | Required measure |
|---|---|
| Approved corpus | 5–10 named, versioned, human-approved pieces; owner, approval date, allowed use, and exclusions recorded. No historical analysis promoted without owner approval. |
| Vocabulary | Versioned prefer/avoid lists; zero forbidden hype/pressure phrases in final; reviewer may explicitly waive with reason. |
| Sentence/paragraph tendency | Report median sentence length and paragraph length against corpus range; flag, do not blindly normalize, outliers. |
| First-person experience | Every first-person experiential statement maps to a corpus excerpt or explicit author-supplied note; otherwise rewrite in non-experiential form. |
| Evidence density | Every material factual/quantitative claim has an evidence ID/source/version; TKO executive assets include an evidence trail; Rachel factual blocks include freshness/verification. |
| Specificity | Human reviewer scores 1–5 for named buyer problem, concrete tradeoff, decision usefulness, and earned next step; minimum 4 in each. |
| Unsupported-claim prevention | Zero unresolved blocking claims, fabricated examples presented as real, unsupported metrics, or unapproved property/community assertions. |
| Repetition/cliché | Automated phrase overlap and forbidden-phrase scan; no repeated generic tricolon/category sentence across sections; human can distinguish intentional signature phrase from templated repetition. |
| Human editorial review | Rachel approves Rachel voice; approved TKO owner approves TKO voice. Reviewer identity, source version, decision, and notes are retained. |
| Sample comparison | Blinded comparison against at least three approved human samples; two reviewers score voice resemblance, specificity, trust, and decision usefulness. Release threshold: median ≥4/5 and no safety/claim failure. |

Voice quality is a release gate, not a generated confidence score.

## 8. SEO, GEO, and discoverability

### Current ability

| Requirement | TIF generation | TKO repository | Rachel repository | Verdict |
|---|---|---|---|---|
| Search intent / buyer decision job | Not explicit in compose contract | Strong in selected current insight; inconsistent across site according to anti-slop audit | Several guide templates encode buyer tradeoffs | Human brief required |
| Metadata / canonical | Basic title/description frontmatter only | Canonical/OG on insight route | Canonical/OG/Twitter on guide route | Target repository owns it |
| Structured data | None | Basic Article JSON-LD | Article + Breadcrumb + conditional FAQ | Implemented downstream |
| Sitemap | Suggested file path only | Insight slugs included | Published/loader-included guides included | Manual handoff required |
| IndexNow | None | None found | Implemented post-CI changed-URL workflow | Rachel only; receipt is not indexing |
| Internal linking | Accepts list but does not validate destination | Related insights and CTA | Guide links/hubs and categories | Incomplete contract validation |
| Topic/entity coverage | No entity/topic model in compose | Editorial/manual | Rich site entities; not driven by TIF | Brief/editorial function |
| Citations/freshness | Warnings/`VERIFY`, no claim sources | Evidence trails possible in content | RachelOS has fact versions, but TIF ignores the payload | Blocked at compose boundary |
| Comparison/guide clusters | Rachel comparison templates | Not a TKO API feature | Guide/category/area structure exists | Rachel stronger |
| Executive commercial intent | No TKO API framework | Current diagnostic CTA exists | Not applicable | TKO pilot should use symptom + offer continuity |
| CTA/offer continuity | Fixed generic Rachel CTA; commercial templates vary | Current insight links to diagnostic | Guide routes include Rachel contact CTAs | Must be brief-specific and reviewed |

### Authoritative current requirements

- Google recommends helpful, reliable, people-first content with original value, clear sourcing, first-hand expertise where relevant, and cautions against extensive automation made primarily to attract search traffic. TIF's evidence-first method aligns; generic template multiplication does not. [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google states that its AI search features require no special “GEO” markup or AI file. The same fundamentals apply: indexable pages, accessible text, useful internal links, good page experience, and structured data that matches visible content. [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Article markup can help Google understand title, image, dates, and author; it does not guarantee a search feature. [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- Structured data must represent visible page content and follow feature guidelines. This matters because generated FAQ/schema cannot safely claim more than the reviewed page. [Google: Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- A sitemap should contain absolute canonical URLs and is a discovery hint, not a guarantee of crawling or indexing. [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- IndexNow HTTP success means receipt, not guaranteed indexing. [IndexNow protocol documentation](https://www.indexnow.org/documentation)

### Assessment

Generated content can support search and AI-search discovery **after** human fact/voice refinement and target-repository integration. TIF itself does not deliver SEO/GEO readiness. The safest strategy is not “write for AI”; it is to answer a specific decision, show source-backed tradeoffs, expose authorship and freshness, connect related pages, and make the next action continuous with the buyer's job.

For TKO, the first cluster should be narrow: prior-authorization operating problems → decision rights → operational quality → performance diagnostic. For Rachel, use a community/relocation decision hub → comparison → individual guide pattern, only where each page has distinct evidence and decision value. Do not create near-duplicate location pages from templates.

## 9. Social and comment strategy

### Capability separation

| Layer | Current state |
|---|---|
| Content derivatives | TIF supports deterministic LinkedIn, Facebook, Instagram, Reddit, YouTube/video, Meta, and email forms. RachelOS supports LinkedIn, Facebook, email, executive summary, and ad concept. |
| Channel briefs | TIF stores audience, objective, CTA, tracked destination, privacy, channel notes, behavioral/commercial context. Useful but generic. |
| Conversation discovery | Missing. No LinkedIn/Reddit/community search, candidate record, freshness, or relevance workflow. |
| Comment recommendations | Missing for real conversations. A derivative can draft generic text but has no post/thread context or community rules. |
| Human engagement | Required and outside TIF. A human must decide whether/how to comment, disclose affiliation, reply, and manage the relationship. |
| Publication | Missing in TIF; manual native-channel action. RachelOS publication code is for governed content destinations, not autonomous social engagement. |
| Outcome capture | Missing in TIF. No durable post URL, impression/click/conversation, lead, or revenue attribution loop. |

### Channel assessment

- **LinkedIn:** usable for post/carousel drafting after human edit. Comments must be based on the actual conversation, not a reusable engagement template.
- **Reddit:** current derivative aims for standalone value and optional disclosed links, which is directionally sound (`src/lib/tif/content-workflow.ts:315-329`). Community-specific rules and history still require human review.
- **Facebook/Instagram:** draft support exists; Rachel derivatives and visuals require privacy/fair-housing review. Instagram/video still need real visual concepts, shot permissions, and production.
- **Video:** TIF can return deterministic scripts/shot-list-like copy, not footage, claims verification, editing, captions, rights, or publishing.
- **Email:** copy drafting exists. Recipient eligibility, consent, cadence, sending, and unsubscribe remain governed by RachelOS/native systems.
- **Meta ads:** concepts only. Housing-related ads require the appropriate Special Ad Category and compliant audience settings; creative, targeting, and destination are reviewed together. [Meta: choose a Special Ad Category](https://www.facebook.com/help/messenger-app/621956575422138/) [Meta: housing audience limitations](https://www.facebook.com/help/447278887528796) [Meta: ad review](https://www.facebook.com/business/ads/review-policy-guidelines)

### Policy and reputation boundaries

- LinkedIn requires authentic, relevant content and prohibits spam/fake engagement; its User Agreement prohibits bots and unauthorized automation for access, messages, comments, likes, shares, and inauthentic engagement. [LinkedIn Professional Community Policies](https://www.linkedin.com/legal/professional-community-policies) [LinkedIn User Agreement](https://www.linkedin.com/legal/user-agreement)
- Reddit prohibits mass, repeated, or unsolicited engagement and directs business-associated users toward authentic participation and each community's rules. [Reddit Spam policy](https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam) [Reddiquette](https://support.reddithelp.com/hc/en-us/articles/205926439-Reddiquette)

No roadmap phase should authorize autonomous posting, voting, following, commenting, or direct messaging. Conversation discovery may later surface candidates, but the reading, recommendation, decision, and action remain human.

## 10. Documentation drift and obsolescence

1. **Governance contradiction:** `GOVERNANCE.md:37-44` says TIF is not built and the manual method is the live workflow; `:110-127` says the registries, operator console, and API scaffold were built. The later dated statement and runtime code are current, but the earlier paragraph remains materially misleading.
2. **Repository-name drift:** governance and inventory use `rachel-realestate` (`GOVERNANCE.md:81-85,125`; `scripts/tif/inventory-scan.mjs:13-16`), while the governed repository is `rachel-site`. This makes the current scan incomplete or wrong.
3. **API response-doc drift:** `docs/TIF_RACHEL_DRAFT_API.md:123-153` documents the deterministic response but omits `runId`, `draftId`, and `status`, which runtime returns.
4. **Execution-flow overstatement:** governance documents Fact Resolution, Template Population, Voice Refinement, Review, Approval, and Publish (`GOVERNANCE.md:116-119`); runtime implements only Payload → Validation → Run → Draft → Response and explicitly has no AI/workflow/persistence (`src/lib/tif/execution.ts:1-14`).
5. **Fact-ownership drift:** `docs/CONTENT_PIPELINE_ROADMAP.md:15-35` assigns fact resolution to TIF, while the actual Rachel integration resolves facts in RachelOS and TIF discards them.
6. **One-composer drift:** backlog language calls for one composer, but the Opportunity/Asset CLI and request/response API are separate production implementations with different contracts.
7. **Publication-lifecycle ambiguity:** `Asset.status=published` can appear operational, but canonical runtime documentation correctly says no Publication record exists (`docs/TIF_RUNTIME_MODEL.md:31`).
8. **Production-state drift risk:** RachelOS migration 081 surfaces are implemented in code but not deployed/observed in production (`rachel-site/docs/CURRENT_STATE.md:77-81`). Audit conclusions must not call them production-proven.

## 11. Gap register

Scales: business/user value and risk are High/Medium/Low; effort is S/M/L. “Blocks” identifies affected use cases (1–4).

| Rank | Gap | Business value | User value | Evidence / quality risk | Operational risk | Effort | Dependency | Blocks | Recommended phase |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | Canonical fact resolution / request-contract alignment | High | High | High | Medium | S–M | Existing RachelOS fact service; TIF Evidence | 1, 3, 4 | P0 |
| 2 | Voice corpus, versioning, and evaluation | High | High | High | Low | M | Approved Rachel and TKO owners/samples | 1–4 | P0 |
| 3 | Cross-repository handoff and exact source/version lineage | High | High | High | Medium | M | Stable handoff manifest | 2–4 | P0/P1 |
| 4 | Durable compose runs and draft persistence | Medium | High | High | Medium | M | Decide whether existing AssetVersion/Rachel content task is canonical | 1, 4 | P2; use downstream persistence in pilots |
| 5 | Existing-guide ingestion | High | High | Medium | Medium | M | Correct repo path + handoff manifest | 3 | P1 Rachel pilot |
| 6 | SEO/page contract completeness | High | High | Medium | Medium | S–M | Target-repo required frontmatter/registration rules | 1, 4 | P0/P1 |
| 7 | Native, source-faithful channel adaptation | High | High | Medium | Medium | S | Exact source version + voice/fact gates | 2, 3 | P1 |
| 8 | Comment-opportunity workflow | Medium | Medium | Medium | High | M | Human policy/rules check; optionally sanctioned discovery source | 2, 3 | P2 after post pilots |
| 9 | Publication records | High | Medium | Medium | Medium | M | Proven manual publication workflow | 1–4 | P2 |
| 10 | Measurement and attribution | High | Medium | Medium | Medium | M | Publication URL + tracked destination + conversion definition | 1–4 | P1 manual; P2 persist |
| 11 | Documentation drift | Medium | Medium | High | Low | S | Canonical runtime doc | 1–4 | P0 documentation follow-up |
| 12 | TKO executive artifact/API mismatch | High | High | Medium | Low | M | First TKO pilot brief | 1 | Do not generalize; pilot through existing Asset spine |
| 13 | RachelOS publication production validation | Medium | High | Medium | Medium | S operational | Migration 081 deployment and canary | 3, 4 | P0 operational validation |

## 12. Recommended roadmap

### Operating assumptions requiring owner confirmation

- TKO pilot voice: **TKO advisory/Todd**, pending explicit approval.
- TKO pilot buyer: healthcare operations/prior authorization leaders because current proof and offer continuity are strongest there.
- Primary TKO conversion: **Prior Authorization Performance Diagnostic conversation**; current article already uses that CTA.
- 90-day success: one approved/published asset per pilot, attributable qualified visits/conversations, at least one diagnostic inquiry or Rachel consultation attributable to the package, indexing/search-query observation, and an editorial scorecard—not raw posting volume.

### P0 — prerequisites and truth/voice protections

Split into two bounded slices; neither exceeds 10 modified files, two directories, or one service.

**P0-A: truth and handoff contract (estimated 7–9 files, no new service).**

- Make accepted compose input explicit and strict.
- Accept structured, approved fact references/versions/claim boundaries from RachelOS; do not build a second fact registry.
- For TKO, adapt existing Evidence IDs/claim guards into the same narrow claim input.
- Persist the exact request facts and exact resulting version in the existing downstream record used by the workflow.
- Block approval when required claims remain unresolved; warning acknowledgment must be explicit.
- Define the target page handoff fields: canonical destination, source version, required frontmatter, internal links, CTA/offer, privacy/claim boundary, and loader/sitemap expectation.
- Correct `rachel-site` repository path/config only; do not build migration automation.

**P0-B: voice quality contract (estimated 4–6 files, no service/migration).**

- Have Rachel approve 5–10 source pieces and the TKO owner approve 5–10 TKO pieces.
- Create versioned manifests that reference existing files; do not copy a knowledge base.
- Implement/report the deterministic checks in §7 and a human scorecard.
- Treat voice labels as untrusted metadata until the selected corpus and human gate pass.

### P1 — two working vertical pilots

#### Pilot A: TKO executive asset

One admitted prior-auth evidence set → one executive insight/SEO page → LinkedIn post + carousel brief + Reddit package → named human approval → manual publication → tracked destination and outcome log.

Use the existing Asset/Version/Derivative records. Do not introduce a TKO content platform or generic composer. The asset must answer a current director/VP/C-level decision job and connect directly to the existing diagnostic offer.

#### Pilot B: Rachel guide distribution and new comparison

One approved existing Rachel guide/version → Facebook, Instagram, LinkedIn, Reddit, video/shot-list, email, and Meta concepts as appropriate → Rachel review → manual publication/outcome log. Then use the same approved fact/voice contract for one new comparison or guide → Rachel review → Rachel repository publication → indexing and conversion observation.

Split operationally if more than 10 repository files are touched: first distribute the existing guide; only then produce the new guide.

### P2 — scaling, publication records, and feedback

- Add the smallest Publication record only after pilots establish required fields: source AssetVersion/content version, destination, canonical/native URL, reviewer, release time, campaign/tracking identifiers, and status.
- Add the smallest outcome linkage: publication → visits/engagement → qualified conversation/assessment/contact → attributed revenue where honestly available.
- Add a human-owned conversation-opportunity record and review surface only if manual pilots show recurring value.
- Decide whether ephemeral API runs need TIF-native persistence. Prefer existing AssetVersion or RachelOS content task/version as canonical; do not create parallel draft registries without a demonstrated caller that needs them.
- Scale only channel types that outperform their review cost.

### Explicitly deferred / non-goals

- Vector search, embeddings infrastructure, knowledge graph, graph database.
- Agent framework, autonomous research, generic orchestration platform.
- Generic content platform or customer-facing SaaS.
- Autonomous posting, voting, following, commenting, direct messaging, relationship activity, or ad launch.
- Replacement of RachelOS fact, content lifecycle, scoring, queue ranking, lifecycle derivation, or relationship-state derivation.
- Bulk content migration or mass programmatic location-page generation.
- Cross-channel vanity analytics without source/version and conversion lineage.

## 13. Canonical-document disposition after this audit

Do not update these during the audit. In a separate documentation-only change:

| Document | Recommended disposition |
|---|---|
| `docs/TIF_RUNTIME_MODEL.md` | Keep canonical; add links to this audit and the corrected compose truth after P0. |
| `GOVERNANCE.md` | Consolidate contradictory “not built” vs “built” paragraphs; correct repository name; preserve sanctioned/deferred boundaries. |
| `docs/TIF_RACHEL_DRAFT_API.md` | Update response envelope, accepted inputs, unknown-field behavior, fact/source contract, and persistence boundary after P0. |
| `docs/CONTENT_PIPELINE_ROADMAP.md` | Reconcile owner labels with actual TIF Evidence and RachelOS validated facts; mark publication/measurement states accurately. |
| `ENGINEERING_BACKLOG.md` TIF execution/fact/voice/publication sections | Mark implemented scaffold separately from unimplemented fact resolution, voice refinement, publication, and measurement. |
| `TKO_INTELLIGENCE_FACTORY_PRD.md` and older architecture/requirements documents | Add historical/planning banners where they describe non-operational runtime; route implementation claims to `TIF_RUNTIME_MODEL.md` and this audit. |
| `rachel-site/docs/archive/voice-analysis-report.md` | Keep historical; use only after Rachel explicitly approves referenced source pieces for the corpus. |
| `rachel-site/docs/CURRENT_STATE.md` | Update only after migration 081 and publication canary are actually deployed/observed. |

Do not create another overlapping TIF architecture document.

---

# Final Codex Implementation Package — P0

## Objective

Make the existing TIF↔RachelOS and TIF Asset workflows truthful and reviewable before another generated asset is treated as fact-backed or voice-authentic.

## Scope

Two bounded slices: P0-A aligns structured fact/source inputs, strict validation, and downstream lineage; P0-B establishes approved voice manifests, deterministic quality checks, and a human scorecard. Extend existing Evidence, RachelOS fact/version, AssetVersion, and content task/version records. Do not create a generic fact or voice platform.

## Estimated Files Changed

- P0-A: 7–9 modified files.
- P0-B: 4–6 modified files.
- Execute as separate changes if the combined total would exceed 10 modified files.

## New Files

- P0-A: at most one shared contract/test fixture file if existing contract modules cannot hold the type safely.
- P0-B: at most two small voice manifest/scorecard files in an existing documentation/config directory; no new directory required.

## Migrations

None preferred. Use existing RachelOS content task/version metadata and TIF AssetVersion/Evidence lineage for the pilots.

## Schema Changes

None preferred. If exact source-version linkage cannot be expressed without ambiguous JSON metadata, stop and propose one additive, nullable reference in a separately reviewed phase; do not expand schema implicitly.

## Operational Risk

Medium. Strict validation may reject payloads that currently succeed while silently dropping fields. This is intentional but requires coordinated deployment of producer and consumer.

## Files To Modify

P0-A candidates:

- `tko-solutions/src/lib/tif/contract.ts`
- `tko-solutions/src/lib/tif/draft-composer.ts`
- `tko-solutions/src/lib/tif/draft-composer.test.ts`
- `tko-solutions/src/app/api/tif/compose/route.ts` only if error semantics must expose strict unknown-field validation
- `rachel-site/src/lib/tif/contract.ts`
- `rachel-site/src/lib/content/contentFacts.ts`
- `rachel-site/src/app/api/ops/content/generate/route.ts`
- `rachel-site/src/app/api/ops/content/generate/route.test.ts`
- `tko-solutions/docs/TIF_RACHEL_DRAFT_API.md` after behavior is verified

P0-B candidates:

- Approved manifest(s) in an existing `docs` or `asset-production` directory
- One small voice-quality module and focused test, only if deterministic checks are authorized
- Existing human review checklist documentation

## Files To Avoid

- RachelOS scoring, queue ranking, lifecycle derivation, relationship-state derivation, and canonical action logic.
- `migrations/081_canonical_operating_system.sql` except read-only reference.
- TIF/Rachel publication automation, social posting, messaging, ad-launch, and engagement code.
- New vector, embedding, graph, agent, generic registry, or platform directories.
- Existing unrelated dirty files or the `src/lib/leads/persist.test.ts` typing issue.

## Implementation Steps

1. Define one structured claim input with claim text/value, subject, source/fact or Evidence ID, version, verification/freshness state, claim boundary, and optional expiry.
2. Make compose schemas strict and return a clear 400 for unsupported fields.
3. Map RachelOS's already-validated fact results into that exact contract; map TIF Evidence for operator/TKO use without duplicating ownership.
4. Require templates to cite/use admitted claims explicitly; prove by test that changing a fact changes relevant Markdown.
5. Persist source fact/Evidence versions and the output content/Asset version together in the existing downstream task/version record.
6. Add explicit unresolved-claim and warning-acknowledgment checks at the existing approval boundary, without changing lifecycle derivation.
7. Define the cross-repo handoff manifest and correct the configured Rachel repository path.
8. Have owners select and approve versioned Rachel and TKO corpus manifests.
9. Add deterministic prohibited-phrase, repetition, claim-trace, and first-person-source checks plus the human scorecard.
10. Update the canonical API documentation only after contract tests pass.

## Test Plan

- Contract tests for every framework/artifact and all required inputs.
- Unknown `facts`/`context` fields fail with 400 rather than disappear.
- Approved fact changes alter the expected Markdown section; expired/unapproved fact blocks or remains explicitly unresolved.
- Every material rendered claim exposes its source/version in lineage metadata.
- RachelOS route test exercises the real serialized TIF schema, not only a mocked client call.
- Voice label alone cannot claim success; corpus version and human approval are required.
- Forbidden phrase/repetition/unsupported first-person fixtures fail.
- Existing 49 focused TIF tests and 14 focused RachelOS tests remain green.
- Target-repository build/SEO tests remain green; no live publication in automated tests.

## Validation Approach

Run one sanitized community and one comparison request end to end across the real consumer and compose schema. Inspect persisted RachelOS content version/task metadata and confirm the exact fact versions appear in both output-relevant citations and lineage. Conduct a blinded human voice review against three approved samples per voice.

## Rollback Strategy

Deploy consumer and provider changes together or version the request contract. If the consumer cannot send the strict contract, restore the prior client payload while leaving old content items untouched; do not relax by silently stripping fields. Manifests/checks are additive and can be disabled without altering stored content.

## Regression Risk

Primary risks are coordinated-contract breakage, overblocking incomplete briefs, and mistakenly treating structured source context as publish approval. Preserve existing manual review and never auto-advance status.

## Acceptance Criteria

- No fact-bearing input is silently discarded.
- A test proves approved facts affect output and rejected facts do not.
- Exact source fact/Evidence versions and exact output version are linked.
- Unresolved publish-blocking claims cannot pass approval.
- Rachel and TKO voice manifests have named human owners and approved source versions.
- Voice release requires the §7 scorecard and human approval; a voice label alone is insufficient.
- No migration, new service, autonomous action, protected RachelOS logic change, or generic platform is introduced.

---

# Final Codex Implementation Package — First Vertical Pilot (TKO)

## Objective

Produce and measure one evidence-backed TKO executive asset for healthcare/prior-authorization leaders, plus LinkedIn and Reddit distribution packages, using the existing TIF Asset spine and manual publication.

## Scope

One buyer decision job, one admitted evidence set, one insight/SEO page, one exact AssetVersion, one LinkedIn post, one LinkedIn carousel brief, one Reddit value-first post/participation brief, human approval, manual publication, and a 90-day outcome record. No generic TKO framework build.

## Estimated Files Changed

4–7 files, depending on whether the existing insight is extended or a new insight is created. No more than 10.

## New Files

At most one new insight content file and one existing-directory pilot brief/measurement record. Derivatives should be persisted in existing TIF records rather than duplicated as files unless the publication process requires reviewable files.

## Migrations

None.

## Schema Changes

None.

## Operational Risk

Low to medium. Main risk is an advisory healthcare pattern being overstated as client outcome proof or a social package being published without contextual human review.

## Files To Modify

- One selected TKO proof/evidence record only if its existing proof reference or claim guard needs correction.
- One Opportunity/brief in the existing asset-production structure.
- One TKO insight content file under `src/content/insights/`.
- Existing content inventory/loader test only if required to register the page.
- Existing sitemap/SEO tests only if the current generic route does not automatically include the new slug.
- One existing-directory pilot outcome record with canonical URL, source AssetVersion, derivative IDs/URLs, UTM values, review decision, and results.

## Files To Avoid

- TIF schema, API framework/artifact enums, new composer architecture, and publication automation.
- RachelOS repository and all protected RachelOS scoring/queue/lifecycle/relationship logic.
- Social automation, scraping, auto-commenting, auto-messaging, or ad launch.
- Generic voice, fact, graph, vector, agent, or analytics platforms.

## Implementation Steps

1. Confirm owner decisions: TKO author voice, buyer segment, diagnostic conversion, and 90-day success definition.
2. Select one decision job and admitted Evidence records; resolve every `proofRef` and claim guard.
3. Create the Opportunity and exact brief: audience, symptom-language angle, offer/CTA, evidence IDs, prohibited claims, target query/intent, internal links, and distribution objective.
4. Compose the initial AssetVersion; have a human author/refine it against the approved TKO corpus and anti-slop checklist.
5. Validate metadata, canonical, Article schema, internal links, CTA, evidence trail, build, and sitemap inclusion in the TKO repository.
6. Record explicit human approval and manually publish the page.
7. Generate LinkedIn post, carousel brief, and Reddit package from that exact approved AssetVersion with tracked destination and claim/privacy boundaries.
8. Human-review each package against the real channel/community context; publish manually where appropriate.
9. Record native URLs, dates, UTM visits, qualified conversations, diagnostic inquiries, and attributable revenue if any. Record zero honestly.
10. At 30/60/90 days, decide whether evidence justifies repeating the format or changing the angle/channel.

## Test Plan

- Every material claim maps to an admitted Evidence ID and resolving proof reference.
- Zero unsupported metric, named confidential organization, or unapproved outcome claim.
- Anti-slop checklist passes; buyer can identify problem, offer, evidence, and next action within 30 seconds.
- Metadata/canonical/schema match visible content; build and sitemap tests pass.
- LinkedIn/Reddit copy retains source claim boundaries and exact AssetVersion lineage.
- All posting/commenting remains a manual human action.
- Tracked destination resolves and attribution parameters are captured without personal/private data leakage.

## Validation Approach

Named TKO reviewer signs the evidence, voice, offer, and publication checks. Validate the rendered page locally, then verify the deployed canonical page and sitemap. Search/index presence and social outcomes are recorded as observations, never inferred from submission success.

## Rollback Strategy

Before publication, reject or revise the AssetVersion. After publication, revert the content commit or mark the page draft/unpublished through the target repository's normal process; retain the withdrawn version and reason. Remove or correct manual social posts natively if a factual/privacy error is found and record the correction.

## Regression Risk

Low for code because the pilot reuses existing content and Asset paths. Medium for brand/evidence because healthcare authority and commercial intent are sensitive. Human evidence and publication gates are mandatory.

## Acceptance Criteria

- One approved, live TKO page answers a specific healthcare executive decision job and links to the current diagnostic offer.
- All material claims are evidence-traceable and within claim guards.
- The approved page is tied to one exact AssetVersion.
- LinkedIn and Reddit packages are tied to that same version and reviewed by a human.
- Publication and engagement are manual; no autonomous action is introduced.
- The canonical URL, native post URLs, tracked visits, qualified conversations, diagnostic inquiries, and attributable revenue/zero are recorded for 90 days.
- Pilot execution changes no more than 10 files, creates no service/migration/schema, and does not alter protected RachelOS logic.
