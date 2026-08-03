# Pull Request Checklist

This is the generic wrapper Todd runs before merging any story's PR. It does not replace a
story's own `Acceptance Criteria` and `Validation` sections.

Copy this block into the PR rather than editing the boxes in place — this file is the
template, and `docs/CURRENT_STATE.md` is where merged status is recorded.

## Implementation

- [ ] Story implemented
- [ ] Acceptance criteria satisfied
- [ ] Scope respected
- [ ] No TODOs introduced
- [ ] No unrelated changes

## Validation

- [ ] `npx prisma validate`
- [ ] `npm test`
- [ ] `npm run lint`
- [ ] `npm run build`

CI runs all four on every push and pull request (`.github/workflows/ci.yml`).

## Documentation

- [ ] Documentation updated (if required)
- [ ] Any invalidated `docs/architecture/` doc updated in the same commit
- [ ] `docs/CURRENT_STATE.md` updated if the work package status changed

## Deployment

If Prisma migrations exist:

- [ ] `npx prisma migrate deploy`

Always:

- [ ] `git push origin main`
- [ ] Verify Vercel deployment
- [ ] Smoke test production

## Review

- [ ] Ready for review
- [ ] Ready to merge

## Completion Log

Append one line per merged work package. Do not overwrite earlier entries.

| Date | Work Package | Validation | Deployed |
|---|---|---|---|
| 2026-08-01 | WP-011 Commercial Intelligence | test / lint / build passed | Not recorded |
| 2026-08-03 | MSP reconciliation fixes (offer selection, provenance, decision gate, CI) | prisma validate / test / lint / build passed | Not recorded |
