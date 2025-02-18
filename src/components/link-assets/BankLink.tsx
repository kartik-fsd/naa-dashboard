import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  XMarkIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { createSandboxUrl } from "../../sandbox/sandboxUrl";

const POPULAR_BANKS = [
  {
    id: "hdfc",
    name: "HDFC Bank",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91g86GYPEmouJD3LiPGSYtYYW9XycFIu4pA&s",
  },
  {
    id: "sbi",
    name: "State Bank of India",
    logo: "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg",
  },
  {
    id: "icici",
    name: "ICICI Bank",
    logo: "https://play-lh.googleusercontent.com/3k0f2yWl15mhkyltVQoqwmfRcm6ywTDYOttNHusElScrqjxYHLK82oVnjt3wQJQyPw",
  },
  {
    id: "axis",
    name: "Axis Bank",
    logo: "https://www.nfcw.com/wp-content/uploads/2020/06/axis-bank-logo.jpg",
  },
  {
    id: "kotak",
    name: "Kotak Bank",
    logo: "https://www.eqimg.com/images/2024/1920x1080/10212024-image3-equitymaster.jpg",
  },
];

interface BankLinkingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  assetType: string;
  assetTitle: string;
}

const BankLinkingFlow: React.FC<BankLinkingFlowProps> = ({
  isOpen,
  onClose,
  assetType,
  assetTitle,
}) => {
  const navigate = useNavigate();

  const handleBankSelect = (bankId: string) => {
    onClose(); // Close the modal first

    // Navigate to the sandbox flow
    navigate(
      createSandboxUrl(`${bankId}-auth`, {
        flow: "bank-link",
        returnUrl: "/auth/callback",
        assetType,
        assetTitle,
      })
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
      aria-labelledby="bank-linking-title"
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 md:p-10">
        <DialogPanel className="w-full max-w-4xl max-h-[75vh] bg-white rounded-2xl shadow-lg flex flex-col">
          {/* Header */}
          <div className="bg-gray-900 p-6 rounded-t-2xl flex justify-between items-center">
            <div>
              <p className="text-blue-200 text-sm">Link Account</p>
              <h2
                id="bank-linking-title"
                className="text-xl font-semibold text-white mt-1"
              >
                {assetTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors focus:outline-none"
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Content with scrollable area */}
          <div className="p-5 flex-1 overflow-y-auto">
            {/* Search Box */}
            <div className="relative mb-5">
              <input
                type="text"
                placeholder="Search your bank..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search banks"
              />
              <MagnifyingGlassIcon
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>

            {/* Popular Banks - Responsive Grid */}
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Popular Banks
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
              {POPULAR_BANKS.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => handleBankSelect(bank.id)}
                  className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all flex flex-col items-center focus:outline-none"
                  aria-label={`Select ${bank.name}`}
                >
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="w-12 h-12 object-contain mb-2"
                  />
                  <span className="text-sm text-gray-600">{bank.name}</span>
                </button>
              ))}
            </div>

            {/* All Banks List with Scroll */}
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              All Banks
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleBankSelect(`bank-${i}`)}
                  className="w-full p-3 flex items-center border border-gray-300 rounded-lg hover:border-blue-500 transition-colors focus:outline-none"
                  aria-label={`Select Bank Name ${i + 1}`}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91g86GYPEmouJD3LiPGSYtYYW9XycFIu4pA&s"
                    alt={`Bank ${i}`}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="ml-3 text-sm text-gray-600">
                    Bank Name {i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 flex justify-center text-xs text-gray-500">
            <ShieldCheckIcon className="w-4 h-4 mr-1" aria-hidden="true" />
            Secured by Account Aggregator Network
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BankLinkingFlow;
