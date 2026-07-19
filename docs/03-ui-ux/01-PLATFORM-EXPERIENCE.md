# Platform Experience

**Status:** Canonical product-experience direction
**Date:** 2026-07-19
**Product owner:** Core Platform journey
**Architecture authority:** Accepted ADRs and frozen Core Platform/Commerce boundaries remain controlling

## 1. Purpose

This document defines the canonical customer experience from first visit through the Platform
Dashboard, Product Hub, and an enabled Commerce launch. It describes user-visible behavior and
experience state only. It does not define backend APIs, database schemas, transport contracts, or
new canonical domain entities.

The controlling product decisions are recorded in the
[Product Decision Register](../00-governance/PRODUCT-DECISIONS.md). Architecture ownership remains
defined by the [Core Platform Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md),
[ADR-024](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md), and
[ADR-040](../00-governance/ADR/ADR-040-core-organization-identity-os-operational-data.md).

## 2. Canonical journey

```text
Landing
  → Register
  → Verify Email
  → Create Workspace
  → Business Architect Introduction
  → Business Interview
  → Review Answers
  → Analysis
  → Business Blueprint
  → Recommendations
  → Plan Selection or Continue with available access
  → Workspace Setup
  → Platform Dashboard
  → Product Hub
  → Commerce launch when enabled
```

This sequence establishes three product rules:

1. the customer enters the Core Platform before any Operating System;
2. the platform understands the selected Business before presenting product choices; and
3. Commerce begins only after a Core-owned launch decision and handoff, while Commerce retains
   ownership of its setup, operational UI, behavior, and persistence.

## 3. Experience definitions

### 3.1 Business Architect

Business Architect is the primary onboarding experience. It is a guided or conversational,
resumable interview—not a long static form, a fixed exhaustive wizard, or an unstructured chatbot.
It should infer from authorized context before asking, ask the minimum useful next question, make
uncertainty visible, accept supporting information, and preserve a customer review checkpoint.

The experience represents the governed pipeline described by
[ADR-016](../00-governance/ADR/ADR-016-business-architect-governed-pipeline.md). It must not imply
that every raw answer is immediately published Business DNA or that an AI response is a canonical
fact.

### 3.2 Business Blueprint

The **Business Blueprint** is the main customer-facing result of Business Architect. It is a Core
presentation/projection composed from:

- Business DNA;
- a concise business summary;
- identified operational needs;
- challenges;
- opportunities;
- readiness indicators;
- recommended NexoraXS capabilities; and
- an implementation roadmap.

The Blueprint is not the architecture document named
[NexoraXS Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md), not a second source of truth,
and not a new canonical aggregate. Underlying facts retain their existing owners. Its recommended
capabilities express analyzed business need; the following Recommendations stage supplies separate,
optional, explainable advice and any product/plan implementation options.

### 3.3 Recommendations

Recommendations follow completed analysis and presentation of the Business Blueprint. They remain
separate from Business DNA and from the Blueprint presentation. They are capability-first,
explainable, optional, and human-controlled as required by
[ADR-013](../00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md) and
[ADR-014](../00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md).

### 3.4 Workspace Setup versus Commerce Setup

**Workspace Setup** in this journey is Core-owned platform setup: selected Workspace context,
applicable organization context, membership/access orientation, localization, and available
platform preferences. It is not Commerce configuration.

**Commerce Setup** occurs only after Product Hub launches or routes to Commerce. Commerce owns the
Business Unit/Branch operational context, presets/modules, operational settings, readiness, and
daily workflow. Product Hub owns discovery and handoff, not the Commerce setup implementation.

## 4. Cross-stage rules

### 4.1 Navigation

- Each stage has one primary forward action and a safe secondary action such as back, save and
  exit, resume later, or return to Platform Dashboard.
- Back navigation must not discard confirmed answers or silently publish draft information.
- Refresh, browser restart, and session interruption must offer a safe resume path where the stage
  produces durable customer work.
- A failed guard explains whether the user must authenticate, select a Workspace or Business,
  request access, resume onboarding, choose a plan, finish setup, or return to Product Hub.
- No Core route may require Commerce to be operational before the customer can reach the Platform
  Dashboard or Product Hub.

### 4.2 Permissions and ownership

