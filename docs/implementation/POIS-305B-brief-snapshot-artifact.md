## Story Metadata

Milestone:
M3

Parent Task:
POIS-305

Story:
POIS-305B

Depends On:
POIS-305A

Blocks:
POIS-306A

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
Medium

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** The executive brief (POIS-205A) is derived live from current data and
changes as evidence changes. Todd needs a way to freeze a point-in-time copy of it as an
`OiArtifact` — e.g. to reference exactly what he knew going into a specific conversation.

**User story:** As Todd, I want to snapshot the current executive brief into a permanent record,
so that later, even as the live brief changes, I can see exactly what it said at the moment I
captured it.

**Commercial outcome:** Completes the POIS-305 vertical slice — both meeting-prep and brief
capabilities are now generatable. Establishes traceability between what Todd knew and when.

---

# Scope

**Included:**
- Snapshotting logic that reads the current derived executive brief (POIS-205A) and persists it
  as an immutable `OiArtifact` at the moment of generation.
- Display of the snapshotted brief artifact plus a generation button on the opportunity view.
- The snapshot must be immutable once created: later changes to the opportunity's underlying
  evidence must not alter the already-created snapshot.

**Excluded:**
- No changes to how the live executive brief is derived (POIS-205A's derivation logic is
  untouched — RachelOS Rules forbid modifying derivation logic without explicit request).
- No approval workflow — the brief snapshot is not sent anywhere.
- Rule 8 note: the brief snapshot is never transmitted by this code. No email, messaging,
  social, or application-submission API call is introduced.

---

# Files Expected

- `action/artifact-compose.ts` (extend to add brief-snapshot generation)
- Display/button component on the opportunity view

---

# Dependencies

`POIS-305A-meeting-prep-generation.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-305 section (brief-snapshot half
  only).
- POIS-205A story (executive brief derivation — read only enough to know the read interface; do
  not modify).

---

# Acceptance Criteria

- [ ] Snapshotting captures the executive brief's content at the moment of generation into an
      `OiArtifact`.
- [ ] After snapshotting, changing the opportunity's underlying evidence changes the live brief
      view but does not alter the already-created snapshot artifact.
- [ ] The snapshot artifact and its generation button render on the opportunity view.
- [ ] No derivation logic in POIS-205A was modified.

---

# Validation

```
npm run test -- artifact-compose
npm run typecheck
```

Manual: generate a snapshot, then add new evidence to the opportunity, and confirm the live brief
reflects the new evidence while the snapshot artifact does not change.

---

# Rollback

Hide the brief-snapshot generation button; no migration to unwind.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-306A-activity-log-service.md`
