'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<boolean>;
    signUp: (name: string, email: string, password: string) => Promise<boolean>;
    signOut: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const signIn = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Sign in error:', error);
            return false;
        }
    };

    const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Sign up error:', error);
            return false;
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value: AuthContextType = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