- Public stages allow anonymous access; protected stages require an authenticated principal.
- Authentication does not imply Workspace, Business, Product, or Commerce authorization.
- Protected actions require the applicable Workspace Membership, organization/resource scope,
  permission, entitlement, lifecycle, and owner-domain decision.
- Role names in the current frontend are mock presentation values, not the canonical role catalog.
- Core owns platform identity/context and approved projections. Commerce owns Commerce operational
  behavior and persistence. The established separation is not a gap to be redesigned.

### 4.3 Localization and accessibility

- English/LTR and Arabic/RTL are required from the first implementation of every stage.
- All product messages require an owner-qualified translation path; user-entered data remains as
  entered.
- Layout uses logical direction, and mixed-script Business content uses appropriate `dir` behavior.
- Primary tasks are keyboard-operable, focus order is predictable, status/error changes are
  announced, labels are programmatically associated, and color is never the only signal.
- Loading, reduced-motion, zoom, responsive, screen-reader, and recovery behavior are part of UI
  maturity, not post-release polish.

### 4.4 Analytics and persistence

Event names below are product analytics planning labels. They are not domain Events, API names, or
backend contracts. Analytics must exclude secrets and unauthorized tenant or Business data.

Persistence expectations describe user-visible continuity only. They do not select browser keys,
tables, DTOs, endpoints, or storage technology. During frontend-first delivery, deterministic mock
clients may implement the experience behind stable page-facing seams. Production durability,
authorization, Audit, and observability remain later owner-boundary responsibilities.

## 5. Stage specifications

### 5.1 Landing

| Concern | Canonical experience |
|---|---|
| User goal | Understand what NexoraXS is and begin account creation with confidence. |
| Platform goal | Establish the Platform-first value proposition and route qualified intent into Core registration. |
| Required information | No personal information is required before the customer chooses to register. |
| Primary action | Create an account. |
| Secondary action | Sign in, review product information, or continue browsing public content. |
| Navigation rules | The primary onboarding CTA routes to Core registration; returning customers can route to Core login. |
| Loading state | Public content and CTA remain usable while non-critical media or motion loads. |
| Empty state | Not applicable; essential value proposition and CTA are static required content. |
| Error state | If Core entry is unavailable, retain public content and present a retry/contact path without losing the page. |
| Success state | The customer reaches Core registration. |
| Permission considerations | Public; no Workspace or Commerce context is exposed. |
| Localization considerations | Localized public content, locale-aware entry, English/LTR and Arabic/RTL, with no silent translation of user content. |
| Accessibility considerations | Semantic landmarks/headings, keyboard-operable navigation, accessible mobile menu, reduced motion, and descriptive imagery. |
| Analytics events | `landing.viewed`, `landing.registration_selected`, `landing.login_selected`, `landing.entry_failed`. |
| Persistence expectations | Anonymous presentation preferences may be session-scoped; no canonical customer state is created. |
| Ownership boundary | Core Platform journey boundary; the Landing application owns public presentation and Core owns authentication entry. |

### 5.2 Register

| Concern | Canonical experience |
|---|---|
| User goal | Create a NexoraXS account with minimal, clear information. |
| Platform goal | Establish an account identity and continue to email verification without starting Workspace or OS configuration. |
| Required information | Email, required identity fields, password/approved sign-up method, and applicable consent. |
| Primary action | Create account. |
| Secondary action | Return to login or change the entered email. |
| Navigation rules | Successful registration goes to Verify Email; authenticated returning users follow the appropriate resumable Core stage. |
| Loading state | Submission is disabled once, progress is announced, and duplicate submission is prevented in the UI. |
| Empty state | Initial form with clear field purpose and no preselected Business or OS. |
| Error state | Field, duplicate-account, unavailable-method, and recoverable service errors preserve safe inputs and focus the first actionable issue. |
| Success state | Account creation is acknowledged and verification begins. |
| Permission considerations | Public account-creation surface; no Workspace Membership or product access is implied. |
| Localization considerations | Translated validation and password guidance; names and email remain as entered; both directions retain logical field order. |
| Accessibility considerations | Autocomplete purpose, visible labels, associated errors, password disclosure semantics, keyboard operation, and announced submission state. |
| Analytics events | `registration.started`, `registration.method_selected`, `registration.completed`, `registration.failed`. |
| Persistence expectations | Account-creation result and verification continuation survive navigation; passwords are never retained as presentation telemetry. |
| Ownership boundary | Core Platform. |

