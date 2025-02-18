// components/sandbox/callbackHandler.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

type CallbackStatus = "success" | "error" | "timeout";
type AssetType = "bank" | "demat" | "mf" | "epf";

interface LinkedAccount {
  id: string;
  type: string;
  accountNumber: string;
  providerName: string;
  balance?: number;
  lastUpdated: string;
}

const MOCK_ACCOUNTS: Record<AssetType, LinkedAccount[]> = {
  bank: [
    {
      id: "acc_123",
      type: "Savings Account",
      accountNumber: "XXXX1234",
      providerName: "HDFC Bank",
      balance: 25000,
      lastUpdated: new Date().toISOString(),
    },
  ],
  demat: [
    {
      id: "demat_123",
      type: "Demat Account",
      accountNumber: "IN12345678",
      providerName: "Zerodha",
      balance: 150000,
      lastUpdated: new Date().toISOString(),
    },
  ],
  mf: [
    {
      id: "mf_123",
      type: "Mutual Fund Folio",
      accountNumber: "1234567/89",
      providerName: "Groww",
      lastUpdated: new Date().toISOString(),
    },
  ],
  epf: [
    {
      id: "epf_123",
      type: "EPF Account",
      accountNumber: "EPFOXXXX1234",
      providerName: "EPFO",
      balance: 450000,
      lastUpdated: new Date().toISOString(),
    },
  ],
};

export const CallbackHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<CallbackStatus>();
  const [accounts, setAccounts] = useState<LinkedAccount[]>([]);

  useEffect(() => {
    const urlStatus = searchParams.get("status");
    const reason = searchParams.get("reason");
    const assetType = searchParams.get("type") as AssetType;

    if (reason === "timeout") {
      setStatus("timeout");
    } else if (urlStatus === "success" && assetType) {
      setStatus("success");
      setAccounts(MOCK_ACCOUNTS[assetType] || []);
    } else {
      setStatus("error");
    }
  }, [searchParams]);

  const handleRetry = () => {
    // Go back to the linking flow
    navigate("/link-assets");
  };

  const handleContinue = () => {
    // Navigate based on success context
    const assetType = searchParams.get("type");
    switch (assetType) {
      case "bank":
      case "demat":
      case "mf":
        navigate("/portfolio");
        break;
      case "epf":
        navigate("/nominees");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const renderContent = () => {
    switch (status) {
      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div
              className="w-16 h-16 bg-green-100 rounded-full 
                         flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Account Linked Successfully
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Your account has been successfully linked and verified.
            </p>

            {/* Linked Accounts */}
            {accounts.length > 0 && (
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
                        {account.accountNumber} • {account.providerName}
                      </p>
                    </div>
                    {account.balance && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ₹{account.balance.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">Balance</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleContinue}
              className="w-full py-3 bg-blue-600 text-white rounded-xl 
                       font-medium hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </motion.div>
        );

      case "timeout":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div
              className="w-16 h-16 bg-yellow-100 rounded-full 
                         flex items-center justify-center mx-auto mb-4"
            >
              <ClockIcon className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Session Timed Out
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              The connection process took too long. Please try again.
            </p>
            <button
              onClick={handleRetry}
              className="w-full py-3 bg-blue-600 text-white rounded-xl 
                       font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        );

      case "error":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
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
            <p className="text-sm text-gray-600 mb-8">
              We couldn't connect to your account. Please try again.
            </p>
            <button
              onClick={handleRetry}
              className="w-full py-3 bg-blue-600 text-white rounded-xl 
                       font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-lg mx-auto">
        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
