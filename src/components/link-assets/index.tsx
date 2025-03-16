// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
// import {
//   ChevronUpIcon,
//   ChevronDownIcon,
//   CurrencyRupeeIcon,
//   ChartBarIcon,
//   ClockIcon,
//   BuildingLibraryIcon,
//   BuildingOffice2Icon,
//   WalletIcon,
//   ChartPieIcon,
//   SparklesIcon,
// } from "@heroicons/react/24/outline";
// import { BanknotesIcon } from "@heroicons/react/24/solid";
// import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
// import BankLinkingFlow from "./BankLink";
// import {
//   getAssetConfig,
//   LINKING_CONFIGS,
// } from "../../utils/assestsLinkingConfig";
// import { assetLinkingNavigator } from "../../routes";
// import { useNavigate } from "react-router-dom";

// interface AssetType {
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   title: string;
//   category: "stocks" | "funds" | "retirement" | "property" | "others";
//   description?: string;
// }

// const assets: AssetType[] = [
//   {
//     icon: CurrencyRupeeIcon,
//     title: "Demat Holdings",
//     category: "stocks",
//     description: "Add nominee to your equity investments",
//   },
//   {
//     icon: ChartBarIcon,
//     title: "Mutual Funds",
//     category: "funds",
//     description: "Nominate beneficiary for your MF portfolio",
//   },
//   {
//     icon: BuildingLibraryIcon,
//     title: "Bank Accounts",
//     category: "others",
//     description: "Add nomination to savings and current accounts",
//   },
//   {
//     icon: BanknotesIcon,
//     title: "Fixed Deposits",
//     category: "others",
//     description: "Secure FDs with nomination facility",
//   },
//   {
//     icon: WalletIcon,
//     title: "PPF Account",
//     category: "retirement",
//     description: "Update PPF account nomination",
//   },
//   {
//     icon: ClockIcon,
//     title: "NPS",
//     category: "retirement",
//     description: "Manage pension scheme nominees",
//   },
//   {
//     icon: BuildingLibraryIcon,
//     title: "EPF",
//     category: "retirement",
//     description: "Update provident fund nomination",
//   },
//   {
//     icon: SparklesIcon,
//     title: "Gold & Silver ETFs",
//     category: "others",
//     description: "Add nominees to precious metal ETFs",
//   },
//   {
//     icon: BuildingOffice2Icon,
//     title: "Government Bonds",
//     category: "others",
//     description: "Nominate beneficiary for govt securities",
//   },
//   {
//     icon: ChartPieIcon,
//     title: "Insurance Policies",
//     category: "others",
//     description: "Update policy nominees",
//   },
// ];

// const assetCategories = {
//   stocks: { label: "Stocks & Securities", color: "blue" },
//   funds: { label: "Mutual Funds", color: "purple" },
//   retirement: { label: "Retirement Plans", color: "green" },
//   others: { label: "Other Assets", color: "gray" },
// };

// interface AssetCardProps {
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   title: string;
//   description?: string;
//   category: "stocks" | "funds" | "retirement" | "property" | "others";
// }
// const AssetCard: React.FC<AssetCardProps> = ({
//   icon: Icon,
//   title,
//   description,
//   category,
// }) => {
//   const navigate = useNavigate();
//   const [showBankLinking, setShowBankLinking] = useState(false);

//   type ConfigKeyMapping = {
//     [key: string]: keyof typeof LINKING_CONFIGS;
//   };

//   // Create the mapping with proper types
//   const configKeyMappings: ConfigKeyMapping = {
//     "PPF Account": "ppf",
//     NPS: "nps",
//     EPF: "epf",
//     "Demat Holdings": "stocks",
//     "Mutual Funds": "funds",
//     "Bank Accounts": "bank",
//     "Fixed Deposits": "fd",
//     "Gold & Silver ETFs": "etf",
//     "Government Bonds": "bonds",
//     "Insurance Policies": "insurance",
//   };

//   const handleClick = () => {
//     // If it's a bank-related asset, show the modal
//     if (title === "Bank Accounts" || title === "Fixed Deposits") {
//       setShowBankLinking(true);
//       return;
//     }
//     // Get the correct config key based on title
//     const configKey = configKeyMappings[title];

