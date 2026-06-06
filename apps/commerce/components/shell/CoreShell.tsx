"use client";

import type { ReactNode } from "react";
import { Shell } from "./Shell";
import { useApp } from "@/lib/store";

interface CoreShellProps {
  children: ReactNode;
}

export function CoreShell({ children }: CoreShellProps) {
  const { t } = useApp();
  const navGroups = [
    {
      items: [
        { href: "/dashboard/apps", label: t("product_hub"), icon: "layout-grid" },
        { href: "/dashboard/billing", label: t("billing"), icon: "credit-card" },
        { href: "/dashboard/team", label: t("team"), icon: "users" },
        { href: "/dashboard/integrations", label: t("integrations"), icon: "plug" },
        { href: "/dashboard/settings", label: t("settings"), icon: "settings" },
      ],
    },
  ];
  return <Shell mode="core" navGroups={navGroups}>{children}</Shell>;
}
