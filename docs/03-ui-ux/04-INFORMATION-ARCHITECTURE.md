# NexoraXS Information Architecture

| Field | Value |
|---|---|
| Version | 1.1 reconciliation candidate |
| Status | Reconciled canonical navigation authority candidate — routes deferred |
| Owner | Product Experience; Core Platform and each Operating System retain destination ownership |
| Controlling architecture | Core Platform Architecture v1.1 Freeze |

## 1. Purpose

This document defines the semantic information architecture and navigation responsibilities for the
approved Core Platform v1.1 customer experience. It defines where users understand context, find
destinations, switch authorized scope, hand off to an Operating System, and return safely.

It does not define route URLs, framework layouts, menus, API navigation contracts, permission
catalogs, or implementation. Existing routes are current evidence in the
[Screen Map](./02-SCREEN-MAP.md), not target authority.

## 2. Authority

This information architecture consumes:

- [Core Platform Architecture v1.1](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md),
  especially sections **4.4**, **4.5**, **5.1–5.10**, **6**, and **11**;
- Accepted [ADR-034](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md),
  [ADR-037](../00-governance/ADR/ADR-037-context-preserving-navigation.md), and ADR-015/016/042/043;
- the [Foundation Journey Successor Addendum](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md);
- [Platform Experience](./01-PLATFORM-EXPERIENCE.md); and
- the [Canonical Glossary](../00-governance/glossary/GLOSSARY.md).

## 3. Scope and Non-Scope

### In scope

- public, authentication, Core, Product Hub, and Operating System navigation zones;
- Workspace, Business, Business Unit, Branch, and OS context visibility where applicable;
- Discovery, candidate reflection, publication, Guided Activation, Blueprint, Insight,
  Recommendation, Product Hub, and OS handoff placement;
- safe return, deep-link, unavailable, unauthorized, and interrupted navigation obligations; and
- search, command, notification, recent-item, favorite, and pinned-view authority boundaries.

### Out of scope

- exact paths, domains, subdomains, query parameters, redirect algorithms, route guards, or shells;
- exact role/permission catalog;
- persistence of navigation history, context, locale, favorites, or resume tokens;
- Operating System internal navigation; and
- screens, components, wireframes, or code.

## 4. Semantic Architecture

```text
Public Experience
├── Product information
├── Business Discovery entry
├── Candidate reflection and Value Preview
├── Register
└── Login

Authentication Boundary
├── Identity establishment or recovery
├── Workspace resolution or creation
├── Business resolution or creation
└── Authenticated candidate conversion/review

Core Platform
├── Platform Dashboard
├── Business
│   ├── Business Architect
│   ├── Guided Activation
│   ├── Business Blueprint
│   ├── Business Insights presentation
│   └── Optional Recommendations
├── Product Hub
├── Workspace administration
├── Membership and access administration
├── Billing and subscription presentation
├── Notifications and Audit participation
├── Integrations
├── Settings
└── Profile

Operating System
├── OS-Specific Setup
├── Operating System Ready destination
├── Operational navigation
└── Safe return to Core / Product Hub
```

The tree describes semantic placement. It does not require each node to be a separate page or route.

## 5. Context Model

### 5.1 Public context

Public context may contain locale, direction, non-sensitive Discovery continuity, and temporary
candidate presentation. It contains no anonymous Workspace, Business, membership, entitlement,
subscription, or OS authority.

### 5.2 Authenticated Workspace context

Workspace is the customer and tenant boundary. Core resolves an authorized Workspace after
authentication. The interface must identify when no Workspace, one Workspace, or multiple
authorized Workspaces are available without exposing inaccessible Workspaces.

### 5.3 Authenticated Business context

Business owns Business DNA. Business-scoped Guided Activation, Blueprint, Insights, and
Recommendations must identify the selected Business and preserve authorization on direct entry,
switch, resume, and return.

Workspace and Business are never synonyms. Business Unit, Department, and Branch appear only when
the current Core or Operating System destination requires those scopes.

### 5.4 Operating System context

An Operating System receives visible context through an approved handoff and reauthorizes it. OS
context may include Business, Business Unit, Department, Branch, actor, and resource scope as
applicable. Client navigation context is not proof of access.

## 6. Major Navigation Areas

### 6.1 Public experience

