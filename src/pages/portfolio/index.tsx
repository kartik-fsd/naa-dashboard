// import React, { useState } from "react";
// import {
//   ArrowPathIcon,
//   PlusIcon,
//   ChevronRightIcon,
// } from "@heroicons/react/24/outline";

// // --------------------------
// // Header Component
// // --------------------------
// const Header: React.FC = () => (
//   <header className="bg-gray-50 text-gray-900 py-8 px-4 text-center border-b border-gray-200">
//     <h1 className="text-3xl font-bold">My Portfolio</h1>
//     <p className="mt-2 text-lg">
//       Review your assets and ensure your nominees are up-to-date for a secure
//       estate plan.
//     </p>
//   </header>
// );

// // --------------------------
// // Portfolio Summary Component
// // --------------------------
// interface PortfolioSummaryProps {
//   syncTime: string;
//   onSync: () => void;
//   onEstatePlanClick: () => void;
// }

// const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
//   syncTime,
//   onSync,
//   onEstatePlanClick,
// }) => (
//   <section className="bg-white rounded-lg shadow p-6 mb-8">
//     {/* Estate Planning Readiness */}
//     <div
//       className="cursor-pointer mb-6"
//       role="button"
//       tabIndex={0}
//       onClick={onEstatePlanClick}
//       onKeyPress={(e) => {
//         if (e.key === "Enter") onEstatePlanClick();
//       }}
//     >
//       <h3 className="text-xl font-semibold mb-2">Estate Planning Readiness</h3>
//       <div className="relative h-6 rounded-full bg-gray-200">
//         <div
//           className="absolute top-0 left-0 h-6 rounded-full bg-gray-600"
//           style={{ width: "70%" }}
//         ></div>
//         <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
//           70%
//         </span>
//       </div>
//     </div>

//     {/* Key Metrics */}
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
//       <div className="bg-gray-100 rounded-lg p-4 text-center">
//         <h4 className="text-sm font-medium text-gray-700">Accounts Linked</h4>
//         <p className="text-xl font-bold text-gray-900">3 Linked</p>
//       </div>
//       <div className="bg-gray-100 rounded-lg p-4 text-center">
//         <h4 className="text-sm font-medium text-gray-700">
//           Assets with Nominees
//         </h4>
//         <p className="text-xl font-bold text-gray-900">4 of 5</p>
//       </div>
//       <div className="bg-gray-100 rounded-lg p-4 text-center">
//         <h4 className="text-sm font-medium text-gray-700">
//           Assets without Nominees
//         </h4>
//         <p className="text-xl font-bold text-red-600">1 Missing</p>
//       </div>
//     </div>

//     {/* Sync Status */}
//     <div className="flex items-center justify-between text-sm text-gray-600">
//       <p>Last Sync: {syncTime}</p>
//       <button
//         onClick={onSync}
//         className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
//         aria-label="Sync your accounts"
//       >
//         <ArrowPathIcon className="h-5 w-5 mr-1" />
//         Sync Now
//       </button>
//     </div>
//   </section>
// );

// // --------------------------
// // Asset Category Summary Component
// // --------------------------
// interface AssetCategory {
//   id: number;
//   name: string;
//   complete: boolean;
//   total: number;
//   linked: number;
// }

// const assetCategories: AssetCategory[] = [
//   { id: 1, name: "Savings Accounts", complete: true, total: 2, linked: 2 },
//   { id: 2, name: "Demat Accounts", complete: false, total: 1, linked: 0 },
//   { id: 3, name: "Mutual Funds", complete: true, total: 3, linked: 3 },
// ];

// const AssetCategorySummary: React.FC = () => (
//   <section className="mb-8">
//     <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">
//       Asset Categories
//     </h2>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {assetCategories.map((cat) => (
//         <div
//           key={cat.id}
//           className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
//         >
//           <h3 className="text-xl font-semibold mb-2 text-gray-800">
//             {cat.name}
//           </h3>
//           <p className="mb-2 text-gray-700">
//             {cat.linked} of {cat.total} accounts have nominees{" "}
//             <span
//               className={
//                 cat.complete
//                   ? "text-green-600 font-bold"
//                   : "text-red-600 font-bold"
//               }
//             >
//               {cat.complete ? "Complete" : "Incomplete"}
//             </span>
//           </p>
//           <a
//             href="#"
//             className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium"
//           >
//             View &amp; Manage <ChevronRightIcon className="h-5 w-5 ml-1" />
//           </a>
//         </div>
//       ))}
//     </div>
//   </section>
// );

