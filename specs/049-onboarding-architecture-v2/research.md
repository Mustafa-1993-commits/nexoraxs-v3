# Research: Onboarding Architecture v2

## Decision: Core onboarding is business-first and OS-neutral

**Rationale**: The constitution requires the onboarding direction to be Sign Up/Login -> Welcome + Language -> Workspace -> Business -> Product Hub. Core Platform should collect shared platform context only, so the first Business is created before the user chooses an Operating System.

**Alternatives considered**:
- OS-first onboarding: rejected because Business Activity must not force an OS and Product Hub is the OS entry point.
- Commerce-first onboarding: rejected because it couples Core Platform to Commerce OS.

## Decision: Business is the user-facing label; BusinessUnit remains internal

**Rationale**: The constitution and spec require no global BusinessUnit rename while allowing Business as product language. This avoids broad refactors and preserves current relationships.

**Alternatives considered**:
- Introduce a new Business entity: rejected because it duplicates BusinessUnit.
- Keep Business Unit visible: rejected because the spec explicitly forbids BusinessUnit/BU/Default Business Unit wording in UI.

## Decision: Product Hub operates with an active Business context

**Rationale**: Launching an OS creates an OSEnablement for a real operational scope. Product Hub can remain generic while requiring users to choose the Business where an OS will be enabled.

**Alternatives considered**:
- Product Hub launches only at Workspace scope: rejected because Commerce normally runs at Business scope.
- Business management inside Commerce only: rejected because Product Hub must show Businesses and be the OS launch point.

## Decision: OSSubscription and OSEnablement remain separate first-class states

**Rationale**: OSSubscription answers whether the Workspace licensed an OS. OSEnablement answers where that OS is operationally activated and whether setup is complete. Collapsing them would obscure multi-Business usage and setup-required states.

**Alternatives considered**:
- Use CommerceSetup existence as Product Hub status: rejected because it cannot distinguish subscribed, enabled, and setup-required states.
- Create a subscription per Business by default: rejected because subscriptions are Workspace-level licenses.

## Decision: Reuse an existing Workspace+OS subscription for another Business unless plan change is explicit

**Rationale**: The spec requires subscription reuse for multi-Business activation under the same Workspace and OS. A separate OSEnablement and CommerceSetup captures Business-specific setup without creating unnecessary billing records.

**Alternatives considered**:
- Always create a new subscription per Business: rejected because it violates Workspace-level subscription ownership.
- Never allow plan changes during launch: rejected because users must be able to upgrade or change plan deliberately.

## Decision: CommerceSetup belongs to BusinessUnit and Branch remains operational scope

**Rationale**: Commerce setup owns business identity, preset, tax, billing identity, templates, categories, units, and numbering. Branch owns operational address and operational data such as POS, inventory, orders, invoices, reports, transfers, and returns.

**Alternatives considered**:
- Branch-owned CommerceSetup: rejected because it duplicates setup across branches and conflicts with Spec 048/constitution ownership.
- Workspace-owned CommerceSetup: rejected because different Businesses in the same Workspace can have different Commerce setups.

## Decision: Migration is preservation-first

**Rationale**: Existing Workspace, BusinessUnit, Branch, CommerceSetup, OSSubscription, OSEnablement, and operational records must remain intact. Migration should reinterpret and connect existing records rather than delete or rewrite unrelated data.

**Alternatives considered**:
- Clear existing onboarding/mock data: rejected because it risks user data loss and invalidates current MVP flows.
- Backend migration now: rejected because backend work is out of scope for this architecture/UX refactor.
