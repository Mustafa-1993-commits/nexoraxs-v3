# Interaction Patterns

- **Status:** Canonical reusable interaction behavior
- **Date:** 2026-07-19
- **Owner:** Design System for presentation behavior; product owners for business outcomes
- **Authority:** Cross-product interaction semantics only

## 1. Purpose

This document defines how recurring NexoraXS interactions behave across Landing, Core Platform,
Commerce, and later approved product surfaces. It provides predictable state, feedback,
accessibility, localization, and ownership rules without defining backend behavior or component
implementation.

## 2. Scope

The patterns cover loading, skeletons, optimistic UI, errors, validation, confirmation, undo,
notifications, search, pagination, infinite scroll, filtering, sorting, selection, bulk actions,
keyboard shortcuts, command palette, modal and drawer behavior, responsiveness, and offline states.

## 3. Out of Scope

This document does not:

- define API error shapes, request payloads, persistence, queues, retry protocols, or database behavior;
- decide which domain actions are reversible, idempotent, transactional, or available offline;
- define component code, CSS, token values, keyboard bindings, page routes, or schemas;
- approve optimistic behavior for consequential Commerce, identity, authorization, commercial, or configuration actions; or
- replace owner-specific feature acceptance criteria and failure/recovery rules.

## 4. Relationships

| Source | Relationship |
|---|---|
| [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md) | Defines required states and recovery expectations for each customer journey stage. |
| [Screen Map](../03-ui-ux/02-SCREEN-MAP.md) | Identifies current/planned screens to which these patterns apply. |
| [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) | Identifies incomplete state, localization, accessibility, and recovery behavior. |
| [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md) | Controls navigation, search/command scope, deep links, and safe return. |
| [Presentation State Authority](../03-ui-ux/07-STATE-MACHINES.md) | Separates domain, Session, presentation, loading, permission, error, and recovery states. |
| [Accessibility](../03-ui-ux/09-ACCESSIBILITY.md) | Defines the WCAG 2.2 AA cross-experience outcomes these patterns must satisfy. |
| [UI Copy Guidelines](../03-ui-ux/11-UI-COPY-GUIDELINES.md) | Defines accurate consequence, confidence, approval, correction, and recovery language. |
| [Component Catalog](./03-COMPONENT-CATALOG.md) | Lists the components that express these patterns. |
| [Page Templates](./04-PAGE-TEMPLATES.md) | Defines the page compositions in which the patterns operate. |
| [Frontend-First Policy](../11-execution/05-FRONTEND-FIRST-POLICY.md) | Requires deterministic mock coverage and UI maturity before later integration. |

## 5. Shared Interaction Rules

Every interaction:

1. states the real owner, scope, action, and consequence where material;
2. preserves valid user work through validation and recoverable failure;
3. distinguishes authentication, permission, product access, readiness, availability, validation,
   and service failure;
4. prevents duplicate visible outcomes while making pending work perceivable;
5. provides Arabic/RTL and English/LTR behavior from its first implementation;
6. is keyboard-operable with predictable focus and assistive-technology feedback;
7. honors reduced motion and responsive/reflow requirements; and
8. never treats frontend state as proof of canonical success or authorization.

For first Business DNA publication, an ordinary navigation action such as “Next” or “Continue” is
never confirmation. The owner-supplied consequence requires a dedicated, explicit approval action.
Confidence and provenance remain understandable without color, tooltip-only disclosure, or false
certainty. Recommendation choice remains optional and does not imply product adoption.

## 6. Loading

**Purpose:** maintain orientation while content or an action is pending.

Rules:

- Keep stable page/shell structure and name the operation when waiting is material.
- Use independent section loading when projections can resolve independently.
- Prevent duplicate submissions without removing status or recovery from assistive technology.
- Use measurable progress only when the owner supplies meaningful progress.
- A long operation explains what is happening, whether leaving is safe, and how the result can be resumed.
- Loading that exceeds the expected experience moves to an explicit delayed/recovery state rather
  than an indefinite silent spinner.
- The final content receives focus only when task continuity requires it; loading completion does
  not generally steal focus.

Localization includes loading and delayed messages. RTL/LTR changes layout direction, not process
meaning. Motion follows reduced-motion preference.

## 7. Skeleton

**Purpose:** reserve a known content shape while a read is resolving.

Rules:

- Use skeletons only when the layout is predictable; unknown work uses a named loading status.
- Preserve content hierarchy without fabricating values, statuses, charts, or recommendation meaning.
- Keep skeletons hidden from redundant screen-reader reading while a nearby status names the loading region.
- Replace skeletons by region to avoid destabilizing unrelated content.
- Skeleton motion is subtle and has a reduced-motion equivalent.
- A skeleton does not replace error, unauthorized, empty, or stale states.

## 8. Optimistic UI

