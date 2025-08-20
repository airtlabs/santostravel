import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const body = await request.json()
    const supabase = createAdminClient()
    
    const { data: item, error } = await supabase
      .from('itinerary_items')
      .update(body)
      .eq('id', params.itemId)
      .eq('itinerary_id', params.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ item })
  } catch (error) {
    console.error('Error updating itinerary item:', error)
    return NextResponse.json(
      { error: 'Failed to update itinerary item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const supabase = createAdminClient()
    
    const { error } = await supabase
      .from('itinerary_items')
      .delete()
      .eq('id', params.itemId)
      .eq('itinerary_id', params.id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting itinerary item:', error)
    return NextResponse.json(
      { error: 'Failed to delete itinerary item' },
      { status: 500 }
    )
  }
}
