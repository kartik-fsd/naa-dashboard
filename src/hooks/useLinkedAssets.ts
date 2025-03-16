// src/hooks/useLinkedAssets.ts
import { useState, useEffect } from 'react';
import { Asset } from '../types/assets';

interface UseLinkedAssetsReturn {
    linkedAssets: string[];
    availableAssets: Asset[];
    markAsLinked: (assetId: string) => void;
    removeLinked: (assetId: string) => void;
    isLinked: (assetId: string) => boolean;
}

/**
 * Custom hook to track and manage linked assets
 * @param initialAssets - The initial array of assets
 * @returns Methods and state to manage linked assets
 */
export const useLinkedAssets = (initialAssets: Asset[]): UseLinkedAssetsReturn => {
    // Get linked assets from localStorage if available
    const savedLinkedAssets = localStorage.getItem('linkedAssets');
    const initialLinkedAssets = savedLinkedAssets ? JSON.parse(savedLinkedAssets) : [];

    const [linkedAssets, setLinkedAssets] = useState<string[]>(initialLinkedAssets);
    const [availableAssets, setAvailableAssets] = useState<Asset[]>([]);

    // Update available assets whenever linked assets change
    useEffect(() => {
        const filteredAssets = initialAssets.filter(
            (asset) => !linkedAssets.includes(asset.id)
        );
        setAvailableAssets(filteredAssets);

        // Save to localStorage for persistence
        localStorage.setItem('linkedAssets', JSON.stringify(linkedAssets));
    }, [linkedAssets, initialAssets]);

    /**
     * Mark an asset as linked
     * @param assetId - The ID of the asset to mark as linked
     */
    const markAsLinked = (assetId: string) => {
        if (!linkedAssets.includes(assetId)) {
            setLinkedAssets([...linkedAssets, assetId]);
        }
    };

    /**
     * Remove an asset from the linked assets list
     * @param assetId - The ID of the asset to unlink
     */
    const removeLinked = (assetId: string) => {
        setLinkedAssets(linkedAssets.filter(id => id !== assetId));
    };

    /**
     * Check if an asset is linked
     * @param assetId - The ID of the asset to check
     * @returns Boolean indicating if the asset is linked
     */
    const isLinked = (assetId: string) => {
        return linkedAssets.includes(assetId);
    };

    return {
        linkedAssets,
        availableAssets,
        markAsLinked,
        removeLinked,
        isLinked
    };
};