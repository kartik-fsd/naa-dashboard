/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/estatePlanningService.ts
import type {
    PlanningProgressItem,
    Asset,
    Nominee,
    EstatePlanningProgress,
    EstateValidationIssue,
    EstateDocument,
    EstateConsultation
} from '../types/estate-palnning';

// Mock data for estate planning
const mockPlanningProgress: PlanningProgressItem[] = [
    {
        title: "Will Creation",
        status: "incomplete",
        description: "Create a legally valid will to distribute your assets"
    },
    {
        title: "Asset Inventory",
        status: "inprogress",
        description: "Document all your assets for proper estate planning",
        progress: 60
    },
    {
        title: "Nominee Designation",
        status: "complete",
        description: "Nominate beneficiaries for your financial assets"
    },
    {
        title: "Power of Attorney",
        status: "incomplete",
        description: "Designate someone to make decisions on your behalf"
    }
];

const mockAssets: Asset[] = [
    {
        id: "asset-1",
        name: "HDFC Savings Account",
        type: "bank",
        value: 250000,
        documents: ["doc-1", "doc-2"],
        nominees: [
            { id: "nominee-1", share: 70 },
            { id: "nominee-2", share: 30 }
        ],
        details: {
            accountNumber: "XXXX1234",
            branch: "Andheri East",
            ifsc: "HDFC0001234"
        }
    },
    {
        id: "asset-2",
        name: "Residential Property",
        type: "property",
        value: 10000000,
        documents: ["doc-3"],
        nominees: [
            { id: "nominee-1", share: 100 }
        ],
        details: {
            address: "123, ABC Apartments, Mumbai",
            registrationNumber: "REG123456",
            purchaseDate: "2015-06-15"
        }
    },
    {
        id: "asset-3",
        name: "ICICI Mutual Fund",
        type: "investment",
        value: 500000,
        documents: ["doc-4"],
        nominees: [],
        details: {
            folioNumber: "MF1234567",
            scheme: "ICICI Prudential Value Discovery Fund",
            units: 1234.56
        }
    }
];

const mockNominees: Nominee[] = [
    {
        id: "nominee-1",
        name: "Priya Sharma",
        relationship: "Spouse",
        assets: ["asset-1", "asset-2"],
        contact: {
            email: "priya.sharma@example.com",
            phone: "+91 9876543210",
            address: "123, ABC Apartments, Mumbai"
        },
        documents: [
            { id: "doc-5", type: "Aadhaar", verified: true },
            { id: "doc-6", type: "PAN", verified: true }
        ]
    },
    {
        id: "nominee-2",
        name: "Rahul Sharma",
        relationship: "Son",
        assets: ["asset-1"],
        contact: {
            phone: "+91 9876543211"
        },
        documents: [
            { id: "doc-7", type: "Aadhaar", verified: false }
        ]
    }
];

const mockProgress: EstatePlanningProgress = {
    totalAssets: 3,
    assetsWithNominees: 2,
    willCreated: false,
    willRegistered: false,
    poaCreated: false,
    digitalAssetsPlanned: false,
    overallProgress: 35
};

const mockValidationIssues: EstateValidationIssue[] = [
    {
        id: "issue-1",
        severity: "critical",
        category: "will",
        description: "No will has been created yet",
        recommendation: "Create a will to ensure your assets are distributed according to your wishes",
        resolved: false
    },
    {
        id: "issue-2",
        severity: "warning",
        category: "asset",
        description: "ICICI Mutual Fund has no nominees assigned",
        recommendation: "Assign nominees to your mutual fund investments",
        resolved: false
    },
    {
        id: "issue-3",
        severity: "info",
        category: "nominee",
        description: "Rahul Sharma's Aadhaar verification is pending",
        recommendation: "Complete the verification process for better legal standing",
        resolved: false
    }
];

const mockDocuments: EstateDocument[] = [
    {
        id: "doc-8",
        title: "Draft Will",
        type: "will",
        status: "draft",
        createdAt: "2023-06-01T10:30:00Z",
        updatedAt: "2023-06-15T14:20:00Z"
    },
    {
        id: "doc-9",
        title: "Bank Account Nomination Form",
        type: "nominee",
        status: "completed",
        createdAt: "2023-05-10T09:15:00Z",
        updatedAt: "2023-05-10T09:15:00Z"
    }
];

const mockConsultations: EstateConsultation[] = [
    {
        id: "consult-1",
        expert: {
            id: "expert-1",
            name: "Adv. Rajesh Joshi",
            specialty: "Succession Law",
            image: "/experts/rajesh-joshi.jpg"
        },
        scheduledAt: "2023-07-15T11:00:00Z",
        duration: 60,
        status: "scheduled"
    }
];

// Main function to get estate planning data
export const getEstatePlanningData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        planningProgress: mockPlanningProgress,
        assets: mockAssets,
        nominees: mockNominees,
        progress: mockProgress,
        validationIssues: mockValidationIssues,
        documents: mockDocuments,
        consultations: mockConsultations
    };
};

// Function to create a will
export const createWill = async (willData: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        id: `will-${Date.now()}`,
        ...willData,
        createdAt: new Date().toISOString(),
        status: 'draft'
    };
};

// Function to add a nominee
export const addNominee = async (nomineeData: Omit<Nominee, 'id'>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newNominee = {
        id: `nominee-${Date.now()}`,
        ...nomineeData
    };

    return newNominee;
};

// Function to add an asset
export const addAsset = async (assetData: Omit<Asset, 'id'>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newAsset = {
        id: `asset-${Date.now()}`,
        ...assetData
    };

    return newAsset;
};

// Function to schedule a consultation
export const scheduleConsultation = async (consultationData: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newConsultation = {
        id: `consult-${Date.now()}`,
        ...consultationData,
        status: 'scheduled'
    };

    return newConsultation;
};

// Function to upload a document
export const uploadDocument = async (file: File, metadata: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        id: `doc-${Date.now()}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date().toISOString(),
        ...metadata
    };
};