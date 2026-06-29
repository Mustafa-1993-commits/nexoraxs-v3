# Feature Specification: Business-Level Commerce Setup, Address Separation, and Business Resources

**Feature Branch**: `047-feat/onboarding-flow-optimization-v2`
**Created**: 2026-06-25
**Status**: Draft
**Input**: User description: "048-business-commerce-setup-addresses - Business-Level Commerce Setup + Address Separation + Business Resources"

## User Scenarios & Testing

### User Story 1 - Commerce setup is business-level (Priority: P1)

As a workspace owner configuring Commerce OS, I need Commerce setup to apply to the selected Business, not to a single Branch, so multiple branches under the same business can share identity, tax, presets, templates, and defaults.

**Why this priority**: This is the core architecture correction for Spec 048 and prevents branch-level data from becoming the source of truth for business-wide Commerce configuration.

**Independent Test**: Create or select a Business with one or more Branches, complete Commerce setup, and verify the setup is associated with the Business while Branch data remains operational context only.

**Acceptance Scenarios**:

1. **Given** Workspace "Mustafa Group" has Business "Mustafa Fashion" and Branch "Nasr City Branch", **When** Commerce setup is completed, **Then** the setup is saved for "Mustafa Fashion" and not exclusively for "Nasr City Branch".
2. **Given** a Business has multiple Branches, **When** Commerce identity, tax, templates, categories, and numbering are reviewed, **Then** those values are treated as shared Business-level Commerce configuration.
3. **Given** Branch information is shown in POS or operational context, **When** Commerce setup identity is displayed, **Then** the Business name and Branch name remain separate and are not concatenated.

---

### User Story 2 - Addresses are separated by ownership and purpose (Priority: P1)

As an operator, I need Workspace Address, Business Billing Address, and Branch Address to be distinct concepts, so legal documents, platform account data, and operational locations do not overwrite or confuse each other.

**Why this priority**: Existing ambiguous address labels can cause invoice, receipt, branch, and workspace information to be mixed incorrectly.

**Independent Test**: Review or complete setup with separate Workspace, Business Billing, and Branch address values and verify each appears only in its appropriate context.

**Acceptance Scenarios**:

1. **Given** Business Billing Address is present, **When** invoices or tax documents render business identity, **Then** they use the Business Billing Address as the legal/business document address.
2. **Given** Branch Address is present, **When** POS or branch context renders operational location, **Then** it uses Branch name/address and does not overwrite Business Billing Address.
3. **Given** existing MVP records only contain generic address, city, or country fields, **When** the data is read, **Then** those fields are treated as Billing Address fallback values without breaking existing records.

---

### User Story 3 - Industry Type suggests, but does not force, Commerce Preset (Priority: P1)

As a business owner, I need Industry Type to classify the Business and Commerce Preset to configure Commerce OS separately, so I can accept or change the suggested Commerce setup without corrupting the Business classification.

**Why this priority**: Spec 047 established Industry Type and Commerce Preset as separate concepts; Spec 048 applies that separation to setup behavior.

**Independent Test**: Select a Business Industry Type, observe the suggested Commerce Preset, choose a different preset, and verify both values remain independently stored and displayed.

**Acceptance Scenarios**:

1. **Given** Business "Mustafa Pharmacy" has Industry Type "Pharmacy", **When** the Commerce Preset step opens, **Then** "Pharmacy" is suggested as the recommended preset.
2. **Given** the suggested preset is "Pharmacy", **When** the user chooses "Generic Retail" instead, **Then** Business Industry Type remains "Pharmacy" and Commerce Preset becomes "Generic Retail".
3. **Given** a Commerce Preset has been manually confirmed, **When** Industry Type changes before setup completion, **Then** the system does not overwrite the confirmed preset unless the user confirms a new preset.

---

### User Story 4 - Business-level resources, settings, employees, warehouses, and OS enablement are clarified (Priority: P2)

As a product or engineering stakeholder, I need the ownership boundaries for Business Resources, Business Settings, employees, warehouses, and OSEnablement documented clearly, so future work extends the MVP without creating a second architecture model.

**Why this priority**: These concepts shape future implementation, but most should remain documentation or low-risk type/data alignment in this spec.

**Independent Test**: Review the implementation documentation and current data flow notes to verify every concept has one clear owner and does not contradict Spec 047.

