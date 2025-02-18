import { DigiLockerDocument } from "../types/documents";

// mockData.ts
export const MOCK_DOCUMENTS: DigiLockerDocument[] = [
    {
        id: "doc_aadhaar_123",
        name: "Aadhaar Card",
        issuer: "UIDAI",
        dateIssued: "15 Jan 2023",
        dateUploaded: "15 Jan 2024",
        type: "PDF",
        docType: "AADHAAR",
        verificationStatus: "VERIFIED",
        uri: "mock://documents/aadhaar",
        mimeType: "application/pdf",
        fileSize: 1024 * 1024 * 2, // 2MB
        issuerId: "issuer_uidai",
        metadata: {
            documentNumber: "XXXX-XXXX-1234",
            issueDate: "15 Jan 2023",
            issuerName: "Unique Identification Authority of India",
            issuerLogo: "/api/placeholder/24/24"
        }
    },
    {
        id: "doc_pan_456",
        name: "PAN Card",
        issuer: "Income Tax Department",
        dateIssued: "10 Feb 2023",
        dateUploaded: "10 Feb 2024",
        type: "PDF",
        docType: "PAN",
        verificationStatus: "VERIFIED",
        uri: "mock://documents/pan",
        mimeType: "application/pdf",
        fileSize: 1024 * 512, // 512KB
        issuerId: "issuer_itd",
        metadata: {
            documentNumber: "ABCDE1234F",
            issueDate: "10 Feb 2023",
            issuerName: "Income Tax Department",
            issuerLogo: "/api/placeholder/24/24"
        }
    },
    {
        id: "doc_dl_789",
        name: "Driving License",
        issuer: "Transport Department",
        dateIssued: "05 Mar 2023",
        dateUploaded: "05 Mar 2024",
        type: "PDF",
        docType: "DRIVING_LICENSE",
        verificationStatus: "PENDING",
        uri: "mock://documents/dl",
        mimeType: "application/pdf",
        fileSize: 1024 * 768, // 768KB
        issuerId: "issuer_rto",
        metadata: {
            documentNumber: "DL1234567890",
            issueDate: "05 Mar 2023",
            validUntil: "05 Mar 2033",
            issuerName: "Regional Transport Office",
            issuerLogo: "/api/placeholder/24/24"
        }
    },
    {
        id: "doc_passport_012",
        name: "Passport",
        issuer: "Ministry of External Affairs",
        dateIssued: "20 Apr 2023",
        dateUploaded: "20 Apr 2024",
        type: "PDF",
        docType: "PASSPORT",
        verificationStatus: "FAILED",
        uri: "mock://documents/passport",
        mimeType: "application/pdf",
        fileSize: 1024 * 1024 * 1.5, // 1.5MB
        issuerId: "issuer_mea",
        metadata: {
            documentNumber: "A1234567",
            issueDate: "20 Apr 2023",
            validUntil: "20 Apr 2033",
            issuerName: "Ministry of External Affairs",
            issuerLogo: "/api/placeholder/24/24"
        }
    }
];

// mockDigiLockerService.ts
class MockDigiLockerService {
    private isAuthenticated = false;
    private mockDelay = 1500; // Simulate network delay

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private simulateNetworkError() {
        return Math.random() < 0.1; // 10% chance of network error
    }

    async authorize(): Promise<void> {
        await this.delay(this.mockDelay);

        if (this.simulateNetworkError()) {
            throw {
                code: 'NETWORK_ERROR',
                message: 'Failed to connect to DigiLocker',
                details: 'Please check your internet connection and try again'
            };
        }

        this.isAuthenticated = true;
    }

    async fetchDocuments(): Promise<DigiLockerDocument[]> {
        if (!this.isAuthenticated) {
            throw {
                code: 'UNAUTHORIZED',
                message: 'Not authenticated with DigiLocker',
                details: 'Please connect your DigiLocker account first'
            };
        }

        await this.delay(this.mockDelay);

        if (this.simulateNetworkError()) {
            throw {
                code: 'FETCH_ERROR',
                message: 'Failed to fetch documents',
                details: 'Unable to retrieve documents from DigiLocker'
            };
        }

        return MOCK_DOCUMENTS;
    }

    async verifyDocument(docId: string): Promise<boolean> {
        await this.delay(this.mockDelay / 2);
        const doc = MOCK_DOCUMENTS.find(d => d.id === docId);
        return doc?.verificationStatus === 'VERIFIED' || false;
    }

    async downloadDocument(docId: string, onProgress?: (progress: number) => void): Promise<Blob> {
        if (!this.isAuthenticated) {
            throw {
                code: 'UNAUTHORIZED',
                message: 'Not authenticated with DigiLocker',
                details: 'Please connect your DigiLocker account first'
            };
        }

        const doc = MOCK_DOCUMENTS.find(d => d.id === docId);
        if (!doc) {
            throw {
                code: 'NOT_FOUND',
                message: 'Document not found',
                details: 'The requested document does not exist'
            };
        }

        // Simulate download progress
        const totalChunks = 10;
        for (let i = 1; i <= totalChunks; i++) {
            await this.delay(this.mockDelay / totalChunks);
            onProgress?.(Math.round((i / totalChunks) * 100));
        }

        // Create a mock PDF blob
        const mockPdfContent = `Mock PDF content for ${doc.name}`;
        return new Blob([mockPdfContent], { type: 'application/pdf' });
    }
}

export const mockDigiLockerService = new MockDigiLockerService();


