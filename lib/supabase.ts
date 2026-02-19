import { createClient } from '@supabase/supabase-js';

export type Transcript = {
  id: string;
  title: string;
  raw_text: string;
  call_date: string | null;
  call_type: string | null;
  participant_name: string | null;
  source: string | null;
  source_url: string | null;
  created_at: string;
};

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createServiceRoleClient() {
  const url = getEnvVar('SUPABASE_URL');
  const serviceRoleKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
