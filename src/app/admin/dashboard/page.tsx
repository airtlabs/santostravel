'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
// TODO: Replace this with the correct import if available in '@/types/database'
export interface Package {
    id: string;
    title: string;
    destination: string;
    category: string;
    price: number;
    duration: string;
    status: string;
    updated_at: string;
    // Add other fields as needed
}

interface DashboardStats {
    packages: {
        total: number;
        published: number;
        draft: number;
        archived?: number;
    };
    bookings: {
        total: number;
        confirmed: number;
        pending: number;
    };
    totalRevenue: number;
    conversionRate?: number | string;
}

import {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Package as PackageIcon,
    Users,
    DollarSign,
    TrendingUp,
    Calendar,
    Star
} from 'lucide-react';

const AdminDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [packages, setPackages] = useState<Package[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch packages and stats from database
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch packages
            const packagesResponse = await fetch('/api/packages');
            if (!packagesResponse.ok) {
                throw new Error('Failed to fetch packages');
            }
            const packagesData = await packagesResponse.json();

            // Fetch stats
            const statsResponse = await fetch('/api/dashboard/stats');
            if (!statsResponse.ok) {
                throw new Error('Failed to fetch stats');
            }
            const statsData = await statsResponse.json();

            setPackages(packagesData.packages || []);
            setStats(statsData.stats);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle package deletion
    const handleDeletePackage = async (packageId: string) => {
        if (!confirm('Are you sure you want to delete this package?')) {
            return;
        }

        try {
            const response = await fetch(`/api/packages/${packageId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete package');
            }

            // Refresh data after deletion
            fetchData();
        } catch (err) {
            console.error('Error deleting package:', err);
            alert('Failed to delete package');
        }
    };
    // Filter packages based on search and status
    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || pkg.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Handle package status toggle
    const togglePackageStatus = async (packageId: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'published' ? 'draft' : 'published';

            const response = await fetch(`/api/packages/${packageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update package status');
            }

            // Refresh data after status change
            fetchData();
        } catch (err) {
            console.error('Error updating package status:', err);
            alert('Failed to update package status');
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="p-5">
                                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-8 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white shadow rounded-lg">
                            <div className="p-6">
                                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                <div className="space-y-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="h-16 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="p-6">
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Dashboard</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={fetchData}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="py-4 lg:py-8">
                {/* Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 lg:mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Package Management</h1>
                            <p className="text-gray-600 text-sm lg:text-base">Manage your travel packages and bookings</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/packages/new"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 lg:px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors text-sm lg:text-base"
                            >
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Add New Package</span>
                                <span className="sm:hidden">Add Package</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                        <div className="bg-white rounded-lg shadow-sm p-6 border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Packages</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats?.packages?.total || 0}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <PackageIcon className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-gray-500">
                                    {stats?.packages?.published || 0} published, {stats?.packages?.draft || 0} drafts
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats?.bookings?.total || 0}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Users className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-gray-500">
                                    {stats?.bookings?.confirmed || 0} confirmed, {stats?.bookings?.pending || 0} pending
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                                    <p className="text-3xl font-bold text-gray-900">₹{(stats?.totalRevenue || 0).toLocaleString()}</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <DollarSign className="h-6 w-6 text-yellow-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-gray-500">
                                    From {stats?.bookings?.confirmed || 0} confirmed bookings
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats?.conversionRate || '0.00'}%</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <TrendingUp className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-gray-500">
                                    Package to booking conversion
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-white rounded-lg shadow-sm border mb-6">
                        <div className="p-4 lg:p-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center lg:justify-between">
                                {/* Search */}
                                <div className="relative flex-1 max-w-full lg:max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search packages..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                                    />
                                </div>

                                {/* Filters */}
                                <div className="flex items-center gap-3">
                                    <Filter className="h-4 w-4 text-gray-400 hidden lg:block" />
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm w-full lg:w-auto"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Packages Table */}
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="px-4 lg:px-6 py-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-900">All Packages</h2>
                        </div>

                        {/* Mobile Cards */}
                        <div className="lg:hidden">
                            {filteredPackages.map((pkg) => (
                                <div key={pkg.id} className="border-b border-gray-200 p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 text-sm">{pkg.title}</h3>
                                            <p className="text-xs text-gray-500">{pkg.destination}</p>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${pkg.status === 'published'
                                                    ? 'bg-green-100 text-green-800'
                                                    : pkg.status === 'draft'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {pkg.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                        <span>{pkg.category}</span>
                                        <span>₹{pkg.price?.toLocaleString()}</span>
                                        <span>{pkg.duration}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/packages/edit/${pkg.id}`}
                                            className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
                                        >
                                            <Edit className="h-3 w-3" />
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/package/${pkg.id}`}
                                            className="flex items-center gap-1 px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded"
                                        >
                                            <Eye className="h-3 w-3" />
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDeletePackage(pkg.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Package
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Duration
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Bookings
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Last Modified
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredPackages.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-12 text-center">
                                                <PackageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
                                                <p className="text-gray-500 mb-4">
                                                    {searchQuery || filterStatus !== 'all'
                                                        ? 'Try adjusting your search or filter criteria.'
                                                        : 'Get started by creating your first travel package.'
                                                    }
                                                </p>
                                                <Link
                                                    href="/admin/packages/new"
                                                    className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add New Package
                                                </Link>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredPackages.map((pkg) => (
                                            <tr key={pkg.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {pkg.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {pkg.destination}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {pkg.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ₹{pkg.price?.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-sm text-gray-900">
                                                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                                        {pkg.duration}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => togglePackageStatus(pkg.id, pkg.status)}
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pkg.status === 'published'
                                                            ? 'bg-green-100 text-green-800'
                                                            : pkg.status === 'draft'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                            }`}
                                                    >
                                                        {pkg.status}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                                                        0 {/* Bookings count - will be implemented later */}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-sm text-gray-900">
                                                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                                        - {/* Rating - will be implemented later */}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(pkg.updated_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/package/${pkg.id}`}
                                                            className="text-blue-600 hover:text-blue-900 p-1"
                                                            title="View Package"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/admin/packages/edit/${pkg.id}`}
                                                            className="text-green-600 hover:text-green-900 p-1"
                                                            title="Edit Package"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeletePackage(pkg.id)}
                                                            className="text-red-600 hover:text-red-900 p-1"
                                                            title="Delete Package"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link
                            href="/admin/packages/new"
                            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center">
                                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                    <Plus className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Create Package</h3>
                                    <p className="text-sm text-gray-500">Add a new travel package</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/admin/bookings"
                            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Manage Bookings</h3>
                                    <p className="text-sm text-gray-500">View and manage customer bookings</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/admin/analytics"
                            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <TrendingUp className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">View Analytics</h3>
                                    <p className="text-sm text-gray-500">Track performance and insights</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
