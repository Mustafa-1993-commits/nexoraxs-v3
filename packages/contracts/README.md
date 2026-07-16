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
