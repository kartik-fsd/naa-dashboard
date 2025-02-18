/* ==================================================
     Delete Modal Component
  ================================================== */

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Nominee } from "../../types/nomine";

interface DeleteModalProps {
  nominee: Nominee;
  onCancel: () => void;
  onDelete: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  nominee,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onCancel}
      />
      <div className="relative bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
        </div>

        <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">
          Delete Nominee
        </h3>

        <p className="text-center text-slate-500 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium text-slate-900">{nominee.fullName}</span>
          's profile? This action cannot be undone.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-4 py-2 bg-red-600 border border-transparent rounded-lg text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
