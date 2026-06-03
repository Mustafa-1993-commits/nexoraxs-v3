# Feature Specification: Commerce Identity, Tax & Document Templates

**Feature Branch**: `040-commerce-identity-tax-document-templates`
**Created**: 2026-06-03
**Status**: Draft
**Input**: User description: "040 — Commerce OS Business Identity, Tax Settings, Invoice Numbering, and Document Template foundation"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Owner configures Business Identity (Priority: P1)

A business owner opens the Commerce OS settings and fills in their business information: display name, legal name, logo placeholder, contact details, tax registration number, and commercial registration number. This data will later appear on every receipt and tax invoice the system generates, and ensures the business is correctly identified on all commerce documents.

**Why this priority**: Business Identity is the foundational layer for all document templates. No receipt or tax invoice can display meaningful business information without it. It also gates whether tax invoice fields are shown.

**Independent Test**: Open Commerce OS settings, navigate to Business Identity, fill in all required fields (display name, phone, email, address), and save. The saved values must persist across page refreshes within the same session. Optional fields (legal name, tax number, commercial registration) can be left blank without blocking save.

**Acceptance Scenarios**:

1. **Given** an owner opens the Business Identity settings, **When** they see the form, **Then** it contains: Display Name (required), Legal Name (optional), Logo area (placeholder/upload mock), Phone (required), Email (required), Address (required), Tax Registration Number (optional), Commercial Registration Number (optional).
2. **Given** an owner fills in required fields and saves, **When** they reload the settings page within the same session, **Then** their saved values are still present.
3. **Given** an owner leaves optional fields empty and saves, **When** they submit, **Then** the form accepts the save without errors.
4. **Given** an owner enters a tax registration number in Business Identity, **When** they navigate to Tax Settings, **Then** the tax registration field there is pre-filled or cross-linked to the same value.

---

### User Story 2 — Owner configures Tax Settings (Priority: P1)

An owner sets up their VAT/tax configuration: whether they are tax-registered, the applicable tax rate, and whether prices in the POS are entered inclusive or exclusive of tax. When not registered, all tax invoice-specific fields and outputs are disabled. This configuration will govern how the POS calculates tax at checkout once backend persistence is in place.

**Why this priority**: Tax settings control whether the business can legally issue tax invoices, and directly affect how every POS sale will be calculated. Setting this correctly before POS goes live is a compliance requirement.

**Independent Test**: Toggle "Tax Registered" on, set a tax rate of 15%, set price mode to "Tax Exclusive", and save. Reload the page — the saved values must be present. Then toggle "Tax Registered" off and verify that tax-invoice-specific sections become disabled or hidden.

**Acceptance Scenarios**:

1. **Given** an owner opens Tax Settings, **When** they see the form, **Then** it shows: Tax/VAT Registered toggle (on/off), Default Tax Rate (percentage field), Price Mode selector (Tax Inclusive / Tax Exclusive).
2. **Given** the Tax Registered toggle is OFF, **When** the owner views Tax Settings, **Then** the Default Tax Rate field and any tax-invoice-specific options are disabled or visually hidden.
3. **Given** the Tax Registered toggle is ON, **When** the owner views Tax Settings, **Then** Default Tax Rate and Price Mode are active and editable.
4. **Given** an owner sets Tax Rate to 15% and Price Mode to Exclusive and saves, **When** they return to Tax Settings in the same session, **Then** the saved values are present.
5. **Given** an owner changes Tax Registered from ON to OFF, **When** they save, **Then** a visible indicator communicates that tax invoices will not be issued for this business.

---

### User Story 3 — Owner configures Invoice Numbering (Priority: P2)

An owner sets up the numbering scheme for receipts and tax invoices: the prefix for receipts (e.g., "RCP"), the prefix for tax invoices (e.g., "INV"), and the starting number. The settings screen shows a live example of what the generated numbers will look like (e.g., "RCP-0001", "INV-0001") based on the current inputs.

**Why this priority**: Invoice numbering must be defined before any POS sale can generate a valid, sequenced document. It is a prerequisite for document template use in a real transaction.

