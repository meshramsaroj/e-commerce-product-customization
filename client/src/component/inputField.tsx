import type { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

type InputFieldProps = {
  field: string;
  label: string;
  type?: string;
};

const InputField = ({ field, label, type = "text" }: InputFieldProps) => {
  const { register } = useFormContext<Record<string, string>>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.trimStart();
  };

  return (
    <fieldset className="fieldset">
      <label className="label">{label}</label>
      <input
        {...register(field)}
        onChange={handleChange}
        type={type}
        placeholder={`Enter your ${field}`}
        className="input-text"
      />
    </fieldset>
  );
};

export default InputField;