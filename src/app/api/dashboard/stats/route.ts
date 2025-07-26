import { NextResponse } from 'next/server'
import { PackageService } from '@/services/packageService'
import { BookingService } from '@/services/bookingService'

export async function GET() {
    try {
        const [packageStats, bookingStats] = await Promise.all([
            PackageService.getStats(),
            BookingService.getStats()
        ])

        const stats = {
            packages: packageStats,
            bookings: bookingStats,
            totalRevenue: bookingStats.revenue,
            conversionRate: packageStats.total > 0 ? (bookingStats.confirmed / packageStats.published * 100).toFixed(2) : '0.00'
        }

        return NextResponse.json({ stats })
    } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard statistics' },
            { status: 500 }
        )
    }
}
