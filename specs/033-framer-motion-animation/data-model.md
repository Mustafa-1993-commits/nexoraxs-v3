# Data Model: Framer Motion — Add to Approved Stack

**Phase**: 1 | **Branch**: `033-framer-motion-animation` | **Date**: 2026-05-17

All types are from `framer-motion`. No runtime data — these are static typed variant objects.

---

## Animation Preset Type

```typescript
// From framer-motion package (not redefined)
import type { Variants } from "framer-motion";

// Each preset satisfies: Variants
```

---

## Preset Definitions

```typescript
// apps/landing/src/lib/animations.ts

import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
```

---

## Usage Pattern

```tsx
// In any apps/landing component:
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.h2 variants={fadeInUp}>Heading</motion.h2>
  <motion.p variants={fadeInUp}>Paragraph</motion.p>
</motion.section>
```

---

## Constitution Amendment Row

```markdown
| Animation   | Framer Motion        | latest    | Landing + future apps          |
```

Inserted after the existing `| Infra | Docker Compose | — | Local + production |` row.
