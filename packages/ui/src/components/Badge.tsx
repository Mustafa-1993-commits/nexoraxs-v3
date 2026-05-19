export type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "purple";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-white/5 text-gray-400 border-white/10",
  success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  warning: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  error:   "bg-rose-500/15 text-rose-300 border-rose-500/20",
  info:    "bg-blue-500/15 text-blue-300 border-blue-500/20",
  purple:  "bg-purple-500/15 text-purple-300 border-purple-500/20",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
