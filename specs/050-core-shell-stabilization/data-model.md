# Presentation and Compatibility Data Model

**Feature**: `050-core-shell-stabilization`
**Scope**: Core Platform frontend presentation only

This feature creates no canonical domain model, database model, backend DTO, API resource, or
migration. Every concept below is reconstructable from the existing mock facade and current route
configuration. Canonical Workspace, Business, Business Unit, Branch, Notification, subscription,
and Commerce facts retain their frozen owners.

## 1. Shell Navigation Item

A Core-owned destination already available in the current shell.

| Field | Type | Rules |
|---|---|---|
| `id` | stable presentation string | App-local; not a domain identifier. |
| `href` | existing route string | One of the preserved current destinations; no rewritten URL. |
| `labelKey` | translation key | Must resolve in English and Arabic. |
| `icon` | approved existing icon key/component | Decorative when adjacent text supplies the name. |
| `match` | exact/prefix rule | Preserves current active-route behavior. |
| `searchable` | boolean | Search inclusion only; never a permission grant. |

Relationships: supplied by `CoreShell`, rendered by `Shell`, and optionally projected into a
`Core Search Entry`. The existing order remains Product Hub, Billing, Team, Integrations, Settings.
`/dashboard` remains a valid route but is not added to the current sidebar.

Validation:

- `href` must be a current compatible destination.
- Current state uses `aria-current="page"` in addition to existing visuals.
- Labels and order cannot change except for localized copy correction.

## 2. Core Search Entry and Result

A local destination projection for the existing search placement.

| Field | Type | Rules |
|---|---|---|
| `id` | presentation string | Stable within the local catalog. |
| `kind` | `navigation \| installed-application \| setting \| documentation` | Documentation is absent when no runtime link exists. |
| `labelKey`/`label` | localized presentation text | No raw Business or Commerce record content. |
| `keywords` | localized string array | Static, non-sensitive, and app-local. |
| `href` | existing destination | No command or newly invented route. |
| `availability` | `available \| unavailable` | Unavailable entries are not offered as actionable results. |

`Core Search Result` is the ranked/filtered view of a `Core Search Entry`; it adds no owner or
persistence. An empty query yields the documented neutral state; no match yields an explicit empty
state. Duplicate labels remain distinguishable by kind/destination.

Validation:

- Exclude business records, Commerce facts, other OS facts, Marketplace, platform-global content,
  AI output, and commands.
- Result selection performs normal navigation to the existing `href`.
- Query and result state are ephemeral and never stored in browser compatibility keys.

## 3. Shell Context Snapshot

The minimum read-only input needed to evaluate current mock context.

| Field | Type | Rules |
|---|---|---|
| `actorId` | existing user ID or `null` | Presentation context only; not proof of authorization. |
| `workspaceId` | stored Workspace ID or `null` | Exact current session value. |
| `workspace` | existing Workspace view or `null` | Must match `workspaceId`. |
| `legacyBusinessUnitId` | stored BusinessUnit ID or `null` | Exact compatibility value; never relabelled in the contract as canonical Business. |
| `legacyBusinessUnit` | existing BusinessUnit view or `null` | Must belong to the selected Workspace when present. |
| `branchId` | stored Branch ID or `null` | Exact compatibility value. |
| `branch` | existing Branch view or `null` | Must belong to the selected Workspace and BusinessUnit when present. |

This snapshot is additive to the current facade and read-only. It does not replace or change any
existing `useApp` field or mutation.

## 4. Shell Context View and Validation Result

A reconstructable result consumed by the global Core shell.

| Field | Type | Rules |
|---|---|---|
| `status` | `ready \| missing \| stale \| cross-scope \| unavailable` | Deterministic from the snapshot. |
| `workspaceId` | existing ID or `null` | Echoes the input; no inferred replacement. |
| `workspaceName` | entered display value or fallback | User-entered name is never auto-translated. |
| `globalDisplayLevel` | literal `workspace` | Global Core shell never gains Business/BusinessUnit/Branch selectors. |
| `reason` | bounded reason code or `null` | Localizable and safe; no foreign-tenant detail. |
| `recoveryHref` | existing safe Core route or `null` | Must not create/reset organization state. |

Validation precedence:

1. No selected Workspace → `missing`.
2. Selected Workspace ID cannot be resolved → `stale`.
3. Resolved BusinessUnit or Branch conflicts with selected ancestry → `cross-scope`.
4. Required presentation dependency cannot be evaluated → `unavailable`.
5. Otherwise → `ready`.

