# Feature Specification: Onboarding Architecture v2

**Feature Branch**: `051-onboarding-architecture-v2`  
**Created**: 2026-07-02  
**Status**: Draft  
**Input**: User description: "Spec 049 - Onboarding Architecture v2"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete Core Onboarding Without Commerce Coupling (Priority: P1)

A new owner registers or logs in, chooses language preferences, creates a Workspace, creates the first Business, and arrives at Product Hub without being forced into Commerce setup or any single Operating System.

**Why this priority**: This is the foundation of NexoraXS as a Business Operating Platform. Core onboarding must be simple, generic, and reusable for all current and future Operating Systems.

**Independent Test**: Can be fully tested by completing Register/Login through Product Hub and confirming that the user created exactly one Workspace and one Business while no Commerce setup data was required.

**Acceptance Scenarios**:

1. **Given** a new user has registered or logged in, **When** they select a language, **Then** the experience reflects the correct direction, date format, and number format for that language.
2. **Given** a user is creating a Workspace, **When** they select a country, **Then** currency and timezone are suggested from the country while remaining editable.
3. **Given** a user has entered Workspace and Business information, **When** they finish Core onboarding, **Then** they land in Product Hub and no Commerce-specific setup step has been required.

---

### User Story 2 - Launch Commerce From Product Hub With Independent Subscription and Enablement (Priority: P1)

A Workspace owner uses Product Hub as the single entry point for Operating Systems, selects Commerce OS for an active Business, chooses a plan, and starts Commerce setup with a clear separation between the Workspace subscription and the Business activation.

**Why this priority**: Product Hub must become the Operating System entry point, and the platform must separate what the Workspace buys from where an Operating System is used.

**Independent Test**: Can be tested by launching Commerce OS from Product Hub and confirming that choosing a plan creates an OS Subscription while launching setup creates an OS Enablement for the selected Business.

**Acceptance Scenarios**:

1. **Given** a Workspace has at least one Business, **When** the user opens Product Hub, **Then** they can see Workspace, Businesses, Operating Systems, statuses, and quick actions.
2. **Given** a user chooses a Commerce plan, **When** the choice is confirmed, **Then** an OS Subscription exists for Commerce at Workspace level.
3. **Given** a Commerce subscription exists, **When** the user launches Commerce for a Business, **Then** an OS Enablement exists for that Business and setup continues inside Commerce OS.

---

### User Story 3 - Configure Commerce With Business-Owned Setup and Branch Operational Scope (Priority: P1)

A Workspace owner configures Commerce OS for a Business by confirming business identity, choosing or overriding the suggested Commerce Preset, creating or selecting the Main Branch, entering tax settings, reviewing generated configuration, and launching the Commerce Dashboard.

**Why this priority**: Commerce setup must own Commerce-specific configuration without making Branch the owner of setup or pushing Commerce logic into Core Platform.

**Independent Test**: Can be tested by completing Commerce setup for one Business and verifying that Commerce setup belongs to the Business, the Main Branch provides operational scope, and generated defaults are available without manual setup.

**Acceptance Scenarios**:

1. **Given** a Business has an Activity, **When** Commerce setup begins, **Then** the Commerce Preset is suggested from that Activity and the user may override it.
2. **Given** a user enters billing identity and branch details, **When** setup is saved, **Then** Billing Address is treated as legal identity and Branch Address is treated as operational location.
3. **Given** setup is reviewed and launched, **When** the Commerce Dashboard opens, **Then** it uses the selected Workspace, Business, Branch, plan, preset, tax, templates, and numbering context.

---

### User Story 4 - Support Future Multi-Business and Multi-OS Growth (Priority: P2)

A Workspace owner can add additional Businesses and later enable one or more Operating Systems independently, without re-entering shared Workspace data or creating cross-OS dependencies.

**Why this priority**: The onboarding architecture must scale beyond the first Commerce MVP to multiple Businesses and independent Operating Systems.

**Independent Test**: Can be tested by adding another Business in the same Workspace and confirming that Product Hub can show OS status and launch actions per Business.

**Acceptance Scenarios**:

1. **Given** a Workspace has multiple Businesses, **When** Product Hub is opened, **Then** the user can choose or understand the active Business context before launching an Operating System.
2. **Given** an OS Subscription already exists for the Workspace, **When** the same OS is launched for another Business, **Then** the platform can reuse the existing subscription while creating a separate enablement for that Business.
3. **Given** future Operating Systems are displayed, **When** a user selects one, **Then** that OS owns its own subscription, setup, configuration, and dashboard experience.

### Edge Cases

- If a user leaves onboarding before completing Business creation, they must resume at the missing Core step rather than be sent to Product Hub.
- If a country has no known currency or timezone default, the system must present a safe generic default and allow user override.
- If a Workspace has no Business, Product Hub must prompt the user to create a Business before launching an Operating System.
- If a Business has no Main Branch, Commerce may begin setup but the Business cannot become operationally active until one Main Branch exists.
- If Business Activity is changed before Commerce setup is launched, the preset suggestion must reflect the latest Activity.
- If the user overrides a Commerce Preset, the override must be preserved and used for generated defaults.
- If the same Branch name is used under different Businesses, it is allowed because Branch names are scoped to a Business.
- If a billing address differs from a branch address, both values must be preserved separately.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Core onboarding MUST consist of Welcome + Language, Create Workspace, Create Business, and Product Hub entry.
- **FR-002**: The Welcome step MUST collect language and configure direction, date format, and number format from the selected language.
- **FR-003**: The Create Workspace step MUST collect Workspace Name, Country, Currency, and Timezone.
- **FR-004**: Country MUST be the source of truth for default Currency and Timezone suggestions, and users MUST be able to override Currency and Timezone.
- **FR-005**: Core Workspace creation MUST NOT require Business, Branch, Commerce, preset, tax, products, inventory, POS, order, invoice, or report information.
- **FR-006**: The Create Business step MUST collect Business Name and Business Activity.
- **FR-007**: The platform MUST display Business to users while preserving BusinessUnit as the internal entity concept.
- **FR-008**: Business Activity MUST be used only for recommendation, OS suggestion, and preset suggestion purposes.
- **FR-009**: Business Activity MUST NOT force, auto-enable, or restrict an Operating System.
- **FR-010**: Product Hub MUST be the single Core entry point for launching Operating Systems.
- **FR-011**: Product Hub MUST display Workspace, Businesses, Operating Systems, status, and quick actions for Add Business, Add Branch, Enable OS, Invite Members, and Launch Operating System.
- **FR-012**: Selecting an Operating System from Product Hub MUST launch that Operating System's independent onboarding or setup experience.
- **FR-013**: Each Operating System MUST own its subscription flow, setup experience, configuration, and dashboard.
- **FR-014**: Choosing a Commerce plan MUST create an OS Subscription for license and billing purposes only.
- **FR-015**: An OS Subscription MUST be owned by the Workspace and MUST NOT decide which Business or Branch uses the Operating System.
- **FR-016**: Launching an Operating System for a Business MUST create an OS Enablement that records scope, Business assignment, Branch assignment when applicable, and activation status.
- **FR-017**: Commerce OS setup MUST include Choose Plan, Business Identity, Commerce Preset, Branch + Tax, and Review & Launch.
- **FR-018**: Commerce plan choices MUST include Starter, Pro, Business, and Enterprise.
- **FR-019**: Commerce Business Identity MUST inherit Business Name and Business Activity and allow editing Display Name, Legal Name, Logo, Phone, Email, Website, Billing Address, Billing City, Billing Country, Commercial Registration, and Tax Registration.
- **FR-020**: Billing Address MUST be treated as legal identity and MUST remain distinct from Branch Address.
- **FR-021**: Commerce Preset MUST be suggested automatically from Business Activity and MUST be overrideable by the user.
- **FR-022**: Confirmed Commerce Preset MUST generate Categories, Units, Templates, Numbering, Default Reports, and Barcode Rules.
- **FR-023**: Commerce setup MUST allow the user to create or select the Main Branch.
- **FR-024**: Branch + Tax setup MUST collect Branch Name, City, Address, VAT Registered, VAT Number, VAT Rate, and Prices Include VAT.
- **FR-025**: A Business MUST NOT become operationally active until it has one Main Branch.
- **FR-026**: Branch MUST own only operational scope, including operational address, POS, inventory, orders, invoices, reports, transfers, and returns.
- **FR-027**: Commerce Setup MUST belong to Business, not Branch.
- **FR-028**: Commerce Setup MUST own Commerce Preset, Selling Mode, Tax, Templates, Numbering, Categories, Units, and Billing Identity.
- **FR-029**: Review & Launch MUST display Workspace, Business, Branch, Plan, Preset, Selling Mode, Tax, Templates, and Numbering before launch.
- **FR-030**: Launching Commerce MUST automatically create Categories, Units, Invoice Template, Receipt Template, Invoice Numbering, Barcode Rules, and optional sample products according to the confirmed preset.
- **FR-031**: Users MUST be able to reach the Commerce Dashboard after launch without manual configuration of required defaults.
- **FR-032**: Product Hub MUST show the status of OS Subscriptions and OS Enablements separately enough for users to understand whether a product is subscribed, enabled, setup-required, or unavailable.
- **FR-033**: The platform MUST support adding more Businesses under one Workspace without re-entering Workspace data.
- **FR-034**: When an OS Subscription already exists for a Workspace and OS, launching the same OS for another Business SHOULD reuse that subscription unless the user explicitly changes plan.
- **FR-035**: The UI MUST NOT show "BusinessUnit", "Business Unit", "BU", or "Default Business Unit" as user-facing wording.
- **FR-036**: Existing public domain routing expectations MUST remain unchanged: landing site, Core Platform/Product Hub, Commerce OS, storefronts, backend API, and media/CDN each keep their current domain role.

### Key Entities

- **User**: The person registering, logging in, and owning or operating a Workspace.
- **Workspace**: The company or group container that owns members, billing, storage, Businesses, OS Subscriptions, and OS Enablements.
- **Business**: The user-facing brand, activity, or business line inside a Workspace; internally represented by BusinessUnit.
- **Branch**: A physical or operational location under exactly one Business; owns operational address and operational data scope.
- **Operating System**: An independent software product such as Commerce OS, HR OS, CRM OS, Healthcare OS, Gym OS, or Maintenance OS.
- **OS Subscription**: Workspace-level license and billing record for one Operating System, including plan, trial, renewal, and status.
- **OS Enablement**: Operational activation of an Operating System for a Workspace, Business, or Branch scope, including assignment and activation status.
- **Commerce Setup**: Business-owned Commerce configuration covering business identity, preset, selling mode, tax, templates, numbering, categories, units, and billing identity.
- **Commerce Preset**: A suggested starter configuration derived from Business Activity and confirmed or overridden by the user.

## Migration Strategy

- Existing account registration and login remain the entry point; only the post-login onboarding sequence changes.
- Existing Workspace records remain Workspace records and continue to own billing, members, storage, Businesses, subscriptions, and enablements.
- Existing BusinessUnit records remain the internal Business entity; user-facing screens and copy use Business.
- Existing Branch records remain operational records under their Business and are not promoted to setup owners.
- Existing Commerce setup data must be associated with the relevant Business rather than treated as Branch-owned.
- Existing Product Hub setup status should move from "Commerce setup exists" as the only signal to a combined view of OS Subscription, OS Enablement, and setup completion.
- Existing billing and subscription records should be preserved and interpreted as Workspace-level OS Subscriptions.
- Existing Branch operational data, including POS, inventory, orders, invoices, reports, transfers, and returns, must remain scoped to Branch and must not be lost during the onboarding transition.
- Existing user-entered billing identity and address values must be preserved separately from Branch address values.
- Migration validation must compare record counts and relationships before and after transition for Workspaces, Businesses, Branches, Commerce Setups, OS Subscriptions, and OS Enablements.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user can complete Core onboarding from Welcome through Product Hub in under 4 minutes without entering Commerce-specific setup data.
- **SC-002**: At least 95% of tested onboarding attempts create exactly one Workspace and one Business before the user reaches Product Hub.
- **SC-003**: 100% of Commerce launch attempts from Product Hub create or reuse one Workspace-level OS Subscription before Commerce setup continues.
- **SC-004**: 100% of Commerce setup launches for a Business create an OS Enablement linked to that Business before the Commerce Dashboard becomes available.
- **SC-005**: 100% of completed Commerce setups keep Billing Address and Branch Address as separately reviewable values.
- **SC-006**: 100% of completed Commerce launches generate required defaults for categories, units, templates, numbering, and barcode rules without manual setup.
- **SC-007**: Users can add a second Business and launch the same subscribed OS for it without re-entering Workspace country, currency, timezone, or member data.
- **SC-008**: No user-facing screen in the onboarding, Product Hub, or Commerce setup journey displays "BusinessUnit", "Business Unit", "BU", or "Default Business Unit".

## Assumptions

- The target user is a Workspace owner or administrator setting up the first Workspace, first Business, and first Operating System.
- Register and Login already exist and remain outside the scope of this onboarding architecture refactor except for routing into the new flow.
- Product Hub may show future Operating Systems before they are fully available, but each OS remains architecturally independent.
- Commerce OS is the first fully launchable Operating System in the MVP.
- Business Activity values are a recommendation taxonomy, not a licensing or access-control model.
- Branch names are unique only within a Business, not across the entire Workspace.
- A Business may exist before it is operationally active, but operational activity requires one Main Branch.
- The migration is expected to preserve existing mock or persisted records without destructive data loss.
