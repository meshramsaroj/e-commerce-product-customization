import { faBox, faReceipt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const orders = [
    { id: "#10248", customer: "Avery Stone", items: 3, amount: "$248.00", status: "Processing", date: "Sep 18, 2026" },
    { id: "#10247", customer: "Jordan Lee", items: 1, amount: "$126.00", status: "Shipped", date: "Sep 18, 2026" },
    { id: "#10246", customer: "Taylor Kim", items: 5, amount: "$890.00", status: "Delivered", date: "Sep 17, 2026" },
    { id: "#10245", customer: "Morgan Reed", items: 1, amount: "$74.00", status: "Pending", date: "Sep 17, 2026" },
];

const AdminOrders = () => (
    <main className="min-h-full bg-secondary-light p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
            <div className="mb-6">
                <p className="text-sm font-semibold text-orange-600">ORDER MANAGEMENT</p>
                <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Orders</h1>
                <p className="mt-1 text-sm text-slate-500">Track and manage customer orders.</p>
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Order</th>
                                <th className="px-5 py-3 font-semibold">Customer</th>
                                <th className="px-5 py-3 font-semibold">Items</th>
                                <th className="px-5 py-3 font-semibold">Amount</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-5 py-4"><span className="inline-flex items-center gap-2 font-semibold text-indigo-600"><FontAwesomeIcon icon={faReceipt} />{order.id}</span></td>
                                    <td className="px-5 py-4 font-medium text-slate-700">{order.customer}</td>
                                    <td className="px-5 py-4 text-slate-500"><span className="inline-flex items-center gap-1"><FontAwesomeIcon icon={faBox} />{order.items}</span></td>
                                    <td className="px-5 py-4 font-semibold text-slate-800">{order.amount}</td>
                                    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${order.status === "Delivered" ? "bg-emerald-50 text-emerald-700" : order.status === "Shipped" ? "bg-indigo-50 text-indigo-700" : order.status === "Processing" ? "bg-orange-50 text-orange-700" : "bg-amber-50 text-amber-700"}`}>{order.status}</span></td>
                                    <td className="px-5 py-4 text-slate-500">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </main>
);

export default AdminOrders;
