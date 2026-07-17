# `@nexoraxs/contracts`

This package contains technology-independent or explicitly frontend-internal contract shapes. It
may contain domain/compatibility entities, repository interfaces, commands, queries, results, and
error contracts. It must not contain React, browser storage, environment reads, transport code,
serialization, or runtime implementations.

## Feature 052 Products boundary

`src/commerce/products` is a temporary frontend compatibility contract for the existing Commerce
mock journey. `LegacyProductRecord`, `LegacyProductScope`, its repository, and its error/list shapes
are not a canonical Commerce Product aggregate, canonical organization scope, public platform
contract, future HTTP DTO, or production authorization boundary.

In particular:

- `legacyBusinessUnitId` is the current legacy storage identifier, not canonical Business identity;
- optional Branch is view/cache context, not declared Product ownership;
- `remove` only names the existing mock hard-removal effect; no status/archive/retention decision
  is made; and
- exact errors and pagination stay internal and do not resolve DD-29.

DD-02, DD-14, and DD-29 remain deferred. A future canonical or HTTP boundary requires its own
approved governance decision and migration contract; it must not promote these types by default.

## Feature 053 Commerce compatibility expansion

`src/commerce/{common,customers,inventory,orders,invoices}` extends the same bounded exception for
the existing browser Commerce journey. `LegacyCommerceBusinessUnitScope` and
`LegacyCommerceBranchScope` are temporary frontend inputs; stored `businessUnitId` remains unchanged
and no canonical `Business` or `businessId` is defined.

Customer exposes only list/get/create/update. Inventory exposes list only; Orders and Invoices expose
list/get only. These records, errors, searches, and results are not public SDK/API contracts,
transport DTOs, canonical ownership/lifecycle decisions, or production authorization. Feature 052
Product exports remain source-compatible. DD-01, DD-02, DD-05, DD-06, DD-14, DD-17, DD-18, DD-19,
DD-21, DD-23, DD-24, DD-25, and DD-29 remain deferred.
