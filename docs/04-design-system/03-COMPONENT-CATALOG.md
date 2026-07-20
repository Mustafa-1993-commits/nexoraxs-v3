# Component Catalog

- **Status:** Canonical component-role catalog; not an implementation inventory
- **Date:** 2026-07-19
- **Owner:** Design System for shared roles; product owners for domain compositions
- **Authority:** Component purpose, state, quality, dependency, and ownership semantics

## 1. Purpose

This catalog defines the component roles needed to present NexoraXS consistently. It records what
each component is for, how it may vary, which states it must express, its accessibility and
localization obligations, its dependencies, and where it belongs.

A catalog entry does not claim that the component is implemented, approved for extraction, or
ready for use. Current implementation evidence is identified separately.

## 2. Scope

The catalog covers shared primitives and patterns, navigation, actions, inputs, forms, data
display, feedback, overlays, Business Architect, Business Blueprint, Recommendations, Product
Hub, and Commerce-specific compositions.

## 3. Out of Scope

This document does not:

- create component APIs, code, CSS, utility classes, stories, tests, or token values;
- move an app-local component into `packages/ui`;
- define domain entities, business rules, permissions, routes, backend contracts, or schemas;
- treat visually similar Core and Commerce components as semantically identical; or
- approve planned Business Architect, Blueprint, Recommendation, or Commerce screens.

## 4. Relationships

| Source | Relationship |
|---|---|
| [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md) | Defines customer outcomes and stage states consumed by experience components. |
| [Screen Map](../03-ui-ux/02-SCREEN-MAP.md) | Distinguishes verified current screens/components from planned surfaces. |
| [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) | Identifies missing and incomplete frontend component behavior. |
| [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md) | Defines navigation roles and owner placement. |
| [Design Foundations](./01-DESIGN-FOUNDATIONS.md) | Defines shared accessibility, localization, theme, responsive, and motion quality. |
| [Design Tokens](./02-DESIGN-TOKENS.md) | Defines semantic presentation roles consumed by components. |
| [Component Governance](../10-design-intelligence/06-COMPONENT-GOVERNANCE.md) | Controls shared-package admission, variants, lifecycle, and owner boundaries. |

## 5. Catalog Interpretation

### 5.1 Ownership labels

| Label | Meaning |
|---|---|
| Shared primitive | Domain-neutral presentation role; eligible for `packages/ui` only after the admission test passes |
| Shared pattern candidate | Potential reusable composition; remains app-local until repeated semantics are proven |
| Core composition | Core-owned product behavior and presentation |
| Commerce composition | Commerce-owned operational behavior and presentation |
| Owner composition | Belongs to whichever approved product owns the underlying workflow |

### 5.2 State baseline

Where applicable, every component covers default, hover, focus, active/selected, disabled,
readonly, loading/busy, empty, partial/stale, invalid/error, unauthorized/unavailable, success, and
recovery. Tables below list the states most material to each role; they do not remove the baseline.

### 5.3 Current implementation evidence

Verified shared exports currently include Button, Input, Card, Badge, Icon, Logo, and branding
helpers under `packages/ui/src/`. Verified app-local components include Core and Commerce shells,
context switchers, locale/theme controls, notification and account menus, badges, avatars, toasts,
Core authentication compositions, and current onboarding steppers. These are compatibility
evidence. The catalog does not declare them fully compliant or automatically shared.