**Purpose:** improve perceived responsiveness for low-risk actions whose outcome can be safely
reconciled.

Optimistic presentation is allowed only when the owning feature has established that the action is
reversible or safely repeatable, conflict behavior is known, failure restores a truthful view, and
the UI does not present an irreversible business outcome before owner confirmation.

Rules:

- Mark optimistic state as pending where the distinction matters.
- Preserve the previous owner projection until confirmation or keep enough UI context to restore it.
- On failure, roll back the presentation, explain what was preserved, and offer a safe retry.
- Never use optimism to claim confirmed identity, permission, subscription, payment, inventory,
  order, invoice, return, Business DNA publication, Recommendation disposition, or configuration
  outcome without an owner-approved feature rule.
- Do not hide partial failure behind a success toast.

Frontend-first deterministic mocks may simulate optimistic states for UX validation; this does
not define later transport or transaction behavior.

## 9. Errors

**Purpose:** explain what failed, what remains valid, and the next safe recovery.

Rules:

- Place field errors with fields; use a summary when several errors require correction.
- Keep unaffected page regions usable and preserve safe inputs/query state.
- Distinguish validation, not found, unauthorized, unavailable, stale/conflict, partial failure,
  temporary failure, and blocked prerequisites in user language.
- Do not expose raw implementation messages, secrets, inaccessible record existence, or stack traces.
- Retry only an operation that is safe to retry; otherwise route to correction, status inspection,
  support, or owner-safe return.
- Partial success names both committed and uncompleted outcomes without implying atomicity.
- Error focus and live announcements are proportional: page-blocking failures are prominent;
  background/section failures do not interrupt unrelated work.

## 10. Validation

**Purpose:** prevent avoidable errors while preserving user control and input.

Rules:

- Validate when the user can act on the feedback: after relevant interaction, on step continuation,
  or at submission according to the field/task.
- Required, optional, format, range, relationship, permission, and owner-business validation remain
  distinguishable.
- Client validation supports the experience but never claims to replace owner-side validation.
- Keep valid entries, show specific recovery, and focus the summary or first actionable error.
- Suggestions and inferred values remain editable and expose their source when relevant.
- Validation copy is localized; user-entered content is not silently translated or normalized.

## 11. Confirmation

**Purpose:** obtain explicit human confirmation when an action's consequence warrants interruption.

Rules:

- Confirmation severity matches consequence and recoverability.
- State the action, owner scope, affected resource/count, and consequence in plain language.
- Action labels name the outcome; generic affirmative labels are avoided for consequential actions.
- Do not confirm routine, easily reversible actions merely to add friction.
- Typed or repeated confirmation is reserved for separately approved high-consequence actions.
- Pending confirmation execution cannot be submitted twice; failure keeps the consequence and
  recovery visible.
- Focus enters the dialog, stays within it, and returns to the logical trigger or resulting state.

## 12. Undo

**Purpose:** reverse a recently completed presentation or owner-approved reversible action.

Rules:

- Offer Undo only when reversal is truly supported for the completed action.
- State what will be restored and any time or scope limitation without relying on a countdown alone.
- Keep an accessible persistent alternative when the action is important and the transient Undo
  opportunity may be missed.
- Do not label a compensating workflow as simple Undo when it has separate business consequences.
- Do not offer false Undo for committed financial, stock, identity, permission, audit, or document
  outcomes unless the owner specification explicitly defines reversal.
- Failure to undo explains the current truthful state and next owner action.

## 13. Notifications

**Purpose:** communicate time-relevant owner state or required attention.

Notification presentation types:

- **inline status** for the current task;
- **toast** for low-risk transient confirmation;
- **banner** for persistent page/product impact;
- **inbox item** for durable user attention and return; and
- **external delivery** only under a separately approved notification capability.

Rules:

- Identify source owner, scope, time, severity, and authorized destination.
- Deduplicate or group repeated items without hiding distinct consequential events.
- Mark read/unread as presentation/delivery state, not domain completion.
- Do not use urgency to pressure optional product selection.
- Deep links reauthorize the owner destination and recover safely if stale.
- Notifications are translated, but source data and Business content retain their original meaning.
- Critical state never depends on color, motion, sound, or a badge alone.

## 14. Search

**Purpose:** find authorized destinations, records, assets, or answers within an explicit owner scope.

Rules:

- Label the current scope and allow a scope change only when authorized and understandable.
- Preserve query and filters across no-result, recoverable error, and result-detail return.
- Group cross-owner Core results by owner/source; Core search does not access OS internals directly.
- Commerce owns search over Commerce records and applicable operational context.
- Suggestions and recents are privacy-safe and reauthorized before display/selection.
- Result metadata identifies owner, type, scope, and freshness when material.
- Keyboard navigation, active result, result count/status, and no-result/error states are accessible.
- Locale-aware matching may vary, but canonical identifiers and user-entered data remain intact.

