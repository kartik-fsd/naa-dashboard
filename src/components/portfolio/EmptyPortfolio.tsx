import React from "react";
import {
  BriefcaseIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BanknotesIcon,
  ArrowRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

interface EmptyPortfolioStateProps {
  onLinkAsset: () => void;
}

export const EmptyPortfolioState: React.FC<EmptyPortfolioStateProps> = ({
  onLinkAsset,
}) => {
  const assetTypes = [
    {
      title: "Bank Accounts",
      description: "Link your savings and current accounts",
      icon: BanknotesIcon,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Investment Accounts",
      description: "Connect your demat and trading accounts",
      icon: ChartBarIcon,
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Retirement Accounts",
      description: "Link your EPF, PPF, and NPS accounts",
      icon: BriefcaseIcon,
      color: "text-green-600 bg-green-50",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-slate-700 bg-opacity-50 rounded-full flex items-center justify-center mb-4 border border-slate-600">
            <BriefcaseIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to Your Portfolio
          </h2>
          <p className="text-slate-300 mb-6 max-w-lg">
            Link your financial accounts to manage your assets and ensure
            they're protected with nominees.
          </p>
          <button
            onClick={onLinkAsset}
            className="inline-flex items-center px-4 py-2 bg-slate-50 text-slate-800 text-sm font-medium rounded-lg hover:bg-white transition-colors"
          >
            Get Started
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Asset Types Section */}
      <div className="p-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Connect Your Assets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {assetTypes.map((type, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div
                className={`${type.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
              >
                <type.icon className="h-6 w-6" />
              </div>
              <h4 className="text-slate-900 font-medium mb-2">{type.title}</h4>
              <p className="text-slate-600 text-sm mb-4">{type.description}</p>
              <button
                onClick={onLinkAsset}
                className="text-sm text-slate-700 font-medium inline-flex items-center"
              >
                Link Now
                <PlusCircleIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Why Link Your Assets?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <ShieldCheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-slate-900">
                  Protect Your Legacy
                </h4>
                <p className="text-sm text-slate-600">
                  Ensure your assets are transferred to the right people.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-slate-900">
                  Unified Dashboard
                </h4>
                <p className="text-sm text-slate-600">
                  View all your assets in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Footer */}
      <div className="border-t border-slate-200 p-4 bg-slate-50 text-center">
        <p className="text-sm text-slate-600 flex items-center justify-center">
          <ShieldCheckIcon className="h-4 w-4 mr-2 text-slate-500" />
          Bank-grade security and end-to-end encryption
        </p>
      </div>
    </div>
  );
};
