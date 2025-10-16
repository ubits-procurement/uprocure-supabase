import { createClient } from 'jsr:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || '';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);