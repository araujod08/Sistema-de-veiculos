import { createClient } from "@supabase/supabase-js"

// Criando cliente para o lado do servidor
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseKey)
}

// Criando cliente para o lado do cliente
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getClientSupabaseClient = () => {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}
