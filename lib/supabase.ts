import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;

/**
 * Browser-safe client (publishable key). Use for client-side if needed.
 */
export function createBrowserClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }
  return createClient(supabaseUrl, supabasePublishableKey);
}

let serverClient: SupabaseClient | null = null;

/**
 * Server-only client (secret key). Singleton; use in API routes for lead insert.
 * Never expose this key to the client.
 */
export function createServerClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY");
  }
  if (!serverClient) {
    serverClient = createClient(supabaseUrl, supabaseSecretKey);
  }
  return serverClient;
}
