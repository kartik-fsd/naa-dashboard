// src/components/EstatePlanning/ProgressTracker.tsx
import React from "react";
import { Card } from "../ui/Card";
import { ProgressItem } from "./ProgressItem";
import type { PlanningProgressItem } from "../../types/estate-palnning";

interface ProgressTrackerProps {
  progress: PlanningProgressItem[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
}) => {
  // Calculate overall progress percentage
  const calculateOverallProgress = () => {
    const total = progress.length;
    const completed = progress.filter(
      (item) => item.status === "complete"
    ).length;
    const inProgress = progress.filter((item) => item.status === "inprogress");

    const completedPercentage = (completed / total) * 100;
    const inProgressPercentage =
      inProgress.reduce(
        (acc, item) => acc + (item.progress || 0) / 100 / total,
        0
      ) * 100;

    return Math.round(completedPercentage + inProgressPercentage);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Estate Planning Progress
          </h2>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium text-blue-600">
              {calculateOverallProgress()}% Complete
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${calculateOverallProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {progress.map((item, index) => (
            <ProgressItem
              key={index}
              title={item.title}
              status={item.status}
              description={item.description}
              progress={item.progress}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
