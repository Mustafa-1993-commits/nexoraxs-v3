# Feature Specification: MVP End-to-End Flow Stabilization with Storage Quota

**Feature Branch**: `043-mvp-end-to-end-flow`
**Created**: 2026-06-08
**Status**: Draft
**Input**: User description: "NexoraXS MVP End-to-End Flow Stabilization with Storage Quota — define and implement the complete journey from Register through Welcome, Core Onboarding, Core Dashboard, Product Hub, Commerce OS handoff, Commerce Setup Wizard, Commerce Dashboard, Add Product with image, POS Sale, Customer selection, Sale completion with cashier identity, Order/Invoice/Receipt, and Customers/Inventory/Reports updates, while introducing a workspace-level storage quota and media asset model for the local/demo persistence layer."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - New business owner sets up their workspace and commerce business (Priority: P1)

A new user registers for NexoraXS, is welcomed and guided through company/workspace setup, lands on their Core Dashboard, discovers the Commerce OS in the Product Hub, starts it, and completes the Commerce Setup Wizard so their store is ready to operate (identity, preset, tax, numbering, templates, categories).

**Why this priority**: This is the entry funnel for every paying customer. Without a coherent path from sign-up to a configured store, no other part of the product can be reached or demonstrated. It is the foundation the rest of the MVP journey depends on.

**Independent Test**: Can be fully tested by registering a brand-new account, completing onboarding and the setup wizard, and verifying the user lands on a Commerce Dashboard that shows their business name, logo, and branch — without needing POS, products, or orders to exist yet.

**Acceptance Scenarios**:

1. **Given** a brand-new visitor, **When** they register successfully, **Then** they see a Welcome screen (not the Product Hub) introducing NexoraXS and inviting them to set up their company.
2. **Given** a user on the Welcome screen, **When** they continue, **Then** they complete Core Onboarding by providing workspace/company name, country, currency, timezone, language (if available), and a main branch name/location, and the system creates their workspace and branch behind the scenes without ever surfacing the term "Business Unit" or "Default Business Unit".
3. **Given** an onboarded user, **When** they reach the Core Dashboard, **Then** they see a workspace overview, setup progress, shortcuts to Product Hub/Billing/Team & Access/Settings, Commerce OS status, and a storage usage summary (e.g., "Storage used 12 MB / 500 MB").
4. **Given** a user on the Product Hub, **When** they start Commerce OS, **Then** the system creates or reuses an OS subscription, preserves their branch, builds a handoff context (user, workspace, branch, business identity, plan, OS subscription), and routes them into the Commerce app.
5. **Given** a first-time Commerce user, **When** the Commerce app detects an incomplete setup, **Then** they are guided through an 8-step Setup Wizard (Business Identity, Preset, Operational Mode, Tax Setup, Numbering, Templates, Categories & Units, Review) and finish on the Commerce Dashboard with their business name, logo, and branch displayed correctly.
6. **Given** an existing user who already has an account, **When** they log in, **Then** they go directly to the Core Dashboard rather than the Welcome screen.

---

### User Story 2 - Store operator adds products with images and tracks storage usage (Priority: P2)

A store operator adds products — including images — to their catalog, sees those products and images reflected consistently across Products, POS, and Inventory, and can see how much of their workspace's storage allowance has been used.

**Why this priority**: Products are the foundation of every downstream commerce activity (POS, inventory, orders, reports). Pairing this with the storage quota ensures the demo data layer remains stable and the plan/limits story is visible to the user from the start, preventing crashes from oversized local data.

**Independent Test**: Can be fully tested by adding a product with an image from the Commerce Products screen and confirming it appears with its thumbnail in the Products list, the POS grid, and Inventory, and that the workspace storage usage indicator increases accordingly — independent of completing any sale.

**Acceptance Scenarios**:

