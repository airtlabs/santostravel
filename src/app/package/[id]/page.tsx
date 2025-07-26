'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePackage } from '@/hooks/usePackages';
import { useAuth } from '@/contexts/AuthContext';
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    Star,
    Phone,
    Mail,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Car,
    ArrowLeft,
    AlertTriangle,
    UserCheck
} from 'lucide-react';

const PackageDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const packageId = params.id as string;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedDay, setExpandedDay] = useState<number | null>(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        checkIn: '',
        checkOut: '',
        adults: 2,
        children: 0,
        name: '',
        email: '',
        phone: ''
    });

    // Fetch package data from database and auth state
    const { package: packageData, loading, error } = usePackage(packageId);
    const { user, isAuthenticated } = useAuth();

    // Pre-fill form with user data when authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            setBookingForm(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [isAuthenticated, user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading package details...</p>
                </div>
            </div>
        );
    }

    if (error || !packageData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h1>
                    <p className="text-gray-600 mb-6">The package you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Link
                        href="/packages"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Browse All Packages
                    </Link>
                </div>
            </div>
        );
    }

    // Default images if none provided
    const defaultImages = [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop'
    ];

    const images = packageData.images && packageData.images.length > 0 ? packageData.images : defaultImages;

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBookingLoading(true);

        try {
            // Calculate total amount
            const totalParticipants = bookingForm.adults + bookingForm.children;
            const totalAmount = packageData.price * totalParticipants;

            // Prepare booking data
            const bookingData = {
                package_id: packageData.id,
                user_name: bookingForm.name,
                user_email: bookingForm.email,
                user_phone: bookingForm.phone,
                travel_date: bookingForm.checkIn,
                participants: totalParticipants,
                total_amount: totalAmount,
                status: 'pending',
                payment_status: 'pending',
                special_requests: `Check-in: ${bookingForm.checkIn}, Check-out: ${bookingForm.checkOut}, Adults: ${bookingForm.adults}, Children: ${bookingForm.children}`
            };

            // Submit booking
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Failed to create booking');
            }

            const result = await response.json();

            // Show success message
            alert(`Booking submitted successfully! Booking ID: ${result.id}. You will receive a confirmation email shortly.`);

            // Reset form
            setBookingForm({
                checkIn: '',
                checkOut: '',
                adults: 2,
                children: 0,
                name: '',
                email: '',
                phone: ''
            });

        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to submit booking. Please try again or contact support.');
        } finally {
            setBookingLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back to Packages */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        href="/packages"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to All Packages
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-96 bg-gray-900">
                <Image
                    src={images[currentImageIndex]}
                    alt={packageData.title}
                    fill
                    className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-medium">4.5</span>
                            <span className="text-gray-300">(Reviews)</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-2">{packageData.title}</h1>
                        <p className="text-xl text-gray-200">{packageData.description}</p>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{packageData.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{packageData.destination}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>Max {packageData.max_participants} people</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Navigation */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 right-4">
                        <div className="flex gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Navigation Tabs */}
                        <div className="border-b">
                            <nav className="flex space-x-8">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'itinerary', label: 'Itinerary' },
                                    { id: 'inclusions', label: 'Inclusions' },
                                    { id: 'gallery', label: 'Gallery' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                            ? 'border-yellow-500 text-yellow-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Package Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Clock className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <p className="font-medium">Duration</p>
                                                    <p className="text-gray-600">{packageData.duration}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MapPin className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <p className="font-medium">Destination</p>
                                                    <p className="text-gray-600">{packageData.destination}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Users className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <p className="font-medium">Max Participants</p>
                                                    <p className="text-gray-600">{packageData.max_participants} people</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <p className="font-medium">Best Time</p>
                                                    <p className="text-gray-600">{packageData.best_time || 'Any time'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Car className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <p className="font-medium">Pickup Location</p>
                                                    <p className="text-gray-600">{packageData.pickup_location || 'TBD'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Highlights */}
                                {packageData.highlights && packageData.highlights.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Tour Highlights</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {packageData.highlights.map((highlight, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span>{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {packageData.description || `Experience the beauty of ${packageData.destination} on this ${packageData.duration} journey. This carefully crafted package offers an authentic travel experience with comfortable accommodations and personalized service.`}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Itinerary Tab */}
                        {activeTab === 'itinerary' && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
                                {packageData.itinerary && packageData.itinerary.length > 0 ? (
                                    packageData.itinerary.map((day, index) => (
                                        <div key={index} className="border rounded-lg">
                                            <button
                                                onClick={() => setExpandedDay(expandedDay === index ? null : index)}
                                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                                            >
                                                <div>
                                                    <h3 className="font-semibold text-lg">Day {day.day}: {day.title}</h3>
                                                    <p className="text-gray-600 text-sm mt-1">{day.description?.substring(0, 100)}...</p>
                                                </div>
                                                {expandedDay === index ? (
                                                    <ChevronUp className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                            {expandedDay === index && (
                                                <div className="px-4 pb-4 border-t bg-gray-50">
                                                    <p className="text-gray-700 leading-relaxed">{day.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                        <p>Detailed itinerary will be provided upon booking.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Inclusions Tab */}
                        {activeTab === 'inclusions' && (
                            <div className="space-y-6">
                                {packageData.inclusions && packageData.inclusions.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4 text-green-600">What&apos;s Included</h2>
                                        <div className="space-y-3">
                                            {packageData.inclusions.map((item, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {packageData.exclusions && packageData.exclusions.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4 text-red-600">What&apos;s Not Included</h2>
                                        <div className="space-y-3">
                                            {packageData.exclusions.map((item, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <div className="h-5 w-5 border-2 border-red-500 rounded-full mt-0.5 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {(!packageData.inclusions || packageData.inclusions.length === 0) &&
                                    (!packageData.exclusions || packageData.exclusions.length === 0) && (
                                        <div className="text-center py-8 text-gray-500">
                                            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                            <p>Inclusion and exclusion details will be provided upon inquiry.</p>
                                        </div>
                                    )}
                            </div>
                        )}

                        {/* Gallery Tab */}
                        {activeTab === 'gallery' && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={`Gallery image ${index + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                                                onClick={() => setCurrentImageIndex(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="text-center mb-6">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <span className="text-2xl font-bold text-gray-900">
                                            ₹{packageData.price ? packageData.price.toLocaleString() : 'Contact us'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">per person</p>
                                </div>

                                {isAuthenticated ? (
                                    /* Authenticated User - Show Booking Form */
                                    <div>
                                        {/* Welcome Message */}
                                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <UserCheck className="h-5 w-5 text-green-600" />
                                                <span className="text-sm font-medium text-green-800">
                                                    Welcome back, {user?.name}!
                                                </span>
                                            </div>
                                        </div>

                                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Check In
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={bookingForm.checkIn}
                                                        onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Check Out
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={bookingForm.checkOut}
                                                        onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Adults
                                                    </label>
                                                    <select
                                                        value={bookingForm.adults}
                                                        onChange={(e) => setBookingForm({ ...bookingForm, adults: parseInt(e.target.value) })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                                            <option key={num} value={num}>{num}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Children
                                                    </label>
                                                    <select
                                                        value={bookingForm.children}
                                                        onChange={(e) => setBookingForm({ ...bookingForm, children: parseInt(e.target.value) })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                                                    >
                                                        {[0, 1, 2, 3, 4].map(num => (
                                                            <option key={num} value={num}>{num}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={bookingForm.name}
                                                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={bookingForm.email}
                                                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={bookingForm.phone}
                                                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={bookingLoading}
                                                className={`w-full font-medium py-3 px-4 rounded-md transition-colors ${bookingLoading
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-yellow-500 hover:bg-yellow-600'
                                                    } text-white`}
                                            >
                                                {bookingLoading ? 'Processing...' : 'Book Now'}
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    /* Not Authenticated - Show Sign Up/Sign In Options */
                                    <div className="text-center space-y-4">
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <UserCheck className="h-6 w-6 text-yellow-500" />
                                            <h3 className="text-lg font-semibold text-gray-900">Sign Up to Book</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Create an account to book this amazing package and manage your bookings.
                                        </p>
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => router.push(`/signin?mode=signup&returnUrl=${encodeURIComponent(window.location.pathname)}`)}
                                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
                                            >
                                                Sign Up & Book Now
                                            </button>
                                            <button
                                                onClick={() => router.push(`/signin?returnUrl=${encodeURIComponent(window.location.pathname)}`)}
                                                className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors"
                                            >
                                                Already have an account? Sign In
                                            </button>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-4">
                                            Free to sign up • Secure booking • Instant confirmation
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 pt-6 border-t space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">Call for Best Price</p>
                                            <p className="text-sm text-gray-600">1800 22 7979</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">Email Inquiry</p>
                                            <p className="text-sm text-gray-600">travel@santos.travel</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackageDetailPage;
