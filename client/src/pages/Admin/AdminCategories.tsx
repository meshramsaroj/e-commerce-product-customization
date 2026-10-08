import { faEdit, faFolder, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminCategoryModel from "./AdminCategoryModel";
import { useState } from "react";
import { useCategories } from "../../hooks/category.hook";

type Category = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image?: string | null;
    parentCategoryId?: string | null;
    isActive: boolean;
};

const AdminCategories = () => {
    const { data, isLoading, isError } = useCategories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const categories: Category[] = data?.data?.categories ?? [];

    const openCreateModal = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    return (
        <main className="min-h-full bg-secondary-light p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-orange-600">CATALOG MANAGEMENT</p>
                        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Categories</h1>
                    </div>
                    <button type="button" className="btn btn-primary w-fit gap-2 bg-slate-900" onClick={openCreateModal}>
                        <FontAwesomeIcon icon={faPlus} /> Add category
                    </button>
                </div>

                {isLoading && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                        Loading categories...
                    </div>
                )}

                {isError && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-700 shadow-sm">
                        Unable to load categories. Please try again.
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {categories.map((category) => (
                            <article key={category._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                <div className="relative h-40 bg-slate-100">
                                    {category.image ? (
                                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="grid h-full place-items-center text-slate-400">
                                            <FontAwesomeIcon icon={faFolder} size="2x" />
                                        </div>
                                    )}
                                    <span className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-xs font-semibold ${category.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                        {category.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900">{category.name}</h2>
                                            <p className="mt-1 text-xs font-medium text-orange-600">/{category.slug}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <button type="button" onClick={() => openEditModal(category)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label={`Edit ${category.name}`}><FontAwesomeIcon icon={faEdit} /></button>
                                            <button type="button" className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${category.name}`}><FontAwesomeIcon icon={faTrash} /></button>
                                        </div>
                                    </div>

                                    <p className="mt-4 min-h-10 text-sm leading-6 text-slate-500">{category.description || "No description provided."}</p>
                                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                                        <span>{category.parentCategoryId ? "Has a parent category" : "Top-level category"}</span>
                                        <span className="font-medium text-slate-700">{category.isActive ? "Active" : "Inactive"}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
            <AdminCategoryModel
                isOpen={isModalOpen}
                category={editingCategory}
                categories={categories}
                onClose={closeModal}
            />

        </main>)
};

export default AdminCategories;