## 6. Navigation Components

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Application Shell | Frame one owner application and its global regions | Core, Commerce, later owner-specific; compact/wide | Resolving, ready, partial, unauthorized, error/recovery | Landmarks, skip link, stable focus and reading order | Translated regions; RTL/LTR logical layout | Navigation model, context, tokens | Core/Commerce/owner composition; shell primitives may be shared |
| Sidebar | Stable primary owner navigation | Expanded, compact, drawer | Current, unavailable item, badge, open/closed | Named navigation; keyboard; drawer focus containment/restoration | Translated labels; logical start/end; direction-safe icons | App Shell, nav entries, permissions | Owner composition |
| Header | Global owner/context and utility actions | Standard, compact, task-focused | Ready, context resolving, degraded utility | Landmark, ordered controls, keyboard access | Translated controls; mixed-script context | App Shell, context, search, utilities | Owner composition |
| Context Switcher | Change authorized Workspace or operational context | Workspace; Business/Business Unit/Branch as approved by owner | Loading, one/many, current, unavailable, unauthorized, error | Menu/listbox semantics, focus, current selection | Names as entered; labels translated; logical alignment | Owner context projection and guard | Core for Workspace/Business; OS for operational context |
| Breadcrumb | Show location within one owner | Standard, compact/truncated | Current, linked parent, unavailable parent | Ordered navigation with current page semantics | Translated nouns; mixed-script display names | Information Architecture, route metadata | Shared pattern candidate composed by owner |
| Tabs/Subnavigation | Switch peer views within one area | Tabs, local side navigation, section index | Selected, disabled/unavailable, loading count | Correct tab or navigation semantics; keyboard order | Labels and counts localized; RTL order preserved | Page template, owner view state | Shared pattern candidate |
| Product Switch/Return | Identify product and return safely to Product Hub | Core-to-OS entry, OS-to-Core return | Ready, expired/rejected, unavailable, recovery | Explicit destination and focus at arrival | Product names and recovery copy localized | Owner handoff/navigation guard | Core initiates; destination owner validates |
| Search Entry | Open scoped search | Inline input, trigger, compact icon action | Idle, query, results, no results, unavailable, error | Combobox/search semantics; keyboard results | Locale-aware labels/keywords; direction-safe input | Owner search projection | Core/Commerce/owner composition |
| Command Palette | Find destinations and approved commands | Navigation-only; later owner-action groups | Open, searching, grouped results, no results, unavailable | Dialog/combobox behavior, keyboard, Escape, focus return | Translated commands/keywords; owner labels | Search, navigation registry, permission context | Shared pattern candidate with owner registries |
| Pagination/Breadcrumb Return | Move among records or return to collection safely | Previous/next, collection return | First/last, unavailable, loading | Descriptive link names; no icon-only meaning | Directional icons follow semantic direction | Owner collection/query state | Shared pattern candidate |

## 7. Actions and Buttons

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Button | Trigger one explicit action | Primary, secondary, quiet, danger; task density variants | Default, focus, pressed, disabled, busy, success/failure feedback | Native control, accessible name, busy/disabled semantics | Outcome-specific translated label; expansion-safe | Action tokens, progress/feedback | Shared primitive; current shared evidence exists |
| Icon Button | Trigger a familiar compact action | Standard, quiet, danger | Default, focus, pressed, disabled, busy | Mandatory accessible name and target; tooltip is supplementary | Localized name; direction-aware icon when needed | Icon, Tooltip, action tokens | Shared primitive candidate |
| Link Action | Navigate to a destination | Inline, standalone, external/owner transition | Default, visited where suitable, focus, unavailable | Native link semantics and destination clarity | Translated label; external/product transition clear | Navigation contract | Shared primitive/pattern |
| Action Group | Present related primary and secondary actions | Inline, stacked, responsive, overflow | Ready, partial availability, pending | Logical order; overflow keyboard access | Expansion-safe and logical-order safe | Button, menu, page state | Shared pattern candidate |
| Split/Overflow Action | Keep infrequent actions discoverable | Primary-plus-menu, overflow-only | Open/closed, unavailable item, pending | Menu semantics, focus return, explicit item labels | Translated items; no ambiguous icons | Button, Menu, owner permissions | Shared pattern candidate |