**Acceptance Scenarios**:

1. **Given** Business logo, brand image, certificate, or document asset needs storage, **When** it is described in the architecture, **Then** it is treated as a Business Resource scoped to Business and consuming Workspace storage quota.
2. **Given** users or staff are discussed, **When** Workspace Employees and Business Employees are described, **Then** workspace-level staff and business-level operational staff are not treated as the same concept.
3. **Given** Commerce OS is subscribed at Workspace level, **When** the OS is enabled for a Business, **Then** OSEnablement is described as the bridge from OSSubscription to the actual usage target.
4. **Given** warehouses are future inventory locations, **When** they are documented, **Then** they belong to Business and do not force a warehouse UI into the MVP.

---

### User Story 5 - Existing MVP remains compatible (Priority: P1)

As an existing MVP user, I need current Core Platform and Commerce OS flows to keep working while these architecture alignments are introduced, so the platform does not regress during the transition.

**Why this priority**: This spec is an alignment spec, not a redesign or backend migration.

**Independent Test**: Complete the existing Core onboarding and Commerce setup flow, then verify Product Hub, Commerce Dashboard, POS, receipts/invoices, branch context, and business identity still work.

**Acceptance Scenarios**:

1. **Given** the current MVP uses BusinessUnit internally, **When** user-facing screens are touched, **Then** labels say Business, Store, Activity, Branch, or Location and never show "Default Business Unit".
2. **Given** current mock storage data exists, **When** the feature is loaded, **Then** existing local/session storage behavior is preserved and no data is wiped automatically.
3. **Given** Commerce setup is completed, **When** the user launches Commerce Dashboard, **Then** current business identity and branch context still render correctly.

### Edge Cases

- Existing Commerce setup records only have generic `address`, `city`, or `country` fields; these must be interpreted as Business Billing Address fallbacks until safely renamed.
- A Business has multiple Branches with different operational addresses but one shared Commerce setup.
- A user chooses a Commerce Preset that differs from the suggested preset derived from Industry Type.
- OSSubscription exists for the Workspace but no OSEnablement exists yet; the MVP must continue working through current Business compatibility while remaining ready for OSEnablement.
- Billing Address is missing; invoices and receipts must fall back gracefully without treating Branch Address as the primary legal address unless no better value exists.
- Multiple Businesses under the same Workspace may have Branches with the same display name; Branch uniqueness remains scoped to Business.
- Existing media assets and product images must remain valid and must not be duplicated into order, invoice, or document payloads.
- Existing Workspace, BusinessUnit, Branch, CommerceSetup, and MediaAsset records may lack new optional fields and must remain readable.

## Requirements

### Functional Requirements

