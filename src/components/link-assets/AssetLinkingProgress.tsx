import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowPathIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  LinkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { AssetCategory } from "../../types/assets";

interface AssetLinkingProgressProps {
  assetType: AssetCategory;
  assetTitle: string;
  provider: string;
  status?: "connecting" | "authenticating" | "syncing" | "error";
  progress?: number;
  error?: string;
  onRetry?: () => void;
  onCancel?: () => void;
}

export const AssetLinkingProgress: React.FC<AssetLinkingProgressProps> = ({
  //assetType,
  assetTitle,
  provider,
  status = "connecting",
  progress = 0,
  error,
  onRetry,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    // Map status to step number
    switch (status) {
      case "connecting":
        setCurrentStep(1);
        break;
      case "authenticating":
        setCurrentStep(2);
        break;
      case "syncing":
        setCurrentStep(3);
        break;
      case "error":
        // Keep the current step but show error state
        break;
    }
  }, [status]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_70%)]"></div>
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <LinkIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Linking {assetTitle}
              </h2>
              <p className="text-sm text-slate-300">via {provider}</p>
            </div>
          </div>
          <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg">
            <ShieldCheckIcon className="h-4 w-4 text-green-400 mr-1.5" />
            <span className="text-xs text-green-300">Secure</span>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="relative flex justify-between w-full z-10">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    index < currentStep
                      ? "border-green-500 bg-green-500 text-white"
                      : index === currentStep && status !== "error"
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {index < currentStep ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 12l5 5L20 7"
                      />
                    </svg>
                  ) : index === currentStep && status === "error" ? (
                    <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                  ) : index === currentStep ? (
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium
                    ${
                      index < currentStep
                        ? "text-green-100"
                        : index === currentStep
                        ? "text-white"
                        : "text-gray-300"
                    }`}
                >
                  {index === 0
                    ? "Connect"
                    : index === 1
                    ? "Authenticate"
                    : "Sync"}
                </span>
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className="w-full relative top-4 h-0.5 z-0">
                  <div
                    className={`absolute inset-0 ${
                      index < currentStep - 1 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {status === "error" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Connection Error
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {error ||
                "There was an error connecting to your account. Please try again."}
            </p>
            <div className="space-y-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="w-full py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  Try Again
                </button>
              )}
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="w-full py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {status === "connecting"
                  ? "Establishing Connection"
                  : status === "authenticating"
                  ? "Authenticating"
                  : "Syncing Your Data"}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {status === "connecting"
                  ? "Please wait while we establish a secure connection"
                  : status === "authenticating"
                  ? "Verifying your account credentials"
                  : "Retrieving your account information securely"}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></motion.div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{progress}% Complete</span>
                <span>
                  {status === "connecting"
                    ? "Establishing connection..."
                    : status === "authenticating"
                    ? "Verifying credentials..."
                    : "Syncing data..."}
                </span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3">
              <InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium">
                  Security Notice
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Your credentials are securely encrypted and never stored on
                  our servers. All data is transmitted using bank-grade
                  security.
                </p>
              </div>
            </div>

            {/* Cancel Option */}
            {onCancel && (
              <div className="text-center">
                <button
                  onClick={onCancel}
                  className="text-sm text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer with Security Badges */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex justify-center space-x-4">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-4 w-4 text-gray-400 mr-1.5" />
            <span className="text-xs text-gray-500">Bank-Grade Encryption</span>
          </div>
          <div className="flex items-center">
            <DocumentCheckIcon className="h-4 w-4 text-gray-400 mr-1.5" />
            <span className="text-xs text-gray-500">Verified Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};
