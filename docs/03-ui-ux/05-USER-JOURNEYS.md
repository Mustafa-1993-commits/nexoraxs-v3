# User Journeys

- **Status:** Target UX journeys reconciled with the 2026-07-19 frontend snapshot
- **Owner:** Product Experience with Core Platform and Commerce frontend owners
- **Authority:** User-experience sequence only; subordinate to product decisions and frozen architecture

## 1. Purpose

This document defines the customer journeys needed to complete the current frontend-first
experience. Each journey distinguishes the target experience from today's browser mock. It does
not define backend contracts, schemas, canonical lifecycle states, or new permissions.

## 2. Scope

The journeys cover public entry, Core identity and Workspace context, Business Architect,
Business Blueprint, Recommendations, Platform Dashboard, Product Hub, Commerce handoff/setup and
daily Commerce use. Arabic/RTL and English/LTR are launch cases; the experience is expected to
remain locale-agnostic as specified in [Localization](./10-LOCALIZATION.md).

## 3. Journey Conventions

- **Required screens** may include both verified and planned screens from the
  [Screen Map](./02-SCREEN-MAP.md). A planned screen is not an implementation claim.
- **Required states** are user-visible presentation states. Canonical domain facts remain owned by
  Core Platform or Commerce as established by architecture.
- **Recovery** always returns to the last safe, authorized context. It must not reveal another
  Workspace, Business, Business Unit, or Branch.
- Product Hub composes approved projections and initiates handoff. It does not perform Commerce
  setup or own Commerce operations.

## 4. New User Journey

**Purpose:** Move a first-time visitor from public discovery to a useful Core Platform home, with
Business Architect and Business Blueprint preceding recommendations and product selection.

**Actor:** A prospective customer who will create the initial account and Workspace; later
authorization for Business facts remains owner-controlled.

**Entry:** Public Landing page.

**Exit:** Platform Dashboard in the newly created Workspace. Commerce is optional and is launched
later through Product Hub when available, enabled, and authorized.

**Main steps:**

1. Review the Landing value proposition and choose registration.
2. Register an account and verify the email address.
3. Create the Workspace boundary and select launch locale/context defaults.
4. Read the Business Architect introduction and begin the guided, conversational interview.
5. Answer, clarify, pause, or supply approved supporting information.
6. Review answers, inferred facts, assumptions, and gaps; correct them before analysis.
7. Observe deterministic analysis progress and resolve any input issue.
8. Review the Business Blueprint presentation.
9. Review explainable Recommendations as a separate stage.
10. Select an eligible plan or continue with available access.
11. Complete Core Workspace setup and enter Platform Dashboard.
12. Discover Commerce in Product Hub; launch its setup only if chosen and authorized.

**Decision points:**

- register or return to Login;
- correct an existing account conflict;
- resume or restart only when restart is explicitly safe;
- answer, skip where permitted, clarify, or pause an interview prompt;
- correct the review or confirm it for analysis;
- act on, defer, or dismiss a Recommendation without changing the Blueprint;
- select a plan or continue with existing/available access; and
- start Commerce setup or remain in Core Platform.

**Failure paths:** Duplicate email; invalid verification input; missing Workspace context; failed
mock persistence; incomplete interview; unavailable analysis fixture; stale Blueprint projection;
Recommendation source failure; no eligible plan; rejected Commerce handoff.

**Recovery paths:** Return to the current auth step without losing valid input; resend verification;
retry Workspace persistence; resume the exact safe interview point; return to Review when analysis
needs correction; show partial Blueprint sections without fabricating facts; continue to Platform
Dashboard when product purchase is optional; return safely to Product Hub after a failed handoff.

**Required screens:** Landing, Register, Verify Email, Create Workspace, Business Architect
Introduction, Interview, Supporting Information where applicable, Review, Analysis, Business
Blueprint, Recommendations, Plan/Available Access, Core Workspace Setup, Platform Dashboard,
Product Hub.

**Required states:** Initial, validating, pending, recoverable failure, unauthorized/unavailable,
resumable, confirmed, analyzing, partial/stale projection, no Recommendations, success, and safe
handoff failure.

