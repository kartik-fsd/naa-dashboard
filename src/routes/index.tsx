import { createBrowserRouter, Navigate } from "react-router-dom";

import { AuthRoute } from "./authRoute";
import { ProtectedRoute } from "./protectedRoute";
import Auth from "../auth";
import Home from "../pages/home";
import Portfolio from "../pages/portfolio";
import NomineesPage from "../pages/nominee/page";
import DocumentVaultPage from "../pages/documents/page";

// Import Sandbox Components

import { LINKING_CONFIGS } from "../utils/assestsLinkingConfig";
import { AccountAggregator } from "../components/link-assets/AccountAggreagator";
import { SandboxRouter } from "../sandbox/sandBox";
import { HDFCAuthSandbox } from "../sandbox/AuthSandbox";
import { AuthCallback } from "../sandbox/AuthCallback";
import React from "react";
import LinkAssetsSection from "../components/link-assets";
import DematAuth from "../components/link-assets/DemmatAccountLink";
import MutualFundAuth from "../components/link-assets/MutualFundLink";
import EPFAuth from "../components/link-assets/EPFAccountLinking";
import { CallbackHandler } from "../sandbox/callbackHandler";
import Estateplanning from "../pages/Estate-planning";
// Define auth flow configurations
const AUTH_FLOWS = {
  "hdfc-auth": HDFCAuthSandbox,
  "sbi-auth": HDFCAuthSandbox,
  "icici-auth": HDFCAuthSandbox,
  "demat-auth": DematAuth,
  "mf-auth": MutualFundAuth,
  "epf-auth": EPFAuth,
  "aa-flow": AccountAggregator,
} as const;

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/auth" replace />,
    },
    {
      element: <AuthRoute />,
      children: [
        {
          path: "auth",
          element: <Auth />,
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "dashboard",
          element: <Home />,
        },
        {
          path: "portfolio",
          element: <Portfolio />,
        },
        {
          path: "nominees",
          element: <NomineesPage />,
        },
        {
          path: "documents",
          element: <DocumentVaultPage />,
        },
        {
          path: "estate-planning",
          element: <Estateplanning />,
        },
        // Asset Linking Routes
        {
          path: "link-assets",
          element: <LinkAssetsSection />,
        },
        // Sandbox Routes
        {
          path: "sandbox",
          children: [
            {
              path: "",
              element: <SandboxRouter />,
            },
            // Dynamic auth flow routes
            ...Object.keys(AUTH_FLOWS).map((provider) => ({
              path: `${provider}`,
              element: React.createElement(
                AUTH_FLOWS[provider as keyof typeof AUTH_FLOWS]
              ),
            })),
            {
              path: "auth-callback",
              element: <AuthCallback />,
            },
          ],
        },
        // Account Linking Flow Routes
        {
          path: "link/:assetType",
          element: <AccountAggregator />,
          loader: ({ params }) => {
            const assetType = params.assetType as keyof typeof LINKING_CONFIGS;
            const config = LINKING_CONFIGS[assetType];
            if (!config) {
              throw new Error("Invalid asset type");
            }
            return config;
          },
          errorElement: <Navigate to="/dashboard" replace />,
        },
        // Callback Routes
        {
          path: "auth/callback",
          element: <CallbackHandler />,
        },
        // Error Routes
        {
          path: "auth/error",
          element: <CallbackHandler />,
        },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_prependBasename: true,
      scrollRestoration: "auto",
    },
  }
);

// Navigation helper functions
export const assetLinkingNavigator = {
  toAssetLinking: (assetType: string) => `/link/${assetType}`,
  toSandbox: (provider: string, params?: Record<string, string>) => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return `/sandbox/${provider}${queryString}`;
  },
  toCallback: (params?: Record<string, string>) => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return `/auth/callback${queryString}`;
  },
  toError: (reason?: string) =>
    `/auth/error${reason ? `?reason=${reason}` : ""}`,
};

// Asset type validation
export const isValidAssetType = (
  type: string
): type is keyof typeof LINKING_CONFIGS => {
  return type in LINKING_CONFIGS;
};

// Route guards and error handling
router.subscribe((state) => {
  if (state.errors) {
    console.error("Navigation error:", state.errors);
  }

  if (state.location.pathname.startsWith("/sandbox")) {
    const timeout = setTimeout(() => {
      router.navigate("/auth/error?reason=timeout");
    }, 300000); // 5 minutes

    return () => clearTimeout(timeout);
  }
});

export const createCallbackUrl = (
  status: "success" | "error",
  params?: { reason?: string }
) => {
  const base = status === "success" ? "/auth/callback" : "/auth/error";
  if (params?.reason) {
    return `${base}?reason=${params.reason}`;
  }
  return `${base}?status=${status}`;
};
