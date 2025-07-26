import { useState, useEffect } from 'react'
import { PackageService } from '@/services/packageService'
import { Database } from '@/types/database'

type Package = Database['public']['Tables']['packages']['Row']

export function usePackages(filters?: {
    status?: string
    category?: string
    destination?: string
}) {
    const [packages, setPackages] = useState<Package[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPackages = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await PackageService.getAll(filters)
            setPackages(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch packages')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPackages()
    }, [filters?.status, filters?.category, filters?.destination])

    return { packages, loading, error, refetch: fetchPackages }
}

export function usePackage(id: string) {
    const [package_, setPackage] = useState<Package | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPackage() {
            if (!id) return

            try {
                setLoading(true)
                setError(null)
                const data = await PackageService.getById(id)
                setPackage(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch package')
            } finally {
                setLoading(false)
            }
        }

        fetchPackage()
    }, [id])

    return { package: package_, loading, error }
}
