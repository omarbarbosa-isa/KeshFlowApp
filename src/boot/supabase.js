import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.QCLI_SUPABASE_URL
const supabaseKey = import.meta.env.QCLI_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Inicializar SUPABASE: ', supabase)

export default function useSupabase() {
  return { supabase }
}
