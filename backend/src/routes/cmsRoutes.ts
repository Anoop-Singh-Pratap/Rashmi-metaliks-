import express from 'express';
import { getNews, createNews, updateNews } from '../controllers/cmsController';
import { authMiddleware } from '../middleware/auth';
import fetch from 'node-fetch';

const router = express.Router();

// GET /api/news - Get all news (public)
router.get('/', getNews);

// GET /api/news/debug - Get raw Strapi news data for debugging
router.get('/debug', async (req, res) => {
  try {
    // Get configuration from environment
    const apiUrl = (process.env.CMS_API_URL || 'http://localhost:1337').replace(/\/$/, '');
    const cmsApiToken = process.env.CMS_API_TOKEN;
    const newsApiId = process.env.CMS_NEWS_PANEL_API_ID || 'news-and-updates-panel';
    
    console.log(`Debug endpoint called`);
    console.log(`Getting raw Strapi data from ${apiUrl}/api/${newsApiId}?populate=*`);
    
    // Make the request to Strapi
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Only add Authorization header if token exists
    if (cmsApiToken) {
      headers['Authorization'] = cmsApiToken;
    }
    
    const response = await fetch(`${apiUrl}/api/${newsApiId}?populate=*`, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Error fetching from Strapi: ${error}`);
      return res.status(response.status).json({ error });
    }
    
    // Get raw JSON data
    const rawData = await response.json();
    
    // Log detailed item structure for the first item to understand the exact response structure
    if (rawData.data && rawData.data.length > 0) {
      console.log('First item keys:', Object.keys(rawData.data[0]));
      console.log('First item attributes keys:', Object.keys(rawData.data[0].attributes || {}));
      
      // Log the first item's Media structure to see exactly how it's organized
      const firstItem = rawData.data[0];
      console.log('Media field structure:', JSON.stringify(firstItem.attributes?.Media, null, 2));
    }
    
    // Return the raw response
    return res.status(200).json(rawData);
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/news - Create a news article (authenticated)
router.post('/', authMiddleware, createNews);

// PUT /api/news/:id - Update a news article (authenticated)
router.put('/:id', authMiddleware, updateNews);

export { router as cmsRoutes }; 