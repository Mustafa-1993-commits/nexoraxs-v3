export type IconName =
  | "dashboard" | "package" | "users" | "chart-bar" | "settings"
  | "shopping-bag" | "scan-line" | "bell" | "search"
  | "chevron-down" | "chevron-left" | "chevron-right" | "chevrons-up-down"
  | "map-pin" | "arrow-up-right" | "credit-card" | "banknote"
  | "plus" | "download" | "package-plus" | "receipt"
  | "user-plus" | "package-search" | "file-text"
  | "alert-triangle" | "trending-up" | "menu" | "x"
  | "boxes" | "tag" | "percent";

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

const paths: Record<IconName, string> = {
  "dashboard":
    "M3 3h7v9H3V3zm0 13h7v5H3v-5zm11-13h7v5h-7V3zm0 9h7v9h-7v-9z",
  "package":
    "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01 20.73 6.96M12 22.08V12",
  "boxes":
    "M3 7.5 12 3l9 4.5-9 4.5-9-4.5ZM3 7.5V16.5L12 21l9-4.5V7.5M12 12v9",
  "users":
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 2a4 4 0 0 1 0 8M23 21v-2a4 4 0 0 0-3-3.87",
  "chart-bar":
    "M3 3v18h18M18 17V9M12 17V5M6 17v-3",
  "settings":
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  "shopping-bag":
    "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  "scan-line":
    "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10",
  "bell":
    "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  "search":
    "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm5.66-.66 3.5 3.5",
  "chevron-down":
    "M6 9l6 6 6-6",
  "chevron-left":
    "M15 18l-6-6 6-6",
  "chevron-right":
    "M9 18l6-6-6-6",
  "chevrons-up-down":
    "M7 15l5 5 5-5M7 9l5-5 5 5",
  "map-pin":
    "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  "arrow-up-right":
    "M7 17L17 7M7 7h10v10",
  "credit-card":
    "M1 4h22v16H1zM1 10h22",
  "banknote":
    "M2 5h20v14H2zM6 15h4M2 10h20M16 15h2",
  "plus":
    "M12 5v14M5 12h14",
  "download":
    "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  "package-plus":
    "M16 21v-5M13.5 18.5h5M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0zM3.27 6.96 12 12.01 20.73 6.96M12 22.08V12",
  "receipt":
    "M4 2h16v20l-4-2-4 2-4-2-4 2V2zM9 7h6M9 11h6M9 15h4",
  "user-plus":
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7 3h6M20 15v6",
  "package-search":
    "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0M3.27 6.96 12 12.01 20.73 6.96M12 22.08V12m3-3.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM22 22l-1.5-1.5",
  "file-text":
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  "alert-triangle":
    "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  "trending-up":
    "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  "menu":
    "M3 12h18M3 6h18M3 18h18",
  "x":
    "M18 6 6 18M6 6l12 12",
  "tag":
    "M20.59 13.41 11 23l-9-9V5a2 2 0 0 1 2-2h9l7.59 7.41a2 2 0 0 1 0 2zM7 7h.01",
  "percent":
    "M19 5 5 19M7 7h.01M17 17h.01",
};

export function Icon({ name, className = "w-4 h-4", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
