# Page Templates

- **Status:** Canonical composition templates; not route or layout implementation
- **Date:** 2026-07-19
- **Owner:** Design System for reusable anatomy; product owners for page composition
- **Authority:** Page-template responsibility and quality semantics

## 1. Purpose

This document defines reusable page-composition templates for NexoraXS. A template describes the
regions, hierarchy, state handling, navigation relationship, responsive behavior, accessibility,
localization, dependencies, and ownership expected for a type of page.

Templates help pages feel coherent without making Core and Commerce share product workflows.

## 2. Scope

The catalog covers public, authentication, guided, dashboard, record, table, analytics, settings,
document, Product Hub, Commerce workspace, Business Architect, Business Blueprint, and
Recommendation compositions.

## 3. Out of Scope

This document does not:

- approve routes, screens, features, workflow states, backend operations, schemas, or contracts;
- define layout measurements, breakpoints, columns, token values, CSS, or components;
- claim that a template or its required states are currently implemented;
- make the Business Architect a conventional fixed wizard; or
- move owner-specific content, validation, or actions into the shared design system.

## 4. Relationships

| Source | Relationship |
|---|---|
| [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md) | Defines the journey stages and state outcomes composed by templates. |
| [Screen Map](../03-ui-ux/02-SCREEN-MAP.md) | Maps current/planned screens to suitable templates. |
| [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) | Identifies where current pages lack target composition or state coverage. |
| [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md) | Defines entry, exit, sidebar, header, breadcrumb, and safe-return rules. |
| [Component Catalog](./03-COMPONENT-CATALOG.md) | Supplies the component roles composed by each template. |
| [Interaction Patterns](./05-INTERACTION-PATTERNS.md) | Defines cross-template behavior for data, errors, overlays, and responsiveness. |

## 5. Template Rules

Every page template:

1. belongs to one presentation owner;
2. identifies the active scope when it materially affects interpretation or action;
3. has one clear page purpose and primary action;
4. covers relevant loading, empty, partial/stale, error, permission, success, and recovery states;
5. uses Arabic/RTL and English/LTR as native compositions;
6. preserves semantic, keyboard, focus, zoom, reflow, reduced-motion, and assistive-technology behavior;
7. keeps projections distinct from their source owners; and
8. allows bounded product personality without changing shared state meaning.

## 6. Template Catalog

### 6.1 Landing Page

| Concern | Template contract |
|---|---|
| Purpose | Establish trust, explain platform value, and provide clear Core account entry. |
| Structure | Public header; concise hero/value; supporting proof/capability/product sections; FAQ; final entry action; footer. |
| Navigation | In-page public links plus Register and Login; no protected Workspace or OS navigation. |
| Actions | One clear new-customer action and a returning-customer alternative. |
| Required states | Primary public content remains available while nonessential media loads; entry failure has recovery. |
| Responsive behavior | Reorders supporting media without changing message or access to primary actions; mobile menu is fully operable. |
| Accessibility | Landmarks, heading hierarchy, reduced motion, descriptive imagery, keyboard menu, and skip behavior where needed. |
| Localization | Entire public narrative, navigation, and CTA set supports Arabic/RTL and English/LTR. |
| Dependencies | Public content, brand assets, Core entry URLs, locale presentation. |
| Ownership | Landing presentation; Core owns account-entry destinations. |

### 6.2 Authentication Page

| Concern | Template contract |
|---|---|
| Purpose | Complete one identity task with minimal distraction and safe recovery. |
| Structure | Brand/owner identity; page title/explanation; focused form or verification control; inline validation; primary action; alternative/recovery links; legal/help where applicable. |
| Navigation | No application sidebar; back/alternate account action and approved resume destination only. |
| Actions | Submit the current identity task; secondary action changes method or begins recovery. |
| Required states | Initial, field invalid, pending, unavailable, expired/mismatched where applicable, success, and safe resume. |
| Responsive behavior | Single reading order; fields and code entry reflow without splitting labels/errors from controls. |
| Accessibility | Autocomplete/purpose, labels, error association/summary, password/code behavior, announced pending/success, and focus recovery. |
| Localization | Identity guidance, consent, validation, and recovery translated; user identity values remain as entered. |
| Dependencies | Core identity presentation and approved account-resume behavior. |
| Ownership | Core Platform. |

