# TIF Multichannel Content and Social Relationship PRD

**Status:** Final implementation contract  
**Date:** 2026-07-12  
**Owner:** TKO Solutions  
**Implementation boundary:** TIF composes governed channel packages. RachelOS owns leads,
social profiles, Today tasks, communication outcomes, suppression, and publication state.

## 1. Outcome

Turn one approved source deliverable into distinct, traceable, context-aware packages for owned
stories, Facebook, Instagram, LinkedIn, Reddit, YouTube, Meta ads, email next-touch, and media
production without presenting unsupported claims, private client details, or generated imagery as
documentary evidence.

The product is successful when a human can select an existing TIF asset, provide channel context,
create a reviewable package, trace it to the source version, and approve it manually. It is not an
autonomous publishing or social-engagement system.

## 2. Principles

1. **One source, many native packages.** Adapt the idea; do not duplicate the same copy everywhere.
2. **Evidence survives transformation.** Every package remains attached to its Asset and source
   version.
3. **Context precedes composition.** Voice, audience, objective, geography, CTA, destination,
   privacy treatment, and channel rules are generation inputs.
4. **Human Approved AI.** Every output is a draft. No follows, DMs, posts, ads, or publications are
   executed by TIF.
5. **Authenticity is a constraint.** Original media is preferred for real people and places. AI or
   stock imagery cannot be represented as evidence of a real property, community, client, or result.
6. **Owned content is canonical.** RachelDelray story/guide pages are durable sources; social
   platforms are distribution and conversation surfaces.
7. **Measurement follows the source.** Tracked destinations should allow source → angle → package →
   visit → lead → conversation → consultation analysis.
8. **Behavioral alignment is decision support, not covert profiling.** TIF may use expressed search
   language, journey stage, decision job, constraints, and supplied value context. It must not infer
   or exploit sensitive traits, mortality, grief, loneliness, health, or financial distress.

## 3. Users

- Todd: selects proof, establishes claim boundaries, and reviews TKO packages.
- Rachel: supplies local knowledge and media, reviews Rachel-voice packages, publishes, and engages.
- Content operator: enters channel context, creates packages, records revisions, and manages status.
- RachelOS operator: links social profiles to leads and completes Today social tasks.

## 4. Source model

The existing TIF spine remains authoritative:

```text
Evidence → Opportunity → Asset → Asset Version → Derivative Channel Package
```

No parallel content registry or channel database is introduced. A `DerivativeAsset` records package
type, rendered body, parent Asset, and source version. Existing Asset approval states remain the
human gate.

## 5. Required context

The package form supports:

- Voice: Rachel, Todd/TKO, or consumer.
- Intended audience.
- Communication objective.
- CTA.
- Tracked destination URL.
- Geography.
- Privacy treatment: not applicable, anonymized real situation, clearly labeled composite, or
  consent-backed story.
- Channel rules and claim notes.
- Buyer domain, journey stage, search intent, observed search phrase, and decision job.
- Expressed motivation, unresolved barrier, price/value context, and desired next action.

Missing context must be visible in the output rather than silently invented.

Every generated package persists its context and deterministic behavioral strategy beside the
source-version reference. The strategy selects educational, comparison, decision-support, proof,
or conversion framing and a soft, guided, or direct CTA.

## 6. Supported packages

### Owned and written

- Story page.
- LinkedIn post and carousel.
- Facebook post.
- Instagram post and Story.
- Reddit post.
- Email next-touch.

### Video and media

- YouTube video brief.
- YouTube Short script.
- Instagram Reel script.
- Video shot list.
- General image brief.
- Meta image brief.
- Meta video script.

### Paid social

- Meta ad.
- Meta ad set with problem-led, decision-led, and story-led variants.

Every Meta ad includes campaign objective, audience, primary text, headline, short description, CTA,
content link, creative recommendation, test hypothesis, and approval warning. An ad set changes one
framing variable at a time.

Legacy derivative types remain supported for compatibility.

## 7. Privacy and Reddit requirements

- Consent-backed stories must record consent outside TIF before publication.
- Anonymized stories must remove or generalize identifying combinations, not merely names.
- Composite stories must be labeled as composite scenarios.
- Reddit packages must provide standalone value if their link is removed.
- Reddit links are optional, disclosed, and subject to the target community's current rules.
- TIF does not post, vote, follow, message, scrape profiles, or automate community participation.

## 8. Media requirements

