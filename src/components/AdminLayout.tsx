'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Plus,
    Search,
    Bell
} from 'lucide-react';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, signOut } = useAuth();

    const navigation = [
        {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
            current: pathname === '/admin/dashboard'
        },
        {
            name: 'Packages',
            href: '/admin/packages',
            icon: Package,
            current: pathname.startsWith('/admin/packages')
        },
        {
            name: 'Bookings',
            href: '/admin/bookings',
            icon: Users,
            current: pathname.startsWith('/admin/bookings')
        },
        {
            name: 'Analytics',
            href: '/admin/analytics',
            icon: BarChart3,
            current: pathname.startsWith('/admin/analytics')
        },
        {
            name: 'Settings',
            href: '/admin/settings',
            icon: Settings,
            current: pathname.startsWith('/admin/settings')
        }
    ];

    const handleSignOut = async () => {
        const confirmed = window.confirm('Are you sure you want to sign out?');
        if (confirmed) {
            try {
                signOut();
                // Redirect to signin page
                router.push('/signin');
            } catch (error) {
                console.error('Sign out error:', error);
            }
        }
    };

    return (
        <ProtectedRoute requireAdmin={true}>
            <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900">
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-700">
                    <Link href="/admin/dashboard" className="flex items-center">
                        <img
                            src="/santos-logo.png"
                            alt="Santos.travel Admin"
                            className="h-8 w-auto"
                        />
                        <span className="ml-3 text-white font-semibold text-lg">Admin</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col px-4 py-6">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${item.current
                                                        ? 'bg-yellow-600 text-white'
                                                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                                                    }`}
                                            >
                                                <Icon className="h-5 w-5 shrink-0" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>

                        {/* Quick Actions */}
                        <li className="mt-auto">
                            <div className="border-t border-slate-700 pt-6">
                                <Link
                                    href="/admin/packages/new"
                                    className="group flex gap-x-3 rounded-md bg-yellow-600 hover:bg-yellow-700 p-2 text-sm leading-6 font-semibold text-white transition-colors"
                                >
                                    <Plus className="h-5 w-5 shrink-0" />
                                    New Package
                                </Link>
                            </div>
                        </li>

                        {/* User Menu */}
                        <li>
                            <div className="border-t border-slate-700 pt-6">
                                <Link
                                    href="/"
                                    className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                >
                                    <LogOut className="h-5 w-5 shrink-0" />
                                    Back to Site
                                </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main content */}
            <div className="pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Search */}
                        <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-start">
                            <div className="w-full max-w-lg lg:max-w-xs">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full rounded-md border-0 bg-gray-50 py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                        placeholder="Search packages, bookings..."
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Notifications */}
                            <button
                                type="button"
                                className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <span className="sr-only">View notifications</span>
                                <Bell className="h-6 w-6" />
                                {/* Notification badge */}
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                                    3
                                </span>
                            </button>

                            {/* User menu */}
                            <div className="flex items-center gap-x-4">
                                <div className="hidden lg:flex lg:flex-col lg:items-end lg:leading-6">
                                    <div className="font-semibold text-gray-900">{user?.name || 'Admin User'}</div>
                                    <div className="text-xs text-gray-600">{user?.email || 'admin@santos.travel'}</div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold">
                                    {user?.name?.[0]?.toUpperCase() || 'A'}
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-x-2 text-gray-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors border border-gray-200 hover:border-red-200"
                                    title="Sign Out"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="text-sm hidden sm:block">Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main>
                    {children}
                </main>
            </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminLayout;
