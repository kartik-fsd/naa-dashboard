import React from "react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import { DigiLockerDocument, DigiLockerError } from "../../types/documents";

interface DigiLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  documents: DigiLockerDocument[];
  error: DigiLockerError | null;
  downloadProgress: Record<string, number>;
  onConnect: () => void;
  onImportAll: () => void;
  onImportDocument: (docId: string) => void;
}

export const DigiLockerModal: React.FC<DigiLockerModalProps> = ({
  isOpen,
  onClose,
  isConnecting,
  isConnected,
  documents,
  error,
  downloadProgress,
  onConnect,
  onImportAll,
  onImportDocument,
}) => {
  if (!isOpen) return null;

  const handleImportDocument = async (docId: string) => {
    try {
      await onImportDocument(docId);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-50 p-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqIDw7FiQKOeXZgUKEBfa7MRHV6UuPTfTCkA&s"
                alt="DigiLocker"
                className="w-8 h-8"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              DigiLocker Integration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <h4 className="text-red-800 font-medium">{error.code}</h4>
                  <p className="text-red-700 text-sm mt-1">{error.message}</p>
                  {error.details && (
                    <p className="text-red-600 text-xs mt-1">{error.details}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {!isConnected ? (
            <div className="text-center py-12">
              {isConnecting ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                  <p className="text-gray-600">Connecting to DigiLocker...</p>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-6">
                  <div className="rounded-2xl bg-blue-50 p-8 inline-block mx-auto">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqIDw7FiQKOeXZgUKEBfa7MRHV6UuPTfTCkA&s"
                      alt="DigiLocker"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-semibold text-gray-900">
                      Connect to DigiLocker
                    </h4>
                    <p className="text-gray-600">
                      Access your official documents securely through
                      DigiLocker, India's Digital Document Wallet
                    </p>
                  </div>
                  <button
                    onClick={onConnect}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqIDw7FiQKOeXZgUKEBfa7MRHV6UuPTfTCkA&s"
                      alt="DigiLocker"
                      className="w-6 h-6 mr-2"
                    />
                    Connect DigiLocker Account
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="flex gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="text-green-800 font-medium">
                      Successfully Connected
                    </h4>
                    <p className="text-green-700 text-sm">
                      Your DigiLocker account is now linked
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden border border-gray-200 rounded-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issuer
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {documents.map((doc) => (
                        <tr
                          key={doc.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <DocumentArrowDownIcon className="w-5 h-5 text-gray-500" />
                              </div>
                              <div>
                                <span className="block text-sm font-medium text-gray-900">
                                  {doc.name}
                                </span>
                                <span className="block text-xs text-gray-500">
                                  {doc.docType.replace("_", " ")}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {doc.metadata.issuerLogo && (
                                <img
                                  src={doc.metadata.issuerLogo}
                                  alt={doc.metadata.issuerName}
                                  className="w-6 h-6 rounded-full"
                                />
                              )}
                              <span className="text-sm text-gray-600">
                                {doc.issuer}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                                ${
                                  doc.verificationStatus === "VERIFIED"
                                    ? "bg-green-50 text-green-700"
                                    : doc.verificationStatus === "PENDING"
                                    ? "bg-yellow-50 text-yellow-700"
                                    : "bg-red-50 text-red-700"
                                }`}
                            >
                              {doc.verificationStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-500">
                              {doc.dateIssued}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            {downloadProgress[doc.id] !== undefined ? (
                              <div className="w-24 h-1.5 bg-gray-100 rounded-full ml-auto">
                                <div
                                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${downloadProgress[doc.id]}%`,
                                  }}
                                />
                              </div>
                            ) : (
                              <button
                                onClick={() => handleImportDocument(doc.id)}
                                disabled={doc.verificationStatus !== "VERIFIED"}
                                className={`text-sm font-medium px-3 py-1 rounded transition-colors
                                  ${
                                    doc.verificationStatus === "VERIFIED"
                                      ? "text-blue-600 hover:bg-blue-50"
                                      : "text-gray-400 cursor-not-allowed"
                                  }`}
                              >
                                Import
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {isConnected && (
          <div className="border-t border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              {
                documents.filter((d) => d.verificationStatus === "VERIFIED")
                  .length
              }{" "}
              of {documents.length} documents verified
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={onImportAll}
                disabled={
                  !documents.some((d) => d.verificationStatus === "VERIFIED")
                }
                className={`px-4 py-2 rounded-lg transition-colors
                  ${
                    documents.some((d) => d.verificationStatus === "VERIFIED")
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Import Verified Documents
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigiLockerModal;
