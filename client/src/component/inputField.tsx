import { useFormContext } from "react-hook-form"

const InputField = ({ field, label, type = "text" }: { field: string, label: string, type?: string }) => {
  const { getValues, setValue } = useFormContext<any>()
  const value = getValues(field)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValue(name, value)
  }
  return (
    <fieldset className="fieldset">
      <label className="label">{label}</label>
      <input
        name={field}
        onChange={handleChange}
        type={type}
        placeholder={`Enter your ${field} `}
        className="input-text"
      />
    </fieldset>
  );
};

export default InputField;