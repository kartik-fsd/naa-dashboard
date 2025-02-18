import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  BuildingLibraryIcon,
  KeyIcon,
  InformationCircleIcon,
  LockClosedIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

type AuthStep = "UAN" | "PASSWORD" | "CAPTCHA" | "CONSENT" | "CONFIRM";

interface EPFAuthProps {
  returnUrl?: string;
}

const EPFAuth: React.FC<EPFAuthProps> = ({ returnUrl = "/auth/callback" }) => {
  const [step, setStep] = useState<AuthStep>("UAN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    uan: "",
    password: "",
    captcha: "",
  });

  const steps = ["UAN", "PASSWORD", "CAPTCHA", "CONSENT"];
  const currentStepIndex = steps.indexOf(step);

  const handleBack = () => {
    const prevSteps: Record<AuthStep, AuthStep> = {
      PASSWORD: "UAN",
      CAPTCHA: "PASSWORD",
      CONSENT: "CAPTCHA",
      CONFIRM: "CONSENT",
      UAN: "UAN",
    };
    setStep(prevSteps[step]);
  };

  const handleUANSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const uanRegex = /^\d{12}$/;
    if (!uanRegex.test(formData.uan)) {
      setError("Please enter a valid 12-digit UAN");
      setLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep("PASSWORD");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep("CAPTCHA");
  };

  const handleCaptchaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep("CONSENT");
  };

  const handleConsent = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep("CONFIRM");
  };

  const handleComplete = () => {
    window.location.href = `${returnUrl}?status=success&type=epf`;
  };

  const renderProgressBar = () => {
    return (
      <div className="flex items-center justify-between w-full mb-8 px-4">
        {steps.map((s, index) => (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${
                    index <= currentStepIndex
                      ? "border-slate-600 bg-slate-50"
                      : "border-gray-300 bg-white"
                  }`}
              >
                {index < currentStepIndex ? (
                  <CheckCircleIcon className="w-5 h-5 text-slate-600" />
                ) : (
                  <span
                    className={`text-sm font-medium ${
                      index <= currentStepIndex
                        ? "text-slate-600"
                        : "text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium ${
                  index <= currentStepIndex ? "text-slate-300" : "text-gray-400"
                }`}
              >
                {s}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < currentStepIndex ? "bg-slate-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-800 px-6 py-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <BuildingLibraryIcon className="w-8 h-8" />
                <div>
                  <h2 className="text-xl font-semibold">EPFO Integration</h2>
                  <p className="text-slate-100 text-sm">
                    Secure Account Access
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <LockClosedIcon className="w-5 h-5 text-slate-100" />
                <span className="text-sm text-slate-100">
                  256-bit SSL Encrypted
                </span>
              </div>
            </div>
            {step !== "CONFIRM" && renderProgressBar()}
          </div>

          {/* Content */}
          <div className="p-8">
            {step !== "UAN" && step !== "CONFIRM" && (
              <button
                onClick={handleBack}
                className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back
              </button>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <ExclamationCircleIcon className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Error</h4>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {step === "UAN" && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleUANSubmit}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Enter UAN
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Please enter your 12-digit Universal Account Number
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UAN Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.uan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          uan: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                               focus:ring-slate-500 focus:border-transparent text-lg tracking-wider"
                      placeholder="XXXXXXXXXXXX"
                      maxLength={12}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <InformationCircleIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Your UAN can be found on your salary slip or EPF passbook
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg flex items-start space-x-3">
                  <InformationCircleIcon className="w-5 h-5 text-slate-500 mt-0.5" />
                  <div className="text-sm text-slate-700">
                    <p className="font-medium mb-1">Important Note</p>
                    <p>
                      Make sure you're entering the UAN linked to your current
                      EPF account.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || formData.uan.length !== 12}
                  className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium 
                           hover:bg-slate-700 transition-all disabled:bg-slate-300 
                           disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </motion.form>
            )}

            {step === "PASSWORD" && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handlePasswordSubmit}
                className="space-y-6"
              >
                <div className="text-center">
                  <KeyIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Enter Password
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Please enter your EPFO portal password
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                               focus:ring-slate-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <LockClosedIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg flex items-start space-x-3">
                  <InformationCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Security Notice</p>
                    <p>
                      Never share your EPFO password with anyone. Our executives
                      will never ask for your password.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || formData.password.length < 8}
                  className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium 
                           hover:bg-slate-700 transition-all disabled:bg-slate-300 
                           disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>

                <div className="text-center">
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-700 font-medium"
                  >
                    Forgot Password?
                  </a>
                </div>
              </motion.form>
            )}

            {step === "CAPTCHA" && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleCaptchaSubmit}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Security Verification
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Please enter the characters shown below
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div
                      className="bg-gray-100 p-6 rounded-lg w-64 h-20 flex items-center justify-center select-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")",
                      }}
                    >
                      <span className="text-2xl font-bold tracking-widest text-gray-700 font-mono transform -rotate-2">
                        Xk9R2m
                      </span>
                    </div>
                    <button
                      type="button"
                      className="absolute -right-12 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                      onClick={() => console.log("Refresh captcha")}
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="w-64">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Captcha
                    </label>
                    <input
                      type="text"
                      value={formData.captcha}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          captcha: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full px-4 py-3 text-center rounded-lg border border-gray-300 
                               focus:ring-2 focus:ring-slate-500 focus:border-transparent tracking-wider font-mono"
                      placeholder="Enter characters"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg flex items-start space-x-3">
                  <InformationCircleIcon className="w-5 h-5 text-slate-500 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    Characters are case-sensitive. Click the refresh icon if the
                    characters are not clearly visible.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || formData.captcha.length !== 6}
                  className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium 
                           hover:bg-slate-700 transition-all disabled:bg-slate-300 
                           disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Continue"
                  )}
                </button>
              </motion.form>
            )}

            {step === "CONSENT" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <ShieldCheckIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Authorize Access
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Please review and authorize access to your EPF information
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Permissions Requested:
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                          <div>
                            <span className="font-medium text-gray-900">
                              View Account Balance
                            </span>
                            <p className="text-sm text-gray-500 mt-0.5">
                              Access to view your current EPF balance
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                          <div>
                            <span className="font-medium text-gray-900">
                              Track Contributions
                            </span>
                            <p className="text-sm text-gray-500 mt-0.5">
                              Monitor your monthly contributions and withdrawals
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                          <div>
                            <span className="font-medium text-gray-900">
                              View Employer Details
                            </span>
                            <p className="text-sm text-gray-500 mt-0.5">
                              Access employer contribution information
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Data Security:
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <LockClosedIcon className="w-5 h-5 text-slate-500 mt-0.5 mr-3" />
                          <div>
                            <span className="font-medium text-gray-900">
                              End-to-End Encryption
                            </span>
                            <p className="text-sm text-gray-500 mt-0.5">
                              Your data is encrypted using bank-grade security
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ShieldCheckIcon className="w-5 h-5 text-slate-500 mt-0.5 mr-3" />
                          <div>
                            <span className="font-medium text-gray-900">
                              Read-Only Access
                            </span>
                            <p className="text-sm text-gray-500 mt-0.5">
                              No ability to modify your EPF account
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex space-x-3">
                      <InformationCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-800">
                          Important Notice
                        </p>
                        <p className="text-sm text-yellow-700 mt-1">
                          By proceeding, you authorize us to access your EPF
                          information. You can revoke this access at any time
                          from your account settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConsent}
                  disabled={loading}
                  className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium 
                           hover:bg-slate-700 transition-all disabled:bg-slate-300 
                           disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Authorize Access"
                  )}
                </button>
              </motion.div>
            )}

            {step === "CONFIRM" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DocumentCheckIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    EPF Account Linked Successfully
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Your EPF account has been securely connected to your profile
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Account Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">UAN</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formData.uan}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Last Updated
                      </span>
                      <span className="text-sm text-gray-900">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg flex items-start space-x-3">
                  <InformationCircleIcon className="w-5 h-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Automatic Updates
                    </p>
                    <p className="text-sm text-slate-700 mt-1">
                      Your EPF information will be automatically updated every
                      month. You'll be notified of any changes.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Next Steps
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                        <span className="text-slate-600 text-xs font-medium">
                          1
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          View Your Dashboard
                        </p>
                        <p className="text-sm text-gray-500">
                          Access your EPF balance and transaction history
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                        <span className="text-slate-600 text-xs font-medium">
                          2
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Set Up Alerts
                        </p>
                        <p className="text-sm text-gray-500">
                          Configure notifications for account updates
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                        <span className="text-slate-600 text-xs font-medium">
                          3
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Complete Profile
                        </p>
                        <p className="text-sm text-gray-500">
                          Add additional security measures to your account
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleComplete}
                  className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium 
                           hover:bg-slate-700 transition-all flex items-center justify-center"
                >
                  Continue to Dashboard
                </button>

                <p className="text-center text-sm text-gray-500">
                  Need help?{" "}
                  <a
                    href="#"
                    className="text-slate-600 font-medium hover:text-slate-700"
                  >
                    Contact Support
                  </a>
                </p>
              </motion.div>
            )}
          </div>

          {/* Security Footer */}
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Bank Grade Security
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <LockClosedIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  End-to-End Encryption
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpXG4mNxnqwQPBOtlVG2lixFqIm2h8mammQ&s"
              alt="EPFO Logo"
              className="h-6 object-contain"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
            <img
              src="https://media.istockphoto.com/id/942287864/vector/iso-9001-2015-label-certification-new-version.jpg?s=612x612&w=0&k=20&c=BNxlzWbGc3v4GbNRSwqPrSpXQmabbjVLpxPXGMhvOaQ="
              alt="ISO Certified"
              className="h-6 object-contain"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
            <ShieldCheckIcon className="h-6 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPFAuth;
