"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@nexoraxs/ui";

interface SettingsTab {
  label: string;
  href: string;
  icon: IconName;
}

const TABS: SettingsTab[] = [
  { label: "General",    href: "/settings",            icon: "settings"   },
  { label: "Identity",   href: "/settings/identity",   icon: "users"      },
  { label: "Tax",        href: "/settings/tax",         icon: "percent"    },
  { label: "Invoicing",  href: "/settings/invoicing",   icon: "receipt"    },
  { label: "Templates",  href: "/settings/templates",   icon: "file-text"  },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1"
      aria-label="Settings navigation"
    >
      {TABS.map((tab) => {
        const isActive =
          tab.href === "/settings"
            ? pathname === "/settings"
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon name={tab.icon} className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
