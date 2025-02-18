export interface VaultDocument {
    id: string;
    name: string;
    type: string;
    size: number;
    dateUploaded: string;
    ownerDocument: string;
    publicId: string;
    systemId: string;
    baseURI: string;
    folderId: string; // Add this field to track which folder the document belongs to
}

export type DigiLockerDocument = {
    id: string;
    name: string;
    issuer: string;
    dateIssued: string;
    dateUploaded: string;
    type: string;
    docType: 'AADHAAR' | 'PAN' | 'DRIVING_LICENSE' | 'PASSPORT' | 'OTHER';
    verificationStatus: 'VERIFIED' | 'PENDING' | 'FAILED';
    uri: string;
    mimeType: string;
    fileSize: number;
    issuerId: string;
    metadata: {
        documentNumber?: string;
        issueDate?: string;
        validUntil?: string;
        issuerName: string;
        issuerLogo?: string;
    };
};

export type DigiLockerError = {
    code: string;
    message: string;
    details?: string;
};



export interface VaultFolder {
    id: string;
    name: string;
    children?: VaultFolder[];
}

export interface DocumentVaultState {
    documents: VaultDocument[];
    folders: VaultFolder[];
    selectedFolderId: string;
    searchTerm: string;
    isLoading: boolean;
    error: string | null;
}

export type DocumentVaultAction =
    | { type: 'ADD_DOCUMENT'; payload: VaultDocument | VaultDocument[] }
    | { type: 'DELETE_DOCUMENT'; payload: string }
    | { type: 'ADD_FOLDER'; payload: VaultFolder }
    | { type: 'DELETE_FOLDER'; payload: string }
    | { type: 'SET_SELECTED_FOLDER'; payload: string }
    | { type: 'SET_SEARCH_TERM'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'MOVE_DOCUMENT'; payload: { documentId: string; newFolderId: string } };