**Independent Test**: Set receipt prefix to "RCP", invoice prefix to "INV", and starting number to 1. The example preview must immediately show "RCP-0001" and "INV-0001" (or equivalent formatted output). Save and reload — values persist.

**Acceptance Scenarios**:

1. **Given** an owner opens Invoice Numbering, **When** they see the form, **Then** it shows: Receipt Prefix field, Invoice Prefix field, Starting Number field, and an example output area.
2. **Given** an owner types a prefix and starting number, **When** they are typing, **Then** the example output updates in real time to show the formatted document number.
3. **Given** an owner sets prefix "RCP" and starting number 100, **When** they view the example, **Then** it shows "RCP-0100" or equivalent based on zero-padding to 4 digits.
4. **Given** an owner saves the invoice numbering settings, **When** they return in the same session, **Then** the saved values are present.

---

### User Story 4 — Owner configures Document Templates with live preview (Priority: P2)

An owner selects which document template to configure (POS Receipt 58mm, POS Receipt 80mm, A4 Tax Invoice, or Refund Receipt), chooses a visual style (Minimal, Classic, or Detailed), and sees a live preview panel on the right that renders the document using mock business identity and a mock sample cart with 2–3 line items, subtotal, tax, discount, and total. The preview updates immediately when the style changes.

**Why this priority**: Document templates must be defined and approved by the owner before the POS can generate real receipts and invoices. Getting the template right now prevents rework after POS is live.

**Independent Test**: Select "POS Receipt 80mm" and apply "Classic" style. The preview panel must show a rendered receipt with the saved (or placeholder) business name, 2–3 sample line items, subtotal, tax, and total. Switching to "Minimal" style must immediately update the preview without a page reload.

**Acceptance Scenarios**:

1. **Given** an owner opens Document Templates, **When** they see the list, **Then** they can select from: POS Receipt 58mm, POS Receipt 80mm, A4 Tax Invoice, Refund Receipt.
2. **Given** an owner selects any template, **When** they choose a style, **Then** available styles are: Minimal, Classic, Detailed.
3. **Given** an owner changes the style, **When** the change is applied, **Then** the live preview panel updates immediately without a full page reload.
4. **Given** the live preview panel is visible, **When** the owner inspects it, **Then** it shows: business display name and address (from Business Identity or mock placeholder), at least 2 sample line items with names and prices, a subtotal, a tax amount (based on Tax Settings or 15% mock default), and a total.
5. **Given** Business Identity has been filled in, **When** the owner views the preview, **Then** the actual saved business name and address appear in the preview (not generic placeholder text).
6. **Given** an owner selects A4 Tax Invoice, **When** the Tax Registered setting is OFF, **Then** the preview shows a notice that tax invoices require tax registration to be enabled.
7. **Given** an owner saves a template style selection, **When** they return to that template in the same session, **Then** the selected style is still active.

---

### User Story 5 — Settings are bilingual and RTL-ready (Priority: P3)

All four settings areas (Business Identity, Tax Settings, Invoice Numbering, Document Templates) display labels and form elements in a way that works for both English (LTR) and Arabic (RTL) without requiring code changes per language — using i18n-ready label patterns. The document preview panel renders correctly in RTL layout when Arabic is the active language.

**Why this priority**: NexoraXS requires Arabic + English from day one per architecture. Building RTL-incompatible settings now creates rework debt before Arabic users can onboard.

**Independent Test**: Switch the interface language to Arabic. All four settings areas must display labels in Arabic (or show i18n keys if translations are not yet loaded), and the layout must flow right-to-left without broken alignment or text overflow.

**Acceptance Scenarios**:

1. **Given** the interface is in Arabic mode, **When** an owner views any of the four settings areas, **Then** form labels, section headings, and button text are either translated or display their i18n key (not hardcoded English strings).
2. **Given** the interface is in Arabic mode, **When** the owner views the document template preview, **Then** the preview layout mirrors horizontally (business name at top-right, amounts aligned right, text direction RTL).
3. **Given** the interface is in English mode, **When** the owner views any settings area, **Then** all layout and alignment behaves correctly LTR.

