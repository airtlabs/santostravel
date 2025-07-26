'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '@/contexts/AuthContext';

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');
    const isSignInPage = pathname === '/signin';

    return (
        <AuthProvider>
            {isAdminPage || isSignInPage ? (
                // Admin pages and signin page - no header/footer, full height
                <div className="h-screen">
                    {children}
                </div>
            ) : (
                // Regular pages - with header and footer
                <>
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </>
            )}
        </AuthProvider>
    );
};

export default ConditionalLayout;
