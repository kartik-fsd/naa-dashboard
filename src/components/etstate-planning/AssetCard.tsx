// src/components/EstatePlanning/AssetCard.tsx
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface AssetCardProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  items: string[];
  bgColor: string;
  iconColor: string;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  title,
  icon: Icon,
  description,
  items,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className={`p-4 ${bgColor} border-b border-gray-200`}>
        <div className="flex items-center">
          <Icon className={`h-6 w-6 ${iconColor} mr-2`} />
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      <div className="p-4">
        <ul className="space-y-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
