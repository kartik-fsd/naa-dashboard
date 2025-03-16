// src/components/EstatePlanning/ProgressItem.tsx
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import type { PlanningStatus } from "../../types/estate-palnning";

interface ProgressItemProps {
  title: string;
  status: PlanningStatus;
  description: string;
  progress?: number;
}

export const ProgressItem: React.FC<ProgressItemProps> = ({
  title,
  status,
  description,
  progress,
}) => {
  const getStatusContent = () => {
    switch (status) {
      case "complete":
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
          </div>
        );
      case "inprogress":
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-600"></div>
          </div>
        );
      case "incomplete":
        return (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-gray-400"></div>
          </div>
        );
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "complete":
        return "Completed";
      case "inprogress":
        return `${progress}% Complete`;
      case "incomplete":
        return "Not Started";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "complete":
        return "text-green-600";
      case "inprogress":
        return "text-yellow-600";
      case "incomplete":
        return "text-gray-500";
    }
  };

  return (
    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0 mt-1">{getStatusContent()}</div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <span className={`text-xs font-medium ${getStatusColor()}`}>
            {getStatusLabel()}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        {status === "inprogress" && progress !== undefined && (
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};
