# Localization and Locale Experience Specification

- **Version:** 1.0 reconciliation candidate
- **Status:** Canonical localization UX authority candidate; implementation not authorized
- **Launch languages:** English and Arabic
- **Extensibility:** Any configured language; no hard-coded language-count ceiling
- **Owner:** Product Experience and Localization, within Core Platform coordination and each owning application's UI
- **Architecture:** Core Platform Architecture v1.1 Freeze and Accepted ADR-041

## 1. Purpose

This document defines the product-experience authority for locale-aware NexoraXS experiences. It
requires a locale-independent presentation boundary that can support an open-ended set of configured languages,
while English and Arabic are the only launch languages currently required.

“Unlimited languages” means the architecture and product UI impose no fixed two-language union,
switch statement, route fork, or resource-count limit. A language becomes supported only when its
metadata, namespaces, translations, formatting expectations, and validation evidence are supplied.
It does not mean every human language ships at launch.

## 2. Scope

This specification covers:

- configured locale discovery, resolution, switching, fallback, and persistence presentation;
- translation resources and namespace loading;
- LTR/RTL direction and mixed-script content;
- plural, number, percentage, date, time, currency, relative-time, and timezone presentation;
- missing translations, diagnostics, and safe fallback;
- public Landing, authentication, Core Platform, Business Architect/Blueprint/Recommendations,
  Product Hub, Commerce, document/print, and reusable component copy; and
- frontend acceptance and test evidence.

## 3. Out of Scope

This document does not:

- define a backend API, DTO, database schema, translation-management vendor, or framework library;
- assign canonical persistence ownership or override unresolved locale-preference precedence;
- translate user-entered Business or Commerce data automatically;
- define governed translation of canonical Business facts;
- localize a future Operating System that has not been authorized for implementation; or
- change Core Platform/Commerce ownership.

## 4. Normative Language

**MUST**, **MUST NOT**, **SHOULD**, and **MAY** express frontend acceptance requirements. They do
not elevate this UX document above Architecture, Accepted ADRs, or Freeze documents.

## 5. Locale Engine

### 5.1 Responsibilities

The Locale Engine MUST provide one frontend coordination boundary for:

1. a runtime registry of configured locales;
2. locale resolution from an approved source and safe fallback;
3. translation namespace loading and message lookup;
4. language and text-direction metadata;
5. plural and selection rules;
6. number, currency, date, time, relative-time, and list formatting;
7. time-zone-aware rendering;
8. document `lang` and `dir` synchronization;
9. preference change notification within an app and through accepted cross-app handoff;
10. missing-key diagnostics and production-safe fallback; and
11. deterministic test substitution.

The engine MUST be presentation-only. It MUST NOT become the source of truth for User, Workspace,
Business, subscription, or OS operational data.

### 5.2 Locale registry

Each configured locale definition MUST supply, conceptually:

- a valid locale identifier suitable for standards-based formatting;
- user-visible native and localized language names;
- text direction (`ltr` or `rtl`);
- a fallback locale chain;
- available translation namespaces and their resource versions;
- default formatting metadata only where standards-based locale data is insufficient; and
- enabled/disabled or launch-availability presentation.

This list defines required metadata, not a storage schema or TypeScript contract.

The registry MUST:

- accept any number of locale definitions;
- reject duplicate or invalid identifiers;
- avoid hard-coded `en`/`ar` branching outside launch configuration;
- expose only supported/configured options to users;
- permit a locale to be configured but temporarily unavailable with an explicit state; and
- define one safe application fallback locale through approved configuration.

### 5.3 Launch configuration

| Locale | Launch requirement | Direction | Notes |
|---|---|---|---|
| English | Required | LTR | Launch language and safe fallback candidate, subject to approved configuration |
| Arabic | Required | RTL | Equal launch quality; not a secondary or post-launch translation |
| Any additional configured locale | Not required for launch | Registry-defined | Must pass the same namespace, format, direction, and accessibility gates before enablement |

At least one non-launch test locale SHOULD be exercised in automated engine tests to prove that
the implementation is not structurally limited to English and Arabic. This does not make that
locale customer-visible.

## 6. Locale Resolution and Persistence

### 6.1 Resolution behavior