---

### Edge Cases

- What happens if Business Identity is empty when an owner tries to preview a Document Template? The preview must display clear placeholder/mock data (e.g., "Your Business Name", "Your Address") rather than empty blocks or broken layout.
- What happens if the Tax Rate is set to 0% and Tax Registered is ON? The system should accept 0% as a valid rate and show a 0 tax line in the document preview.
- What happens if the Invoice Starting Number is left at 0 or blank? The system should default to 1 and show an inline validation message.
- What happens if the owner enters a prefix longer than 10 characters? A character limit and inline message should be shown.
- What happens if an owner navigates away from a settings section without saving? The unsaved state should either auto-save or show a visual indicator that changes are unsaved.
- What happens if Business Identity has no logo uploaded? The preview panel must show a consistent placeholder (e.g., business initials or a generic icon) rather than a broken image.

---

## Requirements *(mandatory)*

### Functional Requirements

**Navigation & Structure**

- **FR-001**: The Commerce OS Settings section MUST include four dedicated sub-sections accessible by navigation: Business Identity, Tax Settings, Invoice Numbering, and Document Templates.
- **FR-002**: Each sub-section MUST be accessible without leaving the Commerce OS app.
- **FR-003**: The current settings page (Store Profile, Shop Mode, Team, Advanced) MUST remain intact and accessible.

**Business Identity**

- **FR-004**: The Business Identity form MUST include: Display Name (required), Legal Name (optional), Logo area (optional), Phone (required), Email (required), Address (required), Tax Registration Number (optional), Commercial Registration Number (optional).
- **FR-005**: The Business Identity form MUST validate required fields (Display Name, Phone, Email, Address) before allowing save.
- **FR-006**: Saved Business Identity values MUST persist for the duration of the active session.
- **FR-007**: The Logo field MUST show a placeholder area and an upload button — the upload button opens a file picker but actual file processing is not required (mock state only).
- **FR-008**: Business Identity saved values MUST be readable by the Document Templates preview.

**Tax Settings**

- **FR-009**: The Tax Settings section MUST include: Tax/VAT Registered toggle, Default Tax Rate (percentage), Price Mode selector (Tax Inclusive / Tax Exclusive).
- **FR-010**: When Tax Registered is OFF, the Default Tax Rate field and any tax-invoice-specific controls MUST be disabled or hidden.
- **FR-011**: When Tax Registered is ON, Default Tax Rate and Price Mode MUST be editable.
- **FR-012**: Tax Settings MUST persist for the duration of the active session.
- **FR-013**: The Tax Rate field MUST accept values between 0 and 100 inclusive, with up to 2 decimal places.
- **FR-014**: A visible note MUST communicate that discount is applied before tax in POS calculations (informational only — no POS calculation logic in this spec).

**Invoice Numbering**

- **FR-015**: The Invoice Numbering form MUST include: Receipt Prefix (text, max 10 characters), Invoice Prefix (text, max 10 characters), Starting Number (positive integer, minimum 1).
- **FR-016**: As the owner types a prefix or starting number, the example output area MUST update in real time showing the formatted document number (e.g., "RCP-0001").
- **FR-017**: The example output MUST use zero-padded 4-digit numbering by default (e.g., "0001", "0100").
- **FR-018**: Invoice Numbering settings MUST persist for the duration of the active session.
- **FR-019**: If the Starting Number is left blank or set to 0, it MUST default to 1 with an inline validation message.

**Document Templates**

