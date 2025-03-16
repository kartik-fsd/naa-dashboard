// src/components/EstatePlanning/TabNavigation.tsx
import React from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onChange,
}) => {
  return (
    <div className="px-4 sm:px-0">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm 
                transition-colors duration-200 ease-in-out
                ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
