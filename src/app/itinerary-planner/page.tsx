'use client'

import { useState, useEffect } from 'react'
import ItineraryPlanner from '@/components/ItineraryPlanner'
import { Plus, Calendar, MapPin, Users } from 'lucide-react'

interface Itinerary {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  total_cost: number
  is_public: boolean
  created_at: string
}

export default function ItineraryPlannerPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [selectedItinerary, setSelectedItinerary] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newItinerary, setNewItinerary] = useState({
    title: '',
    description: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    is_public: false
  })

  useEffect(() => {
    loadItineraries()
  }, [])

  const loadItineraries = async () => {
    try {
      const response = await fetch('/api/itineraries')
      const data = await response.json()
      setItineraries(data.itineraries || [])
    } catch (error) {
      console.error('Error loading itineraries:', error)
    } finally {
      setLoading(false)
    }
  }

  const createItinerary = async () => {
    try {
      const response = await fetch('/api/itineraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItinerary)
      })

      const data = await response.json()
      setItineraries([data.itinerary, ...itineraries])
      setSelectedItinerary(data.itinerary.id)
      setShowCreateModal(false)
      setNewItinerary({
        title: '',
        description: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        is_public: false
      })
    } catch (error) {
      console.error('Error creating itinerary:', error)
    }
  }

  const getDayCount = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  }

  if (selectedItinerary) {
    return <ItineraryPlanner itineraryId={selectedItinerary} />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Travel Itinerary Planner</h1>
            <p className="text-gray-600 mt-2">Create and manage your travel itineraries</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Create New Itinerary
          </button>
        </div>
      </div>

      {/* Itineraries Grid */}
      {itineraries.length === 0 ? (
        <div className="text-center py-16">
          <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No itineraries yet</h3>
          <p className="text-gray-600 mb-6">Create your first travel itinerary to get started</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Create Your First Itinerary
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map(itinerary => (
            <div
              key={itinerary.id}
              onClick={() => setSelectedItinerary(itinerary.id)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6 border"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{itinerary.title}</h3>
                {itinerary.is_public && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Public
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{itinerary.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{itinerary.start_date} to {itinerary.end_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{getDayCount(itinerary.start_date, itinerary.end_date)} days</span>
                </div>
                {itinerary.total_cost > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-medium">₹{itinerary.total_cost.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <span className="text-xs text-gray-400">
                  Created {new Date(itinerary.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Itinerary Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create New Itinerary</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newItinerary.title}
                  onChange={(e) => setNewItinerary({ ...newItinerary, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Amazing Trip"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newItinerary.description}
                  onChange={(e) => setNewItinerary({ ...newItinerary, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe your trip..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newItinerary.start_date}
                    onChange={(e) => setNewItinerary({ ...newItinerary, start_date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newItinerary.end_date}
                    onChange={(e) => setNewItinerary({ ...newItinerary, end_date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={newItinerary.is_public}
                  onChange={(e) => setNewItinerary({ ...newItinerary, is_public: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_public" className="ml-2 block text-sm text-gray-700">
                  Make this itinerary public
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createItinerary}
                disabled={!newItinerary.title.trim()}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