**Current implementation:** Registration, verification, Workspace creation, OS selection, Plan
selection, Dashboard, Product Hub, and Commerce handoff exist. Business Architect through
Recommendations and Core Workspace Setup do not. Current `/onboarding` puts OS and Plan before the
target analysis journey.

## 5. Returning User Journey

**Purpose:** Return an authenticated or known user to the most relevant safe Core destination
without forcing completed users through onboarding again.

**Actor:** Existing NexoraXS User with zero or more authorized Workspace memberships.

**Entry:** Login, an authorized deep link, or a restored browser session.

**Exit:** Exact resumable onboarding stage, Platform Dashboard, Product Hub, or the authorized
source screen requested by a deep link.

**Main steps:**

1. Resolve session and identity presentation.
2. Authenticate if the session is absent or expired.
3. Resolve authorized Workspace and Business context without trusting client-provided IDs.
4. Evaluate unfinished Core onboarding and Business Architect work separately from OS readiness.
5. Route to the exact safe resume point or the Platform Dashboard.
6. Restore locale, direction, theme, and safe UI context.
7. Continue the requested task or navigate through Core.

**Decision points:** Valid or expired session; one or multiple authorized Workspaces; incomplete
Business Architect; completed Blueprint but unreviewed Recommendations; no Commerce subscription;
Commerce setup required; unauthorized or stale deep link.

**Failure paths:** Invalid credentials; stale saved Workspace/Business context; cross-scope context;
missing mock records; unavailable deep-link target; expired interview session.

**Recovery paths:** Password recovery; Workspace selector; localized context error with retry;
return to Platform Dashboard; resume the nearest safe Core stage; never fall through into another
tenant's context.

**Required screens:** Login, Forgot/Reset Password, Workspace Selector, Resume Incomplete Interview,
Business Blueprint or Recommendations when pending, Platform Dashboard, Product Hub, destination
screen or safe fallback.

**Required states:** Resolving session, unauthenticated, authenticating, context loading, one/many/no
Workspaces, stale, unauthorized, resume available, ready, and recovery.

**Current implementation:** Login redirects a completed browser onboarding session directly to
`/dashboard/apps`; otherwise it redirects to `/onboarding`. Core shell context recovery exists, but
Business Architect resume and nuanced post-login routing do not.

## 6. Workspace Admin Journey

**Purpose:** Let an authorized administrator manage Workspace-level membership, settings, access
presentation, billing, and product availability without absorbing Commerce operational settings.

**Actor:** Workspace member with the applicable administrative permission. The current frontend
does not yet provide canonical role enforcement.

**Entry:** Platform Dashboard, Core shell, Workspace selector, or a permitted administration deep
link.

**Exit:** Updated Core administration view, Platform Dashboard, or Product Hub.

**Main steps:**

1. Confirm the active Workspace and organization context.
2. Open Team and Access, Workspace Settings, Billing, Integrations, or Product Hub.
3. Inspect current owner projections and any unavailable/stale state.
4. Initiate an allowed action such as inviting a member or updating a presentation preference.
5. Review scope and consequences before confirmation.
6. Observe pending, success, or recoverable failure feedback.
7. Return to the originating Core page with context preserved.

**Decision points:** View versus manage; Workspace versus personal preference; billing view versus
commercial change; Product availability versus Commerce setup; invitation versus permission
assignment; insufficient permission.

**Failure paths:** Missing permission; stale member list; failed invite; invalid input; unavailable
billing projection; cross-scope link; unsupported preference precedence.

**Recovery paths:** Preserve draft input; refresh the owner projection; request access; return to a
read-only view; cancel safely; retry only idempotent presentation actions.

**Required screens:** Platform Dashboard, Workspace Selector, Team and Access, Workspace Settings,
Billing/Subscription, Integrations, Product Hub, Notifications, Profile.

**Required states:** Loading, empty membership, read-only, editable, validation, confirmation,
pending, success, failure, unauthorized, stale, and partial projection.

**Current implementation:** `/dashboard/team`, `/dashboard/settings`, `/dashboard/billing`, and
`/dashboard/integrations` exist, but several actions are component-local or toast-only and route-
level role enforcement is not verified.

## 7. Team Member Journey

