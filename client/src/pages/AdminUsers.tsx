import { faEdit, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const users = [
    { name: "Avery Stone", email: "avery@example.com", role: "Customer", joined: "Sep 18, 2026", status: "Active" },
    { name: "Jordan Lee", email: "jordan@example.com", role: "Admin", joined: "Sep 16, 2026", status: "Active" },
    { name: "Taylor Kim", email: "taylor@example.com", role: "Customer", joined: "Sep 14, 2026", status: "Inactive" },
];

const AdminUsers = () => (
    <main className="min-h-full bg-secondary-light p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-orange-600">USER MANAGEMENT</p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Users</h1>
                    <p className="mt-1 text-sm text-slate-500">Review accounts and assign roles.</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"><FontAwesomeIcon icon={faUsers} />{users.length} users</span>
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-3 font-semibold">User</th>
                                <th className="px-5 py-3 font-semibold">Email</th>
                                <th className="px-5 py-3 font-semibold">Role</th>
                                <th className="px-5 py-3 font-semibold">Joined</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.email} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600"><FontAwesomeIcon icon={faUser} /></span>
                                            <span className="font-semibold text-slate-800">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-slate-500">{user.email}</td>
                                    <td className="px-5 py-4"><span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">{user.role}</span></td>
                                    <td className="px-5 py-4 text-slate-500">{user.joined}</td>
                                    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{user.status}</span></td>
                                    <td className="px-5 py-4"><button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800" aria-label={`Edit ${user.name}`}><FontAwesomeIcon icon={faEdit} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </main>
);

export default AdminUsers;
