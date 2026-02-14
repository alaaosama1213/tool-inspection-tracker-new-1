import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export interface Tool {
  id: string;
  barcode: string;
  name: string;
  category: string;
  serial_number: string;
  photo_url: string;
  created_at: string;
  updated_at: string;
}

export interface Inspection {
  id: string;
  tool_id: string;
  inspector_name: string;
  inspection_date: string;
  status: 'passed' | 'failed' | 'needs_repair';
  notes: string;
  photo_url: string;
  created_at: string;
}
