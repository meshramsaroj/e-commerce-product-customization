import {
    faBox,
    faChartBar,
    faChevronRight,
    faReceipt,
    faTags,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const navigation = [
    { label: "Dashboard", to: "/admin/dashboard", icon: faChartBar },
    { label: "Products", to: "/admin/products", icon: faBox },
    { label: "Categories", to: "/admin/categories", icon: faTags },
    { label: "Orders", to: "/admin/orders", icon: faReceipt },
    { label: "Users", to: "/admin/users", icon: faUserCircle },
];

const AdminSidebar = () => {
    return (
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 px-4 py-5 text-white shadow-2xl shadow-slate-900/10 lg:block">
            <div className="flex h-full flex-col">
                <div className="flex items-center gap-3 px-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/25">
                        <FontAwesomeIcon icon={faBox} size="2x" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">ShopEasy</p>
                        <h2 className="text-lg font-bold tracking-tight">Admin Panel</h2>
                    </div>
                </div>

                <div className="mt-9 px-2">
                    <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
                    <nav className="mt-3 flex flex-col gap-1.5" aria-label="Admin navigation">
                        {navigation.map(({ label, to, icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                {({ isActive }) => (
                                    <>
                                        <FontAwesomeIcon icon={icon} className="w-5 text-center" />
                                        <span>{label}</span>
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                            className={`ml-auto h-4 w-4 transition-all ${
                                                isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                                            }`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
                            <FontAwesomeIcon icon={faUserCircle} />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">Admin User</p>
                            <p className="truncate text-xs text-slate-500">Store administrator</p>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]" />
                        System online
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar