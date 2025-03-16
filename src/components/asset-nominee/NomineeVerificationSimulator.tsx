// src/components/asset-nominee/NomineeVerificationSimulator.tsx
import React, { useState } from "react";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useAssetNominees } from "../../hooks/useAssetNominees";
import { useLinkedAssets } from "../../hooks/useLinkedAssets";
import { mockAssets } from "../../lib/assetsMockup";
import { useNominee } from "../../hooks/useNomine";

interface NomineeVerificationSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const NomineeVerificationSimulator: React.FC<
  NomineeVerificationSimulatorProps
> = ({ isOpen, onClose }) => {
  const { linkedAssets } = useLinkedAssets(mockAssets);
  const { assetNominees, updateAssetNominee } = useAssetNominees();
  const {
    state: { nominees },
  } = useNominee();

  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{
    success: number;
    errors: number;
    pending: number;
    total: number;
  }>({ success: 0, errors: 0, pending: 0, total: 0 });

  // Get linked assets with nominees
  const assetsWithNominees = assetNominees.filter((mapping) =>
    linkedAssets.includes(mapping.assetId)
  );

  const simulateVerification = async () => {
    setIsProcessing(true);

    // Reset results
    setResults({
      success: 0,
      errors: 0,
      pending: 0,
      total: assetsWithNominees.length,
    });

    let successCount = 0;
    let errorCount = 0;
    let pendingCount = 0;

    // Process each asset-nominee mapping
    for (const mapping of assetsWithNominees) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Random verification result with weighted probabilities
      const random = Math.random();

      if (random < 0.7) {
        // 70% chance of success
        updateAssetNominee(mapping.assetId, mapping.nomineeId, {
          status: "active",
          errorDetails: undefined,
          lastVerified: new Date().toISOString(),
        });
        successCount++;
      } else if (random < 0.9) {
        // 20% chance of error
        const errorMessages = [
          "Nominee ID verification failed. Please update with valid ID.",
          "KYC information is incomplete or outdated.",
          "Nominee signature verification failed.",
          "Nominee date of birth does not match records.",
          "Nominee address verification failed.",
        ];

        const randomError =
          errorMessages[Math.floor(Math.random() * errorMessages.length)];

        updateAssetNominee(mapping.assetId, mapping.nomineeId, {
          status: "error",
          errorDetails: randomError,
        });
        errorCount++;
      } else {
        // 10% chance of pending
        updateAssetNominee(mapping.assetId, mapping.nomineeId, {
          status: "pending",
          errorDetails: undefined,
        });
        pendingCount++;
      }

      // Update results in real time
      setResults({
        success: successCount,
        errors: errorCount,
        pending: pendingCount,
        total: assetsWithNominees.length,
      });
    }

    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-slate-700 p-4 flex justify-between items-center">
          <h2 className="text-white text-lg font-semibold">
            Verification Simulator
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-slate-200 p-1"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            This simulator randomly generates verification results for testing
            purposes. It will update the status of all asset-nominee mappings
            with success, error, or pending states.
          </p>

          {assetsWithNominees.length === 0 ? (
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    No nominee assignments found
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Please assign nominees to assets before simulating
                    verification.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-2">
                    Assets with Nominees
                  </h3>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {assetsWithNominees.map((mapping) => {
                      const asset = mockAssets.find(
                        (a) => a.id === mapping.assetId
                      );
                      const nominee = nominees.find(
                        (n) => n.id === mapping.nomineeId
                      );

                      return (
                        <div
                          key={`${mapping.assetId}-${mapping.nomineeId}`}
                          className="flex justify-between items-center p-2 border border-slate-200 rounded"
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {asset?.title}
                            </p>
                            <p className="text-xs text-slate-500">
                              {nominee?.fullName}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                mapping.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : mapping.status === "error"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {mapping.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {results.total > 0 && (
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">
                        Verification Results
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-50 p-2 rounded text-center">
                          <p className="text-sm text-green-700">Success</p>
                          <p className="text-xl font-semibold text-green-700">
                            {results.success}
                          </p>
                        </div>
                        <div className="bg-red-50 p-2 rounded text-center">
                          <p className="text-sm text-red-700">Errors</p>
                          <p className="text-xl font-semibold text-red-700">
                            {results.errors}
                          </p>
                        </div>
                        <div className="bg-yellow-50 p-2 rounded text-center">
                          <p className="text-sm text-yellow-700">Pending</p>
                          <p className="text-xl font-semibold text-yellow-700">
                            {results.pending}
                          </p>
                        </div>
                      </div>
                    </div>

                    {isProcessing && (
                      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute h-full bg-slate-600 transition-all duration-300"
                          style={{
                            width: `${Math.round(
                              ((results.success +
                                results.errors +
                                results.pending) /
                                results.total) *
                                100
                            )}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={simulateVerification}
                disabled={isProcessing}
                className="w-full py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-300 flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Simulate Verification"
                )}
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Powered by verification simulator
            </p>
            <CheckCircleIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NomineeVerificationSimulator;
