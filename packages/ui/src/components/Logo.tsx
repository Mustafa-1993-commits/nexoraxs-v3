import { Icon } from "./Icon";

export type LogoApp = "core" | "shops";
export type LogoSize = "sm" | "md";

export interface LogoProps {
  app?: LogoApp;
  size?: LogoSize;
}

function CoreLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative h-7 w-7 overflow-hidden rounded-lg"
        style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6 50%,#06b6d4)" }}
      >
        <div className="absolute inset-[1.5px] flex items-center justify-center rounded-[6px] bg-[#0a0a0f]">
          <div
            className="h-3 w-3 rounded-sm"
            style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)" }}
          />
        </div>
      </div>
      <span className="text-[15px] font-bold tracking-tight text-white">
        Nexora
        <span
          style={{
            background: "linear-gradient(120deg, #3b82f6, #8b5cf6 50%, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          XS
        </span>
      </span>
    </div>
  );
}

function ShopsLogo({ size }: { size: LogoSize }) {
  const iconSize = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  const textSize = size === "sm" ? "text-[13px]" : "text-[15px]";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${iconSize} flex shrink-0 items-center justify-center rounded-lg text-blue-300`}
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

export function Logo({ app = "core", size = "md" }: LogoProps) {
  if (app === "shops") return <ShopsLogo size={size} />;
  return <CoreLogo />;
}
