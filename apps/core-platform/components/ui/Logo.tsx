export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative h-7 w-7 overflow-hidden rounded-lg"
        style={{
          background: "linear-gradient(135deg,#3b82f6,#8b5cf6 50%,#06b6d4)",
        }}
      >
        <div className="absolute inset-[1.5px] flex items-center justify-center rounded-[6px] bg-[#0a0a0f]">
          <div
            className="h-3 w-3 rounded-sm"
            style={{
              background:
                "linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)",
            }}
          />
        </div>
      </div>
      <span className="text-[15px] font-bold tracking-tight text-white">
        Nexora<span className="gradient-text">XS</span>
      </span>
    </div>
  );
}