## 8. Inputs and Forms

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Text Field | Capture short textual information | Text, email, phone, numeric text, search | Empty, filled, focus, readonly, disabled, invalid, pending | Visible label, description/error association, autocomplete/input purpose | Labels/help/errors translated; user input preserved; `dir` follows content where needed | Field label, validation, input tokens | Shared primitive; current shared Input is evidence |
| Password Field | Capture a secret with controlled visibility | Password, new password, confirmation | Hidden/revealed, invalid, disabled, busy | Reveal control named; password-manager and paste support unless governed otherwise | Guidance/errors translated | Text Field, Icon Button, identity rules | Core composition over shared primitives |
| Text Area | Capture longer user content | Standard, expandable, constrained by owner | Empty, filled, focus, invalid, readonly | Label, description, character guidance if applicable | Mixed-script content and `dir` behavior | Field label, validation | Shared primitive candidate |
| Select | Choose from a bounded native-friendly set | Single, grouped | Empty, selected, disabled, invalid, loading options | Native/select-equivalent keyboard semantics | Option labels translated; values remain stable | Field, owner option projection | Shared primitive candidate |
| Combobox | Search and choose from a larger set | Single, optional free entry only when approved | Querying, results, no result, selected, invalid, unavailable | Combobox pattern, active option, keyboard, announcements | Locale-aware matching; mixed-script results | Search/listbox, owner data | Shared pattern candidate |
| Checkbox | Select independent options | Single, group, indeterminate where meaningful | Checked, unchecked, mixed, disabled, invalid | Native semantics and group label | Labels and validation translated | Form field tokens | Shared primitive candidate |
| Radio/Choice Card | Choose one mutually exclusive option | Radio list, comparative choice card | Selected, unselected, disabled, recommended-with-text | Native radio semantics; entire card interaction unambiguous | Labels/details translated; no order-only meaning | Card, Radio, owner options | Shared pattern candidate |
| Switch | Change a reversible binary preference | Standard, settings row | On, off, disabled, pending, failure rollback | Switch semantics, current state announced | Label describes state/action in both languages | Owner preference behavior | Shared primitive candidate |
| Date/Time Input | Capture a temporal value under approved policy | Date, time, range, timezone-aware display | Empty, selected, invalid, unavailable | Keyboard-accessible entry and picker alternative | Locale display without altering canonical meaning | Settings/owner time policy | Shared pattern candidate |
| Quantity/Money Input | Capture a scoped operational value | Quantity, amount, percentage/rate where owner-approved | Empty, valid, invalid, pending | Units/currency associated; no visual-only validity | Locale-aware presentation; canonical entry semantics preserved | Owner validation and units | Owner composition over shared fields |
| File/Supporting Information Input | Attach approved supporting material | File selection, non-file evidence reference | Empty, adding, validating, rejected, unavailable, success | Keyboard selection, file/status names, error announcements | Instructions and status localized; file names as supplied | Owner evidence/privacy/storage policy | Core BA or owner composition; not a shared storage owner |
| Form Field | Compose label, control, help, requirement, and error | Standard, inline, compact | Default, required/optional, invalid, pending | Programmatic associations and error summary links | All chrome translated; content direction safe | Input primitive, validation | Shared pattern candidate |
| Form Section | Group fields by business outcome | Standard, collapsible only when safe | Ready, incomplete, error summary, disabled section | Heading/group semantics; focusable error links | Section copy translated | Form Fields, page template | Shared pattern candidate |
| Validation Summary | Summarize actionable validation failures | Page, dialog, step | Hidden, visible, updated | Focus target and links to invalid controls | Errors translated and ordered logically | Owner validation result | Shared pattern candidate |

