import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Required Supabase environment variables are missing');
  process.exit(1);
}

// Create a Supabase client with the service role key for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Export a function to create a user-context client if needed for future use
export const createUserClient = (userToken: string) => {
  return createClient(supabaseUrl, userToken);
}; 