### 5.3 Verify Email

| Concern | Canonical experience |
|---|---|
| User goal | Prove control of the registration email and continue onboarding. |
| Platform goal | Complete the email-verification stage before protected Workspace creation. |
| Required information | Verification code or approved verification link tied to the current account attempt. |
| Primary action | Verify and continue. |
| Secondary action | Resend, change email, or return to registration. |
| Navigation rules | Verified users continue to Create Workspace; unverified or expired attempts remain in verification with recovery. |
| Loading state | Verification/resend progress is announced and repeated actions are rate-safe in presentation. |
| Empty state | Code/link instructions with the destination email safely summarized. |
| Error state | Invalid, incomplete, expired, unavailable, or mismatched attempts show specific recovery without exposing account existence improperly. |
| Success state | Verification is confirmed and the next Core onboarding stage opens. |
| Permission considerations | Account-scoped continuation only; verification does not grant Workspace or Commerce access. |
| Localization considerations | Localized instructions, direction-safe code entry, and locale-independent numeric handling. |
| Accessibility considerations | Grouped code inputs or a single accessible field, paste support, clear focus movement, announced errors, and non-timer-only recovery. |
| Analytics events | `email_verification.viewed`, `email_verification.submitted`, `email_verification.resent`, `email_verification.completed`, `email_verification.failed`. |
| Persistence expectations | Verification stage and safe resend state survive expected navigation; secrets/codes are not analytics payloads. |
| Ownership boundary | Core Platform. |

### 5.4 Create Workspace

| Concern | Canonical experience |
|---|---|
| User goal | Create the customer account boundary with the minimum necessary context. |
| Platform goal | Establish the Workspace and active customer context without treating it as a Business or choosing an OS. |
| Required information | Workspace name and only approved minimal defaults such as country, language, timezone, or currency context. |
| Primary action | Create Workspace and continue. |
| Secondary action | Back, sign out, or resume later where supported. |
| Navigation rules | Success routes to Business Architect Introduction; OS and plan selection are not part of this stage. |
| Loading state | Submission progress is visible and repeat activation cannot create duplicate visible outcomes. |
| Empty state | Minimal Workspace explanation and fields; no implied Business, industry, or OS type. |
| Error state | Validation, duplicate, permission, or temporary failure preserves entered values and offers retry. |
| Success state | The Workspace is selected and the Business Architect introduction begins. |
| Permission considerations | The authenticated creator must have authority to create the Workspace; later access remains membership- and scope-dependent. |
| Localization considerations | Localized names for defaults; entered Workspace name stays as entered; direction-safe selectors. |
| Accessibility considerations | Clear distinction between Workspace and Business, labeled selectors, keyboard access, announced validation, and focus on the next stage heading. |
| Analytics events | `workspace_creation.started`, `workspace_creation.completed`, `workspace_creation.failed`. |
| Persistence expectations | The created Workspace and selected context are durable customer work; frontend mocks must preserve deterministic resume behavior without claiming production truth. |
| Ownership boundary | Core Platform. |

### 5.5 Business Architect Introduction

| Concern | Canonical experience |
|---|---|
| User goal | Understand what the interview will produce, how information is used, and how long/resumable it is. |
| Platform goal | Establish the selected Business context and informed entry into the governed Business Architect process. |
| Required information | Authorized Workspace, selected Business context, current locale, prior session state, and available authorized evidence. |
| Primary action | Start or resume the Business Architect interview. |
| Secondary action | Review privacy/use information, switch an authorized context, return to Workspace setup, or resume later. |
| Navigation rules | A resumable session opens the next incomplete question; a completed analysis routes to its Blueprint rather than starting over. |
| Loading state | Context and resume status resolve before the main action becomes available. |
| Empty state | Explain the Blueprint outcome and conversational approach when no session exists. |
| Error state | Missing Business context, inaccessible context, stale session, or unavailable evidence source presents a specific safe recovery. |
| Success state | A Business-scoped interview session is ready and the first useful prompt opens. |
| Permission considerations | Requires authenticated Workspace Membership and access to the selected Business; a named identifier is not proof of access. |
| Localization considerations | Localized introduction and consent/explanation; mixed-script Business name shown as entered; language choice does not alter Business facts. |
| Accessibility considerations | Concise reading order, no motion dependency, descriptive progress expectation, and a clearly focused start/resume action. |
| Analytics events | `business_architect.introduction_viewed`, `business_architect.started`, `business_architect.resumed`, `business_architect.context_failed`. |
| Persistence expectations | Session existence, selected authorized context, and safe resume location are preserved separately from published Business DNA. |
| Ownership boundary | Core Platform. |

