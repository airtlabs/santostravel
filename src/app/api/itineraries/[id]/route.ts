import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()
    const { data: itinerary, error } = await supabase
      .from('itineraries')
      .select(`
        *,
        itinerary_items (
          *,
          activities (*)
        )
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ itinerary })
  } catch (error) {
    console.error('Error fetching itinerary:', error)
    return NextResponse.json(
      { error: 'Failed to fetch itinerary' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const supabase = createAdminClient()
    
    const { data: itinerary, error } = await supabase
      .from('itineraries')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ itinerary })
  } catch (error) {
    console.error('Error updating itinerary:', error)
    return NextResponse.json(
      { error: 'Failed to update itinerary' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()
    
    const { error } = await supabase
      .from('itineraries')
      .delete()
      .eq('id', params.id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting itinerary:', error)
    return NextResponse.json(
      { error: 'Failed to delete itinerary' },
      { status: 500 }
    )
  }
}