//     if (!configKey) {
//       console.warn(`No configuration found for asset: ${title}`);
//       return;
//     }

//     const config = getAssetConfig(configKey);
//     if (!config) {
//       console.warn(`No configuration found for config key: ${configKey}`);
//       return;
//     }

//     const [defaultProvider] = config.providers;
//     navigate(assetLinkingNavigator.toSandbox(defaultProvider), {
//       state: {
//         assetType: configKey,
//         assetTitle: title,
//         returnUrl: assetLinkingNavigator.toCallback(),
//       },
//     });
//   };

//   const getCategoryStyle = (category: string) => {
//     const styles: {
//       [key: string]: { bg: string; text: string; border: string };
//     } = {
//       stocks: {
//         bg: "bg-blue-50",
//         text: "text-blue-700",
//         border: "border-blue-100",
//       },
//       funds: {
//         bg: "bg-purple-50",
//         text: "text-purple-700",
//         border: "border-purple-100",
//       },
//       retirement: {
//         bg: "bg-green-50",
//         text: "text-green-700",
//         border: "border-green-100",
//       },
//       property: {
//         bg: "bg-orange-50",
//         text: "text-orange-700",
//         border: "border-orange-100",
//       },
//       others: {
//         bg: "bg-gray-50",
//         text: "text-gray-700",
//         border: "border-gray-100",
//       },
//     };
//     return styles[category] || styles.others;
//   };

//   const style = getCategoryStyle(category);

//   return (
//     <>
//       <motion.div
//         layout
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{
//           layout: { duration: 0.3 },
//           opacity: { duration: 0.2 },
//         }}
//         whileTap={{ scale: 0.98 }}
//         className={`flex items-center py-2.5 px-3 ${style.bg} rounded-lg border ${style.border}
//                     shadow-sm active:shadow-inner transition-all duration-200 hover:shadow-md`}
//         onClick={handleClick}
//       >
//         <div className="flex items-center flex-1 min-w-0">
//           <div
//             className={`w-9 h-9 flex items-center justify-center rounded-lg
//                       bg-white shadow-sm ${style.text}`}
//           >
//             <Icon className="w-5 h-5" />
//           </div>
//           <div className="ml-3 min-w-0">
//             <p className="text-sm font-medium text-gray-900 truncate">
//               {title}
//             </p>
//             {description && (
//               <p className="text-xs text-gray-500 truncate mt-0.5">
//                 {description}
//               </p>
//             )}
//           </div>
//         </div>
//         <ArrowSmallRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
//       </motion.div>

//       {/* Show bank linking modal only for bank-related assets */}
//       {(title === "Bank Accounts" || title === "Fixed Deposits") && (
//         <BankLinkingFlow
//           isOpen={showBankLinking}
//           onClose={() => setShowBankLinking(false)}
//           assetType={category}
//           assetTitle={title}
//         />
//       )}
//     </>
//   );
// };

// export function LinkAssetsSection() {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [showAll, setShowAll] = useState(false);
//   const [filteredAssets, setFilteredAssets] = useState(assets);
//   const [visibleAssets, setVisibleAssets] = useState(assets.slice(0, 4));

//   // Reset showAll when category changes
//   useEffect(() => {
//     setShowAll(false);
//     const newFilteredAssets = selectedCategory
//       ? assets.filter((asset) => asset.category === selectedCategory)
//       : assets;
//     setFilteredAssets(newFilteredAssets);
//     setVisibleAssets(newFilteredAssets.slice(0, 4));
//   }, [selectedCategory]);

//   // Update visible assets when showAll changes
//   useEffect(() => {
//     setVisibleAssets(showAll ? filteredAssets : filteredAssets.slice(0, 4));
//   }, [showAll, filteredAssets]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.05,
//       },
//     },
//     exit: { opacity: 0 },
//   };

//   return (
//     <LayoutGroup>
//       <div className="bg-white rounded-xl md:rounded-2xl md:shadow-lg overflow-hidden md:border border-gray-200">
//         {/* Header */}
//         <div className="relative bg-gradient-to-l from-gray-900 to-gray-800 p-4">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]" />
//           <div className="relative">
//             <h2 className="text-xl font-semibold text-white">Link Assets</h2>
//             <p className="mt-1 text-sm text-blue-100">
//               Choose assets to connect
//             </p>
//           </div>
//         </div>

//         {/* Category Scroll */}
//         <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
//           <div className="flex p-3 space-x-2">
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setSelectedCategory(null)}
//               className={`flex-none px-4 py-2 rounded-full text-sm font-medium
//                          transition-colors ${
//                            !selectedCategory
//                              ? "bg-gray-900 text-white"
//                              : "bg-gray-100 text-gray-600"
//                          }`}
//             >
//               All
//             </motion.button>
//             {Object.entries(assetCategories).map(([key, { label }]) => (
//               <motion.button
//                 key={key}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setSelectedCategory(key)}
//                 className={`flex-none px-4 py-2 rounded-full text-sm font-medium
//                            whitespace-nowrap transition-colors ${
//                              selectedCategory === key
//                                ? "bg-gray-900 text-white"
//                                : "bg-gray-100 text-gray-600"
//                            }`}
//               >
//                 {label}
//               </motion.button>
//             ))}
//           </div>
//         </div>