**Purpose:** Give a non-administrative member a clear, least-privilege path to available Core and OS
work without presenting actions they cannot complete.

**Actor:** Workspace member whose roles, permissions, resource scope, and OS access are provided by
the owning authorization context.

**Entry:** Login, invitation acceptance when later specified, or an authorized deep link.

**Exit:** Platform Dashboard, Product Hub, or an authorized operational screen.

**Main steps:**

1. Authenticate and resolve active membership/context.
2. Enter Platform Dashboard even when no OS is ready.
3. Review available products and personal notifications.
4. Launch an authorized OS or remain in Core.
5. Perform only actions allowed by role, permission, ownership, workflow, plan entitlement, and
   resource scope.
6. Return to Product Hub or Platform Dashboard through safe cross-app navigation.

**Decision points:** Multiple Workspaces; available versus unavailable product; view versus mutate;
authorized versus unauthorized resource; setup required versus ready.

**Failure paths:** Revoked membership; hidden or disabled action; stale entitlement; OS unavailable;
resource outside Business Unit/Branch scope.

**Recovery paths:** Explain the unavailable action without exposing sensitive details; choose
another Workspace; return to Product Hub; request access through an approved channel; retry a
failed projection.

**Required screens:** Login, Workspace Selector, Platform Dashboard, Product Hub, Notifications,
Profile, and permitted Commerce screens.

**Required states:** Membership resolving, no membership, available, unavailable, setup required,
unauthorized, read-only, pending, ready, and safe return.

**Current implementation:** Protected layouts verify browser session/context, but most routes do
not enforce a role-specific frontend decision. Team roles are hard-coded presentation, not a
canonical catalog.

## 8. Business Owner Journey

**Purpose:** Help the person accountable for a Business articulate its DNA, understand the
resulting Blueprint, and decide what to do with Recommendations.

**Actor:** Authorized participant for one canonical Business. Business DNA belongs to the Business,
not Workspace or Business Unit.

**Entry:** New-user onboarding, Platform Dashboard resume card, or authorized Business context.

**Exit:** Confirmed Business Blueprint, reviewed Recommendations, or a safely paused interview.

**Main steps:**

1. Select or confirm the Business context through an approved Core experience.
2. Read Business Architect scope, privacy, expected time, and output.
3. Complete the guided, conversational interview with progressive prompts.
4. Add permitted supporting information and inspect its use.
5. Review answers, inferred Business DNA candidates, assumptions, conflicts, and gaps.
6. Correct or confirm the review.
7. Observe deterministic Business Analysis.
8. Inspect the Business Blueprint: Business DNA, summary, needs, challenges, opportunities,
   readiness, relevant capabilities, and implementation roadmap.
9. Inspect Recommendations separately, including rationale and alternatives.
10. Defer, dismiss, or continue toward Product Hub/plan selection without mutating the Blueprint.

**Decision points:** Pause/resume; skip or clarify; correct a fact; confirm analysis input; review
optional Blueprint sections; act on or defer a Recommendation.

**Failure paths:** No selected Business; inaccessible evidence; conflicting answers; unsupported
analysis input; analysis failure; incomplete or stale owner projection.

**Recovery paths:** Return to the relevant interview prompt; preserve reviewed answers; explain
blocked analysis; retry deterministic analysis with the same versioned input; show partial
Blueprint with provenance; return later to Recommendations.

**Required screens:** Business selection/entry when approved, Business Architect Introduction,
Interview, Supporting Information, Review, Analysis, Business Blueprint, Recommendations,
Platform Dashboard.

**Required states:** Not started, draft, paused, resumable, incomplete, conflict, review required,
confirmed, analyzing, blocked, failed/retryable, Blueprint ready/partial/stale, Recommendations
none/ready/deferred.

**Current implementation:** None of these Business Architect, Business Analysis, Business
Blueprint, or Recommendations screens exists. Current browser data has only a legacy
BusinessUnit-as-`Business` presentation and must not be treated as the canonical Business model.

## 9. Product Discovery Journey

**Purpose:** Let a customer discover NexoraXS capabilities after business analysis and understand
availability, commercial state, setup readiness, and next actions without conflating them.

