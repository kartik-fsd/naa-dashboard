import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  LockClosedIcon,
  BanknotesIcon,
  ClockIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type StepType = "CONSENT" | "AUTHENTICATING" | "SUCCESS";

const STEPS = [
  { key: "CONSENT", label: "Consent" },
  { key: "AUTHENTICATING", label: "Authentication" },
  { key: "SUCCESS", label: "Confirmation" },
] as const;

export const AccountAggregator: React.FC = () => {
  const [step, setStep] = useState<StepType>("CONSENT");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    setIsRedirecting(true);
    setStep("AUTHENTICATING");
    setTimeout(() => {
      navigate("/sandbox/hdfc-auth", {
        state: { returnUrl: "/auth/callback" },
      });
    }, 1500);
  };

  const getProgressPercentage = () => {
    const stepIndex = STEPS.findIndex((s) => s.key === step);
    return (stepIndex / (STEPS.length - 1)) * 100;
  };

  const renderStepContent = () => {
    switch (step) {
      case "CONSENT":
        return (
          <div className="space-y-6">
            {/* Data Access Section */}
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <DocumentTextIcon className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-3">
                      Information We'll Access
                    </h3>
                    <ul className="space-y-3">
                      {[
                        {
                          title: "Basic Profile Information",
                          detail: "Name, account type, and branch details",
                        },
                        {
                          title: "Account Balance",
                          detail: "Current and historical balance information",
                        },
                        {
                          title: "Transaction History",
                          detail: "Last 12 months of transactions",
                        },
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              {item.title}
                            </p>
                            <p className="text-xs text-blue-700 mt-0.5">
                              {item.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Terms Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <ClockIcon className="w-4 h-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">
                      Validity Period
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-sm font-medium text-indigo-600">
                      12 Months
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <BanknotesIcon className="w-4 h-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">
                      Data Frequency
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Updates</p>
                    <p className="text-sm font-medium text-indigo-600">Daily</p>
                  </div>
                </div>
              </div>

              {/* Security Assurance */}
              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-200">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium text-gray-900">
                      Security Measures
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "End-to-end encryption of all data",
                      "RBI regulated Account Aggregator framework",
                      "Bank-grade security protocols",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <LockClosedIcon className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium text-gray-900">Data Privacy</h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "No access to login credentials",
                      "Read-only access to specified data",
                      "Revocable access at any time",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-900 mb-1">
                      Important Notice
                    </h3>
                    <p className="text-sm text-yellow-700">
                      You'll be securely redirected to HDFC Bank's official
                      website for authorization. No banking credentials are
                      shared with our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleProceed}
                disabled={isRedirecting}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium
                         hover:bg-indigo-700 transition-all flex items-center 
                         justify-center gap-2 disabled:bg-indigo-300"
              >
                {isRedirecting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Secure Connection...</span>
                  </div>
                ) : (
                  <>
                    Proceed Securely
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                  By proceeding, you agree to share your financial information
                  via Account Aggregator network as per the RBI guidelines
                </p>
                <a
                  href="#"
                  className="text-xs text-indigo-600 font-medium hover:text-indigo-700"
                >
                  Learn more about Account Aggregator
                </a>
              </div>
            </div>
          </div>
        );

      case "AUTHENTICATING":
        return (
          <div className="py-12 text-center space-y-6">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Preparing Secure Connection
              </h3>
              <p className="text-sm text-gray-600">
                You'll be redirected to HDFC Bank shortly...
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
              <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-blue-900">Please Note</p>
                <p className="text-sm text-blue-700 mt-1">
                  Keep this window open until the authentication process is
                  complete
                </p>
              </div>
            </div>
          </div>
        );

      case "SUCCESS":
        return (
          <div className="py-12 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connection Successful
              </h3>
              <p className="text-sm text-gray-600">
                Your HDFC Bank account has been successfully connected via
                Account Aggregator
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Next Update</span>
                  <span className="text-sm font-medium text-gray-900">
                    In 24 hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between relative">
            {STEPS.map((stepItem, index) => (
              <div
                key={stepItem.key}
                className="flex flex-col items-center z-10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${
                      step === stepItem.key
                        ? "bg-indigo-600 text-white"
                        : index < STEPS.findIndex((s) => s.key === step)
                        ? "bg-green-600 text-white"
                        : "bg-white border-2 border-gray-200 text-gray-400"
                    }`}
                >
                  {index < STEPS.findIndex((s) => s.key === step) ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`text-xs font-medium mt-2 
                  ${
                    step === stepItem.key ? "text-indigo-600" : "text-gray-500"
                  }`}
                >
                  {stepItem.label}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0">
              <div
                className="h-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91g86GYPEmouJD3LiPGSYtYYW9XycFIu4pA&s"
                      alt="HDFC Bank"
                      className="w-8 h-8 rounded"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      HDFC Bank Account Access
                    </h2>
                    <p className="text-sm text-blue-100">
                      via Account Aggregator Network
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg">
                  <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">
                    Secure Connection
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="min-h-[400px]"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Regulated by RBI</span>
              </div>
              <div className="flex items-center space-x-2">
                <LockClosedIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  End-to-End Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Seal_of_the_Reserve_Bank_of_India.svg/2048px-Seal_of_the_Reserve_Bank_of_India.svg.png"
              alt="RBI Licensed"
              className="h-6 object-contain"
            />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center">
            <img
              src="https://www.anumati.co.in/wp-content/uploads/2021/10/MicrosoftTeams-image-31.png"
              alt="Account Aggregator"
              className="h-6 object-contain"
            />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center">
            <img
              src="https://www.clipartmax.com/png/middle/205-2051366_our-website-is-secured-with-256-bit-ssl-certificates-delphi-ds1004-oe.png"
              alt="256-bit SSL"
              className="h-6 object-contain"
            />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center">
            <img
              src="https://www.clipartmax.com/png/small/219-2198975_e-verify%C2%AE-is-a-registered-trademark-of-the-u-iso-certification-9001.png"
              alt="ISO 27001"
              className="h-6 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
                <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
              </div>
              <div>
                <p className="text-base font-medium text-gray-900">
                  Redirecting to HDFC Bank
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Please do not close this window
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                <LockClosedIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Secure Connection
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountAggregator;
