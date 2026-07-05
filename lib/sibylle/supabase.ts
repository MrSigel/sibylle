import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase() {
  if (!client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY müssen gesetzt sein.");
    }

    client = createClient(supabaseUrl, supabaseAnonKey);
  }

  return client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    const value = getSupabase()[property as keyof SupabaseClient];
    return typeof value === "function" ? value.bind(getSupabase()) : value;
  },
});
