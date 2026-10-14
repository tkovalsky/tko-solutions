# Release Checklist

## Before merge

- Review the diff against the agreed scope and preserve unrelated working-tree changes.
- Confirm offer names and commercial terms agree across homepage, services, PCOS, and intake.
- Check public claims against the evidence ledger. Label synthetic examples and architecture diagrams accurately.
- Inspect every new screenshot, poster, and recording for retained identifiers and sensitive context. Capture tools write to `.private/proof-quarantine`; move only cleared artifacts into `public`.
- Run `npm test`, `npm run lint`, `npm run guides:validate`, and `npm run build`.
- Keep draft/retired guides unpublished. Preserve the actual recorded reviewer/date; do not invent a human review when editing copy.

## Preview

Start the built site:

```sh
npm run start -- --port 3000
node scripts/verify-public-site.mjs http://localhost:3000
```

The verifier checks built public routes, offer-specific intake URLs, internal links, media, fragment targets, unknown content, and the rejected capture URLs. It performs GET requests only and does not submit forms or access TIF.

Inspect desktop and mobile navigation, service pricing, both buyer paths, RachelOS tabs/use cases, the healthcare scenario controls, and video playback/error states. Use mocked tests for form delivery; a real notification is a separate intentional test.

## Database

Content and proof changes require no database migration. Run migrations only when a separately reviewed change includes them.

## Deploy

Use the existing GitHub/Vercel release path after review. Stage intended files explicitly; do not bundle unrelated dependency or local capture work. Confirm the successful deployment and its commit SHA.

From the checkout built for that release:

```sh
node scripts/verify-public-site.mjs https://tko.solutions
```

Verify the social image, canonical metadata, current contact address, and any configured www redirect as well. Expected permanent redirects are distinct from canonical pages returning 200. Unknown slugs and removed unsafe captures must remain 404; TIF remains authenticated and fail-closed.

## Rollback

Revert the specific content or UI changes, or promote the previous reviewed safe deployment. Preserve pre-existing working-tree changes. Do not restore quarantined captures to `public` during rollback. These content changes do not require a data reset or destructive migration.
