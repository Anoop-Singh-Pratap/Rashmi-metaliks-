/**
 * CMS Service - Integration with headless CMS for content management
 * 
 * This service provides methods to fetch content from a headless CMS like Strapi,
 * which allows non-technical users to manage website content without coding.
 */

import { toast } from '@/hooks/use-toast';
import { getCmsUrl, getApiUrl, API_CONFIG } from '../config/api';

// Add type declaration for the window.ENV property
declare global {
  interface Window {
    ENV?: {
      REACT_APP_CMS_API_URL?: string;
    };
  }
}

// Constants - use the environment variables properly
const API_URL = API_CONFIG.CMS_URL;
console.log('Using CMS API URL:', API_URL);

/**
 * Get news from the backend API
 */
export async function getNews() {
  try {
    console.log('Fetching news from Strapi API...');
    // Fetch directly from Strapi using the correct endpoint
    const response = await fetch(`${API_URL}/api/news-and-updates-panel?populate=*`);
    if (!response.ok) {
      const errorMessage = `Failed to fetch news: ${response.statusText}`;
      console.warn(errorMessage);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    // Map Strapi data to NewsItem interface
    const mappedNews = (data.data || []).map((item: any) => {
      let imageUrl = '';
      let fullImageUrl = '';

      // Get full-resolution image for viewing
      if (item.Media && item.Media.url) {
        fullImageUrl = item.Media.url.startsWith('http')
          ? item.Media.url
          : `${API_URL}${item.Media.url}`;
      }

      // Use original image for display (best quality, CSS will handle 16:9 aspect ratio)
      if (item.Media && item.Media.url) {
        imageUrl = item.Media.url.startsWith('http')
          ? item.Media.url
          : `${API_URL}${item.Media.url}`;
      } else if (item.Media && item.Media.formats?.large?.url) {
        // Fallback to large format
        imageUrl = item.Media.formats.large.url.startsWith('http')
          ? item.Media.formats.large.url
          : `${API_URL}${item.Media.formats.large.url}`;
      } else if (item.Media && item.Media.formats?.medium?.url) {
        // Fallback to medium format
        imageUrl = item.Media.formats.medium.url.startsWith('http')
          ? item.Media.formats.medium.url
          : `${API_URL}${item.Media.formats.medium.url}`;
      }
      return {
        id: item.id,
        title: item.Heading || '',
        date: item.Date || '',
        category: item.Category || '',
        excerpt: item.Excerpt || '',
        image: imageUrl,
        fullImage: fullImageUrl,
        content: item.Content || '',
        documentUrl: item.DocumentUrl || null,
      };
    });
    // Store the successfully fetched data in localStorage for offline use
    try {
      localStorage.setItem('rashmi_cached_news', JSON.stringify(mappedNews));
      localStorage.setItem('rashmi_cached_news_timestamp', Date.now().toString());
      localStorage.removeItem('rashmi_using_cached_news'); // Clear the flag
    } catch (e) {
      console.warn('Failed to cache news data in localStorage:', e);
    }
    return mappedNews;
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Try to retrieve cached data from localStorage
    try {
      const cachedData = localStorage.getItem('rashmi_cached_news');
      const cachedTimestamp = localStorage.getItem('rashmi_cached_news_timestamp');
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        console.log(`Using cached data with ${parsedData.length} items from ${new Date(Number(cachedTimestamp || '0')).toLocaleString()}`);
        
        // Set a flag in localStorage indicating we're using cached data
        localStorage.setItem('rashmi_using_cached_news', 'true');
        
        // Show toast notification for fallback to cached data
        toast({
          title: "Using cached news data",
          description: "Could not connect to the server. Showing previously loaded content.",
          variant: "default",
        });
        return parsedData;
      }
    } catch (localStorageError) {
      console.error('Error retrieving cached news data:', localStorageError);
    }
    
    // No cached data available, use fallback data
    console.log('Using fallback news data');
    return getFallbackNewsData();
  }
}

