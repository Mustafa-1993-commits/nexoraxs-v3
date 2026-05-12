interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variants = {
  primary: "bg-blue-600 hover:bg-blue-500 text-white",
  secondary: "border border-white/20 hover:bg-white/10 text-white",
  ghost: "text-white/60 hover:text-white hover:bg-white/5",
};

export function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
