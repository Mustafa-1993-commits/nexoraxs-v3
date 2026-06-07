"use client";

import { useState } from "react";
import { Avatar } from "./Avatar";

interface BrandMarkProps {
  name: string;
  logo?: string | null;
  size?: number;
  radius?: number;
  variant?: "default" | "badge" | "selector" | "document";
}

const VARIANT_SIZES = {
  default: { box: 38, image: 34, radius: 10 },
  badge: { box: 24, image: 22, radius: 7 },
  selector: { box: 34, image: 28, radius: 9 },
  document: { box: 38, image: 34, radius: 10 },
};

export function BrandMark({ name, logo, size, radius, variant = "default" }: BrandMarkProps) {
  const [failedLogo, setFailedLogo] = useState<string | null>(null);
  const variantSize = VARIANT_SIZES[variant];
  const boxSize = size ?? variantSize.box;
  const imageSize = variant === "badge"
    ? 22
    : variant === "selector"
      ? 28
      : Math.max(0, boxSize - 4);
  const markRadius = radius ?? variantSize.radius;

  if (logo && failedLogo !== logo) {
    return (
      <span
        className={`nx-brand-mark nx-brand-mark-${variant}`}
        style={{ width: boxSize, height: boxSize, borderRadius: markRadius }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={name}
          style={{ maxWidth: imageSize, maxHeight: imageSize }}
          onError={() => setFailedLogo(logo)}
        />
      </span>
    );
  }
  return <Avatar name={name} size={boxSize} />;
}
