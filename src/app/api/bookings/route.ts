import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const paymentStatus = searchParams.get('paymentStatus')

        const supabaseAdmin = createAdminClient()
        let query = supabaseAdmin
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

        if (status && status !== 'all') {
            query = query.eq('status', status)
        }
        if (paymentStatus && paymentStatus !== 'all') {
            query = query.eq('payment_status', paymentStatus)
        }

        const { data: bookings, error } = await query

        if (error) {
            throw error
        }

        return NextResponse.json({ bookings })
    } catch (error) {
        console.error('Error fetching bookings:', error)
        return NextResponse.json(
            { error: 'Failed to fetch bookings' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const bookingData = await request.json()

        const supabaseAdmin = createAdminClient()
        const { data, error } = await supabaseAdmin
            .from('bookings')
            .insert({
                ...bookingData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .select()
            .single()

        if (error) {
            throw error
        }

        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        console.error('Error creating booking:', error)
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
        )
    }
}