**Actor:** Authorized Workspace/Business viewer; purchase, setup, and launch actions require their
own permissions.

**Entry:** Recommendations, Platform Dashboard, or Product Hub.

**Exit:** Platform Dashboard, eligible plan/access decision, OS-owned setup, ready OS, or a deferred
choice.

**Main steps:**

1. Enter Product Hub in the current Workspace and Business context.
2. Review capability-led Recommendations when available.
3. Inspect each product's availability and owner-provided access/readiness projection.
4. Distinguish Product availability, Plan, OS Subscription, setup, readiness, and operational
   access.
5. Choose to learn more, obtain eligible access, start owner setup, launch, or defer.
6. Follow a governed handoff to Commerce when selected.
7. Return safely to Product Hub if setup is rejected, unavailable, or canceled.

**Decision points:** Recommended versus browsed product; available versus future; access available
versus plan required; setup required versus ready; authorized versus view-only.

**Failure paths:** Missing/stale projection; no available products; handoff context rejected;
subscription does not grant operational access; optional OS unavailable.

**Recovery paths:** Explain which owner projection is unavailable; continue using Core; refresh
the product card; return to the Recommendation; retry an accepted handoff; never perform OS setup
inside Product Hub.

**Required screens:** Business Blueprint, Recommendations, Platform Dashboard, Product Hub,
Billing/Subscription, Commerce Setup or Commerce Dashboard.

**Required states:** Loading per owner, no Recommendations, no products, available, plan required,
subscribed, setup required, ready, paused, unauthorized, partial failure, and safe return.

**Current implementation:** `/dashboard/apps` and `/dashboard` provide product cards and a governed
frontend handoff seam. The cards use mock subscription/setup state; Business-led Recommendations
do not exist.

## 10. Commerce Activation Journey

**Purpose:** Move an eligible, authorized Core user through Product Hub handoff into Commerce-owned
setup and then to an operationally ready Commerce Dashboard.

**Actor:** Workspace member with applicable Commerce acquisition/setup/access permissions and
approved organization scope.

**Entry:** Product Hub Commerce card in setup-required state.

**Exit:** Commerce Dashboard in an authorized Business Unit/Branch context, or safe return to
Product Hub.

**Main steps:**

1. Product Hub composes Commerce availability, subscription, and readiness projections.
2. User selects setup; Core creates a bounded frontend handoff context.
3. Commerce validates the presence of current handoff, identity, Workspace, subscription, and
   compatibility organization context.
4. Commerce presents Identity, Preset, Mode, Tax, Numbering, Templates, Categories, and Review.
5. User saves progress or completes the Commerce-owned setup.
6. Commerce routes to its Dashboard when ready.
7. User can return to Product Hub without transferring operational ownership.

**Decision points:** Missing context; unauthenticated; setup already complete; save and exit;
preset/mode/tax choices; validation failure; finish setup.

**Failure paths:** Direct `/setup` without handoff; stale or cross-scope context; incomplete required
fields; mock storage failure; setup completion failure.

**Recovery paths:** Return to Product Hub for a new handoff; return to Core Login; retain safe setup
draft; retry validation; save and exit; keep Commerce operational data owned by Commerce.

**Required screens:** Product Hub, Commerce Setup, Commerce Dashboard, safe-return navigation.

**Required states:** Availability resolving, setup required, context missing/rejected,
unauthenticated, loading existing setup, step valid/invalid, saving, saved, completion pending,
ready, failure, and safe return.

**Current implementation:** The complete eight-step Commerce setup and handoff adapter exist.
Feature 054 establishes the current browser boundary. It remains a temporary frontend
compatibility seam and does not define a backend contract.

## 11. Commerce Daily Usage Journey

**Purpose:** Support a Commerce actor's repeated operational loop from Dashboard through sale and
follow-up, with scoped data and recoverable repository states.

**Actor:** Authorized Commerce actor in applicable Workspace, Business Unit, Branch, and resource
scope. Current browser UI does not enforce the final permission model.

**Entry:** Commerce Dashboard after accepted handoff and completed setup.

**Exit:** Completed sale, inspected operational record, updated owned data, report review, or safe
return to Core Product Hub.

**Main steps:**

