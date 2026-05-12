"use client";

import { useState } from "react";

type TabId = "profile" | "workspace" | "team" | "security" | "api";

const tabs: { id: TabId; label: string }[] = [
  { id: "profile",   label: "Profile"    },
  { id: "workspace", label: "Workspace"  },
  { id: "team",      label: "Team"       },
  { id: "security",  label: "Security"   },
  { id: "api",       label: "API Keys"   },
];

function Field({ label, value, disabled = false }: { label: string; value: string; disabled?: boolean }) {
  return (
    <div>
      <div className="chip mb-1.5 text-white/40">{label}</div>
      <input
        defaultValue={value}
        disabled={disabled}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-blue-500/50 disabled:opacity-50"
      />
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-white">Profile</h3>
      <p className="mt-1 text-xs text-white/40">Update your personal info. This is visible to your team.</p>

      <div className="mb-6 mt-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl text-xl font-bold text-white" style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
          MA
        </div>
        <div>
          <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10">
            Upload avatar
          </button>
          <p className="chip mt-1.5 text-white/30">PNG or JPG, max 1MB</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name"  value="Mustafa Ahmed" />
        <Field label="Email"      value="mustafa@nexoraxs.com" />
        <Field label="Role"       value="Owner" disabled />
        <Field label="Timezone"   value="Africa/Cairo (UTC+2)" />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10">
          Cancel
        </button>
        <button type="button" className="btn-primary rounded-xl px-4 py-2 text-sm font-medium text-white">
          Save changes
        </button>
      </div>
    </div>
  );
}

function WorkspaceTab() {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-white">Workspace settings</h3>
      <p className="mt-1 text-xs text-white/40">Configure the current workspace — Mustafa&apos;s Co.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Workspace name"   value="Mustafa's Co." />
        <Field label="Slug"             value="mustafa-co" />
        <Field label="Region"           value="eu-central-1" disabled />
        <Field label="Default currency" value="EGP" />
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" className="btn-primary rounded-xl px-4 py-2 text-sm font-medium text-white">
          Save changes
        </button>
      </div>

      {/* Danger zone */}
      <div className="mt-8 border-t border-white/5 pt-6">
        <div className="flex items-start gap-4 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/15 text-rose-300">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Delete workspace</p>
            <p className="mt-0.5 text-xs text-white/40">This permanently removes the workspace and all its data. Cannot be undone.</p>
          </div>
          <button type="button" className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-200 transition-colors hover:bg-rose-500/20">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamTab() {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-white">Team</h3>
      <p className="mt-1 text-xs text-white/40">Invite teammates and assign roles per workspace.</p>
      <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-14 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-white/70">Team management coming soon</p>
        <p className="mt-1 max-w-xs text-xs text-white/30">Roles, permissions &amp; SSO land in the next release.</p>
      </div>
    </div>
  );
}

function SecurityTab() {
  const rows = [
    { label: "Two-factor authentication", desc: "Require a TOTP code at sign-in.", on: true },
    { label: "Sign-in alerts", desc: "Email me when a new device signs in.", on: true },
    { label: "Restrict by IP", desc: "Allow access only from approved IPs.", on: false },
  ];
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-white">Security</h3>
      <p className="mt-1 text-xs text-white/40">Authentication &amp; session controls.</p>
      <div className="mt-6 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{r.label}</p>
              <p className="mt-0.5 text-xs text-white/40">{r.desc}</p>
            </div>
            {/* Visual-only toggle */}
            <div className={`relative h-6 w-11 rounded-full ${r.on ? "bg-blue-500" : "bg-white/10"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${r.on ? "left-5" : "left-0.5"}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiKeysTab() {
  const keys = [
    { name: "Production", key: "nxs_live_••••••••••••4f2a", created: "May 1, 2026" },
    { name: "Sandbox",    key: "nxs_test_••••••••••••91c3", created: "Apr 20, 2026" },
  ];
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-white">API Keys</h3>
      <p className="mt-1 text-xs text-white/40">Use these tokens to call NexoraXS APIs from your backend.</p>
      <div className="mt-6 divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.02]">
        {keys.map((k) => (
          <div key={k.name} className="flex items-center gap-4 p-4">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{k.name}</p>
              <p className="chip truncate text-white/40">{k.key} · created {k.created}</p>
            </div>
            <button type="button" className="text-xs text-white/40 transition-colors hover:text-white">
              Revoke
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="btn-primary mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white">
        Generate new key
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="chip mb-2 text-white/30">// settings</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-2 text-sm text-white/50">Personal and workspace configuration.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Tab nav */}
        <nav className="space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`nav-item flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors
                ${activeTab === t.id ? "bg-white/5 text-white" : "text-white/50 hover:bg-white/[0.03] hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div>
          {activeTab === "profile"   && <ProfileTab />}
          {activeTab === "workspace" && <WorkspaceTab />}
          {activeTab === "team"      && <TeamTab />}
          {activeTab === "security"  && <SecurityTab />}
          {activeTab === "api"       && <ApiKeysTab />}
        </div>
      </div>
    </div>
  );
}
