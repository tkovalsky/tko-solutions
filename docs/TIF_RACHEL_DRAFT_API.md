# TIF Rachel Draft API

**Status:** Initial TKO-side contract  
**Purpose:** Let the Rachel publishing system request draft content from `tko-site` without moving
publishing ownership into TKO.

## Boundary

TKO owns draft composition. Rachel owns saving, editing, review, approval, and publishing.

This endpoint does not:

- Publish content.
- Write into `rachel-realestate`.
- Send lead outreach.
- Use an LLM provider.
- Create CRM records.

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

## Supported First Slice

Frameworks:

- `rachel_community`
- `rachel_relocation`

Artifacts:

- `community_page`
- `comparison_page`
- `comparison_guide`
- `relocation_guide`

Voices:

- `rachel`
- `consumer`

## Example: Comparison Draft

```json
{
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
  "framework": "rachel_community",
  "artifact": "comparison_guide",
  "voice": "rachel",
  "slug": "valencia-sound-vs-valencia-grand",
  "title": "Valencia Sound vs Valencia Grand: Which Community Fits You?",
  "markdown": "---\ntitle: ...",
  "warnings": [
    "Pricing, HOA, tax, amenity, and inventory claims must be verified before publishing."
  ],
  "suggestedPath": "src/content/guides/valencia-sound-vs-valencia-grand.md"
}
```

Rachel-side publishing flow:

1. Operator starts a draft in Rachel.
2. Rachel server calls `POST /api/tif/compose`.
3. Rachel stores `markdown` as a draft content asset.
4. Rachel/Jennie edits and verifies all `VERIFY` notes.
5. Rachel publishing system handles approval and publication.

## Current Behavior

The endpoint returns deterministic markdown drafts with YAML frontmatter and `VERIFY` markers. It
does not call an AI model. This keeps the first integration useful for content production while
preserving the human review gate.
