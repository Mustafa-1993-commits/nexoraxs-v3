"use client";

import { useCallback, useMemo, useReducer, useState } from "react";
import { useApp } from "@/lib/store";
import type { ShellPresentationView } from "./contracts";
import {
  createShellPresentationState,
  evaluateShellContext,
  projectShellNotifications,
  shellStateForContext,
} from "./presentation";

export function useShellPresentation(): ShellPresentationView {
  const {
    currentUser,
    currentUserDisplayName,
    lang,
    products,
    orders,
    COMMERCE_PLAN,
    money,
    shellContextSnapshot,
    theme,
  } = useApp();
  const [, retry] = useReducer((value: number) => value + 1, 0);
  const [recovering, setRecovering] = useState(false);
  const retryContext = useCallback(() => {
    setRecovering(true);
    requestAnimationFrame(() => {
      retry();
      requestAnimationFrame(() => setRecovering(false));
    });
  }, []);
  const context = useMemo(() => evaluateShellContext(shellContextSnapshot), [shellContextSnapshot]);
  const state = useMemo(
    () => recovering
      ? createShellPresentationState("recovering")
      : shellStateForContext(context),
    [context, recovering],
  );
  const notifications = useMemo(() => projectShellNotifications({
    products,
    orders,
    plan: COMMERCE_PLAN,
    money,
    locale: lang,
  }), [COMMERCE_PLAN, lang, money, orders, products]);

  return useMemo(() => ({
    actor: {
      id: currentUser?.id ?? null,
      displayName: currentUserDisplayName,
      email: currentUser?.email ?? null,
    },
    context,
    state,
    notifications,
    preferences: {
      locale: lang,
      direction: lang === "ar" ? "rtl" : "ltr",
      theme,
      reducedMotion: typeof window !== "undefined"
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    },
    retryContext,
  }), [context, currentUser?.email, currentUser?.id, currentUserDisplayName, lang, notifications, retryContext, state, theme]);
}