//         {/* Assets List */}
//         <div className="p-4">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="space-y-3 min-h-[300px]"
//           >
//             <AnimatePresence mode="wait">
//               {visibleAssets.map((asset, index) => (
//                 <motion.div
//                   key={asset.title}
//                   layout
//                   custom={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{
//                     type: "spring",
//                     duration: 0.2,
//                     delay: index * 0.02,
//                   }}
//                 >
//                   <AssetCard {...asset} />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>

//           {/* Show More/Less Button */}
//           {filteredAssets.length > 4 && (
//             <motion.button
//               layout
//               onClick={() => setShowAll(!showAll)}
//               className="mt-4 w-full py-3 flex items-center justify-center text-sm
//                          font-medium text-slate-600 border border-gray-200 rounded-xl
//                          bg-gray-100 active:bg-blue-100 transition-colors"
//             >
//               <span className="flex items-center">
//                 {showAll ? (
//                   <>
//                     Show Less <ChevronUpIcon className="w-4 h-4 ml-1" />
//                   </>
//                 ) : (
//                   <>
//                     Show More <ChevronDownIcon className="w-4 h-4 ml-1" />
//                   </>
//                 )}
//               </span>
//             </motion.button>
//           )}
//         </div>
//       </div>
//     </LayoutGroup>
//   );
// }

// export default LinkAssetsSection;

// src/components/link-assets/index.tsx
import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  ClockIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  WalletIcon,
  ChartPieIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import BankLinkingFlow from "./BankLink";
import {
  getAssetConfig,
  LINKING_CONFIGS,
} from "../../utils/assestsLinkingConfig";
import { assetLinkingNavigator } from "../../routes";
import { useNavigate } from "react-router-dom";
import { useLinkedAssets } from "../../hooks/useLinkedAssets";
import { mockAssets } from "../../lib/assetsMockup";

interface AssetType {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  category: "stocks" | "funds" | "retirement" | "property" | "others";
  description?: string;
}

const assets: AssetType[] = [
  {
    icon: CurrencyRupeeIcon,
    title: "Demat Holdings",
    category: "stocks",
    description: "Add nominee to your equity investments",
  },
  {
    icon: ChartBarIcon,
    title: "Mutual Funds",
    category: "funds",
    description: "Nominate beneficiary for your MF portfolio",
  },
  {
    icon: BuildingLibraryIcon,
    title: "Bank Accounts",
    category: "others",
    description: "Add nomination to savings and current accounts",
  },
  {
    icon: BanknotesIcon,
    title: "Fixed Deposits",
    category: "others",
    description: "Secure FDs with nomination facility",
  },
  {
    icon: WalletIcon,
    title: "PPF Account",
    category: "retirement",
    description: "Update PPF account nomination",
  },
  {
    icon: ClockIcon,
    title: "NPS",
    category: "retirement",
    description: "Manage pension scheme nominees",
  },
  {
    icon: BuildingLibraryIcon,
    title: "EPF",
    category: "retirement",
    description: "Update provident fund nomination",
  },
  {
    icon: SparklesIcon,
    title: "Gold & Silver ETFs",
    category: "others",
    description: "Add nominees to precious metal ETFs",
  },
  {
    icon: BuildingOffice2Icon,
    title: "Government Bonds",
    category: "others",
    description: "Nominate beneficiary for govt securities",
  },
  {
    icon: ChartPieIcon,
    title: "Insurance Policies",
    category: "others",
    description: "Update policy nominees",
  },
];

