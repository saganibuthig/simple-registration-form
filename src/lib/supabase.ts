import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase env variables missing. Restart the dev server after creating .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