Current Core shell search is verified as navigation-destination search. Current Commerce search
chrome is not evidence of an implemented operational search capability.

## 15. Pagination

**Purpose:** provide predictable access to bounded record collections.

Rules:

- Use pagination when users need stable position, direct page movement, comparison, return, or a
  bounded review workload.
- Preserve query/filter/sort state and return position after visiting a detail.
- Expose current position and available movement semantically.
- Previous/next direction follows navigation meaning in RTL/LTR; labels remain explicit.
- Empty and final-page behavior do not silently reset the query.
- Page size or pagination mechanics are feature decisions; this document defines no transport contract.

## 16. Infinite Scroll

**Purpose:** support continuous discovery where exact position and total are not central to the task.

Rules:

- Do not use infinite scroll for high-consequence review, bulk operations, required completion, or
  collections where stable return/position matters.
- Provide keyboard and screen-reader access to newly loaded content without focus loss.
- Expose loading, end-of-results, retry, and partial-load state.
- Preserve a stable return position after opening a result.
- Provide an explicit load control or equivalent accessible fallback where automatic loading is unreliable.
- The owning feature chooses pagination or infinite scroll after task evidence; they are not
  interchangeable styling variants.

## 17. Filtering

**Purpose:** narrow a collection or analysis without obscuring active scope.

Rules:

- Show active filters, their combined effect, and a clear reset path.
- Distinguish no source data from filtered-empty results.
- Preserve filters during detail navigation and recoverable error.
- Filters expose labels, values, counts only when authorized, and applied/pending behavior.
- Compact filter drawers retain focus, applied/cancel semantics, and unsaved selection state.
- Locale-aware labels and values do not change stable filter meaning.

## 18. Sorting

**Purpose:** order a collection by an explicit comparable field.

Rules:

- Indicate active field and direction through text/semantics, not icon orientation alone.
- Use owner-approved, stable sort meaning; unknown/null handling is understandable where material.
- Preserve sort with filters, pagination, detail return, and error recovery.
- Locale-sensitive display does not silently alter canonical ordering when business rules require a
  specific order; the owning feature defines that policy.
- Tables expose sort state on headers; alternate list controls use named actions.

## 19. Selection

**Purpose:** identify one or more current items for comparison or owner action.

Rules:

- Make selection distinct from navigation and current-row focus.
- State selected count and scope; selection across pagination/filter changes is explicit.
- Clear inaccessible or stale items safely when context or permissions change.
- Preserve keyboard selection and non-color indication.
- A selected item is not an authorized item; the owner revalidates before action.
- On compact layouts, selection controls remain discoverable and do not replace the record's name.

## 20. Bulk Actions

**Purpose:** apply one owner-approved action to a clearly defined set.

Rules:

- Display action, selected count, scope, excluded/ineligible items, and consequence.
- Confirm proportionally and never assume all selected records share permission or valid state.
- Validate and report per-item or aggregate outcomes according to the owning feature.
- Partial failure identifies affected items without exposing inaccessible details.
- Keep selection after recoverable failure when safe; clear it after success only when that supports the next task.
- Bulk actions are not included in a shared component merely because a table supports selection.

## 21. Keyboard Shortcuts

**Purpose:** accelerate frequent work without replacing discoverable controls.

Rules:

- Every shortcut has an accessible ordinary-control alternative.
- Shortcuts are contextual, discoverable, localizable where labels are shown, and do not conflict
  with browser, operating system, input method, or assistive-technology conventions.
- Do not trigger destructive or consequential action without the same review/confirmation as pointer use.
- Suspend application shortcuts while typing or when an overlay owns input, unless the shortcut is
  explicitly safe and expected.
- Show the current context and command outcome; do not rely on memorization.
- Exact bindings belong to an approved component/feature specification.

## 22. Command Palette

**Purpose:** provide fast keyboard access to authorized destinations and, later, explicitly
approved owner actions.

Rules:

- Navigation-only is the safe initial scope.
- Group results by owner and command type; show active context.
- Search labels and keywords in the active locale while preserving stable command identity.
- Selecting a destination closes the palette and moves focus to the destination heading after guards.
- Action commands show scope/consequence and execute through the same owner flow, validation,
  permission, confirmation, and feedback as visible UI.
- The palette never hides unavailable reasons or becomes a shortcut around setup, readiness, or authorization.

## 23. Modal Behavior

**Purpose:** interrupt the current page for one bounded decision that requires retained page context.

Rules:

- Use a modal for focused decisions, not ordinary navigation, long forms, or multi-stage workflows.
- Provide a clear title, owner scope/consequence, explicit actions, and dismissal behavior.
- Move focus inside, contain it, support Escape when safe, and restore focus on close.
- Prevent background interaction and screen-reader traversal while modal.
- Warn before discarding unsaved work; a busy consequential action cannot be dismissed into ambiguity.
- On compact layouts, a modal may occupy more space but retains modal semantics and a visible close/recovery action.

