"use client";

import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useApp, type Toast as ToastType } from "@/lib/store";

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warn: AlertTriangle,
  info: Info,
};

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const Icon = ICONS[toast.type || "info"];
  return (
    <div className={`nx-toast ${toast.type || ""}`} role="alert">
      <Icon size={18} />
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "inherit", opacity: 0.7 }}
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastHost() {
  const { toasts, dismissToast } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="nx-toast-host" aria-live="polite">
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={dismissToast} />
        ))}
      </div>
    </div>
  );
}
