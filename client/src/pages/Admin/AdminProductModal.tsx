import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import {
  faBox,
  faCheckCircle,
  faSpinner,
  faTag,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUpload from "../../component/FileUpload";
import FormInputField from "../../component/FormInputField";
import { getCategoryIds } from "../../API_Service/categoriesApi";
import { createProduct } from "../../API_Service/productsApi";
import { useUpdateProductMutation } from "../../MutationService/ProductMutation";

type Product = {
  _id: string;
  name: string;
  slug: string;
  brand?: string;
  description?: string;
  images?: string[];
  basePrice?: number | string;
  discountPrice?: number | string;
  isActive?: boolean;
  categoryId?: string | { _id?: string };
};

type AdminProductModalProps = {
  isOpen: boolean;
  product?: Product | null;
  onClose: () => void;
};

type ProductFormValues = {
  name: string;
  description: string;
  brand: string;
  categoryId: string;
  basePrice: string;
  discountPrice: string;
  isActive: boolean;
  slug: string;
  images: File[];
};

const defaultValues: ProductFormValues = {
  name: "",
  description: "",
  brand: "",
  categoryId: "",
  basePrice: "",
  discountPrice: "",
  isActive: true,
  slug: "",
  images: [],
};

const getApiError = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    return response?.data?.message ?? "The product could not be saved.";
  }

  return "The product could not be saved. Please check your connection.";
};

const AdminProductModal = ({ isOpen, product, onClose }: AdminProductModalProps) => {
  const queryClient = useQueryClient();
  const updateProductMutation = useUpdateProductMutation();
  const methods = useForm<ProductFormValues>({
    defaultValues,
    mode: "onBlur",
  });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = methods;

  const categoriesQuery = useQuery({
    queryKey: ["category-ids"],
    queryFn: getCategoryIds,
  });

  const createProductMutation = useMutation({
    mutationFn: ({ categoryId, formData }: { categoryId: string; formData: FormData }) =>
      createProduct(categoryId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-list"] });
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    const productCategoryId = product?.categoryId;
    const categoryId = typeof productCategoryId === "string"
      ? productCategoryId
      : (productCategoryId as { _id?: string } | undefined)?._id ?? "";

    reset({
      ...defaultValues,
      name: product?.name ?? "",
      description: product?.description ?? "",
      brand: product?.brand ?? "",
      categoryId,
      basePrice: String(product?.basePrice ?? ""),
      discountPrice: String(product?.discountPrice ?? ""),
      isActive: product?.isActive ?? true,
      slug: product?.slug ?? "",
      images: [],
    });
    clearErrors();
  }, [clearErrors, isOpen, product, reset]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    createProductMutation.reset();
    updateProductMutation.reset();
    reset(defaultValues);
    clearErrors();
    onClose();
  };

  if (!isOpen) return null;

  const onSubmit = async (data: ProductFormValues) => {
    const basePrice = Number(data.basePrice);
    const discountPrice = data.discountPrice ? Number(data.discountPrice) : 0;

    if (data.discountPrice && discountPrice > basePrice) {
      setError("discountPrice", {
        message: "Discount price cannot be greater than the base price.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("slug", data.slug.trim());
    formData.append("description", data.description.trim());
    formData.append("brand", data.brand.trim());
    formData.append("categoryId", data.categoryId);
    formData.append("basePrice", String(basePrice));
    formData.append("discountPrice", String(discountPrice));
    formData.append("isActive", String(data.isActive));
    data.images.forEach((image) => formData.append("images", image));

    try {
      if (product) {
        await updateProductMutation.mutateAsync({
          id: product._id,
          formData,
        });
      } else {
        await createProductMutation.mutateAsync({
          categoryId: data.categoryId,
          formData,
        });
      }
      onClose();
    } catch (error) {
      setError("root", { message: getApiError(error) });
    }
  };

  const categories: Array<{ id: string; name: string }> =
    categoriesQuery.data?.data?.categories ?? [];
  const isEditing = Boolean(product);
  const isSaving = createProductMutation.isPending || updateProductMutation.isPending;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && handleClose()}>
      <section className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">{isEditing ? "Product details" : "New product"}</p>
            <h2 id="product-modal-title" className="mt-1 text-xl font-bold text-slate-900">{isEditing ? "Edit product" : "Create product"}</h2>
          </div>
          <button type="button" onClick={handleClose} className="grid h-10 w-10 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close dialog">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5 sm:p-7">
            {(createProductMutation.isSuccess || updateProductMutation.isSuccess) && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">
                <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Product saved successfully.</p>
                  <p className="mt-1 text-emerald-700">The catalog has been updated.</p>
                </div>
              </div>
            )}

            {errors.root?.message && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
                {errors.root.message}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <FormInputField field="name" label="Product name" />
              <FormInputField field="slug" label="Slug" />
              <FormInputField field="brand" label="Brand" />
              <FormInputField field="description" label="Description" />
              <label className="block text-sm font-semibold text-slate-700">
                Category
                <span className="relative mt-2 block">
                  <FontAwesomeIcon icon={faTag} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select {...register("categoryId", { required: "Please select a category." })} className="w-full appearance-none rounded-xl border border-slate-200 py-3 pl-11 pr-4 font-normal outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" disabled={categoriesQuery.isLoading}>
                    <option value="">Select category</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                  </select>
                </span>
                {errors.categoryId?.message && <span className="mt-1 block text-xs font-normal text-red-600">{errors.categoryId.message}</span>}
              </label>
              <FormInputField field="basePrice" label="Base price" type="number" min="0" step="0.01" />
              <FormInputField field="discountPrice" label="Discount price" type="number" min="0" step="0.01" />
              <label className="flex cursor-pointer items-center gap-3 self-start rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                <input type="checkbox" {...register("isActive")} className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                Active product
              </label>
            </div>

            {!isEditing && (
              <FileUpload
                control={control}
                name="images"
                label="Product images"
                multiple
                maxFiles={5}
                requiredMessage="Please upload at least one product image."
              />
            )}
            {isEditing && product?.images?.length ? (
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Current images</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {product.images.map((image) => (
                    <img key={image} src={image} alt={product.name} className="h-28 w-full rounded-xl border border-slate-200 object-cover" />
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-400">Existing images are preserved when no replacement images are selected.</p>
              </div>
            ) : null}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button type="button" onClick={handleClose} className="btn border border-slate-200 bg-white px-5 text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={isSaving || categoriesQuery.isLoading} className="btn gap-2 bg-slate-900 px-5 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                {isSaving ? (
                  <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Saving product...</>
                ) : (
                  <><FontAwesomeIcon icon={faBox} /> {isEditing ? "Save changes" : "Create product"}</>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default AdminProductModal;
