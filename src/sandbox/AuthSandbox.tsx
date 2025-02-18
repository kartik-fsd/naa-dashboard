import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";

type AuthStep = "LOGIN" | "OTP" | "CONFIRM";

export const HDFCAuthSandbox = () => {
  const [step, setStep] = useState<AuthStep>("LOGIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    customerId: "",
    password: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    if (credentials.customerId === "12345") {
      setStep("OTP");
    } else {
      setError("Invalid Customer ID or Password.");
    }
  };

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep("CONFIRM");
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.location.href = "/auth/callback?status=success&bank=hdfc";
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 text-white text-center py-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91g86GYPEmouJD3LiPGSYtYYW9XycFIu4pA&s"
            alt="HDFC Bank"
            className="w-24 mx-auto mb-2"
          />
          <h2 className="text-xl font-semibold">Secure Account Access</h2>
          <p className="text-sm opacity-80">via Account Aggregator Network</p>
        </div>

        {/* Authentication Steps */}
        <div className="p-6">
          {step === "LOGIN" && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleLogin}
              className="space-y-5"
            >
              {error && (
                <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md">
                  {error}
                </p>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer ID
                </label>
                <input
                  type="text"
                  value={credentials.customerId}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      customerId: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter Customer ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password / IPIN
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter Password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all disabled:bg-blue-300"
              >
                {loading ? "Processing..." : "Secure Login"}
              </button>
            </motion.form>
          )}

          {step === "OTP" && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleOTPVerify}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-center">
                Enter One Time Password (OTP)
              </h3>

              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg font-medium focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || otp.some((d) => d === "")}
                className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all disabled:bg-blue-300"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </motion.form>
          )}

          {step === "CONFIRM" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center">
                <ShieldCheckIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">
                  Account Access Granted
                </h3>
                <p className="text-sm text-gray-600">
                  Securely linked via Account Aggregator Network
                </p>
              </div>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full py-3 mt-6 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all disabled:bg-blue-300"
              >
                {loading ? "Finalizing..." : "Proceed"}
              </button>
            </motion.div>
          )}
        </div>
        {/* Security Note */}
        <div className="mt-2 bg-white/50 backdrop-blur-sm  border-t border-0 border-gray-300 px-4 py-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <LockClosedIcon className="w-5 h-5 text-gray-600" />
            <h4 className="text-xs font-medium text-gray-900">
              Secure Environment
            </h4>
          </div>
          <p className="text-xs text-gray-600">
            This is a secure SSL encrypted session. Your banking credentials are
            protected and never shared with any third party.
          </p>
        </div>
      </div>
    </div>
  );
};
