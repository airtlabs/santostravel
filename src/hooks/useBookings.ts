import { useState, useEffect, useCallback } from 'react'
import { BookingService } from '@/services/bookingService'
import { Database } from '@/types/database'

type Booking = Database['public']['Tables']['bookings']['Row']

export function useBookings(filters?: {
    status?: string
    paymentStatus?: string
}) {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await BookingService.getAll(filters)
            setBookings(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch bookings')
        } finally {
            setLoading(false)
        }
    }, [filters])

    useEffect(() => {
        fetchBookings()
    }, [fetchBookings])

    return { bookings, loading, error, refetch: fetchBookings }
}

export function useBooking(id: string) {
    const [booking, setBooking] = useState<Booking | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchBooking() {
            if (!id) return

            try {
                setLoading(true)
                setError(null)
                const data = await BookingService.getById(id)
                setBooking(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch booking')
            } finally {
                setLoading(false)
            }
        }

        fetchBooking()
    }, [id])

    return { booking, loading, error }
}
