export interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Card({ children, hover = false, className = "", as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={[
        "border border-white/[0.08] bg-white/[0.03] rounded-[20px]",
        hover ? "transition-colors hover:border-white/[0.16] hover:bg-white/5" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
