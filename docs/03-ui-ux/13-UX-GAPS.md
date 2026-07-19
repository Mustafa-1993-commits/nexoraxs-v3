# Frontend UX Gaps

- **Status:** Current-to-target gap register
- **Snapshot date:** 2026-07-19
- **Owner:** Product Experience with the applicable frontend owner
- **Scope:** Landing, Core Platform, and Commerce frontend experience

## 1. Purpose

This register consolidates user-visible gaps verified through the current route inventory and the
canonical product-experience documents. “Recommended Solution” describes a frontend UX outcome for
future specification; it does not authorize code, define a backend contract, or change domain
ownership.

## 2. Priority and Complexity

| Value | Meaning |
|---|---|
| P0 | Blocks the canonical new-user/Core-entry journey or a launch-wide requirement |
| P1 | Blocks a coherent MVP workflow or safe frequent use |
| P2 | Important completeness, administration, or recovery work |
| P3 | Later enhancement after the primary journeys are coherent |
| XS/S/M/L/XL | Relative frontend analysis/design/implementation/test size; not a delivery estimate |

## 3. Gap Register

| Feature | Current State | Impact | Priority | Recommended Solution | Estimated Complexity |
|---|---|---|---|---|---|
| UXG-001 — Canonical onboarding sequence | Current `/onboarding` is Workspace → Operating System → Plan. Business Architect, Blueprint, and Recommendations are absent. | Product choice precedes business analysis and the confirmed customer journey cannot be completed. | P0 | Reconcile the frontend sequence to Workspace → Business Architect → Review → Analysis → Blueprint → Recommendations → access/Plan → Core setup → Dashboard. | XL |
| UXG-002 — Landing registration entry | Landing primary actions currently target Core Login rather than the canonical Register entry. | New users begin on a returning-user screen and the acquisition journey is ambiguous. | P0 | Align primary new-user CTA with Register while retaining a distinct Login action. | S |
| UXG-003 — Business Architect Introduction | No route or component exists. | Users have no explanation of purpose, data use, expected effort, output, or resume behavior. | P0 | Add the documented Core-owned introduction as the first stage after Workspace creation. | M |
| UXG-004 — Guided Business Interview | No route, components, or fixture seam exists. | Business DNA inputs cannot be collected and the central onboarding experience is absent. | P0 | Specify and build a guided/conversational prompt flow with accessible draft, pause, clarification, and progress behavior using replaceable governed fixtures. | XL |
| UXG-005 — Interview supporting information | No approved UX surface exists. | Users cannot add or inspect permitted context supporting an answer. | P1 | Add a bounded supporting-information experience only for approved types; keep storage/upload policy outside this UX task until governed. | L |
| UXG-006 — Interview Review | No review route exists. | Users cannot correct answers, inferences, assumptions, conflicts, or gaps before analysis. | P0 | Add a sectioned review with provenance and exact return-to-prompt paths. | L |
| UXG-007 — Exact interview resume | Core onboarding step is component-local; no Business Architect session exists. | Refresh/interruption can lose progress or restart users at an unsafe/generic stage. | P0 | Add a replaceable frontend draft/checkpoint seam and exact safe resume presentation, independent of OS completion. | L |
| UXG-008 — Deterministic Business Analysis | No route, deterministic fixture, progress, blocked, or retry state exists. | Business Blueprint cannot be produced through the required deterministic Business Brain order. | P0 | Add a versioned deterministic frontend scenario seam and truthful progress/recovery screen; do not use ungoverned AI-only output. | XL |
| UXG-009 — Business Blueprint | No screen exists. | The main onboarding result is absent. | P0 | Add a read-only Core presentation composed from Business DNA, summary, needs, challenges, opportunities, readiness, capabilities, and implementation roadmap. | XL |
| UXG-010 — Recommendations | No screen or explainable recommendation fixture exists. Product Hub cards are not Recommendations. | Product/capability next steps cannot be explained after the Blueprint. | P0 | Add a separate optional, explainable Recommendation list/detail and defer/continue behavior downstream of Blueprint. | XL |
| UXG-011 — Core Workspace Setup | No distinct post-access Core setup stage exists; settings are split between onboarding and Dashboard Settings. | The journey cannot establish required Core preferences before Dashboard without conflating OS setup. | P0 | Define the minimal Core-owned setup page, with optional/required distinctions and no Commerce configuration. | L |
| UXG-012 — Platform entry before Commerce | `apps/core-platform/app/dashboard/layout.tsx` requires Commerce in `completedOS` and redirects otherwise. | Core value is delayed until an OS completion compatibility flag exists, contrary to the confirmed Platform-first decision. | P0 | Reconcile the presentation gate so authorized users can enter Platform Dashboard before Commerce readiness. | M |
| UXG-013 — Post-login destination resolution | Login sends completed mock users directly to `/dashboard/apps`; otherwise `/onboarding`. | Returning users cannot resume exact Core/Business stages or enter the normal Platform Dashboard. | P0 | Add safe resume/destination resolution using separate Core, Business Architect, and OS readiness presentation inputs. | L |
| UXG-014 — Canonical Business context entry | Current frontend exposes legacy `BusinessUnit` data under a user-facing Business label; no canonical Business create/select screen was verified. | Business Architect cannot safely bind to its required Business owner without repeating the legacy mapping as architecture. | P0 | Obtain the approved Core Business entry/selection product decision and then specify its frontend slice. | L; blocked by decision |
| UXG-015 — Multi-Workspace selector completeness | Core shell switcher shows current context but not a complete multiple-Workspace selection experience. | Returning multi-Workspace users lack a clear authorized context switch/recovery path. | P1 | Complete one/many/none/stale/unauthorized Workspace selector states through Core projections. | M |
| UXG-016 — Route-level role and permission behavior | Protected layouts validate mock session/context, but most routes/actions have no role-specific guard. Team roles are hard-coded. | UI can present controls that users may not be allowed to use and cannot explain read-only/unauthorized outcomes. | P0 | After the permission catalog is approved, map every route and consequential action to view/manage/unauthorized presentation states. | XL; blocked by decision |
| UXG-017 — Team and Membership UX | Team list, invitation modal, and permission matrix are mock/local and lack complete empty, failure, pending, and canonical-role behavior. | Workspace administration outcomes are unreliable and potentially misleading. | P1 | Re-specify Team as permission-aware membership presentation with complete invitation and recovery states; keep OS permission semantics owner-specific. | L |
| UXG-018 — Core page localization | Core shell has English/Arabic translations, but auth, onboarding, Dashboard content, Product Hub, Billing, Integrations, Settings, and Team contain hard-coded English. | Arabic launch quality is incomplete and future locales cannot be added consistently. | P0 | Move all Core user-visible copy into owned namespaces and use the Locale Engine. | XL |
| UXG-019 — Open-ended Locale Engine | Current `Lang` is a two-value union; dictionaries and controls branch on `en`/`ar`; Core has two locale storage paths. | Architecture cannot support additional configured languages without code-wide branching and preference drift. | P0 | Implement the registry, namespace, fallback, formatting, direction, and diagnostics behavior in [Localization](./10-LOCALIZATION.md). | XL |
| UXG-020 — Landing localization and RTL | Landing has responsive design but a fixed English document and hard-coded English content. | Public acquisition is not launch-ready in Arabic and does not support future locales. | P0 | Add locale-aware Landing resources, metadata, navigation, layout direction, and preserved CTA behavior. | L |
| UXG-021 — Commerce localization completeness | Selected Products/Inventory/Customers/Orders/Invoices messages exist; Dashboard, Setup, Transfers, POS fragments, Reports, Settings, and documents retain English. | Operational workflows switch direction without consistently switching copy or formatting. | P0 | Complete Commerce namespaces and shared formatters without moving operational ownership out of Commerce. | XL |
| UXG-022 — Locale persistence precedence | Current browser session key works across apps, but final anonymous/User/Workspace preference precedence is not Accepted. | Production persistence could become inconsistent or overwrite an owner preference. | P1 | Keep the frontend resolver replaceable and route the precedence decision through Governance before claiming account/Workspace persistence. | M; blocked by decision |
| UXG-023 — Plural/date/currency/timezone formatting | Formatting is scattered; English plural concatenation and current mock money/date helpers are common. | Counts, dates, monetary values, and business-day context can be incorrect or confusing across locales. | P0 | Centralize locale-aware presentation formatters with explicit currency and approved effective timezone inputs. | L |
| UXG-024 — App-wide RTL and mixed-script evidence | Core shell and selected Commerce features have RTL tests; most pages, tables, setup steps, documents, and Landing do not. | Directional layout, focus order, identifiers, and print output can fail in Arabic. | P0 | Validate and remediate every critical route using logical layout, mixed-script isolation, compact viewports, overlays, and print. | XL |
| UXG-025 — Route-specific loading surfaces | No route-level `loading.tsx` files exist; some pages return blank during hydration and Commerce protected layout uses only a spinner. | Navigation can appear frozen and lacks localized context. | P1 | Define route/screen loading states with accessible labels, stable layout, and no protected-content flash. | M |
| UXG-026 — Route-specific error/not-found recovery | No route-level `error.tsx` or `not-found.tsx` was found; several detail/document routes have inconsistent missing/error behavior. | Users can hit blank, generic, or non-recoverable outcomes. | P1 | Add owner-aware error/not-found presentations with safe source-list/Dashboard/Product Hub recovery. | L |
| UXG-027 — Core page state completeness | Shell has robust states, but Integrations, Settings, Team, Billing, Dashboard, and Product Hub lack complete page-data empty/error/pending outcomes. | A ready shell can contain misleading or silent page-level failure. | P1 | Add page-specific projection/mutation states without duplicating shell context states. | L |
| UXG-028 — Commerce Dashboard/Reports/Settings state completeness | These routes derive browser data but lack consistent read error, true empty, pending, and recovery behavior. | Frequent operational screens can show stale/default UI without explaining dependency failure. | P1 | Add scoped loading/empty/error/retry and mutation outcome states using existing Commerce owner seams. | L |
| UXG-029 — Sale Success recovery | `/pos/success` assumes a known last Order and primarily shows success actions. | Refresh or missing/corrupt last-order context can strand users or imply a sale outcome. | P1 | Add resolving, missing outcome, partial commit, safe Order lookup, and new-sale recovery states without blind resubmission. | M |
| UXG-030 — Return document recovery | Return document route lacks explicit loading/not-found/error handling. | Users can receive incomplete output without a safe Return/Order path. | P2 | Add source-aware loading, not-found, error, print, and back-to-Order recovery. | S |
| UXG-031 — Returns list and detail | Only Return initiation on Order detail and `/returns/[id]/document` exist. | Users cannot discover, filter, inspect, or recover Return workflows coherently. | P2 | Specify Commerce-owned Returns list/detail before implementing routes; preserve current owner boundary. | L |
| UXG-032 — Stock Movements screen | Movement compatibility data exists, but no `/inventory/movements` screen exists. | Inventory changes lack an inspectable operational history surface. | P2 | Specify a Commerce Inventory-owned, read-only movement list/detail presentation with scoped filters and source links. | L |
| UXG-033 — Compact table behavior | Shared CSS provides responsive shells, but many lists remain full tables without verified compact patterns. | Customers, Orders, Invoices, Inventory, Transfers, Team, and Billing may require horizontal scanning/scrolling on small screens. | P1 | Select and validate a consistent responsive table/card/detail pattern per data density and action priority. | L |
| UXG-034 — Document and print localization/responsiveness | Invoice/Return/setup previews are partly hard-coded and have limited compact/RTL evidence. | Customer-facing documents can be unreadable or inconsistent across direction, locale, and print. | P1 | Define document-specific namespace, formatting, bidi, print, missing-record, and compact preview requirements. | L |
| UXG-035 — Full Profile experience | Core shell has a user menu but no `/dashboard/profile` screen. | Personal identity/preferences are mixed with Workspace settings or inaccessible. | P2 | Add a Core-owned Profile presentation only after approved fields/preferences are known. | M |
| UXG-036 — Notification center | Core has a localized shell dropdown but no full notification route/history/preferences experience. | Users can miss, inspect, or recover only a limited current projection. | P2 | Specify a scoped Core notification center and source navigation without changing source-domain ownership. | L |
| UXG-037 — Audit Log screen | No `/dashboard/audit` route exists. | Authorized users lack UI access to consequential action evidence. | P2 | Specify a read-only, minimized, scoped Core Audit presentation after the permission/read model is approved. | L |
| UXG-038 — Search/command consistency | Core shell search covers destinations; no documented command palette implementation or equivalent Commerce search coordination was verified. | Navigation efficiency and keyboard discoverability differ across apps. | P2 | Define which approved destinations/actions are searchable and keep command actions permission-aware and owner-routed. | L |
| UXG-039 — Accessibility completion beyond tested seams | Core shell and selected Commerce flows have strong tests; route-wide headings, tables, modals, errors, focus restoration, long copy, and print are not uniformly evidenced. | Critical journeys may fail keyboard or assistive-technology use despite a compliant shell. | P0 | Apply the Accessibility document and Design System states to each implementation slice with route-level evidence. | XL |
| UXG-040 — UX analytics event implementation | Platform Experience names expected analytics events, but no consistent route/journey analytics boundary was verified. | Funnel interruption and failure recovery cannot be measured consistently. | P2 | Define privacy-safe frontend event names/properties per approved journey without treating analytics as canonical state. | L |
| UXG-041 — Hard-coded local cross-app URLs | Current Commerce/Core handoff and recovery use `http://localhost:3001`/app-local routes in frontend code. | Safe return is environment-dependent and can fail outside the local topology. | P1 | Future frontend specification should require environment-resolved app navigation through the accepted handoff boundary; do not alter the owner contract here. | M |
| UXG-042 — Terminology reconciliation in UI copy | Current onboarding calls Workspace a company/group and the mock labels legacy `BusinessUnit` as Business. | Users can learn a hierarchy that conflicts with the frozen Workspace → Business → Business Unit model. | P0 | Correct customer-facing terminology in bounded frontend slices while preserving explicit compatibility mappings until a governed migration exists. | L |

