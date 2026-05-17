# Data Model: packages/ui — Shared Component Library

**Phase**: 1 | **Branch**: `032-shared-ui-library` | **Date**: 2026-05-17

All types live in `packages/ui/src/index.ts` (re-exported). No runtime data — all shapes are TypeScript prop interfaces and union types.

---

## Component Prop Types

### Button

```typescript
// packages/ui/src/components/Button.tsx

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;          // default: "primary"
  size?: ButtonSize;                // default: "md"
  type?: "button" | "submit";      // default: "button"
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
```

**Size scale**:
- `sm`: `px-3 py-1.5 text-xs`
- `md`: `px-4 py-2.5 text-sm`
- `lg`: `px-6 py-3 text-base`

---

### Input

```typescript
// packages/ui/src/components/Input.tsx

export interface InputProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password" | "number" | "tel";  // default: "text"
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;                   // NEW: shows red border + error message below
  disabled?: boolean;
  required?: boolean;
}
```

---

### Badge

```typescript
// packages/ui/src/components/Badge.tsx

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "purple";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;           // default: "default"
  className?: string;
}
```

**Color mapping**:
| Variant   | Background         | Text          | Border              |
|-----------|--------------------|---------------|---------------------|
| default   | `bg-white/5`       | `text-gray-400` | `border-white/10` |
| success   | `bg-emerald-500/15`| `text-emerald-300` | `border-emerald-500/20` |
| warning   | `bg-amber-500/15`  | `text-amber-300` | `border-amber-500/20` |
| error     | `bg-rose-500/15`   | `text-rose-300` | `border-rose-500/20` |
| info      | `bg-blue-500/15`   | `text-blue-300` | `border-blue-500/20` |
| purple    | `bg-purple-500/15` | `text-purple-300` | `border-purple-500/20` |

---

### Card

```typescript
// packages/ui/src/components/Card.tsx

export interface CardProps {
  children: React.ReactNode;
  hover?: boolean;                  // default: false — adds hover effect
  className?: string;
  as?: "div" | "section" | "article";  // default: "div"
}
```

**Base style**: `border border-white/8 bg-white/[0.03] rounded-[20px]`
**Hover style** (when `hover={true}`): adds `transition-colors hover:border-white/16 hover:bg-white/5`

---

### Icon

```typescript
// packages/ui/src/components/Icon.tsx

export type IconName =
  // Core-platform icons
  | "apps" | "check" | "building" | "globe" | "zap"
  // Shops-app icons (includes duplicates already merged)
  | "dashboard" | "package" | "users" | "chart-bar" | "settings"
  | "shopping-bag" | "scan-line" | "bell" | "search"
  | "chevron-down" | "chevron-left" | "chevron-right" | "chevrons-up-down"
  | "map-pin" | "arrow-up-right" | "credit-card" | "banknote"
  | "plus" | "download" | "package-plus" | "receipt"
  | "user-plus" | "package-search" | "file-text"
  | "alert-triangle" | "trending-up" | "menu" | "x"
  | "boxes" | "tag" | "percent" | "smartphone" | "watch" | "shirt"
  | "shopping-cart" | "cpu" | "sparkles" | "store-front" | "layers"
  | "minus" | "wallet" | "check-circle";

export interface IconProps {
  name: IconName;
  className?: string;               // default: "w-4 h-4"
  strokeWidth?: number;             // default: 2
}
```

**Total**: 48 unique icon names (merged union of both apps).

---

### Logo

```typescript
// packages/ui/src/components/Logo.tsx

export type LogoApp = "core" | "shops";
export type LogoSize = "sm" | "md";

export interface LogoProps {
  app?: LogoApp;                    // default: "core"
  size?: LogoSize;                  // default: "md"
}
```

**App variants**:
- `"core"`: NexoraXS wordmark — gradient box + "NexoraXS" text (from core-platform Logo)
- `"shops"`: Shops brandmark — shopping-bag icon + "Shops" text (from shops-app Logo)

---

## Design Token Values

```typescript
// Referenced but not typed — values are CSS custom properties in tokens.css

export const DESIGN_TOKENS = {
  colorBg:          "#0a0a0f",
  colorPurple:      "#7C3AED",
  colorPurpleLight: "#8B5CF6",
  colorBlue:        "#3B82F6",
  colorCyan:        "#06B6D4",
  colorCyanLight:   "#00D4FF",
  colorWhite:       "#FFFFFF",
  colorMuted:       "#94A3B8",
} as const;
```

---

## Barrel Exports (src/index.ts)

```typescript
// All public exports from packages/ui

export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";

export { Input } from "./components/Input";
export type { InputProps } from "./components/Input";

export { Badge } from "./components/Badge";
export type { BadgeProps, BadgeVariant } from "./components/Badge";

export { Card } from "./components/Card";
export type { CardProps } from "./components/Card";

export { Icon } from "./components/Icon";
export type { IconProps, IconName } from "./components/Icon";

export { Logo } from "./components/Logo";
export type { LogoProps, LogoApp, LogoSize } from "./components/Logo";
```

---

## Migration Type Mapping

For `apps/core-platform/lib/types.ts` backward compatibility:

```typescript
// After migration — add to lib/types.ts to avoid breaking existing imports
export type { IconName } from "@nexoraxs/ui";
```

For shops-app Badge color → variant migration:

```typescript
// Before (shops-app local Badge)       →  After (@nexoraxs/ui Badge)
// <Badge color="emerald">              →  <Badge variant="success">
// <Badge color="amber">               →  <Badge variant="warning">
// <Badge color="rose">                →  <Badge variant="error">
// <Badge color="blue">                →  <Badge variant="info">
// <Badge color="cyan">                →  <Badge variant="info">
// <Badge color="purple">              →  <Badge variant="purple">
// <Badge color="gray">                →  <Badge variant="default">  (or omit — default)
```