The frontend MUST resolve exactly one effective presentation locale before rendering localized
protected content. It MUST validate persisted input against the active locale registry. An unknown,
disabled, malformed, or unavailable locale MUST resolve through the configured fallback chain.

The resolver MUST distinguish:

- **requested locale:** the user's current selection or an approved incoming preference;
- **effective locale:** the supported locale actually used for messages and formatting;
- **fallback locale:** the locale used when a resource is unavailable; and
- **content language:** the language of user-entered content, which may differ from the interface.

### 6.2 Current implementation evidence

Core and Commerce currently persist a JSON-encoded `en`/`ar` value in browser session storage under
`nexoraxs.session.locale`, apply `<html lang>` and `<html dir>`, and share a small dictionary in
`packages/shared/src/mock-db/schema.ts`. Core additionally has a deprecated `core_locale` path in
`apps/core-platform/lib/locale.ts`. These two Core paths are implementation drift, not the target
engine.

### 6.3 Persistence requirements

- Anonymous selection MUST persist for the browser scope so navigation and refresh do not reset the
  experience.
- Authenticated selection MUST remain stable across Core and accepted OS handoffs.
- A locale switch MUST preserve the current route, safe form draft, selection, focus, and
  authorized context.
- Failed persistence MUST NOT undo the visible switch without explanation; the UI MUST identify
  that the preference may be temporary.
- Client persistence MUST be treated as preference input, never proof of identity or authorization.
- Core-to-Commerce handoff MAY carry the effective presentation locale as non-authoritative UI
  context; Commerce remains responsible for applying it to Commerce UI.

The final precedence among browser, User, Workspace, and other possible preference sources is not
Accepted in the reviewed authority. This document therefore does not choose it. Production
account/Workspace persistence is blocked until Governance approves that precedence; the Locale
Engine MUST accept the resolved authoritative preference through a replaceable boundary rather
than embedding precedence in components.

## 7. Translation Resources and Namespaces

### 7.1 Namespace model

Translations MUST be grouped by stable UI concern so an application loads only what it needs and
owners can validate their surfaces independently. The initial namespace plan is:

| Namespace | Responsibility |
|---|---|
| `common` | Generic actions, shared statuses, formatting labels, accessibility utilities |
| `navigation` | Shell, menus, breadcrumbs, search, command palette, safe return |
| `auth` | Login, Register, verification, recovery |
| `workspace-onboarding` | Workspace introduction/creation and Core setup |
| `business-architect` | Introduction, interview, supporting information, review, resume |
| `business-blueprint` | Blueprint sections, provenance, partial/stale presentation |
| `recommendations` | Recommendation list/detail, explanation, disposition |
| `platform-dashboard` | Core home and next actions |
| `product-hub` | Product discovery, availability/access/setup/ready presentation |
| `team-access` | Membership and access-management presentation |
| `billing` | Billing and subscription presentation |
| `settings` | Profile, Workspace, locale, appearance, and approved settings copy |
| `commerce-common` | Commerce shell and shared operational copy |
| `commerce-setup` | Commerce-owned setup journey |
| `commerce-pos` | POS, checkout, sale success, and recovery |
| `commerce-products` | Product list/editor |
| `commerce-inventory` | Inventory, movements, transfers |
| `commerce-customers` | Customer list/detail/editor |
| `commerce-orders` | Order list/detail and Return initiation |
| `commerce-invoices` | Invoice list/detail/document |
| `commerce-returns` | Return list/detail/document |
| `commerce-reports` | Commerce reporting |
| `validation` | Reusable validation messages parameterized by field/context |

These names are frontend resource boundaries, not backend services or domain ownership changes.

### 7.2 Message requirements

Every user-visible message MUST have a translation path, including:

- headings, labels, descriptions, links, buttons, menu items, breadcrumbs, tabs, and tooltips;
- placeholders, help text, validation, confirmation, errors, toasts, empty states, and recovery;
- loading/skeleton accessible names and progress announcements;
- table headings, filters, sort labels, pagination, bulk actions, and export presentation;
- dialog/drawer titles, close labels, and focus-return messages;
- image alternative text, `aria-label`, `aria-description`, and live-region copy;
- document titles, printable Invoice/Return labels, footer copy, and print actions;
- metadata that is visible to users or assistive technology; and
- dynamic messages with named parameters and plural/select branches.