## 4. Gap Coverage by Track

| Track | Gaps |
|---|---|
| Canonical onboarding | UXG-001–UXG-014 |
| Access and administration | UXG-015–UXG-017, UXG-035–UXG-037 |
| Localization and accessibility | UXG-018–UXG-024, UXG-033–UXG-034, UXG-039 |
| State and recovery | UXG-025–UXG-030 |
| Commerce completeness | UXG-028–UXG-034 |
| Navigation, measurement, terminology | UXG-038, UXG-040–UXG-042 |

## 5. Relationships

- [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md)
- [User Journeys](./05-USER-JOURNEYS.md)
- [User Flows](./06-USER-FLOWS.md)
- [State Machines](./07-STATE-MACHINES.md)
- [Localization](./10-LOCALIZATION.md)
- [Frontend Backlog](./14-FRONTEND-BACKLOG.md)

## 6. Open Questions

- Which approved Core experience establishes canonical Business context for UXG-014?
- Which Accepted role/permission catalog unblocks UXG-016 and related administration/OS action
  states?
- Which Accepted locale/timezone preference precedence unblocks production persistence claims in
  UXG-022/023?

## 7. Verified Against

- all route pages, layouts, route-used components, styles, mock stores, repositories, feature
  services, and current frontend tests for Landing, Core Platform, and Commerce;
- [Platform Experience](./01-PLATFORM-EXPERIENCE.md), [Screen Map](./02-SCREEN-MAP.md),
  [Frontend Experience Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md),
  [Information Architecture](./04-INFORMATION-ARCHITECTURE.md), and the completed Phase 1 flow
  documents;
- Features 052–055 as current frontend implementation evidence only; and
- Product Decisions, Accepted ADRs, Core/Business Brain/Commerce baselines, execution policy,
  Constitution, and freezes.

