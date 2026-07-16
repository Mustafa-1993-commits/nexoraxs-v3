# `@nexoraxs/shared`

This package is restricted to pure utilities, formatting, ID/date helpers, validation primitives,
and existing non-owning compatibility helpers. It must not become a source of Product persistence,
Order or Workspace creation, authentication state, or Core/Commerce business logic.

Feature 052 adds no Product behavior here. New Product persistence is behind `@nexoraxs/sdk` store
and repository boundaries. Existing mock database/storage helpers remain quarantined legacy debt
for excluded domains and bootstrap compatibility; they are not a pattern to extend. Product demo
seeding is now routed through the Product facade/store seam.

Moving or deleting the remaining shared/AppProvider debt requires separate characterized slices
for their owning domains. Feature 052 migrates Commerce Products only.
