# Feature 050 SC-009 Usability Validation

**Task**: T050

**Status**: **BLOCKED — REPRESENTATIVE-USER STUDY NOT RUN**

**Authorized method**: `spec.md` SC-009 Validation Method and `plan.md` section 9

**Script revision**: `SC-009-r1`

This artifact prepares the approved moderated-but-unassisted study. It contains no participant
result. T050 remains incomplete until 20 real representative Core users complete this exact script
and at least 19 succeed.

## Study gate

- Sample: 20 representative Core users.
- English/LTR group: 10 participants.
- Arabic/RTL group: 10 participants.
- Participant success: all seven required elements identified without assistance.
- Feature gate: at least 19 of 20 participants succeed (at least 95%).
- Current result: **BLOCKED — 0 participants run; no aggregate may be calculated**.

## Identical seeded starting state

Use `tests/e2e/fixtures/core-050.ts` fixture `unavailable-context` for every participant. It is an
authenticated, Commerce-onboarded state with a valid active Workspace and an unavailable legacy
BusinessUnit context, allowing the same screen to expose the active Workspace and bounded context
recovery. Do not change the fixture, viewport, route, order, copy, or moderator script after the
first participant. If any correction is necessary, invalidate the affected run, increment the
script revision, and restart the complete 20-person sample with one identical revision.

| Field | Pinned value |
|---|---|
| URL | `http://127.0.0.1:3001/dashboard/apps` |
| Fixture | `unavailable-context` |
| User | `user_001` — Mustafa Hassan |
| Workspace | `ws_001` — Mustafa Group |
| OS Subscription | `sub_001` |
| Legacy Business-labelled `BusinessUnit` ID | Empty current selection; seed record `bu_001` remains unchanged |
| Branch | `br_001` — Smouha Branch remains seeded and unchanged |
| Onboarding | `completedOS` contains `commerce` |
| OS | `commerce` |
| Theme | Light |
| Viewport | 1440 × 900 CSS pixels |
| Browser/build | Record exact browser version and Feature revision before participant 1; keep both unchanged |
| Language group | English with `lang="en" dir="ltr"`, or Arabic with `lang="ar" dir="rtl"` |

The fixture choice is preparation derived from the approved method; it does not claim participant,
Product Owner, design, accessibility, or usability-reviewer approval. Record accountable approval
before recruitment if repository governance requires a named study owner.

## Participant codes and group structure

- English/LTR: `P-EN-01` through `P-EN-10`.
- Arabic/RTL: `P-AR-01` through `P-AR-10`.
- Codes are study identifiers only. Keep any recruitment mapping outside the repository under the
  approved privacy process; never place names, emails, phone numbers, recordings, or demographics
  in this artifact.

## Moderator setup

Before each session:

1. Reset only the isolated study browser profile to the pinned fixture.
2. Confirm the exact URL, 1440 × 900 viewport, light theme, expected locale/direction, and no open
   transient surface.
3. Confirm no browser extension, developer overlay, issue annotation, or prior-session state points
   to a target.
4. Record participant code, locale/direction, date/time, environment, browser version, Feature
   revision, moderator, and script revision.
5. Read the introduction and task verbatim. After the task begins, provide no hints, labels,
   locations, gestures, translations, or correctness feedback.

## Verbatim participant instructions

> This study evaluates the Core Platform interface, not you. Starting from the screen in front of
> you, identify the seven requested interface elements and show where you would use each one. Work
> in any order. Think aloud if you are comfortable doing so. I cannot guide you or confirm answers
> after the task starts. Tell me when you are finished.

For the Arabic/RTL group, use a reviewed Arabic translation of exactly the same meaning. Record the
translation revision before participant 1 and use it unchanged for all ten Arabic participants.
The Arabic script review is currently **BLOCKED** until a real qualified reviewer is recorded; do
not improvise participant-facing Arabic during a session.

## Seven identification tasks

The moderator records spontaneous identification/demonstration only and does not read the element
names individually after the task begins.

1. Current Core destination.
2. Active Workspace.
3. Available context recovery.
4. Notifications.
5. Profile menu.
6. Locale control.
7. Theme control.

Success for an element requires the participant to point to or focus the correct visible control/
state and describe its purpose accurately enough to distinguish it from nearby controls. A
participant succeeds overall only when all seven element results are PASS without prompts.

## Per-participant results

Use `PASS` or `FAIL` only after observation. Until execution, every result remains `NOT RUN`.

| Participant | Locale/direction | Destination | Workspace | Recovery | Notifications | Profile | Locale | Theme | Overall | Confusion/defect link |
|---|---|---|---|---|---|---|---|---|---|---|
| P-EN-01 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-EN-02 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-EN-03 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-EN-04 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-EN-05 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-EN-06 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-EN-07 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-EN-08 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-EN-09 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-EN-10 | en/LTR | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-01 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-02 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-03 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-04 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-05 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-06 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-07 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-08 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-09 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |
| P-AR-10 | ar/RTL | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | |

## Required session metadata

For each participant record, outside the compact table when necessary:

- participant code only;
- locale/direction;
- script and Arabic-translation revision;
- browser/version, OS, viewport, Feature revision, and fixture version;
- moderator and date/time;
- per-element outcome and overall outcome;
- concise observed confusion without personal data; and
- linked follow-up defect identifier when a failure or material confusion occurs.

## Aggregate calculation

```text
participant_success = all seven element outcomes are PASS
successful_participants = count(participant_success)
aggregate_rate = successful_participants / 20 * 100
PASS = successful_participants >= 19
BLOCKED = fewer than 20 valid sessions, mixed script/fixture revisions, missing required metadata,
          unreviewed Arabic participant script, or evidence-integrity/privacy failure
FAIL = 20 valid sessions completed and successful_participants < 19
```

| Measure | English/LTR | Arabic/RTL | Total |
|---|---:|---:|---:|
| Valid participants | 0/10 | 0/10 | 0/20 |
| Participants identifying all seven | Not calculated | Not calculated | Not calculated |
| Aggregate rate | Not calculated | Not calculated | Not calculated |
| Gate | BLOCKED | BLOCKED | **BLOCKED** |

## Privacy and evidence integrity

- Do not record participant names, contact details, employer, account identifiers, demographic
  profiles, real credentials, customer data, audio/video, or free-form notes that identify a person.
- Do not place recruitment consent or the participant-code identity map in Git.
- Use only deterministic mock data; never expose another tenant or real business record.
- Do not backfill, infer, normalize, or improve an outcome after the session.
- A moderator prompt after task start invalidates the affected participant result.
- Report confusion and failures truthfully, link defects, and keep T050 BLOCKED until the complete
  sample and all required metadata exist.

## Final approval record

| Field | Result |
|---|---|
| Study execution | **BLOCKED — NOT RUN** |
| English/LTR sample | **BLOCKED — 0/10** |
| Arabic/RTL sample | **BLOCKED — 0/10** |
| Aggregate | **BLOCKED — not calculated** |
| Required threshold | At least 19/20 successful participants |
| Moderator | ____________________ |
| Usability reviewer | ____________________ |
| Product/release approver | ____________________ |
| Decision/date | ____________________ |

No PASS, participant outcome, reviewer approval, or release conclusion is claimed by this prepared
artifact.
