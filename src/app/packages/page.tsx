'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Users, Star, Search, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { usePackages } from '@/hooks/usePackages';

const PackagesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDuration, setSelectedDuration] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedDestination, setSelectedDestination] = useState('all');
    const [statusFilter, setStatusFilter] = useState('published');
    const [sortBy, setSortBy] = useState('price-low');

    const { packages: dbPackages, loading, error } = usePackages();

    // Filter packages based on all criteria
    const filteredPackages = dbPackages.filter(pkg => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
        const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;

        const matchesDuration = selectedDuration === 'all' ||
            (selectedDuration === 'short' && parseInt(pkg.duration) <= 3) ||
            (selectedDuration === 'medium' && parseInt(pkg.duration) >= 4 && parseInt(pkg.duration) <= 7) ||
            (selectedDuration === 'long' && parseInt(pkg.duration) >= 8);

        const matchesPrice = (!priceRange.min || pkg.price >= parseInt(priceRange.min)) &&
            (!priceRange.max || pkg.price <= parseInt(priceRange.max));

        const matchesDestination = selectedDestination === 'all' ||
            pkg.destination.toLowerCase().includes(selectedDestination.toLowerCase());

        return matchesSearch && matchesCategory && matchesStatus && matchesDuration && matchesPrice && matchesDestination;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'duration-short': return parseInt(a.duration) - parseInt(b.duration);
            case 'duration-long': return parseInt(b.duration) - parseInt(a.duration);
            case 'name': return a.title.localeCompare(b.title);
            default: return 0;
        }
    });

    // Get unique destinations for filter
    const destinations = [...new Set(dbPackages.map(pkg => pkg.destination.split(',')[0].trim()))];

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedDuration('all');
        setPriceRange({ min: '', max: '' });
        setSelectedDestination('all');
        setSortBy('price-low');
    };

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

            {/* Main Content - Sidebar Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Filters */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <Filter className="h-5 w-5 mr-2 text-gray-400" />
                                    Filters
                                </h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Clear All
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search packages..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="india">India Tours</option>
                                    <option value="international">International Tours</option>
                                    <option value="adventure">Adventure Tours</option>
                                    <option value="luxury">Luxury Tours</option>
                                    <option value="budget">Budget Tours</option>
                                </select>
                            </div>

                            {/* Destination Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                                <select
                                    value={selectedDestination}
                                    onChange={(e) => setSelectedDestination(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="all">All Destinations</option>
                                    {destinations.map(dest => (
                                        <option key={dest} value={dest}>{dest}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Duration Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                <select
                                    value={selectedDuration}
                                    onChange={(e) => setSelectedDuration(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="all">Any Duration</option>
                                    <option value="short">1-3 Days</option>
                                    <option value="medium">4-7 Days</option>
                                    <option value="long">8+ Days</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="published">Published Only</option>
                                    <option value="all">All Packages</option>
                                    <option value="draft">Draft Only</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Package Listings */}
                    <div className="lg:w-3/4">
                        {/* Sort and Results Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="text-sm text-gray-600">
                                    Showing {filteredPackages.length} of {dbPackages.length} packages
                                    {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    >
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="duration-short">Duration: Short to Long</option>
                                        <option value="duration-long">Duration: Long to Short</option>
                                        <option value="name">Name: A to Z</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Package Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{filteredPackages.map((pkg) => (
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
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagesPage;
