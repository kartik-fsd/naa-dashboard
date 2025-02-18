import React, { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { LayoutContext } from "../../contexts/LayoutContext";
import { adminItems, navigationItems } from "../../lib/sidebar-data";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useContext(LayoutContext);

  // Combine all navigation items
  const allNavItems = useMemo(() => [...navigationItems, ...adminItems], []);

  const crumbs = useMemo(() => {
    // Don't show breadcrumbs for auth pages
    if (location.pathname.startsWith("/auth")) return [];

    // Split the current path into segments
    const pathSegments = location.pathname.split("/").filter(Boolean);

    // Build up the breadcrumb trail
    const items = [];
    let currentPath = "";

    // Always add dashboard as home if we're in a protected route
    if (pathSegments.length > 0 && pathSegments[0] !== "auth") {
      const dashboardItem = allNavItems.find(
        (item) => item.path === "/dashboard"
      );
      if (dashboardItem) {
        items.push({
          label: dashboardItem.label,
          path: dashboardItem.path,
        });
      }
    }

    // Add remaining path segments
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const navItem = allNavItems.find((item) => item.path === currentPath);
      if (navItem) {
        items.push({
          label: navItem.label,
          path: navItem.path,
        });
      }
    });

    return items;
  }, [location.pathname, allNavItems]);

  // For mobile view
  if (isMobile) {
    if (crumbs.length === 0) return null;

    const currentPage = crumbs[crumbs.length - 1];
    return (
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-900">
          {currentPage.label}
        </h1>
      </div>
    );
  }

  if (crumbs.length === 0) return null;

  return (
    <nav
      className="bg-white border-b border-gray-200 px-4 py-3"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 text-sm">
        {crumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon
                className="h-4 w-4 mx-2 text-gray-400 flex-shrink-0"
                aria-hidden="true"
              />
            )}
            <button
              onClick={() => navigate(crumb.path)}
              className={`flex items-center hover:text-blue-600 transition-colors duration-150 
                       ${
                         index === crumbs.length - 1
                           ? "font-medium text-gray-700"
                           : "text-gray-500"
                       }`}
            >
              {index === 0 && (
                <HomeIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              )}
              <span className="truncate">{crumb.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