### 5.6 Business Interview

| Concern | Canonical experience |
|---|---|
| User goal | Describe the Business naturally with the minimum necessary effort. |
| Platform goal | Collect and normalize sufficient evidence and candidate information for reviewed Business understanding. |
| Required information | One focused prompt at a time, authorized context/evidence, prior answers, uncertainty, and applicable follow-up needs. |
| Primary action | Answer and continue. |
| Secondary action | Skip when allowed, clarify, attach supporting information, go back, save and exit, or ask why a question matters. |
| Navigation rules | Question order adapts to known and missing information; save/exit returns through the resume entry; the final prompt routes to Review Answers. |
| Loading state | Next-question preparation is announced without hiding the prior confirmed answer; long work exposes cancel/retry where safe. |
| Empty state | If no question is needed, explain why and route to review; do not show a blank conversation. |
| Error state | Validation, save, inference, or question-loading failure preserves the draft and offers manual retry without duplicate answers. |
| Success state | Each answer is visibly captured; the interview progresses to a complete reviewable draft. |
| Permission considerations | Only authorized participants may view or alter the selected Business session; consequential publication requires its own permission/checkpoint. |
| Localization considerations | Prompts, hints, validation, and examples are localized; user answers remain as entered; input supports mixed scripts and direction. |
| Accessibility considerations | Conversation regions have semantic headings, new prompts are announced without focus theft, controls are keyboard-operable, and progress is not color-only. |
| Analytics events | `business_interview.prompt_viewed`, `business_interview.answer_saved`, `business_interview.supporting_info_opened`, `business_interview.paused`, `business_interview.completed`, `business_interview.failed`. |
| Persistence expectations | Raw answers, draft normalized values, and progress resume safely; drafts remain distinguishable from reviewed/published Business DNA. |
| Ownership boundary | Core Platform. |

### 5.7 Review Answers

| Concern | Canonical experience |
|---|---|
| User goal | Confirm, correct, or complete what the platform understood before analysis. |
| Platform goal | Preserve human control and resolve material gaps, conflicts, and uncertain inferences before publication/analysis. |
| Required information | Answers, inferred candidate information, source/provenance summaries, assumptions, conflicts, and incomplete required areas. |
| Primary action | Confirm and analyze. |
| Secondary action | Edit an answer, return to interview, save and exit, or request clarification. |
| Navigation rules | Editing returns to the relevant conversational point and then back to review; unresolved required items block analysis with explanation. |
| Loading state | Review model preparation uses a skeleton/status while retaining stage context. |
| Empty state | If there is nothing reviewable, explain whether the interview is incomplete or analysis can proceed. |
| Error state | A failed correction or review load preserves confirmed content and offers retry; conflicts remain visible. |
| Success state | The customer sees a confirmed review summary and analysis starts once. |
| Permission considerations | Review access and publication/analysis authority may differ; the owning Core boundary makes the final decision. |
| Localization considerations | Localized labels and source explanations; entered values remain unmodified; comparisons work in both directions. |
| Accessibility considerations | Structured sections, error summary, programmatic change indicators, keyboard edit links, and focus return to corrected content. |
| Analytics events | `business_review.viewed`, `business_review.answer_edited`, `business_review.confirmed`, `business_review.blocked`, `business_review.failed`. |
| Persistence expectations | Review dispositions and corrections are preserved with the session; they do not overwrite history silently. |
| Ownership boundary | Core Platform. |

### 5.8 Analysis

