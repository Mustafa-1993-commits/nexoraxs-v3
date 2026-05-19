import { POSHeader } from "@/components/pos/POSHeader";

export default function POSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0a0a0f]">
      <POSHeader />
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
