// components/sandbox/AuthCallback.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  BanknotesIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

type CallbackStatus = "PROCESSING" | "SUCCESS" | "ERROR";

interface LinkedAccount {
  id: string;
  type: string;
  accountNumber: string;
  bankName: string;
  balance: number;
  lastUpdated: string;
}

export const AuthCallback: React.FC = () => {
  const [status, setStatus] = useState<CallbackStatus>("PROCESSING");
  const [accounts, setAccounts] = useState<LinkedAccount[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const status = params.get("status");
        //  const bankId = params.get("bank");

        if (status === "success") {
          // Simulate API call to fetch linked accounts
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Mock response
          const mockAccounts: LinkedAccount[] = [
            {
              id: "acc_123",
              type: "Savings Account",
              accountNumber: "XXXX1234",
              bankName: "HDFC Bank",
              balance: 25000,
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "acc_124",
              type: "Current Account",
              accountNumber: "XXXX5678",
              bankName: "HDFC Bank",
              balance: 50000,
              lastUpdated: new Date().toISOString(),
            },
          ];

          setAccounts(mockAccounts);
          setStatus("SUCCESS");
        } else {
          throw new Error("Authentication failed");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setStatus("ERROR");
        setError("Failed to link account. Please try again.");
      }
    };

    processCallback();
  }, []);

  const handleContinue = () => {
    // Redirect back to assets page
    window.location.href = "/assets";
  };

  const handleRetry = () => {
    // Redirect back to linking flow
    window.location.href = "/link-account";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {status === "PROCESSING" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4">
              <ArrowPathIcon className="w-full h-full text-blue-600 animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Linking Your Accounts
            </h2>
            <p className="text-sm text-gray-600">
              Please wait while we securely link your accounts...
            </p>
          </motion.div>
        )}

        {status === "SUCCESS" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 bg-green-100 rounded-full 
                           flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Accounts Linked Successfully!
              </h2>
              <p className="text-sm text-gray-600">
                Your accounts have been successfully linked and verified
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="p-4 bg-gray-50 rounded-xl flex items-center"
                >
                  <div
                    className="w-10 h-10 bg-white rounded-lg 
                               flex items-center justify-center"
                  >
                    <BanknotesIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {account.type}
                    </p>
                    <p className="text-xs text-gray-500">
                      {account.accountNumber} • {account.bankName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ₹{account.balance.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Balance</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-3 bg-blue-600 text-white rounded-xl 
                       font-medium hover:bg-blue-700 transition-colors"
            >
              Continue to Dashboard
            </button>
          </motion.div>
        )}

        {status === "ERROR" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div
              className="w-16 h-16 bg-red-100 rounded-full 
                         flex items-center justify-center mx-auto mb-4"
            >
              <XCircleIcon className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Connection Failed
            </h2>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="w-full py-3 bg-blue-600 text-white rounded-xl 
                       font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
