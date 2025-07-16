// API Configuration
// This file centralizes all API endpoint configurations

// Get the API base URL from environment variables
const getApiBaseUrl = () => {
  // In production, use a relative path to avoid mixed-content errors
  if (import.meta.env.PROD) {
    return '';
  }
  
  // In development, use localhost with the backend port
  return 'http://localhost:3001';
};

// Get the CMS API URL from environment variables
const getCmsApiUrl = () => {
  // In production, use the live CMS domain.
  if (import.meta.env.PROD) {
    return 'https://cms.rashmigroup.com';
  }
  
  // For local development, use the default Strapi port from environment variables or fallback.
  return import.meta.env.VITE_REACT_APP_CMS_API_URL || 'http://localhost:1337';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  CMS_URL: getCmsApiUrl(),
  ENDPOINTS: {
    JOBS: '/api/jobs',
    APPLICATIONS: '/api/applications',
    CONTACT: '/api/contact',
    VENDORS: '/api/vendors',
    NEWS: '/api/news',
    HEALTH: '/health'
  }
};

// Helper function to construct full API URLs
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to construct full CMS URLs
export const getCmsUrl = (endpoint: string) => {
  return `${API_CONFIG.CMS_URL}${endpoint}`;
};

console.log('API Configuration:', {
  BASE_URL: API_CONFIG.BASE_URL,
  CMS_URL: API_CONFIG.CMS_URL,
  ENVIRONMENT: import.meta.env.PROD ? 'production' : 'development'
}); 