## 9. Data Display Components

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Card | Group one coherent summary, choice, or action | Static, interactive, selected, status, comparison | Default, focus when interactive, loading, unavailable | Semantic container; explicit interactive child | Content translated; mixed-script values | Surface tokens | Shared primitive; current shared evidence exists |
| Badge/Status Label | Name a concise state or category | Neutral, information, positive, warning, critical | Current, stale, unknown | Text/icon meaning beyond color | Localized label; stable underlying code | State tokens, owner status | Shared primitive; current shared/app-local evidence exists |
| Avatar/Brand Mark | Identify a person or scoped owner entity visually | Image, initials/fallback, product mark | Loading, available, fallback, unavailable | Meaningful alt/name when informative; decorative when redundant | Name preserved as entered | Image/brand source | Shared primitive candidate; current app-local evidence exists |
| Data Table | Compare structured records | Read-only, selectable, expandable, editable only when owner-approved | Loading, empty, filtered-empty, partial/stale, error, unauthorized | Named table, headers, keyboard controls, responsive alternative | Headers/actions translated; values formatted by approved locale policy | Query state, pagination/filter/sort | Shared pattern candidate; rows remain owner data |
| Structured List | Present scan-friendly records that do not require column comparison | Standard, compact, grouped, actionable | Loading, empty, partial, error, selected | List semantics and explicit actions | Translation and direction-safe metadata | Owner projection, list item pattern | Shared pattern candidate |
| Definition List | Present label/value facts | Standard, compact, grouped | Loading, missing optional value, restricted | Semantic terms/descriptions | Labels translated; values retain meaning | Owner projection | Shared pattern candidate |
| KPI/Statistic | Answer one operational question | Value, trend, target/progress, exception | Loading, no data, stale, estimated, error | Text alternative and comparison meaning | Locale-aware value display; source labels translated | Owner metric projection | Owner composition over shared display pattern |
| Chart | Visualize a defined analytical question | Time, comparison, distribution, stages, flow where justified | Loading, no data, partial, stale, error | Accessible summary/table and non-color series distinction | Labels/units/period localized; RTL reviewed | Owner projection, chart library selected later | Shared chart frame candidate; interpretation owner-specific |
| Timeline | Present ordered events or lifecycle evidence | Vertical, compact, grouped | Loading, empty, current, completed, failed | Ordered semantics; state not color-only | Time/actor/action localized appropriately | Owner event/history projection | Owner composition over shared pattern |
| Stepper/Progress | Show position in a guided flow | Stage, step, compact progress | Current, complete, blocked, optional, error | Current-step semantics; not color-only; keyboard only if interactive | Labels translated; direction follows semantic flow | Wizard/BA state | Shared pattern candidate; current onboarding evidence exists |
| Progress Indicator | Show measured or indeterminate work honestly | Determinate, indeterminate, segmented stages | Starting, active, paused, blocked, complete, failed | Named status and restrained announcements | Status translated | Owner process status | Shared primitive/pattern candidate |
| Document Viewer | Present owner-generated document content | Read, print-oriented, metadata panel | Loading, partial, unavailable, error, ready | Heading/table semantics, zoom/reflow, nonvisual access | Document locale/direction preserved | Owner document projection | Owner composition |
| Data Freshness/Source Note | Explain source, scope, time, or estimate | Inline, panel, disclosure | Current, stale, partial, unknown | Textual, programmatically associated | Source/status translated without changing source content | Owner projection metadata | Shared pattern candidate |

## 10. Feedback and State Components

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Alert/Banner | Communicate persistent page or section status | Information, positive, warning, critical, permission | Visible, updating, dismissed only when safe | Appropriate alert/status semantics; not color-only | Message/action translated | State tokens, owner outcome | Shared pattern candidate |
| Toast | Confirm low-risk transient outcomes | Information, success, warning, error | Entered, timed/persistent, dismissed | Non-disruptive live region; pause/accessible dismissal | Concise translated message | Owner outcome, Toast host | Shared pattern candidate; current app-local evidence exists |
| Inline Validation | Explain a field-level problem | Error, warning, guidance | Hidden, visible, resolved | Associated with control and included in summary | Specific translated recovery | Validation result | Shared pattern candidate |
| Skeleton | Preserve known structure while data loads | Text, card, list/table, section | Loading, replaced by content, timed-out recovery | Hidden from redundant reading; surrounding status names loading | Direction follows layout; no fake content | Layout template, motion tokens | Shared primitive/pattern candidate |
| Loading Status | Explain indeterminate or staged work | Inline, page, overlay only when truly blocking | Starting, active, long-running, retryable, complete | Busy state and restrained live updates | Honest translated status | Owner process state | Shared pattern candidate |
| Empty State | Explain absent content and next valid action | First use, no data, filtered empty, unavailable | Ready, action available/unavailable | Heading, explanation, explicit action | State-specific translated copy | Owner query/permission | Shared pattern candidate |
| Error State | Explain failure, preserved work, and recovery | Inline, section, page, boundary | Retryable, correction required, partial, terminal/unavailable | Alert/focus behavior proportionate to scope | Human translated error, no raw internals | Owner error mapping | Shared pattern candidate |
| Success State | Confirm the actual business outcome and next step | Inline, page, persistent consequential confirmation | Completed, partial success, follow-up required | Status announced; focus moves predictably | Outcome/scope translated | Owner result | Shared pattern candidate |
| Permission/Unavailable State | Distinguish access from capability/lifecycle/service issues | Unauthorized, unavailable, subscription/setup required | Restricted, request/return available | Protect data; explain safely | Translated distinction and recovery | Owner guard result | Shared pattern candidate |

