// src/pages/EstatePlanning/index.tsx
import React, { useState, Suspense } from "react";
import { useEstatePlanning } from "../../hooks/useEstatePlanning";
import { LoadingSpinner } from "../../components/ui/loadingSpinner";
import OverviewPage from "./OverView";
import AssetManagementPage from "../asset-management";
import FAQPage from "./FAQ";
import { PageHeader } from "../../components/etstate-planning/PageHeader";
import { QuickLinksSection } from "../../components/etstate-planning/QucikLink";
import { TabNavigation } from "../../components/etstate-planning/TabNavigation";
import { ProgressTracker } from "../../components/etstate-planning/ProgressTracker";
import LegalFramework from "./LegalFrameWork";
import NomineeDesignation from "./NomineeDesignation";
import WillCreation from "./WillCreation";

// Tab configuration
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "will", label: "Will Creation" },
  { id: "assets", label: "Asset Management" },
  { id: "nominees", label: "Nominee Designation" },
  { id: "laws", label: "Legal Framework" },
  { id: "faq", label: "FAQs" },
];

const EstatePlanningPage: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("overview");

  // Get estate planning data and state from custom hook
  const { planningProgress, isLoading } = useEstatePlanning();

  // Render tab content based on active tab
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="py-12 flex justify-center">
          <LoadingSpinner size="large" />
        </div>
      );
    }

    return (
      <Suspense
        fallback={
          <div className="py-12 flex justify-center">
            <LoadingSpinner size="medium" />
          </div>
        }
      >
        <div className="p-6">
          {activeTab === "overview" && <OverviewPage />}
          {activeTab === "will" && <WillCreation />}
          {activeTab === "assets" && <AssetManagementPage />}
          {activeTab === "nominees" && <NomineeDesignation />}
          {activeTab === "laws" && <LegalFramework />}
          {activeTab === "faq" && <FAQPage />}
        </div>
      </Suspense>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader
          title="Estate Planning & Management"
          subtitle="Secure your legacy with proper estate planning under Indian laws"
          actionLabel="Start Will Creation"
          actionIcon="document"
          onActionClick={() => setActiveTab("will")}
        />

        {/* Quick Link Cards */}
        <QuickLinksSection />

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          {/* Tab Navigation */}
          <TabNavigation
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Tab Content */}
          {renderTabContent()}
        </div>

        {/* Progress Tracker */}
        <ProgressTracker progress={planningProgress} />
      </div>
    </div>
  );
};

export default EstatePlanningPage;
