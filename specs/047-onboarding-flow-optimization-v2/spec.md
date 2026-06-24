# Feature Specification: Target Architecture v2 Alignment

**Feature Branch**: `047-feat/onboarding-flow-optimization-v2`  
**Created**: 2026-06-18  
**Status**: Draft  
**Input**: User description: "Create Spec 047: Target Architecture v2 Alignment. Align the current NexoraXS MVP data model with final target architecture v2.0 by preserving the current Core Platform + Commerce MVP, treating current BusinessUnit as the internal Business entity for now, and adding OSEnablement as the missing relationship layer between workspace-level OS subscriptions and where an OS is actually used."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Owner understands Workspace, Business, Branch, Subscription, and Enablement separation (Priority: P1)

A workspace owner can operate a company/group that contains multiple businesses and branches while the platform clearly separates purchased OS licenses from the actual businesses or branches where each OS is enabled.

**Why this priority**: This protects the final architecture from treating an OS subscription as the same thing as OS usage. It also allows one workspace to subscribe once and enable the OS for one or more businesses or locations without changing the current MVP product flow.

**Independent Test**: Review the architecture state for a workspace with multiple businesses, branches, subscriptions, and enablements; verify each concept has one clear responsibility and that Commerce OS usage is represented through an enablement rather than inferred directly from the subscription.

**Acceptance Scenarios**:

1. **Given** a workspace named Mustafa Group, **When** it owns businesses named Mustafa Fashion, Mustafa Pharmacy, and Mustafa Restaurant, **Then** each business belongs to the same workspace but remains a separate brand/activity/business line.
2. **Given** a workspace has Commerce OS Pro, HR OS Starter, and CRM OS Starter subscriptions, **When** OS usage is inspected, **Then** each subscription represents a purchased license only and does not by itself define which business or branch uses the OS.
3. **Given** Commerce OS is enabled for Mustafa Fashion, Mustafa Pharmacy, and Mustafa Restaurant, **When** usage is inspected, **Then** each enabled usage is represented as an active OS enablement scoped to the relevant business.
4. **Given** HR OS and CRM OS are enabled for the whole workspace, **When** usage is inspected, **Then** each is represented as a workspace-scoped OS enablement.

---

### User Story 2 - Operator keeps Commerce MVP working with BusinessUnit as the internal Business record (Priority: P1)

A Commerce operator continues using the existing MVP without a visual redesign while user-facing language says Business, Store, and Branch, and internal code can continue using BusinessUnit where a full rename would be risky.

**Why this priority**: The architecture alignment must not break working MVP flows. BusinessUnit is a temporary internal name, not a product-language concept, so the user experience can align now while deeper renaming remains optional.

**Independent Test**: Complete the existing Core Platform to Commerce flow and verify the active Commerce business still loads, the branch context remains correct, and no user-facing screen refers to "Default Business Unit" or "Business Unit".

**Acceptance Scenarios**:

1. **Given** Commerce OS has an active current business, **When** Commerce Dashboard, POS, Inventory, Orders, Invoices, Reports, and Settings load, **Then** they continue filtering by the active business and active branch.
2. **Given** a business is shown in the interface, **When** the user reads labels, selectors, cards, or empty states, **Then** the language uses Business, Brand, Activity, Store, Branch, or Location and does not expose internal BusinessUnit naming.
3. **Given** the current data model still contains BusinessUnit internally, **When** the MVP flow runs, **Then** existing data remains compatible and no broad rename is required before this alignment is complete.

---

### User Story 3 - Owner distinguishes industry type from Commerce preset (Priority: P2)

A workspace owner can classify a business by industry while Commerce OS can separately apply a Commerce-specific preset for operational defaults.

**Why this priority**: Industry type describes the business; Commerce preset configures Commerce OS behavior. Mixing them would make future operating systems depend on Commerce-specific concepts and violate OS independence.

**Independent Test**: Inspect a business that has an industry classification and a Commerce setup with a preset; verify the industry belongs to the business and the preset belongs only to Commerce configuration.

**Acceptance Scenarios**:

1. **Given** Mustafa Pharmacy is a business, **When** its classification is inspected, **Then** its industry type describes the business activity independent of any OS.
2. **Given** Commerce OS is enabled for Mustafa Pharmacy, **When** Commerce setup is inspected, **Then** the Commerce preset is stored as Commerce-specific operational metadata.
3. **Given** HR OS or CRM OS is enabled for the workspace, **When** those OS products inspect businesses, **Then** they do not depend on Commerce presets to understand the business.
4. **Given** Mustafa Pharmacy is created in Commerce setup with Activity Type Pharmacy, **When** the setup identity, preset, categories, and review steps render for the first time, **Then** identity fields inherit the business name while empty, the suggested Commerce preset is Pharmacy, categories are pharmacy-related, and review shows Industry Type as Pharmacy.

---

### User Story 4 - Branch names are valid within each Business scope (Priority: P2)

An owner can use the same branch name under different businesses without conflicts, because branches are scoped to their business as well as the workspace.

**Why this priority**: Real groups commonly reuse city or district names across multiple business lines. Workspace-wide branch-name uniqueness would incorrectly block valid structures.

**Independent Test**: Create or inspect branches named Nasr City under Mustafa Fashion and Mustafa Pharmacy and verify both can exist because they belong to different businesses.

**Acceptance Scenarios**:

1. **Given** Mustafa Fashion has a Nasr City branch, **When** Mustafa Pharmacy also has a Nasr City branch, **Then** both branches are valid because uniqueness is scoped to the business.
2. **Given** two branches under the same business attempt to use the same identifying branch name, **When** branch uniqueness is evaluated, **Then** the duplicate is handled within that business scope.
3. **Given** Commerce branch filtering runs, **When** the active business changes, **Then** only branches belonging to the active business are available.

### Edge Cases

- What happens when an existing Commerce subscription has no enablement yet? The platform must create or surface a fallback active enablement for the current Commerce business without breaking existing data.
- What happens when an enablement references a branch that does not belong to its business? The enablement must be treated as invalid until corrected.
- What happens when a business has no branches yet? The business can still exist, but branch-scoped OS workflows must prompt for or require a branch before branch operations begin.
- What happens when an OS is disabled or locked for a business? The business remains in the workspace, but that OS must not be treated as active for that business.
- What happens when older records use preset information as the only business classification? The architecture must preserve those records while treating Commerce preset as Commerce-only going forward.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The platform MUST preserve the hierarchy Workspace -> Business -> Branch, where Workspace means company/group, Business means brand/activity/business line, and Branch means physical location under a Business.
- **FR-002**: Workspace MUST remain the owner of users/members, businesses, OS subscriptions, storage, and billing.
- **FR-003**: Business MUST belong to exactly one Workspace and MUST carry a user-facing name and an industry type.
- **FR-004**: The current internal BusinessUnit concept MAY continue representing Business until a safe broader rename is planned.
- **FR-005**: User-facing language MUST use Business, Brand, Activity, Store, Branch, or Location and MUST NOT show "BusinessUnit", "Business Unit", "BU", or "Default Business Unit".
- **FR-006**: Branch MUST belong to exactly one Workspace and exactly one Business.
- **FR-007**: Branch names MUST be allowed to repeat across different Businesses in the same Workspace.
- **FR-008**: Branch-name uniqueness, when enforced, MUST be scoped to the Business rather than the whole Workspace.
- **FR-009**: OSSubscription MUST belong to a Workspace and represent the purchased license, including OS identity, plan, and subscription status.
- **FR-010**: OSSubscription MUST NOT be the sole source of truth for where an OS is used.
- **FR-011**: The platform MUST introduce OSEnablement as the relationship that connects an OS subscription to its actual usage scope.
- **FR-012**: OSEnablement MUST support workspace, business, and branch scopes.
- **FR-013**: OSEnablement MUST identify the Workspace, OS, OS subscription, optional Business, optional list of Branches, lifecycle status, and creation/update timestamps.
- **FR-014**: OSEnablement status MUST distinguish active usage from disabled or locked usage.
- **FR-015**: A business-scoped OSEnablement MUST reference a Business in the same Workspace as its OS subscription.
- **FR-016**: A branch-scoped OSEnablement MUST reference only Branches that belong to the referenced Business and Workspace.
- **FR-017**: Existing Commerce OS subscriptions MUST have a compatible active OSEnablement for the current Commerce business after alignment.
- **FR-018**: Commerce OS MUST continue reading the current business through the existing active business context while also being compatible with OSEnablement.
- **FR-019**: Commerce branch filtering MUST continue to use the active business so branches from other businesses are not shown in Commerce workflows.
- **FR-020**: Industry Type MUST belong to Business and describe business classification independently of any OS.
- **FR-021**: Commerce Preset MUST remain Commerce-only operational metadata and MUST NOT replace Industry Type.
- **FR-022**: The current Core Platform + Commerce MVP flow MUST remain functional after the alignment.
- **FR-023**: The alignment MUST NOT introduce backend work, microservices, or runtime dependencies on design-prototype documentation.
- **FR-024**: Storage access rules MUST remain unchanged: pages and components MUST continue using the shared data access layer rather than reading browser storage directly.
- **FR-025**: Architecture documentation MUST explain the temporary mapping: internal BusinessUnit equals product-language Business, and OSEnablement is the subscription-to-usage link.
- **FR-026**: Commerce setup MUST store the selected Industry / Activity Type immediately on the Business record as `industryType` and MUST NOT store it directly as the Commerce preset.
- **FR-027**: Commerce setup MUST use Business `industryType` as the source for suggested Commerce preset, generated categories, generated document templates, tax recommendations, and future inventory defaults.
- **FR-028**: Commerce setup MUST use Business name as the source for Business display name and Legal business name only while those identity fields are empty and unmodified by the user.
- **FR-029**: If Industry / Activity Type changes before setup completion, Commerce setup MUST refresh generated preset, categories, templates, and tax recommendations only for fields that have not been manually edited.
- **FR-030**: Commerce setup MUST map Industry / Activity Type to Commerce preset suggestions as follows: pharmacy -> pharmacy, retail -> retail_store, supermarket -> supermarket, restaurant -> restaurant_cafe, electronics -> electronics_mobile, fashion -> clothing_fashion, cosmetics -> cosmetics, medical_supplies -> medical_supplies, other -> retail_store.
- **FR-031**: Commerce setup MUST NOT mark generated identity, preset, category, template, or tax fields as manually edited during initial hydration; only direct user edits after screen load may mark those fields manual.
- **FR-032**: Core workspace onboarding MUST show a Location & Defaults section with three equal-width smart cards for Country, Currency, and Timezone.
- **FR-033**: Core workspace onboarding MUST treat Country as the source of truth for location defaults and MUST NOT show Region in the UI.
- **FR-034**: Core workspace onboarding MUST derive Currency and Timezone from the selected Country, while preserving user overrides for Currency or Timezone after those fields are manually changed.
- **FR-035**: Workspace MAY persist an optional Region for compatibility; existing workspaces without Region MUST continue to load and operate normally.
- **FR-036**: Core workspace onboarding location cards MUST be visually distinct: Country uses a CSS country flag plus country name, Currency uses a currency symbol plus currency code/name, and Timezone uses a clock/time visual plus city, GMT offset, and IANA timezone.
- **FR-037**: City fields in Commerce setup MUST start empty, MUST NOT prefill a city, and MAY show country-scoped city options from the selected Workspace or setup country while remaining optional.

### Key Entities *(include if feature involves data)*

- **Workspace**: Company or group account that owns members, businesses, OS subscriptions, billing, and storage.
- **Business**: Brand, activity, or business line inside a workspace; currently represented internally by BusinessUnit and classified by industry type.
- **Branch**: Physical location under a business; branch names are unique only within their business scope when uniqueness is required.
- **OSSubscription**: Workspace-owned purchased license for an operating system and plan.
- **OSEnablement**: Relationship that states where a subscribed OS is actually used: workspace-wide, on a business, or on selected branches.
- **Industry Type**: Business-level classification such as pharmacy, fashion, restaurant, or other industry category.
- **Commerce Preset**: Commerce-only operational template that seeds or recommends Commerce behavior without defining the business itself.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of active Commerce MVP workspaces have an active Commerce OS enablement for their current business after alignment.
- **SC-002**: A sample workspace with three businesses, repeated branch names, three OS subscriptions, and five OS enablements can be represented without ambiguity.
- **SC-003**: Zero user-facing screens introduced or touched by this alignment display "BusinessUnit", "Business Unit", "BU", or "Default Business Unit".
- **SC-004**: Commerce workflows continue to show only branches for the active business in 100% of branch selectors and branch-scoped views.
- **SC-005**: Industry type and Commerce preset can be inspected independently for a Commerce-enabled business.
- **SC-006**: Existing MVP onboarding, Product Hub, Commerce setup, Commerce Dashboard, POS, Inventory, Orders, Invoices, Reports, and Settings remain usable after alignment.
- **SC-007**: No backend service, database migration, or microservice deployment is required to complete this MVP alignment.

## Assumptions

- This feature aligns the local/demo MVP architecture first; production backend alignment will be specified separately.
- BusinessUnit remains the internal code name for Business until a dedicated safe-rename effort is approved.
- Existing stored MVP data must be preserved through compatibility fallbacks rather than wiped.
- Commerce OS is the only fully active OS in the MVP; future OS products may still be represented for architecture readiness.
- Commerce preset values already present in existing Commerce records remain valid as Commerce metadata, not as the canonical business classification.
