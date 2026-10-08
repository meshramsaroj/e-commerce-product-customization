import { get, useFormContext, type FieldValues, type Path } from "react-hook-form";

type FormInputFieldProps<TFieldValues extends FieldValues> = {
  field: Path<TFieldValues>;
  label: string;
  type?: string;
  placeholder?: string;
  requiredMessage?: string;
  min?: string;
  step?: string;
};

const FormInputField = <TFieldValues extends FieldValues>({
  field,
  label,
  type = "text",
  placeholder = "Enter value",
  requiredMessage,
  min,
  step,
}: FormInputFieldProps<TFieldValues>) => {
  const { register, formState: { errors } } = useFormContext<TFieldValues>();
  const error = get(errors, field);

  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input
        {...register(field, {
          required: requiredMessage ?? `${label} is required.`,
        })}
        type={type}
        min={min}
        step={step}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
      />
      {error?.message && (
        <span className="mt-1 block text-xs font-normal text-red-600">
          {error.message}
        </span>
      )}
    </label>
  );
};

export default FormInputField;