| Concern | Canonical experience |
|---|---|
| User goal | Understand that the platform is analyzing the reviewed Business and know what happens next. |
| Platform goal | Run deterministic, version-aware analysis against reviewed inputs and prepare the Business Blueprint. |
| Required information | Reviewed Business context, applicable Business DNA snapshot/candidates, governed capabilities, Knowledge, Rules, and analysis version context. |
| Primary action | Usually none while active; continue to Blueprint when complete. |
| Secondary action | Leave safely, view what is being analyzed, retry a failed analysis, or return to review when correction is required. |
| Navigation rules | Completion routes to Business Blueprint; refresh/resume returns to current analysis state; failure never republishes answers silently. |
| Loading state | Meaningful staged progress, expected next outcome, and non-fabricated status; avoid indefinite decorative spinners. |
| Empty state | If analysis is not required or no analyzable input exists, explain the required previous action. |
| Error state | Distinguish validation-required, temporary unavailable, blocked, and retryable analysis outcomes with safe recovery. |
| Success state | Analysis completion is acknowledged and the Business Blueprint opens. |
| Permission considerations | Viewing progress requires selected Business access; starting/retrying analysis requires the applicable Core permission and owner validation. |
| Localization considerations | Localized status and failure messages; no hidden English-only reasoning; source Business content stays as entered. |
| Accessibility considerations | `aria-live` progress used sparingly, motion-reduction support, readable status steps, and keyboard-accessible leave/retry actions. |
| Analytics events | `business_analysis.started`, `business_analysis.progress_viewed`, `business_analysis.completed`, `business_analysis.failed`, `business_analysis.retry_selected`. |
| Persistence expectations | Analysis status and pinned input/version references survive interruption; completed results are traceable and not recomputed on every render. |
| Ownership boundary | Core Platform. |

### 5.9 Business Blueprint

| Concern | Canonical experience |
|---|---|
| User goal | See a clear, trustworthy picture of the Business and an understandable path forward. |
| Platform goal | Turn analyzed Business understanding into the main customer-facing onboarding result without duplicating canonical ownership. |
| Required information | Business DNA projection, summary, needs, challenges, opportunities, readiness indicators, capability fit, and implementation roadmap. |
| Primary action | Continue to Recommendations. |
| Secondary action | Review a section, return to correct source information, save/print/share only if separately supported, or return later. |
| Navigation rules | Corrections route through the governed review flow; returning after completion reopens the current Blueprint for the selected Business. |
| Loading state | Section skeletons and source-status indicators; partial source failure is explicit rather than silently omitted. |
| Empty state | Missing required analysis routes to the specific incomplete/failed stage; optional sections explain unavailable evidence. |
| Error state | Preserve successfully composed sections, identify unavailable sections, and provide retry or correction paths. |
| Success state | All required Blueprint sections are readable and the Recommendations action is available. |
| Permission considerations | Business-scoped access is required; sensitive sections follow least privilege and data minimization. |
| Localization considerations | Fully localized presentation while user-entered Business data remains as entered; print/long-form layouts support RTL/LTR. |
| Accessibility considerations | Landmark/heading hierarchy, summary before detail, accessible readiness indicators, text alternatives for visuals, and keyboard section navigation. |
| Analytics events | `business_blueprint.viewed`, `business_blueprint.section_viewed`, `business_blueprint.correction_selected`, `business_blueprint.recommendations_selected`, `business_blueprint.failed`. |
| Persistence expectations | The view is reproducible from versioned owner inputs; presentation preferences do not become Business DNA. |
| Ownership boundary | Core Platform presentation; source facts retain their canonical Core owners. |

### 5.10 Recommendations

| Concern | Canonical experience |
|---|---|
| User goal | Understand practical next steps and choose what to act on without pressure. |
| Platform goal | Present explainable business improvements and capability needs after the Blueprint, then optional implementation options. |
| Required information | Completed analysis/Decision context, evidence, rationale, assumptions, alternatives, risks, confidence, expected benefit, and applicable options. |
| Primary action | Review or accept a next step, then continue to plan/access choice. |
| Secondary action | Defer, reject, compare, ask why, return to Blueprint, or continue without selecting an option. |
| Navigation rules | Product/plan options never precede the business reason; disposition preserves return to the same recommendation and selected Business. |
| Loading state | Recommendation skeletons retain category/context; explanation loads with the item rather than appearing as an afterthought. |
| Empty state | “No recommendation yet” explains whether more Business information, analysis, or time is needed and still permits available-access continuation. |
| Error state | Partial feed failure identifies affected items/sources and offers retry; it does not invent fallback recommendations. |
| Success state | Customer disposition is acknowledged and the plan/access continuation is clear. |
| Permission considerations | Viewing/disposition is Business-scoped; acceptance does not itself authorize a purchase, configuration, or OS operation. |
| Localization considerations | Rationale and risks are localized without changing source meaning; confidence/impact labels are culturally and directionally clear. |
| Accessibility considerations | Cards expose name, reason, priority, confidence, and actions semantically; comparison and disclosure controls are keyboard/screen-reader usable. |
| Analytics events | `recommendations.viewed`, `recommendation.explanation_viewed`, `recommendation.accepted`, `recommendation.deferred`, `recommendation.rejected`, `recommendations.failed`. |
| Persistence expectations | Recommendation identity, source context, and disposition remain separate from Business DNA and Blueprint presentation state. |
| Ownership boundary | Core Platform Recommendation Engine and Core experience. |

