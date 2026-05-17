type OrderStatus = "Paid" | "Refund" | "Pending";
import { Badge, Icon } from "@nexoraxs/ui";

const statusColor: Record<OrderStatus, "success" | "error" | "warning"> = {
  Paid: "success",
  Refund: "error",
  Pending: "warning",
};

const orders: {
  id: string;
  customer: string;
  items: number;
  total: string;
  method: string;
  time: string;
  status: OrderStatus;
}[] = [
  { id: "#ORD-10428", customer: "Aya Hassan", items: 4, total: "EGP 1,240", method: "Visa", time: "12:42", status: "Paid" },
  { id: "#ORD-10427", customer: "Walk-in", items: 1, total: "EGP 95", method: "Cash", time: "12:38", status: "Paid" },
  { id: "#ORD-10426", customer: "Omar Khaled", items: 7, total: "EGP 3,610", method: "Visa", time: "12:21", status: "Refund" },
  { id: "#ORD-10425", customer: "Layla N.", items: 2, total: "EGP 540", method: "Mada", time: "12:11", status: "Paid" },
  { id: "#ORD-10424", customer: "Walk-in", items: 3, total: "EGP 870", method: "Cash", time: "11:58", status: "Paid" },
  { id: "#ORD-10423", customer: "Hany M.", items: 5, total: "EGP 2,150", method: "Visa", time: "11:42", status: "Pending" },
];

const detailItems = [
  { name: "Iced Latte ×2", total: "EGP 77.00" },
  { name: "Chicken Sandwich ×2", total: "EGP 96.00" },
];

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="chip mb-2 text-gray-500">{"// orders"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Orders</h1>
        <p className="mt-2 text-sm text-gray-400">
          Track and manage customer orders.{" "}
          <span className="font-mono text-[11px] text-amber-400/80">Sample data</span>
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="card overflow-hidden lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/5">
                <tr className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-4 text-left">Order</th>
                  <th className="px-5 py-4 text-left">Customer</th>
                  <th className="px-5 py-4 text-left">Items</th>
                  <th className="px-5 py-4 text-left">Total</th>
                  <th className="px-5 py-4 text-left">Method</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`transition-colors hover:bg-white/[0.02] ${
                      order.id === "#ORD-10428" ? "bg-blue-500/5" : ""
                    }`}
                  >
                    <td className="px-5 py-4 font-mono text-xs text-gray-400">
                      {order.id}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-white">
                      {order.customer}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-400">
                      {order.items}
                    </td>
                    <td className="px-5 py-4 text-sm text-white">{order.total}</td>
                    <td className="px-5 py-4 text-sm text-gray-300">{order.method}</td>
                    <td className="px-5 py-4">
                      <Badge variant={statusColor[order.status]}>{order.status}</Badge>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-400">
                      {order.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5 lg:col-span-1">
          <p className="chip mb-3 text-gray-500">{"// order detail"}</p>
          <h2 className="text-2xl font-bold text-white">#ORD-10428</h2>
          <p className="mt-1 text-sm text-gray-400">Aya Hassan</p>

          <div className="mt-5 divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.02]">
            {detailItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-white/75">{item.name}</span>
                <span className="text-sm text-white">{item.total}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total</span>
              <span className="text-sm font-semibold text-white">EGP 1,240</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <Icon name="credit-card" className="h-4 w-4 text-gray-500" />
                Payment
              </span>
              <span className="text-sm text-white">Visa</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Status</span>
              <Badge variant="success">Paid</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Time</span>
              <span className="text-sm text-white">12:42</span>
            </div>
          </div>

          <p className="mt-4 font-mono text-[10px] text-gray-500">
            Sample order
          </p>
        </div>
      </div>
    </div>
  );
}