1. Review daily KPIs, setup reminders, recent Orders, and Inventory attention.
2. Start POS, select Products and optional Customer, and build a cart.
3. Validate availability, totals, and payment presentation.
4. Complete the current frontend sale command.
5. Review sale success, Order, Invoice, and printable document.
6. Continue with Customers, Products, Inventory adjustment/transfer, Orders, Invoices, Returns,
   Reports, or Commerce Settings.
7. Handle empty and recoverable repository errors without leaking another scope.
8. Return safely to Product Hub when leaving Commerce.

**Decision points:** Empty catalog; insufficient stock; customer selection; payment presentation;
checkout success/failure; return eligibility; transfer destination; read-only versus manage action.

**Failure paths:** Repository unavailable/corrupt; storage quota; insufficient stock; partial
browser commit; record not found; no transfer destination; print document missing.

**Recovery paths:** Retry repository reads; preserve POS draft where safe; explain partial outcome;
open the created Order/Invoice when available; return to the source list; refresh context; avoid
repeating a non-idempotent sale blindly.

**Required screens:** Commerce Dashboard, POS, Sale Success, Products, Product Editor, Inventory,
Transfers, Customers, Orders, Invoices, document routes, Reports, Settings; Returns list/detail and
Stock Movements remain planned.

**Required states:** Loading, empty/filter-empty, ready, pending mutation, validation error,
repository error, not found, unauthorized, success, partial outcome, printable, and recovery.

**Current implementation:** Most daily routes exist and repository-backed areas have explicit
states. Returns list/detail and Stock Movements are absent; reports/settings and some success or
document screens have weaker failure handling.

## 12. Interrupted Onboarding Journey

**Purpose:** Preserve progress and return a user to the exact safe onboarding point without
collapsing Core onboarding, Business Architect, and Commerce setup into one completion flag.

**Actor:** Authenticated new or returning user with an authorized Workspace/Business context.

**Entry:** Close, sign-out, navigation away, refresh, recoverable failure, or later Login during
Workspace onboarding, Business Architect, analysis, Recommendations, or Commerce setup.

**Exit:** Resumed exact stage, a safe earlier review point, Platform Dashboard, Product Hub, or
Commerce Dashboard when already complete.

**Main steps:**

1. Persist the last safe completed presentation checkpoint and current authorized context.
2. On return, resolve session and membership before reading progress.
3. Validate that the saved context is still authorized and not superseded.
4. Show what will resume and allow safe continuation.
5. Resume at an incomplete interview prompt, Review, Analysis result, Blueprint,
   Recommendations, Core setup, or Commerce setup step.
6. If the saved point is invalid, fall back to the nearest safe owner-approved stage.

**Decision points:** Resume versus discard draft where permitted; context still authorized; input
superseded; analysis already completed; OS setup already complete.

**Failure paths:** Missing browser state; stale Workspace/Business context; corrupt mock storage;
expired session; permission revoked; version mismatch.

**Recovery paths:** Reauthenticate; choose an authorized Workspace; explain lost local draft;
return to Review; load the completed Blueprint; restart only the affected presentation draft when
explicitly safe; return to Platform Dashboard instead of blocking all access.

**Required screens:** Login, Workspace Selector, Business Architect Introduction/Interview/Review,
Analysis, Business Blueprint, Recommendations, Core Workspace Setup, Product Hub, Commerce Setup.

**Required states:** Resolving, no progress, draft, resumable, expired, superseded, unauthorized,
corrupt/unavailable, retrying, resumed, completed.

**Current implementation:** Core `/onboarding` keeps its step only in component state and uses a
coarse browser completion record. Commerce setup reads existing mock setup and supports save/exit.
There is no Business Architect progress model or exact cross-session resume UI.

## 13. Language Switching Journey

**Purpose:** Let a user change presentation locale and direction without losing task progress or
changing user-entered Business data.

**Actor:** Public visitor or authenticated user. Persistence scope/precedence must follow an
approved owner policy when one exists.

**Entry:** Landing/auth control when supplied, onboarding control, Core shell/settings, or Commerce
shell/settings.

**Exit:** Same screen, same safe context, translated UI, correct direction, and locale-formatted
values.

**Main steps:**

