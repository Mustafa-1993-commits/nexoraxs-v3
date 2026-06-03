"use client";

import { Badge, Icon } from "@nexoraxs/ui";
import { useSyncExternalStore } from "react";
import { getBranch, getCurrency, getMode, type ShopsMode } from "@/lib/mode";

const modeLabel: Record<ShopsMode, string> = {
  physical: "Physical Store",
  online: "Online Store",
  both: "Both",
};

function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function SettingRow({
  icon,
  label,
  value,
}: {
  icon: "dashboard" | "map-pin" | "banknote" | "users" | "settings";
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm text-white">{value}</div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const mounted = useMounted();
  const branch = mounted ? getBranch() ?? "Maadi Main" : "Maadi Main";
  const currency = mounted ? getCurrency() ?? "EGP" : "EGP";
  const mode = mounted ? getMode() ?? "both" : "both";

  if (!mounted) {
    return (
      <div>
        <div className="card p-6">
          <div className="h-4 w-32 rounded bg-white/5" />
          <div className="mt-4 space-y-3">
            <div className="h-12 rounded-xl bg-white/[0.02]" />
            <div className="h-12 rounded-xl bg-white/[0.02]" />
            <div className="h-12 rounded-xl bg-white/[0.02]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        <section className="card p-6 space-y-4">
          <div>
            <p className="chip mb-1 text-gray-500">{"// store profile"}</p>
            <h2 className="text-lg font-semibold text-white">Store Profile</h2>
          </div>
          <SettingRow icon="dashboard" label="Store" value="Mustafa&apos;s Co." />
          <SettingRow icon="map-pin" label="Branch" value={branch} />
          <SettingRow icon="banknote" label="Currency" value={currency} />
          <span className="chip cursor-not-allowed text-gray-600">Edit</span>
        </section>

        <section className="card p-6 space-y-4">
          <div>
            <p className="chip mb-1 text-gray-500">{"// shop mode"}</p>
            <h2 className="text-lg font-semibold text-white">Shop Mode</h2>
          </div>
          <SettingRow icon="dashboard" label="Selected mode" value={modeLabel[mode]} />
          <p className="text-xs text-gray-600">
            Selected during onboarding · change in onboarding flow
          </p>
        </section>

        <section className="card p-6 space-y-4">
          <div>
            <p className="chip mb-1 text-gray-500">{"// team"}</p>
            <h2 className="text-lg font-semibold text-white">Team</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <div>
                <div className="text-sm text-white">Mustafa Mohamed</div>
                <div className="text-xs text-gray-500">Owner</div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <div>
                <div className="text-sm text-white">Placeholder Staff</div>
                <div className="text-xs text-gray-500">Cashier</div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
          </div>
          <button
            type="button"
            disabled
            className="mt-2 text-xs text-gray-600 cursor-not-allowed"
          >
            + Invite member
          </button>
        </section>

        <section className="card p-6 space-y-4">
          <div>
            <p className="chip mb-1 text-gray-500">{"// advanced"}</p>
            <h2 className="text-lg font-semibold text-white">Advanced</h2>
          </div>
          <div className="flex items-center justify-between py-2 text-sm text-white/70">
            <span>Auto-close orders</span>
            <span className="inline-block h-5 w-9 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center justify-between py-2 text-sm text-white/70">
            <span>Email receipts</span>
            <span className="inline-block h-5 w-9 rounded-full bg-blue-600/60" />
          </div>
        </section>
      </div>

      <button
        type="button"
        disabled
        className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/30 cursor-not-allowed"
      >
        Save changes
      </button>
    </div>
  );
}
