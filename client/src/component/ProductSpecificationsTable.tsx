import { useState } from "react";
import {
  type Control,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import {
  faPlus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type SpecificationRow = {
  id: string;
  label: string;
  value: string;
};

export type ProductSpecificationsFormValues = {
  specifications: SpecificationRow[];
};

type ProductSpecificationsTableProps = {
  control: Control<any>;
};

const createSpecificationRow = (): SpecificationRow => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  label: "",
  value: "",
});

const ProductSpecificationsTable = ({
  control,
}: ProductSpecificationsTableProps) => {
  const { register, setError, clearErrors } = useFormContext<any>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const openTable = () => {
    setIsOpen(true);
    if (fields.length === 0) append(createSpecificationRow());
  };

  const addRow = () => append(createSpecificationRow());

  const removeSelectedRows = () => {
    const selectedIndexes = fields
      .map((field, index) => ({ field, index }))
      .filter(({ field }) => selectedRowIds.includes(field.id))
      .map(({ index }) => index)
      .sort((first, second) => second - first);

    selectedIndexes.forEach((index) => remove(index));
    setSelectedRowIds([]);
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRowIds((current) =>
      current.includes(id)
        ? current.filter((rowId) => rowId !== id)
        : [...current, id],
    );
  };

  const toggleAllRows = () => {
    const allSelected = fields.length > 0 && selectedRowIds.length === fields.length;
    setSelectedRowIds(allSelected ? [] : fields.map((field) => (field as { id: string }).id));
  };

  const validateUniqueLabel = (label: string, index: number) => {
    const normalizedLabel = label.trim().toLowerCase();
    if (!normalizedLabel) return true;

    const duplicate = fields.some((field, fieldIndex) => {
      const row = field as unknown as { label: string };
      return fieldIndex !== index && row.label.trim().toLowerCase() === normalizedLabel;
    });

    if (duplicate) {
      setError(`specifications.${index}.label`, {
        type: "validate",
        message: "Each specification label must be unique.",
      });
      return false;
    }

    clearErrors(`specifications.${index}.label`);
    return true;
  };

  const allSelected = fields.length > 0 && selectedRowIds.length === fields.length;
  const shouldShowTable = isOpen || fields.length > 0;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Specifications</h3>
          <p className="mt-1 text-xs text-slate-500">Add label/value pairs to describe the product.</p>
        </div>
        <button
          type="button"
          onClick={openTable}
          className="btn gap-2 border border-orange-200 bg-orange-50 px-4 text-orange-700 hover:bg-orange-100"
        >
          <FontAwesomeIcon icon={faPlus} /> Add specification
        </button>
      </div>

      {shouldShowTable && (
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label="Select all specifications"
                      checked={allSelected}
                      onChange={toggleAllRows}
                      className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                    />
                  </th>
                  <th className="px-4 py-3 font-semibold">Label</th>
                  <th className="px-4 py-3 font-semibold">Value</th>
                  <th className="w-14 px-4 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => {
                  const row = field as unknown as { id: string; label: string; value: string };
                  const rowSelected = selectedRowIds.includes(row.id);

                  return (
                    <tr key={row.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          aria-label={`Select specification row ${index + 1}`}
                          checked={rowSelected}
                          onChange={() => toggleRowSelection(row.id)}
                          className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          {...register(`specifications.${index}.label`, {
                            validate: (label: string) => validateUniqueLabel(label, index),
                          })}
                          type="text"
                          placeholder="e.g. Model"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          {...register(`specifications.${index}.value`, {
                            validate: (value: string) => value.length <= 500 || "Value cannot exceed 500 characters.",
                          })}
                          type="text"
                          placeholder="e.g. Pro 12"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Delete specification row ${index + 1}`}
                        >
                          <FontAwesomeIcon icon={faTrash} size="sm" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {fields.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-400">No specifications yet. Add a label/value row to begin.</div>
          )}

          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              {selectedRowIds.length > 0
                ? `${selectedRowIds.length} row${selectedRowIds.length === 1 ? "" : "s"} selected`
                : "Select rows to delete them together."}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={removeSelectedRows}
                disabled={selectedRowIds.length === 0}
                className="btn gap-2 border border-red-200 bg-white px-3 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faX} size="sm" /> Delete selected
              </button>
              <button type="button" onClick={addRow} className="btn gap-2 bg-slate-900 px-3 text-white hover:bg-slate-800">
                <FontAwesomeIcon icon={faPlus} size="sm" /> Add row
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSpecificationsTable;