// Helper function to return fallback news data
function getFallbackNewsData() {
  return [
    {
      id: 1,
      title: "Rashmi Group Achieves Record Production Targets",
      date: "2023-05-15",
      category: "Achievement",
      excerpt: "Rashmi Group has achieved record-breaking production targets in the first quarter of 2023, surpassing industry standards.",
      image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fullImage: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.",
      documentUrl: null
    },
    {
      id: 2,
      title: "Rashmi Metaliks Launches New Sustainability Initiative",
      date: "2023-04-10",
      category: "Sustainability",
      excerpt: "Our new sustainability program aims to reduce carbon emissions by 30% over the next five years.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fullImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      content: "Rashmi Metaliks is proud to announce our ambitious new sustainability initiative...",
      documentUrl: null
    }
  ];
}

/**
 * Fetch brochures from the CMS
 * @returns Array of brochures
 */
export async function getBrochures() {
  try {
    // Try to detect if we're offline first to avoid unnecessary fetch attempts
    if (!navigator.onLine) {
      throw new Error('Browser is offline');
    }
    
    // Correctly construct the Strapi API URL for brochures
    const response = await fetch(`${API_URL}/api/brochures?populate=*`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch brochures');
    }
    
    const data = await response.json();
    console.log('Raw brochures response:', data);
    
    const processedData = data.data.map((item: any) => {
      // Debug the thumbnail structure
      console.log('Brochure thumbnail data:', item.attributes?.thumbnail);
      
      // Extract thumbnail URL properly from Strapi's response
      let thumbnailUrl = 'https://images.unsplash.com/photo-1586523731382-c9747d1de42b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      let fileUrl = '#';
      
      // Handle thumbnail
      if (item.attributes?.thumbnail) {
        if (item.attributes.thumbnail.data) {
          if (Array.isArray(item.attributes.thumbnail.data)) {
            if (item.attributes.thumbnail.data.length > 0) {
              thumbnailUrl = item.attributes.thumbnail.data[0].attributes.url.startsWith('http') 
                ? item.attributes.thumbnail.data[0].attributes.url 
                : `${API_URL}${item.attributes.thumbnail.data[0].attributes.url}`;
            }
          } else if (item.attributes.thumbnail.data?.attributes?.url) {
            thumbnailUrl = item.attributes.thumbnail.data.attributes.url.startsWith('http')
              ? item.attributes.thumbnail.data.attributes.url
              : `${API_URL}${item.attributes.thumbnail.data.attributes.url}`;
          }
        } else if (item.attributes.thumbnail.url) {
          thumbnailUrl = item.attributes.thumbnail.url.startsWith('http')
            ? item.attributes.thumbnail.url
            : `${API_URL}${item.attributes.thumbnail.url}`;
        }
      }
      
      // Handle file
      if (item.attributes?.file) {
        if (item.attributes.file.data) {
          if (Array.isArray(item.attributes.file.data)) {
            if (item.attributes.file.data.length > 0) {
              fileUrl = item.attributes.file.data[0].attributes.url.startsWith('http')
                ? item.attributes.file.data[0].attributes.url
                : `${API_URL}${item.attributes.file.data[0].attributes.url}`;
            }
          } else if (item.attributes.file.data?.attributes?.url) {
            fileUrl = item.attributes.file.data.attributes.url.startsWith('http')
              ? item.attributes.file.data.attributes.url
              : `${API_URL}${item.attributes.file.data.attributes.url}`;
          }
        } else if (item.attributes.file.url) {
          fileUrl = item.attributes.file.url.startsWith('http')
            ? item.attributes.file.url
            : `${API_URL}${item.attributes.file.url}`;
        }
      }
      
      return {
        id: item.id,
        title: item.attributes.title || 'Untitled',
        category: item.attributes.category || 'General',
        format: item.attributes.format || 'PDF',
        size: item.attributes.fileSize || 'Unknown',
        lastUpdated: item.attributes.updatedAt || new Date().toISOString(),
        thumbnail: thumbnailUrl,
        downloadUrl: fileUrl
      };
    });
    
    // Store the successfully fetched data in localStorage for offline use
    try {
      localStorage.setItem('rashmi_cached_brochures', JSON.stringify(processedData));
      localStorage.setItem('rashmi_cached_brochures_timestamp', Date.now().toString());
    } catch (e) {
      console.warn('Failed to cache brochures data in localStorage:', e);
    }
    
    return processedData;
  } catch (error) {
    console.error('Error fetching brochures:', error);
    
    // Try to retrieve cached data from localStorage
    try {
      const cachedData = localStorage.getItem('rashmi_cached_brochures');
      const cachedTimestamp = localStorage.getItem('rashmi_cached_brochures_timestamp');
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        // Set a flag in localStorage indicating we're using cached data due to offline/error
        localStorage.setItem('rashmi_using_cached_brochures', 'true');
        console.log('Using cached brochures data from localStorage. Cached at:', new Date(Number(cachedTimestamp || '0')).toLocaleString());
        return parsedData;
      }
    } catch (e) {
      console.error('Error retrieving cached brochures data:', e);
    }
    
    // Return fallback data if no cached data is available
    return [
      {
        id: 1,
        title: "Company Profile",
        category: "Corporate",
        format: "PDF",
        size: "2.4 MB",
        lastUpdated: new Date().toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1586523731385-d9646a7cff32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        downloadUrl: "#"
      },
      {
        id: 2,
        title: "Product Catalog",
        category: "Product",
        format: "PDF",
        size: "4.2 MB",
        lastUpdated: new Date().toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1586523731410-d9646a7cff38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        downloadUrl: "#"
      }
    ];
  }
}

