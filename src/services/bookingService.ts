import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type BookingInsert = Database['public']['Tables']['bookings']['Insert']
type BookingUpdate = Database['public']['Tables']['bookings']['Update']

export class BookingService {
    // Get all bookings
    static async getAll(filters?: {
        status?: string
        paymentStatus?: string
    }) {
        let query = supabase
            .from('bookings')
            .select(`
        *,
        packages (
          title,
          destination,
          price
        )
      `)
            .order('created_at', { ascending: false })

        if (filters?.status && filters.status !== 'all') {
            query = query.eq('status', filters.status)
        }
        if (filters?.paymentStatus && filters.paymentStatus !== 'all') {
            query = query.eq('payment_status', filters.paymentStatus)
        }

        const { data, error } = await query

        if (error) {
            throw new Error(`Failed to fetch bookings: ${error.message}`)
        }

        return data
    }

    // Get booking by ID
    static async getById(id: string) {
        const { data, error } = await supabase
            .from('bookings')
            .select(`
        *,
        packages (
          title,
          destination,
          price,
          duration,
          images
        )
      `)
            .eq('id', id)
            .single()

        if (error) {
            throw new Error(`Failed to fetch booking: ${error.message}`)
        }

        return data
    }

    // Create new booking
    static async create(bookingData: BookingInsert) {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Failed to create booking: ${error}`)
        }

        return await response.json()
    }

    // Update booking
    static async update(id: string, bookingData: BookingUpdate) {
        const { data, error } = await supabase
            .from('bookings')
            .update({
                ...bookingData,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single()

        if (error) {
            throw new Error(`Failed to update booking: ${error.message}`)
        }

        return data
    }

    // Delete booking
    static async delete(id: string) {
        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id)

        if (error) {
            throw new Error(`Failed to delete booking: ${error.message}`)
        }

        return true
    }

    // Get booking statistics
    static async getStats() {
        const { data: totalBookings, error: totalError } = await supabase
            .from('bookings')
            .select('id', { count: 'exact' })

        const { data: confirmedBookings, error: confirmedError } = await supabase
            .from('bookings')
            .select('id', { count: 'exact' })
            .eq('status', 'confirmed')

        const { data: pendingBookings, error: pendingError } = await supabase
            .from('bookings')
            .select('id', { count: 'exact' })
            .eq('status', 'pending')

        const { data: totalRevenue, error: revenueError } = await supabase
            .from('bookings')
            .select('total_amount')
            .eq('payment_status', 'paid')

        if (totalError || confirmedError || pendingError || revenueError) {
            throw new Error('Failed to fetch booking statistics')
        }

        const revenue = totalRevenue?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0

        return {
            total: totalBookings?.length || 0,
            confirmed: confirmedBookings?.length || 0,
            pending: pendingBookings?.length || 0,
            revenue: revenue,
        }
    }

    // Get recent bookings
    static async getRecent(limit: number = 10) {
        const { data, error } = await supabase
            .from('bookings')
            .select(`
        *,
        packages (
          title,
          destination
        )
      `)
            .order('created_at', { ascending: false })
            .limit(limit)

        if (error) {
            throw new Error(`Failed to fetch recent bookings: ${error.message}`)
        }

        return data
    }
}
