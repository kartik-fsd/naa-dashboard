// types.ts
export interface Nominee {
    id: string;
    fullName: string;
    relationship: string;
    relationshipOther?: string;
    avatarUrl?: string;
    dateOfBirth?: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    identificationType?: string;
    identificationNumber?: string;
}

export interface NomineeState {
    nominees: Nominee[];
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
}

export type NomineeAction =
    | { type: 'ADD_NOMINEE'; payload: Nominee }
    | { type: 'UPDATE_NOMINEE'; payload: Nominee }
    | { type: 'DELETE_NOMINEE'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'SET_NOMINEES'; payload: Nominee[] }
    | { type: 'CLEAR_ERROR' };

export interface NomineeFormInputs {
    fullName: string;
    relationship: string;
    relationshipOther?: string;
    avatar?: FileList;
    dateOfBirth?: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    identificationType: string;
    identificationNumber?: string;
}

export interface NotificationProps {
    type: "success" | "error";
    message: string;
    onClose: () => void;
}
