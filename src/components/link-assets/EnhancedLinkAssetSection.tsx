import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import { LINKING_CONFIGS, AssetType } from "../../utils/assestsLinkingConfig";
import { usePortfolio } from "../../hooks/usePortfolio";
import { useAssetLinking } from "./AssetLinkingUtilites";
import { EmptyPortfolioState } from "../portfolio/EmptyPortfolio";

// Define category groupings for the asset types
const assetCategories = {
  stocks: { label: "Stocks & Securities", color: "blue" },
  funds: { label: "Mutual Funds", color: "purple" },
  retirement: { label: "Retirement Plans", color: "green" },
  others: { label: "Other Assets", color: "gray" },
};

// Asset Card Component
const AssetCard: React.FC<{
  assetType: AssetType;
}> = ({ assetType }) => {
  const { startLinkingFlow } = useAssetLinking();
  const config = LINKING_CONFIGS[assetType];

  if (!config) return null;

  // Get the right style based on color
  const getStyleClass = (color: string) => {
    const styles: { [key: string]: string } = {
      blue: "bg-blue-50 text-blue-700 border-blue-100",
      purple: "bg-purple-50 text-purple-700 border-purple-100",
      green: "bg-green-50 text-green-700 border-green-100",
      yellow: "bg-amber-50 text-amber-700 border-amber-100",
      gray: "bg-gray-50 text-gray-700 border-gray-100",
    };
    return styles[color] || styles.gray;
  };

  const handleClick = () => {
    startLinkingFlow({
      assetType,
      assetTitle: config.title,
    });
  };

  // Dynamically render the icon component
  const IconComponent = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        layout: { duration: 0.3 },
        opacity: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center py-2.5 px-3 ${getStyleClass(
        config.color
      )} rounded-lg border
                shadow-sm active:shadow-inner transition-all duration-200 hover:shadow-md cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-lg
                    bg-white shadow-sm text-${config.color}-600`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="ml-3 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {config.title}
          </p>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {config.description}
          </p>
        </div>
      </div>
      <ArrowSmallRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
    </motion.div>
  );
};

export function EnhancedLinkAssetsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const {
    state: { assets },
  } = usePortfolio();
  const { goToPortfolio } = useAssetLinking();

  // Group asset types by category
  const assetGroups = Object.entries(LINKING_CONFIGS).reduce(
    (acc, [key, config]) => {
      const category = config.category || "others";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(key as AssetType);
      return acc;
    },
    {} as Record<string, AssetType[]>
  );

  // Filter based on selected category
  const filteredAssetTypes = selectedCategory
    ? assetGroups[selectedCategory] || []
    : Object.values(assetGroups).flat();

  // Limit visible items based on showAll state
  const visibleAssetTypes = showAll
    ? filteredAssetTypes
    : filteredAssetTypes.slice(0, 4);

  // If assets exist, return a different view
  if (assets.length > 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Link Additional Assets
            </h2>
            <p className="text-slate-600 mt-1">
              Connect more accounts to your portfolio
            </p>
          </div>
          <button
            onClick={goToPortfolio}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            View Portfolio
          </button>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {Object.entries(assetCategories).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === key
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Asset cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {visibleAssetTypes.map((assetType) => (
            <AssetCard key={assetType} assetType={assetType} />
          ))}
        </div>

        {/* Show more/less button */}
        {filteredAssetTypes.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-2 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            {showAll ? (
              <>
                Show Less <ChevronUpIcon className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDownIcon className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  // If no assets, show the empty state
  return (
    <EmptyPortfolioState
      onLinkAsset={() => {
        // Show all options - in a real app, this would navigate to a dedicated page
        setSelectedCategory(null);
        setShowAll(true);
      }}
    />
  );
}

export default EnhancedLinkAssetsSection;