## 11. Overlays

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Dialog | Focus a bounded decision without losing page context | Information, form, confirmation | Open, pending, invalid, error, closing | Modal semantics, focus containment/return, Escape rules | Title/actions translated; responsive to expansion | Overlay tokens, Button, Form | Shared pattern candidate |
| Confirmation Dialog | Confirm a proportional consequential action | Standard, destructive, high-consequence | Open, acknowledging consequence, pending, failure | Explicit consequence and action labels; focus-safe | Scope/outcome translated | Dialog, owner action summary | Shared pattern candidate; owner supplies consequence |
| Drawer | Show contextual detail or bounded editing beside the source | Detail, create/edit, filter | Open, dirty, pending, error, closing | Dialog semantics when modal; focus and dismissal rules | Logical side/direction; translated content | Overlay, page context | Shared pattern candidate; current Commerce usage is evidence |
| Dropdown/Menu | Offer compact related actions or choices | Action, account, context, overflow | Open, current/checked, disabled, loading | Menu semantics only for true commands; keyboard and focus return | Items translated; logical alignment | Trigger, owner actions | Shared primitive/pattern candidate |
| Tooltip/Popover | Explain a control or expose concise supporting content | Tooltip, nonmodal popover | Hidden, shown, dismissed | Not the only source of essential information; keyboard/pointer parity | Translated and expansion-safe | Trigger, overlay tokens | Shared primitive/pattern candidate |

## 12. Discovery Experience Components

Business Discovery is a method-independent Core capability. The following roles may present an
approved acquisition method without defining the capability as a chat, form, wizard, or route.
All “states” in this catalog are presentation conditions, not domain lifecycle authority.

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Discovery Entry | Explain value, temporary status, privacy, method choice, and customer control | Public, authenticated continuation | Ready, unavailable, recovery offered | Clear heading, choice descriptions, keyboard operation | Full locale/direction parity | Discovery goal/strategy presentation | Core composition |
| Knowledge Acquisition Surface | Host the owner-approved method appropriate to current gaps | Guided conversation, structured input, source review, future approved methods | Loading, active, insufficient evidence, error/recovery | Method-specific accessible alternative; no forced modality | Method content translated; source data preserved | Approved method and privacy policy | Core composition; method-specific internals remain bounded |
| Candidate Reflection | Present temporary understanding for review and correction | Summary, detailed evidence view | Loading, partial, low confidence, contradiction, unavailable | Structured distinctions and non-color confidence | Explanations translated; source text retained | Candidate/provenance projection | Core non-writing composition |
| Value Preview | Present credible value before authentication without implying canonical status | Summary, partial preview | Loading, ready, partial, unavailable | Projection status and next choices announced | Bilingual and expansion-safe | Temporary candidate projection | Core non-writing composition |
| Confidence/Provenance Disclosure | Explain what is observed, inferred, uncertain, or contradictory | Inline, detail, source list | Known, uncertain, conflicting, unavailable | Programmatic relationships; no color-only meaning | Meaning translated without altering source | Evidence/provenance projection | Core composition |

## 13. Business Architect Components

