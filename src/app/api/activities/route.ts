import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data: activities, error } = await supabase
      .from('activities')
      .select('*')
      .order('category', { ascending: true })

    if (error) {
      throw error
    }

    return NextResponse.json({ activities })
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createAdminClient()
    
    const { data: activity, error } = await supabase
      .from('activities')
      .insert([body])
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ activity })
  } catch (error) {
    console.error('Error creating activity:', error)
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    )
  }
}
