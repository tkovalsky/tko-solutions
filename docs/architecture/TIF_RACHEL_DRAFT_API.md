# TIF Rachel Draft API

> **Expanded contract (2026-07-12):** The same governed endpoint now also composes future-site
> commercial tenant-representation and business-transferability drafts. Rachel publishing behavior
> is unchanged. Commercial drafts target a separate future publisher and use `cre-intelligence` as
> their intelligence source. See `TIF_CRE_BUSINESS_OWNER_REQUIREMENTS.md`.

**Status:** Versioned TKO-side contract (`2026-07-22`)
**Purpose:** Let the Rachel publishing system request draft content from `tko-site` without moving
publishing ownership into TKO.

## Boundary

TKO owns draft composition. Rachel owns saving, editing, review, approval, and publishing.

Terminology note: this API still uses `artifact` because it is the current runtime contract. In the
content operating model, the core item is a **Deliverable** and this endpoint returns a draft
**Channel Package** such as `comparison_page`, `comparison_guide`, `community_page`, or
`relocation_guide`. Rachel owns the eventual **Publication**.

This endpoint does not:

- Publish content.
- Write into `rachel-realestate`.
- Send lead outreach.
- Use an LLM provider.
- Create CRM records.

## Truth contract

The request accepts `contractVersion: "2026-07-22"`. Older callers may omit it during the
additive rollout and receive the current version by default. Request objects and nested `inputs`
objects reject unknown fields rather than silently discarding them.

RachelOS may send these canonical source fields inside `inputs`:

- `context`: publication context such as persona, funnel stage, target URL, geography, community,
  internal links, and tags.
- `facts`: approved, unexpired fact-version lines. Fact references use `[Fact <id> v<version>]`.
- `notes`: operator-supplied source notes.
- `revisionFeedback`: human revision direction.
- `generationRequirements`: a private, versioned bundle containing the canonical voice, persona,
  strategy, page contract, validation contract, and (for portfolio guides) approved structural
  baseline. Every source body has a SHA-256 hash and the bundle has an aggregate digest.

The response includes `sourceUsage`. `sourceUsage.factReferences` is the authoritative list of
fact versions that TIF actually preserved in the returned Markdown. A consumer must not record fact
usage merely because it supplied a fact. `voiceApplied` is currently `false`; voice remains metadata
until a real refinement step is implemented. Revision feedback is preserved for the editor, but the
deterministic composer does not claim to perform model-backed prose revision.

When `generationRequirements` is present, TIF rejects a missing required role, a modified source
body, or an invalid aggregate digest. A valid bundle is acknowledged with
`sourceUsage.requirementsAccepted=true` and the exact digest in
`sourceUsage.requirementsDigest`. This acknowledgement proves transport integrity only. It does not
mean the deterministic composer used the material to produce Rachel-authentic prose; consumers must
also require `voiceApplied=true` before treating that gate as satisfied.

## Endpoint

```http
POST /api/tif/compose
```

Authentication:

```http
Authorization: Bearer <TIF_ACCESS_KEY>
```

or:

```http
x-tif-access-key: <TIF_ACCESS_KEY>
```

### Required execution identity

Every authenticated compose request must also carry this controlled operational tuple:

```http
x-ai-workload: product.content_generation
x-ai-environment: local | test | development | preview | production | github_actions
x-ai-execution-source: http_request | manual_cli | scheduled_job | queue_worker | github_actions
```

TIF rejects missing or unsupported values before it parses or composes publisher content. These
headers are not request content and cannot contain prompts, customer data, or credentials. TIF
returns the accepted tuple as `executionIdentity`; Rachel must reject a response whose tuple does
not exactly match the one it sent. This attests the boundary for the current in-process run only;
durable Run/Draft persistence remains intentionally outside this contract and is not introduced by
the identity work.

## Supported First Slice

Frameworks:

- `rachel_community`
- `rachel_relocation`
- `cre_tenant_rep`
- `business_exit`

Artifacts:

- `community_page`
- `comparison_page`
- `comparison_guide`
- `relocation_guide`
- `cre_area_page`
- `cre_neighborhood_page`
- `cre_corridor_page`
- `cre_medical_cluster_page`
- `cre_site_report`
- `cre_corridor_comparison`
- `tenant_rep_guide`
- `business_exit_guide`
- `transferability_assessment_page`

Deliverable mapping:

- `comparison_page` and `comparison_guide` are packages of the first-class `comparison`
  deliverable.
- `community_page` is a Rachel page package around a community guide/profile deliverable.
- `relocation_guide` is both a deliverable and its first supported Rachel channel package.

Voices:

- `rachel`
- `consumer`
- `todd`
- `commercial_operator`

## Example: Comparison Draft

```json
{
  "contractVersion": "2026-07-22",
  "runId": "run_...",
  "draftId": "draft_...",
  "framework": "rachel_community",
  "artifact": "comparison_guide",
  "voice": "rachel",
  "inputs": {
    "communities": ["Valencia Sound", "Valencia Grand"],
    "county": "Palm Beach County",
    "budget": "750000-1200000",
    "internalLinks": [
      "the-valencia-communities-delray-boynton",
      "valencia-communities-ranked-by-price-and-lifestyle"
    ]
  }
}
```

## Example: Relocation Draft

```json
{
  "framework": "rachel_relocation",
  "artifact": "relocation_guide",
  "voice": "rachel",
  "inputs": {
    "originMarket": "New Jersey",
    "destinationMarket": "South Florida",
    "internalLinks": [
      "leaving-new-jersey-for-south-florida",
      "south-florida-relocation-starter-guide"
    ]
  }
}
```

## Response

```json
{
  "ok": true,
  "contractVersion": "2026-07-22",
  "framework": "rachel_community",
  "artifact": "comparison_guide",
  "voice": "rachel",
  "slug": "valencia-sound-vs-valencia-grand",
  "title": "Valencia Sound vs Valencia Grand: Which Community Fits You?",
  "markdown": "---\ntitle: ...",
  "warnings": [
    "Pricing, HOA, tax, amenity, and inventory claims must be verified before publishing."
  ],
  "suggestedPath": "src/content/guides/valencia-sound-vs-valencia-grand.md",
  "sourceUsage": {
    "factsIncluded": true,
    "factReferences": ["Fact 44 v2"],
    "notesIncluded": true,
    "revisionFeedbackIncluded": false,
    "voiceApplied": false,
    "requirementsAccepted": true,
    "requirementsDigest": "<sha256>"
  },
  "executionIdentity": {
    "workload": "product.content_generation",
    "environment": "preview",
    "executionSource": "http_request"
  }
}
```

Rachel-side publishing flow:

1. Operator starts a draft in Rachel.
2. Rachel server calls `POST /api/tif/compose`.
3. Rachel stores `markdown` as a draft content asset.
4. Rachel verifies the returned requirements digest and voice-application flag.
5. Rachel/Jennie edits and verifies all `VERIFY` notes and extracted mutable facts.
6. Rachel publishing system handles exact-version approval and publication.

## Current Behavior

The endpoint returns deterministic markdown drafts with YAML frontmatter, explicit source context,
and `VERIFY` markers. It does not call an AI model. The response says so through warnings and
`sourceUsage.voiceApplied=false`; source preservation must not be represented as autonomous prose
generation or voice refinement. Consequently, accepting the canonical requirements bundle does not
yet make a draft eligible for automatic Payload handoff.