Recovery never silently selects a Workspace, BusinessUnit, or Branch. The global display includes
only Workspace even when the evaluator checks the full legacy tuple for safety.

## 5. Legacy Business Context

A compatibility-only reference for pages that already display `BusinessUnit` as Business.

| Field | Type | Rules |
|---|---|---|
| `businessUnitId` | existing `BusinessUnit.id` | Preserved exactly. |
| `displayLabel` | localized legacy label | “Business”/current Arabic equivalent for compatibility only. |
| `displayName` | existing `BusinessUnit.name` | Stored/displayed as entered. |
| `compatibilityStatus` | literal `legacy-compatible` | Prevents canonical interpretation. |

No separate `businessId`, Business aggregate, parent migration, or canonical ownership statement
exists in this feature.

## 6. Notification Presentation Item and Projection

A read-only view mapped from current mock values.

| Field | Type | Rules |
|---|---|---|
| `id` | stable presentation key | May reference an existing source ID but is not a canonical Notification ID. |
| `kind` | `plan \| out-of-stock \| low-stock \| latest-order` | Matches current visible outcomes. |
| `tone` | presentation tone | Uses existing semantic state colors plus text/icon cues. |
| `message` | localized presentation payload | Preserves current source values and formatting. |
| `sourceOwner` | `core-compatibility \| commerce-compatibility` | Explicit provenance; never transferred ownership. |
| `readOnly` | literal `true` | No mark-read, delete, stock, order, or subscription mutation. |

`Notification Projection` contains ordered `items`, `hasIndicator`, and `state` (`ready`, `empty`,
or `unavailable`). The initial adapter must preserve current ordering and indicator behavior before
any approved copy/semantic enhancement.

## 7. Shell Presentation State

A persistent, presentation-only status for a shell read or context evaluation.

| Field | Type | Rules |
|---|---|---|
| `kind` | `loading \| ready \| empty \| error \| unauthorized \| unavailable \| recovering` | States are textually and semantically distinct. |
| `titleKey` | translation key | Required except `ready`. |
| `descriptionKey` | translation key | Safe, actionable explanation. |
| `busy` | boolean | Exposed programmatically when asynchronous. |
| `action` | safe existing action or `null` | Retry read or navigate only; no domain write/reset. |
| `announcement` | `none \| polite \| assertive` | Avoid duplicate announcements. |

`unauthorized` is a mock presentation outcome, not production authorization proof. Production
Audit, telemetry, and authorization remain outside this frontend-only feature.

State transitions:

```text
loading -> ready | empty | error | unauthorized | unavailable
error | unavailable -> recovering -> ready | empty | error | unavailable
ready -> loading                     (route or bounded read changes)
```

Retries repeat only the failed presentation read/evaluation and never a write.

## 8. Shell Preference View

The presentation view of existing preferences.

| Field | Type | Rules |
|---|---|---|
| `locale` | `en \| ar` | Uses `nexoraxs.session.locale`. |
| `direction` | `ltr \| rtl` | Derived from locale and reflected on `<html>`. |
| `theme` | `light \| dark` | Uses `nexoraxs.ui.theme`. |
| `reducedMotion` | boolean | Derived from user-agent media preference; not persisted by this feature. |

No `core_locale`, `core_theme`, or new preference key is introduced or consolidated.

## 9. Transient Surface Interaction State

Ephemeral state shared conceptually by drawer, context popup, search results, notifications, and
profile menu.

| Field | Type | Rules |
|---|---|---|
| `open` | boolean | Reflected in `aria-expanded` where applicable. |
| `triggerId` | DOM identifier | Connects popup/drawer to its opener. |
| `surfaceId` | DOM identifier | Used by `aria-controls`/labelling. |
| `openedBy` | `keyboard \| pointer \| programmatic` | Guides initial focus without changing outcomes. |
| `restoreFocus` | boolean | Returns focus when closure does not navigate away. |

This state is not stored. Only the most recently opened transient surface responds to Escape;
route/viewport changes close stale surfaces and release focus containment.

## Explicitly excluded concepts

- Breadcrumb segment or breadcrumb state
- Command or quick-action model
- AI Assistant or AI search model
- Canonical Business model or Business/BusinessUnit migration mapping
- `OSEnablement` replacement/state machine
- Notification center, persistence, or canonical Notification write model
- Backend/API/database/SDK/auth/repository model
- Commerce operational mutation of any kind