### 5.11 Plan Selection or Continue with available access

| Concern | Canonical experience |
|---|---|
| User goal | Choose an appropriate commercial next step or continue with access already available. |
| Platform goal | Preserve customer control while distinguishing recommendation, plan, subscription, readiness, permission, and operational access. |
| Required information | Approved Product/Plan presentation, applicable recommendation, current entitlement/subscription/access projection, and actor authorization context. |
| Primary action | Select/confirm an eligible plan, or continue with available access. |
| Secondary action | Compare options, defer purchase, return to Recommendations, or contact support/sales where required. |
| Navigation rules | The branch is driven only by an approved owner projection; no generic “onboarding complete” or legacy `OSEnablement` assumption defines it. |
| Loading state | Commercial/access state resolves before an irreversible action is enabled; stale state is labeled. |
| Empty state | If no plan is eligible and no access exists, explain the constraint and offer a non-destructive recovery path. |
| Error state | Purchase/state refresh failures retain the selection and distinguish retryable failure from ineligibility or lost permission. |
| Success state | The chosen continuation is acknowledged and Core Workspace Setup opens. |
| Permission considerations | Viewing may be broad, but purchase/subscription management requires explicit Core commercial permission; access still requires membership and readiness. |
| Localization considerations | Localized plan descriptions and terms; currency/number representation follows approved policy and never changes canonical monetary meaning. |
| Accessibility considerations | Comparable plan structure, no visual-only “recommended” signal, keyboard selection, clear terms, and announced confirmation/error. |
| Analytics events | `plan_access.viewed`, `plan_access.option_compared`, `plan_access.plan_selected`, `plan_access.available_access_selected`, `plan_access.failed`. |
| Persistence expectations | Draft selection can survive navigation; confirmed commercial state remains owner-provided and is not inferred from the UI. |
| Ownership boundary | Core Platform commercial control and Product Hub composition. |

### 5.12 Workspace Setup

| Concern | Canonical experience |
|---|---|
| User goal | Confirm the Core platform context and preferences needed to use the Workspace. |
| Platform goal | Prepare the Core shell without collecting Commerce domain configuration or implying OS readiness. |
| Required information | Selected Workspace/Business context, applicable memberships/access orientation, supported localization preferences, and approved platform settings. |
| Primary action | Finish Workspace setup and enter Platform Dashboard. |
| Secondary action | Save and exit, review prior Business results, or defer optional settings. |
| Navigation rules | Completion opens Platform Dashboard; Commerce setup is never embedded here; optional settings cannot block access without an approved requirement. |
| Loading state | Existing context and settings resolve with field-level status. |
| Empty state | Minimal defaults and an explanation of what can be changed later. |
| Error state | Failed optional saves do not falsely complete; required-setting failures preserve input and offer retry. |
| Success state | Core platform context is ready and the Platform Dashboard opens. |
| Permission considerations | Workspace-level changes require the applicable permission; personal presentation preferences remain distinct from Workspace defaults. |
| Localization considerations | Language/direction are usable immediately; unresolved preference precedence is not guessed; Business data stays as entered. |
| Accessibility considerations | Logical form grouping, clear optional labels, keyboard operation, associated errors, and focus transfer to Dashboard. |
| Analytics events | `workspace_setup.viewed`, `workspace_setup.preference_changed`, `workspace_setup.completed`, `workspace_setup.failed`. |
| Persistence expectations | Confirmed Core settings persist at their approved scope; the experience does not define physical storage or preference precedence. |
| Ownership boundary | Core Platform. |

