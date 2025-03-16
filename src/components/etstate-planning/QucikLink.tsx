// src/components/EstatePlanning/QuickLinksSection.tsx
import React from "react";
import { QuickLinkCard } from "./QuickLinkCard";
import {
  DocumentTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export const QuickLinksSection: React.FC = () => {
  return (
    <div className="relative my-10">
      {/* Optional decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 rounded-full opacity-70 blur-3xl"></div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-slate-100 bg-[size:40px_40px] opacity-5"></div>

      {/* Main content */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <QuickLinkCard
            title="Create Your Will"
            description="Draft a legally valid will that distributes your assets according to your wishes"
            icon={DocumentTextIcon}
            cta="Start Now"
            color="blue"
            onClick={() => console.log("Navigate to Will Creation")}
          />

          <QuickLinkCard
            title="Designate Nominees"
            description="Ensure your assets are transferred to the right people by designating nominees"
            icon={UserGroupIcon}
            cta="Add Nominees"
            color="green"
            onClick={() => console.log("Navigate to Nominee Designation")}
          />

          <QuickLinkCard
            title="Legal Consultation"
            description="Schedule a session with our legal experts specialized in Indian succession laws"
            icon={ShieldCheckIcon}
            cta="Book Session"
            color="purple"
            onClick={() => console.log("Navigate to Legal Consultation")}
          />
        </div>
      </div>
    </div>
  );
};