// // --------------------------
// // Assets Requiring Attention Component
// // --------------------------
// interface AssetItem {
//   id: number;
//   name: string;
//   maskedAccount: string;
//   institution: string;
//   nomineeAdded: boolean;
// }

// const assetItems: AssetItem[] = [
//   {
//     id: 1,
//     name: "Savings Account - HDFC Bank",
//     maskedAccount: "****1234",
//     institution: "HDFC Bank",
//     nomineeAdded: false,
//   },
//   {
//     id: 2,
//     name: "Demat Account - ICICI",
//     maskedAccount: "****5678",
//     institution: "ICICI Bank",
//     nomineeAdded: false,
//   },
// ];

// const AssetsRequiringAttention: React.FC = () => (
//   <section className="mb-8">
//     <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">
//       Assets Requiring Attention
//     </h2>
//     <div className="bg-white rounded-lg shadow divide-y">
//       {assetItems.map((item) => (
//         <div
//           key={item.id}
//           className="p-4 flex flex-col md:flex-row md:items-center md:justify-between"
//         >
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//             <p className="text-sm text-gray-600">
//               Account: {item.maskedAccount}
//             </p>
//             <p className="text-sm text-gray-600">
//               Institution: {item.institution}
//             </p>
//             {!item.nomineeAdded && (
//               <p className="text-sm font-bold text-red-600">No Nominee Added</p>
//             )}
//           </div>
//           <div className="mt-4 md:mt-0">
//             {!item.nomineeAdded && (
//               <button
//                 className="flex items-center bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 focus:outline-none"
//                 aria-label={`Add nominee for ${item.name}`}
//               >
//                 <PlusIcon className="h-5 w-5 mr-2" />
//                 Add Nominee
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//       <div className="p-4 text-right">
//         <a href="#" className="text-gray-600 font-medium hover:underline">
//           View All
//         </a>
//       </div>
//     </div>
//   </section>
// );

// // --------------------------
// // Link Accounts Button Component
// // --------------------------
// const LinkAccountsButton: React.FC = () => (
//   <section className="text-center">
//     <button
//       className="inline-flex items-center bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800 focus:outline-none"
//       aria-label="Link your accounts"
//     >
//       Link Accounts
//     </button>
//   </section>
// );

// // --------------------------
// // Main Portfolio Page Component
// // --------------------------
// const Portfolio: React.FC = () => {
//   const [syncTime, setSyncTime] = useState<string>(new Date().toLocaleString());

//   const handleSync = () => {
//     // Simulate sync action (replace with your actual sync logic)
//     alert("Syncing your accounts...");
//     setSyncTime(new Date().toLocaleString());
//   };

//   const handleEstatePlanClick = () => {
//     // Navigate to the Estate Plan page
//     window.location.href = "/estate-plan";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <PortfolioSummary
//           syncTime={syncTime}
//           onSync={handleSync}
//           onEstatePlanClick={handleEstatePlanClick}
//         />
//         <AssetCategorySummary />
//         <AssetsRequiringAttention />
//         <LinkAccountsButton />
//       </main>
//     </div>
//   );
// };

// export default Portfolio;

// import React, { FC, useState, useCallback, useMemo, useEffect } from "react";
// import {
//   BriefcaseIcon,
//   LinkIcon,
//   UserIcon,
//   ArrowPathIcon,
//   BuildingLibraryIcon,
//   ChartBarIcon,
//   HomeIcon,
//   CreditCardIcon,
//   GlobeAltIcon,
//   TruckIcon,
//   KeyIcon,
//   DocumentIcon,
//   ChevronRightIcon,
//   AdjustmentsHorizontalIcon,
// } from "@heroicons/react/24/outline";

// /* ----------------------------------- */
// /*       Custom Hook: useIsMobile      */
// /* ----------------------------------- */
// const useIsMobile = (breakpoint: number = 768): boolean => {
//   const [isMobile, setIsMobile] = useState<boolean>(
//     window.innerWidth < breakpoint
//   );
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < breakpoint);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [breakpoint]);
//   return isMobile;
// };