1. **Given** a store operator on Add Product, **When** they fill in the product details and attach an image, **Then** the product is saved with a compressed thumbnail, appears with that thumbnail in Products, POS, and Inventory, and a corresponding media asset record is created and counted toward the workspace's storage usage.
2. **Given** an operator uploading an oversized or non-compressible image, **When** the save proceeds, **Then** the product is saved without the image and a friendly notice explains the image could not be kept ("Image was too large for demo storage, product saved without image.").
3. **Given** a workspace nearing or at its storage limit, **When** an operator uploads a product image or business logo that would exceed the limit, **Then** the main record is still saved, the image is not attached, and a clear message is shown ("Storage limit reached. Item saved without image.").
4. **Given** a user viewing Core Billing/Workspace Settings or Commerce Settings, **When** they look for storage information, **Then** they see how much of their plan's storage allowance is used (e.g., "Storage used: 12 MB / 500 MB" or "Media storage used by this business").
5. **Given** a product with stock tracking, **When** stock falls below its low-stock threshold, **Then** Inventory and relevant dashboards flag it as low stock.

---

### User Story 3 - Cashier completes a sale capturing customer and cashier identity (Priority: P3)

A cashier opens the POS, builds a cart, optionally selects or creates a customer without losing their place, completes the sale (their own identity is captured automatically as the cashier), and lands on a success screen with a receipt that can be printed and an invoice that can be viewed.

**Why this priority**: This is the core revenue-generating transaction loop of the MVP and the clearest demonstration of value to a prospective merchant — but it depends on a configured store (Story 1) and existing products (Story 2), which is why it is sequenced after them.

**Independent Test**: Can be fully tested by starting from a configured Commerce workspace with at least one product, performing a full POS sale (with and without selecting a customer), and confirming an order, invoice, and receipt are produced showing the correct cashier identity, totals, and business identity — without needing to revisit onboarding.

**Acceptance Scenarios**:

1. **Given** a cashier on the POS screen, **When** they search/filter products and add items to the cart, **Then** the cart shows quantities, line totals, subtotal, discount, VAT, and grand total, and the screen displays the business identity badge and current branch.
2. **Given** a cashier with items in the cart, **When** they open Checkout ("Complete Sale"), **Then** the modal shows a Walk-in customer by default, a way to select an existing or add a new customer, payment method options, totals, and the current cashier's name — without requiring manual entry of the cashier.
3. **Given** the Checkout modal is open, **When** the cashier opens the customer picker or the add-customer form, **Then** Checkout remains open underneath (correct overlay stacking), the cart stays intact, and saving a new customer selects them in Checkout without navigating away from POS.
4. **Given** a completed Checkout, **When** the cashier clicks Complete Sale, **Then** the system validates the cart is non-empty, resolves the customer (or walk-in), captures the cashier's identity, creates an order, deducts stock, generates an invoice from the order, and routes to a success screen.
5. **Given** a successful sale, **When** the cashier views the success screen, **Then** they see a receipt preview with business name, logo, branch, cashier name, receipt/invoice number, items, totals, VAT, payment method, and customer (if any), with options to print the receipt, view the invoice, or start a new sale.
6. **Given** a generated order and invoice, **When** the cashier (or another user) views Orders, Invoices, Customers, or Reports afterward, **Then** each reflects the new sale: the order and invoice appear in their respective lists with correct details (including cashier/salesperson), the customer's order count/spend updates, product stock is reduced, and report totals include the new sale.

---

### Edge Cases

- What happens when a user registers but abandons onboarding partway through — can they resume from where they left off on next login?
- What happens when a returning user's Commerce setup is already complete — does the setup guard correctly skip the wizard and go straight to the Commerce Dashboard?
- How does the system handle a product image upload that technically fits the size limit but would push the workspace over its storage quota?
- What happens at checkout when a cart item's stock becomes insufficient between adding to cart and completing the sale?
- How does the customer picker behave when there are zero existing customers (only the "add new" path is available)?
- What happens if a user closes/cancels the Checkout modal mid-flow — is the cart preserved for later?
- How does the Commerce Dashboard and POS render when there are no products or no orders yet (empty states)?
- What happens when a workspace is already at or over its plan's business unit/branch/user limits and the user attempts an action that would exceed them?
- How does storage usage behave after the demo data reset — are media assets and usage counters cleared along with other demo collections?
- What happens on small/mobile viewports for the Setup Wizard, POS cart/checkout, and the customer detail drawer?

## Requirements *(mandatory)*

### Core Platform Flow