Source components MUST NOT embed translatable prose as hard-coded strings. Brand names,
user-entered content, stable external identifiers, and values explicitly governed as non-
translatable remain exceptions, but surrounding labels still require translation.

## 8. Fallback Language and Missing Translations

### 8.1 Fallback chain

Message resolution MUST use an explicit chain:

1. exact effective locale resource;
2. configured parent/locale-specific fallback where applicable;
3. configured application fallback locale; and
4. a production-safe generic message for critical failure surfaces.

Fallback MUST be resolved per message/namespace without changing the user's effective locale or
document direction. A fallback message in a different script MUST still render safely within the
active layout.

### 8.2 Missing-key behavior

- Development/test environments MUST expose a deterministic diagnostic containing locale,
  namespace, and key.
- Production MUST NOT expose raw translation keys, stack traces, secrets, or tenant data.
- Critical actions MUST use a safe generic localized label/message when their exact key is missing;
  they MUST NOT become unlabeled controls.
- Missing-key diagnostics MUST be observable without recording user-entered sensitive content.
- A missing optional label MAY render its configured fallback; an entire missing critical
  namespace MUST produce an explicit degraded/error state and safe recovery.
- Release validation MUST fail for missing required launch-language keys in affected namespaces.

## 9. Pluralization, Selection, and Interpolation

- Plural selection MUST use locale-aware plural categories, not English singular/plural branching.
- Arabic launch coverage MUST include its applicable plural categories in representative tests.
- Counts MUST remain numeric parameters; translators control word order and grammatical form.
- Gender, grammatical selection, and contextual variants MUST use named selection data only when
  product requirements supply it; the UI MUST NOT infer sensitive attributes.
- Interpolation MUST escape untrusted values by default and MUST NOT construct translated markup
  through unsafe string concatenation.
- Messages containing links/emphasis SHOULD use structured rich-message composition with semantic
  elements, not HTML embedded in translation resources.

## 10. Date, Time, Timezone, Number, and Currency Formatting

### 10.1 Dates and times

- Dates and times MUST use standards-based locale formatting.
- The formatter MUST accept an explicit effective locale and approved effective timezone.
- UI copy MUST distinguish absolute, relative, and date-only values.
- Relative time MUST use locale-aware units/plurals and must provide an exact value where ambiguity
  is consequential.
- Parsing/storage formats MUST remain separate from localized presentation; this document does not
  define persistence formats.
- Ambiguous timezone values MUST display enough context for the user to understand the effective
  zone.

### 10.2 Timezone support

- The UI MUST support valid configured timezones rather than a fixed country list.
- Workspace/Business/Branch/user timezone precedence is an ownership decision and MUST be supplied
  by an approved resolver; components MUST NOT guess it.
- Cross-app handoff MUST preserve the effective presentation timezone as approved read context.
- Calendar-day boundaries in Commerce reports or operations MUST come from the owning domain's
  approved scope, not the browser clock alone.

### 10.3 Numbers and currency

- Numbers, percentages, units, and currency MUST use locale-aware formatters.
- Currency formatting MUST receive an explicit currency code from approved context; locale alone
  MUST NOT choose commercial currency.
- Amounts MUST retain exact owner-provided numeric meaning; localized formatting changes only
  presentation.
- POS, Orders, Invoices, Returns, Billing, and Reports MUST use consistent currency/rounding
  presentation supplied by the owner policy.
- Search/filter inputs that accept numbers MUST explain accepted localized input and normalize it
  safely before owner validation.

## 11. Direction: LTR, RTL, and Mixed Script

### 11.1 Document direction

- The root application document MUST set valid `lang` and `dir` before localized protected content
  becomes interactive.
- Direction MUST come from locale metadata, not an `ar` special case.
- Every supported locale MUST declare direction.
- Portals, dialogs, toasts, print documents, and overlays MUST inherit or explicitly receive the
  effective direction.

### 11.2 Layout rules

- Layout and positioning MUST use logical start/end, inline/block, and direction-aware navigation.
- Components MUST NOT assume left means previous, right means next, or one physical edge owns the
  sidebar/drawer.
