// src/components/ui/Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hasShadow?: boolean;
  hasBorder?: boolean;
  hasPadding?: boolean;
  isHoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hasShadow = true,
  hasBorder = true,
  hasPadding = false,
  isHoverable = false,
}) => {
  const baseClasses = "bg-white rounded-lg";
  const shadowClasses = hasShadow ? "shadow-sm" : "";
  const borderClasses = hasBorder ? "border border-gray-200" : "";
  const paddingClasses = hasPadding ? "p-6" : "";
  const hoverClasses = isHoverable
    ? "hover:shadow-md transition-all duration-200"
    : "";

  return (
    <div
      className={`${baseClasses} ${shadowClasses} ${borderClasses} ${paddingClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
};
