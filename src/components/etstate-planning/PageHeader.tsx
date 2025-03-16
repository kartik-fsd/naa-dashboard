// src/components/ui/PageHeader.tsx
import React from "react";
import {
  DocumentTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

type IconType = "document" | "user" | "shield" | "chart" | "clipboard";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionIcon?: IconType;
  onActionClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  actionIcon,
  onActionClick,
}) => {
  const getIcon = () => {
    switch (actionIcon) {
      case "document":
        return <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-600" />;
      case "user":
        return <UserGroupIcon className="w-5 h-5 mr-2 text-gray-600" />;
      case "shield":
        return <ShieldCheckIcon className="w-5 h-5 mr-2 text-gray-600" />;
      case "chart":
        return <ChartBarIcon className="w-5 h-5 mr-2 text-gray-600" />;
      case "clipboard":
        return <ClipboardDocumentIcon className="w-5 h-5 mr-2 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
            {title}
          </h1>
          {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
        </div>
        {actionLabel && (
          <button
            onClick={onActionClick}
            className="flex items-center px-5 py-2.5 bg-white text-slate-900 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
          >
            {actionIcon && getIcon()}
            <span className="font-medium">{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};
