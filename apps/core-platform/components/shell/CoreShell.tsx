"use client";

import type { ReactNode } from "react";
import { Shell, type NavGroup } from "./Shell";
import { useApp } from "@/lib/store";

interface CoreShellProps {
  children: ReactNode;
}

export function CoreShell({ children }: CoreShellProps) {
  const { t } = useApp();
  const navGroups: NavGroup[] = [
    {
      items: [
        { id: "product-hub", href: "/dashboard/apps", label: t("product_hub"), icon: "layout-grid", match: "exact", searchable: true },
        { id: "billing", href: "/dashboard/billing", label: t("billing"), icon: "credit-card", match: "exact", searchable: true },
        { id: "team", href: "/dashboard/team", label: t("team"), icon: "users", match: "exact", searchable: true },
        { id: "integrations", href: "/dashboard/integrations", label: t("integrations"), icon: "plug", match: "exact", searchable: true },
        { id: "settings", href: "/dashboard/settings", label: t("settings"), icon: "settings", match: "exact", searchable: true },
      ],
    },
  ];
  return <Shell mode="core" navGroups={navGroups}>{children}</Shell>;
}
