import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { SidebarProps } from "../../types/layout";
import { LayoutContext } from "../../contexts/LayoutContext";
import { adminItems, navigationItems } from "../../lib/sidebar-data";

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleSidebar } = useContext(LayoutContext);

  return (
    <aside
      className={`fixed h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
                transform transition-transform duration-150 ease-in-out ${
                  collapsed ? "w-20" : "w-64"
                } relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-12 bg-white border border-gray-200 rounded-full p-1.5 
                 shadow-sm hover:bg-gray-50 group z-50"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRightIcon className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
        ) : (
          <ChevronLeftIcon className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
        )}
      </button>

      <nav className="p-4 space-y-1">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium 
                       transition-colors duration-150 ease-in-out ${
                         location.pathname === item.path
                           ? "bg-blue-50 text-slate-950"
                           : "text-gray-700 hover:bg-gray-50"
                       }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3 transition-opacity duration-150">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200">
          {!collapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Administration
            </h3>
          )}
          <div className="mt-2 space-y-1">
            {adminItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium 
                         transition-colors duration-150 ease-in-out ${
                           location.pathname === item.path
                             ? "bg-blue-50 text-slate-900"
                             : "text-gray-700 hover:bg-gray-50"
                         }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 transition-opacity duration-150">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