1. Open the locale selector and see all configured supported locales.
2. Select a locale; the launch configuration includes English and Arabic.
3. Resolve translation namespaces and direction metadata.
4. Update `lang`, `dir`, UI copy, plural rules, dates, numbers, currency display, and time-zone
   presentation together.
5. Preserve user-entered text, current form draft, selection, focus, and safe scroll position.
6. Persist the preference at the approved scope and propagate it through accepted cross-app
   handoff context.
7. If a message is missing, apply the documented fallback without exposing raw keys in production.

**Decision points:** Supported versus unsupported locale; authenticated versus anonymous
preference; complete versus partial namespace; RTL versus LTR; mixed-script content.

**Failure paths:** Missing translation; invalid persisted locale; namespace load failure;
unsupported formatting data; a component assumes left/right; Core and Commerce preference drift.

**Recovery paths:** Fall back to the configured language chain; preserve the task; log safe
diagnostics; use logical layout; let the user retry the locale selection; never translate or
rewrite user-entered Business facts automatically.

**Required screens:** Every user-facing route; locale selector in approved entry points; localized
loading, empty, error, success, confirmation, and recovery surfaces.

**Required states:** Locale resolving, ready, switching, namespace loading, fallback active,
missing-key diagnostic, direction applied, persisted, failed/retryable.

**Current implementation:** Core and Commerce persist `en`/`ar` in browser session state and apply
document direction. Core shell and selected Commerce features translate some copy. Landing,
authentication, onboarding, and many pages remain hard-coded; no open-ended locale registry,
namespace loader, pluralization contract, or unified formatting layer exists.

## 14. Journey Coverage Summary

| Journey | Current route coverage | Main blocker |
|---|---|---|
| New User | Partial | Business Architect through Recommendations absent and current onboarding order differs |
| Returning User | Partial | Coarse completion redirect; exact resume routing absent |
| Workspace Admin | Partial | Mock/local actions and no verified permission enforcement |
| Team Member | Partial | No route-specific role/permission behavior |
| Business Owner | Missing | Business Architect, analysis, Blueprint, and Recommendations absent |
| Product Discovery | Partial | Product Hub exists; capability-led Recommendations absent |
| Commerce Activation | Strong frontend mock | Temporary handoff/context and incomplete localization/permission presentation |
| Commerce Daily Usage | Strong frontend mock | Uneven states; Returns/Movements screens absent |
| Interrupted Onboarding | Minimal | No exact Business Architect resume; Core step is component-local |
| Language Switching | Partial | Two-locale fragmented implementation and hard-coded copy |

## 15. Relationships

- [Platform Experience](./01-PLATFORM-EXPERIENCE.md)
- [Screen Map](./02-SCREEN-MAP.md)
- [Information Architecture](./04-INFORMATION-ARCHITECTURE.md)
- [User Flows](./06-USER-FLOWS.md)
- [State Machines](./07-STATE-MACHINES.md)
- [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md)
- [Design System Interaction Patterns](../04-design-system/05-INTERACTION-PATTERNS.md)

## 16. Open Questions

- Which approved Core experience creates or selects the canonical Business before Business
  Architect starts?
- Which role/permission catalog and invitation lifecycle should Team journeys use?
- Which locale preference scope and precedence applies after the browser-only frontend phase?

## 17. Verified Against

- [Product Decisions](../00-governance/PRODUCT-DECISIONS.md), applicable Accepted ADRs, Genesis,
  Core Platform, Business Brain, Commerce OS, and Architecture Freeze documents;
- [Platform Experience](./01-PLATFORM-EXPERIENCE.md), [Screen Map](./02-SCREEN-MAP.md),
  [Frontend Experience Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md), and
  [Information Architecture](./04-INFORMATION-ARCHITECTURE.md);
- all current route pages and route-used shell/onboarding components in `apps/landing`,
  `apps/core-platform`, and `apps/commerce`;
- current frontend mock stores, repositories, adapters, and feature services in `packages/shared`,
  `packages/contracts/src/commerce`, `packages/sdk/src/commerce`, and the app `lib`/`features`
  folders; and
- Features 052–055 and their existing frontend tests as implementation evidence, not future API
  authority.

