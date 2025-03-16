// src/types/estatePlanning.ts

export type PlanningStatus = 'complete' | 'incomplete' | 'inprogress';

export interface PlanningProgressItem {
    title: string;
    description: string;
    status: PlanningStatus;
    progress?: number; // Percentage of completion for 'inprogress' items
}

export type Color = 'blue' | 'green' | 'purple' | 'red' | 'orange';

export interface AssetType {
    id: string;
    title: string;
    category: string;
    description: string;
    items: string[];
}

export interface LegalDocument {
    id: string;
    title: string;
    description: string;
    templateUrl: string;
    category: 'will' | 'poa' | 'trust' | 'nomination' | 'other';
    lastUpdated?: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

export interface Nominee {
    id: string;
    name: string;
    relationship: string;
    assets: string[];
    contact: {
        email?: string;
        phone?: string;
        address?: string;
    };
    documents: {
        id: string;
        type: string;
        verified: boolean;
    }[];
}

export interface Asset {
    id: string;
    name: string;
    type: 'bank' | 'property' | 'investment' | 'insurance' | 'other';
    value?: number;
    documents: string[];
    nominees: {
        id: string;
        share: number;
    }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details: Record<string, any>;
}

export interface EstateDocument {
    id: string;
    title: string;
    type: 'will' | 'poa' | 'trust' | 'nominee' | 'other';
    status: 'draft' | 'completed' | 'registered' | 'expired';
    createdAt: string;
    updatedAt: string;
    expiresAt?: string;
    fileUrl?: string;
}

export interface EstateConsultation {
    id: string;
    expert: {
        id: string;
        name: string;
        specialty: string;
        image?: string;
    };
    scheduledAt: string;
    duration: number; // in minutes
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
}

export interface EstatePlanningProgress {
    totalAssets: number;
    assetsWithNominees: number;
    willCreated: boolean;
    willRegistered: boolean;
    poaCreated: boolean;
    digitalAssetsPlanned: boolean;
    overallProgress: number; // percentage
}

export interface EstateValidationIssue {
    id: string;
    severity: 'critical' | 'warning' | 'info';
    category: 'asset' | 'nominee' | 'will' | 'poa' | 'other';
    description: string;
    recommendation: string;
    resolved: boolean;
}