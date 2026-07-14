# Target Architecture v2 Alignment

## Current Temporary Mapping

In the current MVP codebase, `BusinessUnit` is the internal model name for the product concept called **Business**.

Product-language meaning:

- **Workspace** = Company / Group
- **Business** = Brand / Activity / Business Line
- **Branch** = Physical Location under a Business
- **OSSubscription** = License purchased by a Workspace
- **OSEnablement** = Where a subscribed OS is actually used
- **Industry Type** = Business classification
- **Commerce Preset** = Commerce-only operational template

## Why OSEnablement Exists

OS subscriptions are workspace-level purchases. They answer: "What OS license does this workspace have?"

OSEnablement answers a different question: "Where is that OS used?"

Examples:

- Commerce OS Pro can be enabled for Mustafa Fashion.
- Commerce OS Pro can also be enabled for Mustafa Pharmacy.
- HR OS Starter can be enabled at workspace scope for Mustafa Group.
- CRM OS Starter can be enabled at workspace scope for Mustafa Group.

This prevents subscriptions from becoming overloaded with usage scope and keeps future OS products independent.

## Mustafa Group Sample Mapping

```text
Workspace: Mustafa Group

Businesses:
- Mustafa Fashion
- Mustafa Pharmacy
- Mustafa Restaurant

Branches:
- Mustafa Fashion -> Nasr City
- Mustafa Fashion -> New Cairo
- Mustafa Pharmacy -> Nasr City
- Mustafa Pharmacy -> Maadi
- Mustafa Restaurant -> Alexandria

Subscriptions:
- Commerce OS Pro
- HR OS Starter
- CRM OS Starter

Enablements:
- Commerce OS -> Mustafa Fashion, scope business
- Commerce OS -> Mustafa Pharmacy, scope business
- Commerce OS -> Mustafa Restaurant, scope business
- HR OS -> Mustafa Group, scope workspace
- CRM OS -> Mustafa Group, scope workspace
```

## BusinessUnit vs Business

For this alignment:

- Keep `BusinessUnit` as the internal code symbol.
- Use **Business** in user-facing copy.
- Do not show "Default Business Unit", "Business Unit", or "BU" to users.
- Avoid a global rename until a dedicated safe-rename spec exists.

## Industry Type vs Commerce Preset

Industry Type belongs to Business and classifies what the business is.

Commerce Preset belongs to Commerce OS and configures operational defaults such as categories, units, suggested modules, POS behavior, and document recommendations.

Commerce Preset must not become the canonical cross-OS business classification.

Current compatibility rule:

- New Business records may store `industryType`.
- Legacy Business records derive display-only industry type from `presetId` or `preset`.
- Commerce setup can change `preset`/`presetId` without changing `industryType`.

## Branch Scoping

Branches belong to a Business. The same branch name may appear under different businesses.

Valid example:

```text
Mustafa Fashion -> Nasr City
Mustafa Pharmacy -> Nasr City
```

Commerce branch selectors and branch-scoped views must use the active Business to filter branches.

## Implementation Notes

- `BusinessUnit` remains the internal code symbol for Business until a dedicated safe-rename spec exists.
- `OSEnablement.branchIds` is the current contract; old mock rows with `branchId` are normalized by shared selectors.
- Core plan selection creates or reuses a workspace-level subscription and a workspace-scoped enablement only.
- Commerce setup creates the Business and Branch usage layer, then ensures an active business-scoped Commerce enablement.
- No backend APIs, microservices, or runtime imports from `docs/claude.aidesign` are part of this alignment.