These are planned Core compositions. No current route or component implements the target Business
Architect experience.

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Architect Introduction | Explain outcome, process, use of information, and resume | New, resumable, completed | Context loading, ready, inaccessible, error | Clear heading/order and focused primary action | Full bilingual copy; Business name as entered | Selected Business context, session summary | Core composition |
| Guided Conversation Prompt | Present one useful question when Guided Business Conversation is the approved method | Question, clarification, optional follow-up | Loading, active, answered, skipped where permitted, owner-reported blocker | Announce new prompt without focus theft; semantic conversation region | Prompt/hint translated; mixed-script support | Business Architect Session and approved method | Core composition; not the Discovery capability |
| Answer Composer | Capture and validate the current response | Short, long, choice, structured composition | Draft, saving, saved, invalid, failure | Label/help/error relationships and keyboard operation | Input direction follows content; UI translated | Shared fields, session action | Core composition |
| Evidence/Supporting Information Panel | Explain or collect permitted supporting context | Explanation, reference, approved attachment later | Empty, available, adding, rejected, unavailable | Accessible source list/input/status | Instructions translated; source names preserved | Evidence/privacy policy | Core composition |
| Provenance/Inference Disclosure | Distinguish source answer, inference, confidence, and assumption | Inline, expandable detail | Known, uncertain, conflicting, unavailable | Programmatic labels; no color-only confidence | Explanation translated without altering source text | Provenance projection | Core composition |
| Pipeline Progress and Resume | Present the inherited Business Architect Session condition and next safe action | Compact indicator, resume card | Owner-reported progress, pause, block, expiry, supersession | Current condition and action named; not color-only | Labels translated | Session summary | Core composition; does not define Discovery or Guided Activation states |
| Review Checkpoint | Confirm/correct answers and material inferences | Sectioned review, conflict review | Loading, incomplete, conflict, correction pending, confirmed | Heading structure, error summary, focus return to edits | Labels translated; values preserved | Session draft, provenance, validation | Core composition |
| Understanding Processing Status | Present honest owner-reported processing without creating a new engine owner | Indeterminate, owner-measured, correction required | Loading, delayed, failed/recovery, result available | Restrained live updates; reduced motion | Status/recovery translated | Business Understanding/Business Brain owner projection | Core composition |

## 14. Business Blueprint Components

These are planned Core presentation components. Business Blueprint is a governed authenticated
customer-facing, non-writing projection derived from Business DNA and governed owner outputs. It
is not canonical storage, a source of truth, or an independent owner.

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Blueprint Header/Summary | Identify Business, version/source status, and overall result | Standard, partial/stale | Loading, ready, partial, stale, error | Page heading and source status | Summary translated; names as entered | Blueprint presentation model | Core composition |
| Business DNA Section | Present authorized reviewed DNA facts | Section, grouped facts | Loading, ready, restricted, source unavailable | Semantic definition groups | Labels translated; facts preserved | Business DNA projection | Core composition |
| Needs/Challenges/Opportunities | Present governed owner findings distinctly | Separate sections, prioritized groups | Empty optional, ready, partial, error | Headings/lists and non-color priority | Explanation translated | Governed owner projections | Core composition |
| Readiness Indicator | Explain current readiness and unmet conditions | Summary, detailed criteria | Unknown, in progress, ready, blocked, stale | Text criteria and status; no gauge-only meaning | Criteria/status translated | Readiness projection | Core composition |
| Capability Map | Relate Business needs to NexoraXS Capabilities | List, relationship view, accessible table | Loading, empty, partial, ready | Nonvisual equivalent and explicit relationships | Capability labels/explanations translated | Capability and analysis projections | Core composition |
| Implementation Roadmap | Present a customer-facing sequenced path | Phases, timeline/list | Ready, optional section unavailable, partial | Ordered structure and text status | Steps translated | Analysis presentation | Core composition |
| Blueprint Section Navigation | Move through long-form Blueprint sections | Sticky index, in-page links, compact menu | Current section, unavailable section | Named navigation and focus target | Translated labels; RTL order | Blueprint template | Core composition over shared navigation pattern |

