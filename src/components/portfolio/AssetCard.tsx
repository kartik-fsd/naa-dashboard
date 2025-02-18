import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { AssetData } from "../../types/portfolio";

interface AssetCardProps {
  asset: AssetData;
  onAddNominee: (assetId: string) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  onAddNominee,
}) => {
  const getRiskColors = (risk: AssetData["riskLevel"]) => {
    const colors = {
      low: "bg-emerald-50 text-emerald-700 border-emerald-200",
      medium: "bg-amber-50 text-amber-700 border-amber-200",
      high: "bg-rose-50 text-rose-700 border-rose-200",
      critical: "bg-red-50 text-red-700 border-red-200",
    };
    return colors[risk];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-slate-900">{asset.name}</h3>
          <p className="text-sm text-slate-500">{asset.institution}</p>
        </div>
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getRiskColors(
            asset.riskLevel
          )}`}
        >
          {asset.riskLevel.toUpperCase()}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-600">Account Value</p>
          <p className="text-xl font-semibold text-slate-900">{asset.value}</p>
        </div>

        {!asset.hasNominee && (
          <div className="flex items-center text-amber-600 text-sm">
            <ExclamationTriangleIcon className="w-4 h-4 mr-1.5" />
            Nominee not assigned
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-slate-500">{asset.accountNumber}</span>
          {!asset.hasNominee && (
            <button
              onClick={() => onAddNominee(asset.id)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Nominee
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
