'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePackages } from '@/hooks/usePackages';
import { Package } from '@/types/database';
import {
    Plus,
    Search,
    Edit,
    Eye,
    Trash2,
    ChevronDown
} from 'lucide-react';

const AdminPackagesPage = () => {
    const { packages, loading, error } = usePackages();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const filteredPackages = packages.filter((pkg: Package) => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || pkg.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                // TODO: Implement delete functionality
                alert('Delete functionality not implemented yet');
            } catch (error) {
                console.error('Error deleting package:', error);
                alert('Error deleting package. Please try again.');
            }
        }
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            draft: 'bg-gray-100 text-gray-800',
            published: 'bg-green-100 text-green-800',
            archived: 'bg-red-100 text-red-800'
        };
        return `px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`;
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Packages</h1>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 lg:py-6 gap-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Package Management</h1>
                            <p className="text-gray-600 text-sm lg:text-base">Manage your travel packages</p>
                        </div>
                        <Link
                            href="/admin/packages/new"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 lg:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
                        >
                            <Plus className="h-4 w-4" />
                            Create Package
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search packages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published' | 'archived')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 appearance-none text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 appearance-none text-sm"
                            >
                                <option value="all">All Categories</option>
                                <option value="india">India Tours</option>
                                <option value="international">International Tours</option>
                                <option value="adventure">Adventure Tours</option>
                                <option value="luxury">Luxury Tours</option>
                                <option value="budget">Budget Tours</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Packages List */}
                <div className="bg-white rounded-lg shadow-sm border">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
                            <p className="text-gray-600 mt-2">Loading packages...</p>
                        </div>
                    ) : filteredPackages.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600">No packages found matching your criteria.</p>
                        </div>
                    ) : (
                        <>
                            {/* Mobile Cards */}
                            <div className="lg:hidden">
                                {filteredPackages.map((pkg: Package) => (
                                    <div key={pkg.id} className="border-b border-gray-200 p-4 last:border-b-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900 text-sm">{pkg.title}</h3>
                                                <p className="text-xs text-gray-500">{pkg.destination}</p>
                                            </div>
                                            <span className={getStatusBadge(pkg.status)}>
                                                {pkg.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                            <span className="capitalize">{pkg.category.replace('-', ' ')}</span>
                                            <span>₹{pkg.price?.toLocaleString()}</span>
                                            <span>{pkg.duration}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/package/${pkg.id}`}
                                                className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
                                            >
                                                <Eye className="h-3 w-3" />
                                                View
                                            </Link>
                                            <Link
                                                href={`/admin/packages/edit/${pkg.id}`}
                                                className="flex items-center gap-1 px-2 py-1 text-xs text-yellow-600 hover:bg-yellow-50 rounded"
                                            >
                                                <Edit className="h-3 w-3" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(pkg.id, pkg.title)}
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
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Package
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Duration
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredPackages.map((pkg: Package) => (
                                            <tr key={pkg.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {pkg.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {pkg.destination}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="capitalize text-sm text-gray-900">
                                                        {pkg.category.replace('-', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {pkg.duration}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ₹{pkg.price.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={getStatusBadge(pkg.status)}>
                                                        {pkg.status}
                                                    </span>
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
                                                            className="text-yellow-600 hover:text-yellow-900 p-1"
                                                            title="Edit Package"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(pkg.id, pkg.title)}
                                                            className="text-red-600 hover:text-red-900 p-1"
                                                            title="Delete Package"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-xl lg:text-2xl font-bold text-gray-900">{packages.length}</div>
                        <div className="text-xs lg:text-sm text-gray-600">Total Packages</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-xl lg:text-2xl font-bold text-green-600">
                            {packages.filter(p => p.status === 'published').length}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">Published</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-xl lg:text-2xl font-bold text-gray-600">
                            {packages.filter(p => p.status === 'draft').length}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">Drafts</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-xl lg:text-2xl font-bold text-red-600">
                            {packages.filter(p => p.status === 'archived').length}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">Archived</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPackagesPage;