| Concern | Authority rule |
|---|---|
| Purpose | Explain NexoraXS and let a visitor obtain value, authenticate, or leave |
| Primary entry | Business Discovery as the primary value action |
| Alternate entries | Register and Login remain visible and valid |
| Exit | Candidate reflection/Value Preview, authentication, or external departure |
| Header | Product-level navigation, locale/direction access, Discovery, Register, Login |
| Search | Public approved content only; no protected records |
| Deep linking | May enter an approved public destination; must not create protected authority |
| Owner | Landing owns public presentation; Core owns Discovery and identity boundaries |

### 6.2 Business Discovery and Value Preview

| Concern | Authority rule |
|---|---|
| Purpose | Acquire relevant knowledge and present temporary useful understanding |
| Entry | Public value action or another approved acquisition method |
| Exit | Continue acquisition, reflect/correct, register/login, or leave |
| Navigation mode | Focused and resumable where authorized; not assumed to be one wizard or conversation |
| Context | Temporary candidate context only; no Workspace or Business authority |
| Search/commands | No global protected search or consequential command |
| Owner | Core Business Discovery and candidate-understanding boundary |

### 6.3 Authentication and ownership resolution

| Concern | Authority rule |
|---|---|
| Purpose | Establish identity and resolve authorized Workspace/Business context |
| Entry | Public Discovery continuation, Register, Login, invitation, recovery, or expired session |
| Exit | Authenticated candidate review, an authorized Core destination, or safe recovery |
| Context | Identity, Workspace, Business, membership, and permission projections remain distinct |
| Safe return | Public entry or a non-sensitive recovery destination |
| Owner | Core identity, membership, Workspace, and Business boundaries |

### 6.4 Authenticated candidate review and publication

| Concern | Authority rule |
|---|---|
| Purpose | Review/correct candidate knowledge and explicitly approve first Business DNA publication |
| Entry | Converted public candidate or direct-registration authenticated acquisition |
| Exit | Correction, more acquisition, pause, publication confirmation, or safe Core return |
| Context | Selected authorized Workspace and Business are always visible |
| Primary action | Explicitly approve first Business DNA publication; generic Continue is prohibited |
| Owner | Core candidate conversion, Business Architect, and Business DNA publication boundaries |

### 6.5 Business Architect

| Concern | Authority rule |
|---|---|
| Purpose | Conduct or resume the governed authenticated selected-Business pipeline, including candidate review and publication controls |
| Entry | Direct-registration authenticated candidate work, converted public candidate, safe Session resume, or Business-context navigation |
| Exit | Pause, correction/review, explicit publication, or safe Core return |
| Navigation mode | Focused where material work is active; inherited Session conditions remain owner-reported |
| Context | Selected Business and relevant session status |
| Owner | Core Business Architect; distinct from public Discovery and Guided Activation presentation |

### 6.6 Guided Activation

| Concern | Authority rule |
|---|---|
| Purpose | Continue the Business Architect pipeline adaptively after first Business DNA publication |
| Entry | Successful publication or owner-supported post-publication resume |
| Exit | Pause, governed correction/revision, Blueprint, Platform Dashboard, or other authorized Core destination |
| Boundary | Begins only after publication and remains distinct from OS-Specific Setup, Product Hub, and OS onboarding |
| Owner | Core Business Architect pipeline; source owners retain canonical outputs |

### 6.7 Business Blueprint

| Concern | Authority rule |
|---|---|
| Purpose | Present governed Business understanding from Business DNA and owner outputs |
| Entry | Authenticated Business context after applicable owner outputs exist |
| Exit | Guided correction, Product Hub, optional Recommendation, Platform Dashboard, or safe return |
| Navigation placement | Business-scoped Core destination |
| Search | May expose authorized projection sections, never private source data beyond permission |
| Owner | Core presentation; source owners retain canonical facts |

### 6.8 Business Insights presentation

| Concern | Authority rule |
|---|---|
| Purpose | Present conceptual Insight responsibility contained in a Business Brain Decision |
| Entry | Blueprint, Dashboard, or an authorized Business context when owner output exists |
| Exit | Supporting evidence/lineage presentation, Blueprint, optional Recommendation, or safe return |
| Boundary | No independent Insight write model, service, or owner is implied |
| Owner | Business Brain Decision boundary; Core presentation composes read-only output |

### 6.9 Optional Recommendations

| Concern | Authority rule |
|---|---|
| Purpose | Present optional capability-first advice and explain its basis |
| Entry | Blueprint, Product Hub, Dashboard, or another authorized owner projection |
| Exit | Defer/decline/revisit where approved, Product Hub, Blueprint, or an owner-approved option |
| Boundary | Exact review/disposition lifecycle is deferred; Product Hub does not own Recommendations |
| Owner | Recommendation Engine and approved presentation boundary |

