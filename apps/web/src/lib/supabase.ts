import { createClient } from '@supabase/supabase-js'
import type { Database } from '@workshop/shared'

// Environment configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  )
}

// Create Supabase client with TypeScript types
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Authentication helper functions
export const auth = {
  getCurrentUser: () => supabase.auth.getUser(),
  signOut: () => supabase.auth.signOut(),
  onAuthStateChange: (callback: (event: string, session: any) => void) =>
    supabase.auth.onAuthStateChange(callback),
}

// Database helper functions
export const db = {
  participants: () => supabase.from('participants'),
  workshops: () => supabase.from('workshops'),
  creative_outputs: () => supabase.from('creative_outputs'),
}

export default supabase
