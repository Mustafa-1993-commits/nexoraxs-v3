import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="chip mb-2 text-gray-500">{"// settings"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-2 text-sm text-gray-400">Configure your shop preferences and account.</p>
      </div>
      <PlaceholderPage
        icon="settings"
        title="Settings coming soon"
        description="Manage your shop mode, payment providers, team access, and account details."
      />
    </div>
  );
}