### 6.3 Guided Wizard Page

| Concern | Template contract |
|---|---|
| Purpose | Guide a low-frequency, ordered, or consequential setup task with review and correction. |
| Structure | Goal/context; progress; current step; focused fields/content; help; back/next; save/exit where allowed; review and completion. |
| Navigation | Focused flow; global sidebar may be absent. Back changes step, not browser context, and preserves valid work. |
| Actions | One next/commit action plus back/save/exit; irreversible completion receives proportional review. |
| Required states | Not started, current step, completed step, validation blocked, saving, failure/retry, paused/resumable, complete. |
| Responsive behavior | Step summary may condense but current position, task, and recovery remain visible. |
| Accessibility | Current-step semantics, keyboard controls, error focus, no color-only progress, and safe focus after step change. |
| Localization | Step labels, progress, fields, and errors translated; logical progress direction is reviewed for RTL. |
| Dependencies | Owner workflow state and shared form/progress components. |
| Ownership | The owner of the setup/workflow. Commerce setup remains Commerce-owned. |

This template is not the default Discovery or Business Architect template. Business Discovery is
method-independent. Guided Business Conversation may present one useful question at a time, but it
is only one approved experience pattern.

### 6.4 Dashboard Page

| Concern | Template contract |
|---|---|
| Purpose | Explain current status and direct the user to the next most valuable action. |
| Structure | Owner/context; page heading; readiness/exceptions; prioritized actions/work queues; owner-valid metrics; recent relevant activity; supporting insights. |
| Navigation | Uses the owning shell; Dashboard is the stable home within that owner. |
| Actions | Resume/resolve the highest-priority task; secondary actions enter owner modules. |
| Required states | New/first use, loading by section, no data, partial/stale projection, unauthorized component, error/retry, ready. |
| Responsive behavior | Preserves action priority; card/metric layouts reflow without hiding scope, source, or exceptional state. |
| Accessibility | Semantic regions, skip link, accessible KPI/chart alternatives, predictable focus, and non-color status. |
| Localization | All shell/content translated; values follow approved representation policy; mixed-script names preserved. |
| Dependencies | Owner projections and independently recoverable section status. |
| Ownership | Core owns Platform Dashboard; each OS owns its operational Dashboard. |

### 6.5 Master/Detail Page

| Concern | Template contract |
|---|---|
| Purpose | Browse records while inspecting one record without losing collection context. |
| Structure | Collection/search/filter region; selected record summary/detail; owner actions; related history or subviews. |
| Navigation | Collection and detail have stable deep-link behavior; compact layouts may navigate between them with safe return. |
| Actions | Select/open a record; owner actions remain inside the detail and follow permission/state. |
| Required states | Collection loading/empty/filter-empty/error; detail loading/not found/unauthorized/partial/error; selection recovery. |
| Responsive behavior | Wide mode may show simultaneous regions; compact mode preserves collection query and return position. |
| Accessibility | Clear region headings, selection semantics, focus at detail title, keyboard collection access, and nonvisual relationship. |
| Localization | Labels/actions translated; record content preserved; directional navigation icons follow meaning. |
| Dependencies | Owner collection/detail projections and route/deep-link policy. |
| Ownership | Owner composition; suitable for Commerce Customer, Order, or Invoice experiences when specified. |

### 6.6 Table/List Page

| Concern | Template contract |
|---|---|
| Purpose | Browse, search, filter, sort, select, and act on structured owner records. |
| Structure | Page header/actions; search/filter/sort summary; table or structured list; selection/bulk controls; pagination; state/recovery region. |
| Navigation | Rows link to owner detail where available; query state remains recoverable on return. |
| Actions | Create or owner-approved primary action; row and bulk actions are permission- and state-aware. |
| Required states | Loading, first-use empty, no-data, filtered-empty, stale/partial, error/retry, unauthorized, selection, bulk pending/outcome. |
| Responsive behavior | Uses column priority, horizontal access, or structured list alternatives without silently dropping consequential data. |
| Accessibility | Named table/list, headers, keyboard actions, selection counts, sort state, and responsive alternative. |
| Localization | Headers, filters, statuses, and actions translated; values follow approved representation policy. |
| Dependencies | Owner query state, pagination/filter/sort semantics, Table/List components. |
| Ownership | Owner composition over shared patterns. |

### 6.7 Analytics Page

| Concern | Template contract |
|---|---|
| Purpose | Support exploration, comparison, diagnosis, and owner-valid decisions. |
| Structure | Analytical question; owner/scope/period/freshness; filters; KPI summary; visualization; accessible underlying data; definitions and notes. |
| Navigation | From Dashboard or Reports; links back to source owner records when authorized. |
| Actions | Adjust parameters, inspect data, and use an approved export only when specified. |
| Required states | Loading, no data, partial/stale, estimated, source error, unauthorized, ready. |
| Responsive behavior | Charts reflow or change to accessible table/list forms; comparison meaning is preserved. |
| Accessibility | Text summary, units/period, non-color series, keyboard inspection, and data-table alternative. |
| Localization | Labels, periods, numbers, units, and direction are locale-aware under approved policy. |
| Dependencies | Owner reporting projection and chart/table components. |
| Ownership | Core for platform analytics; Commerce for Commerce reporting; source facts retain their owners. |

### 6.8 Settings Page

| Concern | Template contract |
|---|---|
| Purpose | Change configuration safely within a clear owner and scope. |
| Structure | Owner/scope; section navigation; grouped fields; inherited/default/source notes where applicable; save/revert; consequence/help. |
| Navigation | One owner only; Core settings and Commerce settings remain separate destinations. |
| Actions | Save/revert the current section; consequential settings may require review or confirmation. |
| Required states | Loading, ready, dirty, invalid, saving, saved, failure/retry, unauthorized, unavailable section. |
| Responsive behavior | Section navigation condenses without hiding current location or unsaved status. |
| Accessibility | Semantic sections, labels, errors, dirty-state warning, focus after navigation/save, and keyboard operation. |
| Localization | All configuration chrome translated; preference and data scopes remain explicit. |
| Dependencies | Owner settings projection and approved preference/configuration scope. |
| Ownership | Core for Core settings; Commerce for Commerce operational settings. |

### 6.9 Document Viewer Page

| Concern | Template contract |
|---|---|
| Purpose | Present a stable owner-generated document or document projection for review and applicable print. |
| Structure | Document identity/status; owner/scope; document body; totals/metadata where applicable; safe return; approved print/action controls. |
| Navigation | Enter from the owning record; return restores the source detail/collection context. |
| Actions | View, print, or another separately approved document action; editing occurs in owner workflow, not in the viewer by default. |
| Required states | Loading, ready, partial related data, unavailable, not found, unauthorized, render/print error. |
| Responsive behavior | Preserves reading order, tables, totals, and zoom/reflow; print composition remains distinct when needed. |
| Accessibility | Document landmarks/headings, semantic tables, meaningful images, text alternatives, and keyboard controls. |
| Localization | Document language/direction and user content are preserved; viewer chrome is localized. |
| Dependencies | Owner document projection and source record permission. |
| Ownership | Document/domain owner; current Commerce invoice/return/receipt views are implementation evidence. |

### 6.10 Product Hub Page

| Concern | Template contract |
|---|---|
| Purpose | Compose capability fit, product information, access/readiness, and owner setup/launch choices. |
| Structure | Selected context; reason/capability summary; product cards; lifecycle/access details; plan/access resolution; setup/launch/recovery; safe return. |
| Navigation | Core sidebar and Dashboard entry; owner handoff starts a new owner route trail. |
| Actions | Launch, begin/resume setup, resolve access, compare approved options, retry a failed projection. |
| Required states | Loading per source, no relevant option, partial/stale source, unavailable, setup required, ready, rejected/expired handoff, error/retry. |
| Responsive behavior | Comparison becomes stacked without losing state distinctions or primary action context. |
| Accessibility | Product states/actions are textual; comparison is keyboard-operable; source errors are associated. |
| Localization | Capability reason precedes localized product copy; product identifiers remain stable. |
| Dependencies | Core composition over recommendation, catalog, commercial, access, setup, and readiness projections. |
| Ownership | Core Product Hub; source owners retain facts and destination workflows. |

### 6.11 Commerce Workspace Page

| Concern | Template contract |
|---|---|
| Purpose | Support dense, high-frequency Commerce work with visible operational context. |
| Structure | Commerce shell; Business Unit/Branch context where applicable; task title/actions; operational work surface; status/recovery; related record access. |
| Navigation | Commerce-owned primary/secondary navigation and Product Hub safe return. |
| Actions | Owner-permitted actions tied to the active operational scope. |
| Required states | Context resolving, setup required, ready, loading, empty, partial, error, unauthorized, pending mutation, recovery. |
| Responsive behavior | Preserves task-critical data/actions; compact layouts may change composition but not workflow ownership or safety. |
| Accessibility | Keyboard efficiency, explicit focus, non-color status, readable dense data, and accessible alternatives to specialized interaction. |
| Localization | All operational UI supports Arabic/RTL and English/LTR; values and user-entered data retain meaning. |
| Dependencies | Commerce context, owner projections/actions, shared primitives, Commerce-specific components. |
| Ownership | Commerce. |

### 6.12 Discovery Experience

| Concern | Template contract |
|---|---|
| Purpose | Present method-independent value-before-registration Discovery or its authenticated continuation without creating an anonymous Workspace/Business. |
| Structure | Value/context; temporary-status and privacy explanation; approved method surface; candidate reflection; confidence/provenance; correction; Value Preview; authentication choice. |
| Navigation | Public entry or authenticated continuation; optional and resumable only where retention authority permits; safe exit always visible. |
| Actions | Continue with the current method, choose another approved method, correct, pause/discard, Register, or Login. |
| Required states | Loading, no evidence, low confidence, contradiction, unavailable, error/recovery, temporary result; exact Discovery lifecycle deferred. |
| Responsive behavior | Method and reflection remain usable without hiding temporary status, provenance, or customer choices. |
| Accessibility | Method alternatives, semantic review structure, non-color confidence, keyboard/focus continuity, and clear status messages. |
| Localization | Full English/LTR and Arabic/RTL parity; mixed-direction evidence preserved. |
| Dependencies | Discovery goal/strategy, approved acquisition method, Candidate/provenance projection, privacy/retention policy. |
| Ownership | Core composition; owning evidence sources retain their facts. |

### 6.13 Business Architect Page

| Concern | Template contract |
|---|---|
| Purpose | Present the governed authenticated selected-Business pipeline, using Guided Business Conversation only when that is the approved acquisition method. |
| Structure | Selected context/outcome reminder; owner-reported Session condition; approved method surface; candidate/evidence review; correction; explicit publication approval when applicable; recovery. |
| Navigation | Focused onboarding surface; entry/resume resolves the next safe stage; exit preserves work or explicitly confirms discard. |
| Actions | Answer and continue; clarify, skip when allowed, add supporting information, back, save/exit, or ask why. |
| Required states | Context resolving; owner-reported progress, pause, block, expiry, or supersession; presentation loading/validation/error/recovery; exact new UI states deferred. |
| Responsive behavior | Conversation order and progress remain clear; supporting panels become sequential without losing prompt context. |
| Accessibility | Semantic prompt/response regions, announced updates without focus theft, keyboard controls, progress meaning, and error recovery. |
| Localization | Prompts/help/errors translated; answers preserve user language and mixed-script direction. |
| Dependencies | Core Business Architect session, selected Business, approved supporting context, shared form/state components. |
| Ownership | Core Platform. |

The Business Architect template is not public Discovery, registration, Guided Activation,
Product Hub, or OS-Specific Setup. Its inherited Session lifecycle is not reused as a Discovery or
Guided Activation state machine.

### 6.14 Business Blueprint Page

| Concern | Template contract |
|---|---|
| Purpose | Present a governed authenticated customer-facing non-writing projection derived from Business DNA and governed owner outputs. |
| Structure | Business/source header; summary; Business DNA; needs; challenges; opportunities; readiness; recommended capabilities; implementation roadmap; section navigation; Recommendations continuation. |
| Navigation | Enter after governed owner output is available or from Core Business/Dashboard; corrections return through owner review; Recommendations is optional. |
| Actions | Navigate sections, enter an owner correction path, continue to Product Hub, optionally inspect Recommendations, and use portability only if separately approved. |
| Required states | Loading by section, ready, partial source, optional section unavailable, stale, restricted, error/retry. |
| Responsive behavior | Long-form hierarchy, section navigation, tables/visuals, and print/zoom reading remain coherent in both directions. |
| Accessibility | Landmarks/headings, summary before detail, accessible readiness/visuals, keyboard section navigation, and source status. |
| Localization | Full bilingual composition; Business content remains as entered; long-form RTL is native. |
| Dependencies | Core Blueprint presentation over Business DNA and governed owner projections. |
| Ownership | Core presentation; source facts retain their canonical owners. |

