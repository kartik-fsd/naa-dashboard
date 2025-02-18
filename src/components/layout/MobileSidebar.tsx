import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  HomeIcon,
  BriefcaseIcon,
  CreditCardIcon,
  UserPlusIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { NavigationItem } from "../../types/layout";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems: NavigationItem[] = [
  { path: "/dashboard", icon: HomeIcon, label: "Dashboard" },
  { path: "/portfolio", icon: BriefcaseIcon, label: "Portfolio" },
  { path: "/transactions", icon: CreditCardIcon, label: "Transactions" },
  { path: "/users", icon: UserPlusIcon, label: "User Management" },
  { path: "/settings", icon: Cog6ToothIcon, label: "Settings" },
  { path: "/reports", icon: ChartBarIcon, label: "Reports" },
];

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 flex max-w-xs w-full">
        <div className="relative flex-1 flex flex-col w-full max-w-xs bg-white">
          {/* Close button */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-8 w-8 text-slate-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                FinCare
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 h-0 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-md 
                           transition-colors duration-150 ${
                             location.pathname === item.path
                               ? "bg-slate-50 text-slate-700"
                               : "text-gray-700 hover:bg-gray-50"
                           }`}
                >
                  <item.icon className="h-6 w-6 mr-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
