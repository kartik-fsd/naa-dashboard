export interface AssetData {
    id: string;
    name: string;
    type: 'savings' | 'demat' | 'mutual_fund';
    accountNumber: string;
    institution: string;
    value: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    hasNominee: boolean;
    lastUpdated: string;
}