### 6.15 Recommendations Page

| Concern | Template contract |
|---|---|
| Purpose | Present explainable optional capability-first advice and preserve customer agency. |
| Structure | Selected Business/context; Business Need/Desired Outcome; capability; reason/evidence/assumptions/alternatives/risk/confidence/benefit; optional implementation/NexoraXS options; customer choices. |
| Navigation | May be entered from Blueprint or another approved Core destination; Product Hub continuation does not require Recommendation acceptance. |
| Actions | Explain, compare, explore, defer, decline, retain current tools, return, or continue as owner policy permits. |
| Required states | Loading, no recommendation, partial/stale, explanation unavailable, owner-action pending/failure/success presentation; exact lifecycle deferred. |
| Responsive behavior | Comparison becomes sequential while keeping option relationships and actions understandable. |
| Accessibility | Semantic card/detail hierarchy, non-color confidence/risk, keyboard comparison/disclosure, and announced disposition. |
| Localization | Rationale and risk translated without changing evidence meaning; optionality remains clear. |
| Dependencies | Recommendation projection, evidence, capability mapping, optional owner-approved implementation options. |
| Ownership | Core Platform Recommendation experience. |

## 7. Template Selection Guide

| User need | Preferred template |
|---|---|
| Establish identity | Authentication Page |
| Complete ordered low-frequency setup | Guided Wizard Page |
| Acquire knowledge before registration | Discovery Experience |
| Continue the governed authenticated selected-Business pipeline | Business Architect Page |
| Understand current owner status and next action | Dashboard Page |
| Browse and inspect records | Master/Detail or Table/List Page |
| Compare and diagnose metrics | Analytics Page |
| Change configuration | Settings Page |
| Review an owner-generated document | Document Viewer Page |
| Discover/launch products | Product Hub Page |
| Perform dense Commerce work | Commerce Workspace Page |
| Review Business understanding | Business Blueprint Page |
| Review explainable advice | Recommendations Page |

## 8. Open Questions

1. Which first-slice Business Architect supporting-information regions are required without adding
   file handling or storage scope?
2. Which Business Blueprint sections need an accessible visualization in the first slice versus a
   text/list presentation?
3. Which current Commerce record pages should adopt master/detail behavior, and which should
   remain independent collection and detail routes?
4. What is the first approved Returns page-template selection?
5. Which document portability actions belong in the first Blueprint and Commerce document-viewer
   scopes?

## 9. Verified Against

This document was verified against:

- [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md),
  [Screen Map](../03-ui-ux/02-SCREEN-MAP.md),
  [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md),
  and [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md);
- `docs/10-design-intelligence/02-DESIGN-DNA.md`, `03-OS-PERSONALITIES.md`,
  `05-DESIGN-PATTERNS.md`, and `06-COMPONENT-GOVERNANCE.md`;
- all current Core and Commerce route pages listed in the Screen Map;
- current Landing section composition under `apps/landing/src/`;
- current Core authentication, onboarding, Dashboard, Product Hub, settings, team, billing, and
  integration composition; and
- current Commerce setup, POS, catalog, inventory, customer, order, invoice, return document,
  report, and settings composition.

## 10. Cross References

- [Design System index](./README.md)
- [Design Foundations](./01-DESIGN-FOUNDATIONS.md)
- [Design Tokens](./02-DESIGN-TOKENS.md)
- [Component Catalog](./03-COMPONENT-CATALOG.md)
- [Interaction Patterns](./05-INTERACTION-PATTERNS.md)
- [Product Experience index](../03-ui-ux/README.md)
- [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md)
- [Design Patterns](../10-design-intelligence/05-DESIGN-PATTERNS.md)
