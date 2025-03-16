// src/components/EstatePlanning/QuickLinkCard.tsx
import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Color } from "../../types/estate-palnning";

interface QuickLinkCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  cta: string;
  color: Color;
  onClick: () => void;
}

export const QuickLinkCard: React.FC<QuickLinkCardProps> = ({
  title,
  description,
  icon: Icon,
  cta,
  color,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Modern gradient-based color mapping
  const colorMap: Record<
    Color,
    {
      gradient: string;
      iconBg: string;
      text: string;
      border: string;
      shadow: string;
    }
  > = {
    blue: {
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      iconBg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
      shadow: "shadow-blue-100",
    },
    green: {
      gradient: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
      shadow: "shadow-emerald-100",
    },
    purple: {
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
      iconBg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-100",
      shadow: "shadow-indigo-100",
    },
    red: {
      gradient: "bg-gradient-to-r from-rose-500 to-rose-600",
      iconBg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
      shadow: "shadow-rose-100",
    },
    orange: {
      gradient: "bg-gradient-to-r from-amber-500 to-orange-600",
      iconBg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
      shadow: "shadow-amber-100",
    },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`group relative bg-white rounded-xl ${
        isHovered ? "shadow-lg" : "shadow-md"
      } transition-all duration-300 overflow-hidden border border-gray-100`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated top border indicator */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          colors.gradient
        } transform ${
          isHovered ? "scale-x-100" : "scale-x-0"
        } transition-transform origin-left duration-300 ease-out`}
      ></div>

      <div className="p-6">
        <div className="flex items-start">
          <div
            className={`flex-shrink-0 p-3 rounded-lg ${colors.iconBg} ${colors.border}`}
          >
            <Icon
              className={`h-7 w-7 ${
                colors.text
              } transition-transform duration-300 ${
                isHovered ? "scale-110" : ""
              }`}
            />
          </div>
          <div className="ml-5">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors duration-300">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100">
          <button
            onClick={onClick}
            className={`w-full inline-flex justify-center items-center px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all duration-300 ${
              isHovered ? "translate-y-0 shadow-md" : "translate-y-0"
            } ${
              colors.gradient
            } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-${color}-500`}
          >
            <span>{cta}</span>
            <ChevronRightIcon
              className={`ml-1.5 h-4 w-4 transition-transform duration-300 ${
                isHovered ? "translate-x-0.5" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
