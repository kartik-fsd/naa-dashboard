// src/pages/portfolio/index.tsx - Updated version
import { useEffect, useState } from "react";
import {
  BriefcaseIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useLinkedAssets } from "../../hooks/useLinkedAssets";
import { useAssetNominees } from "../../hooks/useAssetNominees";
import { mockAssets } from "../../lib/assetsMockup";
import { useNominee } from "../../hooks/useNomine";
import { DashboardStats } from "../../components/portfolio/DashboardStats";
import { formatCurrency } from "../../utils/formatter";

const NomineeErrorCard = ({ assetCount }: { assetCount: number }) => {
  if (assetCount === 0) return null;

  return (
    <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-red-800">Nominee Issues Detected</h3>
          <p className="text-sm text-red-700 mt-1">
            {assetCount} asset{assetCount > 1 ? "s" : ""}{" "}
            {assetCount > 1 ? "have" : "has"} nominee verification errors that
            require attention.
          </p>
          <Link
            to="/assets"
            className="mt-2 inline-flex items-center text-sm font-medium text-red-700 hover:text-red-800"
          >
            Review and fix issues
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const { linkedAssets } = useLinkedAssets(mockAssets);
  const { assetNominees, getNomineeStatusForAsset } = useAssetNominees();
  const {
    state: { nominees },
  } = useNominee();

  const [assetsWithErrors, setAssetsWithErrors] = useState<number>(0);
  const [assetsWithNominees, setAssetsWithNominees] = useState<number>(0);
  const [assetsWithoutNominees, setAssetsWithoutNominees] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  // Filter to get linked assets
  const linkedAssetObjects = mockAssets.filter((asset) =>
    linkedAssets.includes(asset.id)
  );

  // Group assets by category
  const assetsByCategory = linkedAssetObjects.reduce((acc, asset) => {
    const category = asset.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(asset);
    return acc;
  }, {} as Record<string, typeof linkedAssetObjects>);

  // Calculate statistics
  useEffect(() => {
    let withErrors = 0;
    let withNominees = 0;
    let withoutNominees = 0;
    let total = 0;

    linkedAssetObjects.forEach((asset) => {
      // Add to total value if balance exists
      if (asset.balance?.amount) {
        total += asset.balance.amount;
      }

      // Check nominee status
      const status = getNomineeStatusForAsset(asset.id);
      if (status === "error") {
        withErrors++;
      } else if (status === "active" || status === "pending") {
        withNominees++;
      } else {
        withoutNominees++;
      }
    });

    setAssetsWithErrors(withErrors);
    setAssetsWithNominees(withNominees);
    setAssetsWithoutNominees(withoutNominees);
    setTotalValue(total);
  }, [linkedAssetObjects, getNomineeStatusForAsset]);

  // Get the appropriate icon for an asset category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "stocks":
        return CurrencyRupeeIcon;
      case "funds":
        return ChartBarIcon;
      case "retirement":
        return BuildingLibraryIcon;
      default:
        return BriefcaseIcon;
    }
  };

  // Get the appropriate styles for an asset category
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "stocks":
        return {
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          borderColor: "border-blue-100",
        };
      case "funds":
        return {
          bgColor: "bg-purple-50",
          textColor: "text-purple-700",
          borderColor: "border-purple-100",
        };
      case "retirement":
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-100",
        };
      default:
        return {
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-100",
        };
    }
  };

  // Get readable label for category
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "stocks":
        return "Stocks & Securities";
      case "funds":
        return "Mutual Funds";
      case "retirement":
        return "Retirement Accounts";
      default:
        return "Other Assets";
    }
  };

  // Calculate estate readiness percentage
  const estateReadiness =
    linkedAssetObjects.length === 0
      ? 0
      : Math.round((assetsWithNominees / linkedAssetObjects.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <BriefcaseIcon className="h-7 w-7" />
              My Portfolio
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage your financial portfolio
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <Link
              to="/assets"
              className="inline-flex items-center px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700"
            >
              Manage Assets
            </Link>
          </div>
        </div>
      </header>

      {/* Error Alert */}
      <NomineeErrorCard assetCount={assetsWithErrors} />

      {/* Portfolio Stats */}
      <DashboardStats
        totalValue={formatCurrency(totalValue, "INR")}
        estateReadiness={estateReadiness}
        assetsWithNominees={assetsWithNominees}
        assetsWithoutNominees={assetsWithoutNominees}
      />

      {/* No Assets State */}
      {linkedAssetObjects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <BriefcaseIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No assets in your portfolio
          </h3>
          <p className="mt-2 text-gray-500">
            Your portfolio is empty. Start by linking financial accounts and
            assets.
          </p>
          <Link
            to="/link-assets"
            className="mt-6 inline-flex items-center px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg"
          >
            Link Your First Asset
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Assets By Category */}
          {Object.keys(assetsByCategory).map((category) => {
            const assets = assetsByCategory[category];
            const CategoryIcon = getCategoryIcon(category);
            const styles = getCategoryStyles(category);

            return (
              <div
                key={category}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div
                  className={`${styles.bgColor} p-4 border-b ${styles.borderColor}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 bg-white/80 rounded-lg ${styles.textColor}`}
                      >
                        <CategoryIcon className="h-5 w-5" />
                      </div>
                      <h2 className="font-medium text-gray-900">
                        {getCategoryLabel(category)}
                      </h2>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {assets.length} Asset{assets.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {assets.map((asset) => {
                    const nomineeStatus = getNomineeStatusForAsset(asset.id);
                    const nomineeMapping = assetNominees.find(
                      (n) => n.assetId === asset.id
                    );
                    const nominee = nomineeMapping
                      ? nominees.find((n) => n.id === nomineeMapping.nomineeId)
                      : undefined;

                    return (
                      <div key={asset.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-full ${styles.bgColor} flex items-center justify-center ${styles.textColor}`}
                            >
                              {asset.title.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3">
                              <h3 className="font-medium text-gray-900">
                                {asset.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {asset.institution}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {asset.balance
                                ? formatCurrency(
                                    asset.balance.amount,
                                    asset.balance.currency
                                  )
                                : "—"}
                            </p>

                            {/* Nominee Status */}
                            {nomineeStatus === "error" ? (
                              <div className="mt-1 flex items-center justify-end text-red-600">
                                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                <span className="text-xs">Nominee Issue</span>
                              </div>
                            ) : nomineeStatus === "active" ? (
                              <div className="mt-1 flex items-center justify-end text-green-600">
                                <ShieldCheckIcon className="w-4 h-4 mr-1" />
                                <span className="text-xs">
                                  {nominee?.fullName || "Nominated"}
                                </span>
                              </div>
                            ) : nomineeStatus === "pending" ? (
                              <div className="mt-1 flex items-center justify-end text-yellow-600">
                                <ShieldCheckIcon className="w-4 h-4 mr-1" />
                                <span className="text-xs">
                                  Pending Verification
                                </span>
                              </div>
                            ) : (
                              <Link
                                to="/assets"
                                className="mt-1 text-xs text-blue-600 hover:text-blue-800"
                              >
                                Add Nominee
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
