import { AssetData } from "../types/portfolio";


export const MOCK_DATA = {
    totalValue: "₹1,24,50,000",
    monthlyGrowth: "+4.2%",
    yearlyGrowth: "+12.8%",
    estateReadiness: 65,
    assetsWithNominees: 12,
    assetsWithoutNominees: 4,
    lastSync: "2024-03-10T14:30:00",

    assets: [
        {
            id: "1",
            name: "HDFC Savings Account",
            type: "savings",
            accountNumber: "XXXX1234",
            institution: "HDFC Bank",
            value: "₹5,00,000",
            riskLevel: "high",
            hasNominee: false,
            lastUpdated: "2024-03-10T14:30:00"
        },
        {
            id: "2",
            name: "Zerodha Demat",
            type: "demat",
            accountNumber: "XXXX5678",
            institution: "Zerodha",
            value: "₹15,00,000",
            riskLevel: "critical",
            hasNominee: false,
            lastUpdated: "2024-03-09T11:20:00"
        },
        {
            id: "3",
            name: "ICICI Mutual Fund",
            type: "mutual_fund",
            accountNumber: "XXXX9012",
            institution: "ICICI Prudential",
            value: "₹8,00,000",
            riskLevel: "medium",
            hasNominee: true,
            lastUpdated: "2024-03-08T16:45:00"
        }
    ] as AssetData[]
};