- **FR-001**: Spec 048 MUST reference Spec 047 as the source of truth for Target Architecture v2.0 and MUST NOT contradict it.
- **FR-002**: The system MUST treat CommerceSetup as Business-level configuration scoped by Workspace and Business/BusinessUnit, not as Branch-owned configuration.
- **FR-003**: Branch MUST remain the owner of operational execution concerns such as physical location, POS activity, sales/orders context, inventory/stock context, and branch-specific future overrides.
- **FR-004**: The platform MUST distinguish Workspace Address, Business Billing Address, and Branch Address as separate concepts with separate purposes.
- **FR-005**: User-facing labels SHOULD use purpose-specific wording such as Billing Address, Billing City, Billing Country, Branch Address, and Branch City where meaning matters.
- **FR-006**: Receipts, invoices, and tax documents MUST use Business Billing Address as the default legal/business address when available.
- **FR-007**: POS and operational branch context MUST use Branch name/address separately from Business Billing Address.
- **FR-008**: Existing CommerceSetup address, city, and country fields MUST remain compatible and be interpreted as Business Billing Address fallback values until renamed safely.
- **FR-009**: Business Industry Type MUST belong to the Business/BusinessUnit and MUST remain separate from Commerce Preset.
- **FR-010**: Commerce Preset MUST belong to CommerceSetup and MUST control only Commerce-specific defaults such as categories, units, templates, numbering, and recommendations.
- **FR-011**: Industry Type MUST drive a Commerce Preset suggestion, not a forced preset application.
- **FR-012**: Commerce Preset selection MUST follow Suggestion -> User Confirmation -> Apply.
- **FR-013**: A user MUST be able to confirm the suggested preset or choose a different Commerce Preset without changing Business Industry Type.
- **FR-014**: A manually confirmed Commerce Preset MUST NOT be overwritten by later Industry Type changes unless the user confirms a new preset.
- **FR-015**: Preset application MUST affect Commerce-specific defaults only after user confirmation or an equivalent explicit setup action.
- **FR-016**: Business Resources MUST be documented as the expandable business-level resource concept for logos, brand assets, certificates, banners, document assets, and similar resources.
- **FR-017**: Current MediaAsset records scoped by Workspace and Business/BusinessUnit MUST be treated as the MVP mapping for Business Resources where safe.
- **FR-018**: Business logo MUST be treated as a Business Resource; product image MUST remain a product resource scoped to Business and optionally Branch.
- **FR-019**: Logo, image, and brand resource payloads MUST NOT be duplicated into orders, invoices, or document records.
- **FR-020**: Business Resources MUST consume Workspace storage quota in the architecture model.
- **FR-021**: Business Settings MUST be documented as Business-owned settings separate from Workspace settings, CommerceSetup, and Branch settings.
- **FR-022**: Business Settings UI MUST NOT be introduced unless it is a low-risk extension of existing flows.
- **FR-023**: OSEnablement MUST be documented as the bridge from OSSubscription to the actual usage target at Workspace, Business, or Branch scope.
- **FR-024**: OSSubscription MUST represent the purchased license and MUST NOT imply that every Business can use the OS.
- **FR-025**: Commerce MVP compatibility with the current selected Business/currentBusinessUnit flow MUST be preserved while remaining compatible with future OSEnablement.
- **FR-026**: Workspace Employees and Business Employees MUST be documented as separate concepts.
- **FR-027**: Existing team members/users MUST remain Workspace-level in the MVP, and Commerce POS cashier identity MUST continue to derive from the current user until a future employee model is specified.
- **FR-028**: Business Warehouses MUST be documented as future Business-level inventory locations that can supply Branches under the same Business.
- **FR-029**: Warehouse management UI MUST NOT be forced into the MVP by this spec.
- **FR-030**: Future BranchCommerceSettings MUST be documented as branch-level operational overrides while keeping the primary CommerceSetup at Business level.
- **FR-031**: BusinessUnit MAY remain the internal code name for Business where a global rename is risky.
- **FR-032**: User-facing copy in touched surfaces MUST NOT show "BusinessUnit", "Business Unit", "Default Business Unit", or "BU"; it SHOULD use Business, Store, Activity, Branch, or Location.
- **FR-033**: Branch MUST continue to belong to Business/BusinessUnit and Workspace.
- **FR-034**: Existing Core Platform and Commerce OS MVP flows MUST continue working without backend work, storage wipes, or architecture redesign.
- **FR-035**: Pages and components MUST NOT directly read or write localStorage/sessionStorage; existing shared storage/provider patterns MUST remain the access path.
- **FR-036**: Runtime code MUST NOT import from `docs/claude.aidesign`.
- **FR-037**: The feature MUST NOT introduce microservices, new backend APIs, Laravel work, or cross-OS hard dependencies.
- **FR-038**: Implementation documentation MUST be created or updated at `docs/implementation/business-commerce-setup-addresses.md`.
- **FR-039**: The implementation documentation MUST explain the current mapping: BusinessUnit in code equals Business in product language.
- **FR-040**: The implementation documentation MUST explain Workspace vs Business vs Branch ownership, address separation, Industry Type vs Commerce Preset, Preset Suggestion -> Confirm -> Apply, Business Resources, Business Settings, OSEnablement, employee scope, warehouses, and future BranchCommerceSettings.

### Key Entities

- **Workspace**: Company/group-level tenant that owns users/members, workspace-level employees, Businesses, OS subscriptions, billing, storage quota, global settings, Workspace Address, and global resources.
- **Business / BusinessUnit**: Business line, brand, activity, or store concept under a Workspace. Current code may use BusinessUnit internally. It owns Business identity, Business Billing Address, Industry Type, CommerceSetup when Commerce OS is enabled, Branches, Business Resources, future Business Settings, future Business Employees, and future Business Warehouses.
- **Branch**: Physical operating location under a Business. It owns operational address/location, POS execution context, sales/orders context, inventory/stock context, and future branch-specific operational overrides.
- **OSSubscription**: Workspace-owned purchased license with OS, plan, and billing/subscription status. It does not decide where the OS is used.
- **OSEnablement**: Relationship that connects an OSSubscription to the Workspace, Business, or Branch where the OS is actually enabled and indicates active/disabled/locked usage state.
- **CommerceSetup**: Business-level Commerce OS configuration including identity, billing address, Commerce Preset, tax configuration, selling mode, categories, units, templates, numbering, and Commerce-specific defaults.
- **Industry Type**: Business classification that answers what the Business is. It belongs to Business and is not the same as Commerce Preset.
- **Commerce Preset**: Commerce OS configuration style that answers how Commerce should work. It is suggested from Industry Type but applied only after confirmation.
- **Workspace Address**: Workspace/company/group address used for account-level and future legal workspace metadata.
- **Business Billing Address**: Business legal and billing address used by receipts, invoices, tax invoices, reports, and customer-facing documents.
- **Branch Address**: Physical operating address of a Branch used for POS, inventory location, pickup/delivery context, and branch-specific display.
- **Business Resources**: Expandable Business-owned resource concept for logos, brand images, certificates, banners, document assets, templates, and similar assets. Current MVP mapping is MediaAsset scoped to Business/BusinessUnit where safe.
- **MediaAsset**: Current resource record used for images and files. It should support Business Resource use cases without duplicating payloads into orders, invoices, or documents.
- **Business Settings**: Future Business-level non-Commerce settings such as timezone override, currency override, locale, fiscal year, working days, and default language.
- **Workspace Employee**: Workspace/group-level employee or role such as owner, CEO, finance, legal, HR, or group admin.
- **Business Employee**: Future Business-level operational employee such as store manager, cashier, pharmacist, salesperson, inventory staff, or branch supervisor.
- **Business Warehouse**: Future Business-level inventory location that can supply Branches under the same Business.
- **BranchCommerceSettings**: Future Branch-level override entity for operational Commerce settings such as printer defaults, receipt footer override, default warehouse, and branch-specific tax registration override.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Commerce setup can be reviewed and described as Business-level configuration in 100% of affected documentation and touched setup surfaces.
- **SC-002**: Billing Address and Branch Address are visibly or structurally distinguishable in all affected setup, review, receipt, invoice, and branch-context surfaces.
- **SC-003**: At least one verified scenario supports Industry Type and Commerce Preset having different values without data conflict.
- **SC-004**: Existing Core Platform -> Product Hub -> Commerce setup -> Commerce Dashboard MVP flow remains completable.
- **SC-005**: No touched user-facing surface displays "Default Business Unit", "BusinessUnit", or "BU".
- **SC-006**: Implementation documentation explains all Spec 048 ownership boundaries and explicitly states that Spec 047 remains the architecture source of truth.
- **SC-007**: No backend API, Laravel implementation, microservice, or cross-OS hard dependency is introduced by this spec.
- **SC-008**: Existing records with only generic address/city/country values continue to render through Billing Address fallbacks.
- **SC-009**: Resource documentation and mapping avoid duplicated logo/image payloads in orders, invoices, and document records.
- **SC-010**: Validation for Core Platform and Commerce OS typecheck, lint, and build is expected to pass before implementation completion.

## Assumptions

- Spec 047 Target Architecture v2.0 remains the canonical architecture source of truth; Spec 048 applies selected decisions to the MVP and documentation.
- Current BusinessUnit code continues to represent Business internally until a safe dedicated rename spec exists.
- Current MVP mock/local/session storage remains the source for frontend flows; no storage wipe or backend persistence is part of this spec.
- Full Business Settings UI, HR employee management, warehouse management, and BranchCommerceSettings are future concepts unless a low-risk compatibility addition is identified during planning.
- Existing CommerceSetup generic address fields represent Billing Address semantics until a safe field rename or migration path is implemented.
- Existing team and access features remain Workspace-level; Commerce operational employee modeling is outside this spec.
- Preset suggestion mappings and exact field-level changes will be finalized in the implementation plan and tasks while preserving the architecture boundaries defined here.
