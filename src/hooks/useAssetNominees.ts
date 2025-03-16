// src/hooks/useAssetNominees.ts
import { useState, useEffect } from 'react';
import { Nominee } from '../types/nomine';

interface AssetNomineeMapping {
  assetId: string;
  nomineeId: string;
  status: 'active' | 'pending' | 'error';
  errorDetails?: string;
  dateAssigned: string;
  lastVerified?: string;
  sharePercentage?: number;
}

interface UseAssetNomineesReturn {
  assetNominees: AssetNomineeMapping[];
  assignNomineeToAsset: (assetId: string, nomineeId: string, sharePercentage?: number) => void;
  removeNomineeFromAsset: (assetId: string, nomineeId: string) => void;
  updateAssetNominee: (assetId: string, nomineeId: string, updates: Partial<AssetNomineeMapping>) => void;
  getNomineeForAsset: (assetId: string) => AssetNomineeMapping | undefined;
  getNomineeStatusForAsset: (assetId: string) => 'active' | 'pending' | 'error' | 'none';
  getAssetsForNominee: (nomineeId: string) => AssetNomineeMapping[];
  getNomineeDetails: (mappings: AssetNomineeMapping[], nominees: Nominee[]) =>
    (AssetNomineeMapping & { nominee: Nominee | undefined })[];
}

/**
 * Custom hook to manage nominee assignments to assets
 */
export const useAssetNominees = (): UseAssetNomineesReturn => {
  // Try to load existing mappings from localStorage
  const savedMappings = localStorage.getItem('assetNominees');
  const initialMappings: AssetNomineeMapping[] = savedMappings
    ? JSON.parse(savedMappings)
    : [];

  const [assetNominees, setAssetNominees] = useState<AssetNomineeMapping[]>(initialMappings);

  // Update localStorage whenever mappings change
  useEffect(() => {
    localStorage.setItem('assetNominees', JSON.stringify(assetNominees));
  }, [assetNominees]);

  /**
   * Assign a nominee to an asset
   */
  const assignNomineeToAsset = (assetId: string, nomineeId: string, sharePercentage = 100) => {
    // Check if this asset already has this nominee
    const existingMapping = assetNominees.find(
      mapping => mapping.assetId === assetId && mapping.nomineeId === nomineeId
    );

    if (existingMapping) {
      // Update the existing mapping instead of creating a duplicate
      updateAssetNominee(assetId, nomineeId, {
        status: 'active',
        sharePercentage,
        dateAssigned: new Date().toISOString(),
        lastVerified: new Date().toISOString()
      });
      return;
    }

    // Create new mapping
    const newMapping: AssetNomineeMapping = {
      assetId,
      nomineeId,
      status: 'active',
      dateAssigned: new Date().toISOString(),
      lastVerified: new Date().toISOString(),
      sharePercentage
    };

    setAssetNominees(prev => [...prev, newMapping]);
  };

  /**
   * Remove a nominee from an asset
   */
  const removeNomineeFromAsset = (assetId: string, nomineeId: string) => {
    setAssetNominees(prev =>
      prev.filter(mapping =>
        !(mapping.assetId === assetId && mapping.nomineeId === nomineeId)
      )
    );
  };

  /**
   * Update an existing asset-nominee mapping
   */
  const updateAssetNominee = (
    assetId: string,
    nomineeId: string,
    updates: Partial<AssetNomineeMapping>
  ) => {
    setAssetNominees(prev =>
      prev.map(mapping => {
        if (mapping.assetId === assetId && mapping.nomineeId === nomineeId) {
          return { ...mapping, ...updates };
        }
        return mapping;
      })
    );
  };

  /**
   * Get the nominee mapping for a specific asset
   */
  const getNomineeForAsset = (assetId: string) => {
    return assetNominees.find(mapping => mapping.assetId === assetId);
  };

  /**
   * Get all assets assigned to a specific nominee
   */
  const getAssetsForNominee = (nomineeId: string) => {
    return assetNominees.filter(mapping => mapping.nomineeId === nomineeId);
  };

  /**
   * Get the nominee status for a specific asset
   */
  const getNomineeStatusForAsset = (assetId: string): 'active' | 'pending' | 'error' | 'none' => {
    const mapping = getNomineeForAsset(assetId);
    if (!mapping) return 'none';
    return mapping.status;
  };

  /**
   * Combine nominee mappings with full nominee details
   */
  const getNomineeDetails = (
    mappings: AssetNomineeMapping[],
    nominees: Nominee[]
  ) => {
    return mappings.map(mapping => ({
      ...mapping,
      nominee: nominees.find(n => n.id === mapping.nomineeId)
    }));
  };

  return {
    assetNominees,
    assignNomineeToAsset,
    removeNomineeFromAsset,
    updateAssetNominee,
    getNomineeForAsset,
    getNomineeStatusForAsset,
    getAssetsForNominee,
    getNomineeDetails
  };
};