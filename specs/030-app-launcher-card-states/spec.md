# Feature Specification: App Launcher — Complete Card States

**Feature Branch**: `030-app-launcher-card-states`  
**Created**: 2026-05-16  
**Status**: Draft  
**Input**: User description: "App Launcher — Complete Card States for apps/core-platform"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Navigate to an Active App (Priority: P1)

A platform user opens the App Launcher and sees their enabled application (Shops). The card clearly signals the app is live and ready. They click "Open →" and are taken directly to the application.

**Why this priority**: Active apps are the primary daily interaction point. This is the most critical path users follow every session.

**Independent Test**: Can be fully tested by viewing the App Launcher with a Shops account and clicking the "Open →" button — verifies the active state renders and routes correctly.

**Acceptance Scenarios**:

1. **Given** the user is on the App Launcher, **When** they view the Shops card, **Then** the card displays an "Open →" button in blue and is visually undimmed
2. **Given** the Shops card is active, **When** the user clicks "Open →", **Then** they are navigated to the Shops application
3. **Given** the Shops card is active, **When** the user views it, **Then** no upgrade or enable prompts are visible

---

### User Story 2 — Enable an Available App (Priority: P2)

A platform user sees an app that is available on their plan but not yet enabled. They want to activate it. They click "Enable App", a confirmation modal appears, they confirm, and the app is enabled.

**Why this priority**: The enable flow is the primary user acquisition path for app adoption within the platform — it directly drives activation metrics.

**Independent Test**: Can be tested by viewing an "enable" state card and completing the Enable App confirmation modal flow.

**Acceptance Scenarios**:

1. **Given** an app has `status: "enable"`, **When** the user views its card, **Then** the card shows an "Enable App" button with outline styling and is undimmed
2. **Given** the user clicks "Enable App", **When** the confirmation modal opens, **Then** the modal describes what the app does and asks the user to confirm
3. **Given** the user confirms in the modal, **When** the action completes, **Then** the modal closes and the app is registered as enabled
4. **Given** the user cancels in the modal, **When** dismissed, **Then** the card state remains unchanged

---

### User Story 3 — Discover Upgrade-Gated Apps (Priority: P3)

A platform user sees an app that requires a higher subscription plan. The card is visually dimmed to indicate limited availability. An amber "Upgrade Plan" button communicates the path forward.

**Why this priority**: Upgrade prompts drive revenue expansion. The visual treatment must convey unavailability without hiding the app from users.

**Independent Test**: Can be tested by viewing the CRM card in the App Launcher — verify dimmed appearance, amber button, and that no navigation occurs on click.

**Acceptance Scenarios**:

1. **Given** an app has `status: "upgrade"`, **When** the user views its card, **Then** the card is visually dimmed and displays an "Upgrade Plan" button in amber
2. **Given** the user clicks "Upgrade Plan", **When** the action triggers, **Then** the user is directed to the plan upgrade path (or a placeholder state during mock phase)
3. **Given** the upgrade card is visible, **When** the user attempts interaction outside the button, **Then** no unintended navigation occurs

---

### User Story 4 — Understand Coming-Soon Apps (Priority: P4)

A platform user sees apps that are not yet released. The cards are visually dimmed with a disabled state. No interactive actions are available, preventing frustration from dead-end clicks.

**Why this priority**: Coming-soon states set product roadmap expectations. They should communicate future value without creating dead interaction paths.

**Independent Test**: Can be tested by viewing Clinics, Maintenance, or Restaurants cards — verify dimmed appearance, disabled button, and no interaction response.

**Acceptance Scenarios**:

1. **Given** an app has `status: "coming-soon"`, **When** the user views its card, **Then** the card is visually dimmed and the button is disabled with no interactive affordance
2. **Given** the coming-soon card is visible, **When** the user clicks anywhere on the card, **Then** no navigation or action occurs
3. **Given** multiple coming-soon apps are present, **When** the user views the launcher, **Then** all coming-soon cards consistently render with the same dimmed treatment

---

### Edge Cases

- What happens when the app status value is missing or unrecognised?
- How does the card render when the app icon or name fails to load?
- What happens if the user rapidly clicks "Enable App" before the modal opens?
- How does the modal behave if dismissed by clicking outside or pressing Escape?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each AppCard MUST render one of four distinct visual states based on its `status` field: `active`, `enable`, `upgrade`, or `coming-soon`
- **FR-002**: Cards with `status: "active"` MUST display a blue "Open →" button that navigates the user to the associated application URL
- **FR-003**: Cards with `status: "enable"` MUST display an outline-styled "Enable App" button that opens a confirmation modal
- **FR-004**: Cards with `status: "upgrade"` MUST display a visually dimmed card with an amber "Upgrade Plan" button
- **FR-005**: Cards with `status: "coming-soon"` MUST display a visually dimmed card with a disabled, non-interactive button
- **FR-006**: The mock data source for the App Launcher MUST replace the `available: boolean` field with `status: "active" | "enable" | "upgrade" | "coming-soon"`
- **FR-007**: The Shops app MUST be mapped to `status: "active"` and include its navigation URL
- **FR-008**: The CRM app MUST be mapped to `status: "upgrade"`
- **FR-009**: The Clinics, Maintenance, and Restaurants apps MUST be mapped to `status: "coming-soon"`
- **FR-010**: The "Enable App" confirmation modal MUST describe the app being enabled and require an explicit user confirmation action before proceeding
- **FR-011**: The modal MUST provide a cancel/dismiss option that leaves the card state unchanged
- **FR-012**: No business logic (plan validation, actual enablement API calls) MUST reside in the core-platform app — enablement is handled as a mock/stub during this phase

### Key Entities

- **AppCard**: A UI card representing a single application, with properties for name, icon, description, `status`, and optional navigation URL
- **AppStatus**: The four-value enum (`active`, `enable`, `upgrade`, `coming-soon`) that drives all card visual and interaction behaviour
- **EnableModal**: A confirmation dialog that presents the app name and description, and captures a user's intent to enable the app

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All four card states are visually distinguishable from one another without additional labels or tooltips
- **SC-002**: A user can identify the correct next action from any card state within 3 seconds of viewing it
- **SC-003**: The Enable App modal opens within 300ms of clicking the "Enable App" button
- **SC-004**: Clicking any button on a `coming-soon` or non-interactive card produces no navigation or state change
- **SC-005**: The mock data migration from `available: boolean` to `status: string` results in zero broken card renders across all five apps
- **SC-006**: The confirmation modal covers all four standard interaction outcomes: confirm, cancel, outside-click dismiss, and keyboard dismiss

## Assumptions

- The Shops application URL (`SHOPS_URL`) is already defined in the environment configuration and accessible to the App Launcher at render time
- No real backend API calls are made in this phase — all state transitions are simulated via mock data and local UI state
- The "Upgrade Plan" button destination is a placeholder during this phase; the actual upgrade flow is out of scope
- The enable confirmation records intent only within UI state — no persistence layer is required for this feature
- CRM, Clinics, Maintenance, and Restaurants do not yet have application URLs; their cards are non-navigable by design
- The feature targets the core-platform app only; individual app shells are not modified
- TypeScript strict mode is enforced throughout; the `AppStatus` type must be defined as a union literal, not a plain string
