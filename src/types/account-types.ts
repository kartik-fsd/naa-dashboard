// types/account.ts

export type AccountStatus = 'active' | 'inactive' | 'pending' | 'failed';
export type AccountType = 'savings' | 'current' | 'salary' | 'fd' | 'rd' | 'loan' | 'creditCard';
export type BankAccountType = 'savings' | 'current' | 'salary';
export type InvestmentType = 'stocks' | 'mutualFunds' | 'fd' | 'rd' | 'ppf' | 'epf' | 'nps';

export interface BankInfo {
  id: string;
  name: string;
  code: string;
  logo?: string;
}

export interface AccountBalance {
  current: number;
  available: number;
  currency: string;
  lastUpdated: string;
}

export interface AccountHolder {
  name: string;
  customerID?: string;
  kycStatus: 'complete' | 'pending' | 'failed';
  panNumber?: string;
}

export interface TransactionInfo {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category?: string;
  reference?: string;
}

export interface NomineeInfo {
  name: string;
  relationship: string;
  sharePercentage: number;
  verified: boolean;
}

export interface AccountFacility {
  type: string;
  enabled: boolean;
  lastUsed?: string;
}

export interface AccountDetails {
  id: string;
  accountNumber: string;
  maskedAccountNumber: string;
  ifsc: string;
  type: AccountType;
  status: AccountStatus;
  bank: BankInfo;
  balance: AccountBalance;
  holder: AccountHolder;
  nominees?: NomineeInfo[];
  facilities: AccountFacility[];
  lastAccessed?: string;
  branch?: {
    name: string;
    code: string;
    address?: string;
    contact?: string;
  };
  features: {
    netBanking: boolean;
    upi: boolean;
    debitCard: boolean;
    chequeBook: boolean;
  };
  limits?: {
    dailyTransfer: number;
    atm: number;
    pos: number;
  };
  linkedServices?: {
    upiID?: string[];
    cards?: {
      last4: string;
      type: string;
      expiry: string;
    }[];
  };
  metadata?: {
    openedOn?: string;
    lastStatementDate?: string;
    interestRate?: number;
    accountLevel?: string;
  };
}

export interface LinkedAccountResponse {
  accounts: AccountDetails[];
  totalBalance: number;
  lastSync: string;
  nextSyncScheduled: string;
}

export interface AccountLinkingError {
  code: string;
  message: string;
  description?: string;
  action?: string;
}

export interface AccountLinkingSession {
  sessionId: string;
  bankId: string;
  status: 'initiated' | 'authorized' | 'completed' | 'failed';
  timestamp: string;
  expiresAt: string;
  error?: AccountLinkingError;
}

export interface ConsentRequest {
  purpose: string;
  dataTypes: string[];
  frequency: 'ONETIME' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  validFrom: string;
  validUntil: string;
  dataLife: string;
  fiTypes: string[];
  consentTypes: string[];
}

export interface ConsentResponse {
  consentId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  createDate: string;
  approvedDate?: string;
  expiryDate: string;
}

export interface AccountAggregatorSession {
  sessionId: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'FAILED';
  consentHandle?: string;
  dataSessionId?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

// Utility type for account updates
export type AccountUpdatePayload = Partial<
  Pick<AccountDetails, 'status' | 'balance' | 'nominees' | 'facilities'>
>;

// Response type for account linking status check
export interface LinkingStatusResponse {
  status: 'success' | 'pending' | 'failed';
  accounts?: AccountDetails[];
  error?: AccountLinkingError;
  nextPollInterval?: number;
}