## 15. Recommendation Components

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Recommendation Card | Summarize optional advice, reason, benefit, risk, and confidence | Standard, priority presentation | Loading, ready, stale, action unavailable, error | Structured title/reason/actions; no color-only confidence | Full rationale/action translation | Recommendation projection | Core composition; no lifecycle inferred |
| Explanation Panel | Expose evidence, assumptions, alternatives, and uncertainty | Inline disclosure, detail panel | Loading, complete, partial evidence, unavailable | Disclosure semantics and source relationships | Translation preserves source meaning | Recommendation evidence | Core composition |
| Capability/Implementation Option | Distinguish needed capability from optional product/plan implementation | Capability-only, product option, plan option | Eligible, unavailable, setup/access required | Relationship and optionality explicit | Labels translated; product names stable | Capability mapping and owner projections | Core composition |
| Recommendation Comparison | Compare relevant options without coercion | Side-by-side, stacked | Ready, unavailable option, partial | Comparable headings/table; keyboard operation | Comparable translated structure | Recommendation/option projections | Core composition |
| Customer Choice Controls | Explore, defer, decline, retain current tools, or return when owner policy permits | Inline actions, dialog when consequence requires it | Available, pending owner response, success/failure presentation | Explicit labels and status; no forced default | Actions and consequences translated | Recommendation owner action/policy | Core composition; exact disposition lifecycle deferred |
| Recommendation Empty/Unavailable | Explain why no advice is present and allow safe continuation | No result, more information needed, unavailable | Empty, blocked, error/retry | Clear status and next action | Respectful translated copy | Recommendation status | Core composition over shared state pattern |

## 16. Product Hub Components

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Product Card | Explain product value, capability fit, access, and next action | Available, setup required, ready, unavailable/later | Loading, partial, stale, error, ready | State/action text; card interaction explicit | Product/value copy translated | Product metadata and owner projections | Core Product Hub composition |
| Product Lifecycle Summary | Distinguish access, subscription, setup, activation, readiness, and operation | Compact, detailed | Unknown, active, paused, setup required, blocked | Textual state distinctions | Status translated | Multiple owner projections | Core composition; source owners retain facts |
| Plan Comparison | Compare owner-approved commercial options | Standard, available-access branch | Loading, eligible, current, unavailable, pending | Comparable headings, terms, selection | Locale-aware presentation under approved policy | Commercial owner projection | Core composition |
| Setup/Launch/Recovery Action | Route to the correct owner state | Setup, resume, launch, recover | Resolving, available, rejected, expired, failure | Destination/consequence clear; focus at arrival | Recovery copy translated | Navigation handoff/guard | Core initiates; OS validates |
| Product Hub Empty/Partial State | Keep Core usable when options/projections are absent | No relevant product, partial owner failure, unavailable | Empty, partial, stale, error/retry | Source failure understandable | Translated source-safe explanation | Product Hub projection status | Core composition |

## 17. Commerce Components

Commerce components stay in Commerce when they know Commerce terminology, operational scope,
validation, or workflows. They may compose shared primitives without moving business behavior into
the shared package.

