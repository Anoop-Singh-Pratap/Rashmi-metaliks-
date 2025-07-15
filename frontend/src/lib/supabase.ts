import { createClient } from '@supabase/supabase-js';

// Use environment variables directly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log warning if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing or undefined.');
  console.error('Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined correctly.');
  console.error('Also ensure your Vite config is properly loading the environment variables.');
  
  // Add troubleshooting information
  console.info('Troubleshooting steps:');
  console.info('1. Check that .env or .env.local file exists in the frontend directory');
  console.info('2. Ensure the .env file has no BOM markers or encoding issues');
  console.info('3. Verify that Vite is loading environment variables correctly (check vite.config.ts)');
  console.info('4. Try restarting the development server and clearing the Vite cache (node_modules/.vite)');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a function to upload a file to Supabase storage
export const uploadFile = async (file: File, bucket: string, folder: string) => {
  try {
    // Check if Supabase is properly configured before attempting upload
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase is not properly configured. File upload cannot proceed.');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) throw error;
    
    // Return the file URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
      
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}; 