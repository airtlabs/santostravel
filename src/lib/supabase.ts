import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
    throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_URL environment variable. ' +
        'Please add your Supabase project URL to .env.local file. ' +
        'Check SUPABASE_SETUP.md for detailed instructions.'
    )
}

if (!supabaseAnonKey) {
    throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. ' +
        'Please add your Supabase anon key to .env.local file. ' +
        'Check SUPABASE_SETUP.md for detailed instructions.'
    )
}

export const supabase = createClient<Database>(supabaseUrl as string, supabaseAnonKey as string)

// Server-side admin client - only available in server environment
export function createAdminClient() {
    if (typeof window !== 'undefined') {
        throw new Error('Admin client should only be used on the server side')
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!serviceRoleKey) {
        throw new Error(
            'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. ' +
            'Please add your Supabase service role key to .env.local file. ' +
            'Check SUPABASE_SETUP.md for detailed instructions.'
        )
    }

    return createClient<Database>(
        supabaseUrl as string,
        serviceRoleKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )
}