## 24. Drawer Behavior

**Purpose:** expose contextual detail, filters, or bounded editing while preserving source context.

Rules:

- Use drawers when the source collection remains useful to the task; use a page when the workflow
  needs substantial comparison, history, or multiple stages.
- Logical side placement adapts to RTL/LTR without changing information order.
- Modal drawers use focus containment and background isolation; persistent wide-layout panels do not
  claim modal semantics.
- Preserve dirty state, validation, pending outcome, and focus return.
- Deep-linkable owner records should not exist only inside non-addressable drawer state when stable
  navigation is required.

## 25. Responsive Behavior

**Purpose:** preserve the task across compact, intermediate, and wide layouts.

Rules:

- Reflow by semantic priority and source order.
- Keep owner identity, material context, page purpose, primary action, errors, and recovery accessible.
- Replace a sidebar with a focus-managed drawer; do not merely move it off-screen.
- Tables use column priority, horizontal access, or structured alternatives without dropping material data.
- Overlays, filters, master/detail, and command surfaces adapt without changing owner or action semantics.
- Test zoom, text resize, long labels, mixed scripts, on-screen keyboards, and orientation changes.

## 26. Offline States

**Purpose:** explain loss of connectivity or owner availability without fabricating production durability.

Rules:

- Distinguish offline, service unavailable, expired session, stale cached projection, and owner-specific failure.
- Keep safely available read content labeled with freshness and source.
- Do not queue or promise writes offline unless the owning feature explicitly defines conflict,
  security, retry, ordering, expiry, and user-control behavior.
- Preserve unsubmitted local form input where safe and explain how/when the user can retry.
- Reconnection refreshes authorization and owner state before claiming success.
- Current browser mock/storage behavior is a frontend compatibility mechanism, not an approved
  offline-first architecture.
- Offline messages and recovery controls are accessible and bilingual.

## 27. Pattern Selection Matrix

| Need | Preferred pattern | Avoid when |
|---|---|---|
| Known content shape is resolving | Skeleton | Layout or outcome is unknown |
| Low-risk reversible action feels slow | Owner-approved optimistic UI | Outcome is consequential or reversal/conflict is undefined |
| Stable review/return position matters | Pagination | Continuous discovery is the validated task |
| Continuous low-consequence discovery | Infinite scroll with accessible fallback | Bulk work, completion, or stable position matters |
| One focused decision | Modal | Task is long, multistep, or needs substantial context |
| Contextual detail/edit with source visible | Drawer | Stable deep link or large workflow is required |
| Frequent navigation | Command palette | It would hide normal navigation or bypass owner guards |
| Recoverable reversible result | Undo | Reversal is actually a separate business operation |

## 28. Open Questions

1. Which first frontend slices contain actions safe enough for optimistic presentation, and which
   must remain pending until owner confirmation?
2. Which Commerce collections require pagination, and which—if any—benefit from infinite scroll?
3. Which navigation-only commands form the first command palette scope, and what evidence is
   required before any action command is added?
4. Which product surfaces, if any, require approved offline writes rather than preserved drafts and
   honest unavailable states?
5. Which actions support true Undo, and which require an explicit owner reversal workflow?
6. Which current drawer-only record interactions require stable detail routes for deep linking and
   safe return?

## 29. Verified Against

This document was verified against:

- [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md),
  [Screen Map](../03-ui-ux/02-SCREEN-MAP.md),
  [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md),
  and [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md);
- `docs/10-design-intelligence/01-DESIGN-PHILOSOPHY.md`, `02-DESIGN-DNA.md`,
  `05-DESIGN-PATTERNS.md`, `06-COMPONENT-GOVERNANCE.md`, and
  `DESIGN-QUALITY-CHECKLIST.md`;
- `docs/11-execution/05-FRONTEND-FIRST-POLICY.md` and `06-MOCK-DATA-STANDARD.md`;
- current Core shell search, context menu, notification, toast, authentication, onboarding, and
  state-notice behavior;
- current Commerce shell, drawer, modal, toast, table, filter, POS, and record behavior; and
- current Feature 052 through Feature 055 state/recovery evidence referenced by Product Experience.

## 30. Cross References

- [Design System index](./README.md)
- [Design Foundations](./01-DESIGN-FOUNDATIONS.md)
- [Design Tokens](./02-DESIGN-TOKENS.md)
- [Component Catalog](./03-COMPONENT-CATALOG.md)
- [Page Templates](./04-PAGE-TEMPLATES.md)
- [Product Experience index](../03-ui-ux/README.md)
- [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md)
- [Design Patterns](../10-design-intelligence/05-DESIGN-PATTERNS.md)