- **FR-001**: System MUST route a newly registered user to a Welcome screen (not directly to the Product Hub or Dashboard), introducing NexoraXS and explaining that they will set up their company/workspace.
- **FR-002**: System MUST route an existing user who logs in successfully directly to the Core Dashboard.
- **FR-003**: System MUST guide the user through Core Onboarding to capture workspace/company name, country, currency, timezone, language (where available), and a main branch name/location.
- **FR-004**: System MUST create the user's workspace, an internal default business grouping, and a main branch as part of onboarding, while presenting only "Workspace" and "Branch" to the user — the internal grouping concept MUST NOT be shown or named in user-facing copy (e.g., never "Default Business Unit").
- **FR-005**: Core Dashboard MUST display a workspace overview, setup-progress/welcome guidance, shortcuts to Product Hub, Billing, Team & Access, and Settings, the current Commerce OS status, and a storage-usage summary when available.
- **FR-006**: Product Hub MUST list available "Operating Systems" showing Commerce OS in its current state (available/start/continue/active) and other future OS offerings (HR, CRM, Healthcare, Gym, Maintenance) as "Coming Soon"/locked.
- **FR-007**: When a user starts Commerce OS, the system MUST create or reuse the workspace's OS subscription, keep it associated with the workspace's internal business grouping and current branch, and build a handoff context (including user, workspace, branch, business identity, plan, and OS subscription identifiers) before routing into the Commerce app.
- **FR-008**: System MUST present plan tiers (e.g., Starter, Pro, Business) with limits covering business groupings, branches, users, storage allowance, and enabled feature modules, and these limits MUST inform what the user sees and can do.
- **FR-009**: System MUST track a per-workspace storage usage figure (used vs. allowed) that increases as media (logos, product images, etc.) is added, and MUST make that figure viewable wherever storage usage is shown.

### Storage Quota & Media Assets

- **FR-010**: System MUST treat storage quota as belonging to the workspace's plan/subscription, with Commerce activity consuming that shared allowance.
- **FR-011**: System MUST maintain a record of each media asset uploaded (e.g., business logo, product image, category image, store banner, document branding asset) including which workspace/branch it belongs to, its purpose/category, file metadata, byte size, and a reference to where it can be displayed (with an optional thumbnail reference).
- **FR-012**: System MUST estimate and record the size of uploaded media in a compressed/thumbnail form rather than retaining original full-size files, keeping the recorded model compatible with a future real storage backend.
- **FR-013**: Before saving an uploaded image (logo, product image, banner, etc.), the system MUST check the estimated size against the workspace's remaining storage allowance; if it would exceed the allowance, the system MUST still save the parent record (product, business identity, etc.) without the image and MUST show the user a clear, non-blocking message explaining the image was not kept.
- **FR-014**: System MUST avoid storing duplicate copies of the same image across related records — each image is stored once as a media asset and referenced (not copied) by products, orders, invoices, and receipts/business identity.
- **FR-015**: System MUST display a storage usage indicator (used vs. limit, ideally with a percentage) in at least Core Billing/Workspace Settings and in Commerce Settings, styled consistently with existing summary/usage cards.

### Commerce Setup Wizard

- **FR-016**: After handoff into Commerce OS, the system MUST detect an incomplete Commerce setup and guide the user through an ordered setup flow before allowing access to the Commerce Dashboard.
- **FR-017**: Step 1 (Business Identity) MUST collect display name, legal name, phone, email, address/city/country, registration numbers, and a logo; the display name MUST be the name shown to customers and MUST NOT be combined with the branch name; the logo MUST be saved as a media asset and counted toward workspace storage without being duplicated into other records.
- **FR-018**: Step 2 (Business Preset) MUST let the user choose a business type (Retail, Pharmacy, Restaurant/Cafe, Supermarket, Electronics/Mobile, Fashion/Clothing, Cosmetics, Other) that informs default categories, units, suggested modules, and recommended document templates — without creating a separate product/OS.
- **FR-019**: Step 3 (Operational Mode) MUST let the user choose Physical Store, Online Store, or Both; Physical Store/POS MUST be fully usable in this MVP, while Online Store appears as a future/recommended option without a working storefront.
- **FR-020**: Step 4 (Tax Setup) MUST collect VAT registration status, VAT/tax number, default VAT rate, whether prices include tax, and a tax label where supported, and all tax calculations performed anywhere in Commerce MUST use the shared document/tax calculation logic rather than per-page duplicates.
- **FR-021**: Step 5 (Numbering) MUST collect receipt and invoice number prefixes and a starting number, and these MUST drive the numbers shown on generated receipts and invoices.
- **FR-022**: Step 6 (Templates) MUST collect receipt size/style and tax invoice template choices and MUST present a live preview using the business's actual identity and logo.
- **FR-023**: Step 7 (Categories & Units) MUST seed/recommend categories and units based on the chosen preset and allow the user to review and adjust them.
- **FR-024**: Step 8 (Review) MUST summarize the workspace, business name, branch, OS, preset, operational mode, tax setup, numbering, templates, categories, enabled vs. recommended modules, and the storage plan/usage, and completing it MUST persist the Commerce setup, mark it complete, and route the user to the Commerce Dashboard.