// /* ----------------------------------- */
// /*      Circular Progress Component    */
// /* ----------------------------------- */
// interface CircularProgressProps {
//   percentage: number;
// }

// const CircularProgress: FC<CircularProgressProps> = ({ percentage }) => {
//   const radius = 40;
//   const strokeWidth = 10;
//   const circumference = 2 * Math.PI * radius;
//   const dashOffset = useMemo(
//     () => circumference * (1 - percentage / 100),
//     [circumference, percentage]
//   );

//   return (
//     <div className="relative w-24 h-24">
//       <svg className="w-full h-full" viewBox="0 0 100 100">
//         {/* Background Circle */}
//         <circle
//           className="text-gray-200"
//           strokeWidth={strokeWidth}
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="50"
//           cy="50"
//         />
//         {/* Progress Circle */}
//         <circle
//           className="text-slate-600 transition-all duration-1000"
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="50"
//           cy="50"
//           style={{
//             strokeDasharray: circumference,
//             strokeDashoffset: dashOffset,
//             transform: "rotate(-90deg)",
//             transformOrigin: "center",
//           }}
//         />
//         <text
//           x="50"
//           y="50"
//           textAnchor="middle"
//           dy="7"
//           className="text-xl font-bold fill-gray-700"
//         >
//           {percentage}%
//         </text>
//       </svg>
//     </div>
//   );
// };

// /* ----------------------------------- */
// /*       Mobile Category Card          */
// /* ----------------------------------- */
// interface MobileCategoryCardProps {
//   icon: FC<React.SVGProps<SVGSVGElement>>;
//   name: string;
//   assets: number;
//   nominees: number;
//   onClick: () => void;
// }

// const MobileCategoryCard: FC<MobileCategoryCardProps> = React.memo(
//   ({ icon: Icon, name, assets, nominees, onClick }) => (
//     <div
//       onClick={onClick}
//       className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
//     >
//       <div className="flex items-center space-x-3">
//         <div className="bg-gray-100 p-2 rounded-lg">
//           <Icon className="h-6 w-6 text-gray-700" />
//         </div>
//         <div>
//           <h3 className="font-medium text-gray-900">{name}</h3>
//           <p className="text-sm text-gray-500">
//             {assets} Assets • {nominees} Nominees
//           </p>
//         </div>
//       </div>
//       <ChevronRightIcon className="h-5 w-5 text-gray-400" />
//     </div>
//   )
// );

// /* ----------------------------------- */
// /*        Desktop Category Grid        */
// /* ----------------------------------- */
// interface Category {
//   icon: FC<React.SVGProps<SVGSVGElement>>;
//   name: string;
//   assets: number;
//   nominees: number;
// }

// interface CategoryGridProps {
//   categories: Category[];
// }

// const CategoryGrid: FC<CategoryGridProps> = React.memo(({ categories }) => (
//   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//     {categories.map((category, idx) => (
//       <div
//         key={idx}
//         className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
//       >
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-slate-50 transition-colors">
//             <category.icon className="h-6 w-6 text-gray-700 group-hover:text-slate-600" />
//           </div>
//           <h3 className="font-medium text-gray-900">{category.name}</h3>
//         </div>
//         <div className="space-y-2">
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-500">Total Assets</span>
//             <span className="font-medium text-gray-900">{category.assets}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-500">Nominees Added</span>
//             <span className="font-medium text-gray-900">
//               {category.nominees}
//             </span>
//           </div>
//           <div className="relative h-2 bg-gray-100 rounded-full mt-3">
//             <div
//               className="absolute top-0 left-0 h-full bg-slate-600 rounded-full transition-all duration-500"
//               style={{
//                 width: `${(category.nominees / category.assets) * 100}%`,
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// ));

// /* ----------------------------------- */
// /*              Portfolio              */
// /* ----------------------------------- */
// const Portfolio: FC = () => {
//   const isMobileView = useIsMobile();

