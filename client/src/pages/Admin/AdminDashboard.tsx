
import {
    faArrowUp,
    faBox,
    faChartBar,
    faChevronRight,
    faPlus,
    faShoppingCart,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const statistics = [
    {
        label: "Total orders",
        value: "1,248",
        change: "+12.5%",
        icon: faShoppingCart,
        iconClass: "bg-orange-100 text-orange-600",
    },
    {
        label: "Total products",
        value: "128",
        change: "+8.2%",
        icon: faBox,
        iconClass: "bg-indigo-100 text-indigo-600",
    },
    {
        label: "Active users",
        value: "4,862",
        change: "+18.4%",
        icon: faUsers,
        iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
        label: "Revenue",
        value: "$84,290",
        change: "+24.1%",
        icon: faChartBar,
        iconClass: "bg-violet-100 text-violet-600",
    },
];

const recentOrders = [
    { id: "#10248", customer: "Avery Stone", amount: "$248.00", status: "Processing", date: "Sep 18, 2026" },
    { id: "#10247", customer: "Jordan Lee", amount: "$126.00", status: "Shipped", date: "Sep 18, 2026" },
    { id: "#10246", customer: "Taylor Kim", amount: "$890.00", status: "Delivered", date: "Sep 17, 2026" },
    { id: "#10245", customer: "Morgan Reed", amount: "$74.00", status: "Pending", date: "Sep 17, 2026" },
];

const chartBars = [42, 58, 48, 72, 63, 84, 76, 92, 86, 100, 88, 96];

const AdminDashboard = () => {
    return (
        <main className="min-h-full bg-secondary-light p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-orange-600">ADMIN OVERVIEW</p>
                        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Dashboard</h1>
                        <p className="mt-1 text-sm text-slate-500">Here is what is happening with your store today.</p>
                    </div>

                    <button className="btn btn-primary w-fit gap-2 bg-slate-900 shadow-lg shadow-slate-900/10">
                        <FontAwesomeIcon icon={faPlus} />
                        Add product
                    </button>
                </header>

                <section aria-label="Store statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statistics.map((stat) => (
                        <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>
                                </div>
                                <span className={`grid h-11 w-11 place-items-center rounded-xl ${stat.iconClass}`}>
                                    <FontAwesomeIcon icon={stat.icon} />
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm">
                                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                                    <FontAwesomeIcon icon={faArrowUp} />
                                    {stat.change}
                                </span>
                                <span className="text-slate-400">from last month</span>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Sales overview</h2>
                                <p className="mt-1 text-sm text-slate-500">Revenue performance over the last 12 months</p>
                            </div>
                            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">+24.1%</span>
                        </div>

                        <div className="mt-8 flex h-64 items-end gap-2 sm:gap-4" aria-label="Monthly revenue chart">
                            {chartBars.map((height, index) => (
                                <div key={index} className="group flex h-full flex-1 flex-col justify-end gap-2">
                                    <div
                                        className="relative w-full rounded-t-lg bg-indigo-100 transition group-hover:bg-indigo-500"
                                        style={{ height: `${height}%` }}
                                    >
                                        <span className="absolute inset-x-0 -top-7 text-center text-[10px] font-semibold text-slate-500 opacity-0 transition group-hover:opacity-100">
                                            ${height}k
                                        </span>
                                    </div>
                                    <span className="text-center text-[10px] font-medium text-slate-400">
                                        {index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Recent activity</h2>
                                <p className="mt-1 text-sm text-slate-500">Latest store updates</p>
                            </div>
                            <button className="text-slate-400 transition hover:text-slate-700" aria-label="View all activity">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>

                        <div className="mt-6 space-y-5">
                            {[
                                ["New order", "Order #10248 was placed", "8 min ago"],
                                ["Product updated", "Wireless Headphones changed", "32 min ago"],
                                ["New customer", "Avery Stone joined", "1 hr ago"],
                                ["Inventory check", "12 products need review", "2 hrs ago"],
                            ].map(([title, description, time], index) => (
                                <div key={title} className="flex gap-3">
                                    <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${index === 0 ? "bg-orange-500" : index === 1 ? "bg-indigo-500" : "bg-emerald-500"}`} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-800">{title}</p>
                                        <p className="mt-0.5 truncate text-xs text-slate-500">{description}</p>
                                        <p className="mt-1 text-[11px] text-slate-400">{time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>

                <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Recent orders</h2>
                            <p className="mt-1 text-sm text-slate-500">The latest customer purchases</p>
                        </div>
                        <button className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800">View all</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] text-left">
                            <thead>
                                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                                    <th className="px-6 py-3 font-semibold">Order</th>
                                    <th className="px-6 py-3 font-semibold">Customer</th>
                                    <th className="px-6 py-3 font-semibold">Amount</th>
                                    <th className="px-6 py-3 font-semibold">Status</th>
                                    <th className="px-6 py-3 font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-slate-100 text-sm last:border-0 hover:bg-slate-50">
                                        <td className="px-6 py-4 font-semibold text-indigo-600">{order.id}</td>
                                        <td className="px-6 py-4 font-medium text-slate-700">{order.customer}</td>
                                        <td className="px-6 py-4 font-semibold text-slate-800">{order.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${order.status === "Delivered" ? "bg-emerald-50 text-emerald-700" : order.status === "Shipped" ? "bg-indigo-50 text-indigo-700" : order.status === "Processing" ? "bg-orange-50 text-orange-700" : "bg-amber-50 text-amber-700"}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AdminDashboard;