# NexoraXS Information Architecture

- **Status:** Canonical product navigation model
- **Date:** 2026-07-19
- **Owner:** Product Experience, with route ownership retained by Core Platform and Commerce
- **Authority:** Navigation source of truth subordinate to architecture freezes and Accepted ADRs

## 1. Purpose

This document is the single source of truth for NexoraXS navigation: how customers move from the
public experience into Core Platform, through Business Architect and the Business Blueprint, and
from Product Hub into Commerce or a later approved Operating System.

It extends the journey in [Platform Experience](./01-PLATFORM-EXPERIENCE.md) and the route evidence
in [Screen Map](./02-SCREEN-MAP.md). It does not claim that planned routes exist. Current route
status and source evidence remain authoritative in the Screen Map.

## 2. Scope

This information architecture covers:

- public Landing and authentication entry;
- Workspace and selected Business context in Core Platform;
- Business Architect, Business Blueprint, and Recommendations;
- Platform Dashboard, Product Hub, and Core administration;
- Commerce setup and operational navigation;
- owner-preserving entry to later approved Operating Systems;
- sidebar, header, breadcrumb, search, command, deep-link, and safe-return behavior; and
- recent items, favorites, and pinned-view semantics as presentation concerns.

## 3. Out of Scope

This document does not:

- approve a route, screen, feature, role catalog, permission key, or product lifecycle;
- define backend operations, handoff payloads, API contracts, persistence schemas, or databases;
- replace the canonical organization hierarchy or decide where Business creation/selection appears;
- turn search results, recent items, favorites, notifications, or dashboard cards into sources of truth;
- merge Core Platform and Commerce navigation or transfer operational ownership to Core;
- define detailed component anatomy or visual values; or
- approve navigation for an Operating System whose product scope has not been approved.

## 4. Relationships

