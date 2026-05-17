# Component API Contracts: packages/ui — @nexoraxs/ui

**Phase**: 1 | **Branch**: `032-shared-ui-library` | **Date**: 2026-05-17

These contracts define the public API of `@nexoraxs/ui`. Implementation must satisfy all contracts exactly. Breaking any contract is a semver-breaking change.

---

## Package Entry Point

```typescript
// Consumers import from the package root only:
import { Button, Input, Badge, Card, Icon, Logo } from "@nexoraxs/ui";
import type { ButtonProps, IconName, BadgeVariant, ... } from "@nexoraxs/ui";
```

**Guarantee**: All named exports listed in data-model.md barrel exports are available from `@nexoraxs/ui` with no sub-path imports required.

---

## Button Contract

```typescript
// Signature
function Button(props: ButtonProps): JSX.Element

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "destructive";  // default: "primary"
  size?: "sm" | "md" | "lg";                                    // default: "md"
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
```

**Guarantees**:
- `variant="primary"` renders with `btn-primary` class (blue gradient, shadow).
- `variant="secondary"` renders with border, no fill, subtle hover.
- `variant="ghost"` renders with no border or fill; hover shows subtle background.
- `variant="destructive"` renders with red/rose styling.
- `disabled={true}` adds `opacity-40 cursor-not-allowed`; click does not fire.
- `className` is appended after variant classes (allows override without losing variant style).
- Renders an HTML `<button>` element with the correct `type` attribute.

**Backward compatibility with core-platform**:
- Existing usages of `Button` with `variant="primary" | "secondary" | "ghost"` work unchanged.
- New `variant="destructive"` and `size` prop are additive — no breaking change.

---

## Input Contract

```typescript
// Signature
function Input(props: InputProps): JSX.Element

interface InputProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;        // NEW — validation error message
  disabled?: boolean;
  required?: boolean;
}
```

**Guarantees**:
- `label` always renders as a `<label>` element with `htmlFor={id}`.
- `error` renders below the input in rose/red tone; omitting `error` renders nothing below.
- When `error` is set, the input border becomes `border-rose-500` to signal invalid state.
- `disabled={true}` makes the input non-interactive with reduced opacity.
- The `id` prop is applied to both the `<input>` element and the `<label>`'s `htmlFor`.

**Backward compatibility with core-platform**:
- Existing `Input` usages (label, id, type, placeholder, autoComplete, value, onChange) work unchanged.
- `error` and `disabled` are additive new props.

---

## Badge Contract

```typescript
// Signature
function Badge(props: BadgeProps): JSX.Element

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "purple";
  className?: string;
}
```

**Guarantees**:
- Each variant has a distinct color from the NexoraXS palette (see data-model.md color table).
- Renders as an inline `<span>` with `rounded-full` border and small padding.
- No variant defaults to `"default"` (gray/neutral style).

**Migration from shops-app color API**:
- The shops-app `Badge` had `color` prop. The new shared `Badge` uses `variant`.
- All shops-app consumers must be updated from `color="emerald"` → `variant="success"` etc. per data-model.md mapping table.

---

## Card Contract

```typescript
// Signature
function Card(props: CardProps): JSX.Element

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
  as?: "div" | "section" | "article";
}
```

**Guarantees**:
- Renders with the NexoraXS glass-morphism dark style: `border border-white/8 bg-white/[0.03] rounded-[20px]`.
- `hover={true}` adds CSS transitions on border and background.
- `as` renders the specified HTML element (default `div`).
- `className` is appended; does not override the base dark glass style.
- Children render without clipping.

---

## Icon Contract

```typescript
// Signature
function Icon(props: IconProps): JSX.Element

type IconName = /* 48-member union — see data-model.md */

interface IconProps {
  name: IconName;
  className?: string;    // default: "w-4 h-4"
  strokeWidth?: number;  // default: 2
}
```

**Guarantees**:
- Every `IconName` value in the union renders a valid SVG path.
- No existing icon name from either app's current `Icon.tsx` is removed or renamed.
- The SVG renders `fill="none"`, `stroke="currentColor"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- `aria-hidden="true"` is set on the SVG element.
- `className` controls size (Tailwind `h-*` / `w-*` classes); defaults to `"w-4 h-4"`.

**Backward compatibility**:
- All `<Icon name="...">` usages in both apps continue to work with no prop changes.
- Additional icons beyond the existing sets are additive only.

---

## Logo Contract

```typescript
// Signature
function Logo(props: LogoProps): JSX.Element

type LogoApp = "core" | "shops";
type LogoSize = "sm" | "md";

interface LogoProps {
  app?: LogoApp;    // default: "core"
  size?: LogoSize;  // default: "md"
}
```

**Guarantees**:
- `app="core"` renders the NexoraXS wordmark (gradient icon box + "NexoraXS" text).
- `app="shops"` renders the Shops brandmark (shopping-bag icon + "Shops" text).
- `size="sm"` renders a compact version; `size="md"` is the standard size.
- Visual output is identical to the current app-local Logo in each respective app.

**Backward compatibility**:
- `apps/shops-app` currently uses `<Logo size="sm" />` — this maps to `<Logo app="shops" size="sm" />` after migration. The `size` prop is preserved.
- `apps/core-platform` uses `<Logo />` — this maps to `<Logo app="core" />` (default).

---

## Workspace Dependency Contract

```typescript
// Required in each consuming app's package.json:
{
  "dependencies": {
    "@nexoraxs/ui": "workspace:*"
  }
}

// Required in each consuming app's next.config.ts:
const nextConfig: NextConfig = {
  transpilePackages: ["@nexoraxs/ui"],
};
```

**Guarantee**: Any app that adds these two entries can immediately import any component from `@nexoraxs/ui` after running `pnpm install`.
