type BadgeColor = "blue" | "emerald" | "amber" | "rose" | "purple" | "cyan" | "gray";

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
}

const colorMap: Record<BadgeColor, string> = {
  blue:    "bg-blue-500/15 text-blue-300 border-blue-500/20",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  amber:   "bg-amber-500/15 text-amber-300 border-amber-500/20",
  rose:    "bg-rose-500/15 text-rose-300 border-rose-500/20",
  purple:  "bg-purple-500/15 text-purple-300 border-purple-500/20",
  cyan:    "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  gray:    "bg-white/5 text-gray-400 border-white/10",
};

export function Badge({ children, color = "gray" }: BadgeProps) {
  return (
    <span
      className={`chip inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${colorMap[color]}`}
    >
      {children}
    </span>
  );
}
