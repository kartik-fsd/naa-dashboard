// components/sandbox/SandboxRouter.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import { HDFCAuthSandbox } from "./AuthSandbox";
import { AuthCallback } from "./AuthCallback";
import { AccountAggregator } from "../components/link-assets/AccountAggreagator";
import EPFAuth from "../components/link-assets/EPFAccountLinking";
import MutualFundAuth from "../components/link-assets/MutualFundLink";
import DematAuth from "../components/link-assets/DemmatAccountLink";

interface SandboxProps {
  flow?: string;
  returnUrl?: string;
  assetType?: string;
  assetTitle?: string;
}

// Map of provider IDs to their respective sandbox components
const SANDBOX_COMPONENTS: Record<string, React.ComponentType<SandboxProps>> = {
  "hdfc-auth": HDFCAuthSandbox,
  "aa-flow": AccountAggregator,
  "demat-auth": DematAuth,
  "mf-auth": MutualFundAuth,
  "epf-auth": EPFAuth,
  "auth-callback": AuthCallback,
};

// Asset type to provider mapping
const ASSET_PROVIDERS: Record<string, string> = {
  stocks: "demat-auth",
  funds: "aa-flow",
  retirement: "aa-flow",
  others: "aa-flow",
};

export const SandboxRouter: React.FC = () => {
  const location = useLocation();
  const { provider, flow, returnUrl, assetType, assetTitle } =
    location.state || {};

  /// Determine which component to use based on provider or asset type
  const componentKey =
    provider || ASSET_PROVIDERS[assetType || ""] || "aa-flow";
  const SandboxComponent = SANDBOX_COMPONENTS[componentKey];

  if (!SandboxComponent) {
    return (
      <div>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Invalid Provider
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            The requested authentication provider was not found.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                     font-medium hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Pass the state to the sandbox component
  return (
    <SandboxComponent
      flow={flow}
      returnUrl={returnUrl}
      assetType={assetType}
      assetTitle={assetTitle}
    />
  );
};