### Commerce Shell, Identity & Dashboard

- **FR-025**: The Commerce shell (sidebar/business selector and POS header) MUST present the business display name and logo prominently, the branch name as a separate, clearly distinguishable element, and MUST NOT show internal grouping names, presets, or a combined "Business · Branch" label as the primary identity.
- **FR-026**: Logos MUST render at a clearly visible size without cropping, distortion, or visual treatments (opacity/grayscale) that obscure them, in both the sidebar and the POS header.
- **FR-027**: Commerce Dashboard MUST show business identity and branch context, key operational metrics (sales today, orders, products, customers, low-stock count), storage/media usage when available, quick actions (Add Product, New Sale, Add Customer, View Reports, Settings), and a friendly empty state with a call-to-action when there are no products or orders yet.

### Products & Inventory

- **FR-028**: Add/Edit Product MUST capture name, category, optional brand, SKU, barcode, unit, price, cost, stock quantity, low-stock threshold, taxable flag, and an optional image, and MUST associate the saved product with the user's workspace, branch, and (where applicable) OS subscription.
- **FR-029**: Saved products MUST appear consistently — with their thumbnail when an image exists, or a placeholder when it does not — in the Products list, the POS product grid, and Inventory.
- **FR-030**: Product image handling MUST compress uploaded images to a small thumbnail before saving, MUST avoid storing large/raw image data within product records, and MUST follow the same size-check-and-fallback behavior described in FR-013 (save without image plus a clear notice when too large or over quota).
- **FR-031**: System MUST track stock quantity per product, detect and surface low-stock status, and deduct sold quantities from stock at the moment a sale completes.

### Point of Sale, Checkout & Sale Completion

- **FR-032**: POS MUST present the business identity badge, a branch indicator, product search/filtering, product cards (image, name, price, stock), a cart with quantity controls and item removal, discount (where supported), a tax breakdown, and a path to checkout — all computed via the shared tax/document calculation logic.
- **FR-033**: Checkout ("Complete Sale") MUST show a customer section (Walk-in by default, with options to select an existing customer or add a new one), a payment section (Cash/Card/Wallet and amount tendered where supported), an order summary with totals, and the identity of the cashier currently completing the sale (derived automatically from the signed-in user, with a generic fallback label only if that identity is unavailable — never requiring manual entry).
- **FR-034**: The customer picker and add-customer forms MUST layer on top of the open Checkout modal (Checkout → picker → add-customer) without closing Checkout, losing the cart, or navigating away from POS; selecting or creating a customer MUST leave Checkout open with that customer applied.
- **FR-035**: Adding a customer from POS MUST capture name, phone, email, and optional notes, and MUST save it as a Commerce customer scoped to the workspace and branch.
- **FR-036**: Completing a sale MUST, in order: confirm the cart is non-empty, resolve the chosen customer (or null for walk-in), capture the cashier's identity from the signed-in user, create an order (capturing items, payment method, totals, customer, cashier, branch, and timestamps), deduct stock for each item, generate an invoice from that order, retain a reference to the completed sale for the success screen, and route to the success screen.
- **FR-037**: Orders and invoices MUST reference product names/prices and business identity by lookup/reference rather than copying product images or business logos into each record.

