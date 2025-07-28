'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PackageService } from '@/services/packageService';
import {
    ArrowLeft,
    Save,
    Eye,
    Plus,
    Trash2,
    Upload,
    MapPin,
    Calendar,
    DollarSign,
    Star
} from 'lucide-react';

const NewPackagePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [uploadedImages, setUploadedImages] = useState<Array<{ file: File, preview: string, name: string }>>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState(false);

    const [packageData, setPackageData] = useState({
        // Basic Information
        title: '',
        description: '',
        category: 'india',
        duration: '',
        destination: '',
        price: 0,
        status: 'draft',

        // Images
        images: [] as string[],

        // Details
        highlights: [''],
        inclusions: [''],
        exclusions: [''],

        // Additional required fields
        booking_deadline: '',
        max_participants: 10,
        best_time: '',
        pickup_location: '',

        // Itinerary
        itinerary: [
            {
                day: 1,
                title: '',
                description: '',
                meals: '',
                accommodation: ''
            }
        ],

        // Additional Details
        groupSize: '',
        ageRange: '',
        languages: ['English'],
        bestTime: '',

        // SEO and Meta
        metaDescription: '',
        tags: ['']
    });

    const handleInputChange = (field: string, value: string | number) => {
        setPackageData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleArrayChange = (field: string, index: number, value: string) => {
        setPackageData(prev => {
            const fieldArray = prev[field as keyof typeof prev] as string[];
            return {
                ...prev,
                [field]: fieldArray.map((item: string, i: number) =>
                    i === index ? value : item
                )
            };
        });
    };

    const addArrayItem = (field: string) => {
        setPackageData(prev => ({
            ...prev,
            [field]: [...(prev[field as keyof typeof prev] as string[]), '']
        }));
    };

    const removeArrayItem = (field: string, index: number) => {
        setPackageData(prev => {
            const fieldArray = prev[field as keyof typeof prev] as string[];
            return {
                ...prev,
                [field]: fieldArray.filter((_: string, i: number) => i !== index)
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
            }]
        }));
    };

    const updateItinerary = (index: number, field: string, value: string) => {
        setPackageData(prev => ({
            ...prev,
            itinerary: prev.itinerary.map((day, i) =>
                i === index ? { ...day, [field]: value } : day
            )
        }));
    };

    const removeItineraryDay = (index: number) => {
        setPackageData(prev => ({
            ...prev,
            itinerary: prev.itinerary.filter((_, i) => i !== index).map((day, i) => ({
                ...day,
                day: i + 1
            }))
        }));
    };

    // Image upload functions
    const handleImageUpload = (files: FileList) => {
        const newImages = Array.from(files).map(file => {
            const reader = new FileReader();
            return new Promise<{ file: File, preview: string, name: string }>((resolve) => {
                reader.onload = (e) => resolve({
                    file,
                    preview: e.target?.result as string,
                    name: file.name
                });
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newImages).then(images => {
            setUploadedImages(prev => [...prev, ...images]);
            setImageFiles(prev => [...prev, ...Array.from(files)]);

            // Convert to base64 strings for package data
            const imageUrls = images.map(img => img.preview);
            setPackageData(prev => ({
                ...prev,
                images: [...prev.images, ...imageUrls]
            }));
        });
    };

    const removeImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setPackageData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent, status: string = 'draft') => {
        e.preventDefault();
        setLoading(true);

        try {
            // Convert data to match database schema
            const dataToSubmit = {
                title: packageData.title,
                description: packageData.description,
                price: Number(packageData.price),
                duration: packageData.duration,
                destination: packageData.destination,
                category: packageData.category,
                status: status as 'draft' | 'published' | 'archived',
                images: packageData.images || [],
                itinerary: packageData.itinerary.map(day => ({
                    day: day.day,
                    title: day.title,
                    description: day.description,
                    activities: [], // or populate as needed
                    meals: day.meals
                        ? day.meals.split(',').map(m => m.trim()).filter(Boolean)
                        : [],
                    accommodation: day.accommodation
                })),
                inclusions: packageData.inclusions.filter(inc => inc.trim() !== ''),
                exclusions: packageData.exclusions.filter(exc => exc.trim() !== ''),
                booking_deadline: packageData.booking_deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now if not specified
                max_participants: packageData.max_participants,
                best_time: packageData.best_time || 'All year',
                pickup_location: packageData.pickup_location || 'TBD',
                highlights: packageData.highlights.filter(highlight => highlight.trim() !== ''),
            };

            console.log('Submitting package:', dataToSubmit);

            // Create package using PackageService
            const newPackage = await PackageService.create(dataToSubmit);
            console.log('Package created successfully:', newPackage);

            // Redirect to dashboard
            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Error creating package:', error);
            alert('Error creating package. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                                <h1 className="text-2xl font-bold text-gray-900">Create New Package</h1>
                                <p className="text-gray-600">Add a new travel package to your catalog</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={(e) => handleSubmit(e, 'draft')}
                                disabled={loading}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Save Draft
                            </button>
                            <button
                                onClick={(e) => handleSubmit(e, 'published')}
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <Save className="h-4 w-4" />
                                Publish Package
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

                    {/* Main Content */}
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
                                                Description
                                            </label>
                                            <textarea
                                                value={packageData.description}
                                                onChange={(e) => handleInputChange('description', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="Detailed description of the package"
                                                rows={3}
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
                                                Destination *
                                            </label>
                                            <input
                                                type="text"
                                                value={packageData.destination}
                                                onChange={(e) => handleInputChange('destination', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="e.g., Kerala, India"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Images Tab */}
                            {activeTab === 'images' && (
                                <div className="bg-white rounded-lg shadow-sm border p-6">
                                    <h2 className="text-lg font-semibold mb-6">Package Images</h2>

                                    <div className="space-y-6">
                                        {/* Upload Area */}
                                        <div
                                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                                                    ? 'border-yellow-500 bg-yellow-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                        >
                                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                Upload Package Images
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Drag and drop your images here, or click to select files
                                            </p>
                                            <input
                                                type="file"
                                                id="image-upload"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg cursor-pointer transition-colors"
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                Choose Images
                                            </label>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Supports: JPG, PNG, GIF (Max 5MB each)
                                            </p>
                                        </div>

                                        {/* Uploaded Images Preview */}
                                        {uploadedImages.length > 0 && (
                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">
                                                    Uploaded Images ({uploadedImages.length})
                                                </h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    {uploadedImages.map((image, index) => (
                                                        <div key={index} className="relative group">
                                                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                                                                <img
                                                                    src={image.preview}
                                                                    alt={`Upload ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeImage(index)}
                                                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                            <p className="text-xs text-gray-600 mt-2 truncate">
                                                                {image.name}
                                                            </p>
                                                            {index === 0 && (
                                                                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                                                    Main
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Instructions */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-blue-900 mb-2">📸 Image Guidelines:</h4>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>• Upload high-quality images (minimum 800x600)</li>
                                                <li>• First image will be used as the main package image</li>
                                                <li>• Include diverse shots: destinations, activities, accommodations</li>
                                                <li>• Avoid images with watermarks or low resolution</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Details Tab */}
                            {activeTab === 'details' && (
                                <div className="bg-white rounded-lg shadow-sm border p-6">
                                    <h2 className="text-lg font-semibold mb-6">Package Details</h2>

                                    <div className="space-y-6">
                                        {/* Highlights */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tour Highlights
                                            </label>
                                            <div className="space-y-2">
                                                {packageData.highlights.map((highlight, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={highlight}
                                                            onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                            placeholder="e.g., Houseboat stay in backwaters"
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeArrayItem('highlights', index)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addArrayItem('highlights')}
                                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add Highlight
                                                </button>
                                            </div>
                                        </div>

                                        {/* Inclusions */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                What&apos;s Included
                                            </label>
                                            <div className="space-y-2">
                                                {packageData.inclusions.map((inclusion, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={inclusion}
                                                            onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                            placeholder="e.g., Accommodation in 4-star hotels"
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeArrayItem('inclusions', index)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addArrayItem('inclusions')}
                                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add Inclusion
                                                </button>
                                            </div>
                                        </div>

                                        {/* Exclusions */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                What&apos;s Not Included
                                            </label>
                                            <div className="space-y-2">
                                                {packageData.exclusions.map((exclusion, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={exclusion}
                                                            onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                            placeholder="e.g., Airfare (can be arranged)"
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeArrayItem('exclusions', index)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addArrayItem('exclusions')}
                                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add Exclusion
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Itinerary Tab */}
                            {activeTab === 'itinerary' && (
                                <div className="bg-white rounded-lg shadow-sm border p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-semibold">Detailed Itinerary</h2>
                                        <button
                                            type="button"
                                            onClick={addItineraryDay}
                                            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Day
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {packageData.itinerary.map((day, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="font-medium text-gray-900">Day {day.day}</h3>
                                                    {packageData.itinerary.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItineraryDay(index)}
                                                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Day Title *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={day.title}
                                                            onChange={(e) => updateItinerary(index, 'title', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                            placeholder="e.g., Arrival in Cochin"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Description *
                                                        </label>
                                                        <textarea
                                                            value={day.description}
                                                            onChange={(e) => updateItinerary(index, 'description', e.target.value)}
                                                            rows={3}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                            placeholder="Detailed description of the day's activities..."
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Meals
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={day.meals}
                                                            onChange={(e) => updateItinerary(index, 'meals', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                            placeholder="e.g., Breakfast, Dinner"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Accommodation
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={day.accommodation}
                                                            onChange={(e) => updateItinerary(index, 'accommodation', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                            placeholder="e.g., Hotel in Cochin"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pricing Tab */}
                            {activeTab === 'pricing' && (
                                <div className="bg-white rounded-lg shadow-sm border p-6">
                                    <h2 className="text-lg font-semibold mb-6">Pricing Information</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Price (INR) *
                                            </label>
                                            <input
                                                type="number"
                                                value={packageData.price}
                                                onChange={(e) => handleInputChange('price', Number(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="65000"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Max Participants *
                                            </label>
                                            <input
                                                type="number"
                                                value={packageData.max_participants}
                                                onChange={(e) => handleInputChange('max_participants', Number(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="10"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Booking Deadline
                                            </label>
                                            <input
                                                type="date"
                                                value={packageData.booking_deadline}
                                                onChange={(e) => handleInputChange('booking_deadline', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Best Time to Visit
                                            </label>
                                            <input
                                                type="text"
                                                value={packageData.best_time}
                                                onChange={(e) => handleInputChange('best_time', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="e.g., October to March"
                                            />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Pickup Location
                                            </label>
                                            <input
                                                type="text"
                                                value={packageData.pickup_location}
                                                onChange={(e) => handleInputChange('pickup_location', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="e.g., Airport / Hotel pickup available"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SEO Tab */}
                            {activeTab === 'seo' && (
                                <div className="bg-white rounded-lg shadow-sm border p-6">
                                    <h2 className="text-lg font-semibold mb-6">SEO & Meta Information</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Meta Description
                                            </label>
                                            <textarea
                                                value={packageData.metaDescription}
                                                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="Brief description for search engines (150-160 characters)"
                                                maxLength={160}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                {packageData.metaDescription.length}/160 characters
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tags
                                            </label>
                                            <div className="space-y-2">
                                                {packageData.tags.map((tag, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={tag}
                                                            onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                                            placeholder="e.g., kerala, backwaters, india"
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeArrayItem('tags', index)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addArrayItem('tags')}
                                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add Tag
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPackagePage;
