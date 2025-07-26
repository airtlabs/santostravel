'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
    redirectTo?: string;
}

const ProtectedRoute = ({
    children,
    requireAdmin = false,
    redirectTo = '/signin'
}: ProtectedRouteProps) => {
    const { loading, isAuthenticated, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push(redirectTo);
                return;
            }

            if (requireAdmin && !isAdmin) {
                router.push('/');
                return;
            }
        }
    }, [loading, isAuthenticated, isAdmin, requireAdmin, router, redirectTo]);

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render children if not authenticated or not admin when required
    if (!isAuthenticated || (requireAdmin && !isAdmin)) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