Video shot lists request original establishing shots, streetscape/detail footage, short movement
clips, an on-camera answer, ambient audio, and a thumbnail portrait. The operator separately records
capture date, location, owner, releases, restrictions, and what the footage actually depicts.

YouTube Shorts and Instagram Reels are scripts/briefs only. Destination guidance must not promise a
clickable placement where the platform does not provide one.

## 9. RachelOS social relationship extension

This is a required adjacent workstream, not TIF-owned lead state.

### Social profile record

RachelOS should associate zero or more profiles with an existing lead:

```text
lead_id
platform (instagram | facebook | linkedin | reddit | youtube | other)
profile_url
handle
display_name
source (lead_provided | operator_found | inbound_social | referral)
relationship_status (discovered | followed | engaged | dm_ready | dm_sent | replied | do_not_contact)
last_verified_at
notes
```

Profile data must be entered or confirmed by a human. No scraping or inferred identity matching is
authorized by this PRD.

### Today task types

- Review social profile.
- Follow profile.
- Engage with a relevant post.
- Draft social DM.
- Send approved social DM.
- Respond to inbound social message.
- Verify or remove stale profile.

Each task must explain why it is surfaced, open the profile directly, remain human-executed, record
an outcome, respect do-not-contact and active-conversation suppression, and never create bulk DMs.

### TIF handoff

RachelOS may request an approved DM or engagement draft using lead-safe context. TIF returns draft
copy and its source asset; RachelOS retains the lead ID, delivery decision, task, channel outcome,
and relationship history. Raw private lead context should not be persisted into public TIF assets.

## 10. Workflow

```text
Select Asset
→ select latest source version
→ enter channel context
→ generate package
→ review source, privacy, claims, link, and channel rules
→ revise or approve
→ publish manually
→ record publication and tracked outcome
```

For social relationship work:

```text
Lead profile discovered or supplied
→ human verifies and links profile
→ RachelOS derives one justified Today task
→ optional TIF draft
→ Rachel reviews and acts in the platform
→ Rachel records outcome
→ RachelOS updates relationship memory and next action
```

## 11. Non-goals

- Automatic publishing, scheduling, following, liking, commenting, or messaging.
- Social scraping, identity enrichment, or automated account discovery.
- Platform credential storage in TIF.
- Autonomous ad launch or budget changes.
- Fabricated testimonials, client outcomes, photographs, or local footage.
- A new agent framework, vector store, or channel-specific content database.

## 12. Acceptance criteria

1. Existing derivative packages continue to work.
2. Every new package can be created from the TIF Asset page.
3. The saved package records the exact source Asset version.
4. Meta outputs contain primary text, headline, short description, CTA, and content link.
5. Story and Reddit outputs visibly carry privacy and approval guidance.
6. Video and image outputs distinguish authentic evidence from illustration.
7. Channel readiness includes stories, Instagram, YouTube, and video production.
8. Invalid package types are rejected by the generated Prisma enum.
9. Unit tests cover Meta structure, privacy, Reddit standalone/link guidance, Instagram, and video.
10. Type checking, focused tests, and production build pass.

## 13. Rollout

### Slice 1 — Implemented here

- Expanded derivative enum and migration.
- Context-aware deterministic package composer.
- Asset-page context form.
- Stories, LinkedIn, Facebook, Instagram, Reddit, YouTube, Meta, email, and media packages.
- Expanded deterministic readiness view.
- Documentation and tests.
- Behavioral content brief and package-level strategy persistence.
- CRE tenant-representation, field-intelligence, business-transferability, and owner operating-system packages.
- Media-reference capture for externally stored clips, photographs, and voice memos.

### Slice 2 — RachelOS implementation (implemented locally 2026-07-12; migration not deployed)

- Social profile association and lead-level management.
- Today social task projection and human-recorded transitions.
- Human-authored/reviewed DM drafts; saving never sends.
- Do-not-contact and terminal-lead suppression.

The cross-repository TIF drafting handoff remains a later integration; RachelOS currently stores a
human-entered draft rather than sending private lead context to TIF automatically.

### Slice 3 — Measurement

- Publication records and tracked URLs.
- Package-level visits and conversions.
- Lead, conversation, and consultation attribution.
- Angle and audience learning returned to content planning.

### Slice 4 — Operational pilot

- Three RachelDelray stories.
- Four original question videos and eight short clips.
- Facebook, Instagram, LinkedIn, and Reddit publishing at a sustainable cadence.
- One Meta ad set per approved guide, with one-variable tests.
- Weekly review of qualified visits, leads, conversations, and production time.
