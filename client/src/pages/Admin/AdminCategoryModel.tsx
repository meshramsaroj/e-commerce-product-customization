import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import {
  faBox,
  faCheckCircle,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUpload from "../../component/FileUpload";
import FormInputField from "../../component/FormInputField";
import { createCategory } from "../../API_Service/categoriesApi";

type AdminCategoryModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CategoryFormValues = {
  name: string;
  slug: string;
  description: string;
  parentCategoryId: string;
  isActive: boolean;
  image: File[];
};

const defaultValues: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  parentCategoryId: "",
  isActive: true,
  image: [],
};

const AdminCategoryModel = ({ isOpen, onClose }: AdminCategoryModelProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<CategoryFormValues>({
    defaultValues,
    mode: "onBlur",
  });
  const {
    handleSubmit,
    reset,
    clearErrors,
    setError,
    control,
    formState: { errors },
  } = methods;

  const createCategoryMutation = useMutation({
    mutationFn: (formData: FormData) => createCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-list"] });
      reset(defaultValues);
      clearErrors();
      handleClose()
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
    createCategoryMutation.reset();
    reset(defaultValues);
    clearErrors();
    onClose();
  };

  if (!isOpen) return null;

  const onSubmit = async (data: CategoryFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("slug", data.slug.trim());
    formData.append("description", data.description.trim());
    formData.append("isActive", String(data.isActive));

    if (data.parentCategoryId) {
      formData.append("parentCategoryId", data.parentCategoryId);
    }

    data.image.forEach((image) => formData.append("image", image));

    try {
      await createCategoryMutation.mutateAsync(formData);
    } catch (error) {
      setError("root", {
        message:
          error && typeof error === "object" && "response" in error
            ? (error as { response?: { data?: { message?: string } } }).response?.data?.message ??
              "The category could not be created."
            : "The category could not be created. Please check your connection.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && handleClose()}>
      <section className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="create-category-title">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">New category</p>
            <h2 id="create-category-title" className="mt-1 text-xl font-bold text-slate-900">Create category</h2>
          </div>
          <button type="button" onClick={handleClose} className="grid h-10 w-10 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close dialog">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5 sm:p-7">
            {createCategoryMutation.isSuccess && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">
                <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Category created successfully.</p>
                  <p className="mt-1 text-emerald-700">The category is available in the catalog.</p>
                </div>
              </div>
            )}

            {errors.root?.message && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
                {errors.root.message}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <FormInputField field="name" label="Category name" />
              <FormInputField field="slug" label="Slug" />
              <FormInputField field="description" label="Description" />
              <label className="block text-sm font-semibold text-slate-700">
                Parent category
                <select {...methods.register("parentCategoryId")} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10">
                  <option value="">No parent category</option>
                </select>
              </label>
              <label className="flex cursor-pointer items-center gap-3 self-start rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                <input type="checkbox" {...methods.register("isActive")} className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                Active category
              </label>
            </div>

            <FileUpload
              control={control}
              name="image"
              label="Category image"
              multiple={false}
              maxFiles={1}
              requiredMessage="Please upload a category image."
            />

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button type="button" onClick={handleClose} className="btn border border-slate-200 bg-white px-5 text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={createCategoryMutation.isPending} className="btn gap-2 bg-slate-900 px-5 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                {createCategoryMutation.isPending ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Creating category...</> : <><FontAwesomeIcon icon={faBox} /> Create category</>}
              </button>
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default AdminCategoryModel;
