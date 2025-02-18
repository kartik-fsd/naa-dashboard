import { Asset, AssetCategory, CategoryConfig } from '../types/assets';

export const categoryConfigs: Record<AssetCategory, CategoryConfig> = {
    stocks: {
        label: "Stocks & Securities",
        color: {
            bg: "bg-blue-50",
            text: "text-blue-700",
            border: "border-blue-100"
        },
        icon: "CurrencyRupeeIcon"
    },
    funds: {
        label: "Mutual Funds",
        color: {
            bg: "bg-purple-50",
            text: "text-purple-700",
            border: "border-purple-100"
        },
        icon: "ChartBarIcon"
    },
    retirement: {
        label: "Retirement Plans",
        color: {
            bg: "bg-green-50",
            text: "text-green-700",
            border: "border-green-100"
        },
        icon: "BuildingLibraryIcon"
    },
    property: {
        label: "Property",
        color: {
            bg: "bg-orange-50",
            text: "text-orange-700",
            border: "border-orange-100"
        },
        icon: "HomeIcon"
    },
    others: {
        label: "Other Assets",
        color: {
            bg: "bg-gray-50",
            text: "text-gray-700",
            border: "border-gray-100"
        },
        icon: "WalletIcon"
    }
};

export const mockAssets: Asset[] = [
    {
        id: "demat-001",
        icon: "CurrencyRupeeIcon",
        title: "Zerodha Demat",
        category: "stocks",
        description: "Add nominee to your equity investments",
        status: "linked",
        institution: "Zerodha",
        balance: {
            amount: 250000,
            currency: "INR"
        },
        metadata: {
            accountNumber: "12345678",
            kyc: "complete",
            nominee: "John Doe"
        },
        lastUpdated: "2024-02-13T10:30:00Z"
    },
    {
        id: "mf-001",
        icon: "ChartBarIcon",
        title: "Groww Mutual Funds",
        category: "funds",
        description: "Nominate beneficiary for your MF portfolio",
        status: "pending",
        institution: "Groww",
        balance: {
            amount: 150000,
            currency: "INR"
        },
        lastUpdated: "2024-02-13T09:15:00Z"
    },
    {
        id: "bank-001",
        icon: "BuildingLibraryIcon",
        title: "HDFC Savings",
        category: "others",
        description: "Add nomination to savings account",
        status: "linked",
        institution: "HDFC Bank",
        balance: {
            amount: 75000,
            currency: "INR"
        },
        metadata: {
            accountNumber: "XXXX1234",
            branch: "Koramangala",
            ifsc: "HDFC0001234"
        },
        lastUpdated: "2024-02-12T18:20:00Z"
    },
    {
        id: "ppf-001",
        icon: "WalletIcon",
        title: "PPF Account",
        category: "retirement",
        description: "Update PPF account nomination",
        status: "linked",
        institution: "SBI",
        balance: {
            amount: 200000,
            currency: "INR"
        },
        metadata: {
            accountNumber: "PPFXX1234",
            branch: "Richmond Road"
        },
        lastUpdated: "2024-02-11T14:20:00Z"
    },
    {
        id: "nps-001",
        icon: "ClockIcon",
        title: "NPS Tier 1",
        category: "retirement",
        description: "Manage pension scheme nominees",
        status: "pending",
        institution: "PFRDA",
        balance: {
            amount: 350000,
            currency: "INR"
        },
        metadata: {
            accountNumber: "NPS123456",
            kyc: "pending"
        },
        lastUpdated: "2024-02-10T11:30:00Z"
    },
    {
        id: "property-001",
        icon: "BuildingOffice2Icon",
        title: "Residential Property",
        category: "property",
        description: "Update property documentation",
        status: "linked",
        balance: {
            amount: 5000000,
            currency: "INR"
        },
        metadata: {
            accountNumber: "PROP123",
            kyc: "complete"
        },
        lastUpdated: "2024-02-09T16:45:00Z"
    },
    {
        id: "fd-001",
        icon: "BanknotesIcon",
        title: "Fixed Deposits",
        category: "others",
        description: "Secure FDs with nomination facility",
        status: "linked",
        institution: "ICICI Bank",
        balance: {
            amount: 100000,
            currency: "INR"
        },
        metadata: {
            accountNumber: "FD123456",
            ifsc: "ICIC0001234"
        },
        lastUpdated: "2024-02-08T13:20:00Z"
    },
    {
        id: "gold-001",
        icon: "SparklesIcon",
        title: "Digital Gold",
        category: "others",
        description: "Add nominees to gold investments",
        status: "pending",
        institution: "MMTC-PAMP",
        balance: {
            amount: 50000,
            currency: "INR"
        },
        lastUpdated: "2024-02-07T09:15:00Z"
    }
];


