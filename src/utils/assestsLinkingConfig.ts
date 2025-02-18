// utils/assetsLinkingConfig.ts

import {
    CurrencyRupeeIcon,
    ChartBarIcon,
    BuildingLibraryIcon,
    WalletIcon,
    ClockIcon,
    SparklesIcon,
    BuildingOffice2Icon,
    ChartPieIcon,
} from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/solid";

export const LINKING_CONFIGS = {
    stocks: {
        title: "Demat Holdings",
        icon: CurrencyRupeeIcon,
        providers: ["demat-auth"],
        description: "Link your demat account to manage nominations",
        authFlow: "demat-auth",
        color: "blue",
    },
    funds: {
        title: "Mutual Funds",
        icon: ChartBarIcon,
        providers: ["mf-auth"],
        description: "Connect your mutual fund investments",
        authFlow: "mf-auth",
        color: "purple",
    },
    bank: {
        title: "Bank Accounts",
        icon: BuildingLibraryIcon,
        providers: ["hdfc-auth", "sbi-auth", "icici-auth"],
        description: "Link your savings and current accounts",
        authFlow: "aa-flow",
        color: "blue",
    },
    fd: {
        title: "Fixed Deposits",
        icon: BanknotesIcon,
        providers: ["hdfc-auth", "sbi-auth", "icici-auth"],
        description: "Connect your fixed deposits",
        authFlow: "aa-flow",
        color: "green",
    },
    ppf: {
        title: "PPF Account",
        icon: WalletIcon,
        providers: ["aa-flow"],
        description: "Link your Public Provident Fund account",
        authFlow: "aa-flow",
        color: "yellow",
    },
    nps: {
        title: "NPS",
        icon: ClockIcon,
        providers: ["aa-flow"],
        description: "Connect your National Pension Scheme",
        authFlow: "aa-flow",
        color: "orange",
    },
    epf: {
        title: "EPF",
        icon: BuildingLibraryIcon,
        providers: ["epf-auth"],
        description: "Link your Employee Provident Fund",
        authFlow: "epf-auth",
        color: "green",
    },
    etf: {
        title: "Gold & Silver ETFs",
        icon: SparklesIcon,
        providers: ["demat-auth"],
        description: "Connect your ETF investments",
        authFlow: "demat-auth",
        color: "yellow",
    },
    bonds: {
        title: "Government Bonds",
        icon: BuildingOffice2Icon,
        providers: ["demat-auth"],
        description: "Link your government securities",
        authFlow: "demat-auth",
        color: "blue",
    },
    insurance: {
        title: "Insurance Policies",
        icon: ChartPieIcon,
        providers: ["aa-flow"],
        description: "Connect your insurance policies",
        authFlow: "aa-flow",
        color: "purple",
    },
} as const;

export type AssetType = keyof typeof LINKING_CONFIGS;
export type AuthFlow = typeof LINKING_CONFIGS[AssetType]["authFlow"];

export const getAssetConfig = (assetType: AssetType) => LINKING_CONFIGS[assetType];

export const getAuthFlow = (assetType: AssetType) => LINKING_CONFIGS[assetType].authFlow;

export const getProviders = (assetType: AssetType) => LINKING_CONFIGS[assetType].providers;