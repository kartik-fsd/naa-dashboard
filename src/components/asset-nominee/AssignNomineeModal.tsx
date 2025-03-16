// src/components/asset-nominee/AssignNomineeModal.tsx
import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  UserPlusIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Asset } from "../../types/assets";
import { useNominee } from "../../hooks/useNomine";
import { Link } from "react-router-dom";

interface AssignNomineeModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset;
  onAssignNominee: (assetId: string, nomineeId: string) => void;
  currentNomineeId?: string;
  nomineeStatus?: "active" | "pending" | "error" | "none";
  errorDetails?: string;
}

const AssignNomineeModal: React.FC<AssignNomineeModalProps> = ({
  isOpen,
  onClose,
  asset,
  onAssignNominee,
  currentNomineeId,
  nomineeStatus = "none",
  errorDetails,
}) => {
  const {
    state: { nominees },
  } = useNominee();
  const [selectedNomineeId, setSelectedNomineeId] = useState<string>(
    currentNomineeId || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Reset selection when modal opens with different asset
  useEffect(() => {
    if (isOpen) {
      setSelectedNomineeId(currentNomineeId || "");
      setSearchQuery("");
    }
  }, [isOpen, currentNomineeId]);

  // Filter nominees based on search query
  const filteredNominees = nominees.filter(
    (nominee) =>
      nominee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nominee.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!selectedNomineeId) return;

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onAssignNominee(asset.id, selectedNomineeId);
      onClose();
    } catch (error) {
      console.error("Error assigning nominee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-slate-700 p-4 flex justify-between items-center">
          <h2 className="text-white text-lg font-semibold">
            {nomineeStatus === "error"
              ? "Fix Nominee Assignment"
              : currentNomineeId
              ? "Update Nominee"
              : "Assign Nominee"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-slate-200 p-1"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Asset Info */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Asset</p>
              <p className="font-medium">{asset.title}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Type</p>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  asset.category === "stocks"
                    ? "bg-blue-100 text-blue-800"
                    : asset.category === "funds"
                    ? "bg-purple-100 text-purple-800"
                    : asset.category === "retirement"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {asset.category}
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {nomineeStatus === "error" && (
          <div className="p-4 bg-red-50 border-b border-red-100">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">
                  Verification Failed
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  {errorDetails ||
                    "There was an issue with the nominee assignment for this asset. Please update the nominee details."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Search Box */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Nominees
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="Search by name or relationship..."
            />
          </div>

          {/* No Nominees Message */}
          {nominees.length === 0 ? (
            <div className="bg-yellow-50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <InformationCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    No nominees found
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Please add nominees before assigning them to assets.
                  </p>
                  <Link
                    to="/nominees"
                    className="mt-2 inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-800"
                  >
                    <UserPlusIcon className="w-4 h-4 mr-1" />
                    Add Nominee
                  </Link>
                </div>
              </div>
            </div>
          ) : filteredNominees.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No nominees match your search
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filteredNominees.map((nominee) => (
                <div
                  key={nominee.id}
                  onClick={() => setSelectedNomineeId(nominee.id)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer 
                    ${
                      selectedNomineeId === nominee.id
                        ? "bg-slate-100 border-slate-300 border"
                        : "bg-white hover:bg-gray-50 border border-gray-200"
                    }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white">
                      {nominee.fullName.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">
                        {nominee.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {nominee.relationship}
                        {nominee.relationship === "Other" &&
                        nominee.relationshipOther
                          ? ` (${nominee.relationshipOther})`
                          : ""}
                      </p>
                    </div>
                  </div>

                  {selectedNomineeId === nominee.id && (
                    <CheckIcon className="w-5 h-5 text-green-600" />
                  )}
                </div>
              ))}
            </div>
          )}

          {nominees.length > 0 && (
            <div className="mt-4 bg-blue-50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <DocumentTextIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Note:</span> Assigning a nominee
                  to this asset will help ensure smooth inheritance transfer in
                  the future.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedNomineeId || isSubmitting}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>{currentNomineeId ? "Update" : "Assign"} Nominee</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignNomineeModal;
