import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import {
  AssetType,
  AuthFlow,
  LINKING_CONFIGS,
} from "../../utils/assestsLinkingConfig";
import { AssetData } from "../../types/portfolio";

export interface AssetLinkingParams {
  assetType: AssetType;
  assetTitle: string;
  returnUrl?: string;
  providerOverride?: string;
}

/**
 * A hook that provides functions for navigating to asset linking flows
 */
export const useAssetLinking = () => {
  const navigate = useNavigate();

  /**
   * Start the asset linking flow
   */
  const startLinkingFlow = useCallback(
    (params: AssetLinkingParams) => {
      const {
        assetType,
        assetTitle,
        returnUrl = "/auth/callback",
        providerOverride,
      } = params;

      // Get the configuration for this asset type
      const config = LINKING_CONFIGS[assetType];
      if (!config) {
        console.error(`No configuration found for asset type: ${assetType}`);
        return;
      }

      // Determine which provider to use (either override or the first one in the config)
      const provider = providerOverride || config.providers[0];

      // Determine the auth flow to use
      const authFlow = config.authFlow;

      // Navigate to the appropriate route based on the auth flow
      if (authFlow === "aa-flow") {
        navigate(`/link/${assetType}`, {
          state: {
            assetType,
            assetTitle,
            returnUrl,
          },
        });
      } else {
        navigate(`/sandbox/${provider}`, {
          state: {
            assetType,
            assetTitle,
            provider,
            returnUrl,
          },
        });
      }
    },
    [navigate]
  );

  /**
   * Navigate to asset listing page
   */
  const goToAssetListing = useCallback(() => {
    navigate("/link-assets");
  }, [navigate]);

  /**
   * Navigate to portfolio page
   */
  const goToPortfolio = useCallback(() => {
    navigate("/portfolio");
  }, [navigate]);

  /**
   * Handle successful asset linking
   */
  const handleLinkingSuccess = useCallback(
    (newAsset: Partial<AssetData>) => {
      navigate("/dashboard", {
        state: {
          linkingSuccess: true,
          newAsset,
        },
      });
    },
    [navigate]
  );

  return {
    startLinkingFlow,
    goToAssetListing,
    goToPortfolio,
    handleLinkingSuccess,
  };
};

/**
 * Maps an asset type to its configuration
 */
export const getAssetConfig = (assetType: AssetType) => {
  return LINKING_CONFIGS[assetType];
};

/**
 * Determines which component to render based on the asset type and auth flow
 */
export const getAuthFlowComponent = (authFlow: AuthFlow) => {
  switch (authFlow) {
    case "aa-flow":
      return "/link/:assetType";
    case "demat-auth":
      return "/sandbox/demat-auth";
    case "mf-auth":
      return "/sandbox/mf-auth";
    case "epf-auth":
      return "/sandbox/epf-auth";
    default:
      return "/sandbox/:provider";
  }
};

/**
 * Creates URL params for linking callback
 */
export const createCallbackParams = (
  status: "success" | "error",
  assetType: AssetType,
  provider: string,
  assetTitle?: string
) => {
  const params = new URLSearchParams();
  params.append("status", status);
  params.append("type", assetType);
  params.append("provider", provider);

  if (assetTitle) {
    params.append("assetTitle", assetTitle);
  }

  return params.toString();
};
