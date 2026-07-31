## Story Metadata

Milestone:
M0

Parent Task:
POIS-002

Story:
POIS-002

Depends On:
None

Blocks:
POIS-003

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
Low

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** One Prisma client, predictable connection pooling. Two clients against
the same database is a latent connection-exhaustion bug.

**User story:** As Codex, I need one Prisma client so connection pooling is predictable.

**Commercial outcome:** None directly — reliability groundwork (D-012).

---

# Scope

**Included:** `src/lib/tif/db.ts` becomes a re-export alias of the canonical client:

```ts
// Alias retained so existing TIF imports keep working.
// Canonical client: src/lib/db/prisma.ts
export { prisma as tifDb } from "@/lib/db/prisma";
```

**Excluded:** Do not rewrite the ~20 `tifDb` call sites. Do not touch `src/lib/db/prisma.ts`.

---

# Files Expected

- `src/lib/tif/db.ts`

---

# Dependencies

None.

---

# Referenced Documents

None required.

---

# Acceptance Criteria

- [ ] Exactly one `new PrismaClient()` exists in `src/` (`grep -rn "new PrismaClient" src/`).
- [ ] `npm test` passes.
- [ ] `/tif`, `/tif/opportunities`, `/tif/inbox` all render (manual check).

---

# Validation

```
npm test
npm run build
grep -rn "new PrismaClient" src/
```

---

# Rollback

Restore the original `src/lib/tif/db.ts` file content.

---

# Expected Diff Size

Small.

---

# Estimated Time

30 minutes.

---

# Next Story

`POIS-003-add-todd-v2-capability-profile.md`
