import { useState, useCallback } from 'react';
import { DigiLockerDocument, DigiLockerError } from '../types/documents';
import { mockDigiLockerService } from '../services/digilockerServices';

export const useDigiLocker = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [documents, setDocuments] = useState<DigiLockerDocument[]>([]);
  const [error, setError] = useState<DigiLockerError | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      await mockDigiLockerService.authorize();
      const docs = await mockDigiLockerService.fetchDocuments();
      setDocuments(docs);
      setIsConnected(true);
    } catch (err: any) {
      setError({
        code: err.code || 'CONNECTION_ERROR',
        message: err.message || 'Failed to connect to DigiLocker',
        details: err.details
      });
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const importDocument = useCallback(async (docId: string) => {
    try {
      const isVerified = await mockDigiLockerService.verifyDocument(docId);
      if (!isVerified) {
        throw {
          code: 'VERIFICATION_FAILED',
          message: 'Document verification failed',
          details: 'Unable to verify document authenticity'
        };
      }

      const doc = documents.find(d => d.id === docId);
      if (!doc) throw new Error('Document not found');

      const blob = await mockDigiLockerService.downloadDocument(docId, (progress) => {
        setDownloadProgress(prev => ({ ...prev, [docId]: progress }));
      });

      const file = new File([blob], doc.name, { type: doc.mimeType });

      return {
        file,
        metadata: {
          source: 'DigiLocker',
          issuer: doc.issuer,
          verified: true,
          docType: doc.docType,
          originalId: doc.id,
          ...doc.metadata
        }
      };
    } catch (err: any) {
      setError({
        code: err.code || 'IMPORT_ERROR',
        message: err.message || 'Failed to import document',
        details: err.details
      });
      throw err;
    } finally {
      setDownloadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[docId];
        return newProgress;
      });
    }
  }, [documents]);

  const importAllDocuments = useCallback(async () => {
    const verifiedDocs = documents.filter(doc => doc.verificationStatus === 'VERIFIED');
    const results = [];
    const errors = [];

    for (const doc of verifiedDocs) {
      try {
        const result = await importDocument(doc.id);
        results.push(result);
      } catch (err) {
        errors.push({ document: doc, error: err });
      }
    }

    return {
      successful: results,
      failed: errors,
      totalProcessed: verifiedDocs.length
    };
  }, [documents, importDocument]);

  return {
    isConnecting,
    isConnected,
    documents,
    error,
    downloadProgress,
    connect,
    importDocument,
    importAllDocuments
  };
};