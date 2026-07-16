# ADR-041: Govern Global Localization and Internationalized Representation

## Status

Proposed

This is the next valid ADR number after the permanent `ADR-001` through `ADR-040` sequence. This
proposal has no architectural authority until it completes Product Owner approval, independent
Architecture Review, and the repository ADR acceptance workflow.

## Context

The [Global Platform Architecture Freeze v1.0](../../99-architecture-freeze/GLOBAL-PLATFORM-v1.0-FREEZE.md)
approves Localization and Internationalized Representation as a Core-coordinated logical
responsibility. It assigns presentation-context accountability to Core Settings and Localization
while requiring every product to retain ownership of its own presentation surface. It also
preserves `DADR-GP-05` as a non-Accepted future ADR subject and leaves these decisions unresolved:

- `DD-GP-10`: language and locale preference precedence, content treatment, and fallback; and
- `DD-GP-11`: RTL/LTR separation, translation provenance, versioning, correction, history, and
  cross-owner localization participation.

The [Global Platform Proposal localization principles](../../07-global-platform/02-GLOBAL-PLATFORM-PROPOSAL.md#20-localization-principles)
already establish that presentation must not mutate canonical meaning, that user-entered data is
preserved as entered, and that RTL/LTR is presentation context. The
[Global Platform Discovery questions](../../07-global-platform/00-GLOBAL-PLATFORM-DISCOVERY.md#344-localization-language-and-internationalization-gpoq-19-through-gpoq-24)
show that preference order, fallback, content treatment, provenance, and cross-owner participation
remain unanswered.

The [Core Platform Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md#21-identity-tenancy-and-organization)
assigns platform preferences, language, locale, direction, timezone, and currency context to Core
Settings and Localization. Its Navigation Architecture requires locale and direction to be
resolved without changing route ownership, authorization, readiness, or safe return behavior. The
[Core Platform Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md#settings-and-localization-context)
also preserves user-entered Business data as entered.

The [Core Platform Freeze v1.0](../../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
requires technology-independent, versioned, backward-compatible contracts and permits
multi-language evolution without transferring ownership. The
[Constitution](../../../.specify/memory/constitution.md#x-bilingual-accessible-product-quality)
and [AGENTS.md](../../../AGENTS.md#12-localization-and-accessibility) require Arabic and English,
RTL/LTR support, logical layout, accessibility, and explicit treatment of user-entered data for
every user-facing feature.

Current frontend behavior is implementation evidence, not architecture. It includes the active
`nexoraxs.session.locale` compatibility key and older `core_locale` and `nexoraxs_locale` paths.
These values currently support English and Arabic in browser session state. They must not become
the canonical definition of User preference, Workspace default, or cross-application contracts.

### Product Owner Decision Provenance

| Provenance field | Value |
|---|---|
| Owner | Product Owner |
| Decision date | 2026-07-16 |
| Decision-log namespace | `PO-LOCALIZATION` |
| Governance role | Durable Product decision inputs to this Proposed ADR; not architecture acceptance |

The local decision IDs are fully qualified by the `PO-LOCALIZATION` namespace:

| Local ID | Fully qualified ID | Decision |
|---|---|---|
| `D-008` | `PO-LOCALIZATION:D-008` | Localization requires an Accepted ADR before implementation. |
| `D-009` | `PO-LOCALIZATION:D-009` | Welcome remains presentational until preference ownership and precedence are governed. |
| `D-010` | `PO-LOCALIZATION:D-010` | Welcome will not select currency or timezone in the first slice. |
| `D-011` | `PO-LOCALIZATION:D-011` | `DADR-GP-05` is handled before `DADR-GP-06`. |
| `D-012` | `PO-LOCALIZATION:D-012` | Authentication pages remain frozen. |

These are local Product decision-log identifiers. They are not Core Platform `D-*` Deferred
Decision identifiers, Global Platform `DD-GP-*` identifiers, Draft ADR identifiers, or Accepted
Governance ADR identifiers.

This ADR proposes only the architecture needed to resolve `DD-GP-10` and `DD-GP-11`. It does not
accept itself, alter a Freeze, authorize implementation, make Welcome a lifecycle stage, or answer
the temporal, currency, numeric, or address questions preserved for `DADR-GP-06`.

## Decision

If accepted, NexoraXS adopts a technology-independent Localization Context contract governed by
the following decisions.

### 1. Localization is presentation context

Localization controls how authorized information and product messages are represented to a
person. It never:

- grants or changes authorization;
- changes Workspace, Business, Business Unit, Department, Branch, OS, actor, or resource scope;
- changes Core Workspace Ready or Operating System Ready;
- creates or completes onboarding, setup, configuration, activation, or another lifecycle;
- changes canonical Business, OS, document, monetary, transaction, temporal, address, or
  historical facts;
- translates user-entered or owner-domain content in place; or
- transfers canonical ownership to Core Settings and Localization, a shared package, or another
  product.

Welcome may present a language choice, but it remains a presentation surface. It is not a
canonical lifecycle stage and a language selection is not proof of authentication, onboarding,
readiness, consent to persist an authenticated preference, or authority to update Workspace
defaults. Authentication page routes, visual design, and behavior remain unchanged by this ADR.

### 2. Language and locale are distinct

**Language** identifies the language and, when necessary, script used for product messages and
translated representations. It determines which approved message resource is requested.

**Locale**, within the scope of this ADR, identifies only the message-localization rules applicable
to a language or audience. It may influence only:

- message selection;
- pluralization;
- grammar; and
- interpolation.

Locale in this ADR explicitly does not govern date formatting, number formatting, currency
semantics, timezone semantics, deadlines, or addresses. Those meanings and formatting policies
remain deferred to `DADR-GP-06` and the applicable canonical owners. Locale also does not define
tax, jurisdiction, transaction meaning, or another owner-domain fact.

A Language preference and a Locale preference:

- may be selected and persisted independently;
- use stable, standards-based identifiers capable of representing language, script, and regional
  variation without restricting the platform to English and Arabic;
- are validated against a governed supported-language and supported-locale registry;
- retain their source and resolution reason; and
- never infer or overwrite each other when an explicit value exists.

Direction is resolved from governed language-and-script metadata, not from currency, country,
Workspace type, OS, or a left/right layout assumption.

### 3. Resolution is deterministic and source-attributed

Language and Locale are resolved independently. Each resolved value carries at least:

- the resolved identifier;
- the winning source and scope;
- whether fallback was used;
- the resource or policy version used; and
- a safe degraded or conflict status when applicable.

Resolution never copies a higher-level preference into a lower-level canonical fact. A Workspace
default can be consumed as a default without becoming a User preference. A browser hint can be
consumed without becoming either one.

## Freeze and Candidate Register Impact

If Accepted, this ADR has only the following effect on the frozen Global Platform registers:

1. `ADR-041` resolves only `DD-GP-10` and `DD-GP-11`.
2. The preserved Draft ADR subject `DADR-GP-05 — Localization and internationalized
   representation` maps to `ADR-041`.
3. `GPCF-11 — Translation Provenance Candidate` is dispositioned by `ADR-041` as an approved
   logical translation-resource provenance fact if this ADR is Accepted. The owner of each
   translation resource owns its provenance; Core Settings and Localization coordinates the
   cross-platform provenance contract without taking source-content ownership. The successor
   Global Platform Freeze must record the resulting candidate status and ownership explicitly.
4. `GPABC-07 — Global Representation Policy Candidate` and `GPCWM-08 — Representation Policy
   Write Candidate` remain deferred wherever they depend on `DD-GP-12` through `DD-GP-14`.
   This ADR's language/locale policy does not approve either candidate as a universal aggregate or
   write model.
5. No aggregate, schema, API, persistence model, or physical write model is approved. Persistence
   scope and write authority below are logical architecture constraints only and do not select a
   storage or transport design.

No other candidate, Deferred Decision, risk, capability, ownership boundary, or Freeze count is
changed by this Proposed ADR. Any accepted disposition is synchronized only through the authorized
successor Freeze and Readiness Validation workflow.

## Preference-Resolution Table

### Authenticated context

The resolver evaluates each preference independently in this order:

| Priority | Candidate | Canonical status and persistence | Applicability | Required behavior |
|---:|---|---|---|---|
| 1 | Explicit User preference | A durable User-scoped platform preference owned by Core Settings and Localization and associated with the Core User identity | Applies across authorized Core and OS surfaces unless the User changes or clears it | Wins over defaults and client hints; never overwrites Workspace or owner-domain facts |
| 2 | Workspace default | A durable Workspace-scoped default owned by Core Settings and Localization; Workspace Management supplies scope and authorization | Applies only when an authorized active Workspace exists and the User has no explicit value | Supplies presentation context only; is not copied into User, Business, Branch, OS, document, transaction, or historical state |
| 3 | Browser or device preference | An untrusted client presentation hint; not a canonical platform preference | Used when neither an explicit User value nor an applicable Workspace default exists | Select the first supported candidate; never persist it as a User or Workspace value without an explicit action |
| 4 | Platform fallback | A versioned platform presentation default owned by Core Settings and Localization | Always available as the final safe fallback | English Language `en`, English message Locale `en`, and LTR at launch; the Locale fallback applies only to message selection, pluralization, grammar, and interpolation, and changing it requires a reviewed compatible architecture decision |

The active Workspace default is evaluated only after authentication, Workspace membership, and
active Workspace access are established. A default from an unauthorized, inactive, or stale
Workspace cannot participate.

Business context, OS context, document language requirements, customer language, transaction
facts, and historical facts do not enter this UI-preference precedence chain. They remain
source-owned context. A product may present an original owner-language value, an approved separate
translation, or an unavailable state, but it cannot silently replace the User interface preference
or mutate the source fact.

### Pre-authentication context

When no authenticated User or authorized Workspace exists, the resolver uses:

| Priority | Candidate | Persistence | Required behavior |
|---:|---|---|---|
| 1 | Explicit anonymous presentation selection | Session-scoped, non-canonical presentation state | Applies only to the current anonymous experience; it is not silently promoted to a User preference after authentication |
| 2 | Browser or device preference | Client hint only | Select the first supported candidate without creating platform state |
| 3 | Platform fallback | Versioned Core platform configuration | Use `en` and LTR when no supported candidate exists |

After authentication, localization is re-resolved using the authenticated precedence table. An
anonymous selection may be offered as a suggested choice, but persisting it as the User preference
requires an explicit authenticated action. No Workspace default is exposed or inferred before
membership and access are established.

### Persistence scopes

| Preference source | Scope | Owner | Durability | Write authority |
|---|---|---|---|---|
| Explicit User Language or Locale | One Core User identity | Core Settings and Localization | Durable until changed or cleared | The authenticated User or an explicitly authorized administrator under later approved policy |
| Workspace default Language or Locale | One Workspace | Core Settings and Localization, using Workspace scope from Workspace Management | Durable and versioned as a setting | An actor authorized to manage that Workspace setting |
| Verified compatibility session value | One browser session during a bounded migration | No canonical owner; compatibility input only | Session-bound and temporary | Existing compatible behavior only; cannot create or update a durable User or Workspace preference |
| Anonymous selection | One anonymous browser session | No canonical owner; presentation compatibility state only | Session-bound | The anonymous person through an explicit presentation action |
| Browser/device hint | Client environment | No NexoraXS canonical owner | Controlled by the client | Never written by NexoraXS as a platform fact |
| Platform fallback | Platform presentation policy | Core Settings and Localization | Durable, versioned platform configuration | Approved Core platform governance |

The physical store, API, browser mechanism, framework, and synchronization transport are not
selected by this ADR.

## Ownership Matrix

| Concern | Accountable owner | Responsibilities | Explicit non-responsibilities |
|---|---|---|---|
| Localization Context contract and resolution policy | Core Settings and Localization | Supported identifier registry, preference resolution, source attribution, fallback policy, namespace registry, compatibility requirements, and shared quality rules | Does not own every product message, OS content, user-entered content, or owner-domain facts |
| User preference | Core Settings and Localization, scoped to Core User identity | Validate and persist explicit User Language and Locale preferences | Does not change authorization, membership, Workspace defaults, or product data |
| Workspace default | Core Settings and Localization, using Workspace scope and authorization from Workspace Management | Validate and persist Workspace Language and Locale defaults | Does not overwrite User preference, Business facts, OS configuration, or operational facts |
| Core platform messages | The applicable Core module under Core localization governance | Source meaning, keys, approved translations, resource versions, quality, correction, and compatibility | An OS cannot redefine Core messages or keys |
| Independent OS messages and documents | The applicable OS and its owning domain | Source meaning, owner-qualified namespaces, translations, document-language rules, quality, correction, and versions for its surfaces | Core does not silently rewrite or own OS operational meaning; one OS does not own another OS's messages |
| Commerce messages and Commerce Documents | Commerce OS and the applicable Commerce owner | Commerce terminology, transactional/document representation, translation review, and compatibility | Localization does not change Commerce facts, monetary values, tax, document history, or readiness |
| Marketplace presentation | Marketplace bounded context and the applicable content or asset owner | Marketplace-owned UI messages and governed translated representations of Marketplace content | Core localization coordination does not take Marketplace ownership |
| Knowledge, Rules, Recommendations, and AI presentation | Their frozen canonical or artifact owner, with Core localization coordination where applicable | Preserve exact source/version and provide an approved localized representation when supported | Translation never changes Knowledge, Rule, Decision, Recommendation, evidence, confidence, or AI authority |
| User-entered Business or OS-owned content | The existing canonical owner | Store and present the source value as entered; optionally own a separate governed translated representation | Core localization and machine translation do not replace the canonical source value |
| Core and shared-platform recovery messages | The applicable named Core owner | Owns recovery and critical-message meaning only for Core and shared platform surfaces | Does not own recovery meaning for any independent OS |
| Independent OS recovery and critical messages | The applicable named OS owner | Owns product-local recovery and critical-message meaning for that OS's surfaces and workflows | Core and shared packages cannot supply or redefine the OS's recovery meaning |
| Shared presentation packages | No business or translation ownership | May render message identifiers and resolved resources supplied by exactly one named namespace owner | Cannot own, jointly own, approve, or become the source of translations; must not become an ownerless global message catalog or canonical preference store |

The owner of source meaning approves the source message and its translated representations. Core
Settings and Localization governs the cross-platform contract and quality requirements; it does
not become the source-content owner merely because it coordinates resolution.

## Fallback and Failure Rules

### Language and resource fallback

For each owner-qualified namespace, fallback proceeds as follows:

1. exact supported Language and script resource;
2. an explicitly approved parent-language resource when its meaning is compatible;
3. the namespace's approved English `en` resource; and
4. an owner-approved product-local recovery resource when a critical surface has no usable owner
   resource.

Core owns recovery resources only for Core and shared platform surfaces. Each independent OS owns
the meaning, approval, and release evidence for its own recovery and critical messages. A shared
package may render an owner-supplied recovery resource but cannot own, invent, or jointly approve
its meaning.

English fallback is a resilience mechanism, not permission to ship incomplete Arabic or English
critical journeys. Arabic and English must each satisfy release quality and accessibility gates.

### Message Locale fallback

Message Locale fallback proceeds independently from Language:

1. exact supported message Locale;
2. an explicitly registered compatible parent message Locale;
3. the platform fallback message Locale `en`; and
4. an owner-approved product-local recovery resource when no compatible message resource exists.

Locale under this ADR is restricted to message selection, pluralization, grammar, and
interpolation. It explicitly does not govern date formatting, number formatting, currency
semantics, timezone semantics, deadlines, or addresses. Those concerns remain outside this ADR;
products must not infer or invent them from Language or Locale.

### Invalid, unsupported, stale, and conflicting state

- **Invalid identifier:** reject it as a preference candidate, do not persist it, resolve from the
  next valid source, and emit tenant-safe diagnostic evidence.
- **Unsupported identifier:** preserve a durable explicit preference when it remains valid for
  possible future support, but mark it unavailable for the current surface and use the fallback
  chain. Do not silently replace the stored explicit value.
- **Stale but compatible resource:** use the last verified compatible resource only when its
  version and provenance are known; record degraded status and attempt safe refresh.
- **Incompatible or unverifiable resource:** reject it and use the last verified compatible or
  fallback resource.
- **Conflicting sources:** apply the deterministic precedence table and expose the winning source
  to diagnostics. Never merge preferences into a new canonical fact.
- **Missing non-critical message:** use approved fallback and record the missing owner, namespace,
  key, requested Language, resolved Language, and resource version.
- **Missing critical message or accessible name:** show an owner-approved product-local recovery
  message in an approved fallback language. Core owns that message only for Core and shared
  platform surfaces; each independent OS owns it for its own surfaces. The owning product disables
  or stops a consequential action when its meaning cannot be communicated safely.
- **Localization dependency unavailable:** each application remains usable through a bundled,
  cached, or otherwise verified owner-approved product-local fallback resource. Localization
  failure cannot make an independent OS depend on Core runtime availability for its core workflow.
- **Unknown interpolation input:** do not render unsafe or misleading partial content. Use the
  message's safe error state and preserve the underlying canonical value.

No fallback may grant access, complete a lifecycle, select a Workspace, alter a route owner, or
change domain data.

## Translation-Resource Governance

### Namespaces and keys

1. Every translation namespace has exactly one named accountable owner, and every message belongs
   to exactly one such owner-qualified namespace. Joint or ambiguous ownership is prohibited.
2. Namespace identifiers are stable, globally unique, and registered through Core localization
   governance without transferring source-content ownership.
3. Core, Marketplace, Commerce, and every future OS retain separate namespaces for their owned
   surfaces. An ownerless `common` business-message namespace is prohibited.
4. A shared presentation namespace may exist only when exactly one named Core or product owner is
   accountable for its meaning, approval, versions, corrections, and release evidence. It may
   contain only genuinely shared, owner-approved platform presentation semantics and cannot
   contain OS business logic or canonical domain meaning.
5. Shared packages cannot own, jointly own, or approve a translation namespace or translation
   resource. They may render resources supplied by the single named owner.
6. Keys are stable semantic identifiers, not English source sentences, array positions, route
   paths, component names, or mutable display text.
7. Key reuse is permitted only when meaning, parameters, accessibility role, and owner are the
   same. Similar English wording does not prove semantic equivalence.
8. Removal or incompatible semantic change requires deprecation, a replacement key when
   applicable, compatibility evidence, and a governed migration window.

### Message construction

- Messages are complete semantic units. Products must not build natural-language sentences by
  concatenating translated fragments.
- Pluralization uses the standardized plural categories of the resolved Locale rather than
  English-only singular/plural branching.
- Interpolation uses named, schema-defined parameters. Parameter meaning and required escaping are
  part of the message contract.
- Gendered grammar is expressed only when the content owner has a legitimate, authorized source
  value or a neutral grammatical alternative. Gender or identity must not be inferred from names,
  Language, Locale, country, or browser hints.
- Translations must preserve semantic meaning, action consequence, permission implication,
  severity, and accessibility purpose. Translated wording must not broaden an action.
- Interpolation may include an owner-supplied value only under the message's declared parameter
  schema. Message localization does not select date or number formatting and cannot define or
  change currency, timezone, deadline, address, or historical semantics.

### Provenance, versioning, correction, and publication

Each published translation resource records, at minimum:

- owner and namespace;
- resource version and compatible message-contract version;
- Language and applicable Locale/script metadata;
- source key and source-message version;
- translation provenance and method;
- reviewer or approved review authority;
- publication status and effective time;
- interpolation schema and relevant accessibility intent; and
- supersession, correction, or deprecation reference when applicable.

Published translation-resource versions are immutable. A correction creates a new version and
preserves the superseded version for evidence and historical interpretation. Draft resources are
not used as silent production fallback. Machine-assisted translation may produce a candidate, but
it does not become published merely because a tool generated it.

Publication and correction of security-sensitive, permission-sensitive, contractual, financial,
legal, health, safety, or other consequential messages require the source owner's approved review
and append-only Audit evidence. Routine copy with no consequential meaning follows the owner's
review process and remains version-attributable without requiring every display event to create an
Audit Record.

## RTL/LTR Rules

1. Direction is derived from the resolved Language/script registry and is independent from
   currency, timezone, country, and canonical content meaning.
2. Arabic launch resources resolve to RTL; English launch resources resolve to LTR.
3. Future Language/script entries declare their governed base direction without changing product
   code or domain models.
4. The application sets the correct document Language and base direction, and sets a narrower
   language/direction context for embedded content when it differs.
5. Layout, spacing, start/end alignment, navigation drawers, focus order, and responsive behavior
   use logical direction. Physical left/right assumptions are prohibited where direction matters.
6. Directional icons mirror only when their meaning is spatial. Brand marks, media controls,
   numeric symbols, charts, and icons with fixed semantic meaning are not mirrored automatically.
7. User-entered and mixed-direction content is isolated from surrounding UI direction and remains
   displayed as entered. Bidirectional control characters are handled safely and cannot alter
   surrounding labels or action meaning.
8. A Language switch updates Language, direction, message resources, and accessible names as one
   coherent presentation transition. It does not reset route, form state, Workspace context,
   authorization, onboarding, or readiness.
9. Keyboard focus remains on or returns predictably to the language control, and the change is
   announced through an accessible status mechanism without causing an unexpected navigation.
10. Truncation, overflow, animation, focus visibility, and touch targets are validated in both RTL
    and LTR with realistic message expansion and mixed-direction values.

## Migration and Compatibility Strategy

This ADR defines migration invariants, not a storage technology or implementation task.

1. Characterize every existing locale reader, writer, value, event, and route/document effect
   before migration.
2. Preserve the active `nexoraxs.session.locale` key, its `en`/`ar` values, and current compatible
   behavior until a separately approved implementation feature supplies replacement and rollback
   evidence.
3. Treat `core_locale` and `nexoraxs_locale` as legacy compatibility inputs. Do not delete, rename,
   or make them canonical through this ADR.
4. During a bounded compatibility period, migration resolution follows exactly:

   **Explicit User preference → Workspace default → verified compatibility session value →
   browser/device preference → Platform fallback.**

   A verified compatibility session value is a supported session-bound value whose source,
   identifier, and compatibility behavior have been characterized. It may include the active
   `nexoraxs.session.locale` value and an older key only through the documented compatibility
   adapter. Conflicting valid legacy/session inputs are reported and resolved inside that adapter's
   deterministic verification order; they do not create an additional precedence tier.
5. Every legacy or session value is non-canonical. It cannot automatically become, create, update,
   or overwrite a durable User preference or Workspace default. It remains a temporary
   presentation input unless an authenticated, authorized actor explicitly saves a preference
   through a future approved implementation.
6. A future migration must use an owner-governed compatibility adapter, preserve old read behavior
   for the approved window, avoid indefinite dual write, and define reversible rollback before an
   old path is retired.
7. Cross-application browser storage is not a permanent architecture contract. Future products
   consume a versioned resolved Localization Context through an approved Core contract or handoff
   while remaining independently operable with verified local fallback resources. Exact transport
   remains an implementation decision and Global Navigation conventions remain deferred.
8. Unsupported or invalid stored values are preserved only where necessary for diagnosis or future
   compatibility, are never treated as authorization, and do not block safe fallback.
9. Migration telemetry excludes user-entered content and secret data and identifies source kind,
   validity, fallback, application, and contract/resource version.
10. Authentication pages remain frozen. Migration cannot redesign, reroute, restructure, or change
    their established journey without separate Product Owner approval.

No code, storage key, route, schema, API, or SDK change is authorized by this Proposed ADR.

## Security, Privacy, Audit, Accessibility, and Observability

### Security and privacy

- Language and Locale are presentation inputs, not identity, permission, entitlement, residency,
  jurisdiction, or authorization evidence.
- Client-provided identifiers and resource references are validated against supported registries;
  they are never trusted as paths, executable content, or authorization claims.
- Interpolated values are safely encoded for their presentation context. Translation resources
  cannot introduce executable behavior or bypass content-security controls.
- Preference access follows least privilege and explicit User or Workspace scope. An actor cannot
  read or change another User's preference or an unauthorized Workspace default.
- Language and Locale can reveal cultural or regional information. Collection, telemetry, support
  access, and retention use data minimization and do not infer nationality, ethnicity, religion,
  gender, legal location, or jurisdiction.
- User-entered content is never sent to a translation provider merely because a UI Language was
  selected. Any future translation workflow requires its own owner, purpose, authorization,
  privacy, retention, and review policy.

### Audit

- Consequential publication, correction, deprecation, or withdrawal of governed translation
  resources creates append-only Audit evidence with actor, owner, resource/version, action,
  rationale or review reference, time, and correlation.
- Unauthorized preference-change attempts and security-relevant resource validation failures are
  auditable under applicable Security policy.
- Routine resolution and ordinary User language switching are observable but do not create a
  consequential Audit Record by default. The explicit preference change remains attributable in
  the owning settings history where applicable.
- Corrections append new records and versions; they never rewrite historical Audit evidence.

### Accessibility

- Language selection and switching are keyboard-operable, semantically named, focus-safe, and
  usable with applicable assistive technology.
- Document and content Language metadata, RTL/LTR direction, accessible names, status messages,
  errors, instructions, and recovery actions update consistently.
- Screen-reader announcements identify the applied Language without repeatedly announcing every
  re-rendered region.
- Color, flag imagery, abbreviations, or direction alone cannot be the only indication of the
  selected Language.
- Arabic RTL and English LTR receive equivalent critical-flow, responsive, keyboard, focus,
  zoom/reflow, and assistive-technology validation. Future launch Languages receive the same gate.

### Observability

Localization observability records structured, tenant-safe evidence for:

- requested and resolved Language/Locale identifiers;
- winning source kind without exposing unrelated preference data;
- fallback and degraded-resolution counts;
- invalid, unsupported, stale, or conflicting state;
- missing namespace/key and owning product;
- resource and contract versions;
- resource load/validation failure and recovery; and
- language-switch latency and accessible transition failures.

Logs and telemetry exclude message parameter values, user-entered Business/OS content, credentials,
tokens, and unnecessary User identifiers. Metrics and traces never become canonical preference or
content truth.

## Consequences

These consequences and tradeoffs apply only if this ADR is Accepted.

### Positive consequences

- NexoraXS can add future Languages and Locales through governed resources and metadata without
  changing domain ownership or treating English/Arabic unions as permanent architecture.
- User choice, Workspace default, browser hints, and platform fallback have deterministic,
  explainable precedence.
- Core and independent Operating Systems share one localization contract without centralizing OS
  content ownership or requiring one OS for another's core workflow.
- Arabic and English remain first-class while fallback provides safe resilience.
- Stable namespaces, typed message parameters, immutable published versions, and provenance make
  translation changes reviewable and compatible.
- Current frontend keys can migrate incrementally without destructive storage changes.
- Canonical Business, Commerce, document, monetary, temporal, address, and historical meaning is
  insulated from presentation changes.

### Costs and tradeoffs

- Every product owner must govern its message namespaces, translations, versions, fallbacks, and
  critical-language release evidence.
- Deterministic resolution and source attribution add contract and testing complexity.
- First-class Arabic/English parity makes incomplete translation a release blocker for critical
  journeys rather than an optional polish item.
- Immutable publication and correction history increase resource-management overhead.
- Cross-application compatibility must be maintained during migration instead of replacing legacy
  browser state in one step.
- Some experiences may display safe English fallback or block a consequential action rather than
  guess when owner-approved localized meaning is unavailable.

## Alternatives Considered

Each alternative below is proposed as rejected. That rejection becomes authoritative only if this
ADR is Accepted.

1. **Treat Language and Locale as one value.** Rejected because message language and presentation
   conventions can vary independently and conflation would leak into currency/timezone semantics.
2. **Let Workspace default override explicit User preference.** Rejected because a default is not
   a User fact and must not erase an explicit accessible presentation choice.
3. **Use browser/device preference as canonical state.** Rejected because it is untrusted,
   changeable client context and cannot prove identity or Workspace intent.
4. **Hardcode English and Arabic as the permanent type system.** Rejected because English and
   Arabic are launch Languages, not the limit of platform architecture.
5. **Make Core own every OS translation.** Rejected because each OS owns its surface and domain
   meaning; Core coordinates the contract without taking ownership.
6. **Use one ownerless shared message catalog.** Rejected because it obscures source meaning,
   compatibility, review authority, and cross-domain ownership.
7. **Use English sentences as message keys.** Rejected because wording corrections would become
   breaking identifiers and semantic reuse would be unverifiable.
8. **Concatenate translated fragments or use English-only plural rules.** Rejected because grammar
   and meaning differ by Language and Locale.
9. **Automatically translate user-entered or owner-domain content.** Rejected because it changes or
   obscures canonical and historical meaning without owner governance.
10. **Derive currency, transaction currency, timezone, deadlines, or addresses from Language or
    Welcome selection.** Rejected because those semantics belong to `DADR-GP-06` and applicable
    canonical owners.
11. **Make Welcome a mandatory canonical onboarding lifecycle stage.** Rejected because
    localization is presentation context and cannot alter readiness or lifecycle architecture.
12. **Use a specific frontend localization library as the architecture.** Rejected because
    contracts must remain technology-independent and survive framework replacement.
13. **Replace all existing browser keys immediately.** Rejected because Feature 050 compatibility
    and the Core Freeze require explicit migration, rollback, and backward-compatibility evidence.
14. **Render raw keys or ambiguous partial messages on failure.** Rejected because it is unsafe and
    inaccessible, especially for consequential actions.

## Deferred Decisions

This proposal resolves only the `DADR-GP-05` subject represented by `DD-GP-10` and `DD-GP-11` if
it is later Accepted. The following remain unresolved:

- `DADR-GP-06` / `DD-GP-12` through `DD-GP-14`: timezone precedence, daylight-saving and
  historical temporal semantics, deadlines and Reporting cutoffs, currency meanings and
  conversion, exchange-rate authority, number/measurement/minor-unit semantics, input/display
  rounding, and address interpretation;
- `DADR-GP-02` / `DD-GP-08` and `DD-GP-09`: Country meanings and general global-context precedence,
  freshness, ambiguity, and fail-closed behavior outside the localization sources explicitly
  governed here;
- `DADR-GP-10` / `DD-GP-30` through `DD-GP-32`: exact Global Navigation, multilingual Search,
  Reporting, alert, Notification, and administration projection contracts;
- `DD-GP-23` through `DD-GP-29`: Marketplace, Commerce, Knowledge, Rules, Business Brain,
  Configuration, and AI global participation policies beyond translation ownership boundaries;
- `DD-GP-34`: full migration of country, locale, temporal, currency, address, privacy, and
  historical state without changing meaning;
- exact APIs, Events, persistence schema, synchronization, packaging, caching, resource delivery,
  deployment, framework, library, and infrastructure;
- any machine-translation provider eligibility, data-processing, training, retention, safety, or
  approval policy;
- legal or regulatory document-language requirements owned by their applicable domain and policy;
- exact Welcome presentation, route behavior, copy, placement, and interaction design; and
- any change to frozen authentication pages.

This ADR records the separation boundary with `DADR-GP-06`; it does not answer any of its semantic
questions.

## Draft Specification Conflicts Requiring Reconciliation

Draft specifications are subordinate implementation history and do not resolve this ADR. If this
ADR becomes Accepted, later governed work must reconcile at least these conflicts without rewriting
historical files to conceal them:

1. [Feature 038 — Platform Alignment, Localization Foundation, and Product Hub](../../../specs/038-platform-alignment-localization-product-hub/spec.md)
   treats Language as a Workspace-session value, defines only `en | ar`, and uses shared browser
   session storage as the cross-application source. Its implemented compatibility behavior may be
   preserved during migration, but it cannot remain the canonical preference owner, scope, or
   transport contract.
2. [Feature 038 data model](../../../specs/038-platform-alignment-localization-product-hub/data-model.md)
   uses `nexoraxs_locale` as the defining storage model and couples Language directly to document
   direction. The key remains compatibility input; the future contract must distinguish Language,
   Locale, resolved direction metadata, source, fallback, and resource version.
3. [Feature 041 — Core Platform UX Alignment](../../../specs/041-core-platform-ux-alignment/spec.md)
   treats Language as an onboarding step derived from prototype directions. Any retained screen is
   presentational and cannot become a readiness stage or canonical preference owner.
4. [Feature 049 — Onboarding Architecture v2](../../../specs/049-onboarding-architecture-v2/spec.md)
   states that Welcome Language configures direction, date format, and number format and that
   Country is the source of truth for Currency and Timezone defaults. Language/direction must be
   reconciled to this ADR; date, number, Currency, and Timezone rules remain prohibited until
   `DADR-GP-06` is accepted. Welcome remains presentational.
5. Feature 049 also treats its onboarding architecture as able to freeze unrelated primitives.
   It cannot supersede Accepted ADRs, resolve Global Platform Deferred Decisions, make Welcome a
   lifecycle stage, or alter frozen authentication surfaces.

[Feature 050 — Core Shell Stabilization](../../../specs/050-core-shell-stabilization/spec.md) is an
approved compatibility baseline rather than a conflicting localization architecture. Its preserved
routes, `nexoraxs.session.locale` behavior, existing values, and storage compatibility constrain the
future migration until a separately approved feature supplies equivalent behavior, tests, rollback,
and documentation.

## Architecture Review Checklist

The proposal remains **Proposed** unless every applicable item is satisfied and explicit approval is
recorded.

- [ ] ADR number `ADR-041`, title, single principal decision, and status conform to ADR governance.
- [ ] Product Owner confirms `PO-LOCALIZATION:D-008` through `PO-LOCALIZATION:D-012`, their owner,
      date, decision-log namespace, and local Product-decision status are represented without
      expansion.
- [ ] Review confirms the Freeze and Candidate Register Impact: `ADR-041` resolves only `DD-GP-10`
      and `DD-GP-11`; `DADR-GP-05` maps to `ADR-041`; `GPCF-11` is dispositioned; `GPABC-07` and
      `GPCWM-08` remain deferred where dependent on `DD-GP-12` through `DD-GP-14`; and no aggregate,
      schema, API, persistence model, or physical write model is approved.
- [ ] Review confirms `DADR-GP-06`, `DD-GP-12` through `DD-GP-14`, and all unrelated Deferred
      Decisions remain unresolved.
- [ ] Core Settings and Localization remains the presentation-context authority without becoming
      the owner of OS, Business, document, monetary, temporal, address, or historical facts.
- [ ] Each independent OS retains ownership of its own messages, documents, setup, settings,
      operational behavior, and release lifecycle.
- [ ] Language and Locale are distinct; Locale is restricted to message selection, pluralization,
      grammar, and interpolation; and date formatting, number formatting, currency semantics,
      timezone semantics, deadlines, and addresses remain excluded.
- [ ] Authenticated and pre-authentication precedence, source attribution, persistence scopes, and
      invalid/stale/conflicting-state behavior are deterministic and privacy-safe.
- [ ] Migration precedence is exactly Explicit User preference → Workspace default → verified
      compatibility session value → browser/device preference → Platform fallback; legacy/session
      values remain non-canonical and cannot automatically become durable preferences.
- [ ] Workspace default participates only under an authorized active Workspace and never becomes a
      User, Business, Branch, OS, document, transaction, or historical fact.
- [ ] Platform fallback `en` and launch parity for Arabic RTL and English LTR are approved.
- [ ] Every shared translation namespace has exactly one named owner; shared packages cannot own
      or jointly own translations; and semantic keys, pluralization, interpolation, gender
      treatment, provenance, versioning, correction, deprecation, and Audit rules are reviewable
      and technology-independent.
- [ ] RTL/LTR rules use logical layout, preserve mixed-direction user content, and do not mirror
      fixed semantic meaning.
- [ ] Language switching preserves focus, accessible names, route/form/context state, and does not
      affect authorization, onboarding, setup, or readiness.
- [ ] Failure rules use owner-approved product-local recovery resources: Core owns only Core/shared
      recovery meaning and each independent OS owns its own, with no unsafe ambiguous action, raw
      key, or invented domain semantics.
- [ ] Security Review confirms preference scope, resource integrity, interpolation safety, privacy,
      and telemetry data minimization.
- [ ] Accessibility Review confirms equivalent Arabic/English critical-flow gates and a repeatable
      path for future launch Languages.
- [ ] Compatibility Review confirms no current key, route, value, identifier, or protected
      authentication surface is changed by acceptance alone.
- [ ] Feature 038, Feature 041, Feature 049, and Feature 050 reconciliation obligations are recorded
      for later bounded work without changing historical evidence.
- [ ] Independent Architecture Review confirms alignment with the Global Platform, Core Platform,
      Commerce OS, Governance, Genesis, Constitution, and AGENTS authority order.
- [ ] Acceptance, if approved, is followed through the authorized Global Platform successor Freeze
      and Readiness Validation workflow; this Proposed file is not treated as self-accepting.

## Related Documents

### Controlling Freezes

- [Global Platform Architecture Freeze v1.0](../../99-architecture-freeze/GLOBAL-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Architecture Freeze v1.0](../../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Commerce OS Architecture Freeze v1.0](../../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)

### Governance ADRs

- [ADR Governance and Lifecycle](README.md)
- [ADR-002 — Core Platform Is the Shared Control and Intelligence Plane](ADR-002-core-shared-control-intelligence-plane.md)
- [ADR-003 — Workspace Is the Customer and Tenant Boundary](ADR-003-workspace-customer-multi-business-boundary.md)
- [ADR-018 — Core Workspace Ready and Operating System Ready Are Separate](ADR-018-separate-core-and-os-readiness.md)
- [ADR-024 — Operating Systems Are Independent Domain Owners](ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-034 — Tenant and Resource Scope Are Explicit](ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-035 — Technology-Independent Compatible Contracts](ADR-035-technology-independent-compatible-contracts.md)
- [ADR-037 — Navigation Preserves Explicit Context and Route Ownership](ADR-037-context-preserving-navigation.md)
- [ADR-038 — Append-Only Audit History](ADR-038-append-only-audit-history.md)
- [ADR-039 — Data-Driven Configurable Platform Assets](ADR-039-data-driven-configurable-platform-assets.md)

### Global Platform

- [Global Platform Discovery](../../07-global-platform/00-GLOBAL-PLATFORM-DISCOVERY.md)
- [Global Platform Capability Map](../../07-global-platform/01-GLOBAL-PLATFORM-CAPABILITY-MAP.md)
- [Global Platform Architecture Proposal v0.1](../../07-global-platform/02-GLOBAL-PLATFORM-PROPOSAL.md)
- [Global Platform Final Architecture Review](../../07-global-platform/08-GLOBAL-PLATFORM-FINAL-ARCHITECTURE-REVIEW.md)
- [Global Platform Readiness](../../99-architecture-freeze/GLOBAL-PLATFORM-v1.0-READINESS.md)

### Core Platform and Genesis

- [Core Platform Principles](../../02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md)
- [Core Platform Vision](../../02-core-platform/01-CORE-PLATFORM-VISION.md)
- [Core Platform Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)
- [Genesis Constitution](../../01-genesis/02-CONSTITUTION.md)
- [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Genesis Customer Journey](../../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Genesis Workspace Lifecycle](../../01-genesis/12-WORKSPACE-LIFECYCLE.md)

### Delivery Authority

- [NexoraXS Constitution](../../../.specify/memory/constitution.md)
- [NexoraXS Agent Instructions](../../../AGENTS.md)