const assetCategories = {
  stocks: { label: "Stocks & Securities", color: "blue" },
  funds: { label: "Mutual Funds", color: "purple" },
  retirement: { label: "Retirement Plans", color: "green" },
  others: { label: "Other Assets", color: "gray" },
};

interface AssetCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  category: "stocks" | "funds" | "retirement" | "property" | "others";
  isLinked?: boolean;
  onAssetLinked: (title: string) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({
  icon: Icon,
  title,
  description,
  category,
  isLinked = false,
  onAssetLinked,
}) => {
  const navigate = useNavigate();
  const [showBankLinking, setShowBankLinking] = useState(false);

  type ConfigKeyMapping = {
    [key: string]: keyof typeof LINKING_CONFIGS;
  };

  // Create the mapping with proper types
  const configKeyMappings: ConfigKeyMapping = {
    "PPF Account": "ppf",
    NPS: "nps",
    EPF: "epf",
    "Demat Holdings": "stocks",
    "Mutual Funds": "funds",
    "Bank Accounts": "bank",
    "Fixed Deposits": "fd",
    "Gold & Silver ETFs": "etf",
    "Government Bonds": "bonds",
    "Insurance Policies": "insurance",
  };

  const handleClick = () => {
    // If it's a bank-related asset, show the modal
    if (title === "Bank Accounts" || title === "Fixed Deposits") {
      setShowBankLinking(true);
      return;
    }
    // Get the correct config key based on title
    const configKey = configKeyMappings[title];

    if (!configKey) {
      console.warn(`No configuration found for asset: ${title}`);
      return;
    }

    const config = getAssetConfig(configKey);
    if (!config) {
      console.warn(`No configuration found for config key: ${configKey}`);
      return;
    }

    const [defaultProvider] = config.providers;

    // Mark the asset as linked before navigating
    onAssetLinked(title);

    navigate(assetLinkingNavigator.toSandbox(defaultProvider), {
      state: {
        assetType: configKey,
        assetTitle: title,
        returnUrl: assetLinkingNavigator.toCallback(),
      },
    });
  };

  const getCategoryStyle = (category: string) => {
    const styles: {
      [key: string]: { bg: string; text: string; border: string };
    } = {
      stocks: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-100",
      },
      funds: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-100",
      },
      retirement: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-100",
      },
      property: {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-100",
      },
      others: {
        bg: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-100",
      },
    };
    return styles[category] || styles.others;
  };

  const style = getCategoryStyle(category);

  // If the asset is linked, we could render a different state or not render it at all
  if (isLinked) {
    return null; // Don't show linked assets
  }

  return (
    <>
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
        className={`flex items-center py-2.5 px-3 ${style.bg} rounded-lg border ${style.border}
                    shadow-sm active:shadow-inner transition-all duration-200 hover:shadow-md`}
        onClick={handleClick}
      >
        <div className="flex items-center flex-1 min-w-0">
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-lg
                      bg-white shadow-sm ${style.text}`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {title}
            </p>
            {description && (
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>
        <ArrowSmallRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </motion.div>

      {/* Show bank linking modal only for bank-related assets */}
      {(title === "Bank Accounts" || title === "Fixed Deposits") && (
        <BankLinkingFlow
          isOpen={showBankLinking}
          onClose={() => setShowBankLinking(false)}
          assetType={category}
          assetTitle={title}
        />
      )}
    </>
  );
};

export function LinkAssetsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Initialize linked assets tracking
  const {
    //    availableAssets,
    //    linkedAssets,
    markAsLinked,
    isLinked,
  } = useLinkedAssets(mockAssets);

  // Filter assets based on linked status and selected category
  const getFilteredAssets = () => {
    // Start with all assets
    let filtered = assets;

    // Filter by category if one is selected
    if (selectedCategory) {
      filtered = filtered.filter(
        (asset) => asset.category === selectedCategory
      );
    }

    // Filter out linked assets
    filtered = filtered.filter((asset) => {
      // Find the corresponding mockAsset to get its ID
      const mockAsset = mockAssets.find((ma) => ma.title === asset.title);
      if (!mockAsset) return true; // Keep it if we can't find a matching mockAsset
      return !isLinked(mockAsset.id);
    });

    return filtered;
  };

  const filteredAssets = getFilteredAssets();

  // Determine which assets to show based on showAll toggle
  const visibleAssets = showAll ? filteredAssets : filteredAssets.slice(0, 4);

  // Handler for when an asset is linked
  const handleAssetLinked = (title: string) => {
    // Find the corresponding mockAsset to get its ID
    const mockAsset = mockAssets.find((ma) => ma.title === title);
    if (mockAsset) {
      markAsLinked(mockAsset.id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0 },
  };

  return (
    <LayoutGroup>
      <div className="bg-white rounded-xl md:rounded-2xl md:shadow-lg overflow-hidden md:border border-gray-200">
        {/* Header */}
        <div className="relative bg-gradient-to-l from-gray-900 to-gray-800 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]" />
          <div className="relative">
            <h2 className="text-xl font-semibold text-white">Link Assets</h2>
            <p className="mt-1 text-sm text-blue-100">
              Choose assets to connect
            </p>
          </div>
        </div>

        {/* Category Scroll */}
        <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
          <div className="flex p-3 space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`flex-none px-4 py-2 rounded-full text-sm font-medium 
                         transition-colors ${
                           !selectedCategory
                             ? "bg-gray-900 text-white"
                             : "bg-gray-100 text-gray-600"
                         }`}
            >
              All
            </motion.button>
            {Object.entries(assetCategories).map(([key, { label }]) => (
              <motion.button
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(key)}
                className={`flex-none px-4 py-2 rounded-full text-sm font-medium 
                           whitespace-nowrap transition-colors ${
                             selectedCategory === key
                               ? "bg-gray-900 text-white"
                               : "bg-gray-100 text-gray-600"
                           }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Assets List */}
        <div className="p-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-3 min-h-[300px]"
          >
            {visibleAssets.length > 0 ? (
              <AnimatePresence mode="wait">
                {visibleAssets.map((asset, index) => {
                  // Find the corresponding mockAsset to check if it's linked
                  const mockAsset = mockAssets.find(
                    (ma) => ma.title === asset.title
                  );
                  const isAssetLinked = mockAsset
                    ? isLinked(mockAsset.id)
                    : false;

                  return (
                    <motion.div
                      key={asset.title}
                      layout
                      custom={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        type: "spring",
                        duration: 0.2,
                        delay: index * 0.02,
                      }}
                    >
                      <AssetCard
                        {...asset}
                        isLinked={isAssetLinked}
                        onAssetLinked={handleAssetLinked}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500 text-center">
                  {selectedCategory
                    ? `All ${
                        assetCategories[
                          selectedCategory as keyof typeof assetCategories
                        ].label
                      } have been linked`
                    : "All assets have been linked"}
                </p>
              </div>
            )}
          </motion.div>

          {/* Show More/Less Button */}
          {filteredAssets.length > 4 && (
            <motion.button
              layout
              onClick={() => setShowAll(!showAll)}
              className="mt-4 w-full py-3 flex items-center justify-center text-sm 
                         font-medium text-slate-600 border border-gray-200 rounded-xl 
                         bg-gray-100 active:bg-blue-100 transition-colors"
            >
              <span className="flex items-center">
                {showAll ? (
                  <>
                    Show Less <ChevronUpIcon className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </>
                )}
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </LayoutGroup>
  );
}

export default LinkAssetsSection;
