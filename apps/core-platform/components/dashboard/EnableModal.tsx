"use client";

import { useEffect } from "react";

interface EnableModalProps {
  app: { name: string; description: string };
  onConfirm: () => void;
  onClose: () => void;
}

export function EnableModal({ app, onConfirm, onClose }: EnableModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1117] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-white">Enable {app.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {app.description}
        </p>
        <p className="mt-3 text-sm text-white/50">
          This app will be activated for your workspace. You can disable it at any time from settings.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            Enable {app.name}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