- Directional icons MUST mirror only when their meaning is directional; brand marks, media,
  charts, clocks, and universal symbols require semantic review.
- Tables, pagination, steppers, breadcrumbs, carousels, charts, and document previews MUST be
  validated in both directions.
- Focus order and DOM order MUST remain logical; visual reversal MUST NOT create an inaccessible
  keyboard sequence.

### 11.3 Mixed-script and user data

- User-entered Business, Product, Customer, address, identifier, and document data MUST render as
  entered unless a governed translation workflow exists.
- Containers for unknown user data SHOULD use automatic bidirectional isolation where appropriate.
- Email, phone, codes, SKU, invoice numbers, currency values, and identifiers MUST remain readable
  inside RTL content.
- The UI MUST guard against bidirectional control-character abuse in security-sensitive identifiers
  through safe rendering and review, without silently rewriting canonical values.

## 12. Locale Switching Interaction

The switch flow MUST:

1. expose all enabled locale definitions using readable native names;
2. announce the selected locale and direction to assistive technology;
3. preserve current task data, focus, route, context, and safe scroll position;
4. load required namespaces and formatting metadata;
5. apply messages, formatting, `lang`, and `dir` as one coherent transition;
6. persist at the approved scope;
7. show a non-blocking progress state only when switching is not immediate; and
8. keep the last usable locale and offer retry if resources fail.

Changing locale MUST NOT submit a form, reset Business Architect progress, re-run Business
Analysis, mutate Business Blueprint, change commercial currency, or alter Commerce operations.

## 13. Loading and Hydration

- Server/client output MUST avoid exposing the wrong language or direction before hydration.
- A protected shell MUST not flash another locale's sensitive content while resolving preference.
- Namespace loading states MUST be accessible and layout-stable.
- Skeletons SHOULD avoid language-specific fake text lengths; final translated content must be
  allowed to expand.
- Locale resources required for the first meaningful screen SHOULD be available at initial render;
  later namespaces MAY load on demand with recovery.

## 14. Accessibility Requirements

- Language changes MUST update the document language and preserve accessible names.
- All controls MUST have translated names, descriptions, errors, and status announcements.
- Error association, focus movement, live regions, and reading order MUST work in LTR and RTL.
- Zoom, text expansion, and longer translations MUST not hide controls or require two-dimensional
  scrolling except where data-table semantics genuinely require it.
- Speech/assistive technology tests MUST cover English and Arabic critical flows.
- Locale choice MUST not be represented by flags alone.

## 15. Ownership and Application Boundaries

| Concern | UX responsibility |
|---|---|
| Locale coordination and approved preference projection | Core Platform coordination boundary |
| Core/Landing/Business Architect/Blueprint/Recommendations copy | Core/Landing owning frontend teams using shared engine behavior |
| Commerce operational copy and formatting | Commerce owning frontend using shared engine behavior |
| Reusable component labels/states | Shared presentation package only when business-neutral |
| User-entered/canonical data | Owning domain; Locale Engine formats presentation but does not translate or own the fact |
| Translation resources | Owning UI concern with Localization review and namespace completeness evidence |

Shared localization utilities MUST remain business-neutral. They MUST NOT turn `packages/shared` or
`packages/ui` into an ownerless Business/Commerce logic module.

## 16. Current-to-Target Gap

| Requirement | Current evidence | Target status |
|---|---|---|
| Open-ended locale registry | `Lang` is restricted to `en` and `ar`; controls expose two options | Missing |
| Launch English/Arabic | Dictionary and selected feature messages exist | Partial |
| Document `lang`/`dir` | Core and Commerce AppProviders apply values | Implemented for current two locales |
| Namespace model | Feature-specific Commerce files and shared flat `DICT` | Partial/fragmented |
| No hard-coded strings | Hard-coded copy across Landing, auth, onboarding, dashboards, settings, reports, setup, documents | Missing |
| Pluralization | Ad hoc message interpolation/English branching | Missing as a platform rule |
| Date/number/currency formatting | Scattered helper/current mock formatting | Partial |
| Timezone-aware presentation | Workspace mock timezone shown; no unified formatter/resolver | Partial |
| Fallback chain | Unknown locale generally coerced to English | Minimal |
| Missing-key handling | Shared translator behavior exists for flat keys; no complete production policy | Partial |
| Cross-app persistence | Shared session key currently used | Partial and browser-only |
| Mixed-script/RTL validation | Core shell and selected Commerce tests | Partial, not app-wide |

