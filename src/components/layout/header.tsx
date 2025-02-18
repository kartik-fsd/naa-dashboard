import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { HeaderProps, User } from "../../types/layout";
import { useAuth } from "../../hooks/useAuth";

const mockUser: User = {
  name: "Admin User",
  email: "admin@fincare.com",
  role: "Administrator",
};

const Header: React.FC<HeaderProps> = () => {
  const { logout, user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <ArrowTrendingUpIcon className="mx-2 h-6 w-6 text-blue-600" />

          <span className="text-lg font-semibold text-gray-900 transition-opacity duration-150">
            FinCare
          </span>

          <div className="ml-8 hidden lg:block">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Global Search (Ctrl+/)"
                className="w-96 pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg 
                       text-sm focus:outline-none focus:border-blue-500 focus:ring-1 
                       focus:ring-blue-500 transition-all duration-150"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
              <FunnelIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
          </div>

          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg relative transition-colors duration-150">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.name || "User"
                }&background=0D8ABC&color=fff`}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="hidden md:block text-sm text-left">
                <p className="font-medium text-gray-700">{mockUser.name}</p>
                <p className="text-gray-500 text-xs">{mockUser.role}</p>
              </div>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </button>

            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border 
                           border-gray-200 py-1 transition-transform duration-150 origin-top-right"
              >
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900">
                    {mockUser.email}
                  </p>
                </div>
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                    Profile Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                    Team Management
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                    Billing
                  </button>
                </div>
                <div className="border-t border-gray-200 py-1">
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 transition-colors duration-150"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
