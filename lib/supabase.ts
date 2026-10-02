import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  !supabaseUrl.includes("your-project-id") &&
  supabaseAnonKey &&
  !supabaseAnonKey.includes("your-anon-key")
);

// Client-side Supabase instance
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side admin Supabase instance (bypasses RLS with service role key if available)
export const getAdminSupabase = () => {
  if (!isSupabaseConfigured) return null;
  return createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
