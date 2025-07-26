'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
    Search,
    Calendar,
    Users,
    MapPin,
    Phone,
    Mail,
    Edit,
    Trash2,
    Eye
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

const AdminBookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (statusFilter !== 'all') params.append('status', statusFilter);
            if (paymentFilter !== 'all') params.append('paymentStatus', paymentFilter);

            const response = await fetch(`/api/bookings?${params.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    }, [statusFilter, paymentFilter]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const updateBookingStatus = async (bookingId: string, status: string) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                fetchBookings(); // Refresh the list
            }
        } catch (error) {
            console.error('Failed to update booking status:', error);
        }
    };

    const updatePaymentStatus = async (bookingId: string, paymentStatus: string) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payment_status: paymentStatus })
            });

            if (response.ok) {
                fetchBookings(); // Refresh the list
            }
        } catch (error) {
            console.error('Failed to update payment status:', error);
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = !searchQuery ||
            booking.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.packages.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
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

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
                        <p className="text-gray-600 mt-1">Manage customer bookings and reservations</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Bookings
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or package..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Booking Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Payment Status
                            </label>
                            <select
                                value={paymentFilter}
                                onChange={(e) => setPaymentFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                            >
                                <option value="all">All Payments</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Bookings Table */}
                {loading ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading bookings...</p>
                    </div>
                ) : filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600">No bookings match your current search and filters.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer & Package
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Travel Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {booking.user_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Mail className="h-3 w-3" />
                                                        {booking.user_email}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Phone className="h-3 w-3" />
                                                        {booking.user_phone}
                                                    </div>
                                                    <div className="text-sm font-medium text-blue-600 mt-1">
                                                        {booking.packages.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {booking.packages.destination}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(booking.travel_date).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    {booking.participants} participants
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Booked: {new Date(booking.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-lg font-semibold text-gray-900">
                                                    ₹{booking.total_amount.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ID: {booking.id.split('-')[0]}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="space-y-2">
                                                    <select
                                                        value={booking.status}
                                                        onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                                        className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(booking.status)}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                    <select
                                                        value={booking.payment_status}
                                                        onChange={(e) => updatePaymentStatus(booking.id, e.target.value)}
                                                        className={`text-xs px-2 py-1 rounded-full border-0 w-full ${getPaymentStatusColor(booking.payment_status)}`}
                                                    >
                                                        <option value="pending">Payment Pending</option>
                                                        <option value="paid">Paid</option>
                                                        <option value="failed">Failed</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-900">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminBookingsPage;
