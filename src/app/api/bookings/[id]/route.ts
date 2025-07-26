import { NextRequest, NextResponse } from 'next/server'
import { BookingService } from '@/services/bookingService'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const booking = await BookingService.getById(params.id)

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
    { params }: { params: { id: string } }
) {
    try {
        const bookingData = await request.json()

        const updatedBooking = await BookingService.update(params.id, bookingData)

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
    { params }: { params: { id: string } }
) {
    try {
        const updateData = await request.json()

        const updatedBooking = await BookingService.update(params.id, updateData)

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
    { params }: { params: { id: string } }
) {
    try {
        await BookingService.delete(params.id)

        return NextResponse.json({ message: 'Booking deleted successfully' })
    } catch (error) {
        console.error('Error deleting booking:', error)
        return NextResponse.json(
            { error: 'Failed to delete booking' },
            { status: 500 }
        )
    }
}