### 6.10 Platform Dashboard

| Concern | Authority rule |
|---|---|
| Purpose | Provide a Core entry point independent of Operating System readiness |
| Entry | Authorized returning context, Guided Activation pause/completion, or safe return |
| Exit | Business, Blueprint, Product Hub, administration, or OS handoff |
| Content | Owner projections with visible partial/unavailable state; no duplicated source truth |
| Owner | Core composition |

### 6.11 Product Hub

| Concern | Authority rule |
|---|---|
| Purpose | Discover products, compose lifecycle/access projections, and route to owner destinations |
| Entry | Dashboard, Blueprint, optional Recommendation, or authorized direct navigation |
| Exit | OS-Specific Setup, OS launch, billing/access destination, Recommendation, or safe Core return |
| Boundary | Does not own subscription source records, Recommendations, Business DNA, OS setup, or operations |
| Owner | Core Product Hub composition |

### 6.12 Operating Systems

| Concern | Authority rule |
|---|---|
| Purpose | Perform OS-owned setup and daily operation |
| Entry | Reauthorized Product Hub handoff or authorized OS direct entry |
| Exit | OS-owned destination or safe return to Product Hub/Core |
| Navigation | Independent OS navigation, settings, reports, workflows, and operational context |
| Boundary | Core does not embed or own OS-specific setup/operations |
| Owner | The applicable Operating System |

### 6.13 Cross-Area Navigation Contract

Exact UI placement remains design work. The table records required semantic behavior for every
major area without selecting a route or component.

| Area | Sidebar / header / breadcrumb | Quick actions | Search / command scope | Notifications / deep links | Permissions / dependencies / state ownership |
|---|---|---|---|---|---|
| Public Entry | No protected sidebar; public header; public-location breadcrumb only if useful | Discovery, Register, Login, locale | Public approved content; no protected commands | Public links reveal no tenant data | Public; Landing presentation with Core-owned destination entries |
| Discovery/Preview | Focused navigation; temporary status and safe exit remain visible | Continue/change method, correct, authenticate, discard | Candidate-local navigation only; no consequential command | Continuity link only if future policy authorizes it | Core Discovery/candidate boundary; retention/privacy dependencies |
| Authentication | Focused identity header; safe public return | Register/Login/recover/verify as applicable | No protected global search/commands | Identity links expire/fail safely | Core identity; auth is not authorization |
| Workspace resolution | Core context header; no Business breadcrumb until resolved | Select/create where authorized, safe return | Authorized Workspace results only | Deep links reauthorize membership | Core Workspace/membership owner projections |
| Business resolution | Workspace then Business context; hierarchy is explicit | Select/create where authorized | Authorized Business results only | Deep links reauthorize Business access | Core Organization Registry; legacy BusinessUnit mapping is not authority |
| Business Architect | Focused selected-Business context; normal Core entry may show resume | Continue approved method, review, correct, pause, explicit publication when valid | Pipeline-local discovery/review only | Resume uses owner Session evidence | Core Business Architect/Business DNA; inherited Session lifecycle |
| Guided Activation | Business context and post-publication status; safe Core exit | Continue, correct through owner flow, pause, view Blueprint | Business-context only | Resume only from owner evidence | Core pipeline after published DNA; no OS setup state |
| Business Blueprint | Business-scoped Core navigation; projection/source context in header/breadcrumb | Navigate sections, owner correction path, Product Hub, optional Recommendation | Authorized projection sections only | Deep links reauthorize Business and projection | Core non-writing projection; Business DNA/owner outputs remain sources |
| Insights/Recommendations | Business context and source owner visible | Explain, compare, defer/decline/retain tools where policy permits | Authorized evidence/lineage only; no auto-action command | Deep links reauthorize sensitive evidence | Business Brain Decision/Recommendation owners; exact lifecycle deferred |
| Platform Dashboard | Core sidebar/header with Workspace and applicable Business context | Owner-valid next actions | Coordinated authorized Core search/commands only | Notification links resolve safe context | Core composition; independent of OS readiness |
| Product Hub | Core sidebar/header; lifecycle source and OS handoff visible | Learn, commercial owner action, OS setup handoff, launch, recover | Product/owner projections only | Handoff/deep links reauthorize at destination | Core composition; product/commercial/OS owners retain state |
| Operating System | OS-owned sidebar/header/breadcrumb; safe Core/Product Hub return | OS-owned actions only | OS-authorized operational scope | OS links reauthorize and preserve safe return | Applicable OS owns setup/readiness/operations; Core context is input only |

