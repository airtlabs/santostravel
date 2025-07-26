import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type PackageInsert = Database['public']['Tables']['packages']['Insert']
type PackageUpdate = Database['public']['Tables']['packages']['Update']

export class PackageService {
    // Get all packages
    static async getAll(filters?: {
        status?: string
        category?: string
        destination?: string
    }) {
        let query = supabase
            .from('packages')
            .select('*')
            .order('created_at', { ascending: false })

        if (filters?.status && filters.status !== 'all') {
            query = query.eq('status', filters.status)
        }
        if (filters?.category) {
            query = query.eq('category', filters.category)
        }
        if (filters?.destination) {
            query = query.ilike('destination', `%${filters.destination}%`)
        }

        const { data, error } = await query

        if (error) {
            throw new Error(`Failed to fetch packages: ${error.message}`)
        }

        return data
    }

    // Get package by ID
    static async getById(id: string) {
        const { data, error } = await supabase
            .from('packages')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            throw new Error(`Failed to fetch package: ${error.message}`)
        }

        return data
    }

    // Create new package
    static async create(packageData: PackageInsert) {
        const response = await fetch('/api/packages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(packageData),
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Failed to create package: ${error}`)
        }

        return await response.json()
    }

    // Update package
    static async update(id: string, packageData: PackageUpdate) {
        const response = await fetch(`/api/packages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(packageData),
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Failed to update package: ${error}`)
        }

        return await response.json()
    }

    // Delete package
    static async delete(id: string) {
        const response = await fetch(`/api/packages/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Failed to delete package: ${error}`)
        }

        return true
    }

    // Get published packages for public display
    static async getPublished(limit?: number) {
        let query = supabase
            .from('packages')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false })

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query

        if (error) {
            throw new Error(`Failed to fetch published packages: ${error.message}`)
        }

        return data
    }

    // Search packages
    static async search(searchTerm: string) {
        const { data, error } = await supabase
            .from('packages')
            .select('*')
            .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,destination.ilike.%${searchTerm}%`)
            .eq('status', 'published')
            .order('created_at', { ascending: false })

        if (error) {
            throw new Error(`Failed to search packages: ${error.message}`)
        }

        return data
    }

    // Get packages by category
    static async getByCategory(category: string) {
        const { data, error } = await supabase
            .from('packages')
            .select('*')
            .eq('category', category)
            .eq('status', 'published')
            .order('created_at', { ascending: false })

        if (error) {
            throw new Error(`Failed to fetch packages by category: ${error.message}`)
        }

        return data
    }

    // Get package statistics
    static async getStats() {
        const { data: totalPackages, error: totalError } = await supabase
            .from('packages')
            .select('id', { count: 'exact' })

        const { data: publishedPackages, error: publishedError } = await supabase
            .from('packages')
            .select('id', { count: 'exact' })
            .eq('status', 'published')

        const { data: draftPackages, error: draftError } = await supabase
            .from('packages')
            .select('id', { count: 'exact' })
            .eq('status', 'draft')

        if (totalError || publishedError || draftError) {
            throw new Error('Failed to fetch package statistics')
        }

        return {
            total: totalPackages?.length || 0,
            published: publishedPackages?.length || 0,
            draft: draftPackages?.length || 0,
        }
    }
}
