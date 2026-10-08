import {
  faSpinner,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  itemName: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({
  isOpen,
  itemName,
  isLoading = false,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) onClose();
      }}
    >
      <section
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
      >
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-50 text-red-600">
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </div>
          <div>
            <h2 id="confirm-delete-title" className="text-lg font-bold text-slate-900">
              Delete item?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              You are about to delete <strong>{itemName}</strong>. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="btn border border-slate-200 bg-white px-5 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="btn gap-2 bg-red-600 px-5 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTrash} />
                Delete item
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default ConfirmDeleteModal;