## 7. Navigation Types

### 7.1 Primary navigation

Primary navigation exposes stable destinations for the current owner and context. It must not expose
inaccessible records, imply subscription equals operational access, or make incomplete Guided
Activation block unrelated safe Core use unless an approved policy requires it.

### 7.2 Context navigation

Workspace, Business, Business Unit, Branch, and OS context controls:

- display the current context explicitly;
- list only authorized options;
- reauthorize every switch;
- identify destructive or unsaved-work consequences;
- provide missing/stale/unavailable recovery; and
- never use a client-provided identifier as proof of access.

### 7.3 Product navigation

Product Hub owns product discovery and handoff navigation. Operating Systems own their internal
navigation. Cross-app movement preserves visible context, correlation, safe return, and destination
authorization.

### 7.4 Focused task navigation

Discovery, candidate review, explicit publication, and material Guided Activation work may use a
focused presentation. It must preserve locale, accessibility, interruption/recovery, context
identity, and an honest safe exit. Focused navigation does not redefine the domain lifecycle.

### 7.5 Safe return navigation

Every cross-context or cross-app journey defines a destination that remains useful when the intended
destination is unavailable, unauthorized, expired, partially failed, or not ready. Product Hub and
Platform Dashboard are common Core return destinations, subject to authorization.

## 8. Header, Sidebar, and Breadcrumb Rules

### Header

The header may expose current scope, locale/direction, notifications, profile, search, and safe
cross-app return. It does not become the owner of those facts.

### Sidebar

The sidebar reflects the current application owner and permitted destinations. Core and an
Operating System do not merge operational navigation. Business-scoped Blueprint, Insights, and
Recommendations remain visibly separate from Product Hub and OS operations.

### Breadcrumbs

Breadcrumbs show the semantic owner and relevant authorized context. They do not reveal inaccessible
ancestor names or fabricate a canonical hierarchy from current route nesting.

## 9. Search, Command, Recent, Favorite, and Pinned Rules

- Search coordinates owner-provided authorized results and identifies result owner/context.
- Commands route to owner-authorized operations and never bypass review or final validation.
- Recent items, favorites, and pinned views are navigation aids, not canonical ownership or access.
- Stale or revoked entries fail safely without confirming inaccessible record existence.
- Discovery candidates and sensitive evidence are excluded unless an approved policy explicitly
  permits them.
- Exact search/command catalogs and persistence remain deferred.

## 10. Notifications and Deep Links

Notifications identify source owner, context, consequence, and safe destination. A deep link is an
authorization input only. The destination resolves current context and may show unauthorized,
expired, superseded, incomplete, or safe-return behavior without leaking sensitive data.

Exact URLs, link-token mechanisms, environment topology, and destination rules remain deferred
under Core D-30 and applicable security decisions.

## 11. Accessibility, Localization, and Responsive Rules

- Navigation order is logical in LTR and RTL and does not rely on visual position alone.
- Current location, context, expanded state, and destination name are programmatically available.
- Keyboard, focus, screen-reader, zoom/reflow, reduced-motion, and touch operation remain equivalent.
- Labels and recovery messages are available in English and Arabic; future locales do not require a
  new navigation architecture.
- Mobile adaptation preserves owner, context, primary action, safe return, and permission meaning.

## 12. Current Implementation Evidence

The current repository uses separate Landing, Core, and Commerce applications and implements
concrete routes recorded in the Screen Map. Those routes are compatibility evidence. They do not
approve target URLs or change this semantic architecture.

## 13. Deferred Decisions

The following remain outside this authority:

- exact route and URL strategy, base paths, deep-link syntax, and handoff transport;
- concrete shell composition and responsive breakpoint behavior;
- exact search, command, recent, favorite, pin, and notification catalogs;
- exact role and permission catalog;
- exact resume and session mechanisms; and
- feature-specific screen grouping and route migration.

## 14. Cross References

- [Platform Experience](./01-PLATFORM-EXPERIENCE.md)
- [Screen Map](./02-SCREEN-MAP.md)
- [User Journeys](./05-USER-JOURNEYS.md)
- [User Flows](./06-USER-FLOWS.md)
- [Presentation State Authority](./07-STATE-MACHINES.md)
- [Design System](../04-design-system/README.md)