- **FR-020**: The Document Templates section MUST present four template types: POS Receipt 58mm, POS Receipt 80mm, A4 Tax Invoice, Refund Receipt.
- **FR-021**: Each template type MUST offer three visual styles: Minimal, Classic, Detailed.
- **FR-022**: A live preview panel MUST render the selected template and style immediately when style is changed — no full page reload required.
- **FR-023**: The preview panel MUST display: business name and address (from Business Identity if saved, otherwise placeholder text), at least 2 sample line items with product names and prices, subtotal, tax amount, optional discount line, and total.
- **FR-024**: The preview panel MUST use the saved Tax Settings to calculate the displayed tax amount, or fall back to a 15% mock default if Tax Settings have not been configured.
- **FR-025**: If Business Identity has no logo, the preview MUST show a placeholder (initials or generic icon) — not a broken image.
- **FR-026**: When A4 Tax Invoice template is selected and Tax Registered is OFF, the preview MUST display a notice that tax invoices require tax registration.
- **FR-027**: The selected style per template type MUST persist for the duration of the active session.

**Bilingual / RTL Readiness**

- **FR-028**: All user-facing labels, headings, field names, button text, and status messages in the four settings areas MUST use an i18n-ready pattern (no hardcoded English-only strings).
- **FR-029**: The document template preview panel MUST support RTL layout when Arabic is the active language — text direction, alignment, and element order MUST mirror correctly.
- **FR-030**: The four settings forms MUST use layout patterns that support both LTR and RTL without per-language CSS overrides.

### Key Entities

- **BusinessIdentity**: Display name, legal name (optional), logo (optional), phone, email, address, tax registration number (optional), commercial registration number (optional).
- **TaxSettings**: Registered (boolean), default tax rate (0–100%), price mode (inclusive | exclusive).
- **InvoiceNumbering**: Receipt prefix (string, max 10), invoice prefix (string, max 10), starting number (integer ≥ 1).
- **DocumentTemplate**: Template type (58mm | 80mm | a4-invoice | refund), style (minimal | classic | detailed).
- **TemplatePreviewData**: Mock or live business identity snapshot + mock cart (2–3 line items, subtotal, tax, discount, total).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An owner can complete Business Identity setup (all required fields) in under 3 minutes on the first visit.
- **SC-002**: An owner can configure Tax Settings (toggle + rate + price mode) in under 60 seconds.
- **SC-003**: An owner can configure Invoice Numbering and immediately see a correctly formatted example number without waiting for a page reload.
- **SC-004**: An owner can select a Document Template and style and see the live preview update within 1 second of making a selection.
- **SC-005**: All four settings areas retain their saved values without loss when the owner navigates between sub-sections within the same session.
- **SC-006**: The document template preview renders correctly (no broken layout, no missing data blocks) for all 4 template types × 3 styles = 12 combinations.
- **SC-007**: All four settings areas display correctly in RTL layout when Arabic is the active language, with zero broken alignment or overflowing text.
- **SC-008**: Zero settings values are lost when the owner navigates away from a settings sub-section and returns within the same session.

---

## Assumptions

- The four new settings areas are presented as sub-sections or sub-pages within the existing Commerce OS Settings navigation — the existing Store Profile, Shop Mode, Team, and Advanced sections remain unchanged.
- Each settings sub-section has its own Save button; there is no global single save across all four sections.
- Settings persist for the duration of the active browser session only (no backend required); values do not need to survive a full browser close or restart.
- The logo upload UI shows a file picker interaction but does not process or store the actual file — a mock placeholder state (e.g., "Logo selected: filename.png") is sufficient.
- The document template preview is a visual HTML/CSS representation of the document — no PDF generation engine is required.
- Template preview mock cart uses: 2–3 fixed sample line items (e.g., "Product A × 2 @ 50.00 = 100.00"), a 10% mock discount, and the saved or default 15% tax rate.
- The Tax Rate field accepts Arabic-Eastern numerals if the interface is in Arabic mode.
- Price Mode (inclusive/exclusive) affects how the preview displays prices and tax lines, but no POS calculation logic is implemented in this feature.
- The Discount-before-tax rule is documented as an informational note only — no calculation logic is part of this spec.
- i18n readiness means all strings are defined through the locale system established in spec 038; new strings are added to the locale files, not hardcoded.
- RTL readiness means using directional-agnostic layout patterns that automatically adapt to the active text direction without needing a separate language-specific stylesheet.
- The `shops-app` code label remains unchanged throughout this feature.
- No changes are made to Core Platform, landing page, or any other OS app.
