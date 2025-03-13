import {
  CurrencyRupeeIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
  WalletIcon,
  ClockIcon,
  SparklesIcon,
  BuildingOffice2Icon,
  ChartPieIcon
} from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { ComponentType, SVGProps } from "react";

// Asset Categories
export type AssetCategory = 'stocks' | 'funds' | 'retirement' | 'property' | 'others';

// Asset Status
export type AssetStatus = 'pending' | 'linked' | 'error';

// KYC Status
export type KYCStatus = 'complete' | 'pending' | 'failed';

// AuthFlow Type
export type AuthFlow = 'aa-flow' | 'demat-auth' | 'mf-auth' | 'epf-auth';

// Asset Balance
export interface AssetBalance {
  amount: number;
  currency: string;
}

// Asset Metadata
export interface AssetMetadata {
  accountNumber?: string;
  branch?: string;
  kyc?: KYCStatus;
  nominee?: string;
  ifsc?: string;
}

// Asset Interface
export interface Asset {
  id: string;
  icon: string;
  title: string;
  category: AssetCategory;
  description?: string;
  status: AssetStatus;
  lastUpdated?: string;
  institution?: string;
  balance?: AssetBalance;
  metadata?: AssetMetadata;
}

// Configuration for each category
export interface CategoryConfig {
  label: string;
  color: {
    bg: string;
    text: string;
    border: string;
  };
  icon: string;
}

// Linked Account
export interface LinkedAccount {
  id: string;
  type: 'bank' | 'stocks' | 'funds' | 'retirement' | 'others';
  provider: string;
  accountType: string;
  accountNumber?: string;
  balance: string;
  lastUpdated: string;
  status: 'active' | 'pending' | 'error';
  category: string;
  metadata?: {
    folios?: number;
    schemes?: number;
    nominees?: string[];
    branch?: string;
    ifsc?: string;
  };
}

// Linked Accounts State
export interface LinkedAccountsState {
  accounts: LinkedAccount[];
  isLoading: boolean;
  error: string | null;
}

// Linked Accounts Actions
export type LinkedAccountsAction =
  | { type: 'ADD_ACCOUNT'; payload: LinkedAccount }
  | { type: 'REMOVE_ACCOUNT'; payload: string }
  | { type: 'UPDATE_ACCOUNT'; payload: { id: string; updates: Partial<LinkedAccount> } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Enhanced Asset Configuration
export interface AssetLinkingConfig {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  providers: string[];
  description: string;
  authFlow: AuthFlow;
  color: string;
  category?: AssetCategory;
}

// Asset Linking Configurations
export const ENHANCED_LINKING_CONFIGS: Record<string, AssetLinkingConfig> = {
  stocks: {
    title: "Demat Holdings",
    icon: CurrencyRupeeIcon,
    providers: ["demat-auth"],
    description: "Link your demat account to manage nominations",
    authFlow: "demat-auth",
    color: "blue",
    category: "stocks"
  },
  funds: {
    title: "Mutual Funds",
    icon: ChartBarIcon,
    providers: ["mf-auth"],
    description: "Connect your mutual fund investments",
    authFlow: "mf-auth",
    color: "purple",
    category: "funds"
  },
  bank: {
    title: "Bank Accounts",
    icon: BuildingLibraryIcon,
    providers: ["hdfc-auth", "sbi-auth", "icici-auth"],
    description: "Link your savings and current accounts",
    authFlow: "aa-flow",
    color: "blue",
    category: "others"
  },
  fd: {
    title: "Fixed Deposits",
    icon: BanknotesIcon,
    providers: ["hdfc-auth", "sbi-auth", "icici-auth"],
    description: "Connect your fixed deposits",
    authFlow: "aa-flow",
    color: "green",
    category: "others"
  },
  ppf: {
    title: "PPF Account",
    icon: WalletIcon,
    providers: ["aa-flow"],
    description: "Link your Public Provident Fund account",
    authFlow: "aa-flow",
    color: "yellow",
    category: "retirement"
  },
  nps: {
    title: "NPS",
    icon: ClockIcon,
    providers: ["aa-flow"],
    description: "Connect your National Pension Scheme",
    authFlow: "aa-flow",
    color: "orange",
    category: "retirement"
  },
  epf: {
    title: "EPF",
    icon: BuildingLibraryIcon,
    providers: ["epf-auth"],
    description: "Link your Employee Provident Fund",
    authFlow: "epf-auth",
    color: "green",
    category: "retirement"
  },
  etf: {
    title: "Gold & Silver ETFs",
    icon: SparklesIcon,
    providers: ["demat-auth"],
    description: "Connect your ETF investments",
    authFlow: "demat-auth",
    color: "yellow",
    category: "stocks"
  },
  bonds: {
    title: "Government Bonds",
    icon: BuildingOffice2Icon,
    providers: ["demat-auth"],
    description: "Link your government securities",
    authFlow: "demat-auth",
    color: "blue",
    category: "stocks"
  },
  insurance: {
    title: "Insurance Policies",
    icon: ChartPieIcon,
    providers: ["aa-flow"],
    description: "Connect your insurance policies",
    authFlow: "aa-flow",
    color: "purple",
    category: "others"
  },
};

// Helper function to get configuration for an asset type
export const getEnhancedAssetConfig = (assetType: string): AssetLinkingConfig | undefined => {
  return ENHANCED_LINKING_CONFIGS[assetType];
};