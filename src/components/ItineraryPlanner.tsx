'use client'

import { useState, useEffect } from 'react'
import { Plus, Calendar, MapPin, Clock, Trash2, Share, Download, Edit3, ArrowUp, ArrowDown } from 'lucide-react'

interface Activity {
  id: string
  name: string
  description: string
  location: string
  duration: number
  cost: number
  category: string
  image_url?: string
}

interface ItineraryItem {
  id: string
  activity_id: string
  day_number: number
  order_in_day: number
  start_time: string | null
  notes: string | null
  activities: Activity
}

interface Itinerary {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  total_cost: number
  is_public: boolean
  created_at: string
  itinerary_items: ItineraryItem[]
}

interface ItineraryPlannerProps {
  itineraryId?: string
}

export default function ItineraryPlanner({ itineraryId }: ItineraryPlannerProps) {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState(1)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [editingItinerary, setEditingItinerary] = useState(false)

  // Group items by day
  const getDayItems = (dayNumber: number): ItineraryItem[] => {
    if (!itinerary) return []
    return itinerary.itinerary_items
      .filter(item => item.day_number === dayNumber)
      .sort((a, b) => a.order_in_day - b.order_in_day)
  }

  const getDays = (): number[] => {
    if (!itinerary) return [1]
    const startDate = new Date(itinerary.start_date)
    const endDate = new Date(itinerary.end_date)
    const dayCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return Array.from({ length: dayCount }, (_, i) => i + 1)
  }

  useEffect(() => {
    loadItinerary()
    loadActivities()
  }, [itineraryId])

  const loadItinerary = async () => {
    if (!itineraryId) {
      // Create new itinerary
      setItinerary({
        id: '',
        title: 'New Itinerary',
        description: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        total_cost: 0,
        is_public: false,
        created_at: new Date().toISOString(),
        itinerary_items: []
      })
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/itineraries/${itineraryId}`)
      const data = await response.json()
      setItinerary(data.itinerary)
    } catch (error) {
      console.error('Error loading itinerary:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadActivities = async () => {
    try {
      const response = await fetch('/api/activities')
      const data = await response.json()
      setActivities(data.activities)
    } catch (error) {
      console.error('Error loading activities:', error)
    }
  }

  const addActivityToDay = async (activity: Activity, day: number) => {
    if (!itinerary) return

    const dayItems = getDayItems(day)
    const newItem = {
      activity_id: activity.id,
      day_number: day,
      order_in_day: dayItems.length + 1,
      start_time: null,
      notes: null
    }

    try {
      const response = await fetch(`/api/itineraries/${itinerary.id}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })
      
      const data = await response.json()
      const itemWithActivity = {
        ...data.item,
        activities: activity
      }

      setItinerary({
        ...itinerary,
        itinerary_items: [...itinerary.itinerary_items, itemWithActivity]
      })
    } catch (error) {
      console.error('Error adding activity:', error)
    }
  }

  const removeItem = async (itemId: string) => {
    if (!itinerary) return

    try {
      await fetch(`/api/itineraries/${itinerary.id}/items/${itemId}`, {
        method: 'DELETE'
      })

      setItinerary({
        ...itinerary,
        itinerary_items: itinerary.itinerary_items.filter(item => item.id !== itemId)
      })
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const moveItem = async (itemId: string, direction: 'up' | 'down') => {
    if (!itinerary) return

    const item = itinerary.itinerary_items.find(i => i.id === itemId)
    if (!item) return

    const dayItems = getDayItems(item.day_number)
    const currentIndex = dayItems.findIndex(i => i.id === itemId)
    
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === dayItems.length - 1)
    ) {
      return
    }

    const newOrder = direction === 'up' ? item.order_in_day - 1 : item.order_in_day + 1
    const swapItem = dayItems.find(i => i.order_in_day === newOrder)
    
    if (!swapItem) return

    // Update orders
    const updatedItems = itinerary.itinerary_items.map(i => {
      if (i.id === itemId) {
        return { ...i, order_in_day: newOrder }
      }
      if (i.id === swapItem.id) {
        return { ...i, order_in_day: item.order_in_day }
      }
      return i
    })

    setItinerary({ ...itinerary, itinerary_items: updatedItems })

    // Save to backend
    try {
      await fetch(`/api/itinerary/${itinerary.id}/items`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updatedItems })
      })
    } catch (error) {
      console.error('Error updating item order:', error)
    }
  }

  const saveItinerary = async () => {
    if (!itinerary) return

    try {
      const response = await fetch('/api/itineraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: itinerary.title,
          description: itinerary.description,
          start_date: itinerary.start_date,
          end_date: itinerary.end_date,
          is_public: itinerary.is_public
        })
      })

      const data = await response.json()
      setItinerary({ ...itinerary, id: data.itinerary.id })
    } catch (error) {
      console.error('Error saving itinerary:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!itinerary) {
    return <div>Itinerary not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            {editingItinerary ? (
              <input
                type="text"
                value={itinerary.title}
                onChange={(e) => setItinerary({ ...itinerary, title: e.target.value })}
                className="text-3xl font-bold bg-transparent border-b-2 border-blue-600 focus:outline-none"
                onBlur={() => setEditingItinerary(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingItinerary(false)}
              />
            ) : (
              <h1 
                className="text-3xl font-bold text-gray-900 cursor-pointer flex items-center gap-2"
                onClick={() => setEditingItinerary(true)}
              >
                {itinerary.title}
                <Edit3 className="h-5 w-5 text-gray-400" />
              </h1>
            )}
            <p className="text-gray-600 mt-2">{itinerary.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowActivityModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Activity
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700">
              <Share className="h-4 w-4" />
              Share
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
              <Download className="h-4 w-4" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Date Range & Stats */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {itinerary.start_date} to {itinerary.end_date}
          </div>
          <div className="flex items-center gap-2">
            <span>Total Cost: ₹{itinerary.total_cost.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{itinerary.itinerary_items.length} Activities</span>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex overflow-x-auto mb-6 border-b">
        {getDays().map(day => {
          const dayDate = new Date(itinerary.start_date)
          dayDate.setDate(dayDate.getDate() + day - 1)
          const dayItems = getDayItems(day)
          
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-shrink-0 px-6 py-3 border-b-2 transition-colors ${
                selectedDay === day
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="text-center">
                <div className="font-medium">Day {day}</div>
                <div className="text-xs">{dayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                <div className="text-xs text-gray-400">{dayItems.length} activities</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Day Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Day {selectedDay}</h2>
          <button
            onClick={() => setShowActivityModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Activity
          </button>
        </div>

        <div className="space-y-4">
          {getDayItems(selectedDay).map((item, index) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.activities.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.activities.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.activities.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.activities.duration}h
                    </span>
                    <span className="font-medium text-green-600">
                      ₹{item.activities.cost}
                    </span>
                  </div>
                  {item.start_time && (
                    <div className="text-sm text-blue-600 mt-2">
                      Start time: {item.start_time}
                    </div>
                  )}
                  {item.notes && (
                    <div className="text-sm text-gray-700 mt-2 italic">
                      Note: {item.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => moveItem(item.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveItem(item.id, 'down')}
                    disabled={index === getDayItems(selectedDay).length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {getDayItems(selectedDay).length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No activities planned for this day</p>
              <p className="text-sm">Click "Add Activity" to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Activity Selection Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add Activity</h2>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map(activity => (
                <div key={activity.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  {activity.image_url && (
                    <img
                      src={activity.image_url}
                      alt={activity.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="font-medium text-gray-900">{activity.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">{activity.location}</span>
                    <span className="font-medium text-green-600">₹{activity.cost}</span>
                  </div>
                  <button
                    onClick={() => {
                      addActivityToDay(activity, selectedDay)
                      setShowActivityModal(false)
                    }}
                    className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add to Day {selectedDay}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
