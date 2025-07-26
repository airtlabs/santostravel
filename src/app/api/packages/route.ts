import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const category = searchParams.get('category')
        const destination = searchParams.get('destination')

        const supabaseAdmin = createAdminClient()
        let query = supabaseAdmin
            .from('packages')
            .select('*')
            .order('created_at', { ascending: false })

        if (status && status !== 'all') {
            query = query.eq('status', status)
        }
        if (category) {
            query = query.eq('category', category)
        }
        if (destination) {
            query = query.ilike('destination', `%${destination}%`)
        }

        const { data: packages, error } = await query

        if (error) {
            throw error
        }

        return NextResponse.json({ packages })
    } catch (error) {
        console.error('Error fetching packages:', error)
        return NextResponse.json(
            { error: 'Failed to fetch packages' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const packageData = await request.json()

        const supabaseAdmin = createAdminClient()
        const { data, error } = await supabaseAdmin
            .from('packages')
            .insert({
                ...packageData,
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
        console.error('Error creating package:', error)
        return NextResponse.json(
            { error: 'Failed to create package' },
            { status: 500 }
        )
    }
}
