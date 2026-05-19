export interface InputProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export function Input({
  label,
  id,
  type = "text",
  placeholder,
  autoComplete,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
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
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={[
          "rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
            : "border-white/10 focus:border-blue-500 focus:ring-blue-500",
        ].join(" ")}
      />
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}
