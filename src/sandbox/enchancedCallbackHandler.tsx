import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

import { AssetLinkingProgress } from "../components/link-assets/AssetLinkingProgress";
import { AssetCategory } from "../types/assets";
import { AssetLinkingSuccess } from "../components/link-assets/Accet-success";

interface LocationState {
  assetType?: AssetCategory;
  assetTitle?: string;
  provider?: string;
  returnUrl?: string;
}

export const EnhancedCallbackHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Get state passed from the previous route
  const state = location.state as LocationState | null;

  // Extract params from URL or state
  const assetType = (state?.assetType ||
    searchParams.get("type") ||
    "others") as AssetCategory;
  const assetTitle =
    state?.assetTitle || searchParams.get("assetTitle") || "Account";
  const provider =
    state?.provider || searchParams.get("provider") || "Financial Institution";
  const returnUrl = state?.returnUrl || "/dashboard";

  useEffect(() => {
    const urlStatus = searchParams.get("status");
    const reason = searchParams.get("reason");

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    // Determine final status after "processing"
    const timer = setTimeout(() => {
      clearInterval(progressInterval);

      if (reason === "timeout") {
        setStatus("error");
        setError("Connection timed out. Please try again.");
      } else if (urlStatus === "success") {
        setProgress(100);
        setStatus("success");
      } else if (urlStatus === "error") {
        setStatus("error");
        setError("Failed to connect account. Please try again.");
      } else {
        // Default to success for demo purposes
        setProgress(100);
        setStatus("success");
      }
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [searchParams]);

  // Handle retry
  const handleRetry = () => {
    // Navigate back to the linking flow
    navigate(`/link/${assetType}`, {
      state: { assetType, assetTitle, provider },
    });
  };

  // Handle cancel
  const handleCancel = () => {
    navigate(returnUrl);
  };

  // Show appropriate component based on status
  if (status === "success") {
    return (
      <AssetLinkingSuccess
        assetType={assetType}
        assetTitle={assetTitle}
        providerName={provider}
        returnPath={returnUrl}
      />
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-md mx-auto p-6">
        <AssetLinkingProgress
          assetType={assetType}
          assetTitle={assetTitle}
          provider={provider}
          status="error"
          error={error || "An unexpected error occurred"}
          onRetry={handleRetry}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // Loading state
  return (
    <div className="max-w-md mx-auto p-6">
      <AssetLinkingProgress
        assetType={assetType}
        assetTitle={assetTitle}
        provider={provider}
        status={
          progress < 30
            ? "connecting"
            : progress < 70
            ? "authenticating"
            : "syncing"
        }
        progress={Math.round(progress)}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EnhancedCallbackHandler;
