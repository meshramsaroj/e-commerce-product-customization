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

type AdminProductModalProps = {
  isOpen: boolean;
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
    return response?.data?.message ?? "The product could not be created.";
  }

  return "The product could not be created. Please check your connection.";
};

const AdminProductModal = ({ isOpen, onClose }: AdminProductModalProps) => {
  const queryClient = useQueryClient();
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
      reset(defaultValues);
      clearErrors();
    },
  });

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
    formData.append("basePrice", String(basePrice));
    formData.append("discountPrice", String(discountPrice));
    formData.append("isActive", String(data.isActive));
    formData.append("rating", "0");
    formData.append("reviewCount", "0");
    data.images.forEach((image) => formData.append("images", image));

    try {
      await createProductMutation.mutateAsync({
        categoryId: data.categoryId,
        formData,
      });
    } catch (error) {
      setError("root", { message: getApiError(error) });
    }
  };

  const categories: Array<{ id: string; name: string }> =
    categoriesQuery.data?.data?.categories ?? [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && handleClose()}>
      <section className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="create-product-title">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">New product</p>
            <h2 id="create-product-title" className="mt-1 text-xl font-bold text-slate-900">Create product</h2>
          </div>
          <button type="button" onClick={handleClose} className="grid h-10 w-10 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close dialog">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5 sm:p-7">
            {createProductMutation.isSuccess && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">
                <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Product created successfully.</p>
                  <p className="mt-1 text-emerald-700">The new product is available in the catalog.</p>
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

            <FileUpload
              control={control}
              name="images"
              label="Product images"
              multiple
              maxFiles={5}
              requiredMessage="Please upload at least one product image."
            />

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button type="button" onClick={handleClose} className="btn border border-slate-200 bg-white px-5 text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={createProductMutation.isPending || categoriesQuery.isLoading} className="btn gap-2 bg-slate-900 px-5 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                {createProductMutation.isPending ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Creating product...</> : <><FontAwesomeIcon icon={faBox} /> Create product</>}
              </button>
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default AdminProductModal;
