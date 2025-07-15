import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` from the frontend directory.
  // Prioritizes .env.local over .env
  const env = loadEnv(mode, path.resolve(__dirname), '');

  // Basic check if needed (optional)
  // console.log(`Vite mode: ${mode}`);
  // console.log('Loaded VITE_ keys:', Object.keys(env).filter(key => key.startsWith('VITE_')));

  // Validate required environment variables
  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
    // Keep a minimal warning
    console.warn('⚠️ Required Supabase environment variables might be missing. Ensure .env.local is correctly set up.');
  } else {
    // Optional: Log success on startup
    // console.log('✅ Supabase environment variables loaded.');
  }

  return {
    define: {
      // Ensure VITE_ variables are available in the client
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''),
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY || ''),
      'import.meta.env.VITE_APP_NAME': JSON.stringify(env.VITE_APP_NAME || ''),
      'import.meta.env.VITE_REACT_APP_CMS_API_URL': JSON.stringify(env.VITE_REACT_APP_CMS_API_URL || ''),
    },
    server: {
      host: "::",
      port: 8080,
      proxy: {
        // Proxy API requests to the backend server in development
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
