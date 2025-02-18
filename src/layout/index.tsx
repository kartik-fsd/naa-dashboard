import React, { useContext, Suspense, useState } from "react";
import { LayoutContext } from "../contexts/LayoutContext";
import { LayoutProvider } from "../contexts/LayoutProvider";
//import MobileSidebar from "../components/layout/MobileSidebar";
import { MainContent } from "../contexts/MainContext";
import MobileNavigation from "../components/layout/MobileBottomNav";
import { useScrollRestoration } from "../hooks/useScrollRestoration";

// Lazy load components
const Header = React.lazy(() => import("../components/layout/header"));
const Sidebar = React.lazy(() => import("../components/layout/sidebar"));
const Breadcrumb = React.lazy(() => import("../components/layout/breadcrumb"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const LayoutContent: React.FC<{ children: React.ReactNode }> = () => {
  const { sidebarOpen, isMobile } = useContext(LayoutContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollContainerRef = useScrollRestoration();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[64px_1fr] h-screen bg-gray-100">
      {/* Header spans full width */}
      <div className="col-span-2 row-start-1">
        <Suspense fallback={<LoadingFallback />}>
          <Header onOpenMenu={handleMobileMenuToggle} />
        </Suspense>
      </div>

      {/* Sidebar and Main Content */}
      <div className="col-span-2 lg:col-span-1 row-start-2">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Suspense fallback={<LoadingFallback />}>
            <Sidebar collapsed={sidebarOpen} />
          </Suspense>
        )}
      </div>

      {/* Main Content Area */}
      <div
        ref={scrollContainerRef}
        className="col-start-1 lg:col-start-2 col-span-2 lg:col-span-1 row-start-2 
                    overflow-auto pb-16 lg:pb-0"
      >
        {/* Added padding for mobile nav */}
        <Suspense fallback={<LoadingFallback />}>
          <Breadcrumb />
        </Suspense>
        <MainContent />
        {/* Mobile Navigation */}
        {isMobile && (
          <Suspense fallback={null}>
            <MobileNavigation />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LayoutProvider>
      <LayoutContent>{children}</LayoutContent>
    </LayoutProvider>
  );
};

export default Layout;
