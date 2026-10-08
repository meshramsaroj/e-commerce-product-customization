import { useState } from "react";
import { faBox, faEdit, faPlus, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "../../hooks/product.hooks";
import { useDeleteProductMutation } from "../../MutationService/ProductMutation";
import ConfirmDeleteModal from "../../component/ConfirmDeleteModal";
import AdminProductModal from "./AdminProductModal";

type Product = {
  _id: string;
  name: string;
  slug: string;
  brand?: string;
  images?: string[];
  basePrice?: number | string;
  discountPrice?: number | string;
  rating?: number;
  reviewCount?: number;
  isActive?: boolean;
  specifications?: {
    modelName?: string;
    screenSize?: string;
  };
};

const formatPrice = (price: number | string | null | undefined) => {
  const value = Number(price);
  return Number.isFinite(value) ? `$${value.toLocaleString()}` : "—";
};

const AdminProducts = () => {
  const { data, isLoading, isError } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const deleteProductMutation = useDeleteProductMutation();
  const products: Product[] = data?.data?.products ?? [];

  const openCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <main className="min-h-full bg-secondary-light p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-600">PRODUCT MANAGEMENT</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Products</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your live catalog and product details.</p>
          </div>
          <button type="button" onClick={openCreateModal} className="btn btn-primary w-fit gap-2 bg-slate-900">
            <FontAwesomeIcon icon={faPlus} /> Add product
          </button>
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
            Loading products...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-700 shadow-sm">
            Unable to load products. Please try again.
          </div>
        )}

        {!isLoading && !isError && (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="font-bold text-slate-900">All products</h2>
                <p className="text-sm text-slate-500">Live product catalog data.</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">{products.length} items</span>
            </div>

            {products.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">No products found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Product</th>
                      <th className="px-5 py-3 font-semibold">Brand</th>
                      <th className="px-5 py-3 font-semibold">Price</th>
                      <th className="px-5 py-3 font-semibold">Discount</th>
                      <th className="px-5 py-3 font-semibold">Rating</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      const specifications = product.specifications ?? {};
                      const firstImage = product.images?.[0] ?? "";

                      return (
                        <tr key={product._id} className="border-t border-slate-100 hover:bg-slate-50">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-indigo-50 text-indigo-600">
                                {firstImage ? (
                                  <img src={firstImage} alt={product.name} className="h-full w-full object-cover" />
                                ) : (
                                  <FontAwesomeIcon icon={faBox} />
                                )}
                              </span>
                              <div>
                                <p className="max-w-xs font-semibold text-slate-800">{product.name}</p>
                                <p className="mt-0.5 text-xs text-slate-400">{product.slug}</p>
                                <p className="mt-1 text-xs text-slate-500">{specifications.modelName ?? ""} · {specifications.screenSize ?? ""}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-500">{product.brand ?? "—"}</td>
                          <td className="px-5 py-4 font-semibold text-slate-800">{formatPrice(product.basePrice)}</td>
                          <td className="px-5 py-4 text-slate-500">{formatPrice(product.discountPrice)}</td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1 text-slate-700">
                              <FontAwesomeIcon icon={faStar} className="text-amber-400" />
                              {product.rating ?? 0} <span className="text-slate-400">({product.reviewCount ?? 0})</span>
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                              {product.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex gap-2">
                              <button type="button" onClick={() => openEditModal(product)} className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600" aria-label={`Edit ${product.name}`}><FontAwesomeIcon icon={faEdit} /></button>
                              <button type="button" onClick={() => setProductToDelete(product)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${product.name}`}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>

      <AdminProductModal
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={closeModal}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(productToDelete)}
        itemName={productToDelete?.name ?? ""}
        isLoading={deleteProductMutation.isPending}
        onClose={() => setProductToDelete(null)}
        onConfirm={() => {
          if (productToDelete) {
            deleteProductMutation.mutate(productToDelete._id, {
              onSuccess: () => setProductToDelete(null),
            });
          }
        }}
      />
    </main>
  );
};

export default AdminProducts;
