import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params
    const body = await request.json()
    const supabase = createAdminClient()
    
    const { data: item, error } = await supabase
      .from('itinerary_items')
      .update(body)
      .eq('id', itemId)
      .eq('itinerary_id', id)
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
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params
    const supabase = createAdminClient()
    
    const { error } = await supabase
      .from('itinerary_items')
      .delete()
      .eq('id', itemId)
      .eq('itinerary_id', id)

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
