import { faEdit, faFolder, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const categories = [
    { name: "Electronics", description: "Devices and connected technology", products: 128 },
    { name: "Home & Living", description: "Furniture and household essentials", products: 74 },
    { name: "Fashion", description: "Apparel and accessories", products: 96 },
];

const AdminCategories = () => (
    <main className="min-h-full bg-secondary-light p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-orange-600">CATALOG MANAGEMENT</p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Categories</h1>
                </div>
                <button className="btn btn-primary w-fit gap-2 bg-slate-900">
                    <FontAwesomeIcon icon={faPlus} /> Add category
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categories.map((category) => (
                    <article key={category.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-start justify-between gap-4">
                            <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-100 text-violet-600"><FontAwesomeIcon icon={faFolder} /></span>
                            <div className="flex gap-1">
                                <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label={`Edit ${category.name}`}><FontAwesomeIcon icon={faEdit} /></button>
                                <button className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${category.name}`}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                        <h2 className="mt-5 text-lg font-bold text-slate-900">{category.name}</h2>
                        <p className="mt-1 min-h-10 text-sm leading-6 text-slate-500">{category.description}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="text-sm text-slate-500">{category.products} products</span>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">Active</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </main>
);

export default AdminCategories;
