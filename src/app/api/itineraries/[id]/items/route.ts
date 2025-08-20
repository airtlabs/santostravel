import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const supabase = createAdminClient()
    
    const { data: item, error } = await supabase
      .from('itinerary_items')
      .insert([{ 
        ...body, 
        itinerary_id: id 
      }])
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ item })
  } catch (error) {
    console.error('Error adding itinerary item:', error)
    return NextResponse.json(
      { error: 'Failed to add itinerary item' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { items } = body // Array of items to update
    const supabase = createAdminClient()
    
    // Update items in batch
    const updates = items.map((item: any) =>
      supabase
        .from('itinerary_items')
        .update(item)
        .eq('id', item.id)
        .eq('itinerary_id', id)
    )

    const results = await Promise.all(updates)
    
    // Check for errors
    const errors = results.filter(result => result.error)
    if (errors.length > 0) {
      throw new Error('Failed to update some items')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating itinerary items:', error)
    return NextResponse.json(
      { error: 'Failed to update itinerary items' },
      { status: 500 }
    )
  }
}