/**
 * Fetch certificates from the CMS
 * @returns Array of certificates
 */
export async function getCertificates() {
  try {
    // Try to detect if we're offline first to avoid unnecessary fetch attempts
    if (!navigator.onLine) {
      throw new Error('Browser is offline');
    }
    
    // Correctly construct the Strapi API URL for certificates
    const response = await fetch(`${API_URL}/api/certificates?populate=*`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch certificates');
    }
    
    const data = await response.json();
    console.log('Raw certificates response:', data);
    
    const processedData = data.data.map((item: any) => {
      // Extract image URL properly from Strapi's response
      let imageUrl = null;
      let fileUrl = null;
      
      // Handle image
      if (item.attributes?.image) {
        if (item.attributes.image.data) {
          if (Array.isArray(item.attributes.image.data)) {
            if (item.attributes.image.data.length > 0) {
              imageUrl = item.attributes.image.data[0].attributes.url.startsWith('http')
                ? item.attributes.image.data[0].attributes.url
                : `${API_URL}${item.attributes.image.data[0].attributes.url}`;
            }
          } else if (item.attributes.image.data?.attributes?.url) {
            imageUrl = item.attributes.image.data.attributes.url.startsWith('http')
              ? item.attributes.image.data.attributes.url
              : `${API_URL}${item.attributes.image.data.attributes.url}`;
          }
        } else if (item.attributes.image.url) {
          imageUrl = item.attributes.image.url.startsWith('http')
            ? item.attributes.image.url
            : `${API_URL}${item.attributes.image.url}`;
        }
      }
      
      // Handle file
      if (item.attributes?.file) {
        if (item.attributes.file.data) {
          if (Array.isArray(item.attributes.file.data)) {
            if (item.attributes.file.data.length > 0) {
              fileUrl = item.attributes.file.data[0].attributes.url.startsWith('http')
                ? item.attributes.file.data[0].attributes.url
                : `${API_URL}${item.attributes.file.data[0].attributes.url}`;
            }
          } else if (item.attributes.file.data?.attributes?.url) {
            fileUrl = item.attributes.file.data.attributes.url.startsWith('http')
              ? item.attributes.file.data.attributes.url
              : `${API_URL}${item.attributes.file.data.attributes.url}`;
          }
        } else if (item.attributes.file.url) {
          fileUrl = item.attributes.file.url.startsWith('http')
            ? item.attributes.file.url
            : `${API_URL}${item.attributes.file.url}`;
        }
      }
      
      return {
        id: item.id,
        title: item.attributes.title || 'Untitled',
        issuer: item.attributes.issuer || 'Unknown',
        issueDate: item.attributes.issueDate || '',
        expiryDate: item.attributes.expiryDate || '',
        description: item.attributes.description || '',
        image: imageUrl,
        file: fileUrl
      };
    });
    
    // Store the successfully fetched data in localStorage for offline use
    try {
      localStorage.setItem('rashmi_cached_certificates', JSON.stringify(processedData));
      localStorage.setItem('rashmi_cached_certificates_timestamp', Date.now().toString());
    } catch (e) {
      console.warn('Failed to cache certificates data in localStorage:', e);
    }
    
    return processedData;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    
    // Try to retrieve cached data from localStorage
    try {
      const cachedData = localStorage.getItem('rashmi_cached_certificates');
      const cachedTimestamp = localStorage.getItem('rashmi_cached_certificates_timestamp');
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        // Set a flag in localStorage indicating we're using cached data due to offline/error
        localStorage.setItem('rashmi_using_cached_certificates', 'true');
        console.log('Using cached certificates data from localStorage. Cached at:', new Date(Number(cachedTimestamp || '0')).toLocaleString());
        return parsedData;
      }
    } catch (e) {
      console.error('Error retrieving cached certificates data:', e);
    }
    
    // Return fallback data if no cached data is available
    return [
      {
        id: 1,
        title: "ISO 9001:2015",
        issuer: "International Organization for Standardization",
        issueDate: "2022-01-15",
        expiryDate: "2025-01-14",
        description: "Quality Management System Certification",
        image: "https://images.unsplash.com/photo-1568633762547-c6c00210ddf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        file: null
      },
      {
        id: 2,
        title: "ISO 14001:2015",
        issuer: "International Organization for Standardization",
        issueDate: "2021-06-22",
        expiryDate: "2024-06-21",
        description: "Environmental Management System Certification",
        image: "https://images.unsplash.com/photo-1547489401-fcada4966052?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        file: null
      }
    ];
  }
}

