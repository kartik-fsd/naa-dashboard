import React from "react";
import {
  ShieldCheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface StatsProps {
  totalValue: string;
  estateReadiness: number;
  assetsWithNominees: number;
  assetsWithoutNominees: number;
}

export const DashboardStats: React.FC<StatsProps> = ({
  totalValue,
  estateReadiness,
  assetsWithNominees,
  assetsWithoutNominees,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Portfolio Overview
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-600">Total Value</p>
            <p className="text-2xl font-bold text-slate-900">{totalValue}</p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-slate-600">Estate Readiness</p>
              <span className="text-sm font-medium text-blue-600">
                {estateReadiness}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${estateReadiness}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <div className="flex items-center justify-between mb-2">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Protected
            </span>
          </div>
          <p className="text-2xl font-bold text-emerald-900">
            {assetsWithNominees}
          </p>
          <p className="text-sm text-emerald-600">Assets with nominees</p>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
          <div className="flex items-center justify-between mb-2">
            <ExclamationCircleIcon className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">At Risk</span>
          </div>
          <p className="text-2xl font-bold text-amber-900">
            {assetsWithoutNominees}
          </p>
          <p className="text-sm text-amber-600">Need nominees</p>
        </div>
      </div>
    </div>
  </div>
);