| Component | Purpose | Variants | States | Accessibility | Localization | Dependencies | Ownership |
|---|---|---|---|---|---|---|---|
| Commerce Shell | Frame Commerce setup/operations and safe return | Setup, operational, compact | Context resolving, setup required, ready, unauthorized, error | Landmarks, skip/drawer/focus behavior | Commerce messages; RTL/LTR | Commerce context and navigation | Commerce composition |
| Operational Context Summary | Show active Business Unit/Branch and permitted switch | Header pill, selector, page summary | Loading, current, multiple, unavailable | Current selection and menu semantics | Names as entered; labels translated | Commerce context projection | Commerce composition |
| POS Workspace | Support high-frequency cart and checkout work | Operational wide, compact fallback | Context loading, empty cart, validation, pending, partial failure, success | Keyboard-first task flow and announced totals/errors | All operational text; direction-safe numeric/data content | Commerce POS and owner projections | Commerce composition |
| Product Catalog Table/Card | Browse Commerce Products | Table/list, compact cards | Loading, empty/filter-empty, error, selected | Table/list semantics and actions | Product text preserved; chrome translated | Commerce Product projection | Commerce composition |
| Product Editor | Create/edit Commerce Product presentation | Create, edit | Empty, dirty, invalid, saving, failure, success | Form/error/focus and unsaved-work protection | Labels/errors translated | Commerce Product owner behavior | Commerce composition |
| Inventory Status Table | Inspect stock by applicable scope | Standard, exception-focused | Loading, empty, low/out, stale, error | Headers/status text and keyboard actions | Units/status translated | Commerce Inventory projection | Commerce composition |
| Stock Adjustment | Request an authorized inventory change | Inline/dialog/drawer as feature-approved | Validating, pending, failure, success | Consequence/scope explicit | Reason/units translated | Inventory owner action | Commerce composition |
| Transfer Composer/History | Create and inspect Branch transfers | Guided composer, history list | No destination, invalid, pending, partial failure, success | Step/form/list semantics | Branch names preserved; actions translated | Commerce Transfer and Inventory boundaries | Commerce composition |
| Customer List/Profile | Manage Commerce transactional Customers | List, profile/master-detail, create/edit drawer | Loading, empty, partial history, error, not found | Table/list/detail/form accessibility | Customer data preserved; chrome translated | Commerce Customer projection/actions | Commerce composition |
| Order List/Detail | Inspect Commerce Orders and related outcomes | List, detail, status history | Loading, empty, partial relations, error, not found | Structured status/actions | Values and document labels localized | Commerce Order projection | Commerce composition |
| Invoice List/Detail | Inspect Commerce Invoices | List, detail, preview | Loading, empty, partial, error, not found | Tables/definitions/document link semantics | Locale-aware display without changing canonical value | Commerce Invoice projection | Commerce composition |
| Return Flow/History | Initiate and inspect Commerce Returns | Order-linked, later approved collection/detail | Eligibility, invalid, pending, partial failure, success | Consequence and source Order explicit | Actions/status translated | Commerce Return and Order boundaries | Commerce composition |
| Document/Receipt View | Present printable Commerce documents | Invoice, return, receipt | Loading, ready, partial, unavailable, print | Semantic document structure and zoom/reflow | Document language/direction preserved | Commerce document projection | Commerce composition |
| Commerce Analytics/Report Panel | Present owner-valid metrics and reports | KPI, table, chart, report | Loading, no data, stale, partial, error | Accessible summaries and underlying data | Period/units/labels localized | Commerce reporting projection | Commerce composition |
| Commerce Settings Group | Change Commerce-owned configuration | Standard, document settings, Branch-linked | Loading, dirty, invalid, pending, failure, success | Form/section/error semantics | Configuration copy translated | Commerce settings owner behavior | Commerce composition |

## 17. Component Lifecycle and Admission

Catalog roles pass through Candidate, Proposed, Approved, Adopted, Deprecated, and Removed as
defined by Component Governance. A component enters `packages/ui` only when multiple valid
consumers share interaction semantics, it remains domain-neutral, all quality states are defined,
and migration/compatibility evidence exists.

## 18. Open Questions

1. Which current Core and Commerce shell primitives are semantically equivalent enough to share
   without merging app-specific shell composition?
2. Which base primitives are missing from `packages/ui` for the first Business Architect slice,
   and which should remain Core-local until reuse is proven?
3. Which accessible chart implementation will satisfy table alternative, RTL, keyboard,
   responsive, performance, and light/dark requirements?
4. What is the approved first complete Returns composition: a collection/detail pattern or an
   Order-centered history pattern?
5. Which component preview and documentation environment will become the component acceptance
   evidence source?

## 19. Verified Against

This document was verified against:

- [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md),
  [Screen Map](../03-ui-ux/02-SCREEN-MAP.md),
  [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md),
  and [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md);
- `docs/10-design-intelligence/02-DESIGN-DNA.md`, `05-DESIGN-PATTERNS.md`, and
  `06-COMPONENT-GOVERNANCE.md`;
- every current export under `packages/ui/src/`;
- current components under `apps/core-platform/components/` and `apps/commerce/components/`;
- current Landing sections under `apps/landing/src/sections/`;
- current page composition patterns under `apps/core-platform/app/` and `apps/commerce/app/`; and
- current Feature 052 through Feature 055 frontend boundary evidence referenced by the Product
  Experience documents.

## 20. Cross References

- [Design System index](./README.md)
- [Design Foundations](./01-DESIGN-FOUNDATIONS.md)
- [Design Tokens](./02-DESIGN-TOKENS.md)
- [Page Templates](./04-PAGE-TEMPLATES.md)
- [Interaction Patterns](./05-INTERACTION-PATTERNS.md)
- [Product Experience index](../03-ui-ux/README.md)
- [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md)
- [Component Governance](../10-design-intelligence/06-COMPONENT-GOVERNANCE.md)