/**
 * Fetch CSR items from the CMS
 * @returns Array of CSR items
 */
export async function getCSRItems() {
  try {
    const response = await fetch(`${API_URL}/api/csrs?populate=*`);
    if (!response.ok) {
      throw new Error('Failed to fetch CSR items');
    }
    const data = await response.json();
    return data.data
      .filter((item: any) => item)
      .map((item: any) => {
        // Handle image as a single object
        let imageUrl = null;
        const img = item.image;
        if (img && img.url) {
          imageUrl = img.url.startsWith('http')
            ? img.url
            : `${API_URL}${img.url}`;
        }
        return {
          id: item.id,
          title: item.Title,
          description: item.description,
          image: imageUrl,
        };
      });
  } catch (error) {
    console.error('Error fetching CSR items:', error);
    return [];
  }
}

/**
 * Update a news article via the backend API
 * @param id - The ID of the news article to update
 * @param data - The updated news data with Strapi field names
 * @param authToken - The authentication token for secure operations
 * @returns Updated news article
 */
export async function updateNews(id: number, data: {
  Heading?: string;
  Date?: string;
  Category?: string;
  Description?: string;
  Content?: string;
  image?: File;
}, authToken: string) {
  try {
    // For file upload, we need to use FormData
    const formData = new FormData();
    
    // Add the JSON data
    const jsonData = {};
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'image' && value !== undefined) {
        // @ts-ignore
        jsonData[key] = value;
      }
    });
    
    formData.append('data', JSON.stringify(jsonData));
    
    // Add image if present
    if (data.image) {
      formData.append('file', data.image);
    }
    
    // Call the backend API
    const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.NEWS}/${id}`), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update news: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
}

/**
 * Create a new news article via the backend API
 * @param data - The news data to create with Strapi field names
 * @param authToken - The authentication token for secure operations
 * @returns Created news article
 */
export async function createNews(data: {
  Heading: string;
  Date: string;
  Category: string;
  Description: string;
  Content: string;
  image?: File;
}, authToken: string) {
  try {
    // For file upload, we need to use FormData
    const formData = new FormData();
    
    // Add the JSON data
    const jsonData = {};
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'image' && value !== undefined) {
        // @ts-ignore
        jsonData[key] = value;
      }
    });
    
    formData.append('data', JSON.stringify(jsonData));
    
    // Add image if present
    if (data.image) {
      formData.append('file', data.image);
    }
    
    // Call the backend API
    const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.NEWS), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create news: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
}
