import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client for browser/client-side usage
 * Use this in client components and hooks
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Create a new Supabase client instance
 * Use when you need a fresh instance or custom configuration
 */
export function createBrowserClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
