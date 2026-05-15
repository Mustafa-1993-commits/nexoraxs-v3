import { Badge } from "@/components/dashboard/Badge";

type CustomerSegment = "VIP" | "Regular" | "New";
type SegmentColor = "purple" | "blue" | "emerald";

const segmentColor: Record<CustomerSegment, SegmentColor> = {
  VIP: "purple",
  Regular: "blue",
  New: "emerald",
};

const customers: {
  name: string;
  contact: string;
  lastOrder: string;
  spend: string;
  segments: CustomerSegment[];
}[] = [
  { name: "Aya Hassan", contact: "aya@example.com", lastOrder: "3 Jan 2026", spend: "EGP 18,420", segments: ["VIP"] },
  { name: "Omar Khaled", contact: "omar@example.com", lastOrder: "2 Jan 2026", spend: "EGP 7,610", segments: ["Regular"] },
  { name: "Layla Nasser", contact: "layla@example.com", lastOrder: "2 Jan 2026", spend: "EGP 540", segments: ["New"] },
  { name: "Ahmed Samy", contact: "ahmed@example.com", lastOrder: "1 Jan 2026", spend: "EGP 4,320", segments: ["Regular"] },
  { name: "Mariam Hassan", contact: "mariam@example.com", lastOrder: "30 Dec 2025", spend: "EGP 22,100", segments: ["VIP"] },
];

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function CustomersPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="chip mb-2 text-gray-500">{"// customers"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Customers</h1>
        <p className="mt-2 text-sm text-gray-400">
          View and manage your customer base.{" "}
          <span className="font-mono text-[11px] text-amber-400/80">Sample data</span>
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {[
          { label: "Total customers", value: "1,284" },
          { label: "Active this month", value: "847" },
          { label: "New this week", value: "23" },
        ].map((item) => (
          <div key={item.label} className="card px-4 py-3 text-center">
            <div className="text-lg font-bold text-white">{item.value}</div>
            <div className="font-mono text-[10px] text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {customers.map((customer) => (
          <div key={customer.name} className="card flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/60 to-blue-500/60 text-xs font-semibold text-white">
              {initials(customer.name)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-white">{customer.name}</div>
              <div className="truncate text-xs text-gray-500">{customer.contact}</div>
              <div className="truncate text-xs text-gray-400">Last order: {customer.lastOrder}</div>
            </div>

            <div className="flex-shrink-0 text-sm font-semibold text-white">
              {customer.spend}
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {customer.segments.map((segment) => (
                <Badge key={segment} color={segmentColor[segment]}>
                  {segment}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