### 5.13 Platform Dashboard

| Concern | Canonical experience |
|---|---|
| User goal | See the Workspace's current platform status and the most relevant next action. |
| Platform goal | Provide a stable Core home before any OS launch and orient the customer to Blueprint, recommendations, Product Hub, access, and account administration. |
| Required information | Authorized Core context and read-only owner projections appropriate to the active Workspace/Business. |
| Primary action | Open Product Hub or resume the most important Core next step. |
| Secondary action | Open Blueprint, Recommendations, users/access, billing, settings, notifications, profile, or another authorized Core surface. |
| Navigation rules | Accessible after Core onboarding without requiring Commerce setup; unavailable projections degrade independently; context changes re-resolve authorization. |
| Loading state | Shell and cards expose localized skeleton/status independently; navigation remains stable. |
| Empty state | New Workspace guidance prioritizes Business Architect/Blueprint/Product Hub rather than showing an empty operational dashboard. |
| Error state | Component-level recovery avoids taking down the shell; unauthorized and stale-context states are explicit. |
| Success state | The customer understands current status and can reach Product Hub or another authorized Core task. |
| Permission considerations | Every card/action follows least privilege; summaries do not expose unauthorized Business or Commerce facts. |
| Localization considerations | All shell/content messages translate; layout and charts support RTL/LTR; locale-aware display follows approved policy. |
| Accessibility considerations | Skip links, landmark hierarchy, predictable focus, accessible status cards/charts, responsive zoom, and non-color-only state. |
| Analytics events | `platform_dashboard.viewed`, `platform_dashboard.primary_action_selected`, `platform_dashboard.context_changed`, `platform_dashboard.projection_failed`. |
| Persistence expectations | Dashboard is a reconstructable composition; it does not become the owner of displayed facts. |
| Ownership boundary | Core Platform. |

### 5.14 Product Hub

| Concern | Canonical experience |
|---|---|
| User goal | Discover relevant capabilities/products, understand access/readiness, and launch or set up an eligible OS. |
| Platform goal | Compose Business-context recommendations, implementation options, commercial/access state, and owner readiness without taking their ownership. |
| Required information | Selected Business context, recommendations/options, Product/Plan metadata, access/subscription projections, setup/activation/readiness projections, and permissions. |
| Primary action | Launch an enabled and ready product, or begin/resume the owning OS setup through handoff. |
| Secondary action | Review recommendation rationale, compare plan, resolve access, return to Dashboard, or retry a failed projection. |
| Navigation rules | Product Hub owns selection and routing; Commerce owns `/setup` and operational routes; launch failure returns to an explainable Core recovery path. |
| Loading state | Each owner projection resolves independently with stale/partial status; no fabricated readiness. |
| Empty state | Explain why no product is currently relevant/available and preserve Core access; do not force a product choice. |
| Error state | Partial owner failure is isolated, source/staleness is clear, and retry does not duplicate a commercial or setup action. |
| Success state | The selected action resolves to an owner-approved launch/setup handoff or remains safely in Product Hub with confirmation. |
| Permission considerations | Product visibility, purchase, setup initiation, and operational launch may require different permissions and lifecycle conditions. |
| Localization considerations | Capability reason precedes software labels; product/plan copy translates; owner content retains meaning and direction. |
| Accessibility considerations | Product cards expose state and action text semantically, comparison is keyboard-operable, and status is not color-only. |
| Analytics events | `product_hub.viewed`, `product_hub.option_viewed`, `product_hub.setup_selected`, `product_hub.launch_selected`, `product_hub.launch_failed`. |
| Persistence expectations | Product Hub state is a reconstructable projection plus customer selection state; source owners retain canonical records. |
| Ownership boundary | Core Platform owns the Hub and handoff initiation; it does not own Commerce setup or operations. |

### 5.15 Commerce launch when enabled

