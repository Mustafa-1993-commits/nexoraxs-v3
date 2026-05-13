import { Icon } from "./Icon";

interface LogoProps {
  size?: "sm" | "md";
}

export function Logo({ size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  const textSize = size === "sm" ? "text-[13px]" : "text-[15px]";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${iconSize} flex flex-shrink-0 items-center justify-center rounded-lg text-blue-300`}
        style={{
          background: "rgba(59,130,246,0.18)",
          border: "1px solid rgba(59,130,246,0.3)",
        }}
      >
        <Icon name="shopping-bag" className="h-4 w-4" strokeWidth={2.2} />
      </div>
      <span className={`${textSize} font-bold tracking-tight text-white`}>
        Shops
      </span>
    </div>
  );
}
