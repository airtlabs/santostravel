'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Users, Star, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { usePackages } from '@/hooks/usePackages';

const PackagesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('published');

    const { packages: dbPackages, loading, error } = usePackages();

    // Filter packages based on search, category, and status
    const filteredPackages = dbPackages.filter(pkg => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedFilter === 'all' || pkg.category === selectedFilter;
        const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Handle loading and error states
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading packages...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading packages: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Tour Packages</h1>
                    <p className="text-gray-600">Discover amazing destinations with our curated travel packages</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search packages, destinations, descriptions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <Filter className="h-4 w-4 text-gray-400" />

                            {/* Category Filter */}
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                <option value="india">India Tours</option>
                                <option value="international">International Tours</option>
                                <option value="adventure">Adventure Tours</option>
                                <option value="luxury">Luxury Tours</option>
                                <option value="budget">Budget Tours</option>
                            </select>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            >
                                <option value="published">Published Only</option>
                                <option value="all">All Packages</option>
                                <option value="draft">Draft Only</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {filteredPackages.length} of {dbPackages.length} packages
                        {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
                        {selectedFilter !== 'all' && <span> in {selectedFilter} category</span>}
                        {statusFilter !== 'published' && <span> with {statusFilter} status</span>}
                    </div>
                </div>
            </div>

            {/* Package Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPackages.map((pkg) => (
                        <Link key={pkg.id} href={`/package/${pkg.id}`} className="group">
                            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
                                {/* Package Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop'}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium">4.5</span>
                                    </div>
                                    {/* Status Badge */}
                                    <div className={`absolute top-4 left-4 text-white text-xs px-2 py-1 rounded-full ${pkg.status === 'published' ? 'bg-green-500' :
                                        pkg.status === 'draft' ? 'bg-yellow-500' :
                                            'bg-gray-500'
                                        }`}>
                                        {pkg.status === 'published' ? 'AVAILABLE' :
                                            pkg.status === 'draft' ? 'DRAFT' :
                                                'ARCHIVED'}
                                    </div>
                                    {/* Category Badge */}
                                    <div className="absolute bottom-4 left-4 bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
                                        {pkg.category.toUpperCase()}
                                    </div>
                                </div>

                                {/* Package Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                                        {pkg.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {pkg.description || pkg.duration}
                                    </p>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                            <span>{pkg.destination}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                                <span>{pkg.duration}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-2 text-gray-400" />
                                                <span>Max {pkg.max_participants}</span>
                                            </div>
                                        </div>

                                        {/* Best Time */}
                                        <div className="flex items-center justify-end text-sm text-gray-600">
                                            <span className="text-xs text-gray-500">
                                                Best time: {pkg.best_time || 'Any time'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {pkg.highlights && pkg.highlights.slice(0, 3).map((highlight, index) => (
                                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    {highlight}
                                                </span>
                                            ))}
                                            {pkg.highlights && pkg.highlights.length > 3 && (
                                                <span className="text-xs text-gray-500">+{pkg.highlights.length - 3} more</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price and CTA */}
                                    <div className="border-t pt-4 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-green-600">
                                                    ₹{pkg.price.toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">per person</p>
                                        </div>
                                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredPackages.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No packages found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackagesPage;
