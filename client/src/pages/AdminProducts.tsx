import { faBox, faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const products = [
    { name: "Wireless Headphones", sku: "WH-1024", stock: 42, price: "$129.00", category: "Audio" },
    { name: "Smart Watch", sku: "SW-2048", stock: 18, price: "$249.00", category: "Wearables" },
    { name: "Laptop Stand", sku: "LS-4080", stock: 76, price: "$89.00", category: "Accessories" },
];

const AdminProducts = () => (
    <main className="min-h-full bg-secondary-light p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-orange-600">PRODUCT MANAGEMENT</p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Products</h1>
                </div>
                <button className="btn btn-primary w-fit gap-2 bg-slate-900">
                    <FontAwesomeIcon icon={faPlus} /> Add product
                </button>
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div>
                        <h2 className="font-bold text-slate-900">All products</h2>
                        <p className="text-sm text-slate-500">Manage your catalog inventory.</p>
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">{products.length} items</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Product</th>
                                <th className="px-5 py-3 font-semibold">SKU</th>
                                <th className="px-5 py-3 font-semibold">Category</th>
                                <th className="px-5 py-3 font-semibold">Stock</th>
                                <th className="px-5 py-3 font-semibold">Price</th>
                                <th className="px-5 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.sku} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="grid h-10 w-10 place-items-center rounded-lg bg-indigo-50 text-indigo-600"><FontAwesomeIcon icon={faBox} /></span>
                                            <span className="font-semibold text-slate-800">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-slate-500">{product.sku}</td>
                                    <td className="px-5 py-4 text-slate-500">{product.category}</td>
                                    <td className="px-5 py-4 font-medium text-slate-700">{product.stock}</td>
                                    <td className="px-5 py-4 font-semibold text-slate-800">{product.price}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex gap-2">
                                            <button className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600" aria-label={`Edit ${product.name}`}><FontAwesomeIcon icon={faEdit} /></button>
                                            <button className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${product.name}`}><FontAwesomeIcon icon={faTrash} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </main>
);

export default AdminProducts;
