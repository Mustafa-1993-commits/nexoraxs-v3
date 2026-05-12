interface InputProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
}

export function Input({
  label,
  id,
  type = "text",
  placeholder,
  autoComplete,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-white/60">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
