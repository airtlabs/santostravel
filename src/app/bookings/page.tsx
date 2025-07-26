'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Calendar,
    Users,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';

interface Booking {
    id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    travel_date: string;
    participants: number;
    total_amount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    payment_status: 'pending' | 'paid' | 'failed';
    special_requests: string;
    created_at: string;
    packages: {
        title: string;
        destination: string;
        price: number;
    };
}

const BookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchEmail, setSearchEmail] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings');
            if (response.ok) {
                const data = await response.json();
                setBookings(data.bookings);
            }
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesFilter = filter === 'all' || booking.status === filter;
        const matchesEmail = !searchEmail || booking.user_email.toLowerCase().includes(searchEmail.toLowerCase());
        return matchesFilter && matchesEmail;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="h-4 w-4" />;
            case 'pending': return <Clock className="h-4 w-4" />;
            case 'cancelled': return <XCircle className="h-4 w-4" />;
            default: return <AlertCircle className="h-4 w-4" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
                            <p className="text-gray-600 mt-1">Manage and track all travel bookings</p>
                        </div>
                        <Link
                            href="/packages"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Browse Packages
                        </Link>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Status
                            </label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                            >
                                <option value="all">All Bookings</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search by Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter email address..."
                                value={searchEmail}
                                onChange={(e) => setSearchEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600">
                            {searchEmail ? 'No bookings found for this email address.' : 'No bookings match your current filters.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Booking Info */}
                                    <div className="lg:col-span-2 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {booking.packages.title}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <MapPin className="h-4 w-4 text-gray-500" />
                                                    <span className="text-gray-600">{booking.packages.destination}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                    {getStatusIcon(booking.status)}
                                                    {booking.status.toUpperCase()}
                                                </span>
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.payment_status)}`}>
                                                    <CreditCard className="h-3 w-3" />
                                                    {booking.payment_status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span>Travel Date: {new Date(booking.travel_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-gray-500" />
                                                <span>{booking.participants} Participants</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                <span>{booking.user_email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                <span>{booking.user_phone}</span>
                                            </div>
                                        </div>

                                        {booking.special_requests && (
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <p className="text-sm text-gray-700">
                                                    <strong>Special Requests:</strong> {booking.special_requests}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Price & Actions */}
                                    <div className="lg:col-span-1 space-y-4">
                                        <div className="text-center lg:text-right">
                                            <div className="text-2xl font-bold text-gray-900">
                                                ₹{booking.total_amount.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Total Amount
                                            </div>
                                        </div>

                                        <div className="text-center lg:text-right text-xs text-gray-500">
                                            Booking ID: {booking.id.split('-')[0]}
                                        </div>

                                        <div className="text-center lg:text-right text-xs text-gray-500">
                                            Booked on: {new Date(booking.created_at).toLocaleDateString()}
                                        </div>

                                        {booking.status === 'pending' && (
                                            <div className="text-center lg:text-right">
                                                <button className="text-sm text-yellow-600 hover:text-yellow-800 font-medium">
                                                    Contact Support
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingsPage;