### Post-Sale: Success, Receipts, Orders & Invoices

- **FR-038**: The post-sale success screen MUST present a confirmation message, a receipt preview (business name, logo, branch, cashier/salesperson, receipt/invoice number, date/time, items with quantities/prices, discount, VAT, total, payment method, and customer if any), and actions to print the receipt, view the invoice, or start a new sale; printing MUST use the existing print behavior and preserve the receipt's print layout.
- **FR-039**: The Orders list and order detail views MUST show order number, date/time, customer (or "Walk-in"), cashier/salesperson, payment method, item count, total, branch, items, and a link/status to the linked invoice.
- **FR-040**: The Invoices list and invoice document MUST show invoice number, linked order number, customer, subtotal/VAT/total, date/status, business identity and legal/tax data, branch, cashier/salesperson (when generated from a POS order), an itemized table, and a tax breakdown computed via the shared document/tax helpers, with a stable print layout and no duplicated logo/image payloads.

### Customers & Reports

- **FR-041**: The Customers list MUST show summary KPIs (total customers, active this month, new this week), search, an "Add Customer" action, and a table with name, contact, tag (where present), order count, total spent, last order, and "since" date; existing add/edit/full-profile capabilities MUST be preserved.
- **FR-042**: Clicking a customer row MUST open a side drawer (full-screen/bottom sheet on mobile) summarizing the customer and recent orders with a clear path to their full profile page (which retains edit capability), rather than navigating away immediately.
- **FR-043**: Reports MUST be derived from existing order/invoice/customer/product data and present sales totals, order counts, VAT collected (when VAT is enabled), new customers, best sellers, a simple sales trend, and a period filter where supported, with shared calculation logic reused rather than duplicated in the UI.

### Settings, Storage Display & Cross-Cutting

- **FR-044**: Commerce Settings MUST allow viewing/editing business identity, logo, branch context, tax settings, document numbering, document templates, and a media/storage usage summary, with changes reflected consistently across the sidebar, POS header, receipts, and invoices.
- **FR-045**: Core Settings/Billing MUST show the active plan, applicable limits (users/branches/business groupings), and the workspace's storage usage (used, limit, and percentage).
- **FR-046**: All business and commerce records created through this flow MUST carry the identifiers needed to scope them to the correct workspace, and commerce records MUST additionally carry the identifiers needed to scope them to the correct branch (and internal business grouping where applicable), without exposing those internal identifiers in user-facing copy.
- **FR-047**: System MUST present the Core/Commerce shells responsively: a fixed sidebar on desktop and a hamburger-triggered drawer overlay on tablet/mobile, with no horizontal overflow, and MUST keep dashboards, product views, POS (grid, cart, checkout/customer modals), and the customer drawer usable at small viewport sizes.
- **FR-048**: The local/demo persistence layer MUST remain the single, isolated point of access for stored data (no direct device-storage access from individual screens), MUST handle storage-capacity errors gracefully with a clear message, and MUST sanitize records before saving so that large or unsafe image payloads (raw files, blobs, oversized data references) are stripped while small, safe thumbnails may be kept.
- **FR-049**: The existing demo "reset" capability MUST continue to work and MUST also clear media asset records and storage-usage counters so the workspace returns to a clean baseline.
- **FR-050**: Pages and shared providers MUST initialize in a state-safe way (no crashes from missing stored data on first load) and MUST hydrate stored data after initial render.

### Key Entities *(include if feature involves data)*

