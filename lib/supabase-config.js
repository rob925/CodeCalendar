const fallbackSupabaseUrl = "https://lnqjsoqkybtxmboqisbw.supabase.co";
const fallbackSupabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucWpzb3FreWJ0eG1ib3Fpc2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNTE0NzgsImV4cCI6MjA5ODgyNzQ3OH0.U_plSDL6ACvf-fpEZD2RZuvSA5mFZpiQoZ2tMAdN6-E";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackSupabaseUrl;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey;