## 17. Acceptance Criteria

1. The Locale Engine accepts an arbitrary registry and has no two-language type restriction in its
   core behavior.
2. English and Arabic contain every required key for each enabled launch namespace.
3. A non-launch test locale proves registry, fallback, namespace, plural, and direction metadata
   are data-driven without becoming customer-visible.
4. Every current route in [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md) renders without
   hard-coded user-facing copy in the affected implementation slice.
5. Locale switching preserves route, draft, focus, safe context, and user-entered text.
6. `lang`, `dir`, messages, plural rules, formatting, and layout update coherently.
7. English/LTR and Arabic/RTL critical journeys pass keyboard and accessibility validation.
8. Missing launch keys fail validation; production fallback never exposes raw keys.
9. Currency is explicit and is never inferred solely from locale.
10. Timezone comes from an approved resolver and is never guessed by a page component.
11. Core/Commerce handoff preserves effective presentation locale without transferring ownership.
12. No localization change introduces a backend contract, schema, or canonical data translation.

## 18. Test and Release Evidence

Required evidence for each affected frontend slice:

- locale registry and invalid-locale unit tests;
- namespace completeness and duplicate-key checks;
- plural/selection tests for English, Arabic, and an internal extensibility fixture;
- date, time, number, percentage, currency, list, and relative-time formatter tests;
- fallback and missing-key tests in development and production modes;
- route-level English/LTR and Arabic/RTL visual/interaction checks;
- keyboard, focus, semantics, screen-reader-name, and critical accessibility checks;
- mixed-script, long-copy, compact viewport, dialog/drawer, table, and print validation;
- refresh and Core/Commerce handoff persistence tests; and
- safe telemetry verification with no secrets or unauthorized tenant data.

## 19. Relationships

- [Platform Experience](./01-PLATFORM-EXPERIENCE.md)
- [Screen Map](./02-SCREEN-MAP.md)
- [Information Architecture](./04-INFORMATION-ARCHITECTURE.md)
- [User Journeys](./05-USER-JOURNEYS.md)
- [User Flows](./06-USER-FLOWS.md)
- [Accessibility](./09-ACCESSIBILITY.md)
- [Design Foundations](../04-design-system/01-DESIGN-FOUNDATIONS.md)
- [Interaction Patterns](../04-design-system/05-INTERACTION-PATTERNS.md)

## 20. Open Questions

- What Accepted preference precedence applies among anonymous browser, authenticated User,
  Workspace, and any owning-application presentation preference?
- Which approved timezone resolver supplies the effective zone when User, Workspace, Business,
  Business Unit, and Branch context differ?
- Which translation-resource governance process and release owner approves a new customer-visible
  locale?

These questions do not change the architectural obligation to avoid hard-coded user-facing text,
support an open-ended locale registry, complete launch-language resources, and provide RTL/LTR
parity. They do block claims about final account/Workspace preference persistence and precedence.
This document does not authorize implementation of those obligations.

## 21. Verified Against

- repository AGENTS instructions and `.specify/memory/constitution.md`;
- [Core Platform Architecture v1.1](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md),
  [ADR-041](../00-governance/ADR/ADR-041-global-localization-internationalized-representation.md),
  [Product Decisions](../00-governance/PRODUCT-DECISIONS.md), and applicable Global Platform sources;
- [Platform Experience](./01-PLATFORM-EXPERIENCE.md), [Screen Map](./02-SCREEN-MAP.md),
  [Information Architecture](./04-INFORMATION-ARCHITECTURE.md), and
  [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md);
- `packages/shared/src/mock-db/schema.ts`, Core/Commerce AppProviders and locale controls, Core
  locale/browser adapters, Commerce feature message files, and shared direction-aware CSS;
- all current Landing, Core Platform, and Commerce route content for hard-coded-string evidence;
  and
- existing Feature 050 and Features 052–055 localization/accessibility tests as current evidence.