- **Workspace Storage Usage**: Per-workspace record of how many bytes of the plan's storage allowance are currently used, the allowance limit, and when it was last updated; drives every storage-usage display and pre-upload check.
- **Media Asset**: A record representing one uploaded image (business logo, product image, category image, store banner, document branding asset, etc.), including which workspace/branch/owning record it belongs to, its purpose, file metadata (name, type, byte size, dimensions), and references to its (thumbnail) display location; referenced — not duplicated — by the records that display it.
- **Plan / Plan Limits**: Defines what a workspace's subscription tier allows — number of business groupings, branches, and users; storage allowance; optional product/order limits; and which feature modules are enabled (e.g., Starter/Pro/Business tiers).
- **Commerce Setup / Profile**: The completed configuration produced by the setup wizard — business identity, preset, operational mode, tax configuration, document numbering, document templates, and seeded categories/units — that drives identity display and document generation throughout Commerce.
- **Commerce Order**: A completed sale capturing items, totals (subtotal, discount, VAT, total), payment method, customer (or walk-in), cashier identity, branch, and scoping identifiers, from which an invoice and receipt are derived.
- **Commerce Invoice**: A billing document generated from an order, carrying item/tax/total details, customer and cashier references, and scoping identifiers, rendered with the business's identity and legal/tax data.
- **Commerce Customer**: A person or account associated with a workspace/branch, tracked with contact details, order history, and spend, addable both from Commerce Customers and from the POS checkout flow.
- **Commerce Product**: A catalog item with identity, pricing, stock, tax flag, and an optional reference to a media asset/thumbnail, scoped to a workspace and branch and visible across Products, POS, and Inventory.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user can go from completing registration to landing on a fully configured Commerce Dashboard (showing their business name, logo, and branch) in a single guided session, in under 10 minutes, without encountering a dead end or unexplained step.
- **SC-002**: A store operator can add a product with an image and see that product (with its image) appear consistently in the Products list, the POS grid, and Inventory within the same session, with the workspace's displayed storage usage reflecting the addition.
- **SC-003**: A cashier can complete an entire sale — from opening POS to viewing a printable receipt and a generated invoice — in under 2 minutes for a simple cart, with the resulting order, invoice, customer record, inventory level, and reports all reflecting the sale without requiring a page reload.
- **SC-004**: 100% of completed sales display the correct cashier/salesperson identity on the checkout summary, the order, the invoice, and the receipt, with no manual entry required from the cashier.
- **SC-005**: Uploading typical product images and business logos (within stated demo limits) never produces a storage-capacity failure or crash; oversized uploads are gracefully declined with a clear, friendly explanation and the underlying record is still saved.
- **SC-006**: Users can find and understand their current storage usage (used vs. allowed) from at least one Core location and one Commerce location without needing assistance.
- **SC-007**: The complete demonstration journey (register → onboarding → product hub → commerce setup → add product → POS sale → receipt/invoice → customers/inventory/reports) can be performed end-to-end by a new presenter on first attempt, without encountering broken navigation, lost modal state, or visibly incorrect business identity.
- **SC-008**: On tablet and mobile viewports, every screen in the journey (including the setup wizard, POS cart/checkout, and customer drawer) remains fully usable with no horizontal scrolling or obscured controls.

## Assumptions

- "Business Unit" is an internal organizational concept that continues to exist in the data model for future multi-business-unit scenarios, but the MVP intentionally hides it from all user-facing copy in favor of "Business / Store / Branch / Location" language; this is a deliberate simplification for the MVP, not a removal of the underlying concept.
- The cashier/salesperson identity on a sale is always the currently signed-in user completing the transaction; the MVP does not support selecting a different staff member as cashier or supporting shared/anonymous POS terminals.
- "Storage" in this MVP is a simulated, workspace-level allowance tracked against locally generated thumbnails and metadata — it models the future production behavior (real object storage, metadata-only database records) without implementing real uploads, and the numeric limits per plan tier (e.g., 500 MB / 5 GB / 50 GB+) are illustrative drafts that may be tuned later.
- Compression/thumbnail parameters (e.g., target dimensions, quality, byte-size ceilings) are implementation choices made to keep the local demo stable; the spec only requires that originals are not retained, that a reasonable small thumbnail is kept when possible, and that the user is informed when an image cannot be kept.
- Online Store, future OS products (HR, CRM, Healthcare, Gym, Maintenance), and real payment/object-storage/backend integrations are explicitly out of scope for this MVP and are represented only as visible "coming soon"/locked/future states.
- Existing, already-ported prototype visuals (setup wizard layout, shell identity, POS layout, product cards, receipts/invoices, customer drawer) are the reference for "look and feel" — this spec governs flow completeness and data correctness, not a visual redesign.
- Plan tiers and their limits (Starter/Pro/Business) are illustrative drafts for the MVP to demonstrate the limits/quota experience; exact numbers may be revisited during commercial planning without changing the underlying flow this spec defines.
