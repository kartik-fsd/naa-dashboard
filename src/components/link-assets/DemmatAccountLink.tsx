import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

type AuthStep = "DEPOSITORY" | "LOGIN" | "VERIFY" | "CONSENT" | "CONFIRM";

interface DematAuthProps {
  returnUrl?: string;
}

const DematAuth: React.FC<DematAuthProps> = ({
  returnUrl = "/auth/callback",
}) => {
  const [step, setStep] = useState<AuthStep>("DEPOSITORY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [depository, setDepository] = useState<"CDSL" | "NSDL" | null>(null);
  const [formData, setFormData] = useState({
    dpId: "",
    clientId: "",
    pan: "",
    dob: "",
  });

  const handleDepositorySelect = (selected: "CDSL" | "NSDL") => {
    setDepository(selected);
    setStep("LOGIN");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API validation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Validate PAN format
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.pan)) {
      setError("Invalid PAN format");
      setLoading(false);
      return;
    }

    // Simulate successful validation
    setLoading(false);
    setStep("VERIFY");
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
    window.location.href = `${returnUrl}?status=success&type=demat&provider=${depository}`;
  };

  return (
    <div className="@container flex items-center justify-center">
      <div className="max-w-[400px] w-full">
        <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-800 px-6 py-8 text-white text-center">
            <h2 className="text-[24px] font-bold">Link Demat Account</h2>
            <p className="mt-2 text-slate-200 text-[14px]">
              Secure connection via Depository
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === "DEPOSITORY" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-[18px] font-semibold text-gray-900 text-center">
                  Select Your Depository
                </h3>

                <button
                  onClick={() => handleDepositorySelect("CDSL")}
                  className="w-full p-4 border border-gray-300 rounded-[12px] hover:border-slate-500 
                           hover:shadow-md transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHZ4WX0z69bThNo6s077o9A5cMC5ne1woIhw&s"
                      alt="CDSL"
                      className="w-14 h-10 rounded-lg bg-cover"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">CDSL</h4>
                      <p className="text-sm text-gray-500">
                        Central Depository Services Ltd
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleDepositorySelect("NSDL")}
                  className="w-full p-4 border border-gray-300 rounded-[12px] hover:border-slate-500 
                           hover:shadow-md transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src="https://www.finnovate.in/learn/assets/uploads/blogs/blog_1719472667.png"
                      alt="NSDL"
                      className="w-14 h-10 rounded-lg"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">NSDL</h4>
                      <p className="text-sm text-gray-500">
                        National Securities Depository Ltd
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            )}

            {step === "LOGIN" && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleLogin}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-[18px] font-semibold text-gray-900">
                    Enter Your {depository} Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Please provide your demat account information
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-[8px] flex items-center text-red-700">
                    <ExclamationCircleIcon className="w-5 h-5 mr-2" />
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      DP ID
                    </label>
                    <input
                      type="text"
                      value={formData.dpId}
                      onChange={(e) =>
                        setFormData({ ...formData, dpId: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-[8px] border border-gray-300 focus:ring-2 
                               focus:ring-slate-500 focus:border-transparent"
                      placeholder={
                        depository === "CDSL" ? "12345600" : "IN300000"
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client ID
                    </label>
                    <input
                      type="text"
                      value={formData.clientId}
                      onChange={(e) =>
                        setFormData({ ...formData, clientId: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-[8px] border border-gray-300 focus:ring-2 
                               focus:ring-slate-500 focus:border-transparent"
                      placeholder="00045678"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    value={formData.pan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pan: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full px-4 py-3 rounded-[8px] border border-gray-300 focus:ring-2 
                             focus:ring-slate-500 focus:border-transparent"
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[8px] border border-gray-300 focus:ring-2 
                             focus:ring-slate-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-slate-600 text-white rounded-[8px] font-medium 
                           hover:bg-slate-700 transition-all disabled:bg-slate-300 
                           flex items-center justify-center"
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

            {step === "VERIFY" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h3 className="text-[18px] font-semibold text-gray-900 mb-6">
                  Verify Your Identity
                </h3>

                <p className="text-sm text-gray-600 mb-6">
                  We've sent an OTP to your registered mobile number ending in
                  ****
                  {Math.floor(Math.random() * 9999)}
                </p>

                <div className="flex justify-center gap-3 mb-6">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center border border-gray-300 rounded-[8px] text-lg 
                     font-medium focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        onChange={(e) => {
                          const otp = e.target.value;
                          if (otp.length === 1) {
                            // Move focus to the next input
                            if (i < 5) {
                              const nextInput = document.getElementById(
                                `otp-${i + 1}`
                              );
                              if (nextInput) nextInput.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Backspace" &&
                            e.currentTarget.value === ""
                          ) {
                            // Move focus to the previous input
                            if (i > 0) {
                              const prevInput = document.getElementById(
                                `otp-${i - 1}`
                              );
                              if (prevInput) prevInput.focus();
                            }
                          }
                        }}
                        id={`otp-${i}`}
                      />
                    ))}
                </div>

                <button
                  onClick={handleVerification}
                  disabled={loading}
                  className="w-full py-3 bg-slate-600 text-white rounded-[8px] font-medium 
               hover:bg-slate-700 transition-all disabled:bg-slate-300"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <p className="mt-4 text-sm text-gray-600">
                  Didn't receive the code?{" "}
                  <button className="text-slate-600 font-medium">Resend</button>
                </p>
              </motion.div>
            )}

            {step === "CONSENT" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <ShieldCheckIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Authorize Access
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Allow us to securely access your demat holdings
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-gray-900">
                    We will be able to:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 
                                    flex items-center justify-center mt-0.5"
                      >
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="ml-3 text-sm text-gray-600">
                        View your demat holdings and transactions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 
                                    flex items-center justify-center mt-0.5"
                      >
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="ml-3 text-sm text-gray-600">
                        Track your portfolio performance
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 
                                    flex items-center justify-center mt-0.5"
                      >
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="ml-3 text-sm text-gray-600">
                        Generate tax reports and analytics
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    We will never make any transactions or modifications to your
                    holdings without your explicit consent.
                  </p>
                </div>

                <button
                  onClick={handleConsent}
                  disabled={loading}
                  className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium 
                           hover:bg-slate-700 transition-all disabled:bg-slate-300"
                >
                  {loading ? "Processing..." : "Authorize Access"}
                </button>
              </motion.div>
            )}

            {step === "CONFIRM" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <DocumentCheckIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Demat Account Linked Successfully!
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Your demat account is now connected to your profile
                </p>

                <div className="mt-6 space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        DP ID
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {formData.dpId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        Client ID
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {formData.clientId}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                    Your holdings will be automatically updated daily
                  </div>
                </div>

                <button
                  onClick={handleComplete}
                  className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium 
                           hover:bg-slate-700 transition-all mt-6"
                >
                  Continue to Dashboard
                </button>
              </motion.div>
            )}
          </div>

          {/* Security Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
              <p className="text-sm text-gray-600">
                Secured by {depository || "Depository"} Network
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DematAuth;
