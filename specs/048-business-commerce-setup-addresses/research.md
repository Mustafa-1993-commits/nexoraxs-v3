# Research: Business-Level Commerce Setup, Address Separation, and Business Resources

## Decision: Treat Spec 047 as the architecture source of truth

**Rationale**: Spec 048 explicitly depends on Spec 047 and applies selected decisions to MVP implementation. Keeping Spec 047 canonical prevents two competing architecture definitions.

**Alternatives considered**:
- Redefine Target Architecture v2 in Spec 048: rejected because it creates a second source of truth.
- Treat Spec 048 as standalone: rejected because OSEnablement and Business/Branch relationships were already established in Spec 047.

## Decision: Keep `BusinessUnit` as the internal Business model for this spec

**Rationale**: The repository already uses `BusinessUnit` across shared types, mock-db, Core, and Commerce. A global rename would be risky and outside the alignment scope. Product language can say Business while code compatibility remains stable.

**Alternatives considered**:
- Rename every `BusinessUnit` symbol to `Business`: rejected as a broad migration with high regression risk.
- Keep user-facing "Business Unit": rejected because Spec 047/048 require Business/Store/Activity language.

## Decision: CommerceSetup remains Business-level, not Branch-level

**Rationale**: Business identity, billing address, tax defaults, categories, units, templates, numbering, and Commerce Preset are shared by branches under the same Business. Branches own execution context and may later have small operational overrides.

**Alternatives considered**:
- Move CommerceSetup under Branch: rejected because it duplicates business configuration across branches.
- Store setup at Workspace level: rejected because multiple Businesses under one Workspace can use Commerce differently.

## Decision: Preserve generic address fields as billing-address fallbacks

**Rationale**: Current `CommerceSetup` has `address`, `city`, and `country`. Existing mock data and UI can keep working if those fields are treated as Business Billing Address semantics while optional explicit billing fields are introduced or documented.

**Alternatives considered**:
- Immediate destructive field rename: rejected because it risks breaking existing local/session data.
- Reuse Branch Address for legal documents: rejected because Billing Address and Branch Address have different purposes.

## Decision: Industry Type suggests Commerce Preset through confirmation

**Rationale**: Industry Type belongs to Business and describes the activity. Commerce Preset belongs to CommerceSetup and controls operational defaults. Suggestion preserves convenience while allowing a user to choose a different Commerce configuration.

**Alternatives considered**:
- Store Industry Type directly as preset: rejected because it collapses two different concepts.
- Require users to select both from scratch every time: rejected because it removes useful setup automation.

## Decision: Business Resources map to MediaAsset for MVP

**Rationale**: The current MVP already has MediaAsset/storage usage primitives. Business Resources is a broader architecture concept, so the low-risk MVP path is to document and use Business-scoped MediaAsset records where safe.

**Alternatives considered**:
- Build a full BusinessResources module now: rejected as beyond MVP scope.
- Store logos/images as duplicated fields in documents/orders/invoices: rejected because it duplicates payloads and breaks resource ownership.

## Decision: Business Settings, Business Employees, Warehouses, and BranchCommerceSettings are future-ready documentation unless low-risk fields already exist

**Rationale**: Spec 048 is an alignment spec, not a UI expansion. These concepts should be documented clearly without forcing new management screens or backend models.

**Alternatives considered**:
- Implement full Business Settings, employee, and warehouse screens: rejected by MVP discipline.
- Omit the concepts entirely: rejected because Spec 048 requires ownership clarification for future work.

## Decision: OSEnablement is reused from Spec 047

**Rationale**: The repository already contains OSEnablement types and shared selectors/helpers from Spec 047. Spec 048 should clarify ownership and compatibility, not duplicate the model.

**Alternatives considered**:
- Add a second enablement relationship: rejected because it would conflict with Spec 047.
- Infer usage directly from OSSubscription: rejected because subscriptions represent purchased licenses, not usage scope.
