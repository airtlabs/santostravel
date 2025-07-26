import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
    try {
        // Test basic connection
        const supabase = createAdminClient()
        const { error } = await supabase
            .from('packages')
            .select('count')
            .limit(1)

        if (error) {
            console.error('Database connection error:', error)
            return NextResponse.json(
                {
                    status: 'error',
                    message: 'Database connection failed',
                    error: error.message
                },
                { status: 500 }
            )
        }

        return NextResponse.json({
            status: 'success',
            message: 'Database connection successful',
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json(
            {
                status: 'error',
                message: 'Unexpected error occurred',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

export async function POST() {
    try {
        // Test package insertion with admin client
        const testPackage = {
            title: 'Test Package - ' + new Date().getTime(),
            description: 'A test package to verify database insertion',
            price: 15000,
            duration: '3 Days / 2 Nights',
            destination: 'Delhi',
            category: 'India',
            booking_deadline: '2025-12-31',
            max_participants: 10,
            best_time: 'October to March',
            pickup_location: 'Delhi Airport',
            status: 'draft' as const
        }

        console.log('Attempting to insert test package:', testPackage)

        const supabaseAdmin = createAdminClient()
        const { data, error } = await supabaseAdmin
            .from('packages')
            .insert(testPackage)
            .select()
            .single()

        if (error) {
            console.error('Database insertion error:', error)
            return NextResponse.json(
                {
                    status: 'error',
                    message: 'Database insertion failed',
                    error: error.message,
                    details: error
                },
                { status: 500 }
            )
        }

        console.log('Successfully inserted package:', data)

        return NextResponse.json({
            status: 'success',
            message: 'Test package created successfully',
            package: data,
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('Unexpected error during insertion:', error)
        return NextResponse.json(
            {
                status: 'error',
                message: 'Unexpected error during insertion',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
