// src/components/ui/Button.tsx
import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isFullWidth = false,
  isLoading = false,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  // Maps for styling based on variant and size
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white border-transparent focus:ring-blue-500",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300 focus:ring-gray-500",
    outline:
      "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 focus:ring-gray-500",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent focus:ring-gray-500",
    danger:
      "bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const widthStyle = isFullWidth ? "w-full" : "";
  const loadingStyle = isLoading ? "opacity-80 cursor-not-allowed" : "";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  const baseStyles =
    "inline-flex items-center justify-center font-medium border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  // Combine all styles
  const buttonClasses = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${widthStyle} 
    ${loadingStyle} 
    ${disabledStyle}
    ${className}
  `;

  // Loading spinner
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!isLoading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};
