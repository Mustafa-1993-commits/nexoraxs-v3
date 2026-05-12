import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-4 py-6 pt-20 md:ml-64 md:px-8 md:pt-8">
        {children}
      </main>
    </div>
  );
}
