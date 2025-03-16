// src/components/EstatePlanning/InfoAlert.tsx
import React from "react";
import {
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  BookOpenIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

type AlertType = "info" | "warning" | "note" | "cta" | "legal";

interface InfoAlertProps {
  type: AlertType;
  title: string;
  children: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const InfoAlert: React.FC<InfoAlertProps> = ({
  type,
  title,
  children,
  actionText,
  onAction,
}) => {
  const getAlertStyles = () => {
    switch (type) {
      case "info":
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-100",
          textColor: "text-blue-800",
          bodyTextColor: "text-blue-700",
          icon: <InformationCircleIcon className="h-5 w-5 text-blue-600" />,
        };
      case "warning":
        return {
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-100",
          textColor: "text-yellow-800",
          bodyTextColor: "text-yellow-700",
          icon: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />,
        };
      case "note":
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-800",
          bodyTextColor: "text-gray-700",
          icon: <QuestionMarkCircleIcon className="h-5 w-5 text-gray-600" />,
        };
      case "cta":
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-100",
          textColor: "text-blue-800",
          bodyTextColor: "text-blue-700",
          icon: <DocumentTextIcon className="h-5 w-5 text-blue-600" />,
        };
      case "legal":
        return {
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-100",
          textColor: "text-yellow-800",
          bodyTextColor: "text-yellow-700",
          icon: <BookOpenIcon className="h-5 w-5 text-yellow-600" />,
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div
      className={`${styles.bgColor} border ${styles.borderColor} rounded-lg p-4`}
    >
      <div className="flex">
        <div className="flex-shrink-0">{styles.icon}</div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${styles.textColor}`}>{title}</h3>
          <div className={`mt-2 text-sm ${styles.bodyTextColor}`}>
            {children}
          </div>

          {actionText && onAction && (
            <div className="mt-3">
              <button
                type="button"
                onClick={onAction}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {actionText}
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