//   // Sample data for categories and assets
//   const categories: Category[] = [
//     {
//       icon: BuildingLibraryIcon,
//       name: "Bank Accounts",
//       assets: 4,
//       nominees: 3,
//     },
//     { icon: ChartBarIcon, name: "Investments", assets: 6, nominees: 5 },
//     { icon: HomeIcon, name: "Property", assets: 2, nominees: 1 },
//     { icon: CreditCardIcon, name: "Credit Cards", assets: 3, nominees: 2 },
//     { icon: GlobeAltIcon, name: "Foreign Assets", assets: 2, nominees: 0 },
//     { icon: TruckIcon, name: "Vehicles", assets: 1, nominees: 1 },
//     { icon: KeyIcon, name: "Lockers", assets: 2, nominees: 2 },
//     { icon: DocumentIcon, name: "Documents", assets: 5, nominees: 4 },
//   ];

//   const assets = [
//     {
//       name: "HDFC Savings Account",
//       type: "Bank Account",
//       value: "₹2,50,000",
//       status: "No Nominee",
//     },
//     {
//       name: "Mutual Fund Portfolio",
//       type: "Investment",
//       value: "₹5,00,000",
//       status: "No Nominee",
//     },
//   ];

//   const handleCategoryClick = useCallback((name: string) => {
//     console.log(`Clicked ${name}`);
//     // Implement navigation or filtering based on category here
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
//       {/* Header Section */}
//       <header className="mb-8">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//               <BriefcaseIcon className="h-6 w-6" />
//               My Portfolio
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Review your assets and manage your nominees to secure your estate
//               plan.
//             </p>
//           </div>
//           <div className="flex gap-3 w-full sm:w-auto">
//             <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
//               <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
//               Filter
//             </button>
//             <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
//               <LinkIcon className="h-4 w-4 mr-2" />
//               Link Accounts
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Summary Cards */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {/* Estate Planning Readiness */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h3 className="text-sm text-gray-600 mb-4">
//             Estate Planning Readiness
//           </h3>
//           <div className="flex items-center justify-between">
//             <CircularProgress percentage={75} />
//             <div className="text-right">
//               <p className="text-sm text-gray-500">Overall Progress</p>
//               <p className="text-lg font-medium text-gray-900">Good</p>
//             </div>
//           </div>
//         </div>

//         {/* Linked Accounts */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//             <LinkIcon className="h-4 w-4" />
//             Linked Accounts
//           </div>
//           <div className="flex items-baseline gap-2">
//             <span className="text-3xl font-semibold text-gray-900">12</span>
//             <span className="text-sm text-green-600">+2 this month</span>
//           </div>
//         </div>

//         {/* Assets Without Nominees */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//             <UserIcon className="h-4 w-4" />
//             Assets Without Nominees
//           </div>
//           <div className="flex items-baseline gap-2">
//             <span className="text-3xl font-semibold text-gray-900">3</span>
//             <span className="text-sm text-red-600">Action needed</span>
//           </div>
//         </div>

//         {/* Last Synced */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <ArrowPathIcon className="h-4 w-4" />
//               Last Synced
//             </div>
//             <button className="text-sm text-slate-600 hover:text-slate-700 font-medium">
//               Sync Now
//             </button>
//           </div>
//           <span className="text-gray-900">2 hours ago</span>
//         </div>
//       </section>

//       {/* Asset Categories */}
//       <section className="mb-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Asset Categories
//           </h2>
//           <button className="text-sm text-slate-600 hover:text-slate-700 font-medium">
//             View All
//           </button>
//         </div>
//         {isMobileView ? (
//           <div className="space-y-3">
//             {categories.map((category, idx) => (
//               <MobileCategoryCard
//                 key={idx}
//                 icon={category.icon}
//                 name={category.name}
//                 assets={category.assets}
//                 nominees={category.nominees}
//                 onClick={() => handleCategoryClick(category.name)}
//               />
//             ))}
//           </div>
//         ) : (
//           <CategoryGrid categories={categories} />
//         )}
//       </section>

//       {/* Assets Requiring Attention */}
//       <section>
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">
//           Assets Requiring Attention
//         </h2>
//         <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                   Asset Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                   Value
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {assets.map((asset, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {asset.name}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {asset.type}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {asset.value}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                       {asset.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
//                       Add Nominee
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* Last Updated */}
//       <footer className="mt-8 text-sm text-gray-500 text-right">
//         Last updated: January 15, 2025
//       </footer>
//     </div>
//   );
// };

// export default Portfolio;
import React, { useCallback, useMemo } from "react";
import {
  BriefcaseIcon,
  UserIcon,
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  DocumentIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useNominee } from "../../hooks/useNomine";
import { Link } from "react-router-dom";

export interface Nominee {
  id: string;
  fullName: string;
  relationship: string;
  relationshipOther?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  identificationType?: string;
  identificationNumber?: string;
  lastUpdated?: string;
}

// Enhanced Status Badge Component
const StatusBadge: React.FC<{ status: string; count: number }> = ({
  status,
  count,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case "complete":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          icon: <ShieldCheckIcon className="h-5 w-5 text-green-500" />,
        };
      case "partial":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          icon: <DocumentIcon className="h-5 w-5 text-yellow-500" />,
        };
      default:
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />,
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className={`${styles.bg} p-6 rounded-lg`}>
        <div className="flex items-center gap-2 mb-2">
          {styles.icon}
          <h3 className={`text-sm font-medium ${styles.text}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </h3>
        </div>
        <div className="flex items-baseline">
          <span className={`text-2xl font-semibold ${styles.text}`}>
            {count}
          </span>
          <span className="ml-2 text-sm text-gray-600">nominees</span>
        </div>
      </div>
    </div>
  );
};

// Enhanced Verification Checklist
const VerificationChecklist: React.FC<{ nominee: Nominee }> = ({ nominee }) => {
  const checklistItems = useMemo(
    () => [
      {
        key: "identificationType",
        label: "ID Verification",
        icon: IdentificationIcon,
      },
      { key: "address", label: "Address Verification", icon: MapPinIcon },
      { key: "email", label: "Email Verification", icon: EnvelopeIcon },
      { key: "phoneNumber", label: "Phone Verification", icon: PhoneIcon },
    ],
    []
  );

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        Verification Status
      </h4>
      <div className="space-y-3">
        {checklistItems.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex justify-between items-center group">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              <span className="text-sm text-gray-600">{label}</span>
            </div>
            {nominee[key as keyof Nominee] ? (
              <ShieldCheckIcon className="h-5 w-5 text-green-500" />
            ) : (
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Legal Actions
const LegalActions: React.FC<{ nominee: Nominee }> = ({ nominee }) => (
  <div className="mt-4 pt-4 border-t border-gray-100">
    <h4 className="text-sm font-medium text-gray-900 mb-3">Legal Actions</h4>
    <div className="flex flex-wrap gap-2">
      <button className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
        <IdentificationIcon className="h-4 w-4 mr-2" />
        Verify ID
      </button>
      <button className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
        <MapPinIcon className="h-4 w-4 mr-2" />
        Verify Address
      </button>
      <button className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
        <DocumentIcon className="h-4 w-4 mr-2" />
        Generate Report
      </button>
    </div>
  </div>
);

// Dropdown Menu Component
const DropdownMenu: React.FC<{
  children: React.ReactNode;
  items: {
    label: string;
    icon: React.ComponentType;
    onClick: () => void;
    className?: string;
  }[];
}> = ({ children, items }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        {children}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center ${
                  item.className || "text-gray-700"
                }`}
              >
                <span className="h-4 w-4 mr-2" aria-hidden="true">
                  <Icon />
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Enhanced Nominee Card
const NomineeCard: React.FC<{
  nominee: Nominee;
  onEdit: (nominee: Nominee) => void;
  onDelete: (id: string) => void;
}> = ({ nominee, onEdit, onDelete }) => {
  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {nominee.avatarUrl ? (
              <img
                src={nominee.avatarUrl}
                alt={nominee.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <h3 className="font-medium text-gray-900">{nominee.fullName}</h3>
              <p className="text-sm text-gray-500">
                {nominee.relationshipOther || nominee.relationship}
              </p>
            </div>
          </div>

          <DropdownMenu
            items={[
              {
                label: "Edit",
                icon: PencilIcon,
                onClick: () => onEdit(nominee),
              },
              {
                label: "Delete",
                icon: TrashIcon,
                onClick: () => onDelete(nominee.id),
                className: "text-red-600 hover:bg-red-50",
              },
            ]}
          >
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </DropdownMenu>
        </div>

        <div className="space-y-4 text-sm">
          {nominee.dateOfBirth && (
            <div className="text-gray-500">
              Born: {formatDate(nominee.dateOfBirth)}
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <PhoneIcon className="h-4 w-4" />
              {nominee.phoneNumber}
            </div>

            {nominee.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <EnvelopeIcon className="h-4 w-4" />
                {nominee.email}
              </div>
            )}

            {nominee.address && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPinIcon className="h-4 w-4" />
                {nominee.address}
              </div>
            )}
          </div>

          {(nominee.identificationType || nominee.identificationNumber) && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <IdentificationIcon className="h-4 w-4" />
                <span>
                  {nominee.identificationType}: {nominee.identificationNumber}
                </span>
              </div>
            </div>
          )}

          <VerificationChecklist nominee={nominee} />
          <LegalActions nominee={nominee} />
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton
const NomineeCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-10 w-10 rounded-full bg-gray-200" />
      <div>
        <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
    </div>
  </div>
);

// Stats Card Component
const StatsCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  action?: string;
}> = ({ title, value, subtitle, icon: Icon, action }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      {action && (
        <button className="text-sm text-slate-600 hover:text-slate-700 font-medium">
          {action}
        </button>
      )}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-semibold text-gray-900">{value}</span>
      {subtitle && <span className="text-sm text-gray-600">{subtitle}</span>}
    </div>
  </div>
);

// Main Portfolio Component
const Portfolio: React.FC = () => {
  const {
    state: { nominees, isLoading, error },
    deleteNominee,
  } = useNominee();

  const handleEditNominee = useCallback((nominee: Nominee) => {
    console.log("Edit nominee:", nominee);
  }, []);

  const handleDeleteNominee = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this nominee?")) {
        try {
          await deleteNominee(id);
        } catch (error) {
          console.error("Failed to delete nominee:", error);
        }
      }
    },
    [deleteNominee]
  );

  const stats = useMemo(() => {
    return nominees.reduce((acc, nominee) => {
      const checks = {
        hasId: !!nominee.identificationNumber,
        hasContact: !!nominee.phoneNumber,
        hasEmail: !!nominee.email,
        hasAddress: !!nominee.address,
      };

      const status = Object.values(checks).every(Boolean)
        ? "complete"
        : Object.values(checks).some(Boolean)
        ? "partial"
        : "incomplete";

      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [nominees]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-700">
          <ExclamationTriangleIcon className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <BriefcaseIcon className="h-7 w-7" />
              Nominee Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your nominees and their verification status
            </p>
          </div>
          <Link
            to={"/nominees"}
            className="inline-flex items-center px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
          >
            <UserIcon className="h-4 w-4 mr-2" />
            Add Nominee
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatusBadge status="complete" count={stats.complete || 0} />
        <StatusBadge status="partial" count={stats.partial || 0} />
        <StatusBadge status="incomplete" count={stats.incomplete || 0} />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Nominees"
          value={nominees.length}
          subtitle="Registered nominees"
          icon={UserIcon}
        />
        <StatsCard
          title="Email Verified"
          value={nominees.filter((n) => n.email).length}
          subtitle="With valid email"
          icon={EnvelopeIcon}
        />
        <StatsCard
          title="ID Verified"
          value={nominees.filter((n) => n.identificationNumber).length}
          subtitle="With valid ID"
          icon={IdentificationIcon}
        />
        <StatsCard
          title="Last Updated"
          value="2 hours ago"
          icon={ArrowPathIcon}
          action="Sync Now"
        />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Registered Nominees
          </h2>
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
              <DocumentIcon className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <NomineeCardSkeleton />
              <NomineeCardSkeleton />
              <NomineeCardSkeleton />
            </>
          ) : nominees.length > 0 ? (
            nominees.map((nominee) => (
              <NomineeCard
                key={nominee.id}
                nominee={nominee}
                onEdit={handleEditNominee}
                onDelete={handleDeleteNominee}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-lg shadow-sm p-12">
                <div className="text-center">
                  <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">
                    No nominees
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by adding your first nominee
                  </p>
                  <div className="mt-6">
                    <Link
                      to={"/nominees"}
                      className="inline-flex items-center px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      Add Nominee
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <ArrowPathIcon className="h-4 w-4" />
            <span>Last synced: January 15, 2025, 14:30</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            All systems operational
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