| Concern | Canonical experience |
|---|---|
| User goal | Enter Commerce setup or daily operations with the correct authorized context. |
| Platform goal | Complete a context-preserving owner handoff without transferring Core identity or Commerce operational ownership. |
| Required information | Re-resolved actor, Workspace, Business, applicable Business Unit/Branch, Commerce product/access/readiness, locale, action, and safe return context. |
| Primary action | Continue Commerce setup or open Commerce Dashboard, according to owner-approved state. |
| Secondary action | Return to Product Hub, recover access/setup, or retry a rejected/expired handoff. |
| Navigation rules | Core initiates the handoff; Commerce validates destination state and owns its routes. Missing, stale, rejected, or unavailable context returns to a safe Core recovery path. |
| Loading state | Commerce resolves handoff/context before operational content appears; no fallback identity is created. |
| Empty state | Missing setup/access explains the required next Commerce-owned step instead of showing an empty Dashboard. |
| Error state | Rejected, expired, unauthorized, unavailable, or incomplete context is explicit and does not mutate Core or Commerce facts as fallback. |
| Success state | The customer reaches Commerce `/setup` or `/dashboard` with valid owner context. |
| Permission considerations | Core authentication/context is necessary but not sufficient; Commerce enforces its own permissions, resource scope, and operational invariants. |
| Localization considerations | Locale/direction context is preserved as presentation context; Commerce owns its messages and operational meaning. |
| Accessibility considerations | Handoff/loading/recovery states are announced, focus lands on the destination heading, and return actions are keyboard-operable. |
| Analytics events | `commerce_handoff.started`, `commerce_handoff.accepted`, `commerce_handoff.rejected`, `commerce_setup.opened`, `commerce_dashboard.opened`. |
| Persistence expectations | Core and Commerce preserve only their owned state; handoff context is not permanent authorization and the current browser seam is not a future backend contract. |
| Ownership boundary | Boundary crossing: Core Platform owns launch/handoff initiation; Commerce owns setup, operational behavior, UI, and persistence. |

## 6. Open Questions

The following questions are genuinely unresolved and must not be answered implicitly by frontend
implementation:

1. **Business identity placement:** ADR-016 requires one selected canonical Business before a
   Business Architect session. The target journey does not yet decide whether Business creation or
   selection is a distinct screen or a bounded step inside Business Architect Introduction. The
   current legacy `BusinessUnit`-as-`Business` frontend behavior must not be promoted as the answer.
2. **Plan/access branch criteria:** The exact owner projection that decides “select a plan” versus
   “continue with available access” remains dependent on the approved commercial/access lifecycle.
   ADR-023 explicitly does not define a successor to legacy `OSEnablement`.
3. **Blueprint portability:** Export, print, share, and historical comparison are not confirmed for
   the first Business Blueprint slice. The initial experience can remain view-only until product,
   privacy, and version-history requirements are approved.

## 7. Verified Against

This document was verified against:

- `docs/00-governance/PRODUCT-DECISIONS.md` and Accepted ADRs 001–005, 012–020, 023–025,
  034–037, 040, plus proposed ADR-041 only as non-authoritative context;
- `docs/01-genesis/03-BUSINESS-DNA.md`, `06-BUSINESS-BRAIN.md`,
  `07-RECOMMENDATION-ENGINE.md`, `09-PLATFORM-BLUEPRINT.md`,
  `11-CUSTOMER-JOURNEY.md`, `12-WORKSPACE-LIFECYCLE.md`, and `14-SUBSCRIPTION-MODEL.md`;
- `docs/02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md`, `03-DOMAIN-MODEL.md`,
  `04-DATA-OWNERSHIP.md`, `05-PERMISSION-MODEL.md`, and `12-CORE-PLATFORM-ROADMAP.md`;
- `docs/08-implementation-audit/FRONTEND-CODE-RECONCILIATION-AUDIT-v1.0.md`;
- `docs/11-execution/05-FRONTEND-FIRST-POLICY.md`, `06-MOCK-DATA-STANDARD.md`, and
  `12-ENGINEERING-ROADMAP.md`;
- `docs/90-architecture-audit/00-EXECUTIVE-SUMMARY.md`, `04-IMPLEMENTATION-VERIFICATION.md`,
  `05-GAP-ANALYSIS.md`, and `15-EXECUTION-SCOPE-DECISION.md`;
- `specs/052-frontend-repository-foundation/` through
  `specs/055-commerce-order-command-boundary/`;
- current route and shell sources under `apps/landing/src/`, `apps/core-platform/`, and
  `apps/commerce/`; and
- current frontend compatibility boundaries under `packages/contracts/` and `packages/sdk/`.
