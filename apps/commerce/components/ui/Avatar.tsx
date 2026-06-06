"use client";

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

function nameHash(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h;
}

const AVATAR_COLORS = [
  ["#4f46e5", "#eef0ff"], ["#0d9488", "#e3f4f2"], ["#d97706", "#fdf2e3"],
  ["#7c3aed", "#ede9fe"], ["#0891b2", "#e0f2fe"], ["#dc2626", "#fef2f2"],
  ["#15824d", "#e7f5ed"], ["#b45309", "#fef9c3"],
];

export function Avatar({ name, size = 36, className = "" }: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  const [fg, bg] = AVATAR_COLORS[nameHash(name) % AVATAR_COLORS.length];
  const font = Math.max(10, Math.round(size * 0.35));

  return (
    <span
      className={className}
      style={{
        display: "inline-grid",
        placeItems: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        color: fg,
        fontWeight: 700,
        fontSize: font,
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {initials || "?"}
    </span>
  );
}
