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
// import { BankLinkingFlow } from "./BankLink";

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
//   category: string;
// }

// // const AssetCard: React.FC<AssetCardProps> = ({
// //   icon: Icon,
// //   title,
// //   description,
// //   category,
// // }) => {
// //   const [isHovered, setIsHovered] = useState(false);

// //   const getCategoryColor = (category: string) => {
// //     const colors: { [key: string]: string } = {
// //       stocks: "bg-blue-50 text-blue-700",
// //       funds: "bg-purple-50 text-purple-700",
// //       retirement: "bg-green-50 text-green-700",
// //       property: "bg-orange-50 text-orange-700",
// //       others: "bg-gray-50 text-gray-700",
// //     };
// //     return colors[category] || colors.others;
// //   };

// //   return (
// //     <motion.button
// //       whileHover={{ y: -5 }}
// //       whileTap={{ scale: 0.95 }}
// //       onHoverStart={() => setIsHovered(true)}
// //       onHoverEnd={() => setIsHovered(false)}
// //       className="group relative flex flex-col items-center p-4 bg-white rounded-xl
// //                 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
// //     >
// //       <div
// //         className={`mb-3 w-14 h-14 flex items-center justify-center rounded-full
// //                     ${getCategoryColor(
// //                       category
// //                     )} transition-colors duration-200`}
// //       >
// //         <Icon className="w-8 h-8" />
// //       </div>
// //       <p className="text-sm font-medium text-gray-900 text-center">{title}</p>

// //       {description && (
// //         <AnimatePresence>
// //           {isHovered && (
// //             <motion.div
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: 10 }}
// //               className="absolute inset-0 flex items-center justify-center bg-white/95
// //                        rounded-xl backdrop-blur-sm p-3"
// //             >
// //               <div className="text-center">
// //                 <p className="text-sm text-gray-600">{description}</p>
// //                 <PlusCircleIcon className="w-6 h-6 mx-auto mt-2 text-blue-600" />
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       )}
// //     </motion.button>
// //   );
// // };

// // export function LinkAssetsSection() {
// //   const [isExpanded, setIsExpanded] = useState(false);
// //   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

// //   const filteredAssets = selectedCategory
// //     ? assets.filter((asset) => asset.category === selectedCategory)
// //     : assets;

// //   const visibleAssets = isExpanded
// //     ? filteredAssets
// //     : filteredAssets.slice(0, 6);

// //   return (
// //     <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
// //       {/* Header */}
// //       <div className="relative overflow-hidden">
// //         <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800" />
// //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]" />
// //         <div className="relative px-6 py-4">
// //           <h2 className="text-xl font-semibold text-white">Link Your Assets</h2>
// //           <p className="mt-1 text-sm text-blue-100">
// //             Connect your financial accounts to get started
// //           </p>
// //         </div>
// //       </div>

// //       {/* Category Filters */}
// //       <div className="px-6 pt-4 overflow-x-auto">
// //         <div className="flex space-x-2 pb-2">
// //           <button
// //             onClick={() => setSelectedCategory(null)}
// //             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
// //                      ${
// //                        !selectedCategory
// //                          ? "bg-gray-900 text-white"
// //                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //                      }`}
// //           >
// //             All
// //           </button>
// //           {Object.entries(assetCategories).map(([key, { label, color }]) => (
// //             <button
// //               key={key}
// //               onClick={() => setSelectedCategory(key)}
// //               className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
// //                        transition-colors ${
// //                          selectedCategory === key
// //                            ? `bg-${color}-100 text-${color}-700`
// //                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //                        }`}
// //             >
// //               {label}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Assets Grid */}
// //       <div className="p-6">
// //         <motion.div
// //           layout
// //           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
// //         >
// //           <AnimatePresence>
// //             {visibleAssets.map((asset, index) => (
// //               <motion.div
// //                 key={asset.title}
// //                 layout
// //                 initial={{ opacity: 0, scale: 0.9 }}
// //                 animate={{ opacity: 1, scale: 1 }}
// //                 exit={{ opacity: 0, scale: 0.9 }}
// //                 transition={{ delay: index * 0.1 }}
// //               >
// //                 <AssetCard {...asset} />
// //               </motion.div>
// //             ))}
// //           </AnimatePresence>
// //         </motion.div>
// //       </div>

// //       {/* Expand/Collapse Button */}
// //       {filteredAssets.length > 6 && (
// //         <div className="border-t border-gray-100 p-4">
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             onClick={() => setIsExpanded(!isExpanded)}
// //             className="mx-auto flex items-center justify-center px-4 py-2 rounded-lg
// //                      bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium
// //                      text-gray-700"
// //           >
// //             {isExpanded ? (
// //               <>
// //                 Show Less <ChevronUpIcon className="w-4 h-4 ml-1" />
// //               </>
// //             ) : (
// //               <>
// //                 Show More <ChevronDownIcon className="w-4 h-4 ml-1" />
// //               </>
// //             )}
// //           </motion.button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default LinkAssetsSection;
// const AssetCard: React.FC<AssetCardProps> = ({
//   icon: Icon,
//   title,
//   description,
//   category,
// }) => {
//   const [showBankLinking, setShowBankLinking] = useState(false);

//   const handleClick = () => {
//     setShowBankLinking(true);
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
//       <BankLinkingFlow
//         isOpen={showBankLinking}
//         onClose={() => setShowBankLinking(false)}
//         assetType={category}
//         assetTitle={title}
//       />
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

import React, { useEffect, useState } from "react";
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
}
const AssetCard: React.FC<AssetCardProps> = ({
  icon: Icon,
  title,
  description,
  category,
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
  const [filteredAssets, setFilteredAssets] = useState(assets);
  const [visibleAssets, setVisibleAssets] = useState(assets.slice(0, 4));

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
    const newFilteredAssets = selectedCategory
      ? assets.filter((asset) => asset.category === selectedCategory)
      : assets;
    setFilteredAssets(newFilteredAssets);
    setVisibleAssets(newFilteredAssets.slice(0, 4));
  }, [selectedCategory]);

  // Update visible assets when showAll changes
  useEffect(() => {
    setVisibleAssets(showAll ? filteredAssets : filteredAssets.slice(0, 4));
  }, [showAll, filteredAssets]);

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
            <AnimatePresence mode="wait">
              {visibleAssets.map((asset, index) => (
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
                  <AssetCard {...asset} />
                </motion.div>
              ))}
            </AnimatePresence>
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
