"use client";

import { useSyncExternalStore } from "react";
import { getMockUserName } from "@/lib/session";

const subscribeToNothing = () => () => {};

export default function BillingPage() {
  const userName = useSyncExternalStore(
    subscribeToNothing,
    () => getMockUserName() ?? "Workspace owner",
    () => "Workspace owner",
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="chip mb-2 text-white/30">{"// billing"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Plan &amp; billing
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Manage your subscription, payment method, and invoices.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Plan card */}
        <div className="card relative overflow-hidden p-6 lg:col-span-2">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle,#8b5cf6,transparent 70%)" }}
          />
          <div className="relative">
            <p className="chip mb-1 text-white/30">{"// current plan"}</p>
            <h2 className="gradient-text text-3xl font-bold">Beta Early-Bird</h2>
            <p className="mt-2 max-w-md text-sm text-white/50">
              You&apos;re on the free beta plan. Pricing locks in at the discounted rate when public launch ships.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="chip rounded-full border border-emerald-500/20 bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
                Active
              </span>
              <span className="chip rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-white/50">
                Renews May 12, 2027
              </span>
              <span className="chip rounded-full border border-purple-500/20 bg-purple-500/15 px-2 py-0.5 text-purple-300">
                Locked-in rate
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white">
                Upgrade plan
              </button>
              <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Payment card */}
        <div className="card p-6">
          <p className="chip mb-1 text-white/30">{"// payment method"}</p>
          <h3 className="text-lg font-semibold text-white">Card on file</h3>

          <div
            className="mt-5 rounded-xl border border-white/10 p-4"
            style={{
              background:
                "linear-gradient(135deg,rgba(59,130,246,0.15),rgba(139,92,246,0.1),rgba(6,182,212,0.1))",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="chip text-white/60">Visa</span>
            </div>
            <div className="mt-6 font-mono text-base tracking-widest text-white">
              •••• •••• •••• 4242
            </div>
            <div className="mt-3 flex justify-between font-mono text-[11px] text-white/60">
              <span>{userName}</span>
              <span>09/28</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10"
          >
            Update card
          </button>
        </div>
      </div>

      {/* Invoices */}
      <div className="card mt-5 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="chip mb-1 text-white/30">{"// invoices"}</p>
            <h3 className="text-lg font-semibold text-white">History</h3>
          </div>
          <button type="button" className="text-xs text-white/40 transition-colors hover:text-white">
            Download all
          </button>
        </div>

        <div className="rounded-xl border border-dashed border-white/10 py-14 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-white/70">No invoices yet</p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-white/30">
            Invoices will appear here once public pricing goes live.
          </p>
        </div>
      </div>
    </div>
  );
}
