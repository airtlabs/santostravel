export interface Database {
    public: {
        Tables: {
            packages: {
                Row: {
                    id: string
                    title: string
                    description: string
                    price: number
                    duration: string
                    destination: string
                    category: string
                    status: 'draft' | 'published' | 'archived'
                    images: string[]
                    itinerary: ItineraryDay[]
                    inclusions: string[]
                    exclusions: string[]
                    booking_deadline: string
                    max_participants: number
                    best_time: string
                    pickup_location: string
                    highlights: string[]
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description: string
                    price: number
                    duration: string
                    destination: string
                    category: string
                    status?: 'draft' | 'published' | 'archived'
                    images?: string[]
                    itinerary?: ItineraryDay[]
                    inclusions?: string[]
                    exclusions?: string[]
                    booking_deadline: string
                    max_participants: number
                    best_time: string
                    pickup_location: string
                    highlights?: string[]
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string
                    price?: number
                    duration?: string
                    destination?: string
                    category?: string
                    status?: 'draft' | 'published' | 'archived'
                    images?: string[]
                    itinerary?: ItineraryDay[]
                    inclusions?: string[]
                    exclusions?: string[]
                    booking_deadline?: string
                    max_participants?: number
                    best_time?: string
                    pickup_location?: string
                    highlights?: string[]
                    updated_at?: string
                }
            }
            bookings: {
                Row: {
                    id: string
                    package_id: string
                    user_name: string
                    user_email: string
                    user_phone: string
                    travel_date: string
                    participants: number
                    total_amount: number
                    status: 'pending' | 'confirmed' | 'cancelled'
                    payment_status: 'pending' | 'paid' | 'failed'
                    special_requests: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    package_id: string
                    user_name: string
                    user_email: string
                    user_phone: string
                    travel_date: string
                    participants: number
                    total_amount: number
                    status?: 'pending' | 'confirmed' | 'cancelled'
                    payment_status?: 'pending' | 'paid' | 'failed'
                    special_requests?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    package_id?: string
                    user_name?: string
                    user_email?: string
                    user_phone?: string
                    travel_date?: string
                    participants?: number
                    total_amount?: number
                    status?: 'pending' | 'confirmed' | 'cancelled'
                    payment_status?: 'pending' | 'paid' | 'failed'
                    special_requests?: string
                    updated_at?: string
                }
            }
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    content: string
                    excerpt: string
                    featured_image: string
                    author: string
                    category: string
                    tags: string[]
                    status: 'draft' | 'published'
                    published_at: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    content: string
                    excerpt: string
                    featured_image: string
                    author: string
                    category: string
                    tags?: string[]
                    status?: 'draft' | 'published'
                    published_at?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    content?: string
                    excerpt?: string
                    featured_image?: string
                    author?: string
                    category?: string
                    tags?: string[]
                    status?: 'draft' | 'published'
                    published_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

export interface ItineraryDay {
    day: number
    title: string
    description: string
    activities: string[]
    meals: string[]
    accommodation: string
}

// Export type aliases for easier use
export type Package = Database['public']['Tables']['packages']['Row']
export type PackageInsert = Database['public']['Tables']['packages']['Insert']
export type PackageUpdate = Database['public']['Tables']['packages']['Update']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type BookingInsert = Database['public']['Tables']['bookings']['Insert']
export type BookingUpdate = Database['public']['Tables']['bookings']['Update']
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']