| Source | Relationship to this document |
|---|---|
| [Product Decision Register](../00-governance/PRODUCT-DECISIONS.md) | Supplies confirmed product sequence and delivery constraints. |
| [Platform Experience](./01-PLATFORM-EXPERIENCE.md) | Defines the canonical journey and stage behavior that navigation must support. |
| [Screen Map](./02-SCREEN-MAP.md) | Records verified routes, proposed routes, current status, and source files. |
| [Frontend Experience Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) | Records the current-to-target experience gaps and safe frontend slices. |
| [Core Platform Architecture, Navigation Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md#8-navigation-architecture) | Defines architectural surface ownership, guard order, and cross-application rules. |
| [ADR-037](../00-governance/ADR/ADR-037-context-preserving-navigation.md) | Requires explicit context, owner-specific routes, reauthorization, and safe recovery. |
| [Design System](../04-design-system/README.md) | Defines reusable presentation semantics, page templates, and interaction patterns. |
| [Design Patterns](../10-design-intelligence/05-DESIGN-PATTERNS.md) | Governs reusable Sidebar, Top Navigation, Search, state, and feedback patterns. |

## 5. Platform Structure

The canonical platform sequence is:

```text
Landing
  ↓
Authentication
  ↓
Workspace and selected Business context
  ↓
Business Architect
  ↓
Business Blueprint
  ↓
Recommendations
  ↓
Platform Dashboard
  ↓
Product Hub
  ↓
Commerce or another enabled Operating System
```

The exact onboarding sequence, including review, analysis, plan/access continuation, and Workspace
Setup, remains the fuller sequence in Platform Experience. This shorter model describes navigation
zones, not a replacement lifecycle.

### 5.1 Surface ownership summary

| Area | Navigation owner | Canonical state owner | Current navigation evidence |
|---|---|---|---|
| Landing | Landing presentation | No protected platform state | `apps/landing/src/app/page.tsx`, `apps/landing/src/sections/` |
| Authentication | Core Platform | Core Identity and Access | Core authentication routes under `apps/core-platform/app/` |
| Workspace | Core Platform | Core Workspace Management and applicable organization registries | `/welcome`, `/onboarding`, Core context switcher and settings |
| Business Architect | Core Platform | Core Business Architect pipeline and its source owners | Planned; no current route |
| Business Blueprint | Core Platform | A presentation over Core-owned source facts and analysis | Planned; no current route |
| Recommendations | Core Platform | Core Recommendation Engine | Planned; no current route |
| Platform Dashboard | Core Platform | Reconstructable composition over approved owner projections | Current `/dashboard`; guard requires reconciliation |
| Product Hub | Core Platform | Core composition; source owners retain their facts | Current `/dashboard/apps` |
| Commerce | Commerce | Commerce operational owners | Current `/setup` and Commerce operational route tree |
| Future Operating Systems | The selected OS | The selected OS for its operational state | No route is approved by this document |

## 6. Major Area Navigation Contracts

### 6.1 Landing

| Concern | Navigation contract |
|---|---|
| Purpose | Explain NexoraXS and direct new or returning customers into Core Platform. |
| Owner | Landing owns public presentation; Core owns account entry. |
| Navigation Entry | Direct public URL, campaign link, or approved public referral. |
| Navigation Exit | Register is the primary platform entry; Login is the returning-user entry; public section links remain within Landing. |
| Sidebar Position | None. Public navigation uses a header and in-page section navigation. |
| Header Actions | Public section links, locale when supported, Register, and Login. |
| Breadcrumb Rules | None on the one-page public surface; a future nested public page may use public-only breadcrumbs. |
| Quick Actions | Register and Login only; product-launch actions do not bypass Core onboarding. |
| Search Scope | Public content only if public search is later approved. |
| Command Palette Scope | None. |
| Notifications | No protected Workspace or OS notifications. |
| Deep Linking | Public sections may be linked directly; protected destinations enter Core guards. |
| Permissions | Public content requires no Workspace context. |
| Dependencies | Core registration/login availability and localized public content. |
| State Ownership | Landing owns transient public presentation state; no canonical customer state is created. |

### 6.2 Authentication

| Concern | Navigation contract |
|---|---|
| Purpose | Establish or recover a Core identity session before protected navigation. |
| Owner | Core Platform Identity and Access. |
| Navigation Entry | Landing Register/Login, invitation/recovery continuation, expired protected session, or explicit sign-out recovery. |
| Navigation Exit | The next authorized resumable Core stage; never an unguarded OS operational route. |
| Sidebar Position | None. Authentication uses a focused shell. |
| Header Actions | Locale/direction, accessible help/recovery, and the alternative account action where applicable. |
| Breadcrumb Rules | None; the flow title and progress provide orientation. |
| Quick Actions | Login, Register, resend verification, or begin recovery according to the current screen. |
| Search Scope | None. |
| Command Palette Scope | None. |
| Notifications | Inline identity status and recovery feedback only; no Workspace notification inbox. |
| Deep Linking | Verification and recovery links resolve only their intended account continuation and preserve safe expiry/error behavior. |
| Permissions | Public entry or account-scoped continuation; authentication alone grants no Workspace, Business, product, or Commerce access. |
| Dependencies | Core identity/session presentation and the approved resume decision. |
| State Ownership | Core owns identity/session state; forms own uncommitted presentation input. |

### 6.3 Workspace

| Concern | Navigation contract |
|---|---|
| Purpose | Establish or select the customer tenant context and expose Core-owned Workspace administration. |
| Owner | Core Platform. |
| Navigation Entry | Verified registration, protected-session resume, context switcher, Dashboard, or Settings. |
| Navigation Exit | Business Architect Introduction after creation; same authorized Core destination after a context switch; Dashboard after settings. |
| Sidebar Position | Context switcher above primary Core navigation; Workspace Settings under Platform Settings. |
| Header Actions | Active Workspace context, locale/direction, notifications when authorized, theme, and account menu. |
| Breadcrumb Rules | Workspace name is context, not a breadcrumb segment repeated on every page; nested settings use `Settings / Section`. |
| Quick Actions | Create Workspace during onboarding; select authorized Workspace; open Workspace Settings. |
| Search Scope | Authorized Core destinations and approved Workspace-owned projections; never inaccessible Workspace content. |
| Command Palette Scope | Switch to an authorized Workspace only when unsaved-work and reauthorization behavior are explicit; otherwise navigation only. |
| Notifications | Workspace-scoped notifications may appear through Core's notification surface with source and destination preserved. |
| Deep Linking | A protected Workspace link resolves identity and membership before rendering; a named identifier is not proof of access. |
| Permissions | Active Workspace Membership plus action-specific permission where a change is available. |
| Dependencies | Core identity, membership, Workspace lifecycle, selected Business context where required, and localization context. |
| State Ownership | Core owns Workspace and membership state; context selectors and settings forms own temporary UI state only. |

### 6.4 Business Architect

| Concern | Navigation contract |
|---|---|
| Purpose | Guide one selected Business through a conversational, resumable discovery and review experience. |
| Owner | Core Platform. |
| Navigation Entry | Post-Workspace continuation, Dashboard resume card, current Blueprint correction path, or a safe resumable link. |
| Navigation Exit | Review, Analysis, Business Blueprint, save-and-exit to Dashboard, or a specific recovery path. |
| Sidebar Position | Hidden during the focused onboarding interview; after onboarding, a resume/review destination appears under the Business group. |
| Header Actions | Selected authorized context, interview progress, locale/direction, help/why-this-is-asked, and save/exit. |
| Breadcrumb Rules | Use stage/progress orientation rather than a long breadcrumb trail. A return from review identifies the edited section. |
| Quick Actions | Resume next incomplete prompt, review current answers, save and exit, or correct the current answer. |
| Search Scope | No global record search inside the interview. Evidence/source selection is bounded to authorized supporting context. |
| Command Palette Scope | Navigation away is allowed only with draft preservation or an explicit discard warning; no analysis/publish command. |
| Notifications | Resume and analysis-completion notices may link to the exact safe stage; prompts themselves are not notifications. |
| Deep Linking | Resolves the authorized Business and session, then redirects to the next safe stage rather than trusting a raw step number. |
| Permissions | Workspace Membership, selected Business access, and action-specific authority for review/publication/analysis. |
| Dependencies | Selected canonical Business, Business Architect session state, authorized evidence, locale, and owner-provided analysis status. |
| State Ownership | Core Business Architect owns session/progress; source owners retain facts; UI drafts remain distinct from reviewed or published information. |

### 6.5 Business Blueprint

| Concern | Navigation contract |
|---|---|
| Purpose | Present the main customer-facing onboarding result for one selected Business. |
| Owner | Core Platform presentation; each source fact retains its canonical owner. |
| Navigation Entry | Completed analysis, Dashboard, Business group, or an authorized direct link. |
| Navigation Exit | Recommendations, governed correction/review, Dashboard, or later approved portability action. |
| Sidebar Position | Business group after a Blueprint is available; not a Product Hub child. |
| Header Actions | Selected Business context, current/source status, locale/direction, and the primary Recommendations action. |
| Breadcrumb Rules | `Business / Business Blueprint`; section anchors may extend the breadcrumb only when they improve orientation. |
| Quick Actions | Continue to Recommendations, navigate to a Blueprint section, or return to the governed correction path. |
| Search Scope | Search within visible Blueprint content and approved Core search projection only. |
| Command Palette Scope | Open Blueprint or a permitted section; no direct source-fact mutation. |
| Notifications | Analysis completion or a material source-status change may link to the Blueprint with owner/source context. |
| Deep Linking | Business-scoped and reauthorized; section anchors cannot expose unavailable sections. |
| Permissions | Business-scoped view permission with section-level minimization where required. |
| Dependencies | Completed reviewed analysis and available Business DNA, summary, need, challenge, opportunity, readiness, capability, and roadmap projections. |
| State Ownership | Blueprint is a reconstructable presentation; it does not own Business DNA, Decisions, Recommendations, or OS facts. |

### 6.6 Recommendations

| Concern | Navigation contract |
|---|---|
| Purpose | Present explainable, optional next steps after the Business Blueprint. |
| Owner | Core Recommendation Engine and Core experience. |
| Navigation Entry | Business Blueprint, Dashboard reminder, or authorized direct link. |
| Navigation Exit | Plan/access continuation, Product Hub where appropriate, Business Blueprint, Dashboard, defer, or return later. |
| Sidebar Position | Business group, after Business Blueprint; it is not merged into Product Hub navigation. |
| Header Actions | Selected Business, return to Blueprint, locale/direction, and explanation/help. |
| Breadcrumb Rules | `Business / Recommendations`; detail uses `Business / Recommendations / Item`. |
| Quick Actions | Inspect reason, compare alternatives, accept, defer, reject, or continue without selection when allowed. |
| Search Scope | Authorized recommendations for the selected Business; implementation options are secondary result metadata. |
| Command Palette Scope | Open a recommendation or filtered view. Consequential acceptance remains in the owning page flow. |
| Notifications | New or changed recommendations link to the exact item and expose source/freshness without marketing urgency. |
| Deep Linking | Reauthorizes Business context and preserves item identity; unavailable items return to the collection with explanation. |
| Permissions | Business-scoped viewing/disposition; acceptance does not itself grant purchase, configuration, or OS-operation authority. |
| Dependencies | Completed deterministic Decision context, recommendation projection, capability mapping, and optional owner-approved implementation options. |
| State Ownership | Recommendation owner retains identity and disposition; navigation state does not alter Business DNA or Blueprint content. |

### 6.7 Platform Dashboard

| Concern | Navigation contract |
|---|---|
| Purpose | Provide the stable Core home, platform status, and next useful Core action before any OS is required to be operational. |
| Owner | Core Platform. |
| Navigation Entry | Completed Core Workspace Setup, authenticated resume, Core logo, or safe return from another product. |
| Navigation Exit | Business Architect/Blueprint/Recommendations, Product Hub, Core administration, or an authorized OS handoff. |
| Sidebar Position | First primary Core destination. |
| Header Actions | Context switcher, Core search, locale/direction, theme, notifications, and account/profile. |
| Breadcrumb Rules | Dashboard has no redundant breadcrumb; nested Core destinations use stable parent-to-current breadcrumbs. |
| Quick Actions | Resume the highest-priority Core task, open Product Hub, invite/manage access when permitted, or resolve a known blocker. |
| Search Scope | Authorized Core destinations and approved read-only projections; owner and scope remain visible in results. |
| Command Palette Scope | Core navigation and explicitly safe presentation actions; owner mutations remain permissioned within their feature flow. |
| Notifications | Platform and authorized owner-produced items route to their owner destination, not a generic detail owned by Dashboard. |
| Deep Linking | Resolves session, Workspace, Business when applicable, permission, and source state before rendering. |
| Permissions | Dashboard shell requires an authorized Workspace context; each card/action has its own permission and data-minimization rule. |
| Dependencies | Core-ready platform context and independently recoverable owner projections. It does not depend on Commerce readiness. |
| State Ownership | Dashboard owns layout and temporary personalization only; displayed facts remain projections. |

### 6.8 Product Hub

| Concern | Navigation contract |
|---|---|
| Purpose | Explain relevant products/capabilities, compose access and readiness, and route to owner setup or launch. |
| Owner | Core Platform composition and handoff initiation. |
| Navigation Entry | Dashboard, Recommendations continuation, Core sidebar, or an authorized recovery return. |
| Navigation Exit | Core billing/access resolution, owner setup, owner operational launch, Dashboard, or recommendation explanation. |
| Sidebar Position | Primary Core destination after Dashboard and Business group. |
| Header Actions | Active Workspace/Business context, search, locale/direction, notifications, account, and safe Dashboard return. |
| Breadcrumb Rules | `Product Hub`; a product detail uses `Product Hub / Product`. Owner setup starts a new owner trail. |
| Quick Actions | Launch, begin/resume setup, resolve access, compare approved plan options, or retry one failed projection. |
| Search Scope | Products, capabilities, and approved Marketplace/owner projections visible to the current context. |
| Command Palette Scope | Open Product Hub, an eligible product, or a recovery route. Launch/setup commands still pass normal guards and handoff. |
| Notifications | Access, setup, readiness, pause, or recovery items link to Product Hub or the owning OS as appropriate. |
| Deep Linking | Reauthorizes Core context and lifecycle; direct OS links never bypass owner validation. |
| Permissions | Visibility, commercial action, setup initiation, and launch may require different permissions and lifecycle conditions. |
| Dependencies | Business context, capability/recommendation context, product metadata, commercial/access projections, and owner readiness projections. |
| State Ownership | Product Hub owns composition and selected navigation intent; source owners retain catalog, commercial, setup, readiness, and operational facts. |

### 6.9 Commerce

| Concern | Navigation contract |
|---|---|
| Purpose | Support Commerce-owned setup and daily operational work in explicit operational context. |
| Owner | Commerce. |
| Navigation Entry | Product Hub setup/launch handoff, Commerce-owned deep link after validation, or existing Commerce session recovery. |
| Navigation Exit | Another Commerce module, Product Hub safe return, source record, or account/session recovery through Core. |
| Sidebar Position | Commerce-owned operational navigation; never inserted into the Core sidebar. |
| Header Actions | Operational context, Commerce search when implemented, locale/direction, theme, notifications, account, and safe product return. |
| Breadcrumb Rules | `Module / Collection / Record / Subview` as applicable. Setup uses progress, and POS may use task context instead of breadcrumbs. |
| Quick Actions | Owner-permitted Commerce actions relevant to the current module and scope. |
| Search Scope | Commerce-owned operational records and actions for the active authorized scope. Core search does not inspect Commerce internals. |
| Command Palette Scope | Commerce navigation and explicitly approved owner actions; current placeholder search is not evidence of a complete palette. |
| Notifications | Commerce domain notifications preserve source, operational scope, urgency, and a route back to the owning record. |
| Deep Linking | Commerce re-resolves actor, Workspace, Business Unit/Branch where applicable, permission, resource, and readiness. |
| Permissions | Commerce permission plus applicable Workspace, Business Unit, Branch, resource, and lifecycle scope. Core authentication is necessary but not sufficient. |
| Dependencies | Accepted Core handoff/context and Commerce-owned setup/readiness/operational state. |
| State Ownership | Commerce owns setup and operational facts; Core context is referenced, not recreated or written as fallback. |

### 6.10 Future Operating Systems

| Concern | Navigation contract |
|---|---|
| Purpose | Provide an independently usable owner-specific setup and operational experience once separately approved. |
| Owner | The selected Operating System. |
| Navigation Entry | Product Hub or an owner-valid reauthorized deep link. |
| Navigation Exit | Owner modules, Product Hub safe return, or Core identity/session recovery. |
| Sidebar Position | An OS-owned sidebar derived from its approved modules, configuration, and permissions. |
| Header Actions | Explicit owner/product identity, material organization context, search, locale/direction, notifications, account, and safe return. |
| Breadcrumb Rules | Owner-defined hierarchy following the shared grammar; no breadcrumb may imply Core ownership of OS facts. |
| Quick Actions | Only owner-approved actions for the current product and scope. |
| Search Scope | The OS's own data plus authorized external projections through governed boundaries. |
| Command Palette Scope | The OS's own destinations and approved actions; no cross-OS commands by default. |
| Notifications | Owner-produced notifications route to owner screens; shared delivery infrastructure does not acquire domain ownership. |
| Deep Linking | Requires identity, context, permission, product lifecycle, and resource reauthorization. |
| Permissions | Owner-specific permission and resource scope in addition to Core identity and applicable platform access. |
| Dependencies | Approved product scope, independent route tree, owner lifecycle, Core context handoff, and shared presentation foundations. |
| State Ownership | Each OS owns its operational state; shared components and Core projections remain non-owning. |

## 7. Complete Navigation Tree

Labels below describe the target information architecture. `Current` and `Planned` refer to the
verified snapshot in the Screen Map, not implementation approval.

```text
NexoraXS
├── Landing [Current]
│   ├── Features [Current section]
│   ├── Products [Current section]
│   ├── Pricing [Current section]
│   ├── FAQ [Current section]
│   ├── Register [Current Core route; Landing entry needs reconciliation]
│   └── Login [Current Core route]
├── Authentication — Core [Current]
│   ├── Login
│   ├── Register
│   ├── Verify Email
│   ├── Forgot Password
│   └── Reset Password
├── Core Onboarding
│   ├── Create Workspace [Current; needs reconciliation]
│   ├── Business identity placement [Unresolved]
│   ├── Business Architect [Planned]
│   │   ├── Introduction
│   │   ├── Guided Interview
│   │   ├── Supporting Information
│   │   ├── Review
│   │   └── Analysis
│   ├── Business Blueprint [Planned]
│   ├── Recommendations [Planned]
│   ├── Plan Selection or Continue with available access [Needs reconciliation]
│   └── Core Workspace Setup [Planned]
├── Platform — Core
│   ├── Dashboard [Current; guard needs reconciliation]
│   ├── Business [Planned navigation group]
│   │   ├── Resume Business Architect
│   │   ├── Business Blueprint
│   │   └── Recommendations
│   ├── Product Hub [Current]
│   ├── Team & Access [Current; incomplete]
│   ├── Billing & Subscriptions [Current; incomplete]
│   ├── Integrations [Current; incomplete]
│   ├── Notifications [Current dropdown; full route planned]
│   ├── Audit Logs [Planned]
│   ├── Settings [Current; incomplete]
│   └── Profile [Current menu; full route planned]
├── Commerce — Commerce owner
│   ├── Setup [Current; needs reconciliation]
│   ├── Dashboard [Current]
│   ├── POS [Current]
│   ├── Products [Current]
│   ├── Inventory [Current]
│   │   ├── Stock Movements [Planned]
│   │   └── Transfers [Current]
│   ├── Customers [Current]
│   ├── Orders [Current]
│   ├── Invoices [Current]
│   ├── Returns [Incomplete]
│   ├── Reports [Current; needs reconciliation]
│   └── Settings [Current]
└── Future Operating Systems [No routes approved here]
    ├── Owner-specific Setup
    ├── Owner-specific Dashboard
    ├── Owner-specific Modules
    ├── Owner-specific Reports
    └── Owner-specific Settings
```

### 7.1 Primary sidebar order

The target Core primary order is:

1. Dashboard;
2. Business group, when its destinations exist and are authorized;
3. Product Hub;
4. Team & Access;
5. Billing & Subscriptions;
6. Integrations;
7. Settings; and
8. Audit Logs when the approved surface exists.

Notifications and Profile remain header/account destinations unless their full pages are being
visited. The current Core sidebar starts with Product Hub and omits Dashboard and Business; that is
verified implementation reality, not the target order.

The target Commerce primary order is:

1. Dashboard;
2. POS;
3. Products;
4. Inventory;
5. Customers;
6. Orders;
7. Invoices;
8. Returns when a complete surface is approved;
9. Reports; and
10. Settings.

Stock Movements and Transfers are secondary Inventory navigation. Setup is a conditional owner
entry, not a permanent daily module. The current Commerce sidebar is close to this structure but
does not expose Returns or Inventory child navigation directly.

## 8. Global Navigation Model

### 8.1 Primary Navigation

Primary navigation contains the stable destinations of the current owner application. Core and
Commerce have separate primary navigation. Availability is derived from approved product/module
state and permissions; hidden or disabled treatment must not disclose protected information.

### 8.2 Secondary Navigation

Secondary navigation organizes related destinations inside one primary area, such as Inventory
Movements/Transfers, Business Blueprint/Recommendations, or Settings sections. Use tabs, a local
subnavigation, or an in-page section index according to task depth; do not add every secondary
destination to the global sidebar.

### 8.3 Context Navigation

Context navigation changes the authorized Workspace, selected Business, Business Unit, or Branch
that materially scopes the current task. It is separate from destination navigation. Before a
switch, the UI resolves unsaved work, explains the effect, and reauthorizes the destination.

### 8.4 Workspace Navigation

Workspace navigation belongs to Core. The Workspace selector exposes only authorized Workspaces
and returns the user to the same destination when it remains valid. When it does not, Core selects
the nearest safe destination and explains why.

### 8.5 Product Navigation

Product navigation identifies the current product and its owner. Product Hub launches or routes
to an OS; the OS then owns setup and operational navigation. An OS logo/product switcher may return
to Product Hub but must not place Core governance or another OS's operational modules in its menu.

### 8.6 Cross-App Navigation

Cross-app navigation preserves intent and safe return while the destination re-resolves identity,
context, permission, and lifecycle. The current frontend compatibility handoff remains evidence of
the established boundary, not a production contract. No deep link or UI state is permanent
authorization.

### 8.7 Safe Return Navigation

Every cross-product destination provides a safe return to the source context or a stable owner
home. The minimum rules are:

- failed Core-to-Commerce setup/launch returns to Product Hub with an explanation;
- failed Commerce reauthorization returns to Product Hub or Core identity recovery, not a blank page;
- leaving Business Architect preserves work or asks explicitly before discard;
- an inaccessible detail returns to its authorized collection or owner home;
- a removed/stale notification returns to the closest valid owner destination; and
- browser Back never silently changes canonical context or bypasses a guard.

## 9. Sidebar Rules

1. A sidebar represents exactly one owner application.
2. Product identity and active material context appear before destinations.
3. Destinations are stable, task-oriented, localized, and permission-aware.
4. Group labels are used only when they improve scanning; one-item groups are avoided.
5. The active destination is conveyed semantically and not by color alone.
6. Collapsed or compact navigation retains accessible names and current-location meaning.
7. Mobile navigation is a focus-managed drawer with a stable close/return path.
8. Context switching is not disguised as a navigation link.
9. Badges communicate defined owner state; they are not decorative counters.
10. App-local shell similarity does not justify merging Core and Commerce shell ownership.

## 10. Header Rules

The header contains product identity, material context, global search/command entry where
supported, locale/direction, theme, notifications, and account/profile. Page-specific primary
actions belong in the page header, not the global header. The header must:

- remain stable within one application;
- identify cross-product transitions before navigation;
- avoid hiding material scope on compact layouts;
- preserve keyboard order and focus visibility;
- separate notification, locale, theme, and account controls; and
- avoid using a context label as proof that the actor is authorized for that context.

## 11. Breadcrumb Rules

- Breadcrumbs describe location inside the current owner, not lifecycle or authorization.
- Dashboard and focused authentication/onboarding stages do not need redundant breadcrumbs.
- Collection/detail flows use stable owner nouns: `Orders / Order`, `Customers / Customer`, and so on.
- Cross-app navigation starts a new breadcrumb trail; it does not create a false Core-to-OS parent hierarchy.
- Display names use content-aware direction behavior; identifiers remain readable in mixed script.
- Breadcrumb items are links only when the destination is both meaningful and authorized.
- Truncation preserves the current page and nearest parent; it never removes the only owner/context cue.

## 12. Search Rules

1. Search declares its scope before or with results.
2. Core coordinates authorized platform search and approved read-only projections without reading
   OS internal storage or acquiring source ownership.
3. Commerce search is Commerce-owned and limited to authorized operational scope.
4. Search results show owner, relevant context, type, and freshness when these affect meaning.
5. No-result, filtered-empty, unavailable, partial, stale, and error states are distinct.
6. Recent searches or suggestions appear only when their privacy and context scope are safe.
7. Search does not reveal inaccessible result counts, names, or snippets.
8. Selecting a result reauthorizes the destination and preserves the query on recoverable failure.

Current evidence: Core `ShellSearch` searches configured Core navigation destinations. Commerce
currently renders a search placeholder rather than a verified operational search. Neither is
evidence of repository-wide search.

## 13. Command Palette Rules

The command palette is a keyboard-accessible complement to navigation, not an authorization
bypass. Its first safe scope is destination search and read-only view opening. Any action command
requires an approved owner interaction, visible scope/consequence, normal permission checks,
confirmation where proportionate, and outcome feedback.

The palette must:

- group commands by owner and type;
- show the active context and disable or omit invalid-context commands safely;
- support keyboard navigation, Escape, focus restoration, and screen-reader status;
- localize labels, keywords, and direction;
- never run a consequential action merely because a result is selected; and
- degrade to ordinary navigation without blocking the product.

## 14. Quick Actions

Quick actions expose the smallest high-value action for the current page and owner. They must be
permission-aware, context-specific, and no more powerful than the full workflow they enter. A
quick action may open a create, resume, review, setup, or recovery flow; it does not skip required
review, confirmation, handoff, or owner validation.

## 15. Recent Items, Favorites, and Pinned Views

### 15.1 Recent Items

Recent items are a convenience projection of destinations the actor recently opened. They:

- are filtered again by current authorization and context;
- show owner and scope when ambiguous;
- remove or neutralize stale/inaccessible entries without exposing protected detail; and
- never become history, Audit evidence, or canonical workflow state.

### 15.2 Favorites

Favorites are user-selected shortcuts to authorized destinations or saved view definitions. A
favorite stores navigation intent, not a copy of owner data. Opening it re-resolves access and
context. Cross-OS favorites remain visibly owner-qualified.

### 15.3 Pinned Views

Pinned views are ordered presentation shortcuts within the appropriate owner shell. A pin cannot
force a hidden module into navigation, grant permission, freeze a query result, or change the
source record. Exact preference scope and durability remain unresolved until approved.

## 16. Notifications and Deep Links

Notifications identify their source owner, relevant scope, time, severity, and available action.
Their links open the owner destination after reauthorization. A notification delivery surface does
not acquire ownership of the domain fact that caused it.

Deep links follow this resolution order where applicable:

1. identity/session;
2. Workspace membership;
3. selected Business access;
4. product/lifecycle access;
5. Business Unit, Branch, and resource scope;
6. owner permission and resource existence; and
7. locale/direction and safe return.

A failed step produces an explainable owner-safe recovery destination.

## 17. Open Questions

1. **Business identity placement:** The route or bounded step for selecting/creating the canonical
   Business before Business Architect remains unresolved.
2. **Plan/access navigation state:** The approved owner projection that chooses plan selection
   versus available-access continuation remains unresolved.
3. **Returns navigation:** The first complete Returns experience has not decided between separate
   list/detail routes and an Order-centered history model.
4. **Preference scope:** The durability and scope of recent items, favorites, pinned views, sidebar
   collapse, and saved navigation preferences are not approved.
5. **Command actions:** The first command palette may safely remain navigation-only; the set of
   owner actions eligible for later command execution requires feature-specific approval.
6. **Blueprint portability:** Export, share, history, and print navigation remain outside the first
   confirmed Blueprint slice until their product and privacy rules are decided.

## 18. Verified Against

This document was verified against:

- `docs/00-governance/PRODUCT-DECISIONS.md`, the canonical glossary, and Accepted ADRs including
  ADR-002, ADR-016, ADR-018 through ADR-020, ADR-024, ADR-025, ADR-037, and ADR-040;
- `docs/01-genesis/01-VISION.md`, `10-NEXORAXS-ONTOLOGY.md`,
  `11-CUSTOMER-JOURNEY.md`, `12-WORKSPACE-LIFECYCLE.md`, and `13-PRODUCT-HUB.md`;
- `docs/02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md`, `03-DOMAIN-MODEL.md`,
  `04-DATA-OWNERSHIP.md`, and `05-PERMISSION-MODEL.md`;
- the canonical documents under `docs/03-ui-ux/`;
- `docs/10-design-intelligence/01-DESIGN-PHILOSOPHY.md`, `02-DESIGN-DNA.md`,
  `05-DESIGN-PATTERNS.md`, and `06-COMPONENT-GOVERNANCE.md`;
- `docs/11-execution/05-FRONTEND-FIRST-POLICY.md`, `09-DOCUMENTATION-POLICY.md`, and
  `11-DESIGN-MEMORY.md`;
- relevant evidence in `docs/90-architecture-audit/`;
- all current routes under `apps/core-platform/app/` and `apps/commerce/app/`;
- Landing entry and section navigation under `apps/landing/src/`;
- current Core and Commerce shell, context, search, notification, locale, theme, and account
  components; and
- current shared presentation primitives and theme sources under `packages/ui/`.

## 19. Cross References

- [Product Experience index](./README.md)
- [Platform Experience](./01-PLATFORM-EXPERIENCE.md)
- [Screen Map](./02-SCREEN-MAP.md)
- [Frontend Experience Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md)
- [Design System](../04-design-system/README.md)
- [Design Patterns](../10-design-intelligence/05-DESIGN-PATTERNS.md)
- [Interaction Patterns](../04-design-system/05-INTERACTION-PATTERNS.md)
- [Core Navigation Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md#8-navigation-architecture)
- [Context-preserving navigation ADR](../00-governance/ADR/ADR-037-context-preserving-navigation.md)
