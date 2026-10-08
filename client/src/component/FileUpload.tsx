import { useState, type ChangeEvent } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import {
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FileUploadProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  requiredMessage?: string;
};

const FileUpload = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  multiple = true,
  accept = "image/png,image/jpeg",
  maxFiles = 5,
  requiredMessage = "Please upload at least one file.",
}: FileUploadProps<TFieldValues, TName>) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TName>({
    control,
    name,
    rules: {
      validate: (value) => {
        const files = value as unknown as File[] | undefined;
        if (!files?.length) return requiredMessage;
        return true;
      },
    },
  });

  const files = (field.value as unknown as File[] | undefined) ?? [];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const currentFiles = Array.isArray(field.value) ? field.value : [];
    const nextFiles = multiple
      ? [...currentFiles, ...selectedFiles].slice(0, maxFiles)
      : selectedFiles.slice(0, 1);

    field.onChange(nextFiles);
    setPreviewUrls((current) =>
      [...current, ...selectedFiles.map((file) => URL.createObjectURL(file))].slice(
        0,
        maxFiles,
      ),
    );
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    const nextFiles = files.filter((_, fileIndex) => fileIndex !== index);
    field.onChange(nextFiles);
    setPreviewUrls((current) =>
      current.filter((_, previewIndex) => previewIndex !== index),
    );
  };

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-700">{label}</p>
      <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center transition hover:border-orange-400 hover:bg-orange-50/40">
        <FontAwesomeIcon icon={faUpload} className="mb-2 text-orange-500" />
        <span className="text-sm font-semibold text-slate-700">
          {multiple ? "Choose product images" : "Choose a product image"}
        </span>
        <span className="mt-1 text-xs text-slate-400">
          {accept} · Maximum {maxFiles} file{maxFiles === 1 ? "" : "s"}
        </span>
        <input
          ref={field.ref}
          name={field.name}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={handleChange}
          onBlur={field.onBlur}
        />
      </label>

      {error?.message && (
        <span className="mt-2 block text-xs font-normal text-red-600">
          {error.message}
        </span>
      )}

      {previewUrls.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {previewUrls.map((previewUrl, index) => (
            <div
              key={`${previewUrl}-${index}`}
              className="relative overflow-hidden rounded-xl bg-slate-100"
            >
              <img
                src={previewUrl}
                alt={`${label} upload ${index + 1}`}
                className="h-28 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-slate-950/80 text-white hover:bg-red-600"
                aria-label={`Remove ${files[index]?.name ?? "file"}`}
              >
                <FontAwesomeIcon icon={faTimes} size="xs" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
