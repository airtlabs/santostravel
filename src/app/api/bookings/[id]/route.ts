import { NextRequest, NextResponse } from 'next/server'
import { BookingService } from '@/services/bookingService'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const booking = await BookingService.getById(id)

        return NextResponse.json({ booking })
    } catch (error) {
        console.error('Error fetching booking:', error)
        return NextResponse.json(
            { error: 'Booking not found' },
            { status: 404 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const bookingData = await request.json()

        const updatedBooking = await BookingService.update(id, bookingData)

        return NextResponse.json({ booking: updatedBooking })
    } catch (error) {
        console.error('Error updating booking:', error)
        return NextResponse.json(
            { error: 'Failed to update booking' },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const updateData = await request.json()

        const updatedBooking = await BookingService.update(id, updateData)

        return NextResponse.json({ booking: updatedBooking })
    } catch (error) {
        console.error('Error updating booking:', error)
        return NextResponse.json(
            { error: 'Failed to update booking' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await BookingService.delete(id)

        return NextResponse.json({ message: 'Booking deleted successfully' })
    } catch (error) {
        console.error('Error deleting booking:', error)
        return NextResponse.json(
            { error: 'Failed to delete booking' },
            { status: 500 }
        )
    }
}
