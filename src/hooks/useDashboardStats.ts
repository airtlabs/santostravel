import { useState, useEffect } from 'react';

interface DashboardStats {
    packages: {
        total: number;
        published: number;
        draft: number;
    };
    bookings: {
        total: number;
        confirmed: number;
        pending: number;
        revenue: number;
    };
    totalRevenue: number;
    conversionRate: string;
}

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/dashboard/stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }

                const data = await response.json();
                setStats(data.stats);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return { stats, loading, error };
}
