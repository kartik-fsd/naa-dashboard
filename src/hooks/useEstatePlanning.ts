// src/hooks/useEstatePlanning.tsx
import { useState, useEffect } from 'react';
import type {
    PlanningProgressItem,
    Asset,
    Nominee,
    EstatePlanningProgress,
    EstateValidationIssue
} from '../types/estate-palnning';
import { getEstatePlanningData } from '../services/estateplanningServices';

export const useEstatePlanning = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [planningProgress, setPlanningProgress] = useState<PlanningProgressItem[]>([]);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [nominees, setNominees] = useState<Nominee[]>([]);
    const [progress, setProgress] = useState<EstatePlanningProgress | null>(null);
    const [validationIssues, setValidationIssues] = useState<EstateValidationIssue[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getEstatePlanningData();

                setPlanningProgress(data.planningProgress);
                setAssets(data.assets);
                setNominees(data.nominees);
                setProgress(data.progress);
                setValidationIssues(data.validationIssues);

            } catch (err) {
                setError('Failed to load estate planning data. Please try again later.');
                console.error('Error fetching estate planning data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate overall progress percentage
    const calculateOverallProgress = (): number => {
        if (!planningProgress.length) return 0;

        const total = planningProgress.length;
        const completed = planningProgress.filter(item => item.status === 'complete').length;
        const inProgress = planningProgress.filter(item => item.status === 'inprogress');

        const completedPercentage = (completed / total) * 100;
        const inProgressPercentage = inProgress.reduce(
            (acc, item) => acc + ((item.progress || 0) / 100) / total, 0
        ) * 100;

        return Math.round(completedPercentage + inProgressPercentage);
    };

    // Update a planning progress item
    const updatePlanningProgress = (updatedItem: PlanningProgressItem) => {
        setPlanningProgress(prev =>
            prev.map(item =>
                item.title === updatedItem.title ? updatedItem : item
            )
        );
    };

    // Add a new asset
    const addAsset = async (newAsset: Omit<Asset, 'id'>) => {
        // Here you would typically make an API call to create the asset
        // For now, just simulate it with a mock implementation
        try {
            setIsLoading(true);

            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockId = `asset-${Date.now()}`;
            const createdAsset = { ...newAsset, id: mockId };

            setAssets(prev => [...prev, createdAsset]);
            return createdAsset;
        } catch (err) {
            setError('Failed to add asset. Please try again later.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Add a new nominee
    const addNominee = async (newNominee: Omit<Nominee, 'id'>) => {
        try {
            setIsLoading(true);

            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockId = `nominee-${Date.now()}`;
            const createdNominee = { ...newNominee, id: mockId };

            setNominees(prev => [...prev, createdNominee]);
            return createdNominee;
        } catch (err) {
            setError('Failed to add nominee. Please try again later.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        planningProgress,
        assets,
        nominees,
        progress,
        validationIssues,
        calculateOverallProgress,
        updatePlanningProgress,
        addAsset,
        addNominee
    };
};