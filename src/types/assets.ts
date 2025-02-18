// types/assets.ts

export type AssetCategory = 'stocks' | 'funds' | 'retirement' | 'property' | 'others';

export type AssetStatus = 'pending' | 'linked' | 'error';

export type KYCStatus = 'complete' | 'pending' | 'failed';

export interface AssetBalance {
    amount: number;
    currency: string;
}

export interface AssetMetadata {
    accountNumber?: string;
    branch?: string;
    kyc?: KYCStatus;
    nominee?: string;
    ifsc?: string;
}

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

export interface CategoryConfig {
    label: string;
    color: {
        bg: string;
        text: string;
        border: string;
    };
    icon: string;
}

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

export interface LinkedAccountsState {
    accounts: LinkedAccount[];
    isLoading: boolean;
    error: string | null;
}

export type LinkedAccountsAction =
    | { type: 'ADD_ACCOUNT'; payload: LinkedAccount }
    | { type: 'REMOVE_ACCOUNT'; payload: string }
    | { type: 'UPDATE_ACCOUNT'; payload: { id: string; updates: Partial<LinkedAccount> } }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };