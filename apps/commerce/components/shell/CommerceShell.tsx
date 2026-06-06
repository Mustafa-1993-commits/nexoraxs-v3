"use client";

import type { ReactNode } from "react";
import { Shell } from "./Shell";
import { useApp } from "@/lib/store";

interface CommerceShellProps {
  children: ReactNode;
}

export function CommerceShell({ children }: CommerceShellProps) {
  const { t } = useApp();
  const navGroups = [
    {
      items: [
        { href: "/dashboard", label: t("dashboard"), icon: "layout-dashboard" },
        { href: "/pos", label: t("pos"), icon: "scan-barcode" },
        { href: "/products", label: t("products"), icon: "package" },
        { href: "/inventory", label: t("inventory"), icon: "boxes" },
        { href: "/orders", label: t("orders"), icon: "shopping-bag" },
        { href: "/invoices", label: t("invoices"), icon: "receipt" },
        { href: "/customers", label: t("customers"), icon: "user-round" },
        { href: "/reports", label: t("reports"), icon: "bar-chart-3" },
        { href: "/settings", label: t("settings"), icon: "settings" },
      ],
    },
  ];
  return <Shell mode="commerce" navGroups={navGroups}>{children}</Shell>;
}
