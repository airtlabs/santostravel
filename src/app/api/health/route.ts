import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
    try {
        const supabase = createAdminClient()
        
        // Test database connection by counting packages
        const { data, error, count } = await supabase
            .from('packages')
            .select('*', { count: 'exact', head: true })

        if (error) {
            console.error('Database error:', error)
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
            message: 'Supabase setup is working correctly!',
            database: {
                connected: true,
                packages_count: count || 0
            },
            environment: {
                has_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                has_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                has_service_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
                url: process.env.NEXT_PUBLIC_SUPABASE_URL
            },
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('Health check error:', error)
        return NextResponse.json(
            {
                status: 'error',
                message: 'Health check failed',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
