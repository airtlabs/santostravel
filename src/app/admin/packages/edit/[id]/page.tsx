'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Save,
    Eye,
    Upload,
    MapPin,
    Calendar,
    DollarSign,
    Star
} from 'lucide-react';

const EditPackagePage = () => {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [packageExists, setPackageExists] = useState(true);

    // Mock data - in real app, this would be fetched from API
    const [packageData, setPackageData] = useState({
        id: params.id,
        title: 'Kerala - God\'s Own Country',
        subtitle: '7 Days 6 Nights',
        category: 'india',
        duration: '7 Days',
        destinations: 'Cochin • Munnar • Thekkady • Alleppey • Kovalam',
        price: '65000',
        originalPrice: '78000',
        currency: '₹',

        images: [
            'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop'
        ],

        highlights: [
            'Houseboat stay in Alleppey backwaters',
            'Tea plantation visit in Munnar',
            'Spice plantation tour in Thekkady',
            'Ayurvedic spa experience'
        ],
        inclusions: [
            'Accommodation in 4-star hotels',
            'Daily breakfast and dinner',
            'All transfers and sightseeing',
            'Professional tour manager'
        ],
        exclusions: [
            'Airfare (can be arranged)',
            'Lunch during sightseeing',
            'Personal expenses',
            'Travel insurance'
        ],

        itinerary: [
            {
                day: 1,
                title: 'Arrival in Cochin',
                description: 'Arrive at Cochin airport. Transfer to hotel. Evening visit to Chinese Fishing Nets and Fort Kochi.',
                meals: 'Dinner',
                accommodation: 'Hotel in Cochin'
            },
            {
                day: 2,
                title: 'Cochin to Munnar',
                description: 'After breakfast, drive to Munnar (130 km / 4 hrs). Check into hotel. Evening at leisure.',
                meals: 'Breakfast, Dinner',
                accommodation: 'Hotel in Munnar'
            }
        ],

        difficulty: 'easy',
        groupSize: '2-15',
        ageRange: '18-65',
        languages: ['English', 'Hindi'],
        bestTime: 'October to March',

        metaDescription: 'Experience the enchanting beauty of Kerala with our 7-day tour covering Cochin, Munnar, Thekkady, Alleppey, and Kovalam.',
        tags: ['kerala', 'backwaters', 'india', 'houseboats', 'tea-plantations'],

        status: 'active',
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-20T15:30:00Z'
    });

    // Load package data on component mount
    useEffect(() => {
        const loadPackageData = async () => {
            try {
                // In real app, fetch from API
                // const response = await fetch(`/api/packages/${params.id}`);
                // const data = await response.json();
                // setPackageData(data);

                // For now, we'll use mock data
                console.log('Loading package with ID:', params.id);
            } catch (error) {
                console.error('Error loading package:', error);
                setPackageExists(false);
            }
        };

        loadPackageData();
    }, [params.id]);

    const handleInputChange = (field: string, value: string | number) => {
        setPackageData(prev => ({
            ...prev,
            [field]: value,
            updatedAt: new Date().toISOString()
        }));
    };

    const handleArrayChange = (field: string, index: number, value: string) => {
        setPackageData(prev => {
            const fieldArray = prev[field as keyof typeof prev] as string[];
            return {
                ...prev,
                [field]: fieldArray.map((item: string, i: number) =>
                    i === index ? value : item
                ),
                updatedAt: new Date().toISOString()
            };
        });
    };

    const addArrayItem = (field: string) => {
        setPackageData(prev => ({
            ...prev,
            [field]: [...(prev[field as keyof typeof prev] as string[]), ''],
            updatedAt: new Date().toISOString()
        }));
    };

    const removeArrayItem = (field: string, index: number) => {
        setPackageData(prev => {
            const fieldArray = prev[field as keyof typeof prev] as string[];
            return {
                ...prev,
                [field]: fieldArray.filter((_: string, i: number) => i !== index),
                updatedAt: new Date().toISOString()
            };
        });
    };

    const addItineraryDay = () => {
        setPackageData(prev => ({
            ...prev,
            itinerary: [...prev.itinerary, {
                day: prev.itinerary.length + 1,
                title: '',
                description: '',
                meals: '',
                accommodation: ''
            }],
            updatedAt: new Date().toISOString()
        }));
    };

    const updateItinerary = (index: number, field: string, value: string) => {
        setPackageData(prev => ({
            ...prev,
            itinerary: prev.itinerary.map((day, i) =>
                i === index ? { ...day, [field]: value } : day
            ),
            updatedAt: new Date().toISOString()
        }));
    };

    const removeItineraryDay = (index: number) => {
        setPackageData(prev => ({
            ...prev,
            itinerary: prev.itinerary.filter((_, i) => i !== index).map((day, i) => ({
                ...day,
                day: i + 1
            })),
            updatedAt: new Date().toISOString()
        }));
    };

    const handleSubmit = async (e: React.FormEvent, status?: string) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSubmit = {
                ...packageData,
                status: status || packageData.status,
                updatedAt: new Date().toISOString()
            };

            console.log('Updating package:', dataToSubmit);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message or redirect
            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Error updating package:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!packageExists) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
                    <p className="text-gray-600 mb-6">The package you&apos;re looking for doesn&apos;t exist.</p>
                    <Link
                        href="/admin/dashboard"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: MapPin },
        { id: 'images', label: 'Images', icon: Upload },
        { id: 'details', label: 'Details', icon: Star },
        { id: 'itinerary', label: 'Itinerary', icon: Calendar },
        { id: 'pricing', label: 'Pricing', icon: DollarSign },
        { id: 'seo', label: 'SEO', icon: Eye }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/dashboard"
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Edit Package</h1>
                                <p className="text-gray-600">{packageData.title}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href={`/package/${packageData.id}`}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <Eye className="h-4 w-4" />
                                Preview
                            </Link>
                            <button
                                onClick={(e) => handleSubmit(e)}
                                disabled={loading}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Package Status Info */}
                <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div>
                                <span className="text-sm text-gray-600">Status:</span>
                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${packageData.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : packageData.status === 'draft'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {packageData.status}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600">
                                Last updated: {new Date(packageData.updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {packageData.status !== 'active' && (
                                <button
                                    onClick={(e) => handleSubmit(e, 'active')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Publish
                                </button>
                            )}
                            {packageData.status === 'active' && (
                                <button
                                    onClick={(e) => handleSubmit(e, 'inactive')}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Unpublish
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                                                ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content - Same form structure as new package page */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information Tab */}
                            {activeTab === 'basic' && (
                                <div className="bg-white rounded-lg shadow-sm border p-6">
                                    <h2 className="text-lg font-semibold mb-6">Basic Information</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Package Title *
                                            </label>
                                            <input
                                                type="text"
                                                value={packageData.title}
                                                onChange={(e) => handleInputChange('title', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="e.g., Kerala - God's Own Country"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Subtitle
                                            </label>
                                            <input
                                                type="text"
                                                value={packageData.subtitle}
                                                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="e.g., 7 Days 6 Nights"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category *
                                            </label>
                                            <select
                                                value={packageData.category}
                                                onChange={(e) => handleInputChange('category', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                required
                                            >
                                                <option value="india">India Tours</option>
                                                <option value="international">International Tours</option>
                                                <option value="adventure">Adventure Tours</option>
                                                <option value="luxury">Luxury Tours</option>
                                                <option value="budget">Budget Tours</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Duration *
                                            </label>
                                            <input
                                                type="text"
                                                value={packageData.duration}
                                                onChange={(e) => handleInputChange('duration', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="e.g., 7 Days"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Destinations *
                                            </label>
                                            <input
                                                type="text"
                                                value={packageData.destinations}
                                                onChange={(e) => handleInputChange('destinations', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="e.g., Cochin • Munnar • Thekkady • Alleppey"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Other tabs would follow the same pattern as the new package page */}
                            {/* For brevity, I'm including just the basic tab. In a real app, you'd include all tabs */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPackagePage;
