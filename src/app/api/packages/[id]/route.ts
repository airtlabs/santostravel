import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabaseAdmin = createAdminClient()
        const { data, error } = await supabaseAdmin
            .from('packages')
            .select('*')
            .eq('id', params.id)
            .single()

        if (error) {
            throw error
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching package:', error)
        return NextResponse.json(
            { error: 'Package not found' },
            { status: 404 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const packageData = await request.json()

        const supabaseAdmin = createAdminClient()
        const { data, error } = await supabaseAdmin
            .from('packages')
            .update({
                ...packageData,
                updated_at: new Date().toISOString(),
            })
            .eq('id', params.id)
            .select()
            .single()

        if (error) {
            throw error
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error updating package:', error)
        return NextResponse.json(
            { error: 'Failed to update package' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabaseAdmin = createAdminClient()
        const { error } = await supabaseAdmin
            .from('packages')
            .delete()
            .eq('id', params.id)

        if (error) {
            throw error
        }

        return NextResponse.json({ message: 'Package deleted successfully' })
    } catch (error) {
        console.error('Error deleting package:', error)
        return NextResponse.json(
            { error: 'Failed to delete package' },
            { status: 500 }
        )
    }
}
