"use client";

import { Avatar } from "./Avatar";

interface BrandMarkProps {
  name: string;
  logo?: string | null;
  size?: number;
  radius?: number;
}

export function BrandMark({ name, logo, size = 38, radius = 10 }: BrandMarkProps) {
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={name}
        style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", flexShrink: 0 }}
      />
    );
  }
  return <Avatar name={name} size={size} />;
}
