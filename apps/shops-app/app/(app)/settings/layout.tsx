import { SettingsNav } from "@/components/settings/SettingsNav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <p className="chip mb-2 text-gray-500">{"// settings"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-2 text-sm text-gray-400">
          Configure your Commerce OS preferences and account.
        </p>
      </div>
      <SettingsNav />
      <div className="mt-6">{children}</div>
    </div>
  );
}
